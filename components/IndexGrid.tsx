"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Container, StaggerGroup } from "@/components/primitives";
import { staggerItem } from "@/lib/motion";
import type { RegistryEntry } from "@/lib/registry";

export function IndexGrid({ entries }: { entries: RegistryEntry[] }) {
  const reduced = useReducedMotion();

  return (
    <StaggerGroup className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {entries.map(({ slug, config }) => {
        const swatch = `rgb(${config.theme.primary})`;
        return (
          <motion.div
            key={slug}
            variants={staggerItem}
            whileHover={reduced ? undefined : { y: -6 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link
              href={`/l/${slug}`}
              className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface/40 p-6 backdrop-blur-sm"
            >
              {/* Theme preview bar */}
              <div
                className="mb-5 h-28 w-full rounded-xl ring-1 ring-inset ring-white/5"
                style={{
                  background: `radial-gradient(120% 120% at 0% 0%, ${swatch}, rgb(${config.theme.bg}) 70%)`,
                }}
                aria-hidden
              />
              <div className="flex items-center gap-2">
                <span
                  className="h-3 w-3 rounded-full"
                  style={{ background: swatch }}
                  aria-hidden
                />
                <span className="text-xs font-semibold uppercase tracking-widest text-muted">
                  /l/{slug}
                </span>
              </div>
              <h3 className="mt-3 text-lg font-semibold leading-snug">
                {config.meta.title}
              </h3>
              <p className="mt-2 flex-1 text-pretty text-sm leading-relaxed text-muted">
                {config.meta.description}
              </p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                View landing
                <ArrowUpRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  strokeWidth={2.25}
                />
              </span>
            </Link>
          </motion.div>
        );
      })}
    </StaggerGroup>
  );
}
