"use client";
import { motion } from "framer-motion";
import { SparklesCore } from "@/components/ui/sparkles";
import { Spotlight } from "@/components/ui/spotlight";
import { GridBackground } from "@/components/ui/backgrounds";

const DiscordIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="h-[18px] w-[18px]">
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" />
  </svg>
);

export function HeroSection() {
  return (
    <section className="crt-flicker relative flex min-h-screen flex-col items-center justify-center overflow-hidden text-center">
      {/* Hex grid background */}
      <div className="hex-grid pointer-events-none absolute inset-0 opacity-60" />

      {/* Particles */}
      <SparklesCore className="z-[1]" />

      {/* Background map */}
      <div
        className="absolute inset-0 animate-hero-drift scale-110 bg-cover bg-center bg-no-repeat opacity-[0.15]"
        style={{ backgroundImage: "url('/assets/map-holographic.png')" }}
      />

      {/* Grid lines */}
      <GridBackground />

      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, transparent 0%, #06060c 100%), linear-gradient(180deg, rgba(6,6,12,0.5) 0%, transparent 30%, transparent 70%, #06060c 100%)",
        }}
      />

      {/* Spotlight beams */}
      <Spotlight className="-left-10 -top-40 md:-left-32 md:-top-80" fill="#00f0ff" />
      <Spotlight className="-right-10 -top-20 md:-right-20 md:-top-60" fill="#b44aff" />

      {/* Decorative circuit corners */}
      <div className="pointer-events-none absolute left-8 top-24 opacity-[0.08] md:left-16">
        <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
          <path d="M0 60h30l10-10h20l10 10h20" stroke="#00f0ff" strokeWidth="0.5" />
          <path d="M40 50V20h20v30" stroke="#00f0ff" strokeWidth="0.5" />
          <circle cx="40" cy="20" r="2" fill="#00f0ff" />
          <circle cx="60" cy="20" r="2" fill="#00f0ff" />
          <path d="M0 80h20l8 8h24l8-8h20" stroke="#b44aff" strokeWidth="0.3" />
          <circle cx="52" cy="80" r="1.5" fill="#b44aff" opacity="0.6" />
        </svg>
      </div>
      <div className="pointer-events-none absolute bottom-24 right-8 rotate-180 opacity-[0.08] md:right-16">
        <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
          <path d="M0 60h30l10-10h20l10 10h20" stroke="#00f0ff" strokeWidth="0.5" />
          <path d="M40 50V20h20v30" stroke="#00f0ff" strokeWidth="0.5" />
          <circle cx="40" cy="20" r="2" fill="#00f0ff" />
          <circle cx="60" cy="20" r="2" fill="#00f0ff" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-[900px] px-8">
        {/* System status tag */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mx-auto mb-8 flex w-fit items-center gap-3 rounded-sm border border-cyan/[0.15] bg-cyan/[0.03] px-4 py-1.5 backdrop-blur-sm"
        >
          <span className="relative h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#00ff88]">
            <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400 opacity-60" />
          </span>
          <span className="font-heading text-[0.6rem] font-medium uppercase tracking-[0.4em] text-cyan-dim">
            Système Actif · Nexus Connecté
          </span>
        </motion.div>

        {/* Pre-title */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mb-6 font-heading text-[0.8rem] font-medium uppercase tracking-[0.5em] text-cyan-dim"
        >
          Roleplay · Fantasy · Cyberpunk
        </motion.p>

        {/* Title with enhanced glitch + chromatic aberration */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="cyber-hero-title group relative mb-6 font-display text-[clamp(3.5rem,10vw,8rem)] font-black leading-none tracking-[0.2em]"
          data-text="JAHARTA"
        >
          <span className="relative bg-gradient-to-br from-cyan via-emerald-200 to-violet bg-clip-text text-transparent" style={{ filter: "drop-shadow(0 0 40px rgba(0,240,255,0.3)) drop-shadow(0 0 80px rgba(180,74,255,0.15))" }}>
            JAHARTA
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mx-auto mb-4 max-w-[550px] font-body text-[1.05rem] font-light italic text-white/35"
        >
          Là où la magie et la technologie ne se contredisent pas&nbsp;—
          elles coexistent, s&apos;entrelacent et se complètent.
        </motion.p>

        {/* Data stream divider */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.5 }}
          className="data-stream mx-auto mb-8 max-w-[300px]"
        />

        {/* CTA */}
        <motion.a
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          href="https://discord.gg/jBMnmeR944"
          target="_blank"
          rel="noopener"
          className="group/cta relative inline-flex items-center gap-3 overflow-hidden rounded-sm bg-gradient-to-br from-cyan to-emerald-200 px-10 py-4 font-heading text-sm font-semibold uppercase tracking-[0.15em] text-jaharta-deep transition-all hover:-translate-y-0.5"
          style={{ boxShadow: "0 0 20px rgba(0,240,255,0.3), 0 0 60px rgba(0,240,255,0.1)" }}
        >
          <DiscordIcon />
          Entrer dans Jaharta
          {/* Shine sweep */}
          <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-500 group-hover/cta:translate-x-full" />
        </motion.a>

        {/* Version tag */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.8 }}
          className="mt-6 font-heading text-[0.5rem] uppercase tracking-[0.3em] text-white/[0.08]"
        >
          JAHARTA OS v5.0 // NEXUS PROTOCOL ACTIVE
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
      >
        <span className="font-heading text-[0.65rem] font-medium uppercase tracking-[0.3em] text-white/[0.1]">
          Explorer
        </span>
        <div className="h-10 w-px animate-scroll-pulse bg-gradient-to-b from-cyan-dim to-transparent" />
      </motion.div>

      {/* Bottom gradient edge */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-jaharta-deep to-transparent" />
    </section>
  );
}
