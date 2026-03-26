"use client";
import { motion } from "framer-motion";
import { SparklesCore } from "@/components/ui/sparkles";
import { GridBackground } from "@/components/ui/backgrounds";
import { ReactNode } from "react";

interface SubPageHeroProps {
  pretitle: string;
  title: string;
  subtitle: string;
  children?: ReactNode;
}

export function SubPageHero({ pretitle, title, subtitle, children }: SubPageHeroProps) {
  return (
    <section className="relative flex min-h-[50vh] flex-col items-center justify-center overflow-hidden pt-28 pb-16 px-10 text-center">
      <SparklesCore className="z-[1]" />
      <GridBackground />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, transparent 0%, #06060c 100%), linear-gradient(180deg, rgba(6,6,12,0.5) 0%, transparent 30%, transparent 70%, #06060c 100%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[800px]">
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
          className="mb-4 font-display text-[clamp(2rem,7vw,4.5rem)] font-black tracking-[0.15em] leading-none"
          data-text={title}
        >
          <span className="bg-gradient-to-br from-cyan via-emerald-200 to-violet bg-clip-text text-transparent drop-shadow-[0_0_24px_rgba(0,240,255,0.3)]">
            {title}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.7 }}
          className="mx-auto max-w-[500px] font-body text-[0.95rem] font-light text-white/40"
        >
          {subtitle}
        </motion.p>

        {children && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.7 }}
            className="mt-8"
          >
            {children}
          </motion.div>
        )}
      </div>
    </section>
  );
}
