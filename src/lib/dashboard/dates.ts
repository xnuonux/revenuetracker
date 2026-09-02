import type { DatePreset, DateRange } from "./types";

export const AS_OF = new Date("2026-09-02T12:00:00.000Z");
export const DATA_START = new Date("2024-01-01T12:00:00.000Z");

const DAY_MS = 86_400_000;

export function addDaysUtc(date: Date, days: number): Date {
  return new Date(date.getTime() + days * DAY_MS);
}

export function diffDaysUtc(from: Date, to: Date): number {
  return Math.round((to.getTime() - from.getTime()) / DAY_MS);
}

export function isoDay(date: Date): string {
  return date.toISOString().slice(0, 10);
}

export function parseIsoDay(iso: string): Date {
  return new Date(`${iso}T12:00:00.000Z`);
}

export function clampDate(date: Date, min: Date, max: Date): Date {
  if (date < min) return min;
  if (date > max) return max;
  return date;
}

export function rangeFromPreset(preset: Exclude<DatePreset, "custom">, asOf = AS_OF): DateRange {
  const to = asOf;
  switch (preset) {
    case "7d":
      return { from: addDaysUtc(to, -6), to };
    case "30d":
      return { from: addDaysUtc(to, -29), to };
    case "90d":
      return { from: addDaysUtc(to, -89), to };
    case "6m":
      return { from: addDaysUtc(to, -182), to };
    case "1y":
      return { from: addDaysUtc(to, -364), to };
    case "ytd":
      return { from: new Date(Date.UTC(to.getUTCFullYear(), 0, 1, 12)), to };
  }
}

export function previousRange(range: DateRange): DateRange {
  const days = diffDaysUtc(range.from, range.to) + 1;
  const to = addDaysUtc(range.from, -1);
  const from = addDaysUtc(to, -(days - 1));
  return { from, to };
}

export function inRange(iso: string, range: DateRange): boolean {
  const from = isoDay(range.from);
  const to = isoDay(range.to);
  return iso >= from && iso <= to;
}

export function utcFromLocal(date: Date): Date {
  return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), 12));
}

export function localFromUtc(date: Date): Date {
  return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
}
