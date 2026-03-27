"use client";
import { GlitchReveal, NeonFlash } from "@/components/ui/gsap-effects";
import { Magnetic } from "@/components/ui/magnetic";

const features = [
  {
    icon: "⚔️",
    title: "Système RPG exclusif",
    desc: "Un bot développé sur mesure : gagnez de l'XP, montez de niveau, gérez vos items et vos loots — une expérience encore jamais vue.",
    color: "#00f0ff",
  },
  {
    icon: "💰",
    title: "Économie complète",
    desc: "Un système monétaire pensé pour le RP, avec un marché interactif pour acheter équipements et ressources.",
    color: "#ffd60a",
  },
  {
    icon: "🐉",
    title: "Companions",
    desc: "Des monstres uniques avec évolutions, pouvoirs synchronisés et stats bonus. Trouvez celui qui combattra à vos côtés.",
    color: "#b44aff",
  },
  {
    icon: "🏅",
    title: "Titres & Prouesses",
    desc: "Des titres qui marquent vos exploits en RP et octroient divers bonus. Forgez votre légende dans Jaharta.",
    color: "#ff2a8a",
  },
];

export function FeaturesSection() {
  return (
    <section className="relative px-8 py-32" id="features">
      <div className="hex-grid pointer-events-none absolute inset-0 opacity-20" />

      <div className="relative mx-auto max-w-[1100px]">
        <div className="data-stream mx-auto mb-12 max-w-[400px]" />

        <NeonFlash color="#00f0ff" className="mb-10 text-center">
          <div className="flex items-center justify-center gap-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-cyan/30" />
            <p className="font-display text-[0.65rem] font-bold uppercase tracking-[0.5em] text-cyan"
              style={{ textShadow: "0 0 15px rgba(0,240,255,0.5)" }}>
              Un système inédit
            </p>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-cyan/30" />
          </div>
        </NeonFlash>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <GlitchReveal key={f.title}>
              <Magnetic strength={0.15}>
                <div
                  className="feature-card-cyber group relative overflow-hidden rounded-lg border border-white/[0.06] bg-[#08080f] p-7 backdrop-blur-xl"
                  style={{ "--card-accent": f.color } as React.CSSProperties}
                >
                  {/* Neon top line */}
                  <div
                    className="absolute left-0 right-0 top-0 h-[2px] transition-all duration-400"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${f.color}, transparent)`,
                      opacity: 0.4,
                      filter: `drop-shadow(0 0 4px ${f.color})`,
                    }}
                  />

                  <span className="mb-4 block text-4xl"
                    style={{ filter: `drop-shadow(0 0 12px ${f.color}60)` }}>
                    {f.icon}
                  </span>

                  <h3 className="mb-3 font-display text-[0.9rem] font-bold tracking-[0.1em] text-white/90"
                    style={{ textShadow: `0 0 20px ${f.color}30` }}>
                    {f.title}
                  </h3>

                  <p className="font-body text-[0.85rem] leading-relaxed text-white/30">
                    {f.desc}
                  </p>

                  {/* Corner circuits */}
                  <div className="pointer-events-none absolute bottom-3 right-3 opacity-[0.08]">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M24 0v10l-6 6H8" stroke={f.color} strokeWidth="0.5" />
                      <circle cx="8" cy="16" r="1.5" fill={f.color} />
                    </svg>
                  </div>

                  {/* Hover glow overlay */}
                  <div
                    className="pointer-events-none absolute inset-0 rounded-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{
                      background: `radial-gradient(circle at 50% 0%, ${f.color}0a, transparent 60%)`,
                    }}
                  />
                </div>
              </Magnetic>
            </GlitchReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
