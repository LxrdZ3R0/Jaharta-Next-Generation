"use client";
import { useCallback, useRef, useEffect, useState } from "react";

interface Spark {
  x: number; y: number;
  vx: number; vy: number;
  life: number; maxLife: number;
  size: number; color: string;
}

export function useParticleBurst(color: string = "#00f0ff") {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sparksRef = useRef<Spark[]>([]);
  const animRef = useRef<number | undefined>(undefined);
  const [active, setActive] = useState(false);

  const burst = useCallback((x: number, y: number) => {
    const colors = [color, "#ff2a8a", "#b44aff", "#00ff88", "#ffffff"];
    const newSparks: Spark[] = [];
    for (let i = 0; i < 24; i++) {
      const angle = (Math.PI * 2 * i) / 24 + (Math.random() - 0.5) * 0.5;
      const speed = 2 + Math.random() * 5;
      newSparks.push({
        x, y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1,
        maxLife: 0.5 + Math.random() * 0.5,
        size: 1 + Math.random() * 3,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }
    sparksRef.current = [...sparksRef.current, ...newSparks];
    setActive(true);
  }, [color]);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const parent = canvas.parentElement;
    if (parent) {
      canvas.width = parent.offsetWidth;
      canvas.height = parent.offsetHeight;
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      sparksRef.current = sparksRef.current.filter((s) => {
        s.x += s.vx;
        s.y += s.vy;
        s.vy += 0.08; // gravity
        s.vx *= 0.98; // drag
        s.life -= 0.02;

        if (s.life <= 0) return false;

        const alpha = s.life;
        ctx.globalAlpha = alpha;
        ctx.fillStyle = s.color;
        ctx.shadowColor = s.color;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size * alpha, 0, Math.PI * 2);
        ctx.fill();

        // Trail
        ctx.globalAlpha = alpha * 0.3;
        ctx.beginPath();
        ctx.arc(s.x - s.vx, s.y - s.vy, s.size * alpha * 0.5, 0, Math.PI * 2);
        ctx.fill();

        return true;
      });

      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;

      if (sparksRef.current.length > 0) {
        animRef.current = requestAnimationFrame(animate);
      } else {
        setActive(false);
      }
    };

    animRef.current = requestAnimationFrame(animate);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [active]);

  return { canvasRef, burst, active };
}
