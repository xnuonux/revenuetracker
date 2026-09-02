import { addDaysUtc, diffDaysUtc, inRange, isoDay, parseIsoDay, previousRange } from "./dates";
import { formatDateShort } from "./format";
import { SAMPLE, SEGMENTS_BY_KIND, seriesFor } from "./sample-data";
import type {
  BreakdownRow,
  ChartRow,
  DailyPoint,
  DateRange,
  Grain,
  KpiSet,
  SegmentFilter,
  SegmentKind,
} from "./types";

function sum(points: DailyPoint[], key: keyof DailyPoint): number {
  return points.reduce((acc, p) => acc + (p[key] as number), 0);
}

export function slicePoints(points: DailyPoint[], range: DateRange): DailyPoint[] {
  return points.filter((p) => inRange(p.date, range));
}

function monthlyFromPeriod(fraction: number, days: number): number {
  if (days <= 0) return 0;
  return fraction * (30.44 / days) * 100;
}

function rollingWindow(values: number[], size: number): number[] {
  if (values.length === 0) return [];
  const out: number[] = [];
  let run = 0;
  for (let i = 0; i < values.length; i++) {
    run += values[i]!;
    if (i >= size) run -= values[i - size]!;
    const denom = Math.min(i + 1, size);
    out.push(run / denom);
  }
  return out;
}

function sparkGrowth(points: DailyPoint[]): number[] {
  if (points.length < 2) return points.map(() => 0);
  const window = Math.min(14, Math.max(3, Math.floor(points.length / 6)));
  const rates: number[] = [];
  for (let i = 0; i < points.length; i++) {
    const startIdx = Math.max(0, i - window);
    const start = points[startIdx]!.mrr;
    const end = points[i]!.mrr;
    const days = i - startIdx + 1;
    rates.push(start === 0 ? 0 : monthlyFromPeriod((end - start) / start, days));
  }
  return rates;
}

function sparkChurn(points: DailyPoint[]): number[] {
  const window = Math.min(14, Math.max(3, Math.floor(points.length / 6)));
  const rates: number[] = [];
  for (let i = 0; i < points.length; i++) {
    const startIdx = Math.max(0, i - window);
    const slice = points.slice(startIdx, i + 1);
    const startMrr = slice[0]?.mrr ?? 0;
    const churned = sum(slice, "churnedMrr");
    const days = slice.length;
    rates.push(startMrr === 0 ? 0 : monthlyFromPeriod(churned / startMrr, days));
  }
  return rates;
}

export function computeKpis(current: DailyPoint[], previous: DailyPoint[]): KpiSet {
  const days = current.length;
  const revenue = sum(current, "revenue");
  const revenuePrev = previous.length ? sum(previous, "revenue") : null;
  const revenueDelta =
    revenuePrev && revenuePrev !== 0 ? ((revenue - revenuePrev) / revenuePrev) * 100 : null;

  const mrrStart = current[0]?.mrr ?? 0;
  const mrrEnd = current[current.length - 1]?.mrr ?? 0;
  const growth = mrrStart === 0 ? 0 : monthlyFromPeriod((mrrEnd - mrrStart) / mrrStart, days);

  const prevDays = previous.length;
  const prevStart = previous[0]?.mrr ?? 0;
  const prevEnd = previous[previous.length - 1]?.mrr ?? 0;
  const growthPrev =
    prevDays && prevStart !== 0
      ? monthlyFromPeriod((prevEnd - prevStart) / prevStart, prevDays)
      : null;
  const growthDelta = growthPrev === null ? null : growth - growthPrev;

  const churned = sum(current, "churnedMrr");
  const churn = mrrStart === 0 ? 0 : monthlyFromPeriod(churned / mrrStart, days);
  const churnedPrev = previous.length ? sum(previous, "churnedMrr") : 0;
  const churnPrev =
    prevDays && prevStart !== 0 ? monthlyFromPeriod(churnedPrev / prevStart, prevDays) : null;
  const churnDelta = churnPrev === null ? null : churn - churnPrev;

  return {
    revenue,
    revenuePrev,
    revenueDelta,
    growth,
    growthPrev,
    growthDelta,
    churn,
    churnPrev,
    churnDelta,
    customers: current[current.length - 1]?.customers ?? 0,
    sparkRevenue: rollingWindow(
      current.map((p) => p.revenue),
      Math.min(7, Math.max(1, Math.floor(days / 8))),
    ),
    sparkGrowth: sparkGrowth(current),
    sparkChurn: sparkChurn(current),
  };
}

