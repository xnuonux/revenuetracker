import { formatMoney, formatPct } from "@/lib/dashboard/format";
import type { ChartRow } from "@/lib/dashboard/types";

type PayloadItem = {
  dataKey?: string | number;
  value?: number;
  payload?: ChartRow;
};

type ChartTooltipProps = {
  active?: boolean;
  payload?: PayloadItem[];
  label?: string;
  kind?: "revenue" | "movement";
};

export function ChartTooltip({ active, payload, label, kind = "revenue" }: ChartTooltipProps) {
  if (!active || !payload?.length) return null;
  const row = payload[0]?.payload;
  if (!row) return null;

  if (kind === "movement") {
    return (
      <div className="rounded-md bg-popover px-3 py-2 text-xs shadow-popover">
        <p className="font-medium text-foreground">{label}</p>
        <p className="mt-1.5 flex justify-between gap-6 text-muted-foreground">
          New MRR
          <span className="tabular-nums text-up">{formatMoney(row.newMrr)}</span>
        </p>
        <p className="mt-1 flex justify-between gap-6 text-muted-foreground">
          Lost MRR
          <span className="tabular-nums text-down">{formatMoney(row.churnedMrr)}</span>
        </p>
      </div>
    );
  }

  const delta =
    row.previous && row.previous !== 0 ? ((row.revenue - row.previous) / row.previous) * 100 : null;

  return (
    <div className="rounded-md bg-popover px-3 py-2 text-xs shadow-popover">
      <p className="font-medium text-foreground">{label}</p>
      <p className="mt-1.5 flex justify-between gap-6 text-muted-foreground">
        Revenue
        <span className="tabular-nums text-foreground">{formatMoney(row.revenue)}</span>
      </p>
      {row.previous !== null && (
        <p className="mt-1 flex justify-between gap-6 text-muted-foreground">
          Prior period
          <span className="tabular-nums text-foreground">{formatMoney(row.previous)}</span>
        </p>
      )}
      {delta !== null && (
        <p className="mt-1 flex justify-between gap-6 text-muted-foreground">
          Change
          <span className={delta >= 0 ? "tabular-nums text-up" : "tabular-nums text-down"}>
            {formatPct(delta)}
          </span>
        </p>
      )}
    </div>
  );
}
