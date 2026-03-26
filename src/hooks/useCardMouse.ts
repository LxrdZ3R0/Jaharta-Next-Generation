"use client";
import { useRef, useCallback, useState } from "react";

interface MouseState {
  x: number;
  y: number;
  percentX: number;
  percentY: number;
  isHovering: boolean;
}

export function useCardMouse() {
  const ref = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState<MouseState>({
    x: 0,
    y: 0,
    percentX: 0.5,
    percentY: 0.5,
    isHovering: false,
  });

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMouse({
      x,
      y,
      percentX: x / rect.width,
      percentY: y / rect.height,
      isHovering: true,
    });
  }, []);

  const onMouseEnter = useCallback(() => {
    setMouse((prev) => ({ ...prev, isHovering: true }));
  }, []);

  const onMouseLeave = useCallback(() => {
    setMouse((prev) => ({
      ...prev,
      isHovering: false,
      percentX: 0.5,
      percentY: 0.5,
    }));
  }, []);

  return { ref, mouse, onMouseMove, onMouseEnter, onMouseLeave };
}
