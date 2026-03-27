"use client";
import Link from "next/link";
import { GlitchReveal, NeonFlash } from "@/components/ui/gsap-effects";
import { Magnetic } from "@/components/ui/magnetic";

const cards = [
  {
    href: "/fiches",
    icon: "◈",
    title: "Base de Données RP",
    desc: "Registre complet des personnages joueurs. Filtrez par race, consultez les fiches et rangs de puissance.",
    cta: "ACCÉDER →",
    accent: "#00f0ff",
  },
  {
    href: "/pnj",
    icon: "◆",
    title: "Personnages PNJ",
    desc: "Les figures importantes de Jaharta — entités mythiques, seigneurs de guerre et acteurs clés de l'univers.",
    cta: "DÉCOUVRIR →",
    accent: "#ff2a8a",
  },
  {
    href: "/portail",
    icon: "⬡",
    title: "Portail des Ressources",
    desc: "Lore, cartes du monde, règles du RP et toutes les ressources essentielles pour votre histoire.",
    cta: "EXPLORER →",
    accent: "#b44aff",
  },
];

export function NavCardsSection() {
  return (
    <section className="relative px-8 py-32" id="explore">
      <div className="hex-grid pointer-events-none absolute inset-0 opacity-20" />

      <div className="relative mx-auto max-w-[1100px]">
        <div className="data-stream mx-auto mb-12 max-w-[400px]" />

        <NeonFlash color="#b44aff" className="mb-10 text-center">
          <div className="flex items-center justify-center gap-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-violet/30" />
            <p
              className="font-display text-[0.65rem] font-bold uppercase tracking-[0.5em] text-violet"
              style={{ textShadow: "0 0 15px rgba(180,74,255,0.5)" }}
            >
              Explorer l&apos;univers
            </p>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-violet/30" />
          </div>
        </NeonFlash>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {cards.map((card) => (
            <GlitchReveal key={card.href}>
              <Magnetic strength={0.12}>
                <Link href={card.href} className="block h-full">
                  <div
                    className="nav-card-cyber group relative flex h-full flex-col overflow-hidden rounded-lg border border-white/[0.06] bg-[#08080f] p-7 transition-all duration-400 hover:-translate-y-2"
                    style={{ "--card-accent": `${card.accent}30` } as React.CSSProperties}
                  >
                    {/* Spinning neon border */}
                    <div className="pointer-events-none absolute -inset-px z-0 overflow-hidden rounded-lg opacity-0 transition-opacity duration-400 group-hover:opacity-100">
                      <div
                        className="absolute -inset-1/2"
                        style={{
                          background: `conic-gradient(from 0deg, transparent 0%, ${card.accent} 6%, transparent 12%, transparent 50%, ${card.accent}80 56%, transparent 62%)`,
                          animation: "borderSpin 3s linear infinite",
                        }}
                      />
                      <div className="absolute inset-[2px] rounded-lg bg-[#08080f]" />
                    </div>

                    {/* Top neon line */}
                    <div
                      className="absolute left-0 right-0 top-0 z-10 h-[2px] transition-all duration-500"
                      style={{
                        background: `linear-gradient(90deg, transparent, ${card.accent}, transparent)`,
                        opacity: 0.3,
                        filter: `drop-shadow(0 0 6px ${card.accent})`,
                      }}
                    />

                    {/* Content */}
                    <div className="relative z-10">
                      <span
                        className="mb-4 block text-3xl transition-transform duration-300 group-hover:scale-110"
                        style={{
                          color: card.accent,
                          filter: `drop-shadow(0 0 12px ${card.accent}) drop-shadow(0 0 24px ${card.accent}60)`,
                        }}
                      >
                        {card.icon}
                      </span>

                      <h3
                        className="mb-2 font-display text-[0.85rem] font-bold tracking-[0.12em] text-white/90"
                        style={{ textShadow: `0 0 20px ${card.accent}30` }}
                      >
                        {card.title}
                      </h3>

                      <p className="mb-5 flex-1 font-body text-[0.85rem] leading-relaxed text-white/30">
                        {card.desc}
                      </p>

                      <span
                        className="neon-underline font-heading text-[0.7rem] font-semibold tracking-[0.18em] transition-[letter-spacing] duration-300 group-hover:tracking-[0.35em]"
                        style={{ color: card.accent }}
                      >
                        {card.cta}
                      </span>
                    </div>

                    {/* Hover glow */}
                    <div
                      className="pointer-events-none absolute inset-0 rounded-lg opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                      style={{
                        background: `radial-gradient(circle at 50% 0%, ${card.accent}10, transparent 60%)`,
                      }}
                    />

                    {/* Circuit decoration */}
                    <div className="pointer-events-none absolute bottom-3 right-3 opacity-[0.06] transition-opacity group-hover:opacity-[0.12]">
                      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                        <path d="M32 0v14l-8 8H10" stroke={card.accent} strokeWidth="0.5" />
                        <circle cx="10" cy="22" r="2" fill={card.accent} />
                        <path d="M10 22H0" stroke={card.accent} strokeWidth="0.3" strokeDasharray="2 2" />
                      </svg>
                    </div>
                  </div>
                </Link>
              </Magnetic>
            </GlitchReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
