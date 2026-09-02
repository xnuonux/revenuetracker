import { useMemo, useState } from "react";
import { ArrowDown, ArrowUp, ArrowUpDown, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatInt, formatKpiMoney, formatPct } from "@/lib/dashboard/format";
import type { BreakdownRow, SegmentFilter, SegmentKind } from "@/lib/dashboard/types";
import { cn } from "@/lib/utils";

const TABS: { id: SegmentKind; label: string }[] = [
  { id: "plan", label: "Plan" },
  { id: "region", label: "Region" },
  { id: "product", label: "Product" },
];

type SortKey = "name" | "customers" | "revenue" | "share" | "growth" | "churn";

type BreakdownTableProps = {
  kind: SegmentKind;
  onKind: (kind: SegmentKind) => void;
  rows: BreakdownRow[];
  filter: SegmentFilter;
  onFilter: (filter: SegmentFilter) => void;
};

function SortIcon({ active, dir }: { active: boolean; dir: "asc" | "desc" }) {
  if (!active) return <ArrowUpDown className="size-3.5 opacity-50" />;
  return dir === "asc" ? <ArrowUp className="size-3.5" /> : <ArrowDown className="size-3.5" />;
}

function toneFor(value: number, invert = false) {
  const favorable = invert ? value <= 0 : value >= 0;
  return favorable ? "up" : "down";
}

export function BreakdownTable({ kind, onKind, rows, filter, onFilter }: BreakdownTableProps) {
  const [sortKey, setSortKey] = useState<SortKey>("revenue");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  const sorted = useMemo(() => {
    const copy = [...rows];
    copy.sort((a, b) => {
      const av = a[sortKey];
      const bv = b[sortKey];
      if (typeof av === "string" && typeof bv === "string") {
        return sortDir === "asc" ? av.localeCompare(bv) : bv.localeCompare(av);
      }
      return sortDir === "asc" ? Number(av) - Number(bv) : Number(bv) - Number(av);
    });
    return copy;
  }, [rows, sortKey, sortDir]);

  function toggleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
      return;
    }
    setSortKey(key);
    setSortDir(key === "name" ? "asc" : "desc");
  }

  function onRow(id: string) {
    if (filter?.kind === kind && filter.id === id) {
      onFilter(null);
      return;
    }
    onFilter({ kind, id });
  }

  const headers: { key: SortKey; label: string; align?: "right" }[] = [
    { key: "name", label: "Segment" },
    { key: "customers", label: "Customers", align: "right" },
    { key: "revenue", label: "Revenue", align: "right" },
    { key: "share", label: "Share", align: "right" },
    { key: "growth", label: "Growth", align: "right" },
    { key: "churn", label: "Churn", align: "right" },
  ];

  const activeName = filter ? rows.find((r) => r.id === filter.id)?.name : null;

  return (
    <Card className="stagger-in">
      <CardHeader className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <CardTitle className="text-sm font-medium text-foreground">Breakdown</CardTitle>
          <p className="mt-1 text-xs text-muted-foreground">
            Metrics for the selected window. Click a row to filter charts and KPIs.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {filter && (
            <Button
              variant="secondary"
              size="sm"
              className="h-11 gap-1.5"
              onClick={() => onFilter(null)}
            >
              {activeName ?? "Filtered"}
              <X className="size-3.5" />
            </Button>
          )}
          <div
            role="tablist"
            aria-label="Breakdown dimension"
            className="flex rounded-lg bg-secondary p-1"
          >
            {TABS.map((tab) => {
              const active = kind === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => onKind(tab.id)}
                  className={cn(
                    "h-10 min-w-11 rounded-md px-3 text-sm font-medium transition-[color,background-color] duration-150 ease-out",
                    active
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0 pb-2">
        <div className="md:hidden space-y-2 px-3 pb-3">
          {sorted.map((row) => {
            const active = filter?.kind === kind && filter.id === row.id;
            return (
              <button
                key={row.id}
                type="button"
                onClick={() => onRow(row.id)}
                className={cn(
                  "w-full rounded-xl bg-secondary p-4 text-left shadow-card",
                  active && "ring-1 ring-ring/60",
                )}
              >
                <div className="flex items-baseline justify-between gap-3">
                  <span className="font-medium">{row.name}</span>
                  <span className="tabular-nums text-sm">{formatKpiMoney(row.revenue)}</span>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Badge tone="muted">{formatInt(row.customers)} cust.</Badge>
                  <Badge tone="muted">{(row.share * 100).toFixed(1)}%</Badge>
                  <Badge tone={toneFor(row.growth)}>{formatPct(row.growth)}</Badge>
                  <Badge tone="muted">{row.churn.toFixed(2)}% churn</Badge>
                </div>
              </button>
            );
          })}
        </div>

        <div className="hidden overflow-x-auto md:block">
          <table className="w-full min-w-160 text-sm">
            <thead>
              <tr className="border-b border-border text-muted-foreground">
                {headers.map((header) => (
                  <th key={header.key} className={cn("px-4 py-2 font-medium", header.align === "right" && "text-right")}>
                    <button
                      type="button"
                      onClick={() => toggleSort(header.key)}
                      className={cn(
                        "inline-flex h-11 items-center gap-1.5 hover:text-foreground",
                        header.align === "right" && "ml-auto",
                      )}
                    >
                      {header.label}
                      <SortIcon active={sortKey === header.key} dir={sortDir} />
                    </button>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sorted.map((row) => {
                const active = filter?.kind === kind && filter.id === row.id;
                return (
                  <tr
                    key={row.id}
                    onClick={() => onRow(row.id)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        onRow(row.id);
                      }
                    }}
                    tabIndex={0}
                    className={cn(
                      "cursor-pointer border-b border-border last:border-b-0 transition-colors duration-150 ease-out hover:bg-secondary/70",
                      active && "bg-secondary",
                    )}
                  >
                    <td className="px-4 py-3 font-medium">{row.name}</td>
                    <td className="px-4 py-3 text-right tabular-nums text-muted-foreground">
                      {formatInt(row.customers)}
                    </td>
                    <td className="px-4 py-3 text-right tabular-nums">{formatKpiMoney(row.revenue)}</td>
                    <td className="px-4 py-3 text-right tabular-nums text-muted-foreground">
                      {(row.share * 100).toFixed(1)}%
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Badge tone={toneFor(row.growth)}>{formatPct(row.growth)}</Badge>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Badge tone="muted">{row.churn.toFixed(2)}%</Badge>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
