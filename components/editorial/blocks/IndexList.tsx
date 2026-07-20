"use client";

import { motion } from "framer-motion";
import { EdContainer, EdKicker, EdStagger } from "../primitives";
import { staggerItem } from "@/lib/motion";
import type { IndexBlock } from "@/lib/editorial.types";

/**
 * The editorial counterpart to the default template's icon-card grid: a
 * numbered, ruled list read top-to-bottom like a table of contents.
 */
export function IndexList({ data }: { data: IndexBlock }) {
  return (
    <section id="index" className="border-t border-border py-16 sm:py-24">
      <EdContainer>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[280px_1fr] lg:gap-16">
          <div>
            {data.kicker ? <EdKicker>{data.kicker}</EdKicker> : null}
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              {data.title}
            </h2>
            {data.dek ? (
              <p className="mt-4 text-pretty leading-relaxed text-muted">{data.dek}</p>
            ) : null}
          </div>

          <EdStagger className="divide-y divide-border border-t border-border lg:border-t-0">
            {data.entries.map((entry, i) => (
              <motion.div
                key={entry.title}
                variants={staggerItem}
                className="grid grid-cols-[3rem_1fr] gap-6 py-6 first:pt-0 sm:grid-cols-[4rem_1fr]"
              >
                <span className="font-mono text-sm text-primary">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-lg font-semibold">{entry.title}</h3>
                  <p className="mt-2 text-pretty leading-relaxed text-muted">
                    {entry.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </EdStagger>
        </div>
      </EdContainer>
    </section>
  );
}
