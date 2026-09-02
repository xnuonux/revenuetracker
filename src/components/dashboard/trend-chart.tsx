import { useEffect, useState } from "react";
import {
  Area,
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ChartRow, Grain } from "@/lib/dashboard/types";
import { ChartTooltip } from "./chart-tooltip";

type TrendChartProps = {
  rows: ChartRow[];
  grain: Grain;
};

function grainLabel(grain: Grain): string {
  if (grain === "day") return "Daily";
  if (grain === "week") return "Weekly";
  return "Monthly";
}

function ChartSkeleton() {
  return <div className="h-72 animate-pulse rounded-lg bg-secondary" />;
}

export function TrendChart({ rows, grain }: TrendChartProps) {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    setReady(true);
  }, []);

  return (
    <Card className="stagger-in">
      <CardHeader className="flex flex-row items-start justify-between gap-3 p-4 pb-2">
        <div>
          <CardTitle className="text-sm font-medium text-foreground">Revenue trend</CardTitle>
          <p className="mt-1 text-xs text-muted-foreground">
            {grainLabel(grain)} recognized revenue, with the prior window as a dashed overlay.
          </p>
        </div>
        <div className="hidden items-center gap-3 text-xs text-muted-foreground sm:flex">
          <span className="inline-flex items-center gap-1.5">
            <span className="h-px w-4 bg-chart" />
            Current
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-px w-4 border-t border-dashed border-chart-prev" />
            Prior
          </span>
        </div>
      </CardHeader>
      <CardContent className="pt-2">
        {ready ? (
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={rows} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-chart)" stopOpacity={0.28} />
                    <stop offset="100%" stopColor="var(--color-chart)" stopOpacity={0} />
                  </linearGradient>
                </defs>
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
                  minTickGap={28}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  width={56}
                  tick={{ fill: "var(--color-muted-foreground)", fontSize: 11 }}
                  tickFormatter={(value: number) =>
                    Math.abs(value) >= 1000
                      ? `$${Math.round(value / 1000)}k`
                      : `$${Math.round(value)}`
                  }
                />
                <Tooltip
                  content={<ChartTooltip kind="revenue" />}
                  cursor={{ stroke: "var(--color-border)", strokeDasharray: "4 4" }}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="var(--color-chart)"
                  strokeWidth={2}
                  fill="url(#revenueFill)"
                  name="Revenue"
                  activeDot={{ r: 4, fill: "var(--color-chart)", stroke: "var(--color-card)" }}
                />
                <Line
                  type="monotone"
                  dataKey="previous"
                  stroke="var(--color-chart-prev)"
                  strokeWidth={1.5}
                  strokeDasharray="5 4"
                  dot={false}
                  name="Prior"
                  connectNulls
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <ChartSkeleton />
        )}
      </CardContent>
    </Card>
  );
}
