"use client";

import { motion, useReducedMotion } from "framer-motion";
import { EdContainer, EdKicker, EdButton } from "../primitives";
import { EASE_EXPO } from "@/lib/motion";
import type { MastheadBlock } from "@/lib/editorial.types";

/**
 * The editorial hero: an asymmetric split — a slim side index (desktop only)
 * beside an oversized headline — rather than the default template's centered
 * stack.
 */
export function Masthead({ data }: { data: MastheadBlock }) {
  const reduced = useReducedMotion();

  return (
    <header className="relative overflow-hidden pb-16 pt-28 sm:pb-24 sm:pt-36">
      <EdContainer>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[280px_1fr] lg:gap-16">
          {/* Side index — desktop only */}
          <div className="hidden lg:flex lg:flex-col lg:justify-between">
            <div>
              {data.issue ? (
                <div className="font-mono text-xs text-muted">{data.issue}</div>
              ) : null}
              {data.kicker ? (
                <div className="mt-2">
                  <EdKicker>{data.kicker}</EdKicker>
                </div>
              ) : null}
            </div>
            {data.toc?.length ? (
              <ol className="mt-12 space-y-3 border-t border-border pt-6">
                {data.toc.map((label, i) => (
                  <li
                    key={label}
                    className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-muted"
                  >
                    <span className="text-primary">{String(i + 1).padStart(2, "0")}</span>
                    {label}
                  </li>
                ))}
              </ol>
            ) : null}
          </div>

          {/* Headline */}
          <div>
            <div className="lg:hidden">
              {data.issue ? (
                <div className="font-mono text-xs text-muted">{data.issue}</div>
              ) : null}
              {data.kicker ? (
                <div className="mt-2">
                  <EdKicker>{data.kicker}</EdKicker>
                </div>
              ) : null}
            </div>

            <motion.h1
              initial={reduced ? undefined : { opacity: 0, y: 24 }}
              whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: EASE_EXPO }}
              className="mt-4 max-w-4xl text-balance text-5xl font-bold leading-[1.02] tracking-tight sm:text-6xl md:text-7xl"
            >
              {data.title}
            </motion.h1>

            {data.dek ? (
              <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted">
                {data.dek}
              </p>
            ) : null}

            {data.byline ? (
              <p className="mt-4 font-mono text-xs uppercase tracking-widest text-muted">
                {data.byline}
              </p>
            ) : null}

            {data.actions?.length ? (
              <div className="mt-10 flex flex-wrap gap-3">
                {data.actions.map((a) => (
                  <EdButton key={a.label} action={a} />
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </EdContainer>
    </header>
  );
}
