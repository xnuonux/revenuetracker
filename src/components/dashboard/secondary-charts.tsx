import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatKpiMoney } from "@/lib/dashboard/format";
import type { BreakdownRow, ChartRow } from "@/lib/dashboard/types";
import { ChartTooltip } from "./chart-tooltip";
import { cn } from "@/lib/utils";

type SecondaryChartsProps = {
  movement: ChartRow[];
  mix: BreakdownRow[];
  onSelect: (id: string) => void;
  selectedId: string | null;
};

function ChartSkeleton({ className }: { className?: string }) {
  return <div className={cn("animate-pulse rounded-lg bg-secondary", className)} />;
}

export function SecondaryCharts({ movement, mix, onSelect, selectedId }: SecondaryChartsProps) {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    setReady(true);
  }, []);
  const maxShare = Math.max(...mix.map((row) => row.share), 0.01);

  return (
    <div className="grid grid-cols-1 gap-3 lg:grid-cols-2 lg:gap-4">
      <Card className="stagger-in">
        <CardHeader className="p-4 pb-2">
          <CardTitle className="text-sm font-medium text-foreground">New vs lost MRR</CardTitle>
          <p className="mt-1 text-xs text-muted-foreground">
            Gross adds against churned recurring revenue in each bucket.
          </p>
        </CardHeader>
        <CardContent className="pt-2">
          {ready ? (
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={movement} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                  <CartesianGrid
                    vertical={false}
                    stroke="var(--color-border)"
                    strokeDasharray="3 6"
                  />
                  <XAxis
                    dataKey="label"
                    tickLine={false}
                    axisLine={false}
                    tick={{ fill: "var(--color-muted-foreground)", fontSize: 11 }}
                    interval="preserveStartEnd"
                    minTickGap={24}
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    width={48}
                    tick={{ fill: "var(--color-muted-foreground)", fontSize: 11 }}
                    tickFormatter={(value: number) => formatKpiMoney(value)}
                  />
                  <Tooltip
                    content={<ChartTooltip kind="movement" />}
                    cursor={{ fill: "var(--color-secondary)" }}
                  />
                  <Bar
                    dataKey="newMrr"
                    fill="var(--color-chart)"
                    name="New"
                    radius={[4, 4, 0, 0]}
                    maxBarSize={18}
                  />
                  <Bar
                    dataKey="churnedMrr"
                    fill="var(--color-lost)"
                    name="Lost"
                    radius={[4, 4, 0, 0]}
                    maxBarSize={18}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <ChartSkeleton className="h-56" />
          )}
        </CardContent>
      </Card>

      <Card className="stagger-in">
        <CardHeader className="p-4 pb-2">
          <CardTitle className="text-sm font-medium text-foreground">Mix</CardTitle>
          <p className="mt-1 text-xs text-muted-foreground">
            Share of period revenue. Select a bar to filter the dashboard.
          </p>
        </CardHeader>
        <CardContent className="flex flex-col justify-center gap-3 pt-2">
          {mix.map((row) => {
            const active = selectedId === row.id;
            const width = `${Math.max(8, (row.share / maxShare) * 100)}%`;
            return (
              <button
                key={row.id}
                type="button"
                onClick={() => onSelect(row.id)}
                className={cn(
                  "group rounded-lg p-2 text-left transition-[background-color] duration-150 ease-out hover:bg-secondary",
                  active && "bg-secondary",
                )}
              >
                <div className="mb-1.5 flex items-baseline justify-between gap-3">
                  <span className="text-sm font-medium text-foreground">{row.name}</span>
                  <span className="text-xs tabular-nums text-muted-foreground">
                    {formatKpiMoney(row.revenue)} · {(row.share * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-secondary">
                  <div
                    className="h-full rounded-full bg-chart transition-[width] duration-200 ease-out"
                    style={{ width }}
                  />
                </div>
              </button>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}
