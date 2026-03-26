"use client";
import { useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RACES, RANKS } from "@/lib/constants";
import { detectLinkType } from "@/lib/helpers";
import type { Fiche } from "@/lib/types";
import { STAT_DEFS, HIGH_RANKS } from "@/lib/types";
import { useCardMouse } from "@/hooks/useCardMouse";
import { useTextScramble } from "@/hooks/useTextScramble";

/* ═══ Props ═══ */
interface FicheCardProps {
  fiche: Fiche;
  isAdmin: boolean;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

/* ═══ Main Component ═══ */
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
  const fullName = `${fiche.firstname || ""} ${fiche.lastname || ""}`.trim();

  // ── Mouse tracking for spotlight + tilt ──
  const { ref, mouse, onMouseMove, onMouseEnter, onMouseLeave } = useCardMouse();

  // ── Text scramble on name ──
  const firstScramble = useTextScramble(fiche.firstname || "");
  const lastScramble = useTextScramble(fiche.lastname || "");

  const handleMouseEnter = useCallback(() => {
    onMouseEnter();
    firstScramble.scramble();
    lastScramble.scramble();
  }, [onMouseEnter, firstScramble, lastScramble]);

  const handleMouseLeave = useCallback(() => {
    onMouseLeave();
    firstScramble.reset();
    lastScramble.reset();
  }, [onMouseLeave, firstScramble, lastScramble]);

