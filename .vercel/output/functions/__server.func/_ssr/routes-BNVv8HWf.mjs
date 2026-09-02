import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as ArrowUp, i as CalendarDays, o as ArrowUpDown, r as CircleHelp, s as ArrowDown, t as X } from "../_libs/lucide-react.mjs";
import { t as DayPicker } from "../_libs/react-day-picker.mjs";
import { i as Slot } from "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { i as Trigger, n as Portal, r as Root2, t as Content2 } from "../_libs/@radix-ui/react-popover+[...].mjs";
import { a as Trigger$1, i as Root3, n as Portal$1, r as Provider, t as Content2$1 } from "../_libs/@radix-ui/react-tooltip+[...].mjs";
import { a as Area, c as Bar, i as XAxis, l as ResponsiveContainer, n as BarChart, o as Line, r as YAxis, s as CartesianGrid, t as ComposedChart, u as Tooltip } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BNVv8HWf.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[color,background-color,box-shadow,transform,opacity] duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/70 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:not-disabled:scale-[0.96]", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground hover:bg-primary/90",
			secondary: "bg-secondary text-secondary-foreground hover:bg-accent",
			outline: "shadow-card hover:shadow-card-hover bg-transparent hover:bg-secondary",
			ghost: "hover:bg-secondary hover:text-foreground text-muted-foreground",
			selected: "bg-primary text-primary-foreground"
		},
		size: {
			default: "h-11 px-4",
			sm: "h-11 px-3 text-sm",
			icon: "size-11"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
function Button({ className, variant, size, asChild = false, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		...props
	});
}
function Popover({ ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root2, { ...props });
}
function PopoverTrigger({ ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trigger, { ...props });
}
function PopoverContent({ className, align = "end", sideOffset = 8, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
		align,
		sideOffset,
		className: cn("z-50 w-auto rounded-xl bg-popover p-3 text-popover-foreground shadow-popover outline-none origin-[--radix-popover-content-transform-origin]", className),
		...props
	}) });
}
var AS_OF = /* @__PURE__ */ new Date("2026-09-02T12:00:00.000Z");
var DATA_START = /* @__PURE__ */ new Date("2024-01-01T12:00:00.000Z");
var DAY_MS = 864e5;
function addDaysUtc(date, days) {
	return new Date(date.getTime() + days * DAY_MS);
}
function diffDaysUtc(from, to) {
	return Math.round((to.getTime() - from.getTime()) / DAY_MS);
}
function isoDay(date) {
	return date.toISOString().slice(0, 10);
}
function parseIsoDay(iso) {
	return /* @__PURE__ */ new Date(`${iso}T12:00:00.000Z`);
}
function clampDate(date, min, max) {
	if (date < min) return min;
	if (date > max) return max;
	return date;
}
function rangeFromPreset(preset, asOf = AS_OF) {
	const to = asOf;
	switch (preset) {
		case "7d": return {
			from: addDaysUtc(to, -6),
			to
		};
		case "30d": return {
			from: addDaysUtc(to, -29),
			to
		};
		case "90d": return {
			from: addDaysUtc(to, -89),
			to
		};
		case "6m": return {
			from: addDaysUtc(to, -182),
			to
		};
		case "1y": return {
			from: addDaysUtc(to, -364),
			to
		};
		case "ytd": return {
			from: new Date(Date.UTC(to.getUTCFullYear(), 0, 1, 12)),
			to
		};
	}
}
function previousRange(range) {
	const days = diffDaysUtc(range.from, range.to) + 1;
	const to = addDaysUtc(range.from, -1);
	return {
		from: addDaysUtc(to, -(days - 1)),
		to
	};
}
function inRange(iso, range) {
	const from = isoDay(range.from);
	const to = isoDay(range.to);
	return iso >= from && iso <= to;
}
function utcFromLocal(date) {
	return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), 12));
}
function localFromUtc(date) {
	return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
}
function formatMoney(value, compact = false) {
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
		notation: compact ? "compact" : "standard",
		maximumFractionDigits: compact ? 1 : 0
	}).format(value);
}
function formatKpiMoney(value) {
	const abs = Math.abs(value);
	if (abs >= 1e6) return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
		notation: "compact",
		maximumFractionDigits: 2
	}).format(value);
	if (abs >= 1e3) return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
		notation: "compact",
		maximumFractionDigits: 1
	}).format(value);
	return formatMoney(value);
}
function formatPct(value, digits = 1) {
	return `${value > 0 ? "+" : ""}${value.toFixed(digits)}%`;
}
function formatPp(value) {
	return `${value > 0 ? "+" : ""}${value.toFixed(2)} pp`;
}
function formatInt(value) {
	return new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(value);
}
function formatDate(date) {
	return new Intl.DateTimeFormat("en-US", {
		month: "short",
		day: "numeric",
		year: "numeric",
		timeZone: "UTC"
	}).format(date);
}
function formatDateShort(date) {
	return new Intl.DateTimeFormat("en-US", {
		month: "short",
		day: "numeric",
		timeZone: "UTC"
	}).format(date);
}
var PRESETS = [
	{
		id: "7d",
		label: "7D"
	},
	{
		id: "30d",
		label: "30D"
	},
	{
		id: "90d",
		label: "90D"
	},
	{
		id: "6m",
		label: "6M"
	},
	{
		id: "ytd",
		label: "YTD"
	},
	{
		id: "1y",
		label: "1Y"
	}
];
function DateRangeFilter({ preset, range, onPreset, onCustom }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	const selected = {
		from: localFromUtc(range.from),
		to: localFromUtc(range.to)
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex w-full min-w-0 items-center gap-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			role: "tablist",
			"aria-label": "Date range",
			className: "flex min-w-0 flex-1 flex-nowrap gap-1 overflow-x-auto rounded-lg bg-secondary p-1",
			children: PRESETS.map((item) => {
				const active = preset === item.id;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					role: "tab",
					"aria-selected": active,
					onClick: () => onPreset(item.id),
					className: cn("h-11 min-w-11 shrink-0 rounded-md px-3 text-sm font-medium transition-[color,background-color,transform] duration-150 ease-out active:scale-[0.96]", active ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"),
					children: item.label
				}, item.id);
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Popover, {
			open,
			onOpenChange: setOpen,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverTrigger, {
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: preset === "custom" ? "selected" : "outline",
					size: "sm",
					"aria-label": "Custom date range",
					className: "shrink-0 gap-2 px-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarDays, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "hidden tabular-nums sm:inline",
						children: [
							formatDateShort(range.from),
							" – ",
							formatDateShort(range.to)
						]
					})]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopoverContent, {
				className: "w-auto p-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DayPicker, {
					mode: "range",
					selected,
					defaultMonth: localFromUtc(range.from),
					numberOfMonths: 1,
					disabled: {
						before: localFromUtc(DATA_START),
						after: localFromUtc(AS_OF)
					},
					onSelect: (next) => {
						if (!next?.from) return;
						onCustom({
							from: utcFromLocal(next.from),
							to: utcFromLocal(next.to ?? next.from)
						});
						if (next.from && next.to && isoDay(utcFromLocal(next.from)) !== isoDay(utcFromLocal(next.to))) setOpen(false);
					}
				})
			})]
		})]
	});
}
var badgeVariants = cva("inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium tabular-nums", {
	variants: { tone: {
		up: "bg-up/15 text-up",
		down: "bg-down/15 text-down",
		muted: "bg-secondary text-muted-foreground"
	} },
	defaultVariants: { tone: "muted" }
});
function Badge({ className, tone, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn(badgeVariants({ tone }), className),
		...props
	});
}
function Card({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("rounded-2xl bg-card text-card-foreground shadow-card", className),
		...props
	});
}
function CardHeader({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("flex flex-col gap-1 p-4 pb-0", className),
		...props
	});
}
function CardTitle({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
		className: cn("text-sm font-medium text-muted-foreground", className),
		...props
	});
}
function CardContent({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("p-4", className),
		...props
	});
}
var TABS = [
	{
		id: "plan",
		label: "Plan"
	},
	{
		id: "region",
		label: "Region"
	},
	{
		id: "product",
		label: "Product"
	}
];
function SortIcon({ active, dir }) {
	if (!active) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpDown, { className: "size-3.5 opacity-50" });
	return dir === "asc" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUp, { className: "size-3.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowDown, { className: "size-3.5" });
}
function toneFor(value, invert = false) {
	return (invert ? value <= 0 : value >= 0) ? "up" : "down";
}
function BreakdownTable({ kind, onKind, rows, filter, onFilter }) {
	const [sortKey, setSortKey] = (0, import_react.useState)("revenue");
	const [sortDir, setSortDir] = (0, import_react.useState)("desc");
	const sorted = (0, import_react.useMemo)(() => {
		const copy = [...rows];
		copy.sort((a, b) => {
			const av = a[sortKey];
			const bv = b[sortKey];
			if (typeof av === "string" && typeof bv === "string") return sortDir === "asc" ? av.localeCompare(bv) : bv.localeCompare(av);
			return sortDir === "asc" ? Number(av) - Number(bv) : Number(bv) - Number(av);
		});
		return copy;
	}, [
		rows,
		sortKey,
		sortDir
	]);
	function toggleSort(key) {
		if (sortKey === key) {
			setSortDir((d) => d === "asc" ? "desc" : "asc");
			return;
		}
		setSortKey(key);
		setSortDir(key === "name" ? "asc" : "desc");
	}
	function onRow(id) {
		if (filter?.kind === kind && filter.id === id) {
			onFilter(null);
			return;
		}
		onFilter({
			kind,
			id
		});
	}
	const headers = [
		{
			key: "name",
			label: "Segment"
		},
		{
			key: "customers",
			label: "Customers",
			align: "right"
		},
		{
			key: "revenue",
			label: "Revenue",
			align: "right"
		},
		{
			key: "share",
			label: "Share",
			align: "right"
		},
		{
			key: "growth",
			label: "Growth",
			align: "right"
		},
		{
			key: "churn",
			label: "Churn",
			align: "right"
		}
	];
	const activeName = filter ? rows.find((r) => r.id === filter.id)?.name : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "stagger-in",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
			className: "flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
				className: "text-sm font-medium text-foreground",
				children: "Breakdown"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-xs text-muted-foreground",
				children: "Metrics for the selected window. Click a row to filter charts and KPIs."
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-2",
				children: [filter && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "secondary",
					size: "sm",
					className: "h-11 gap-1.5",
					onClick: () => onFilter(null),
					children: [activeName ?? "Filtered", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-3.5" })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					role: "tablist",
					"aria-label": "Breakdown dimension",
					className: "flex rounded-lg bg-secondary p-1",
					children: TABS.map((tab) => {
						const active = kind === tab.id;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							role: "tab",
							"aria-selected": active,
							onClick: () => onKind(tab.id),
							className: cn("h-10 min-w-11 rounded-md px-3 text-sm font-medium transition-[color,background-color] duration-150 ease-out", active ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"),
							children: tab.label
						}, tab.id);
					})
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
			className: "p-0 pb-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "md:hidden space-y-2 px-3 pb-3",
				children: sorted.map((row) => {
					const active = filter?.kind === kind && filter.id === row.id;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => onRow(row.id),
						className: cn("w-full rounded-xl bg-secondary p-4 text-left shadow-card", active && "ring-1 ring-ring/60"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-baseline justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium",
								children: row.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "tabular-nums text-sm",
								children: formatKpiMoney(row.revenue)
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 flex flex-wrap gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
									tone: "muted",
									children: [formatInt(row.customers), " cust."]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
									tone: "muted",
									children: [(row.share * 100).toFixed(1), "%"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									tone: toneFor(row.growth),
									children: formatPct(row.growth)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
									tone: "muted",
									children: [row.churn.toFixed(2), "% churn"]
								})
							]
						})]
					}, row.id);
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "hidden overflow-x-auto md:block",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full min-w-160 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", {
						className: "border-b border-border text-muted-foreground",
						children: headers.map((header) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: cn("px-4 py-2 font-medium", header.align === "right" && "text-right"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => toggleSort(header.key),
								className: cn("inline-flex h-11 items-center gap-1.5 hover:text-foreground", header.align === "right" && "ml-auto"),
								children: [header.label, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SortIcon, {
									active: sortKey === header.key,
									dir: sortDir
								})]
							})
						}, header.key))
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: sorted.map((row) => {
						const active = filter?.kind === kind && filter.id === row.id;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							onClick: () => onRow(row.id),
							onKeyDown: (event) => {
								if (event.key === "Enter" || event.key === " ") {
									event.preventDefault();
									onRow(row.id);
								}
							},
							tabIndex: 0,
							className: cn("cursor-pointer border-b border-border last:border-b-0 transition-colors duration-150 ease-out hover:bg-secondary/70", active && "bg-secondary"),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-3 font-medium",
									children: row.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-3 text-right tabular-nums text-muted-foreground",
									children: formatInt(row.customers)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-3 text-right tabular-nums",
									children: formatKpiMoney(row.revenue)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
									className: "px-4 py-3 text-right tabular-nums text-muted-foreground",
									children: [(row.share * 100).toFixed(1), "%"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-3 text-right",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										tone: toneFor(row.growth),
										children: formatPct(row.growth)
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-3 text-right",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
										tone: "muted",
										children: [row.churn.toFixed(2), "%"]
									})
								})
							]
						}, row.id);
					}) })]
				})
			})]
		})]
	});
}
function TooltipProvider({ delayDuration = 200, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Provider, {
		delayDuration,
		...props
	});
}
function Tooltip$1({ ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root3, { ...props });
}
function TooltipTrigger({ ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trigger$1, { ...props });
}
function TooltipContent({ className, sideOffset = 6, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal$1, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2$1, {
		sideOffset,
		className: cn("z-50 max-w-xs rounded-md bg-popover px-3 py-2 text-xs leading-snug text-popover-foreground shadow-popover origin-[--radix-tooltip-content-transform-origin] animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0", className),
		...props
	}) });
}
function Sparkline({ values, className, tone = "neutral" }) {
	if (values.length < 2) return null;
	const min = Math.min(...values);
	const span = Math.max(...values) - min || 1;
	const w = 112;
	const h = 36;
	const pad = 2;
	const points = values.map((value, i) => {
		const x = pad + i / (values.length - 1) * 108;
		const y = 34 - (value - min) / span * 32;
		return `${x.toFixed(1)},${y.toFixed(1)}`;
	}).join(" ");
	const stroke = tone === "up" ? "var(--color-up)" : tone === "down" ? "var(--color-down)" : "var(--color-chart)";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		viewBox: `0 0 ${w} ${h}`,
		className: cn("h-9 w-28 overflow-visible", className),
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("polyline", {
			fill: "none",
			stroke,
			strokeWidth: "1.6",
			strokeLinecap: "round",
			strokeLinejoin: "round",
			points
		})
	});
}
function Delta({ value, invert, asPoints }) {
	if (value === null) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
		tone: "muted",
		children: "No prior period"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
		tone: (invert ? value <= 0 : value >= 0) ? "up" : "down",
		children: [asPoints ? formatPp(value) : formatPct(value), " vs prior"]
	});
}
function KpiCard({ label, hint, value, delta, invertDelta, asPoints, spark, sparkTone }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "stagger-in p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-medium text-muted-foreground",
						children: label
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tooltip$1, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipTrigger, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "relative inline-flex size-6 items-center justify-center rounded-md text-muted-foreground after:absolute after:size-11 hover:text-foreground",
							"aria-label": `${label} definition`,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleHelp, { className: "size-3.5" })
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipContent, {
						side: "bottom",
						children: hint
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkline, {
					values: spark,
					tone: sparkTone
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 font-display text-3xl tracking-tight text-foreground tabular-nums sm:text-4xl",
				children: value
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Delta, {
					value: delta,
					invert: invertDelta,
					asPoints
				})
			})
		]
	});
}
function KpiCards({ kpis }) {
	const growthTone = kpis.growth >= 0 ? "up" : "down";
	const churnTone = kpis.churnDelta === null ? "neutral" : kpis.churnDelta <= 0 ? "up" : "down";
	const revenueTone = kpis.revenueDelta === null ? "neutral" : kpis.revenueDelta >= 0 ? "up" : "down";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
				label: "Revenue",
				hint: "Recognized revenue in the selected window, compared with the previous window of equal length.",
				value: formatKpiMoney(kpis.revenue),
				delta: kpis.revenueDelta,
				spark: kpis.sparkRevenue,
				sparkTone: revenueTone
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
				label: "Growth",
				hint: "Net MRR change in this window, expressed as a monthly rate so ranges stay comparable.",
				value: formatPct(kpis.growth, 2),
				delta: kpis.growthDelta,
				asPoints: true,
				spark: kpis.sparkGrowth,
				sparkTone: growthTone
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCard, {
				label: "Churn",
				hint: "Gross MRR lost in this window, expressed as a monthly rate. Lower is better.",
				value: `${kpis.churn.toFixed(2)}%`,
				delta: kpis.churnDelta,
				invertDelta: true,
				asPoints: true,
				spark: kpis.sparkChurn,
				sparkTone: churnTone
			})
		]
	});
}
function ChartTooltip({ active, payload, label, kind = "revenue" }) {
	if (!active || !payload?.length) return null;
	const row = payload[0]?.payload;
	if (!row) return null;
	if (kind === "movement") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-md bg-popover px-3 py-2 text-xs shadow-popover",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-medium text-foreground",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-1.5 flex justify-between gap-6 text-muted-foreground",
				children: ["New MRR", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "tabular-nums text-up",
					children: formatMoney(row.newMrr)
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-1 flex justify-between gap-6 text-muted-foreground",
				children: ["Lost MRR", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "tabular-nums text-down",
					children: formatMoney(row.churnedMrr)
				})]
			})
		]
	});
	const delta = row.previous && row.previous !== 0 ? (row.revenue - row.previous) / row.previous * 100 : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-md bg-popover px-3 py-2 text-xs shadow-popover",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-medium text-foreground",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-1.5 flex justify-between gap-6 text-muted-foreground",
				children: ["Revenue", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "tabular-nums text-foreground",
					children: formatMoney(row.revenue)
				})]
			}),
			row.previous !== null && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-1 flex justify-between gap-6 text-muted-foreground",
				children: ["Prior period", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "tabular-nums text-foreground",
					children: formatMoney(row.previous)
				})]
			}),
			delta !== null && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-1 flex justify-between gap-6 text-muted-foreground",
				children: ["Change", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: delta >= 0 ? "tabular-nums text-up" : "tabular-nums text-down",
					children: formatPct(delta)
				})]
			})
		]
	});
}
function ChartSkeleton$1({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: cn("animate-pulse rounded-lg bg-secondary", className) });
}
function SecondaryCharts({ movement, mix, onSelect, selectedId }) {
	const [ready, setReady] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setReady(true);
	}, []);
	const maxShare = Math.max(...mix.map((row) => row.share), .01);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid grid-cols-1 gap-3 lg:grid-cols-2 lg:gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "stagger-in",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
				className: "p-4 pb-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
					className: "text-sm font-medium text-foreground",
					children: "New vs lost MRR"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-xs text-muted-foreground",
					children: "Gross adds against churned recurring revenue in each bucket."
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
				className: "pt-2",
				children: ready ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-56",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
						width: "100%",
						height: "100%",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
							data: movement,
							margin: {
								top: 8,
								right: 8,
								left: 0,
								bottom: 0
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
									vertical: false,
									stroke: "var(--color-border)",
									strokeDasharray: "3 6"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
									dataKey: "label",
									tickLine: false,
									axisLine: false,
									tick: {
										fill: "var(--color-muted-foreground)",
										fontSize: 11
									},
									interval: "preserveStartEnd",
									minTickGap: 24
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
									tickLine: false,
									axisLine: false,
									width: 48,
									tick: {
										fill: "var(--color-muted-foreground)",
										fontSize: 11
									},
									tickFormatter: (value) => formatKpiMoney(value)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
									content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartTooltip, { kind: "movement" }),
									cursor: { fill: "var(--color-secondary)" }
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
									dataKey: "newMrr",
									fill: "var(--color-chart)",
									name: "New",
									radius: [
										4,
										4,
										0,
										0
									],
									maxBarSize: 18
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
									dataKey: "churnedMrr",
									fill: "var(--color-lost)",
									name: "Lost",
									radius: [
										4,
										4,
										0,
										0
									],
									maxBarSize: 18
								})
							]
						})
					})
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartSkeleton$1, { className: "h-56" })
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "stagger-in",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
				className: "p-4 pb-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
					className: "text-sm font-medium text-foreground",
					children: "Mix"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-xs text-muted-foreground",
					children: "Share of period revenue. Select a bar to filter the dashboard."
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
				className: "flex flex-col justify-center gap-3 pt-2",
				children: mix.map((row) => {
					const active = selectedId === row.id;
					const width = `${Math.max(8, row.share / maxShare * 100)}%`;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => onSelect(row.id),
						className: cn("group rounded-lg p-2 text-left transition-[background-color] duration-150 ease-out hover:bg-secondary", active && "bg-secondary"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-1.5 flex items-baseline justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm font-medium text-foreground",
								children: row.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-xs tabular-nums text-muted-foreground",
								children: [
									formatKpiMoney(row.revenue),
									" · ",
									(row.share * 100).toFixed(1),
									"%"
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-2 overflow-hidden rounded-full bg-secondary",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-full rounded-full bg-chart transition-[width] duration-200 ease-out",
								style: { width }
							})
						})]
					}, row.id);
				})
			})]
		})]
	});
}
function grainLabel(grain) {
	if (grain === "day") return "Daily";
	if (grain === "week") return "Weekly";
	return "Monthly";
}
function ChartSkeleton() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-72 animate-pulse rounded-lg bg-secondary" });
}
function TrendChart({ rows, grain }) {
	const [ready, setReady] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setReady(true);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "stagger-in",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
			className: "flex flex-row items-start justify-between gap-3 p-4 pb-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
				className: "text-sm font-medium text-foreground",
				children: "Revenue trend"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-1 text-xs text-muted-foreground",
				children: [grainLabel(grain), " recognized revenue, with the prior window as a dashed overlay."]
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "hidden items-center gap-3 text-xs text-muted-foreground sm:flex",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "inline-flex items-center gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px w-4 bg-chart" }), "Current"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "inline-flex items-center gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px w-4 border-t border-dashed border-chart-prev" }), "Prior"]
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
			className: "pt-2",
			children: ready ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "h-72",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
					width: "100%",
					height: "100%",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ComposedChart, {
						data: rows,
						margin: {
							top: 8,
							right: 8,
							left: 0,
							bottom: 0
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
								id: "revenueFill",
								x1: "0",
								y1: "0",
								x2: "0",
								y2: "1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
									offset: "0%",
									stopColor: "var(--color-chart)",
									stopOpacity: .28
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
									offset: "100%",
									stopColor: "var(--color-chart)",
									stopOpacity: 0
								})]
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
								vertical: false,
								stroke: "var(--color-border)",
								strokeDasharray: "3 6"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
								dataKey: "label",
								tickLine: false,
								axisLine: false,
								tick: {
									fill: "var(--color-muted-foreground)",
									fontSize: 11
								},
								interval: "preserveStartEnd",
								minTickGap: 28
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
								tickLine: false,
								axisLine: false,
								width: 56,
								tick: {
									fill: "var(--color-muted-foreground)",
									fontSize: 11
								},
								tickFormatter: (value) => Math.abs(value) >= 1e3 ? `$${Math.round(value / 1e3)}k` : `$${Math.round(value)}`
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
								content: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartTooltip, { kind: "revenue" }),
								cursor: {
									stroke: "var(--color-border)",
									strokeDasharray: "4 4"
								}
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
								type: "monotone",
								dataKey: "revenue",
								stroke: "var(--color-chart)",
								strokeWidth: 2,
								fill: "url(#revenueFill)",
								name: "Revenue",
								activeDot: {
									r: 4,
									fill: "var(--color-chart)",
									stroke: "var(--color-card)"
								}
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
								type: "monotone",
								dataKey: "previous",
								stroke: "var(--color-chart-prev)",
								strokeWidth: 1.5,
								strokeDasharray: "5 4",
								dot: false,
								name: "Prior",
								connectNulls: true
							})
						]
					})
				})
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartSkeleton, {})
		})]
	});
}
function mulberry32(seed) {
	let a = seed >>> 0;
	return () => {
		a |= 0;
		a = a + 1831565813 | 0;
		let t = Math.imul(a ^ a >>> 15, 1 | a);
		t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
		return ((t ^ t >>> 14) >>> 0) / 4294967296;
	};
}
var PLANS = [
	{
		id: "starter",
		kind: "plan",
		name: "Starter"
	},
	{
		id: "growth",
		kind: "plan",
		name: "Growth"
	},
	{
		id: "scale",
		kind: "plan",
		name: "Scale"
	},
	{
		id: "enterprise",
		kind: "plan",
		name: "Enterprise"
	}
];
var REGIONS = [
	{
		id: "na",
		kind: "region",
		name: "North America"
	},
	{
		id: "eu",
		kind: "region",
		name: "Europe"
	},
	{
		id: "apac",
		kind: "region",
		name: "Asia Pacific"
	},
	{
		id: "latam",
		kind: "region",
		name: "Latin America"
	}
];
var PRODUCTS = [
	{
		id: "platform",
		kind: "product",
		name: "Platform"
	},
	{
		id: "analytics",
		kind: "product",
		name: "Analytics"
	},
	{
		id: "api",
		kind: "product",
		name: "Relay API"
	},
	{
		id: "services",
		kind: "product",
		name: "Services"
	}
];
var SEGMENTS_BY_KIND = {
	plan: PLANS,
	region: REGIONS,
	product: PRODUCTS
};
var PLAN_MIX_START = {
	starter: .18,
	growth: .3,
	scale: .32,
	enterprise: .2
};
var PLAN_MIX_END = {
	starter: .1,
	growth: .26,
	scale: .36,
	enterprise: .28
};
var REGION_MIX_START = {
	na: .52,
	eu: .28,
	apac: .14,
	latam: .06
};
var REGION_MIX_END = {
	na: .46,
	eu: .27,
	apac: .2,
	latam: .07
};
var PRODUCT_MIX_START = {
	platform: .58,
	analytics: .22,
	api: .12,
	services: .08
};
var PRODUCT_MIX_END = {
	platform: .5,
	analytics: .26,
	api: .16,
	services: .08
};
var PLAN_CHURN = {
	starter: 1.7,
	growth: 1.15,
	scale: .75,
	enterprise: .4
};
var REGION_CHURN = {
	na: .9,
	eu: .85,
	apac: 1.2,
	latam: 1.35
};
var PRODUCT_CHURN = {
	platform: .85,
	analytics: 1.05,
	api: .7,
	services: 1.4
};
function lerpMix(start, end, t) {
	const out = {};
	let total = 0;
	for (const key of Object.keys(start)) {
		const value = start[key] + (end[key] - start[key]) * t;
		out[key] = value;
		total += value;
	}
	for (const key of Object.keys(out)) out[key] = out[key] / total;
	return out;
}
function jitterMix(mix, rand, amplitude) {
	const out = {};
	let total = 0;
	for (const key of Object.keys(mix)) {
		const value = Math.max(.01, mix[key] * (1 + (rand() - .5) * amplitude));
		out[key] = value;
		total += value;
	}
	for (const key of Object.keys(out)) out[key] = out[key] / total;
	return out;
}
function splitByMix(total, mix, ids) {
	const out = {};
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
function eventMultiplier(iso) {
	if (iso >= "2025-11-12" && iso <= "2025-11-18") return .62;
	if (iso >= "2026-01-06" && iso <= "2026-01-20") return 1.16;
	if (iso >= "2026-04-01" && iso <= "2026-04-07") return 1.22;
	if (iso >= "2026-06-18" && iso <= "2026-06-22") return .84;
	return 1;
}
function emptyBuckets(metas) {
	return Object.fromEntries(metas.map((m) => [m.id, []]));
}
function buildSample() {
	const rand = mulberry32(20260902);
	const dayCount = diffDaysUtc(DATA_START, AS_OF) + 1;
	const total = [];
	const plan = emptyBuckets(PLANS);
	const region = emptyBuckets(REGIONS);
	const product = emptyBuckets(PRODUCTS);
	let mrr = 118e3;
	let customers = 1860;
	for (let i = 0; i < dayCount; i++) {
		const date = addDaysUtc(DATA_START, i);
		const iso = isoDay(date);
		const t = i / Math.max(1, dayCount - 1);
		const dow = date.getUTCDay();
		const weekend = dow === 0 || dow === 6 ? .74 : dow === 2 || dow === 3 ? 1.05 : 1;
		const seasonal = 1 + .07 * Math.sin(2 * Math.PI * (i + 40) / 365);
		const growth = 1.00095;
		const netNewRate = .00115 + (rand() - .45) * 35e-5;
		const churnRate = 72e-5 + (rand() - .5) * 22e-5;
		const newMrr = mrr * netNewRate * eventMultiplier(iso);
		const churnedMrr = mrr * churnRate;
		mrr = Math.max(4e4, (mrr + newMrr - churnedMrr) * growth);
		const usage = mrr * (.18 + rand() * .08);
		const revenue = (mrr / 30.44 + usage / 30.44) * weekend * seasonal * eventMultiplier(iso) * (1 + (rand() - .5) * .08);
		const newCust = Math.max(0, Math.round(customers * (.0024 + (rand() - .4) * .0012)));
		const lostCust = Math.max(0, Math.round(customers * (7e-4 + rand() * 5e-4)));
		customers = Math.max(400, customers + newCust - lostCust);
		const point = {
			date: iso,
			revenue,
			mrr,
			newMrr,
			churnedMrr,
			customers
		};
		total.push(point);
		const planMix = jitterMix(lerpMix(PLAN_MIX_START, PLAN_MIX_END, t), rand, .08);
		const regionMix = jitterMix(lerpMix(REGION_MIX_START, REGION_MIX_END, t), rand, .1);
		const productMix = jitterMix(lerpMix(PRODUCT_MIX_START, PRODUCT_MIX_END, t), rand, .08);
		const planRev = splitByMix(revenue, planMix, PLANS.map((p) => p.id));
		const regionRev = splitByMix(revenue, regionMix, REGIONS.map((p) => p.id));
		const productRev = splitByMix(revenue, productMix, PRODUCTS.map((p) => p.id));
		const planMrr = splitByMix(mrr, planMix, PLANS.map((p) => p.id));
		const regionMrr = splitByMix(mrr, regionMix, REGIONS.map((p) => p.id));
		const productMrr = splitByMix(mrr, productMix, PRODUCTS.map((p) => p.id));
		const planCust = splitByMix(customers, planMix, PLANS.map((p) => p.id));
		const regionCust = splitByMix(customers, regionMix, REGIONS.map((p) => p.id));
		const productCust = splitByMix(customers, productMix, PRODUCTS.map((p) => p.id));
		const weightedChurn = (mix, weights, ids, amount) => {
			const weighted = {};
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
		for (const meta of PLANS) plan[meta.id].push({
			date: iso,
			revenue: planRev[meta.id] ?? 0,
			mrr: planMrr[meta.id] ?? 0,
			newMrr: planNew[meta.id] ?? 0,
			churnedMrr: planChurned[meta.id] ?? 0,
			customers: Math.round(planCust[meta.id] ?? 0)
		});
		for (const meta of REGIONS) region[meta.id].push({
			date: iso,
			revenue: regionRev[meta.id] ?? 0,
			mrr: regionMrr[meta.id] ?? 0,
			newMrr: regionNew[meta.id] ?? 0,
			churnedMrr: regionChurned[meta.id] ?? 0,
			customers: Math.round(regionCust[meta.id] ?? 0)
		});
		for (const meta of PRODUCTS) product[meta.id].push({
			date: iso,
			revenue: productRev[meta.id] ?? 0,
			mrr: productMrr[meta.id] ?? 0,
			newMrr: productNew[meta.id] ?? 0,
			churnedMrr: productChurned[meta.id] ?? 0,
			customers: Math.round(productCust[meta.id] ?? 0)
		});
	}
	return {
		total,
		plan,
		region,
		product
	};
}
var SAMPLE = buildSample();
function seriesFor(kind, id) {
	if (!kind || !id) return SAMPLE.total;
	return SAMPLE[kind][id] ?? SAMPLE.total;
}
function sum(points, key) {
	return points.reduce((acc, p) => acc + p[key], 0);
}
function slicePoints(points, range) {
	return points.filter((p) => inRange(p.date, range));
}
function monthlyFromPeriod(fraction, days) {
	if (days <= 0) return 0;
	return fraction * (30.44 / days) * 100;
}
function rollingWindow(values, size) {
	if (values.length === 0) return [];
	const out = [];
	let run = 0;
	for (let i = 0; i < values.length; i++) {
		run += values[i];
		if (i >= size) run -= values[i - size];
		const denom = Math.min(i + 1, size);
		out.push(run / denom);
	}
	return out;
}
function sparkGrowth(points) {
	if (points.length < 2) return points.map(() => 0);
	const window = Math.min(14, Math.max(3, Math.floor(points.length / 6)));
	const rates = [];
	for (let i = 0; i < points.length; i++) {
		const startIdx = Math.max(0, i - window);
		const start = points[startIdx].mrr;
		const end = points[i].mrr;
		const days = i - startIdx + 1;
		rates.push(start === 0 ? 0 : monthlyFromPeriod((end - start) / start, days));
	}
	return rates;
}
function sparkChurn(points) {
	const window = Math.min(14, Math.max(3, Math.floor(points.length / 6)));
	const rates = [];
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
function computeKpis(current, previous) {
	const days = current.length;
	const revenue = sum(current, "revenue");
	const revenuePrev = previous.length ? sum(previous, "revenue") : null;
	const revenueDelta = revenuePrev && revenuePrev !== 0 ? (revenue - revenuePrev) / revenuePrev * 100 : null;
	const mrrStart = current[0]?.mrr ?? 0;
	const mrrEnd = current[current.length - 1]?.mrr ?? 0;
	const growth = mrrStart === 0 ? 0 : monthlyFromPeriod((mrrEnd - mrrStart) / mrrStart, days);
	const prevDays = previous.length;
	const prevStart = previous[0]?.mrr ?? 0;
	const prevEnd = previous[previous.length - 1]?.mrr ?? 0;
	const growthPrev = prevDays && prevStart !== 0 ? monthlyFromPeriod((prevEnd - prevStart) / prevStart, prevDays) : null;
	const growthDelta = growthPrev === null ? null : growth - growthPrev;
	const churned = sum(current, "churnedMrr");
	const churn = mrrStart === 0 ? 0 : monthlyFromPeriod(churned / mrrStart, days);
	const churnedPrev = previous.length ? sum(previous, "churnedMrr") : 0;
	const churnPrev = prevDays && prevStart !== 0 ? monthlyFromPeriod(churnedPrev / prevStart, prevDays) : null;
	return {
		revenue,
		revenuePrev,
		revenueDelta,
		growth,
		growthPrev,
		growthDelta,
		churn,
		churnPrev,
		churnDelta: churnPrev === null ? null : churn - churnPrev,
		customers: current[current.length - 1]?.customers ?? 0,
		sparkRevenue: rollingWindow(current.map((p) => p.revenue), Math.min(7, Math.max(1, Math.floor(days / 8)))),
		sparkGrowth: sparkGrowth(current),
		sparkChurn: sparkChurn(current)
	};
}
function grainFor(range) {
	const days = diffDaysUtc(range.from, range.to) + 1;
	if (days <= 31) return "day";
	if (days <= 183) return "week";
	return "month";
}
function bucketKey(iso, grain) {
	if (grain === "day") return iso;
	if (grain === "month") return iso.slice(0, 7);
	const date = parseIsoDay(iso);
	return isoDay(addDaysUtc(date, -((date.getUTCDay() + 6) % 7)));
}
function bucketLabel(key, grain) {
	if (grain === "month") {
		const date = parseIsoDay(`${key}-01`);
		return new Intl.DateTimeFormat("en-US", {
			month: "short",
			year: "numeric",
			timeZone: "UTC"
		}).format(date);
	}
	return formatDateShort(parseIsoDay(key));
}
function aggregate(points, grain) {
	const map = /* @__PURE__ */ new Map();
	for (const point of points) {
		const key = bucketKey(point.date, grain);
		const existing = map.get(key);
		if (!existing) {
			map.set(key, {
				...point,
				date: key
			});
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
function buildChartRows(current, previous, grain) {
	const currentBuckets = [...aggregate(current, grain).entries()];
	const previousBuckets = [...aggregate(previous, grain).values()];
	return currentBuckets.map(([key, point], index) => ({
		key,
		label: bucketLabel(key, grain),
		revenue: point.revenue,
		previous: previousBuckets[index]?.revenue ?? null,
		newMrr: point.newMrr,
		churnedMrr: point.churnedMrr
	}));
}
function buildBreakdown(range, kind) {
	const metas = SEGMENTS_BY_KIND[kind];
	const prev = previousRange(range);
	const rows = metas.map((meta) => {
		const series = seriesFor(kind, meta.id);
		const kpis = computeKpis(slicePoints(series, range), slicePoints(series, prev));
		return {
			id: meta.id,
			kind,
			name: meta.name,
			customers: kpis.customers,
			revenue: kpis.revenue,
			share: 0,
			growth: kpis.growth,
			churn: kpis.churn
		};
	});
	const totalRevenue = rows.reduce((acc, row) => acc + row.revenue, 0) || 1;
	return rows.map((row) => ({
		...row,
		share: row.revenue / totalRevenue
	})).sort((a, b) => b.revenue - a.revenue);
}
function getViewSeries(filter) {
	if (!filter) return SAMPLE.total;
	return seriesFor(filter.kind, filter.id);
}
function insightCopy(kpis, range, filter) {
	const window = `${diffDaysUtc(range.from, range.to) + 1} days`;
	const subject = filter ? SEGMENTS_BY_KIND[filter.kind].find((s) => s.id === filter.id)?.name ?? "This segment" : "Revenue";
	const delta = kpis.revenueDelta;
	return `${subject} ${delta === null ? "held steady versus the prior window" : delta >= 0 ? `is up ${Math.abs(delta).toFixed(1)}% versus the prior ${window}` : `is down ${Math.abs(delta).toFixed(1)}% versus the prior ${window}`}, with ${kpis.churnDelta === null ? `monthly churn sits at ${kpis.churn.toFixed(1)}%` : kpis.churnDelta <= 0 ? `monthly churn easing to ${kpis.churn.toFixed(1)}%` : `monthly churn rising to ${kpis.churn.toFixed(1)}%`}.`;
}
function DashboardPage() {
	const [preset, setPreset] = (0, import_react.useState)("90d");
	const [range, setRange] = (0, import_react.useState)(() => rangeFromPreset("90d"));
	const [kind, setKind] = (0, import_react.useState)("plan");
	const [filter, setFilter] = (0, import_react.useState)(null);
	function applyPreset(next) {
		setPreset(next);
		setRange(rangeFromPreset(next));
	}
	function applyCustom(next) {
		const from = clampDate(next.from, DATA_START, AS_OF);
		const to = clampDate(next.to, from, AS_OF);
		setPreset("custom");
		setRange({
			from,
			to
		});
	}
	function applyKind(next) {
		setKind(next);
		setFilter((current) => current && current.kind !== next ? null : current);
	}
	const view = (0, import_react.useMemo)(() => {
		const series = getViewSeries(filter);
		const current = slicePoints(series, range);
		const previous = slicePoints(series, previousRange(range));
		const kpis = computeKpis(current, previous);
		const grain = grainFor(range);
		return {
			kpis,
			grain,
			chartRows: buildChartRows(current, previous, grain),
			breakdown: buildBreakdown(range, kind),
			current
		};
	}, [
		filter,
		range,
		kind
	]);
	const mix = view.breakdown;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex min-h-dvh max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex flex-col gap-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-medium tracking-wide text-muted-foreground uppercase",
								children: "Lumen Cloud · Sample workspace"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "mt-2 font-display text-4xl italic tracking-tight text-foreground sm:text-5xl",
								children: "Meridian"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-2 text-xs text-muted-foreground",
								children: [
									"As of ",
									formatDate(AS_OF),
									" · Offline sample"
								]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DateRangeFilter, {
						preset,
						range,
						onPreset: applyPreset,
						onCustom: applyCustom
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "max-w-2xl text-sm leading-relaxed text-muted-foreground",
					children: view.current.length ? insightCopy(view.kpis, range, filter) : "No revenue recorded in this window. Choose another range."
				})]
			}),
			view.current.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl bg-card px-6 py-16 text-center shadow-card",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-medium",
					children: "No data in this range"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: [
						"Sample history starts ",
						formatDate(DATA_START),
						". Pick a later window."
					]
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KpiCards, { kpis: view.kpis }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendChart, {
					rows: view.chartRows,
					grain: view.grain
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SecondaryCharts, {
					movement: view.chartRows,
					mix,
					selectedId: filter?.kind === kind ? filter.id : null,
					onSelect: (id) => {
						if (filter?.kind === kind && filter.id === id) {
							setFilter(null);
							return;
						}
						setFilter({
							kind,
							id
						});
					}
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BreakdownTable, {
					kind,
					onKind: applyKind,
					rows: view.breakdown,
					filter,
					onFilter: setFilter
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
				className: "pb-[env(safe-area-inset-bottom)] pt-2 text-xs text-muted-foreground",
				children: "Figures are generated locally for this demo. Nothing leaves the browser."
			})
		]
	}) });
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardPage, {});
}
//#endregion
export { Home as component };
