"use client";
import { cn } from "@/lib/utils";
import { RACES, RANKS } from "@/lib/constants";
import type { Fiche } from "@/lib/types";

/* ═══ RANK LEGEND ═══ */
export function RankLegend() {
  const entries = Object.entries(RANKS) as [string, (typeof RANKS)[keyof typeof RANKS]][];
  return (
    <div className="mb-8 flex flex-wrap items-center gap-[3px] overflow-hidden rounded-md border border-cyan/10 bg-jaharta-dark/70 px-5 py-4 backdrop-blur-xl">
      {/* Top line */}
      <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-cyan via-violet to-transparent opacity-50" />

      <span className="mr-4 border-r border-cyan/10 pr-4 font-display text-[0.55rem] font-semibold uppercase tracking-[0.25em] text-white/40">
        Rangs :
      </span>

      {entries.map(([key, val]) => (
        <span
          key={key}
          className="m-[3px] rounded border px-3.5 py-1.5 font-display text-[0.65rem] font-extrabold tracking-[0.08em] transition-all hover:-translate-y-[3px] hover:scale-105"
          style={{
            color: val.color,
            borderColor: `${val.color}66`,
            background: `${val.color}14`,
            textShadow:
              ["T", "G", "G+", "Z"].includes(key)
                ? `0 0 8px ${val.color}`
                : undefined,
          }}
        >
          {key}
        </span>
      ))}

      <span className="ml-auto flex items-center gap-2 border-l border-cyan/10 pl-4 font-heading text-[0.55rem] font-medium uppercase tracking-[0.2em] text-white/15">
        <span className="inline-block h-px w-10 bg-gradient-to-r from-transparent to-white/15" />
        FAIBLE ─── ABSOLU
      </span>
    </div>
  );
}

/* ═══ RACE FILTER ═══ */
interface RaceFilterProps {
  active: string;
  onSelect: (race: string) => void;
  fiches: Fiche[];
}

export function RaceFilter({ active, onSelect, fiches }: RaceFilterProps) {
  const counts: Record<string, number> = {};
  let total = 0;
  fiches.forEach((f) => {
    counts[f.race] = (counts[f.race] || 0) + 1;
    total++;
  });

  const entries = Object.entries(RACES) as [string, (typeof RACES)[keyof typeof RACES]][];

  return (
    <div className="mb-0 flex flex-wrap gap-2 pb-4">
      <span className="flex shrink-0 items-center font-heading text-[0.58rem] font-medium uppercase tracking-[0.2em] text-white/25">
        Race :
      </span>

      {/* All button */}
      <button
        onClick={() => onSelect("all")}
        className={cn(
          "flex items-center gap-1.5 rounded border px-3.5 py-[7px] font-heading text-[0.64rem] font-semibold uppercase tracking-[0.13em] transition-all",
          "border-white/[0.15] text-white/60",
          active === "all" && "bg-white/[0.04] shadow-[0_0_10px_rgba(255,255,255,0.04)]"
        )}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-white/60" />
        Tous
        <span className="rounded-sm bg-white/[0.08] px-1.5 py-0.5 font-display text-[0.5rem] font-bold">
          {total}
        </span>
      </button>

      {entries.map(([key, val]) => (
        <button
          key={key}
          onClick={() => onSelect(key)}
          className={cn(
            "relative flex items-center gap-1.5 overflow-hidden rounded border px-3.5 py-[7px] font-heading text-[0.64rem] font-semibold uppercase tracking-[0.13em] transition-all hover:bg-white/[0.03]",
            active === key && "bg-white/[0.04] shadow-[0_0_10px_rgba(255,255,255,0.04)]"
          )}
          style={{
            color: val.color,
            borderColor: `${val.color}38`,
          }}
        >
          {/* Left bar indicator */}
          <span
            className={cn(
              "absolute left-0 top-0 h-full w-[3px] transition-opacity",
              active === key ? "opacity-100" : "opacity-0"
            )}
            style={{ background: val.color }}
          />
          <span
            className="h-1.5 w-1.5 shrink-0 rounded-full"
            style={{
              background: val.color,
              boxShadow: `0 0 6px ${val.color}`,
            }}
          />
          {val.label}
          <span className="rounded-sm bg-white/[0.08] px-1.5 py-0.5 font-display text-[0.5rem] font-bold">
            {counts[key] || 0}
          </span>
        </button>
      ))}
    </div>
  );
}

/* ═══ RANK FILTER ═══ */
interface RankFilterProps {
  active: string;
  onSelect: (rank: string) => void;
}

export function RankFilter({ active, onSelect }: RankFilterProps) {
  const entries = Object.entries(RANKS) as [string, (typeof RANKS)[keyof typeof RANKS]][];

  return (
    <div className="mb-9 flex flex-wrap gap-2 border-b border-cyan/10 pb-4 pt-3">
      <span className="flex shrink-0 items-center font-heading text-[0.58rem] font-medium uppercase tracking-[0.2em] text-white/25">
        Rang :
      </span>

      <button
        onClick={() => onSelect("all")}
        className={cn(
          "rounded border px-3.5 py-[7px] font-heading text-[0.64rem] font-semibold uppercase tracking-[0.13em] transition-all",
          "border-white/[0.15] text-white/60",
          active === "all" && "bg-white/[0.04]"
        )}
      >
        Tous
      </button>

      {entries.map(([key, val]) => (
        <button
          key={key}
          onClick={() => onSelect(key)}
          className={cn(
            "relative overflow-hidden rounded border px-3.5 py-[7px] font-heading text-[0.64rem] font-semibold uppercase tracking-[0.13em] transition-all hover:bg-white/[0.03]",
            active === key && "bg-white/[0.04]"
          )}
          style={{
            color: val.color,
            borderColor: `${val.color}4d`,
          }}
        >
          <span
            className={cn(
              "absolute left-0 top-0 h-full w-[3px] transition-opacity",
              active === key ? "opacity-100" : "opacity-0"
            )}
            style={{ background: val.color }}
          />
          {key}
        </button>
      ))}
    </div>
  );
}
