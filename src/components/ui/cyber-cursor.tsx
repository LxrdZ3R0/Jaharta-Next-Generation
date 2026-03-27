"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export function CyberCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    const trail = trailRef.current;
    if (!dot || !ring || !trail) return;

    // Only on desktop
    if (window.matchMedia("(pointer: coarse)").matches) return;

    document.body.style.cursor = "none";

    const onMove = (e: MouseEvent) => {
      gsap.to(dot, { x: e.clientX, y: e.clientY, duration: 0.1, ease: "power2.out" });
      gsap.to(ring, { x: e.clientX, y: e.clientY, duration: 0.3, ease: "power2.out" });
      gsap.to(trail, { x: e.clientX, y: e.clientY, duration: 0.6, ease: "power2.out" });
    };

    const onEnterInteractive = () => {
      gsap.to(ring, { scale: 1.8, borderColor: "rgba(255,42,138,0.6)", duration: 0.3 });
      gsap.to(dot, { scale: 0.5, backgroundColor: "#ff2a8a", duration: 0.3 });
    };

    const onLeaveInteractive = () => {
      gsap.to(ring, { scale: 1, borderColor: "rgba(0,240,255,0.4)", duration: 0.3 });
      gsap.to(dot, { scale: 1, backgroundColor: "#00f0ff", duration: 0.3 });
    };

    window.addEventListener("mousemove", onMove);

    // Observe interactive elements
    const interactives = document.querySelectorAll("a, button, [role='button'], .cyber-card");
    interactives.forEach((el) => {
      el.addEventListener("mouseenter", onEnterInteractive);
      el.addEventListener("mouseleave", onLeaveInteractive);
    });

    return () => {
      document.body.style.cursor = "";
      window.removeEventListener("mousemove", onMove);
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", onEnterInteractive);
        el.removeEventListener("mouseleave", onLeaveInteractive);
      });
    };
  }, []);

  return (
    <>
      {/* Trail (outermost, slowest) */}
      <div
        ref={trailRef}
        className="pointer-events-none fixed left-0 top-0 z-[99999] hidden md:block"
        style={{
          width: 40,
          height: 40,
          marginLeft: -20,
          marginTop: -20,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0,240,255,0.06), transparent 70%)",
        }}
      />
      {/* Ring */}
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[99999] hidden md:block"
        style={{
          width: 28,
          height: 28,
          marginLeft: -14,
          marginTop: -14,
          borderRadius: "50%",
          border: "1px solid rgba(0,240,255,0.4)",
          boxShadow: "0 0 10px rgba(0,240,255,0.15)",
          transition: "border-color 0.3s",
        }}
      />
      {/* Dot (center, fastest) */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[99999] hidden md:block"
        style={{
          width: 4,
          height: 4,
          marginLeft: -2,
          marginTop: -2,
          borderRadius: "50%",
          backgroundColor: "#00f0ff",
          boxShadow: "0 0 8px #00f0ff, 0 0 20px rgba(0,240,255,0.4)",
        }}
      />
    </>
  );
}
