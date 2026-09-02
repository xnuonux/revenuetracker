import { useState } from "react";
import { CalendarDays } from "lucide-react";
import { DayPicker, type DateRange as DayPickerRange } from "react-day-picker";
import "react-day-picker/style.css";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { AS_OF, DATA_START, isoDay, localFromUtc, utcFromLocal } from "@/lib/dashboard/dates";
import { formatDateShort } from "@/lib/dashboard/format";
import type { DatePreset, DateRange } from "@/lib/dashboard/types";
import { cn } from "@/lib/utils";

const PRESETS: { id: Exclude<DatePreset, "custom">; label: string }[] = [
  { id: "7d", label: "7D" },
  { id: "30d", label: "30D" },
  { id: "90d", label: "90D" },
  { id: "6m", label: "6M" },
  { id: "ytd", label: "YTD" },
  { id: "1y", label: "1Y" },
];

type DateRangeFilterProps = {
  preset: DatePreset;
  range: DateRange;
  onPreset: (preset: Exclude<DatePreset, "custom">) => void;
  onCustom: (range: DateRange) => void;
};

export function DateRangeFilter({ preset, range, onPreset, onCustom }: DateRangeFilterProps) {
  const [open, setOpen] = useState(false);
  const selected: DayPickerRange = {
    from: localFromUtc(range.from),
    to: localFromUtc(range.to),
  };

  return (
    <div className="flex w-full min-w-0 items-center gap-2">
      <div
        role="tablist"
        aria-label="Date range"
        className="flex min-w-0 flex-1 flex-nowrap gap-1 overflow-x-auto rounded-lg bg-secondary p-1"
      >
        {PRESETS.map((item) => {
          const active = preset === item.id;
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => onPreset(item.id)}
              className={cn(
                "h-11 min-w-11 shrink-0 rounded-md px-3 text-sm font-medium transition-[color,background-color,transform] duration-150 ease-out active:scale-[0.96]",
                active
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {item.label}
            </button>
          );
        })}
      </div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant={preset === "custom" ? "selected" : "outline"}
            size="sm"
            aria-label="Custom date range"
            className="shrink-0 gap-2 px-3"
          >
            <CalendarDays />
            <span className="hidden tabular-nums sm:inline">
              {formatDateShort(range.from)} – {formatDateShort(range.to)}
            </span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-3">
          <DayPicker
            mode="range"
            selected={selected}
            defaultMonth={localFromUtc(range.from)}
            numberOfMonths={1}
            disabled={{ before: localFromUtc(DATA_START), after: localFromUtc(AS_OF) }}
            onSelect={(next) => {
              if (!next?.from) return;
              const from = utcFromLocal(next.from);
              const to = utcFromLocal(next.to ?? next.from);
              onCustom({ from, to });
              if (next.from && next.to && isoDay(utcFromLocal(next.from)) !== isoDay(utcFromLocal(next.to))) {
                setOpen(false);
              }
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
