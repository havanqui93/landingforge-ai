"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Container, SectionShell, Reveal, StaggerGroup } from "@/components/primitives";
import { staggerItem, staggerFast } from "@/lib/motion";
import { getIcon } from "@/lib/icons";
import type { LogosSection } from "@/lib/landing.types";

/**
 * Social-proof strip — a muted row of brand/customer names (with optional
 * icons). Deliberately understated so it reads as proof, not a feature grid.
 */
export function Logos({ data }: { data: LogosSection }) {
  const reduced = useReducedMotion();

  return (
    <SectionShell id="logos" className="py-14 sm:py-16">
      <Container>
        {data.title ? (
          <Reveal className="text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted">
              {data.title}
            </p>
          </Reveal>
        ) : null}

        <StaggerGroup
          variants={staggerFast}
          className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-6"
        >
          {data.items.map((item) => {
            const Icon = item.icon ? getIcon(item.icon) : null;
            return (
              <motion.div
                key={item.name}
                variants={staggerItem}
                whileHover={reduced ? undefined : { y: -2 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-center gap-2 text-muted/80 transition-colors duration-200 hover:text-fg"
              >
                {Icon ? <Icon className="h-5 w-5" strokeWidth={1.75} /> : null}
                <span className="text-base font-semibold tracking-tight">
                  {item.name}
                </span>
              </motion.div>
            );
          })}
        </StaggerGroup>
      </Container>
    </SectionShell>
  );
}
