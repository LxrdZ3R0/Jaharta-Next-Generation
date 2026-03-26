"use client";
import { Reveal, StaggerChildren, StaggerItem } from "@/components/ui/reveal";
import { CardHoverEffect } from "@/components/ui/card-hover";

const features = [
  {
    icon: "⚔️",
    title: "Système RPG exclusif",
    desc: "Un bot développé sur mesure : gagnez de l'XP, montez de niveau, gérez vos items et vos loots — une expérience encore jamais vue.",
  },
  {
    icon: "💰",
    title: "Économie complète",
    desc: "Un système monétaire pensé pour le RP, avec un marché interactif pour acheter équipements et ressources.",
  },
  {
    icon: "🐉",
    title: "Companions",
    desc: "Des monstres uniques avec évolutions, pouvoirs synchronisés et stats bonus. Trouvez celui qui combattra à vos côtés.",
  },
  {
    icon: "🏅",
    title: "Titres & Prouesses",
    desc: "Des titres qui marquent vos exploits en RP et octroient divers bonus. Forgez votre légende dans Jaharta.",
  },
];

export function FeaturesSection() {
  return (
    <section className="relative px-8 py-32" id="features">
      <div className="mx-auto max-w-[1100px]">
        <Reveal>
          <div className="mx-auto mb-12 h-px w-[60px] bg-gradient-to-r from-transparent via-cyan to-transparent shadow-glow-sm" />
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mb-8 text-center font-display text-[0.65rem] font-semibold uppercase tracking-[0.5em] text-cyan-dim">
            Un système inédit
          </p>
        </Reveal>

        <StaggerChildren className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <StaggerItem key={f.title}>
              <CardHoverEffect className="h-full p-7">
                <span className="mb-4 block text-3xl">{f.icon}</span>
                <h3 className="mb-2 font-heading text-[1.15rem] font-semibold tracking-[0.08em] text-white/90">
                  {f.title}
                </h3>
                <p className="font-body text-[0.9rem] leading-relaxed text-white/40">
                  {f.desc}
                </p>
              </CardHoverEffect>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
}
