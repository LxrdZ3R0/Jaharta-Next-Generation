"use client";
import { motion } from "framer-motion";
import { SparklesCore } from "@/components/ui/sparkles";
import { GridBackground } from "@/components/ui/backgrounds";
import { Spotlight } from "@/components/ui/spotlight";
import { ReactNode } from "react";

interface SubPageHeroProps {
  pretitle: string;
  title: string;
  subtitle: string;
  children?: ReactNode;
}

export function SubPageHero({ pretitle, title, subtitle, children }: SubPageHeroProps) {
  return (
    <section className="crt-flicker relative flex min-h-[50vh] flex-col items-center justify-center overflow-hidden px-10 pb-16 pt-28 text-center">
      {/* Hex grid */}
      <div className="hex-grid pointer-events-none absolute inset-0 opacity-40" />
      <SparklesCore className="z-[1]" />
      <GridBackground />
      <Spotlight className="-left-10 -top-40" fill="#00f0ff" />

      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, transparent 0%, #06060c 100%), linear-gradient(180deg, rgba(6,6,12,0.5) 0%, transparent 30%, transparent 70%, #06060c 100%)",
        }}
      />

      {/* Corner circuits */}
      <div className="pointer-events-none absolute left-6 top-20 opacity-[0.06]">
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
          <path d="M0 40h20l6-6h12l6 6h16" stroke="#00f0ff" strokeWidth="0.5" />
          <path d="M26 34V14h12v20" stroke="#00f0ff" strokeWidth="0.4" />
          <circle cx="26" cy="14" r="1.5" fill="#00f0ff" />
          <circle cx="38" cy="14" r="1.5" fill="#00f0ff" />
        </svg>
      </div>

      <div className="relative z-10 mx-auto max-w-[800px]">
        {/* Status tag */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mx-auto mb-5 flex w-fit items-center gap-2 rounded-sm border border-cyan/[0.12] bg-cyan/[0.02] px-3 py-1 backdrop-blur-sm"
        >
          <span className="relative h-1 w-1 rounded-full bg-emerald-400 shadow-[0_0_6px_#00ff88]">
            <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400 opacity-50" />
          </span>
          <span className="font-heading text-[0.5rem] uppercase tracking-[0.3em] text-cyan-dim/60">
            Système en ligne
          </span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="mb-5 font-heading text-[0.8rem] font-medium uppercase tracking-[0.5em] text-cyan-dim"
        >
          {pretitle}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="cyber-hero-title mb-4 font-display text-[clamp(2rem,7vw,4.5rem)] font-black leading-none tracking-[0.15em]"
          data-text={title}
        >
          <span
            className="bg-gradient-to-br from-cyan via-emerald-200 to-violet bg-clip-text text-transparent"
            style={{ filter: "drop-shadow(0 0 30px rgba(0,240,255,0.25)) drop-shadow(0 0 60px rgba(180,74,255,0.12))" }}
          >
            {title}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.7 }}
          className="mx-auto max-w-[500px] font-body text-[0.95rem] font-light text-white/35"
        >
          {subtitle}
        </motion.p>

        {/* Data stream */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="data-stream mx-auto my-6 max-w-[200px]"
        />

        {children && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.7 }}
            className="mt-4"
          >
            {children}
          </motion.div>
        )}
      </div>

      {/* Bottom gradient */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-jaharta-deep to-transparent" />
    </section>
  );
}
