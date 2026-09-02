export type DatePreset = "7d" | "30d" | "90d" | "6m" | "ytd" | "1y" | "custom";

export type DateRange = {
  from: Date;
  to: Date;
};

export type SegmentKind = "plan" | "region" | "product";

export type DailyPoint = {
  date: string;
  revenue: number;
  mrr: number;
  newMrr: number;
  churnedMrr: number;
  customers: number;
};

export type SegmentMeta = {
  id: string;
  kind: SegmentKind;
  name: string;
};

export type SegmentFilter = {
  kind: SegmentKind;
  id: string;
} | null;

export type KpiSet = {
  revenue: number;
  revenuePrev: number | null;
  revenueDelta: number | null;
  growth: number;
  growthPrev: number | null;
  growthDelta: number | null;
  churn: number;
  churnPrev: number | null;
  churnDelta: number | null;
  customers: number;
  sparkRevenue: number[];
  sparkGrowth: number[];
  sparkChurn: number[];
};

export type ChartRow = {
  key: string;
  label: string;
  revenue: number;
  previous: number | null;
  newMrr: number;
  churnedMrr: number;
};

export type BreakdownRow = {
  id: string;
  kind: SegmentKind;
  name: string;
  customers: number;
  revenue: number;
  share: number;
  growth: number;
  churn: number;
};

export type Grain = "day" | "week" | "month";
