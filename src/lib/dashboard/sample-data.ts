import { AS_OF, DATA_START, addDaysUtc, diffDaysUtc, isoDay } from "./dates";
import type { DailyPoint, SegmentKind, SegmentMeta } from "./types";

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export const PLANS: SegmentMeta[] = [
  { id: "starter", kind: "plan", name: "Starter" },
  { id: "growth", kind: "plan", name: "Growth" },
  { id: "scale", kind: "plan", name: "Scale" },
  { id: "enterprise", kind: "plan", name: "Enterprise" },
];

export const REGIONS: SegmentMeta[] = [
  { id: "na", kind: "region", name: "North America" },
  { id: "eu", kind: "region", name: "Europe" },
  { id: "apac", kind: "region", name: "Asia Pacific" },
  { id: "latam", kind: "region", name: "Latin America" },
];

export const PRODUCTS: SegmentMeta[] = [
  { id: "platform", kind: "product", name: "Platform" },
  { id: "analytics", kind: "product", name: "Analytics" },
  { id: "api", kind: "product", name: "Relay API" },
  { id: "services", kind: "product", name: "Services" },
];

export const SEGMENTS_BY_KIND: Record<SegmentKind, SegmentMeta[]> = {
  plan: PLANS,
  region: REGIONS,
  product: PRODUCTS,
};

type Mix = Record<string, number>;

const PLAN_MIX_START: Mix = { starter: 0.18, growth: 0.3, scale: 0.32, enterprise: 0.2 };
const PLAN_MIX_END: Mix = { starter: 0.1, growth: 0.26, scale: 0.36, enterprise: 0.28 };
const REGION_MIX_START: Mix = { na: 0.52, eu: 0.28, apac: 0.14, latam: 0.06 };
const REGION_MIX_END: Mix = { na: 0.46, eu: 0.27, apac: 0.2, latam: 0.07 };
const PRODUCT_MIX_START: Mix = { platform: 0.58, analytics: 0.22, api: 0.12, services: 0.08 };
const PRODUCT_MIX_END: Mix = { platform: 0.5, analytics: 0.26, api: 0.16, services: 0.08 };

const PLAN_CHURN: Mix = { starter: 1.7, growth: 1.15, scale: 0.75, enterprise: 0.4 };
const REGION_CHURN: Mix = { na: 0.9, eu: 0.85, apac: 1.2, latam: 1.35 };
const PRODUCT_CHURN: Mix = { platform: 0.85, analytics: 1.05, api: 0.7, services: 1.4 };

function lerpMix(start: Mix, end: Mix, t: number): Mix {
  const out: Mix = {};
  let total = 0;
  for (const key of Object.keys(start)) {
    const value = start[key]! + (end[key]! - start[key]!) * t;
    out[key] = value;
    total += value;
  }
  for (const key of Object.keys(out)) {
    out[key] = out[key]! / total;
  }
  return out;
}

function jitterMix(mix: Mix, rand: () => number, amplitude: number): Mix {
  const out: Mix = {};
  let total = 0;
  for (const key of Object.keys(mix)) {
    const value = Math.max(0.01, mix[key]! * (1 + (rand() - 0.5) * amplitude));
    out[key] = value;
    total += value;
  }
  for (const key of Object.keys(out)) {
    out[key] = out[key]! / total;
  }
  return out;
}

function splitByMix(total: number, mix: Mix, ids: string[]): Record<string, number> {
  const out: Record<string, number> = {};
  let allocated = 0;
  ids.forEach((id, index) => {
    if (index === ids.length - 1) {
      out[id] = total - allocated;
      return;
    }
    const value = total * (mix[id] ?? 0);
    out[id] = value;
    allocated += value;
  });
  return out;
}

function eventMultiplier(iso: string): number {
  if (iso >= "2025-11-12" && iso <= "2025-11-18") return 0.62;
  if (iso >= "2026-01-06" && iso <= "2026-01-20") return 1.16;
  if (iso >= "2026-04-01" && iso <= "2026-04-07") return 1.22;
  if (iso >= "2026-06-18" && iso <= "2026-06-22") return 0.84;
  return 1;
}

export type SampleBundle = {
  total: DailyPoint[];
  plan: Record<string, DailyPoint[]>;
  region: Record<string, DailyPoint[]>;
  product: Record<string, DailyPoint[]>;
};

function emptyBuckets(metas: SegmentMeta[]): Record<string, DailyPoint[]> {
  return Object.fromEntries(metas.map((m) => [m.id, [] as DailyPoint[]]));
}