  // ── 3D tilt calculation ──
  const tiltX = mouse.isHovering ? (mouse.percentX - 0.5) * 12 : 0; // max ±6deg
  const tiltY = mouse.isHovering ? (mouse.percentY - 0.5) * -12 : 0;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="futuristic-card-wrapper"
      data-race={fiche.race}
      data-rank={fiche.rank}
    >
      <div
        ref={ref}
        onMouseMove={onMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="futuristic-card group"
        style={{
          "--mouse-x": `${mouse.x}px`,
          "--mouse-y": `${mouse.y}px`,
          "--race-color": rc.color,
          "--rank-color": rk.color,
          "--tilt-x": `${tiltX}deg`,
          "--tilt-y": `${tiltY}deg`,
          perspective: "1000px",
        } as React.CSSProperties}
      >
        {/* ── Radial gradient BORDER GLOW (follows mouse) ── */}
        <div
          className="pointer-events-none absolute -inset-px rounded-lg opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), ${rc.color}40, transparent 40%)`,
          }}
        />

        {/* ── Inner card (sits on top, clips the border glow) ── */}
        <div
          className="futuristic-card-inner relative z-[1] flex flex-col overflow-hidden rounded-lg border border-white/[0.06] bg-jaharta-dark transition-transform duration-300 ease-out"
          style={{
            transform: mouse.isHovering
              ? `rotateY(var(--tilt-x)) rotateX(var(--tilt-y))`
              : "rotateY(0deg) rotateX(0deg)",
            transformStyle: "preserve-3d",
          }}
        >
          {/* ── Radial SPOTLIGHT overlay (follows mouse) ── */}
          <div
            className="pointer-events-none absolute inset-0 z-[30] rounded-lg opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              background: `radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), ${rc.color}12, transparent 40%)`,
            }}
          />

          {/* ── Top accent line (race color, glows on hover) ── */}
          <div
            className="absolute left-0 right-0 top-0 z-[31] h-[2px] opacity-0 transition-opacity duration-400 group-hover:opacity-100"
            style={{
              background: `linear-gradient(90deg, transparent, ${rc.color}, ${rc.color}80, transparent)`,
              filter: `drop-shadow(0 0 6px ${rc.color})`,
            }}
          />

          {/* ════════════════════════════
              PHOTO AREA
             ════════════════════════════ */}
          <div className="relative h-60 w-full shrink-0 overflow-hidden bg-jaharta-surface">
            {/* Race color stripe top */}
            <div
              className="absolute left-0 right-0 top-0 z-[2] h-[3px]"
              style={{
                background: `linear-gradient(90deg, ${rc.color}, ${rc.color}20)`,
              }}
            />

            {/* Photo */}
            {photoSrc ? (
              <img
                src={photoSrc}
                alt={fiche.firstname || ""}
                loading="lazy"
                className="absolute inset-0 z-[1] h-full w-full object-cover object-top saturate-[1.1] contrast-[1.05] transition-all duration-700 group-hover:scale-[1.08] group-hover:saturate-[1.35]"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            ) : (
              <div
                className="flex h-full w-full items-center justify-center font-display text-5xl font-black opacity-40"
                style={{ color: rc.color }}
              >
                {(fiche.firstname?.[0] || "") + (fiche.lastname?.[0] || "")}
              </div>
            )}

            {/* Photo gradient overlay */}
            <div className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-b from-transparent from-30% via-jaharta-dark/50 via-70% to-jaharta-dark" />

            {/* ── RANK BADGE ── */}
            <div
              className="absolute right-3 top-3 z-[10] flex min-w-[54px] flex-col items-center gap-0.5 rounded-md border border-current bg-jaharta-deep/92 px-3 py-2 backdrop-blur-xl"
              style={{
                color: rk.color,
                boxShadow: `0 0 24px rgba(0,0,0,0.6), 0 0 15px ${rk.color}60`,
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
              <div className="font-heading text-[0.45rem] font-semibold uppercase tracking-[0.2em] opacity-50">
                RANG
              </div>
              {fiche.level && fiche.level > 0 && (
                <div
                  className="mt-0.5 border-t border-white/10 pt-1 font-display text-[0.55rem] font-bold"
                  style={{ textShadow: `0 0 10px currentColor` }}
                >
                  Nv.{fiche.level}
                </div>
              )}
            </div>

            {/* ── STATS BAR ── */}
            {hasStats && (
              <div className="absolute bottom-0 left-0 right-0 z-[4] grid grid-cols-8 gap-[3px] bg-gradient-to-t from-jaharta-deep/96 to-jaharta-deep/70 px-2 pb-1.5 pt-2">
                {STAT_DEFS.map((d) => {
                  const v = s[d.k] || 0;
                  if (d.k === "aura" && v === 0) return <div key={d.k} />;
                  const pct = Math.min(100, Math.round((v / 9999) * 100));
                  return (
                    <div
                      key={d.k}
                      className="flex flex-col items-center gap-0.5"
                    >
                      <span
                        className="font-heading text-[0.36rem] uppercase tracking-[0.04em] opacity-60"
                        style={{ color: d.color }}
                      >
                        {d.lbl}
                      </span>
                      <span
                        className="font-display text-[0.6rem] font-extrabold leading-none"
                        style={{ color: d.color }}
                      >
                        {v}
                      </span>
                      <div className="mt-0.5 h-[2px] w-full overflow-hidden rounded-sm bg-white/[0.08]">
                        <div
                          className="h-full rounded-sm transition-[width] duration-700"
                          style={{ width: `${pct}%`, background: d.color }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* ════════════════════════════
              BODY
             ════════════════════════════ */}
          <div className="relative z-[2] flex flex-1 flex-col px-5 pb-5 pt-4">
            {/* ── Name with SCRAMBLE EFFECT ── */}
            <div
              className="font-display text-[1rem] font-bold tracking-[0.12em] text-white/90"
              style={{ fontVariantNumeric: "tabular-nums" }}
            >
              {firstScramble.display}
            </div>
            <div
              className="font-display text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-white/45"
              style={{ fontVariantNumeric: "tabular-nums" }}
            >
              {lastScramble.display}
            </div>

            {/* Age */}
            {fiche.age && (
              <div className="mt-1 font-heading text-[0.54rem] tracking-[0.18em] text-white/20">
                {fiche.age}
              </div>
            )}

            {/* ── Race pill ── */}
            <div
              className="mt-2.5 inline-flex w-fit items-center gap-1.5 rounded-sm border px-2.5 py-1 font-heading text-[0.62rem] font-semibold tracking-[0.1em]"
              style={{
                color: rc.color,
                borderColor: `${rc.color}44`,
                background: `${rc.color}0c`,
              }}
            >
              <span
                className="h-1 w-1 shrink-0 rounded-full"
                style={{
                  background: rc.color,
                  boxShadow: `0 0 6px ${rc.color}`,
                }}
              />
              {fiche.raceSpecific
                ? `${rc.label} · ${fiche.raceSpecific}`
                : rc.label}
            </div>

            {/* Affinity */}
            {fiche.affinity && (
              <div className="mt-2 flex items-baseline gap-1.5 font-heading text-[0.53rem] tracking-[0.12em] text-white/20">
                <span className="text-[0.48rem] uppercase tracking-[0.2em] opacity-50">
                  Affinité
                </span>
                {fiche.affinity}
              </div>
            )}

            {/* Description */}
            {(fiche.desc || fiche.bio) && (
              <p className="mt-3 flex-1 font-body text-[0.8rem] font-light leading-relaxed text-white/35 line-clamp-3">
                {fiche.desc || fiche.bio}
              </p>
            )}

            {/* ── Powers ── */}
            {powers.length > 0 && (
              <div className="mt-3">
                <div className="mb-1.5 font-heading text-[0.48rem] uppercase tracking-[0.25em] text-white/20">
                  ⚡ Pouvoirs
                </div>
                <div className="flex flex-col gap-1">
                  {powers.map((pw, i) => (
                    <div
                      key={i}
                      className="border-l-2 px-2 py-0.5"
                      style={{
                        borderColor: `${rc.color}80`,
                        background: `${rc.color}08`,
                      }}
                    >
                      <div
                        className="font-heading text-[0.78rem] font-semibold tracking-[0.04em]"
                        style={{ color: rc.color }}
                      >
                        {pw.name}
                      </div>
                      {pw.desc && (
                        <div className="font-body text-[0.72rem] text-white/25">
                          {pw.desc}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── Links ── */}
            {links.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1.5 border-t border-white/[0.06] pt-3">
                {links.map((l, i) => {
                  const lt = detectLinkType(l.h);
                  return (
                    <a
                      key={i}
                      href={l.h || "#"}
                      target="_blank"
                      rel="noopener"
                      className="inline-flex items-center gap-1.5 rounded-sm border border-cyan/20 bg-cyan/[0.04] px-3 py-1.5 font-heading text-[0.6rem] font-semibold tracking-[0.1em] text-cyan transition-all hover:border-cyan hover:bg-cyan/10 hover:shadow-[0_0_12px_rgba(0,240,255,0.12)]"
                    >
                      <span className="text-[0.75rem]">{lt.icon}</span>
                      <span style={{ color: lt.color, fontWeight: 700 }}>
                        {lt.type}
                      </span>
                      {l.t && l.t !== lt.type ? ` ${l.t}` : ""}
                    </a>
                  );
                })}
              </div>
            )}

            {/* ── Admin buttons ── */}
            {isAdmin && fiche.id && (
              <div className="mt-2.5 flex gap-2 border-t border-white/[0.06] pt-2.5">
                <button
                  onClick={() => onEdit?.(fiche.id)}
                  className="flex-1 rounded-sm border border-cyan/25 bg-cyan/[0.06] px-3 py-1.5 font-heading text-[0.58rem] tracking-[0.1em] text-cyan transition-all hover:border-cyan hover:bg-cyan/[0.15]"
                >
                  ✎ Modifier
                </button>
                <button
                  onClick={() => onDelete?.(fiche.id)}
                  className="flex-1 rounded-sm border border-magenta/25 bg-magenta/[0.06] px-3 py-1.5 font-heading text-[0.58rem] tracking-[0.1em] text-magenta transition-all hover:border-magenta hover:bg-magenta/[0.15]"
                >
                  ✕ Supprimer
                </button>
              </div>
            )}
          </div>

          {/* ── Bottom scanline decoration ── */}
          <div
            className="absolute bottom-0 left-0 right-0 z-[31] h-px opacity-0 transition-opacity duration-500 group-hover:opacity-60"
            style={{
              background: `linear-gradient(90deg, transparent, ${rc.color}40, transparent)`,
            }}
          />
        </div>
      </div>
    </motion.div>
  );
}
