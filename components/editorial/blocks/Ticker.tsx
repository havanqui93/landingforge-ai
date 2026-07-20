"use client";

import { motion } from "framer-motion";
import { EdContainer, EdStagger } from "../primitives";
import { staggerItem } from "@/lib/motion";
import type { TickerBlock } from "@/lib/editorial.types";

/**
 * Stats as a bordered ledger strip with tabular numerals, instead of the
 * default template's individually-cased stat boxes.
 */
export function Ticker({ data }: { data: TickerBlock }) {
  return (
    <section className="border-t border-border py-16 sm:py-20">
      <EdContainer>
        <EdStagger className="grid grid-cols-2 border border-border sm:grid-cols-4">
          {data.entries.map((item, i) => (
            <motion.div
              key={item.label}
              variants={staggerItem}
              className={`flex flex-col items-start gap-1 p-6 sm:p-8 ${
                i % 2 === 1 ? "border-l border-border" : ""
              } ${i >= 2 ? "border-t border-border sm:border-t-0" : ""} ${
                i >= 1 ? "sm:border-l" : ""
              }`}
            >
              <span className="font-mono text-3xl font-bold tabular-nums tracking-tight sm:text-4xl">
                {item.value}
              </span>
              <span className="font-mono text-[11px] uppercase tracking-widest text-muted">
                {item.label}
              </span>
            </motion.div>
          ))}
        </EdStagger>
      </EdContainer>
    </section>
  );
}
