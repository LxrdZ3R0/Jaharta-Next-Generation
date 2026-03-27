"use client";
import { useEffect, useRef, ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ═══ Parallax element — moves at different speed on scroll ═══ */
export function Parallax({
  children,
  speed = 0.5,
  className,
}: {
  children: ReactNode;
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    gsap.to(el, {
      y: () => speed * 100,
      ease: "none",
      scrollTrigger: {
        trigger: el,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [speed]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

/* ═══ GlitchReveal — element glitches in on scroll ═══ */
export function GlitchReveal({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });

    tl.fromTo(
      el,
      {
        opacity: 0,
        y: 30,
        filter: "blur(8px) brightness(2)",
        clipPath: "inset(0 100% 0 0)",
      },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px) brightness(1)",
        clipPath: "inset(0 0% 0 0)",
        duration: 0.8,
        ease: "power3.out",
      }
    )
      .to(
        el,
        {
          x: -4,
          skewX: -2,
          duration: 0.05,
          ease: "steps(1)",
        },
        0.3
      )
      .to(el, {
        x: 3,
        skewX: 1,
        duration: 0.05,
        ease: "steps(1)",
      })
      .to(el, {
        x: 0,
        skewX: 0,
        duration: 0.05,
        ease: "steps(1)",
      });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

/* ═══ NeonFlash — element flashes neon then settles ═══ */
export function NeonFlash({
  children,
  className,
  color = "#00f0ff",
}: {
  children: ReactNode;
  className?: string;
  color?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });

    tl.fromTo(
      el,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
    )
      .to(el, {
        textShadow: `0 0 30px ${color}, 0 0 60px ${color}, 0 0 100px ${color}`,
        duration: 0.15,
      })
      .to(el, {
        textShadow: `0 0 4px ${color}80`,
        duration: 0.6,
        ease: "power2.out",
      });

    return () => {
      tl.kill();
    };
  }, [color]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

/* ═══ ScrollProgress — neon progress bar at top ═══ */
export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    gsap.to(el, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: {
        trigger: document.documentElement,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.3,
      },
    });
  }, []);

  return (
    <div
      ref={ref}
      className="fixed left-0 top-0 z-[9998] h-[2px] w-full origin-left"
      style={{
        transform: "scaleX(0)",
        background:
          "linear-gradient(90deg, #00f0ff, #ff2a8a, #b44aff, #00ff88)",
        boxShadow: "0 0 10px rgba(0,240,255,0.5), 0 0 30px rgba(255,42,138,0.3)",
      }}
    />
  );
}
