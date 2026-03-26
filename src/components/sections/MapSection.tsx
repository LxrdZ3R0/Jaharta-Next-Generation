"use client";
import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";

export function MapSection() {
  return (
    <section className="relative px-8 pb-32 pt-16">
      <div className="mx-auto max-w-[1100px]">
        <Reveal>
          <div className="mx-auto mb-12 h-px w-[60px] bg-gradient-to-r from-transparent via-cyan to-transparent shadow-glow-sm" />
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mb-8 text-center font-display text-[0.65rem] font-semibold uppercase tracking-[0.5em] text-cyan-dim">
            Cartographie de Jaharta
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="relative overflow-hidden rounded border border-cyan/[0.1] shadow-glow-md">
            <Image
              src="/assets/map-holographic.png"
              alt="Carte holographique de Jaharta"
              width={1100}
              height={700}
              className="block w-full"
              loading="lazy"
            />
            <div className="pointer-events-none absolute inset-0 rounded border border-cyan/[0.12]" />
            <span className="absolute bottom-4 right-6 z-[3] font-display text-[0.6rem] uppercase tracking-[0.3em] text-cyan-dim/70">
              Core Stability: 94% — Projector Active
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
