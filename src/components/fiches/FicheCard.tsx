"use client";
import { motion } from "framer-motion";
import { RACES, RANKS } from "@/lib/constants";
import { detectLinkType } from "@/lib/helpers";
import type { Fiche } from "@/lib/types";
import { STAT_DEFS, HIGH_RANKS } from "@/lib/types";
import { useHolographicCard } from "@/hooks/useHolographicCard";
import { useTextScramble } from "@/hooks/useTextScramble";
import { useParticleBurst } from "@/hooks/useParticleBurst";
import { useCallback } from "react";

interface FicheCardProps {
  fiche: Fiche;
  isAdmin: boolean;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export function FicheCard({ fiche, isAdmin, onEdit, onDelete }: FicheCardProps) {
  const rc = RACES[fiche.race as keyof typeof RACES] || { color: "#00c8ff", label: fiche.race || "?" };
  const rk = RANKS[fiche.rank as keyof typeof RANKS] || { color: "#6b7280", bg: "rgba(107,114,128,0.22)", level: 1 };

  const s = fiche.stats || {};
  const hasStats = STAT_DEFS.some((d) => (s[d.k] || 0) > 0);
  const powers = fiche.powers || [];
  const links = fiche.links || (fiche.linkUrl ? [{ t: fiche.linkType || "Fiche", h: fiche.linkUrl }] : []);
  const photoSrc = fiche.photoUrl || fiche.photo;

  const { ref, state, tiltX, tiltY, holoAngle, handlers } = useHolographicCard();
  const firstScramble = useTextScramble(fiche.firstname || "");
  const lastScramble = useTextScramble(fiche.lastname || "");
  const { canvasRef: burstCanvas, burst } = useParticleBurst(rc.color);

  const handleEnter = useCallback((e: React.MouseEvent) => {
    handlers.onMouseEnter();
    firstScramble.scramble();
    lastScramble.scramble();
    // Particle burst from mouse position
    const rect = ref.current?.getBoundingClientRect();
    if (rect) {
      burst(e.clientX - rect.left, e.clientY - rect.top);
    }
  }, [handlers, firstScramble, lastScramble, burst, ref]);

  const handleLeave = useCallback(() => {
    handlers.onMouseLeave();
    firstScramble.reset();
    lastScramble.reset();
  }, [handlers, firstScramble, lastScramble]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.35 }}
      className="cyber-card-wrapper"
      style={{ perspective: "1200px" }}
      data-race={fiche.race}
      data-rank={fiche.rank}
    >
      <div
        ref={ref}
        onMouseMove={handlers.onMouseMove}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        className="cyber-card group relative"
        style={{
          "--race": rc.color,
          "--rank": rk.color,
          "--holo-angle": `${holoAngle}deg`,
          "--mx": `${state.px * 100}%`,
          "--my": `${state.py * 100}%`,
        } as React.CSSProperties}
      >
        {/* ═══ NEON BORDER TRACE — animated light traveling around border ═══ */}
        <div className="cyber-border-trace" />

        {/* ═══ PARTICLE BURST canvas — sparks on hover enter ═══ */}
        <canvas
          ref={burstCanvas}
          className="pointer-events-none absolute inset-0 z-[60] rounded-lg"
        />

        {/* ═══ ELECTRIC PULSE — ripple ring on hover ═══ */}
        {state.glitching && (
          <div
            className="pointer-events-none absolute z-[55] animate-[electricPulse_0.6s_ease-out_forwards] rounded-full border"
            style={{
              left: state.x - 4,
              top: state.y - 4,
              width: 8,
              height: 8,
              borderColor: rc.color,
              boxShadow: `0 0 20px ${rc.color}`,
            }}
          />
        )}

