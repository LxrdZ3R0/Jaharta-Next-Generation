"use client";
import { Navbar } from "@/components/sections/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { LoreSection } from "@/components/sections/LoreSection";
import { MapSection } from "@/components/sections/MapSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { NavCardsSection } from "@/components/sections/NavCardsSection";
import {
  DiscordBanner,
  FinalCTA,
  Footer,
} from "@/components/sections/FooterSections";
import { PageTransition } from "@/components/ui/page-transition";

export default function Home() {
  return (
    <>
      <PageTransition />
      <Navbar />
      <main>
        <HeroSection />
        <LoreSection />
        <MapSection />
        <FeaturesSection />
        <NavCardsSection />
        <DiscordBanner />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
