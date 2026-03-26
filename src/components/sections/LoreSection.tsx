"use client";
import { Reveal } from "@/components/ui/reveal";

function DataStream() {
  return <div className="data-stream mx-auto my-12 max-w-[400px]" />;
}

function SectionLabel({ children }: { children: string }) {
  return (
    <div className="mb-8 flex items-center justify-center gap-4">
      <div className="h-px w-12 bg-gradient-to-r from-transparent to-cyan/30" />
      <p className="font-display text-[0.6rem] font-semibold uppercase tracking-[0.5em] text-cyan-dim">
        {children}
      </p>
      <div className="h-px w-12 bg-gradient-to-l from-transparent to-cyan/30" />
    </div>
  );
}

export function LoreSection() {
  return (
    <section className="relative px-8 py-32" id="lore">
      {/* Background hex grid subtle */}
      <div className="hex-grid pointer-events-none absolute inset-0 opacity-30" />

      <div className="relative mx-auto max-w-[900px]">
        <Reveal>
          <DataStream />
        </Reveal>
        <Reveal delay={0.1}>
          <SectionLabel>Votre histoire commence ici</SectionLabel>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mb-8 text-center font-body text-[1.1rem] leading-[1.9] text-white/35">
            <p className="mb-7">
              Votre âme errait quelque part, dans l&apos;immensité de l&apos;inconscience collective.
              Mais une entité unique vous a appelé&nbsp;:{" "}
              <em className="neon-pulse not-italic text-cyan">le Nexus</em>.
              Vous n&apos;êtes pas né dans ce monde — vous y avez été{" "}
              <strong className="font-medium text-white/80">invité</strong>,
              ajouté à la trame du réel comme une variable venue d&apos;ailleurs.
            </p>
            <p>
              Jaharta vous a accepté… sans forcément vous comprendre.
              Ici, une rune peut alimenter une machine, et un circuit peut canaliser un sort.
              Magie et technologie ne se contredisent pas&nbsp;: elles{" "}
              <em className="neon-pulse not-italic text-cyan">coexistent</em>,
              s&apos;entrelacent et parfois se déforment mutuellement.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="cyber-corners relative mx-0 my-12 border-l-2 border-r-2 border-l-cyan border-r-violet p-8 text-center font-heading text-2xl font-semibold text-white/85"
            style={{
              background: "linear-gradient(90deg, rgba(0,240,255,0.04), rgba(8,8,15,0.8), rgba(180,74,255,0.04))",
              boxShadow: "inset 0 0 60px rgba(0,240,255,0.03), inset 0 0 60px rgba(180,74,255,0.03)",
            }}
          >
            {/* Corner circuit decoration */}
            <div className="pointer-events-none absolute left-3 top-3 opacity-[0.12]">
              <svg width="20" height="20" viewBox="0 0 20 20"><path d="M0 0h8l4 4v8" stroke="#00f0ff" strokeWidth="0.5" fill="none" /><circle cx="12" cy="12" r="1" fill="#00f0ff" /></svg>
            </div>
            <div className="pointer-events-none absolute bottom-3 right-3 rotate-180 opacity-[0.12]">
              <svg width="20" height="20" viewBox="0 0 20 20"><path d="M0 0h8l4 4v8" stroke="#b44aff" strokeWidth="0.5" fill="none" /><circle cx="12" cy="12" r="1" fill="#b44aff" /></svg>
            </div>

            Votre seconde chance débute à{" "}
            <em className="not-italic text-cyan" style={{ textShadow: "0 0 20px rgba(0,240,255,0.4)" }}>Navari</em>,
            la Cité-Strate&nbsp;:
            <br />
            première puissance militaire et deuxième puissance économique de Jaharta.
          </div>
        </Reveal>

        <Reveal delay={0.4}>
          <div className="text-center font-body text-[1.1rem] leading-[1.9] text-white/35">
            <p className="mb-7">
              Le corps qui vous est octroyé par le Nexus peut — ou non — être celui de votre vie antérieure.
              Mais le résultat est le même&nbsp;: vous ne le maîtrisez pas encore.
              Au rythme de vos discussions, de vos combats, de vos chasses et de vos négociations,
              vous reprendrez le contrôle grâce au{" "}
              <strong className="font-medium text-white/80">Système</strong> — votre compagnon le plus constant.
            </p>
            <p className="mb-7">
              Il vous observe, vous mesure, vous conseille… et parfois vous avertit.
              Ignorer un de ses avertissements revient souvent à signer un aller simple
              vers une situation que Jaharta{" "}
              <em className="not-italic text-magenta" style={{ textShadow: "0 0 15px rgba(255,42,138,0.3)" }}>ne pardonne pas</em>.
            </p>
            <p>
              Suivrez-vous la voie du Système&nbsp;? Ou forgerez-vous une vie comme vous le dicte votre instinct&nbsp;?
              Quel que soit votre choix, ce sera le vôtre.
              Et un choix implique toujours des{" "}
              <strong className="font-medium text-white/80">conséquences</strong>.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.5}>
          <DataStream />
        </Reveal>
      </div>
    </section>
  );
}
