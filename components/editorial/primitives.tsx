"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { fadeUp, stagger, viewportOnce, noMotion } from "@/lib/motion";
import type { CTAButton } from "@/lib/landing.types";

/**
 * Editorial's own primitive layer. Deliberately not the SaaS template's
 * primitives.tsx (rounded cards, shadowed buttons) — flat, ruled, and
 * asymmetric instead, so the two templates read as genuinely different
 * systems rather than a reskinned copy of one another.
 */

export function EdContainer({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-[1400px] px-6 sm:px-10 ${className}`}>
      {children}
    </div>
  );
}

export function EdReveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      variants={reduced ? noMotion : fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      transition={delay ? { delay } : undefined}
    >
      {children}
    </motion.div>
  );
}

export function EdStagger({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      variants={reduced ? noMotion : stagger}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      {children}
    </motion.div>
  );
}

export function EdKicker({ children }: { children: ReactNode }) {
  return (
    <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary">
      {children}
    </span>
  );
}

/** Flat, rectangular, uppercase — the editorial counterpart to <Button>. */
export function EdButton({ action }: { action: CTAButton }) {
  const reduced = useReducedMotion();
  const variant = action.variant ?? "primary";
  const external = /^https?:\/\//.test(action.href);

  const styles: Record<NonNullable<CTAButton["variant"]>, string> = {
    primary: "border-primary bg-primary text-primary-fg hover:opacity-90",
    secondary: "border-border text-fg hover:border-primary/60",
    ghost: "border-transparent text-fg/80 hover:text-fg hover:border-border",
  };

  const content = (
    <motion.span
      whileHover={reduced ? undefined : { y: -2 }}
      whileTap={reduced ? undefined : { y: 0 }}
      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className={`inline-flex items-center justify-center gap-2 border px-6 py-3 text-[13px] font-semibold uppercase tracking-widest transition-colors duration-200 ${styles[variant]}`}
    >
      {action.label}
    </motion.span>
  );

  if (external) {
    return (
      <a href={action.href} target="_blank" rel="noopener noreferrer" className="inline-block">
        {content}
      </a>
    );
  }
  return (
    <Link href={action.href} className="inline-block">
      {content}
    </Link>
  );
}
