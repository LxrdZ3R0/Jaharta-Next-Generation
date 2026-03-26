"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Reveal, StaggerChildren, StaggerItem } from "@/components/ui/reveal";

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
    accent: "#ff006e",
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
      <div className="mx-auto max-w-[1100px]">
        <Reveal>
          <div className="mx-auto mb-12 h-px w-[60px] bg-gradient-to-r from-transparent via-cyan to-transparent shadow-glow-sm" />
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mb-8 text-center font-display text-[0.65rem] font-semibold uppercase tracking-[0.5em] text-cyan-dim">
            Explorer l&apos;univers
          </p>
        </Reveal>

        <StaggerChildren className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {cards.map((card) => (
            <StaggerItem key={card.href}>
              <Link href={card.href} className="block h-full">
                <motion.div
                  whileHover={{
                    y: -6,
                    borderColor: card.accent,
                    boxShadow: `0 20px 40px rgba(0,0,0,0.4), 0 0 24px ${card.accent}1f`,
                  }}
                  className="group relative flex h-full flex-col overflow-hidden rounded border border-white/[0.06] bg-jaharta-card p-7 backdrop-blur-xl transition-all"
                  style={
                    {
                      "--card-accent": card.accent,
                    } as React.CSSProperties
                  }
                >
                  {/* Top line on hover */}
                  <div
                    className="absolute left-0 right-0 top-0 h-[2px] opacity-0 transition-opacity group-hover:opacity-100"
                    style={{
                      background: `linear-gradient(90deg, ${card.accent}, transparent)`,
                    }}
                  />

                  <span
                    className="mb-4 block text-3xl"
                    style={{
                      color: card.accent,
                      filter: `drop-shadow(0 0 8px ${card.accent})`,
                    }}
                  >
                    {card.icon}
                  </span>

                  <h3 className="mb-2 font-display text-[0.85rem] font-bold tracking-[0.12em] text-white/90">
                    {card.title}
                  </h3>

                  <p className="mb-5 flex-1 font-body text-[0.88rem] leading-relaxed text-white/40">
                    {card.desc}
                  </p>

                  <span
                    className="font-heading text-[0.7rem] font-semibold tracking-[0.18em] transition-[letter-spacing] group-hover:tracking-[0.3em]"
                    style={{ color: card.accent }}
                  >
                    {card.cta}
                  </span>
                </motion.div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
