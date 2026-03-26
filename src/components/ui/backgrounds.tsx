"use client";
import { cn } from "@/lib/utils";

export function GridBackground({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0",
        className
      )}
      style={{
        backgroundImage:
          "linear-gradient(90deg, rgba(0,240,255,0.035) 1px, transparent 1px), linear-gradient(0deg, rgba(0,240,255,0.035) 1px, transparent 1px)",
        backgroundSize: "80px 80px",
        maskImage:
          "radial-gradient(ellipse 50% 50% at 50% 50%, black 0%, transparent 70%)",
        WebkitMaskImage:
          "radial-gradient(ellipse 50% 50% at 50% 50%, black 0%, transparent 70%)",
      }}
    />
  );
}

export function NoiseOverlay() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[9998] opacity-[0.035]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundSize: "200px",
      }}
    />
  );
}

export function ScanlineOverlay() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[9999]"
      style={{
        background:
          "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,240,255,0.012) 2px, rgba(0,240,255,0.012) 4px)",
      }}
    />
  );
}
