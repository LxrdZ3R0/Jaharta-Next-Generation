"use client";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/FooterSections";
import { SubPageHero } from "@/components/sections/SubPageHero";
import { PageTransition } from "@/components/ui/page-transition";

export default function RacesPage() {
  return (
    <>
      <PageTransition />
      <Navbar />
      <main>
        <SubPageHero
          pretitle="Encyclopédie · Races Jouables"
          title="RACES JOUABLES"
          subtitle="Les espèces disponibles dans l'univers de Jaharta"
        />
        <div className="mx-auto max-w-[1380px] px-11 py-12">
          <p className="text-center font-heading text-sm tracking-widest text-white/30">
            Page en cours de conversion vers Next.js + Aceternity UI...
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
