"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function PageTransition() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center gap-4 bg-jaharta-deep"
        >
          <div className="animate-pt-pulse font-display text-2xl font-black tracking-[0.3em] bg-gradient-to-br from-cyan via-emerald-300 to-violet bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(0,240,255,0.4)]">
            JAHARTA
          </div>
          <div className="relative h-[2px] w-[100px] overflow-hidden rounded-[1px] bg-cyan/[0.15]">
            <div className="absolute top-0 h-full w-[40%] animate-pt-slide bg-gradient-to-r from-transparent via-cyan to-violet" />
          </div>
          <div className="font-heading text-[0.6rem] font-medium uppercase tracking-[0.4em] text-white/20">
            Chargement du système
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
