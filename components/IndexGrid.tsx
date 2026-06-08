"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ExternalLink, Trash2 } from "lucide-react";
import { StaggerGroup } from "@/components/primitives";
import { staggerItem } from "@/lib/motion";
import type { RegistryEntry } from "@/lib/registry";

type Category = "all" | "saas" | "developer" | "community" | "product" | "news";

const CATEGORY_COLORS: Record<string, string> = {
  saas: "rgba(99,102,241,.12)",
  developer: "rgba(139,92,246,.12)",
  community: "rgba(5,150,105,.12)",
  product: "rgba(217,119,6,.12)",
  news: "rgba(220,38,38,.12)",
};
const CATEGORY_TEXT: Record<string, string> = {
  saas: "#6366F1",
  developer: "#8B5CF6",
  community: "#059669",
  product: "#D97706",
  news: "#DC2626",
};

function detectCategory(entry: RegistryEntry): string {
  const slug = entry.slug.toLowerCase();
  if (/^\d{4}-\d{2}-\d{2}/.test(slug)) return "news";
  const title = entry.config.meta.title.toLowerCase();
  if (/developer|code|api|sdk|cli|rust|wasm/.test(title)) return "developer";
  if (/community|open.source|collab/.test(title)) return "community";
  if (/saas|platform|cloud/.test(title)) return "saas";
  return "product";
}

const FILTER_LABELS: { key: Category; label: string }[] = [
  { key: "all", label: "All" },
  { key: "saas", label: "SaaS" },
  { key: "developer", label: "Developer" },
  { key: "community", label: "Community" },
  { key: "product", label: "Product" },
  { key: "news", label: "News" },
];

export function IndexGrid({ entries }: { entries: RegistryEntry[] }) {
  const reduced = useReducedMotion();
  const [activeFilter, setActiveFilter] = useState<Category>("all");

  const filtered = entries.filter(
    (e) => activeFilter === "all" || detectCategory(e) === activeFilter,
  );

  return (
    <div>
      {/* Filter bar */}
      <div
        id="gallery"
        className="mb-8 flex flex-wrap items-center justify-between gap-4"
      >
        <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted">
          All landings · {entries.length}
        </span>
        <div className="flex flex-wrap gap-1.5">
          {FILTER_LABELS.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setActiveFilter(key)}
              className={`rounded-full border px-3.5 py-1.5 text-[12px] font-medium transition-all duration-150 ${
                activeFilter === key
                  ? "border-primary bg-primary text-white shadow-[0_0_14px_rgba(99,102,241,.3)]"
                  : "border-border text-muted hover:border-primary/40 hover:text-fg"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <StaggerGroup className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((entry) => {
          const { slug, config } = entry;
          const primary = `rgb(${config.theme.primary})`;
          const bg = `rgb(${config.theme.bg})`;
          const category = detectCategory(entry);
          const sections = config.sections.map((s) => s.type);

          return (
            <motion.div
              key={slug}
              variants={staggerItem}
              whileHover={reduced ? undefined : { y: -4 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="group"
            >
              <div
                className="flex h-full flex-col overflow-hidden rounded-2xl border border-border"
                style={{
                  background: "rgba(22,22,38,.6)",
                  backdropFilter: "blur(12px)",
                  transition: "border-color .2s, box-shadow .2s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(99,102,241,.5)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 0 40px rgba(99,102,241,.18)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "";
                  (e.currentTarget as HTMLElement).style.boxShadow = "";
                }}
              >
                {/* Swatch */}
                <div
                  className="relative h-[180px] w-full overflow-hidden"
                  style={{
                    background: `radial-gradient(120% 120% at 0% 0%, ${primary}, ${bg} 70%)`,
                  }}
                >
                  {/* Category badge */}
                  <span
                    className="absolute left-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[.05em]"
                    style={{
                      background: CATEGORY_COLORS[category] ?? "rgba(148,148,170,.12)",
                      color: CATEGORY_TEXT[category] ?? "#9494AA",
                      backdropFilter: "blur(8px)",
                    }}
                  >
                    {category}
                  </span>

                  {/* Open button (hover) */}
                  <Link
                    href={`/l/${slug}`}
                    className="absolute right-3 top-3 flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-[12px] font-medium text-white opacity-0 transition-opacity group-hover:opacity-100"
                    style={{ background: "rgba(0,0,0,.5)" }}
                  >
                    Open <ExternalLink size={11} />
                  </Link>
                </div>

                {/* Body */}
                <div className="flex flex-1 flex-col p-4">
                  <span className="font-mono text-[11px] text-primary">
                    /l/{slug}
                  </span>
                  <h3 className="mt-1.5 line-clamp-2 text-[16px] font-semibold leading-snug text-fg">
                    {config.meta.title}
                  </h3>
                  <p className="mt-1.5 line-clamp-2 flex-1 text-[13px] leading-relaxed text-muted">
                    {config.meta.description}
                  </p>

                  {/* Footer */}
                  <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
                    <div className="flex flex-wrap gap-1">
                      {sections.slice(0, 3).map((s) => (
                        <span
                          key={s}
                          className="rounded-full bg-surface px-2 py-0.5 text-[10px] text-muted"
                          style={{ border: "1px solid rgba(148,148,170,.12)" }}
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                    <button
                      className="hidden rounded-lg p-1.5 text-muted transition hover:text-danger group-[.admin]:flex"
                      title="Delete"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </StaggerGroup>

      {filtered.length === 0 && (
        <div className="flex flex-col items-center gap-2 py-16 text-center">
          <p className="text-[15px] font-semibold text-fg">No landings found</p>
          <p className="text-[13px] text-muted">Try a different filter.</p>
        </div>
      )}
    </div>
  );
}
