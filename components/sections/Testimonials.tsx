"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Quote } from "lucide-react";
import {
  Container,
  SectionShell,
  SectionHeading,
  StaggerGroup,
} from "@/components/primitives";
import { staggerItem } from "@/lib/motion";
import type { TestimonialsSection } from "@/lib/landing.types";

export function Testimonials({ data }: { data: TestimonialsSection }) {
  const reduced = useReducedMotion();

  return (
    <SectionShell>
      <Container>
        <SectionHeading
          eyebrow={data.eyebrow}
          title={data.title}
          subtitle={data.subtitle}
        />

        <StaggerGroup className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {data.items.map((t) => (
            <motion.figure
              key={t.author}
              variants={staggerItem}
              whileHover={reduced ? undefined : { y: -4 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col rounded-2xl border border-border bg-surface/40 p-6 backdrop-blur-sm"
            >
              <Quote
                className="h-7 w-7 text-primary/40"
                strokeWidth={1.75}
                aria-hidden
              />
              <blockquote className="mt-4 flex-1 text-pretty leading-relaxed text-fg/90">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/15 text-sm font-semibold text-primary ring-1 ring-primary/20">
                  {t.author
                    .split(" ")
                    .map((n) => n[0])
                    .slice(0, 2)
                    .join("")}
                </div>
                <div>
                  <div className="text-sm font-semibold">{t.author}</div>
                  {t.role ? (
                    <div className="text-xs text-muted">{t.role}</div>
                  ) : null}
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </StaggerGroup>
      </Container>
    </SectionShell>
  );
}
