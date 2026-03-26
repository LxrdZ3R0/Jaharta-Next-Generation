"use client";
import { useState, useRef, useCallback } from "react";

const CHARS = "!<>-_\\/[]{}—=+*^?#________ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export function useTextScramble(original: string) {
  const [display, setDisplay] = useState(original);
  const frameRef = useRef<number | undefined>(undefined);
  const iterRef = useRef(0);

  const scramble = useCallback(() => {
    iterRef.current = 0;
    cancelAnimationFrame(frameRef.current!);

    const maxIterations = original.length;

    const step = () => {
      const current = original
        .split("")
        .map((char, i) => {
          if (char === " ") return " ";
          if (i < iterRef.current) return original[i];
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
        .join("");

      setDisplay(current);
      iterRef.current += 1 / 3; // Speed: lower = slower scramble

      if (iterRef.current < maxIterations) {
        frameRef.current = requestAnimationFrame(step);
      } else {
        setDisplay(original);
      }
    };

    frameRef.current = requestAnimationFrame(step);
  }, [original]);

  const reset = useCallback(() => {
    cancelAnimationFrame(frameRef.current!);
    setDisplay(original);
  }, [original]);

  return { display, scramble, reset };
}
