"use client";

import Link from "next/link";
import { EdContainer, EdReveal, EdButton } from "../primitives";
import type { ColophonBlock } from "@/lib/editorial.types";

/**
 * CTA + footer combined into one inverted sign-off block (a magazine
 * colophon page), rather than the default template's separate CTA and
 * footer sections.
 */
export function Colophon({ data }: { data: ColophonBlock }) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-fg text-bg">
      <EdContainer className="py-20 sm:py-28">
        <EdReveal className="max-w-3xl">
          <h2 className="text-balance text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
            {data.statement}
          </h2>
          {data.actions?.length ? (
            <div className="mt-10 flex flex-wrap gap-3">
              {data.actions.map((a) => (
                <EdButton key={a.label} action={a} />
              ))}
            </div>
          ) : null}
        </EdReveal>

        <div className="mt-20 grid grid-cols-2 gap-10 border-t border-bg/15 pt-10 sm:grid-cols-[1.5fr_repeat(auto-fit,minmax(0,1fr))]">
          <div className="col-span-2 sm:col-span-1">
            <div className="font-mono text-sm font-bold uppercase tracking-widest">
              {data.brand}
            </div>
          </div>

          {data.columns?.map((col) => (
            <div key={col.heading}>
              <div className="font-mono text-xs uppercase tracking-widest opacity-60">
                {col.heading}
              </div>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm opacity-80 transition hover:opacity-100"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 font-mono text-xs opacity-50">
          {data.legal ?? `© ${year} ${data.brand}. All rights reserved.`}
        </div>
      </EdContainer>
    </footer>
  );
}
