"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { Container, Button, StaggerGroup } from "@/components/primitives";
import { staggerItem, stagger, EASE_EXPO } from "@/lib/motion";
import type { HeroSection } from "@/lib/landing.types";

export function Hero({ data }: { data: HeroSection }) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  // Parallax: glow drifts down, content rises subtly. Disabled when reduced.
  const glowY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden pt-32 pb-24 sm:pt-40 sm:pb-32"
    >
      {/* Parallax glow + grid backdrop */}
      <motion.div
        aria-hidden
        style={reduced ? undefined : { y: glowY }}
        className="pointer-events-none absolute inset-0 lf-glow"
      />
      <div
        aria-hidden
        className="lf-grid-mask pointer-events-none absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage:
            "linear-gradient(rgb(var(--lf-border)) 1px, transparent 1px), linear-gradient(90deg, rgb(var(--lf-border)) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <Container>
        <motion.div
          style={reduced ? undefined : { y: contentY, opacity: contentOpacity }}
          className="mx-auto max-w-3xl text-center"
        >
          <StaggerGroup variants={stagger}>
            {data.eyebrow ? (
              <motion.div variants={staggerItem} className="flex justify-center">
                <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/50 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
                  {data.eyebrow}
                </span>
              </motion.div>
            ) : null}

            <motion.h1
              variants={staggerItem}
              className="mt-6 text-balance text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl"
            >
              {data.title}
            </motion.h1>

            {data.subtitle ? (
              <motion.p
                variants={staggerItem}
                className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted sm:text-xl"
              >
                {data.subtitle}
              </motion.p>
            ) : null}

            {data.actions?.length ? (
              <motion.div
                variants={staggerItem}
                className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
              >
                {data.actions.map((a) => (
                  <Button key={a.label} action={a} />
                ))}
              </motion.div>
            ) : null}

            {data.note ? (
              <motion.p
                variants={staggerItem}
                className="mt-6 text-sm text-muted"
              >
                {data.note}
              </motion.p>
            ) : null}
          </StaggerGroup>
        </motion.div>
      </Container>

      {/* Scroll hint */}
      {!reduced ? (
        <motion.div
          aria-hidden
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1, ease: EASE_EXPO }}
          className="mt-16 flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="h-10 w-6 rounded-full border border-border p-1"
          >
            <div className="h-2 w-full rounded-full bg-primary/70" />
          </motion.div>
        </motion.div>
      ) : null}
    </section>
  );
}