function buildSample(): SampleBundle {
  const rand = mulberry32(20260902);
  const dayCount = diffDaysUtc(DATA_START, AS_OF) + 1;
  const total: DailyPoint[] = [];
  const plan = emptyBuckets(PLANS);
  const region = emptyBuckets(REGIONS);
  const product = emptyBuckets(PRODUCTS);

  let mrr = 118_000;
  let customers = 1860;

  for (let i = 0; i < dayCount; i++) {
    const date = addDaysUtc(DATA_START, i);
    const iso = isoDay(date);
    const t = i / Math.max(1, dayCount - 1);
    const dow = date.getUTCDay();
    const weekend = dow === 0 || dow === 6 ? 0.74 : dow === 2 || dow === 3 ? 1.05 : 1;
    const seasonal = 1 + 0.07 * Math.sin((2 * Math.PI * (i + 40)) / 365);
    const growth = 1 + 0.00095;
    const netNewRate = 0.00115 + (rand() - 0.45) * 0.00035;
    const churnRate = 0.00072 + (rand() - 0.5) * 0.00022;
    const newMrr = mrr * netNewRate * eventMultiplier(iso);
    const churnedMrr = mrr * churnRate;
    mrr = Math.max(40_000, (mrr + newMrr - churnedMrr) * growth);

    const usage = mrr * (0.18 + rand() * 0.08);
    const recognized = (mrr / 30.44 + usage / 30.44) * weekend * seasonal * eventMultiplier(iso);
    const revenue = recognized * (1 + (rand() - 0.5) * 0.08);

    const newCust = Math.max(0, Math.round(customers * (0.0024 + (rand() - 0.4) * 0.0012)));
    const lostCust = Math.max(0, Math.round(customers * (0.0007 + rand() * 0.0005)));
    customers = Math.max(400, customers + newCust - lostCust);

    const point: DailyPoint = { date: iso, revenue, mrr, newMrr, churnedMrr, customers };
    total.push(point);

    const planMix = jitterMix(lerpMix(PLAN_MIX_START, PLAN_MIX_END, t), rand, 0.08);
    const regionMix = jitterMix(lerpMix(REGION_MIX_START, REGION_MIX_END, t), rand, 0.1);
    const productMix = jitterMix(lerpMix(PRODUCT_MIX_START, PRODUCT_MIX_END, t), rand, 0.08);

    const planRev = splitByMix(revenue, planMix, PLANS.map((p) => p.id));
    const regionRev = splitByMix(revenue, regionMix, REGIONS.map((p) => p.id));
    const productRev = splitByMix(revenue, productMix, PRODUCTS.map((p) => p.id));

    const planMrr = splitByMix(mrr, planMix, PLANS.map((p) => p.id));
    const regionMrr = splitByMix(mrr, regionMix, REGIONS.map((p) => p.id));
    const productMrr = splitByMix(mrr, productMix, PRODUCTS.map((p) => p.id));

    const planCust = splitByMix(customers, planMix, PLANS.map((p) => p.id));
    const regionCust = splitByMix(customers, regionMix, REGIONS.map((p) => p.id));
    const productCust = splitByMix(customers, productMix, PRODUCTS.map((p) => p.id));

    const weightedChurn = (mix: Mix, weights: Mix, ids: string[], amount: number) => {
      const weighted: Mix = {};
      let totalW = 0;
      for (const id of ids) {
        const w = (mix[id] ?? 0) * (weights[id] ?? 1);
        weighted[id] = w;
        totalW += w;
      }
      for (const id of ids) weighted[id] = (weighted[id] ?? 0) / totalW;
      return splitByMix(amount, weighted, ids);
    };

    const planChurned = weightedChurn(planMix, PLAN_CHURN, PLANS.map((p) => p.id), churnedMrr);
    const regionChurned = weightedChurn(regionMix, REGION_CHURN, REGIONS.map((p) => p.id), churnedMrr);
    const productChurned = weightedChurn(productMix, PRODUCT_CHURN, PRODUCTS.map((p) => p.id), churnedMrr);

    const planNew = splitByMix(newMrr, planMix, PLANS.map((p) => p.id));
    const regionNew = splitByMix(newMrr, regionMix, REGIONS.map((p) => p.id));
    const productNew = splitByMix(newMrr, productMix, PRODUCTS.map((p) => p.id));

    for (const meta of PLANS) {
      plan[meta.id]!.push({
        date: iso,
        revenue: planRev[meta.id] ?? 0,
        mrr: planMrr[meta.id] ?? 0,
        newMrr: planNew[meta.id] ?? 0,
        churnedMrr: planChurned[meta.id] ?? 0,
        customers: Math.round(planCust[meta.id] ?? 0),
      });
    }
    for (const meta of REGIONS) {
      region[meta.id]!.push({
        date: iso,
        revenue: regionRev[meta.id] ?? 0,
        mrr: regionMrr[meta.id] ?? 0,
        newMrr: regionNew[meta.id] ?? 0,
        churnedMrr: regionChurned[meta.id] ?? 0,
        customers: Math.round(regionCust[meta.id] ?? 0),
      });
    }
    for (const meta of PRODUCTS) {
      product[meta.id]!.push({
        date: iso,
        revenue: productRev[meta.id] ?? 0,
        mrr: productMrr[meta.id] ?? 0,
        newMrr: productNew[meta.id] ?? 0,
        churnedMrr: productChurned[meta.id] ?? 0,
        customers: Math.round(productCust[meta.id] ?? 0),
      });
    }
  }

  return { total, plan, region, product };
}

export const SAMPLE = buildSample();

export function seriesFor(kind?: SegmentKind, id?: string): DailyPoint[] {
  if (!kind || !id) return SAMPLE.total;
  return SAMPLE[kind][id] ?? SAMPLE.total;
}
