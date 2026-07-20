"use client";

import { EdContainer, EdKicker, EdReveal, EdButton } from "../primitives";
import type { LedgerBlock } from "@/lib/editorial.types";

/**
 * Pricing as literal ledger rows (name / price / features / action) instead
 * of the default template's elevated pricing cards.
 */
export function Ledger({ data }: { data: LedgerBlock }) {
  return (
    <section className="border-t border-border py-16 sm:py-24">
      <EdContainer>
        <EdReveal className="max-w-2xl">
          {data.kicker ? <EdKicker>{data.kicker}</EdKicker> : null}
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            {data.title}
          </h2>
          {data.dek ? (
            <p className="mt-4 text-pretty leading-relaxed text-muted">{data.dek}</p>
          ) : null}
        </EdReveal>

        <div className="mt-12 divide-y divide-border border-y border-border">
          {data.rows.map((row) => (
            <EdReveal
              key={row.name}
              className={`grid grid-cols-1 gap-6 py-8 sm:grid-cols-[1fr_auto_1fr_auto] sm:items-center sm:gap-10 ${
                row.featured ? "bg-surface/40" : ""
              }`}
            >
              <div>
                <div className="text-lg font-semibold">{row.name}</div>
                {row.description ? (
                  <p className="mt-1 text-sm text-muted">{row.description}</p>
                ) : null}
              </div>
              <div className="font-mono text-2xl font-bold tabular-nums sm:text-right">
                {row.price}
                {row.period ? (
                  <span className="text-sm font-normal text-muted">{row.period}</span>
                ) : null}
              </div>
              <ul className="space-y-1 text-sm text-muted">
                {row.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
              <EdButton action={row.cta} />
            </EdReveal>
          ))}
        </div>
      </EdContainer>
    </section>
  );
}
