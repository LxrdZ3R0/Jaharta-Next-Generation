"use client";
import { Reveal } from "@/components/ui/reveal";

const DiscordIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" />
  </svg>
);

export function DiscordBanner() {
  return (
    <section className="relative px-8 py-16">
      <div className="mx-auto max-w-[1100px]">
        <Reveal>
          <div className="relative flex flex-wrap items-center justify-between gap-5 overflow-hidden rounded border border-[#7289da]/25 bg-gradient-to-br from-[#7289da]/[0.08] to-[#7289da]/[0.03] p-8 backdrop-blur-xl md:p-10">
            {/* Left accent */}
            <div className="absolute left-0 top-0 h-full w-[3px] rounded-l bg-gradient-to-b from-[#7289da] to-transparent" />

            <div className="flex items-center gap-4">
              <DiscordIcon className="h-10 w-10 shrink-0 text-[#7289da] opacity-80" />
              <div>
                <div className="font-display text-[0.88rem] font-bold tracking-[0.12em] text-white">
                  Rejoignez le serveur Jaharta
                </div>
                <div className="font-heading text-[0.7rem] font-medium tracking-[0.08em] text-white/40">
                  Communauté · Événements RP · Annonces · Soumission de fiches
                </div>
              </div>
            </div>

            <a
              href="https://discord.gg/jBMnmeR944"
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-2 whitespace-nowrap rounded-sm bg-[#7289da]/80 px-6 py-3 font-display text-[0.65rem] font-bold uppercase tracking-[0.18em] text-white shadow-[0_0_16px_rgba(114,137,218,0.15)] transition-all hover:-translate-y-0.5 hover:bg-[#7289da] hover:shadow-[0_0_30px_rgba(114,137,218,0.4)]"
            >
              <DiscordIcon className="h-4 w-4" />
              discord.gg/jBMnmeR944
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function FinalCTA() {
  return (
    <section className="px-8 py-24 text-center">
      <Reveal>
        <p className="mb-4 font-display text-[clamp(1.5rem,4vw,2.5rem)] font-bold tracking-[0.15em] text-white/90">
          Êtes-vous prêts à assumer vos choix&nbsp;?
        </p>
        <p className="mb-10 font-body text-base font-light text-white/40">
          Jaharta ne se comprend pas en le lisant — mais en le vivant.
        </p>
        <a
          href="https://discord.gg/jBMnmeR944"
          target="_blank"
          rel="noopener"
          className="group/cta relative inline-flex items-center gap-3 overflow-hidden rounded-sm bg-gradient-to-br from-cyan to-emerald-200 px-10 py-4 font-heading text-sm font-semibold uppercase tracking-[0.15em] text-jaharta-deep shadow-glow-md transition-all hover:-translate-y-0.5 hover:shadow-glow-lg"
        >
          <DiscordIcon className="h-[18px] w-[18px]" />
          Entrer dans Jaharta
          <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-500 group-hover/cta:translate-x-full" />
        </a>
      </Reveal>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] px-8 pb-6 pt-10">
      <div className="mx-auto flex max-w-[1100px] flex-wrap items-center justify-between gap-8">
        <div>
          <div className="font-display text-[0.8rem] font-extrabold tracking-[0.25em] text-cyan-dim">
            JAHARTA // RP
          </div>
          <div className="mt-1 font-heading text-[0.65rem] font-medium tracking-[0.12em] text-white/15">
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
            {
              href: "https://discord.gg/jBMnmeR944",
              label: "Discord ↗",
              external: true,
            },
          ].map((l) => (
            <a
              key={l.href}
              href={l.href}
              {...(l.external ? { target: "_blank", rel: "noopener" } : {})}
              className="font-heading text-[0.65rem] font-medium tracking-[0.1em] text-white/30 transition-colors hover:text-cyan"
            >
              {l.label}
            </a>
          ))}
        </div>
      </div>
      <div className="mt-6 border-t border-white/[0.04] pt-6 text-center font-heading text-[0.6rem] font-medium tracking-[0.2em] text-white/10">
        © 2024 — 2026 JAHARTA RP · TOUS DROITS RÉSERVÉS
      </div>
    </footer>
  );
}
