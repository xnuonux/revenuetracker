import { cn } from "@/lib/utils";

type SparklineProps = {
  values: number[];
  className?: string;
  tone?: "neutral" | "up" | "down";
};

export function Sparkline({ values, className, tone = "neutral" }: SparklineProps) {
  if (values.length < 2) return null;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || 1;
  const w = 112;
  const h = 36;
  const pad = 2;
  const points = values
    .map((value, i) => {
      const x = pad + (i / (values.length - 1)) * (w - pad * 2);
      const y = h - pad - ((value - min) / span) * (h - pad * 2);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
  const stroke =
    tone === "up" ? "var(--color-up)" : tone === "down" ? "var(--color-down)" : "var(--color-chart)";

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      className={cn("h-9 w-28 overflow-visible", className)}
      aria-hidden="true"
    >
      <polyline
        fill="none"
        stroke={stroke}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points}
      />
    </svg>
  );
}
