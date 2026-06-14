"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import {
  Container,
  SectionShell,
  SectionHeading,
  StaggerGroup,
  Button,
} from "@/components/primitives";
import { staggerItem } from "@/lib/motion";
import type { PricingSection } from "@/lib/landing.types";

const tierColsClass: Record<number, string> = {
  2: "sm:grid-cols-2",
  3: "lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
};

export function Pricing({ data }: { data: PricingSection }) {
  const reduced = useReducedMotion();
  const cols = tierColsClass[data.tiers.length] ?? "lg:grid-cols-3";

  return (
    <SectionShell id="pricing">
      <Container>
        <SectionHeading
          eyebrow={data.eyebrow}
          title={data.title}
          subtitle={data.subtitle}
        />

        <StaggerGroup
          className={`mt-16 grid grid-cols-1 gap-6 ${cols} items-stretch`}
        >
          {data.tiers.map((tier) => (
            <motion.div
              key={tier.name}
              variants={staggerItem}
              whileHover={reduced ? undefined : { y: -6 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className={`relative flex flex-col rounded-2xl border p-7 backdrop-blur-sm ${
                tier.featured
                  ? "border-primary/50 bg-surface/70 shadow-2xl shadow-primary/10"
                  : "border-border bg-surface/40"
              }`}
            >
              {tier.featured ? (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-fg shadow-lg shadow-primary/30">
                  Most popular
                </span>
              ) : null}

              <h3 className="text-lg font-semibold">{tier.name}</h3>
              {tier.description ? (
                <p className="mt-1 text-sm text-muted">{tier.description}</p>
              ) : null}

              <div className="mt-5 flex items-baseline gap-1">
                <span className="text-4xl font-bold tracking-tight">
                  {tier.price}
                </span>
                {tier.period ? (
                  <span className="text-sm text-muted">{tier.period}</span>
                ) : null}
              </div>

              <ul className="mt-6 flex-1 space-y-3 text-sm">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                      <Check className="h-3.5 w-3.5" strokeWidth={3} />
                    </span>
                    <span className="text-fg/90">{f}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <Button
                  action={{
                    ...tier.cta,
                    variant: tier.featured
                      ? "primary"
                      : tier.cta.variant ?? "secondary",
                  }}
                  className="w-full"
                />
              </div>
            </motion.div>
          ))}
        </StaggerGroup>
      </Container>
    </SectionShell>
  );
}
