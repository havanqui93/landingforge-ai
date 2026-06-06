"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useInView,
  animate,
} from "framer-motion";
import {
  Container,
  SectionShell,
  SectionHeading,
  StaggerGroup,
} from "@/components/primitives";
import { staggerItem } from "@/lib/motion";
import type { StatItem, StatsSection } from "@/lib/landing.types";

/** Count up the numeric portion of a value like "12,000+" or "$4.2M". */
function CountUp({ value }: { value: string }) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [display, setDisplay] = useState(reduced ? value : "");

  // Split into prefix + number + suffix so non-numeric values render verbatim.
  const match = value.match(/^([^\d]*)([\d.,]+)(.*)$/);

  useEffect(() => {
    if (reduced || !inView || !match) {
      setDisplay(value);
      return;
    }
    const [, prefix = "", numStr = "0", suffix = ""] = match;
    const decimals = numStr.includes(".") ? numStr.split(".")[1]?.length ?? 0 : 0;
    const target = parseFloat(numStr.replace(/,/g, ""));
    const hasGrouping = numStr.includes(",");

    const controls = animate(0, target, {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
      onUpdate(v) {
        const formatted = v.toLocaleString(undefined, {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
          useGrouping: hasGrouping,
        });
        setDisplay(`${prefix}${formatted}${suffix}`);
      },
    });
    return () => controls.stop();
  }, [inView, reduced, value, match]);

  return <span ref={ref}>{display || value}</span>;
}

// Static map so Tailwind's JIT can see every column class.
const statColsClass: Record<number, string> = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-3",
  4: "grid-cols-2 lg:grid-cols-4",
};

export function Stats({ data }: { data: StatsSection }) {
  const cols = statColsClass[data.items.length] ?? "sm:grid-cols-2 lg:grid-cols-4";
  return (
    <SectionShell>
      <Container>
        {data.title ? (
          <SectionHeading title={data.title} subtitle={data.subtitle} />
        ) : null}

        <StaggerGroup
          className={`grid grid-cols-2 gap-6 ${
            data.title ? "mt-16" : ""
          } ${cols}`}
        >
          {data.items.map((item: StatItem) => (
            <motion.div
              key={item.label}
              variants={staggerItem}
              className="rounded-2xl border border-border bg-surface/40 p-6 text-center backdrop-blur-sm sm:p-8"
            >
              <div className="lf-gradient-text text-4xl font-bold tracking-tight sm:text-5xl">
                <CountUp value={item.value} />
              </div>
              <div className="mt-2 text-sm font-medium uppercase tracking-wide text-muted">
                {item.label}
              </div>
            </motion.div>
          ))}
        </StaggerGroup>
      </Container>
    </SectionShell>
  );
}
