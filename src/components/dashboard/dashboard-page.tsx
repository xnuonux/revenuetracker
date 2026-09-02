import { useMemo, useState } from "react";
import { DateRangeFilter } from "@/components/dashboard/date-range-filter";
import { BreakdownTable } from "@/components/dashboard/breakdown-table";
import { KpiCards } from "@/components/dashboard/kpi-cards";
import { SecondaryCharts } from "@/components/dashboard/secondary-charts";
import { TrendChart } from "@/components/dashboard/trend-chart";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AS_OF, clampDate, DATA_START, rangeFromPreset } from "@/lib/dashboard/dates";
import { formatDate } from "@/lib/dashboard/format";
import {
  buildBreakdown,
  buildChartRows,
  computeKpis,
  getViewSeries,
  grainFor,
  insightCopy,
  previousRange,
  slicePoints,
} from "@/lib/dashboard/metrics";
import type { DatePreset, DateRange, SegmentFilter, SegmentKind } from "@/lib/dashboard/types";

export function DashboardPage() {
  const [preset, setPreset] = useState<DatePreset>("90d");
  const [range, setRange] = useState<DateRange>(() => rangeFromPreset("90d"));
  const [kind, setKind] = useState<SegmentKind>("plan");
  const [filter, setFilter] = useState<SegmentFilter>(null);

  function applyPreset(next: Exclude<DatePreset, "custom">) {
    setPreset(next);
    setRange(rangeFromPreset(next));
  }

  function applyCustom(next: DateRange) {
    const from = clampDate(next.from, DATA_START, AS_OF);
    const to = clampDate(next.to, from, AS_OF);
    setPreset("custom");
    setRange({ from, to });
  }

  function applyKind(next: SegmentKind) {
    setKind(next);
    setFilter((current) => (current && current.kind !== next ? null : current));
  }

  const view = useMemo(() => {
    const series = getViewSeries(filter);
    const current = slicePoints(series, range);
    const previous = slicePoints(series, previousRange(range));
    const kpis = computeKpis(current, previous);
    const grain = grainFor(range);
    const chartRows = buildChartRows(current, previous, grain);
    const breakdown = buildBreakdown(range, kind);
    return { kpis, grain, chartRows, breakdown, current };
  }, [filter, range, kind]);

  const mix = view.breakdown;

  return (
    <TooltipProvider>
      <div className="mx-auto flex min-h-dvh max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
        <header className="flex flex-col gap-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="min-w-0">
              <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                Lumen Cloud · Sample workspace
              </p>
              <h1 className="mt-2 font-display text-4xl italic tracking-tight text-foreground sm:text-5xl">
                Meridian
              </h1>
              <p className="mt-2 text-xs text-muted-foreground">
                As of {formatDate(AS_OF)} · Offline sample
              </p>
            </div>
            <DateRangeFilter
              preset={preset}
              range={range}
              onPreset={applyPreset}
              onCustom={applyCustom}
            />
          </div>
          <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
            {view.current.length
              ? insightCopy(view.kpis, range, filter)
              : "No revenue recorded in this window. Choose another range."}
          </p>
        </header>

        {view.current.length === 0 ? (
          <div className="rounded-2xl bg-card px-6 py-16 text-center shadow-card">
            <p className="font-medium">No data in this range</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Sample history starts {formatDate(DATA_START)}. Pick a later window.
            </p>
          </div>
        ) : (
          <>
            <KpiCards kpis={view.kpis} />
            <TrendChart rows={view.chartRows} grain={view.grain} />
            <SecondaryCharts
              movement={view.chartRows}
              mix={mix}
              selectedId={filter?.kind === kind ? filter.id : null}
              onSelect={(id) => {
                if (filter?.kind === kind && filter.id === id) {
                  setFilter(null);
                  return;
                }
                setFilter({ kind, id });
              }}
            />
            <BreakdownTable
              kind={kind}
              onKind={applyKind}
              rows={view.breakdown}
              filter={filter}
              onFilter={setFilter}
            />
          </>
        )}

        <footer className="pb-[env(safe-area-inset-bottom)] pt-2 text-xs text-muted-foreground">
          Figures are generated locally for this demo. Nothing leaves the browser.
        </footer>
      </div>
    </TooltipProvider>
  );
}
