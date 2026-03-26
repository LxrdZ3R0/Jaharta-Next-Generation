"use client";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export function CardHoverEffect({
  children,
  className,
  accentColor = "rgba(0,240,255,0.5)",
}: {
  children: ReactNode;
  className?: string;
  accentColor?: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -6, transition: { duration: 0.3 } }}
      className={cn(
        "group relative overflow-hidden rounded-md border border-white/[0.06] bg-jaharta-card backdrop-blur-xl transition-all duration-400",
        className
      )}
      style={
        {
          "--accent": accentColor,
        } as React.CSSProperties
      }
    >
      {/* Top gradient line on hover */}
      <div
        className="absolute left-0 right-0 top-0 h-[2px] opacity-0 transition-opacity duration-400 group-hover:opacity-100"
        style={{
          background: `linear-gradient(90deg, ${accentColor}, rgba(180,74,255,0.6), transparent)`,
        }}
      />
      {children}
    </motion.div>
  );
}
