"use client";
import { GlitchReveal, NeonFlash } from "@/components/ui/gsap-effects";
import { Magnetic } from "@/components/ui/magnetic";

const DiscordIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" />
  </svg>
);

export function DiscordBanner() {
  return (
    <section className="relative px-8 py-16">
      <div className="mx-auto max-w-[1100px]">
        <GlitchReveal>
          <div
            className="cyber-corners relative flex flex-wrap items-center justify-between gap-5 overflow-hidden rounded-lg border border-[#7289da]/30 bg-[#08080f] p-8 md:p-10"
            style={{
              boxShadow: "0 0 40px rgba(114,137,218,0.08), inset 0 0 40px rgba(114,137,218,0.03)",
            }}
          >
            {/* Left neon accent */}
            <div className="absolute left-0 top-0 h-full w-[3px] rounded-l bg-gradient-to-b from-[#7289da] via-[#7289da] to-transparent" style={{ boxShadow: "0 0 12px rgba(114,137,218,0.4)" }} />

            <div className="flex items-center gap-4">
              <DiscordIcon className="h-10 w-10 shrink-0 text-[#7289da] drop-shadow-[0_0_8px_rgba(114,137,218,0.5)]" />
              <div>
                <div className="font-display text-[0.9rem] font-bold tracking-[0.12em] text-white" style={{ textShadow: "0 0 20px rgba(114,137,218,0.3)" }}>
                  Rejoignez le serveur Jaharta
                </div>
                <div className="font-heading text-[0.7rem] font-medium tracking-[0.08em] text-white/35">
                  Communauté · Événements RP · Annonces · Soumission de fiches
                </div>
              </div>
            </div>

            <Magnetic strength={0.2}>
              <a
                href="https://discord.gg/jBMnmeR944"
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-2 whitespace-nowrap rounded bg-[#7289da] px-6 py-3 font-display text-[0.65rem] font-bold uppercase tracking-[0.18em] text-white transition-all hover:-translate-y-1"
                style={{
                  boxShadow: "0 0 20px rgba(114,137,218,0.3), 0 0 50px rgba(114,137,218,0.1)",
                }}
              >
                <DiscordIcon className="h-4 w-4" />
                discord.gg/jBMnmeR944
              </a>
            </Magnetic>
          </div>
        </GlitchReveal>
      </div>
    </section>
  );
}

export function FinalCTA() {
  return (
    <section className="relative px-8 py-28 text-center">
      <div className="hex-grid pointer-events-none absolute inset-0 opacity-15" />

      <div className="relative">
        <div className="data-stream mx-auto mb-10 max-w-[300px]" />

        <NeonFlash color="#00f0ff">
          <p
            className="mb-4 font-display text-[clamp(1.8rem,5vw,3rem)] font-black tracking-[0.12em] text-white/90"
            style={{ textShadow: "0 0 30px rgba(0,240,255,0.2)" }}
          >
            Êtes-vous prêts à assumer vos choix&nbsp;?
          </p>
        </NeonFlash>

        <p className="mb-10 font-body text-lg font-light text-white/30">
          Jaharta ne se comprend pas en le lisant — mais en le <span className="font-medium text-magenta" style={{ textShadow: "0 0 15px rgba(255,42,138,0.4)" }}>vivant</span>.
        </p>

        <Magnetic strength={0.25}>
          <a
            href="https://discord.gg/jBMnmeR944"
            target="_blank"
            rel="noopener"
            className="group/cta relative inline-flex items-center gap-3 overflow-hidden rounded bg-gradient-to-br from-cyan via-[#40ffd0] to-cyan px-14 py-5 font-heading text-base font-bold uppercase tracking-[0.18em] text-jaharta-deep transition-all hover:-translate-y-1 hover:scale-[1.03]"
            style={{
              boxShadow: "0 0 30px rgba(0,240,255,0.4), 0 0 60px rgba(0,240,255,0.15), 0 0 100px rgba(0,240,255,0.05)",
            }}
          >
            <DiscordIcon className="h-5 w-5" />
            Entrer dans Jaharta
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover/cta:translate-x-full" />
          </a>
        </Magnetic>

        <div className="data-stream mx-auto mt-10 max-w-[300px]" />
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="relative border-t border-cyan/[0.08] px-8 pb-6 pt-10">
      <div className="pointer-events-none absolute left-0 right-0 top-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(0,240,255,0.3), rgba(255,42,138,0.2), rgba(180,74,255,0.3), transparent)", boxShadow: "0 0 10px rgba(0,240,255,0.15)" }} />

      <div className="mx-auto flex max-w-[1100px] flex-wrap items-center justify-between gap-8">
        <div>
          <div className="font-display text-[0.8rem] font-extrabold tracking-[0.25em] text-cyan/60" style={{ textShadow: "0 0 10px rgba(0,240,255,0.2)" }}>
            JAHARTA // RP
          </div>
          <div className="mt-1 font-heading text-[0.65rem] font-medium tracking-[0.12em] text-white/10">
            Univers Jaharta · Roleplay Officiel
          </div>
        </div>
        <div className="flex flex-wrap gap-4">
          {[
            { href: "/fiches", label: "Fiches RP" },
            { href: "/pnj", label: "PNJ" },
            { href: "/portail", label: "Portail" },
            { href: "/races", label: "Races" },
            { href: "/admin", label: "Admin" },
            { href: "https://discord.gg/jBMnmeR944", label: "Discord ↗", external: true },
          ].map((l) => (
            <a
              key={l.href}
              href={l.href}
              {...(l.external ? { target: "_blank", rel: "noopener" } : {})}
              className="neon-underline font-heading text-[0.65rem] font-medium tracking-[0.1em] text-white/25 transition-colors hover:text-cyan"
            >
              {l.label}
            </a>
          ))}
        </div>
      </div>
      <div className="mt-6 border-t border-white/[0.03] pt-6 text-center font-heading text-[0.55rem] font-medium tracking-[0.2em] text-white/[0.06]">
        © 2024 — 2026 JAHARTA RP · TOUS DROITS RÉSERVÉS
      </div>
    </footer>
  );
}
