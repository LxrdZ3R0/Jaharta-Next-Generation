"use client";
import { useRef, useState, useCallback, useEffect } from "react";

/* ═══════════════════════════════════════════════════════════
   HOOK: useHolographicCard
   - 3D tilt based on mouse
   - Holographic prismatic shimmer (like CP2077 shards)
   - Neon border trace animation
   - Glitch burst on enter
   ═══════════════════════════════════════════════════════════ */

interface HoloState {
  x: number;
  y: number;
  px: number;
  py: number;
  hovering: boolean;
  glitching: boolean;
}

export function useHolographicCard() {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<HoloState>({
    x: 0, y: 0, px: 0.5, py: 0.5, hovering: false, glitching: false,
  });
  const glitchTimer = useRef<NodeJS.Timeout | undefined>(undefined);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setState((prev) => ({
      ...prev,
      x, y,
      px: x / rect.width,
      py: y / rect.height,
    }));
  }, []);

  const onMouseEnter = useCallback(() => {
    // Trigger glitch burst on enter
    setState((prev) => ({ ...prev, hovering: true, glitching: true }));
    clearTimeout(glitchTimer.current);
    glitchTimer.current = setTimeout(() => {
      setState((prev) => ({ ...prev, glitching: false }));
    }, 300);
  }, []);

  const onMouseLeave = useCallback(() => {
    setState((prev) => ({
      ...prev, hovering: false, glitching: false,
      px: 0.5, py: 0.5,
    }));
  }, []);

  useEffect(() => {
    return () => clearTimeout(glitchTimer.current);
  }, []);

  // Tilt angles
  const tiltX = state.hovering ? (state.px - 0.5) * 16 : 0;
  const tiltY = state.hovering ? (state.py - 0.5) * -16 : 0;

  // Holographic gradient angle based on mouse
  const holoAngle = Math.atan2(state.py - 0.5, state.px - 0.5) * (180 / Math.PI) + 180;

  return {
    ref,
    state,
    tiltX,
    tiltY,
    holoAngle,
    handlers: { onMouseMove, onMouseEnter, onMouseLeave },
  };
}
