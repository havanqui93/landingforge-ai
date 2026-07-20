"use client";

import { EdContainer, EdKicker, EdReveal } from "../primitives";
import type { DispatchesBlock } from "@/lib/editorial.types";

/**
 * Testimonials as alternating, large-type pull quotes stacked vertically —
 * the editorial equivalent of the default template's testimonial card grid.
 */
export function Dispatches({ data }: { data: DispatchesBlock }) {
  return (
    <section className="border-t border-border py-16 sm:py-24">
      <EdContainer>
        {data.kicker || data.title ? (
          <EdReveal className="mb-16 max-w-2xl">
            {data.kicker ? <EdKicker>{data.kicker}</EdKicker> : null}
            {data.title ? (
              <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                {data.title}
              </h2>
            ) : null}
          </EdReveal>
        ) : null}

        <div className="space-y-16">
          {data.entries.map((item, i) => (
            <EdReveal
              key={item.author}
              className={`max-w-2xl ${i % 2 === 1 ? "ml-auto text-right" : ""}`}
            >
              <p className="text-pretty text-2xl font-medium leading-snug tracking-tight sm:text-3xl">
                &ldquo;{item.quote}&rdquo;
              </p>
              <p className="mt-4 font-mono text-xs uppercase tracking-widest text-muted">
                {item.author}
                {item.role ? ` — ${item.role}` : ""}
              </p>
            </EdReveal>
          ))}
        </div>
      </EdContainer>
    </section>
  );
}
