"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Container,
  SectionShell,
  SectionHeading,
  StaggerGroup,
} from "@/components/primitives";
import { staggerItem, staggerFast } from "@/lib/motion";
import { getIcon } from "@/lib/icons";
import type { FeaturesSection } from "@/lib/landing.types";

const colsClass: Record<number, string> = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
};

export function Features({ data }: { data: FeaturesSection }) {
  const reduced = useReducedMotion();
  const cols = colsClass[data.columns ?? 3];

  return (
    <SectionShell id="features">
      <Container>
        <SectionHeading
          eyebrow={data.eyebrow}
          title={data.title}
          subtitle={data.subtitle}
        />

        <StaggerGroup
          variants={staggerFast}
          className={`mt-16 grid grid-cols-1 gap-5 ${cols}`}
        >
          {data.items.map((item) => {
            const Icon = getIcon(item.icon);
            return (
              <motion.div
                key={item.title}
                variants={staggerItem}
                whileHover={reduced ? undefined : { y: -6 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="group relative overflow-hidden rounded-2xl border border-border bg-surface/40 p-6 backdrop-blur-sm"
              >
                <div
                  aria-hidden
                  className="absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background:
                      "radial-gradient(60% 60% at 50% 0%, rgb(var(--lf-primary) / 0.12), transparent 70%)",
                  }}
                />
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/12 text-primary ring-1 ring-primary/20">
                  <Icon className="h-6 w-6" strokeWidth={1.75} />
                </div>
                <h3 className="mt-5 text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-pretty leading-relaxed text-muted">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </StaggerGroup>
      </Container>
    </SectionShell>
  );
}
