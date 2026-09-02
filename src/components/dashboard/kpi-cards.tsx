import { CircleHelp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { formatKpiMoney, formatPct, formatPp } from "@/lib/dashboard/format";
import type { KpiSet } from "@/lib/dashboard/types";
import { Sparkline } from "./sparkline";

type KpiCardsProps = {
  kpis: KpiSet;
};

function Delta({
  value,
  invert,
  asPoints,
}: {
  value: number | null;
  invert?: boolean;
  asPoints?: boolean;
}) {
  if (value === null) {
    return <Badge tone="muted">No prior period</Badge>;
  }
  const favorable = invert ? value <= 0 : value >= 0;
  return (
    <Badge tone={favorable ? "up" : "down"}>
      {asPoints ? formatPp(value) : formatPct(value)} vs prior
    </Badge>
  );
}

function KpiCard({
  label,
  hint,
  value,
  delta,
  invertDelta,
  asPoints,
  spark,
  sparkTone,
}: {
  label: string;
  hint: string;
  value: string;
  delta: number | null;
  invertDelta?: boolean;
  asPoints?: boolean;
  spark: number[];
  sparkTone: "neutral" | "up" | "down";
}) {
  return (
    <Card className="stagger-in p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-1.5">
          <p className="text-sm font-medium text-muted-foreground">{label}</p>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                type="button"
                className="relative inline-flex size-6 items-center justify-center rounded-md text-muted-foreground after:absolute after:size-11 hover:text-foreground"
                aria-label={`${label} definition`}
              >
                <CircleHelp className="size-3.5" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="bottom">{hint}</TooltipContent>
          </Tooltip>
        </div>
        <Sparkline values={spark} tone={sparkTone} />
      </div>
      <p className="mt-3 font-display text-3xl tracking-tight text-foreground tabular-nums sm:text-4xl">
        {value}
      </p>
      <div className="mt-3">
        <Delta value={delta} invert={invertDelta} asPoints={asPoints} />
      </div>
    </Card>
  );
}

export function KpiCards({ kpis }: KpiCardsProps) {
  const growthTone = kpis.growth >= 0 ? "up" : "down";
  const churnTone = kpis.churnDelta === null ? "neutral" : kpis.churnDelta <= 0 ? "up" : "down";
  const revenueTone =
    kpis.revenueDelta === null ? "neutral" : kpis.revenueDelta >= 0 ? "up" : "down";

  return (
    <section className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
      <KpiCard
        label="Revenue"
        hint="Recognized revenue in the selected window, compared with the previous window of equal length."
        value={formatKpiMoney(kpis.revenue)}
        delta={kpis.revenueDelta}
        spark={kpis.sparkRevenue}
        sparkTone={revenueTone}
      />
      <KpiCard
        label="Growth"
        hint="Net MRR change in this window, expressed as a monthly rate so ranges stay comparable."
        value={formatPct(kpis.growth, 2)}
        delta={kpis.growthDelta}
        asPoints
        spark={kpis.sparkGrowth}
        sparkTone={growthTone}
      />
      <KpiCard
        label="Churn"
        hint="Gross MRR lost in this window, expressed as a monthly rate. Lower is better."
        value={`${kpis.churn.toFixed(2)}%`}
        delta={kpis.churnDelta}
        invertDelta
        asPoints
        spark={kpis.sparkChurn}
        sparkTone={churnTone}
      />
    </section>
  );
}
