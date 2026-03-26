"use client";
import { Reveal } from "@/components/ui/reveal";

function Divider() {
  return (
    <div className="mx-auto mb-12 h-px w-[60px] bg-gradient-to-r from-transparent via-cyan to-transparent shadow-glow-sm" />
  );
}

function SectionLabel({ children }: { children: string }) {
  return (
    <p className="mb-8 text-center font-display text-[0.65rem] font-semibold uppercase tracking-[0.5em] text-cyan-dim">
      {children}
    </p>
  );
}

export function LoreSection() {
  return (
    <section className="relative px-8 py-32" id="lore">
      <div className="mx-auto max-w-[900px]">
        <Reveal>
          <Divider />
        </Reveal>
        <Reveal delay={0.1}>
          <SectionLabel>Votre histoire commence ici</SectionLabel>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mb-8 text-center font-body text-[1.1rem] leading-[1.9] text-white/40">
            <p className="mb-7">
              Votre âme errait quelque part, dans l&apos;immensité de l&apos;inconscience collective.
              Mais une entité unique vous a appelé&nbsp;: <em className="not-italic text-cyan">le Nexus</em>.
              Vous n&apos;êtes pas né dans ce monde — vous y avez été{" "}
              <strong className="font-medium text-white/80">invité</strong>,
              ajouté à la trame du réel comme une variable venue d&apos;ailleurs.
            </p>
            <p>
              Jaharta vous a accepté… sans forcément vous comprendre.
              Ici, une rune peut alimenter une machine, et un circuit peut canaliser un sort.
              Magie et technologie ne se contredisent pas&nbsp;: elles{" "}
              <em className="not-italic text-cyan">coexistent</em>,
              s&apos;entrelacent et parfois se déforment mutuellement.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="mx-0 my-12 border-l-2 border-r-2 border-l-cyan border-r-violet bg-gradient-to-r from-cyan/[0.03] via-transparent to-violet/[0.03] p-8 text-center font-heading text-2xl font-semibold text-white/90">
            Votre seconde chance débute à <em className="not-italic text-cyan">Navari</em>, la Cité-Strate&nbsp;:
            <br />
            première puissance militaire et deuxième puissance économique de Jaharta.
          </div>
        </Reveal>

        <Reveal delay={0.4}>
          <div className="text-center font-body text-[1.1rem] leading-[1.9] text-white/40">
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
              vers une situation que Jaharta <em className="not-italic text-cyan">ne pardonne pas</em>.
            </p>
            <p>
              Suivrez-vous la voie du Système&nbsp;? Ou forgerez-vous une vie comme vous le dicte votre instinct&nbsp;?
              Quel que soit votre choix, ce sera le vôtre.
              Et un choix implique toujours des <strong className="font-medium text-white/80">conséquences</strong>.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