        {/* ═══ MAIN CARD with 3D TILT ═══ */}
        <div
          className="cyber-card-body relative z-[2] flex flex-col overflow-hidden rounded-lg border border-white/[0.07] bg-[#08080f]"
          style={{
            transform: state.hovering
              ? `rotateY(${tiltX}deg) rotateX(${tiltY}deg) translateZ(10px)`
              : "rotateY(0deg) rotateX(0deg) translateZ(0px)",
            transition: state.hovering ? "transform 0.1s ease-out" : "transform 0.5s ease-out",
            transformStyle: "preserve-3d",
          }}
        >
          {/* ═══ HOLOGRAPHIC SHIMMER — prismatic rainbow on hover ═══ */}
          <div
            className="pointer-events-none absolute inset-0 z-[40] rounded-lg opacity-0 mix-blend-color-dodge transition-opacity duration-500 group-hover:opacity-100"
            style={{
              background: `linear-gradient(
                ${holoAngle}deg,
                transparent 20%,
                rgba(0,240,255,0.07) 30%,
                rgba(180,74,255,0.06) 40%,
                rgba(255,42,138,0.05) 50%,
                rgba(0,255,136,0.06) 60%,
                rgba(0,240,255,0.07) 70%,
                transparent 80%
              )`,
              backgroundSize: "200% 200%",
              backgroundPosition: `${state.px * 100}% ${state.py * 100}%`,
            }}
          />

          {/* ═══ GLITCH BURST — RGB split flash on hover enter ═══ */}
          {state.glitching && (
            <div className="pointer-events-none absolute inset-0 z-[50] animate-[cyberGlitch_0.3s_steps(4)_forwards]" />
          )}

          {/* ═══ TOP ACCENT — neon race line + glow ═══ */}
          <div
            className="absolute left-0 right-0 top-0 z-[31] h-[2px] transition-all duration-500"
            style={{
              background: `linear-gradient(90deg, transparent 10%, ${rc.color} 50%, transparent 90%)`,
              opacity: state.hovering ? 1 : 0.3,
              filter: state.hovering ? `drop-shadow(0 0 8px ${rc.color}) drop-shadow(0 0 20px ${rc.color}50)` : "none",
            }}
          />

          {/* ════════════ PHOTO ════════════ */}
          <div className="relative h-60 w-full shrink-0 overflow-hidden bg-[#050509]">
            {/* Race stripe */}
            <div
              className="absolute left-0 right-0 top-0 z-[2] h-[3px]"
              style={{ background: `linear-gradient(90deg, ${rc.color}, ${rc.color}20)` }}
            />

            {/* Photo with CHROMATIC ABERRATION on hover */}
            {photoSrc ? (
              <div className="cyber-photo-wrap absolute inset-0 z-[1]">
                <img
                  src={photoSrc}
                  alt={fiche.firstname || ""}
                  loading="lazy"
                  className="cyber-photo h-full w-full object-cover object-top"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                />
              </div>
            ) : (
              <div
                className="flex h-full w-full items-center justify-center font-display text-5xl font-black opacity-30"
                style={{ color: rc.color }}
              >
                {(fiche.firstname?.[0] || "") + (fiche.lastname?.[0] || "")}
              </div>
            )}

