"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { cn } from "@/lib/utils";

interface Particle {
  x: number;
  y: number;
  radius: number;
  speedX: number;
  speedY: number;
  opacity: number;
  color: string;
  pulse: number;
  pulseSpeed: number;
}

interface SparklesCoreProps {
  className?: string;
  background?: string;
  minSize?: number;
  maxSize?: number;
  particleDensity?: number;
  particleColor?: string;
  secondaryColor?: string;
}

export function SparklesCore({
  className,
  background = "transparent",
  minSize = 0.3,
  maxSize = 1.5,
  particleDensity = 80,
  particleColor = "0, 240, 255",
  secondaryColor = "180, 74, 255",
}: SparklesCoreProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number | undefined>(undefined);
  const particlesRef = useRef<Particle[]>([]);

  const initParticles = useCallback(
    (w: number, h: number) => {
      const count = Math.min(
        Math.floor((w * h) / 18000),
        particleDensity
      );
      const particles: Particle[] = [];
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          radius: Math.random() * (maxSize - minSize) + minSize,
          speedX: (Math.random() - 0.5) * 0.3,
          speedY: (Math.random() - 0.5) * 0.2 - 0.1,
          opacity: Math.random() * 0.5 + 0.1,
          color: Math.random() > 0.75 ? secondaryColor : particleColor,
          pulse: Math.random() * Math.PI * 2,
          pulseSpeed: Math.random() * 0.02 + 0.005,
        });
      }
      particlesRef.current = particles;
    },
    [maxSize, minSize, particleDensity, particleColor, secondaryColor]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      canvas.width = parent.offsetWidth;
      canvas.height = parent.offsetHeight;
      initParticles(canvas.width, canvas.height);
    };

    resize();

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      particlesRef.current.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.pulse += p.pulseSpeed;

        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;

        const curOp = p.opacity * (0.6 + 0.4 * Math.sin(p.pulse));

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color}, ${curOp * 0.15})`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color}, ${curOp})`;
        ctx.fill();
      });

      animRef.current = requestAnimationFrame(draw);
    };

    draw();

    let resizeTimer: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 200);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", handleResize);
    };
  }, [initParticles]);

  return (
    <canvas
      ref={canvasRef}
      style={{ background }}
      className={cn("pointer-events-none absolute inset-0", className)}
    />
  );
}
