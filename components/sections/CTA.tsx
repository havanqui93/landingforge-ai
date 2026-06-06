"use client";

import { Container, Button, Reveal } from "@/components/primitives";
import type { CTASection } from "@/lib/landing.types";

export function CTA({ data }: { data: CTASection }) {
  return (
    <section className="relative py-20 sm:py-28">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-border bg-surface/50 px-6 py-16 text-center backdrop-blur-sm sm:px-12 sm:py-20">
            <div aria-hidden className="absolute inset-0 lf-glow" />
            <div className="relative">
              <h2 className="mx-auto max-w-2xl text-balance text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                {data.title}
              </h2>
              {data.subtitle ? (
                <p className="mx-auto mt-4 max-w-xl text-pretty text-lg text-muted">
                  {data.subtitle}
                </p>
              ) : null}
              <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
                {data.actions.map((a) => (
                  <Button key={a.label} action={a} />
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
