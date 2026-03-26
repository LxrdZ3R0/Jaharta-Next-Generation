"use client";
import { useEffect, useRef } from "react";

/* ═══════════════════════════════════════════════════════════
   CYBERPUNK CITYSCAPE — Procedural Canvas Background
   Neon skyline, perspective grid, volumetric light columns,
   digital rain, atmospheric haze
   ═══════════════════════════════════════════════════════════ */

export function CyberpunkCityscape({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let w: number, h: number;

    // Rain drops
    interface Drop {
      x: number; y: number; speed: number; len: number; opacity: number;
    }
    let drops: Drop[] = [];

    // Buildings
    interface Building {
      x: number; w: number; h: number; color: string; windows: boolean; neonEdge: boolean;
    }
    let buildings: Building[] = [];

    // Floating particles (embers / data)
    interface Particle {
      x: number; y: number; vx: number; vy: number; size: number; color: string; life: number;
    }
    let particles: Particle[] = [];

    const COLORS = ["#00f0ff", "#b44aff", "#ff2a8a", "#00ff88", "#ffd60a", "#ff6060"];

    function resize() {
      if (!canvas) return;
      const parent = canvas.parentElement;
      if (!parent) return;
      w = canvas.width = parent.offsetWidth;
      h = canvas.height = parent.offsetHeight;
      generateBuildings();
      generateRain();
      generateParticles();
    }

    function generateBuildings() {
      buildings = [];
      const count = Math.floor(w / 18);
      for (let i = 0; i < count; i++) {
        const bw = 8 + Math.random() * 25;
        const bh = h * 0.1 + Math.random() * h * 0.45;
        buildings.push({
          x: (i / count) * w + (Math.random() - 0.5) * 10,
          w: bw,
          h: bh,
          color: Math.random() > 0.7
            ? COLORS[Math.floor(Math.random() * COLORS.length)]
            : "#0a0a18",
          windows: Math.random() > 0.3,
          neonEdge: Math.random() > 0.6,
        });
      }
      // Sort by height for depth
      buildings.sort((a, b) => a.h - b.h);
    }

    function generateRain() {
      drops = [];
      const count = Math.floor((w * h) / 4000);
      for (let i = 0; i < count; i++) {
        drops.push({
          x: Math.random() * w,
          y: Math.random() * h,
          speed: 3 + Math.random() * 6,
          len: 8 + Math.random() * 20,
          opacity: 0.05 + Math.random() * 0.12,
        });
      }
    }

    function generateParticles() {
      particles = [];
      const count = Math.floor(w / 30);
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * w,
          y: h * 0.4 + Math.random() * h * 0.6,
          vx: (Math.random() - 0.5) * 0.4,
          vy: -0.2 - Math.random() * 0.8,
          size: 0.5 + Math.random() * 2,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          life: Math.random(),
        });
      }
    }

    function draw(time: number) {
      ctx.clearRect(0, 0, w, h);

      // ── SKY GRADIENT ──
      const skyGrad = ctx.createLinearGradient(0, 0, 0, h);
      skyGrad.addColorStop(0, "#02020a");
      skyGrad.addColorStop(0.3, "#06040f");
      skyGrad.addColorStop(0.55, "#0a0818");
      skyGrad.addColorStop(0.7, "#12081e");
      skyGrad.addColorStop(1, "#08040c");
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, w, h);

      // ── ATMOSPHERIC GLOW (distant neon haze) ──
      const hazeX = w * 0.5 + Math.sin(time * 0.0002) * w * 0.15;
      const haze = ctx.createRadialGradient(hazeX, h * 0.65, 0, hazeX, h * 0.65, w * 0.5);
      haze.addColorStop(0, "rgba(180, 74, 255, 0.08)");
      haze.addColorStop(0.3, "rgba(0, 240, 255, 0.04)");
      haze.addColorStop(0.6, "rgba(255, 42, 138, 0.03)");
      haze.addColorStop(1, "transparent");
      ctx.fillStyle = haze;
      ctx.fillRect(0, 0, w, h);

      // Second haze
      const haze2X = w * 0.3 + Math.cos(time * 0.00015) * w * 0.1;
      const haze2 = ctx.createRadialGradient(haze2X, h * 0.7, 0, haze2X, h * 0.7, w * 0.35);
      haze2.addColorStop(0, "rgba(255, 42, 138, 0.06)");
      haze2.addColorStop(0.5, "rgba(0, 240, 255, 0.02)");
      haze2.addColorStop(1, "transparent");
      ctx.fillStyle = haze2;
      ctx.fillRect(0, 0, w, h);

      // ── PERSPECTIVE GRID (ground) ──
      const gridY = h * 0.62;
      ctx.save();
      ctx.globalAlpha = 0.06;
      ctx.strokeStyle = "#00f0ff";
      ctx.lineWidth = 0.5;

      // Horizontal lines with perspective
      for (let i = 0; i < 20; i++) {
        const y = gridY + (i / 20) * (h - gridY);
        const spread = 1 + (i / 20) * 3;
        ctx.beginPath();
        ctx.moveTo(w * 0.5 - w * spread * 0.5, y);
        ctx.lineTo(w * 0.5 + w * spread * 0.5, y);
        ctx.stroke();
      }

      // Vertical lines converging to vanishing point
      const vx = w * 0.5;
      const vy = gridY - h * 0.05;
      for (let i = -15; i <= 15; i++) {
        const bx = vx + i * w * 0.12;
        ctx.beginPath();
        ctx.moveTo(vx, vy);
        ctx.lineTo(bx, h);
        ctx.stroke();
      }
      ctx.restore();

      // ── BUILDINGS (SKYLINE) ──
      const skylineBase = h * 0.62;
      buildings.forEach((b) => {
        const by = skylineBase - b.h;

        // Building body
        ctx.fillStyle = b.color === "#0a0a18" ? "#0a0a18" : "#08080f";
        ctx.fillRect(b.x, by, b.w, b.h);

        // Neon edge glow
        if (b.neonEdge) {
          const nc = COLORS[Math.floor(Math.random() * 1000) % COLORS.length];
          ctx.save();
          ctx.globalAlpha = 0.25 + Math.sin(time * 0.002 + b.x) * 0.1;
          ctx.strokeStyle = nc;
          ctx.lineWidth = 1;
          ctx.shadowColor = nc;
          ctx.shadowBlur = 8;
          // Left or right edge
          if (Math.random() > 0.5) {
            ctx.beginPath();
            ctx.moveTo(b.x, by);
            ctx.lineTo(b.x, by + b.h);
            ctx.stroke();
          } else {
            ctx.beginPath();
            ctx.moveTo(b.x + b.w, by);
            ctx.lineTo(b.x + b.w, by + b.h);
            ctx.stroke();
          }
          ctx.restore();
        }

        // Windows
        if (b.windows && b.w > 10) {
          const wSize = 2;
          const gap = 5;
          const cols = Math.floor((b.w - 4) / gap);
          const rows = Math.floor(b.h / (gap + 2));
          for (let r = 1; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
              if (Math.random() > 0.55) {
                const wx = b.x + 3 + c * gap;
                const wy = by + 4 + r * (gap + 2);
                const lit = Math.random() > 0.4;
                if (lit) {
                  const wc = Math.random() > 0.8
                    ? COLORS[Math.floor(Math.random() * COLORS.length)]
                    : "rgba(200, 220, 255, 0.4)";
                  ctx.fillStyle = wc;
                  ctx.globalAlpha = 0.3 + Math.random() * 0.5;
                  ctx.fillRect(wx, wy, wSize, wSize);
                  // Window glow
                  ctx.globalAlpha = 0.08;
                  ctx.fillRect(wx - 1, wy - 1, wSize + 2, wSize + 2);
                  ctx.globalAlpha = 1;
                }
              }
            }
          }
        }
      });

      // ── VOLUMETRIC LIGHT COLUMNS ──
      ctx.save();
      for (let i = 0; i < 4; i++) {
        const lx = w * 0.15 + i * w * 0.22 + Math.sin(time * 0.0003 + i * 2) * 30;
        const lColor = COLORS[i % COLORS.length];
        const grad = ctx.createLinearGradient(lx, skylineBase - h * 0.3, lx, skylineBase + h * 0.1);
        grad.addColorStop(0, "transparent");
        grad.addColorStop(0.3, lColor.replace(")", ",0.04)").replace("rgb", "rgba").replace("#", ""));
        grad.addColorStop(0.7, "transparent");

        // Parse hex to rgba
        const r = parseInt(lColor.slice(1, 3), 16);
        const g = parseInt(lColor.slice(3, 5), 16);
        const b = parseInt(lColor.slice(5, 7), 16);

        const colGrad = ctx.createLinearGradient(lx, h * 0.2, lx, skylineBase);
        colGrad.addColorStop(0, "transparent");
        colGrad.addColorStop(0.4, `rgba(${r},${g},${b},0.03)`);
        colGrad.addColorStop(0.7, `rgba(${r},${g},${b},0.015)`);
        colGrad.addColorStop(1, "transparent");

        ctx.fillStyle = colGrad;
        ctx.beginPath();
        ctx.moveTo(lx - 3, h * 0.2);
        ctx.lineTo(lx + 3, h * 0.2);
        ctx.lineTo(lx + 30, skylineBase);
        ctx.lineTo(lx - 30, skylineBase);
        ctx.fill();
      }
      ctx.restore();

      // ── RAIN ──
      ctx.save();
      drops.forEach((d) => {
        d.y += d.speed;
        if (d.y > h) {
          d.y = -d.len;
          d.x = Math.random() * w;
        }
        ctx.globalAlpha = d.opacity;
        ctx.strokeStyle = "#8ac8ff";
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(d.x, d.y);
        ctx.lineTo(d.x - 0.5, d.y + d.len);
        ctx.stroke();
      });
      ctx.restore();

      // ── FLOATING PARTICLES (embers) ──
      ctx.save();
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.001;
        if (p.life <= 0 || p.y < h * 0.2) {
          p.y = h * 0.5 + Math.random() * h * 0.5;
          p.x = Math.random() * w;
          p.life = 0.5 + Math.random() * 0.5;
        }
        ctx.globalAlpha = p.life * 0.6;
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.restore();

      // ── FOG AT BOTTOM ──
      const fogGrad = ctx.createLinearGradient(0, h * 0.75, 0, h);
      fogGrad.addColorStop(0, "transparent");
      fogGrad.addColorStop(0.5, "rgba(6,4,12,0.3)");
      fogGrad.addColorStop(1, "rgba(6,4,12,0.7)");
      ctx.fillStyle = fogGrad;
      ctx.fillRect(0, h * 0.75, w, h * 0.25);

      animRef.current = requestAnimationFrame(draw);
    }

    resize();
    animRef.current = requestAnimationFrame(draw);

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
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 ${className || ""}`}
    />
  );
}