export function grainFor(range: DateRange): Grain {
  const days = diffDaysUtc(range.from, range.to) + 1;
  if (days <= 31) return "day";
  if (days <= 183) return "week";
  return "month";
}

function bucketKey(iso: string, grain: Grain): string {
  if (grain === "day") return iso;
  if (grain === "month") return iso.slice(0, 7);
  const date = parseIsoDay(iso);
  const mondayOffset = (date.getUTCDay() + 6) % 7;
  return isoDay(addDaysUtc(date, -mondayOffset));
}

function bucketLabel(key: string, grain: Grain): string {
  if (grain === "month") {
    const date = parseIsoDay(`${key}-01`);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      year: "numeric",
      timeZone: "UTC",
    }).format(date);
  }
  return formatDateShort(parseIsoDay(key));
}

function aggregate(points: DailyPoint[], grain: Grain): Map<string, DailyPoint> {
  const map = new Map<string, DailyPoint>();
  for (const point of points) {
    const key = bucketKey(point.date, grain);
    const existing = map.get(key);
    if (!existing) {
      map.set(key, { ...point, date: key });
      continue;
    }
    existing.revenue += point.revenue;
    existing.newMrr += point.newMrr;
    existing.churnedMrr += point.churnedMrr;
    existing.mrr = point.mrr;
    existing.customers = point.customers;
  }
  return map;
}

export function buildChartRows(
  current: DailyPoint[],
  previous: DailyPoint[],
  grain: Grain,
): ChartRow[] {
  const currentBuckets = [...aggregate(current, grain).entries()];
  const previousBuckets = [...aggregate(previous, grain).values()];
  return currentBuckets.map(([key, point], index) => ({
    key,
    label: bucketLabel(key, grain),
    revenue: point.revenue,
    previous: previousBuckets[index]?.revenue ?? null,
    newMrr: point.newMrr,
    churnedMrr: point.churnedMrr,
  }));
}

export function buildBreakdown(range: DateRange, kind: SegmentKind): BreakdownRow[] {
  const metas = SEGMENTS_BY_KIND[kind];
  const prev = previousRange(range);
  const rows = metas.map((meta) => {
    const series = seriesFor(kind, meta.id);
    const current = slicePoints(series, range);
    const previous = slicePoints(series, prev);
    const kpis = computeKpis(current, previous);
    return {
      id: meta.id,
      kind,
      name: meta.name,
      customers: kpis.customers,
      revenue: kpis.revenue,
      share: 0,
      growth: kpis.growth,
      churn: kpis.churn,
    };
  });
  const totalRevenue = rows.reduce((acc, row) => acc + row.revenue, 0) || 1;
  return rows
    .map((row) => ({ ...row, share: row.revenue / totalRevenue }))
    .sort((a, b) => b.revenue - a.revenue);
}

export function getViewSeries(filter: SegmentFilter): DailyPoint[] {
  if (!filter) return SAMPLE.total;
  return seriesFor(filter.kind, filter.id);
}

export function insightCopy(kpis: KpiSet, range: DateRange, filter: SegmentFilter): string {
  const days = diffDaysUtc(range.from, range.to) + 1;
  const window = `${days} days`;
  const subject = filter
    ? SEGMENTS_BY_KIND[filter.kind].find((s) => s.id === filter.id)?.name ?? "This segment"
    : "Revenue";
  const delta = kpis.revenueDelta;
  const direction =
    delta === null
      ? "held steady versus the prior window"
      : delta >= 0
        ? `is up ${Math.abs(delta).toFixed(1)}% versus the prior ${window}`
        : `is down ${Math.abs(delta).toFixed(1)}% versus the prior ${window}`;
  const churnTone =
    kpis.churnDelta === null
      ? `monthly churn sits at ${kpis.churn.toFixed(1)}%`
      : kpis.churnDelta <= 0
        ? `monthly churn easing to ${kpis.churn.toFixed(1)}%`
        : `monthly churn rising to ${kpis.churn.toFixed(1)}%`;
  return `${subject} ${direction}, with ${churnTone}.`;
}

export { previousRange };
