"use client";
import { ReactNode } from "react";
import { SmoothScroll } from "@/components/ui/smooth-scroll";
import { CyberCursor } from "@/components/ui/cyber-cursor";
import { ScrollProgress } from "@/components/ui/gsap-effects";

export function ClientProviders({ children }: { children: ReactNode }) {
  return (
    <SmoothScroll>
      <div className="animated-grain">
        <ScrollProgress />
        <CyberCursor />
        {children}
      </div>
    </SmoothScroll>
  );
}
