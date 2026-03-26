"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Reveal({
  children,
  className,
  delay = 0,
  direction = "up",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
}) {
  const dirs = {
    up: { y: 40 },
    down: { y: -40 },
    left: { x: 40 },
    right: { x: -40 },
  };

  return (
    <motion.div
      initial={{ opacity: 0, ...dirs[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      viewport={{ once: true, margin: "-40px" }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

export function StaggerChildren({
  children,
  className,
  staggerDelay = 0.1,
}: {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 25 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
        },
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
