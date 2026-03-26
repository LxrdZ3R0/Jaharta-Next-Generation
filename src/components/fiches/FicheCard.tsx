"use client";
import { motion } from "framer-motion";
import { RACES, RANKS } from "@/lib/constants";
import { detectLinkType } from "@/lib/helpers";
import type { Fiche, STAT_DEFS as StatDefsType } from "@/lib/types";
import { STAT_DEFS, HIGH_RANKS } from "@/lib/types";

interface FicheCardProps {
  fiche: Fiche;
  isAdmin: boolean;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export function FicheCard({ fiche, isAdmin, onEdit, onDelete }: FicheCardProps) {
  const rc = RACES[fiche.race as keyof typeof RACES] || {
    color: "#00c8ff",
    label: fiche.race || "?",
  };
  const rk = RANKS[fiche.rank as keyof typeof RANKS] || {
    color: "#6b7280",
    bg: "rgba(107,114,128,0.22)",
    level: 1,
  };

  const s = fiche.stats || {};
  const hasStats = STAT_DEFS.some((d) => (s[d.k] || 0) > 0);
  const powers = fiche.powers || [];
  const links =
    fiche.links ||
    (fiche.linkUrl
      ? [{ t: fiche.linkType || "Fiche", h: fiche.linkUrl }]
      : []);
  const photoSrc = fiche.photoUrl || fiche.photo;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="group relative flex flex-col overflow-hidden rounded-md border border-cyan/10 bg-jaharta-dark/80 backdrop-blur-xl transition-all duration-300"
      style={{
        ["--race-color" as string]: rc.color,
      }}
      data-race={fiche.race}
      data-rank={fiche.rank}
    >
      {/* Top gradient line on hover */}
      <div
        className="absolute left-0 right-0 top-0 z-10 h-[2px] opacity-0 transition-opacity group-hover:opacity-100"
        style={{
          background: `linear-gradient(90deg, ${rc.color}, #b44aff, transparent)`,
        }}
      />

      {/* Hover glow */}
      <div
        className="pointer-events-none absolute inset-0 rounded-md opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          boxShadow: `0 0 30px ${rc.color}1a, 0 20px 50px rgba(0,0,0,0.5), inset 0 0 30px ${rc.color}05`,
        }}
      />

      {/* Photo area */}
      <div className="relative h-60 w-full shrink-0 overflow-hidden bg-jaharta-surface">
        {/* Race stripe */}
        <div
          className="absolute left-0 right-0 top-0 z-[2] h-[3px]"
          style={{
            background: `linear-gradient(90deg, ${rc.color}, ${rc.color}20)`,
          }}
        />

        {/* Photo or placeholder */}
        {photoSrc ? (
          <img
            src={photoSrc}
            alt={fiche.firstname || ""}
            loading="lazy"
            className="absolute inset-0 z-[1] h-full w-full object-cover object-top transition-all duration-500 group-hover:scale-[1.07] group-hover:saturate-[1.3]"
            style={{ filter: "saturate(1.1) contrast(1.05)" }}
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
        ) : (
          <div
            className="flex h-full w-full items-center justify-center font-display text-5xl font-black opacity-50"
            style={{ color: rc.color }}
          >
            {(fiche.firstname?.[0] || "") + (fiche.lastname?.[0] || "")}
          </div>
        )}

        {/* Gradient overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-jaharta-dark/90" style={{ zIndex: 2 }} />

        {/* Rank badge */}
        <div
          className="absolute right-3 top-3 z-[5] flex min-w-[56px] flex-col items-center gap-0.5 rounded-md border border-current bg-jaharta-deep/90 px-3.5 py-2 backdrop-blur-xl"
          style={{
            color: rk.color,
            boxShadow: `0 0 20px rgba(0,0,0,0.5), 0 0 12px ${rk.color}`,
          }}
        >
          <div
            className={`font-display font-black leading-none ${
              fiche.rank === "SSS" ? "text-base" : "text-xl"
            }`}
            style={{
              textShadow: `0 0 16px currentColor`,
              animation: HIGH_RANKS.includes(fiche.rank)
                ? "rankPulse 2.5s infinite"
                : undefined,
            }}
          >
            {fiche.rank || "?"}
          </div>
          <div className="font-heading text-[0.5rem] font-semibold uppercase tracking-[0.2em] opacity-60">
            RANG
          </div>
          {fiche.level && fiche.level > 0 && (
            <div
              className="mt-0.5 border-t border-white/10 pt-1 font-display text-[0.6rem] font-bold tracking-[0.08em]"
              style={{ textShadow: `0 0 10px currentColor` }}
            >
              Nv.{fiche.level}
            </div>
          )}
        </div>

        {/* Stats bar */}
        {hasStats && (
          <div
            className="absolute bottom-0 left-0 right-0 z-[4] grid grid-cols-8 gap-[3px] bg-gradient-to-t from-jaharta-deep/95 to-jaharta-deep/70 px-2 pb-1.5 pt-2"
          >
            {STAT_DEFS.map((d) => {
              const v = s[d.k] || 0;
              if (d.k === "aura" && v === 0) return <div key={d.k} />;
              const pct = Math.min(100, Math.round((v / 9999) * 100));
              return (
                <div key={d.k} className="flex flex-col items-center gap-0.5">
                  <span
                    className="font-heading text-[0.38rem] uppercase tracking-[0.04em] opacity-65"
                    style={{ color: d.color }}
                  >
                    {d.lbl}
                  </span>
                  <span
                    className="font-display text-[0.65rem] font-extrabold leading-none"
                    style={{ color: d.color }}
                  >
                    {v}
                  </span>
                  <div className="mt-0.5 h-[2px] w-full overflow-hidden rounded-sm bg-white/[0.08]">
                    <div
                      className="h-full rounded-sm transition-[width] duration-500"
                      style={{ width: `${pct}%`, background: d.color }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Body */}
      <div className="relative z-[1] flex flex-1 flex-col px-[18px] pb-[18px] pt-4">
        {/* Name */}
        <div className="font-display text-[0.95rem] font-bold tracking-[0.1em] text-white/90">
          {fiche.firstname || ""}
        </div>
        <div className="font-display text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-white/50">
          {fiche.lastname || ""}
        </div>

        {/* Age */}
        {fiche.age && (
          <div className="mt-1 font-heading text-[0.56rem] font-medium tracking-[0.18em] text-white/25">
            {fiche.age}
          </div>
        )}

        {/* Race pill */}
        <div
          className="mt-2 inline-flex w-fit items-center gap-1.5 rounded-sm border px-2.5 py-1 font-heading text-[0.65rem] font-semibold tracking-[0.08em]"
          style={{
            color: rc.color,
            borderColor: `${rc.color}44`,
            background: `${rc.color}0e`,
          }}
        >
          <span
            className="h-1 w-1 shrink-0 rounded-full"
            style={{
              background: rc.color,
              boxShadow: `0 0 4px ${rc.color}`,
            }}
          />
          {fiche.raceSpecific
            ? `${rc.label} · ${fiche.raceSpecific}`
            : rc.label}
        </div>

        {/* Affinity */}
        {fiche.affinity && (
          <div className="mt-2 flex items-baseline gap-1.5 font-heading text-[0.56rem] tracking-[0.12em] text-white/25">
            <span className="text-[0.5rem] uppercase tracking-[0.2em] opacity-55">
              Affinité
            </span>
            {fiche.affinity}
          </div>
        )}

        {/* Description */}
        {(fiche.desc || fiche.bio) && (
          <p className="mt-3 flex-1 font-body text-[0.82rem] font-light leading-relaxed text-white/40 line-clamp-3">
            {fiche.desc || fiche.bio}
          </p>
        )}

        {/* Powers */}
        {powers.length > 0 && (
          <div className="mt-3">
            <div className="mb-1.5 font-heading text-[0.5rem] uppercase tracking-[0.25em] text-white/25">
              ⚡ Pouvoirs
            </div>
            <div className="flex flex-col gap-1">
              {powers.map((pw, i) => (
                <div
                  key={i}
                  className="border-l-2 px-2 py-0.5"
                  style={{
                    borderColor: `${rc.color}88`,
                    background: `${rc.color}08`,
                  }}
                >
                  <div
                    className="font-heading text-[0.82rem] font-semibold tracking-[0.04em]"
                    style={{ color: rc.color }}
                  >
                    {pw.name}
                  </div>
                  {pw.desc && (
                    <div className="font-body text-[0.75rem] text-white/30">
                      {pw.desc}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Links */}
        {links.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5 border-t border-cyan/10 pt-3">
            {links.map((l, i) => {
              const lt = detectLinkType(l.h);
              return (
                <a
                  key={i}
                  href={l.h || "#"}
                  target="_blank"
                  rel="noopener"
                  className="inline-flex items-center gap-1.5 rounded-sm border border-cyan/25 bg-cyan/[0.04] px-4 py-2 font-heading text-[0.65rem] font-semibold tracking-[0.1em] text-cyan transition-all hover:border-cyan hover:bg-cyan/10 hover:shadow-[0_0_16px_rgba(0,240,255,0.15)]"
                >
                  <span className="text-[0.8rem]">{lt.icon}</span>
                  <span style={{ color: lt.color, fontWeight: 700 }}>
                    {lt.type}
                  </span>
                  {l.t && l.t !== lt.type ? ` ${l.t}` : ""}
                </a>
              );
            })}
          </div>
        )}

        {/* Admin buttons */}
        {isAdmin && fiche.id && (
          <div className="mt-2.5 flex gap-2 border-t border-cyan/10 pt-2.5">
            <button
              onClick={() => onEdit?.(fiche.id)}
              className="flex-1 rounded-sm border border-cyan/30 bg-cyan/[0.08] px-3 py-1.5 font-heading text-[0.6rem] tracking-[0.1em] text-cyan transition-all hover:border-cyan hover:bg-cyan/[0.18]"
            >
              ✎ Modifier
            </button>
            <button
              onClick={() => onDelete?.(fiche.id)}
              className="flex-1 rounded-sm border border-magenta/30 bg-magenta/[0.08] px-3 py-1.5 font-heading text-[0.6rem] tracking-[0.1em] text-magenta transition-all hover:border-magenta hover:bg-magenta/[0.18]"
            >
              ✕ Supprimer
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}
