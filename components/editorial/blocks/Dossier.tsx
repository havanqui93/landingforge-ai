"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Plus } from "lucide-react";
import { EdContainer, EdKicker, EdReveal } from "../primitives";
import type { DossierBlock } from "@/lib/editorial.types";

/**
 * FAQ as a numbered accordion ("Q01", "Q02", …) instead of the default
 * template's plain expand list.
 */
export function Dossier({ data }: { data: DossierBlock }) {
  const [open, setOpen] = useState<number | null>(0);
  const reduced = useReducedMotion();

  return (
    <section className="border-t border-border py-16 sm:py-24">
      <EdContainer>
        <EdReveal className="max-w-2xl">
          {data.kicker ? <EdKicker>{data.kicker}</EdKicker> : null}
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            {data.title}
          </h2>
        </EdReveal>

        <div className="mt-12 divide-y divide-border border-y border-border">
          {data.entries.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.question}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left"
                >
                  <span className="flex items-center gap-4">
                    <span className="font-mono text-xs text-primary">
                      Q{String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-lg font-medium">{item.question}</span>
                  </span>
                  <Plus
                    className={`h-4 w-4 flex-shrink-0 text-muted transition-transform duration-200 ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      initial={reduced ? undefined : { height: 0, opacity: 0 }}
                      animate={reduced ? undefined : { height: "auto", opacity: 1 }}
                      exit={reduced ? undefined : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 pl-12 pr-8 text-pretty leading-relaxed text-muted">
                        {item.answer}
                      </p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </EdContainer>
    </section>
  );
}
