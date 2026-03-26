"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Accueil" },
  { href: "/fiches", label: "Fiches RP" },
  { href: "/pnj", label: "PNJ" },
  { href: "/portail", label: "Portail" },
  { href: "/races", label: "Races" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <nav
      className={cn(
        "fixed left-0 right-0 top-0 z-[1000] flex items-center justify-between px-6 py-5 transition-all duration-400 md:px-10",
        scrolled &&
          "border-b border-cyan/[0.08] bg-jaharta-deep/90 py-3 backdrop-blur-2xl"
      )}
    >
      <Link
        href="/"
        className="font-display text-lg font-bold tracking-[0.3em] text-cyan drop-shadow-[0_0_8px_rgba(0,240,255,0.38)] transition-all hover:drop-shadow-[0_0_20px_rgba(0,240,255,0.38)]"
      >
        JAHARTA
      </Link>

      {/* Desktop links */}
      <div className="hidden items-center gap-1 md:flex">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "rounded-sm border border-transparent px-3 py-1.5 font-heading text-[0.7rem] font-semibold uppercase tracking-[0.15em] text-white/50 transition-all hover:border-cyan/20 hover:bg-cyan/[0.03] hover:text-cyan",
              pathname === link.href &&
                "border-cyan/25 bg-cyan/[0.06] text-cyan"
            )}
          >
            {link.label}
          </Link>
        ))}
        <Link
          href="/admin"
          className="ml-1 rounded-sm border border-cyan/20 px-3 py-1.5 font-heading text-[0.7rem] font-semibold uppercase tracking-[0.15em] text-cyan transition-all hover:border-cyan/40 hover:bg-cyan/[0.04]"
        >
          Admin
        </Link>
      </div>

      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="flex h-10 w-10 items-center justify-center rounded-sm border border-cyan/30 text-cyan transition-colors hover:border-cyan md:hidden"
        aria-label="Menu"
      >
        {mobileOpen ? "✕" : "☰"}
      </button>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[199] bg-black/50"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.35 }}
              className="fixed bottom-0 right-0 top-0 z-[200] w-[260px] border-l border-cyan/[0.12] bg-jaharta-deep/[0.98] pt-20 backdrop-blur-2xl"
            >
              {[...links, { href: "/admin", label: "Admin" }].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "block px-7 py-3.5 font-heading text-[0.75rem] font-semibold uppercase tracking-[0.15em] text-white/50 transition-colors hover:bg-cyan/[0.04] hover:text-cyan",
                    pathname === link.href && "text-cyan"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
