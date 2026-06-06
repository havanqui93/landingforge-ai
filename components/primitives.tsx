"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { fadeUp, stagger, viewportOnce, noMotion } from "@/lib/motion";
import type { CTAButton } from "@/lib/landing.types";

/* -------------------------------------------------------------------------- */
/*  Layout                                                                    */
/* -------------------------------------------------------------------------- */

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-content px-6 sm:px-8 ${className}`}>
      {children}
    </div>
  );
}

export function SectionShell({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`relative py-20 sm:py-28 ${className}`}>
      {children}
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Reveal — a motion wrapper that respects reduced motion                    */
/* -------------------------------------------------------------------------- */

export function Reveal({
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

/** Container that staggers children. Use with `<motion.* variants={staggerItem}>`. */
export function StaggerGroup({
  children,
  className = "",
  variants,
}: {
  children: ReactNode;
  className?: string;
  variants?: typeof stagger;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      variants={reduced ? noMotion : variants ?? stagger}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      {children}
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Typography helpers                                                        */
/* -------------------------------------------------------------------------- */

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/50 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-primary">
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
}) {
  const alignment = align === "center" ? "text-center mx-auto" : "text-left";
  return (
    <Reveal className={`max-w-2xl ${alignment}`}>
      {eyebrow ? (
        <div className={align === "center" ? "flex justify-center" : ""}>
          <Eyebrow>{eyebrow}</Eyebrow>
        </div>
      ) : null}
      <h2 className="mt-5 text-balance text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-4 text-pretty text-lg leading-relaxed text-muted">
          {subtitle}
        </p>
      ) : null}
    </Reveal>
  );
}

/* -------------------------------------------------------------------------- */
/*  Button                                                                    */
/* -------------------------------------------------------------------------- */

const buttonStyles: Record<NonNullable<CTAButton["variant"]>, string> = {
  primary:
    "bg-primary text-primary-fg shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30",
  secondary: "bg-surface text-fg border border-border hover:border-primary/60",
  ghost: "text-fg/80 hover:text-fg hover:bg-surface/60",
};

export function Button({
  action,
  className = "",
}: {
  action: CTAButton;
  /** Pass "w-full" to stretch (block) the button. */
  className?: string;
}) {
  const reduced = useReducedMotion();
  const variant = action.variant ?? "primary";
  const external = /^https?:\/\//.test(action.href);
  const block = className.includes("w-full");
  const content = (
    <motion.span
      whileHover={reduced ? undefined : { y: -2 }}
      whileTap={reduced ? undefined : { y: 0, scale: 0.98 }}
      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className={`inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition-colors duration-200 ${buttonStyles[variant]} ${className}`}
    >
      {action.label}
    </motion.span>
  );

  const wrapperClass = block ? "block w-full" : "inline-block";

  if (external) {
    return (
      <a
        href={action.href}
        target="_blank"
        rel="noopener noreferrer"
        className={wrapperClass}
      >
        {content}
      </a>
    );
  }
  return (
    <Link href={action.href} className={wrapperClass}>
      {content}
    </Link>
  );
}