            {/* Gradient overlay */}
            <div className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-b from-transparent from-20% via-[#08080f]/40 via-60% to-[#08080f]" />

            {/* ── RANK BADGE with neon glow ── */}
            <div
              className="cyber-rank absolute right-3 top-3 z-[10] flex min-w-[52px] flex-col items-center gap-0.5 rounded border border-current px-3 py-2"
              style={{
                color: rk.color,
                background: "rgba(8,8,15,0.92)",
                backdropFilter: "blur(12px)",
                boxShadow: `0 0 20px rgba(0,0,0,0.7), 0 0 15px ${rk.color}50, inset 0 0 15px ${rk.color}10`,
              }}
            >
              <div
                className={`font-display font-black leading-none ${fiche.rank === "SSS" ? "text-base" : "text-xl"}`}
                style={{
                  textShadow: `0 0 12px currentColor, 0 0 30px currentColor`,
                  animation: HIGH_RANKS.includes(fiche.rank) ? "rankPulse 2s infinite" : undefined,
                }}
              >
                {fiche.rank || "?"}
              </div>
              <div className="font-heading text-[0.42rem] font-semibold uppercase tracking-[0.25em] opacity-40">
                RANG
              </div>
              {fiche.level && fiche.level > 0 && (
                <div className="mt-0.5 border-t border-white/10 pt-1 font-display text-[0.5rem] font-bold" style={{ textShadow: "0 0 8px currentColor" }}>
                  Nv.{fiche.level}
                </div>
              )}
            </div>

            {/* ── STATS BAR ── */}
            {hasStats && (
              <div className="absolute bottom-0 left-0 right-0 z-[4] grid grid-cols-8 gap-[3px] bg-gradient-to-t from-[#08080f] to-[#08080f]/70 px-2 pb-1.5 pt-2">
                {STAT_DEFS.map((d) => {
                  const v = s[d.k] || 0;
                  if (d.k === "aura" && v === 0) return <div key={d.k} />;
                  const pct = Math.min(100, Math.round((v / 9999) * 100));
                  return (
                    <div key={d.k} className="flex flex-col items-center gap-0.5">
                      <span className="font-heading text-[0.34rem] uppercase tracking-[0.04em] opacity-50" style={{ color: d.color }}>{d.lbl}</span>
                      <span className="font-display text-[0.58rem] font-extrabold leading-none" style={{ color: d.color, textShadow: `0 0 6px ${d.color}60` }}>{v}</span>
                      <div className="mt-0.5 h-[2px] w-full overflow-hidden rounded-sm bg-white/[0.06]">
                        <div className="h-full rounded-sm" style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${d.color}, ${d.color}80)`, boxShadow: `0 0 4px ${d.color}60` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* ── SCAN LINE animation on hover ── */}
            <div
              className="pointer-events-none absolute inset-0 z-[5] opacity-0 transition-opacity group-hover:opacity-100"
              style={{
                background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,240,255,0.03) 2px, rgba(0,240,255,0.03) 4px)",
              }}
            />
          </div>

          {/* ════════════ BODY ════════════ */}
          <div className="relative z-[2] flex flex-1 flex-col px-5 pb-5 pt-4">
            {/* ── Circuit trace decoration ── */}
            <div className="pointer-events-none absolute right-4 top-3 h-12 w-16 opacity-[0.06]">
              <svg viewBox="0 0 64 48" fill="none" className="h-full w-full">
                <path d="M0 24h20l4-4h16l4 4h20" stroke={rc.color} strokeWidth="0.5" />
                <path d="M24 20v-12h16v12" stroke={rc.color} strokeWidth="0.5" />
                <circle cx="24" cy="8" r="1.5" fill={rc.color} />
                <circle cx="40" cy="8" r="1.5" fill={rc.color} />
                <path d="M8 24v16h48v-16" stroke={rc.color} strokeWidth="0.3" strokeDasharray="2 2" />
              </svg>
            </div>

            {/* Name with SCRAMBLE + glow */}
            <div className="font-display text-[1rem] font-bold tracking-[0.14em] text-white/90" style={{ fontVariantNumeric: "tabular-nums", textShadow: state.hovering ? `0 0 20px ${rc.color}40` : "none", transition: "text-shadow 0.4s" }}>
              {firstScramble.display}
            </div>
            <div className="font-display text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-white/40" style={{ fontVariantNumeric: "tabular-nums" }}>
              {lastScramble.display}
            </div>

            {fiche.age && <div className="mt-1 font-heading text-[0.52rem] tracking-[0.18em] text-white/15">{fiche.age}</div>}

            {/* Race pill with neon glow */}
            <div
              className="mt-2.5 inline-flex w-fit items-center gap-1.5 rounded-sm border px-2.5 py-1 font-heading text-[0.6rem] font-semibold tracking-[0.1em] transition-all duration-300"
              style={{
                color: rc.color,
                borderColor: `${rc.color}44`,
                background: `${rc.color}0a`,
                boxShadow: state.hovering ? `0 0 12px ${rc.color}20, inset 0 0 12px ${rc.color}08` : "none",
              }}
            >
              <span className="relative h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: rc.color, boxShadow: `0 0 6px ${rc.color}` }}>
                <span className="absolute inset-0 animate-ping rounded-full opacity-40" style={{ background: rc.color }} />
              </span>
              {fiche.raceSpecific ? `${rc.label} · ${fiche.raceSpecific}` : rc.label}
            </div>

            {fiche.affinity && (
              <div className="mt-2 flex items-baseline gap-1.5 font-heading text-[0.5rem] tracking-[0.12em] text-white/18">
                <span className="uppercase tracking-[0.2em] opacity-50">Affinité</span>
                {fiche.affinity}
              </div>
            )}

            {(fiche.desc || fiche.bio) && (
              <p className="mt-3 flex-1 font-body text-[0.78rem] font-light leading-relaxed text-white/30 line-clamp-3">{fiche.desc || fiche.bio}</p>
            )}

            {/* Powers */}
            {powers.length > 0 && (
              <div className="mt-3">
                <div className="mb-1.5 font-heading text-[0.46rem] uppercase tracking-[0.3em] text-white/15">⚡ Pouvoirs</div>
                <div className="flex flex-col gap-1">
                  {powers.map((pw, i) => (
                    <div key={i} className="border-l-2 px-2 py-0.5" style={{ borderColor: `${rc.color}70`, background: `${rc.color}06` }}>
                      <div className="font-heading text-[0.76rem] font-semibold tracking-[0.04em]" style={{ color: rc.color }}>{pw.name}</div>
                      {pw.desc && <div className="font-body text-[0.7rem] text-white/22">{pw.desc}</div>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Links */}
            {links.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1.5 border-t border-white/[0.05] pt-3">
                {links.map((l, i) => {
                  const lt = detectLinkType(l.h);
                  return (
                    <a key={i} href={l.h || "#"} target="_blank" rel="noopener"
                      className="cyber-link inline-flex items-center gap-1.5 rounded-sm border border-cyan/15 bg-cyan/[0.03] px-3 py-1.5 font-heading text-[0.58rem] font-semibold tracking-[0.1em] text-cyan transition-all hover:border-cyan/60 hover:bg-cyan/[0.08]"
                    >
                      <span className="text-[0.7rem]">{lt.icon}</span>
                      <span style={{ color: lt.color }}>{lt.type}</span>
                      {l.t && l.t !== lt.type ? ` ${l.t}` : ""}
                    </a>
                  );
                })}
              </div>
            )}

            {/* Admin */}
            {isAdmin && fiche.id && (
              <div className="mt-2.5 flex gap-2 border-t border-white/[0.05] pt-2.5">
                <button onClick={() => onEdit?.(fiche.id)} className="flex-1 rounded-sm border border-cyan/20 bg-cyan/[0.05] px-3 py-1.5 font-heading text-[0.56rem] tracking-[0.1em] text-cyan transition-all hover:border-cyan hover:bg-cyan/[0.12] hover:shadow-[0_0_12px_rgba(0,240,255,0.15)]">✎ Modifier</button>
                <button onClick={() => onDelete?.(fiche.id)} className="flex-1 rounded-sm border border-magenta/20 bg-magenta/[0.05] px-3 py-1.5 font-heading text-[0.56rem] tracking-[0.1em] text-magenta transition-all hover:border-magenta hover:bg-magenta/[0.12] hover:shadow-[0_0_12px_rgba(255,42,138,0.15)]">✕ Supprimer</button>
              </div>
            )}
          </div>

          {/* Bottom neon line */}
          <div
            className="absolute bottom-0 left-0 right-0 z-[31] h-px transition-opacity duration-500"
            style={{
              background: `linear-gradient(90deg, transparent 5%, ${rc.color}30 50%, transparent 95%)`,
              opacity: state.hovering ? 0.8 : 0,
            }}
          />
        </div>
      </div>
    </motion.div>
  );
}
