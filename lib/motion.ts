/**
 * Shared Framer Motion variants for LandingForge.
 *
 * Principles:
 *  - Only `transform` (x/y/scale) and `opacity` are animated → 60fps, no layout thrash.
 *  - Default easing is expo-out: cubic-bezier(0.22, 1, 0.36, 1).
 *  - Scroll reveals pair with `whileInView` + `viewport={{ once: true, margin: "-100px" }}`.
 *  - `prefers-reduced-motion` is honored at the component layer (see useReducedMotion
 *    in section components, which swap these for static/instant variants).
 */

import type { Variants, Transition } from "framer-motion";

export const EASE_EXPO = [0.22, 1, 0.36, 1] as const;

export const baseTransition: Transition = {
  duration: 0.7,
  ease: EASE_EXPO,
};

/** Shared viewport config so every section reveals consistently. */
export const viewportOnce = { once: true, margin: "-100px" } as const;

/** Fade + rise. The workhorse entrance for headings, copy, single elements. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: baseTransition,
  },
};

/** Fade + subtle scale — good for cards and media. */
export const reveal: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: baseTransition,
  },
};

/** Container that staggers its children's entrances. */
export const stagger: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

/** Faster stagger for dense grids. */
export const staggerFast: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
    },
  },
};

/** Child item designed to be used inside `stagger`. */
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: baseTransition,
  },
};

/**
 * Parallax helper — map scroll progress to a translateY range.
 * Use with `useScroll` + `useTransform` in the Hero.
 */
export const parallax = {
  /** Background drifts down slower than scroll. */
  slow: ["0%", "30%"] as const,
  /** Foreground rises slightly. */
  fast: ["0%", "-12%"] as const,
};

/** Reduced-motion fallback: appear instantly, no transform. */
export const noMotion: Variants = {
  hidden: { opacity: 1 },
  visible: { opacity: 1 },
};
