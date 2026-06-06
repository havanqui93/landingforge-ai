import type { Metadata } from "next";
import { Container, Reveal } from "@/components/primitives";
import { IndexGrid } from "@/components/IndexGrid";
import { landings, type RegistryEntry } from "@/lib/registry";
import { getStoredLandings } from "@/lib/store";

export const metadata: Metadata = {
  title: "LandingForge — many landings, one project",
  description:
    "A config-driven platform for hosting many independent, premium landing pages.",
};

// Always read the latest set of generated landings from the store at request time.
export const dynamic = "force-dynamic";

/** Merge file-based landings with store-backed ones (newest first), deduped. */
async function getAllEntries(): Promise<RegistryEntry[]> {
  const stored = await getStoredLandings();
  const seen = new Set(landings.map((l) => l.slug));
  const storedEntries: RegistryEntry[] = stored
    .filter((config) => !seen.has(config.meta.slug))
    .map((config) => ({ slug: config.meta.slug, config }));
  return [...storedEntries, ...landings];
}

export default async function HomePage() {
  const entries = await getAllEntries();
  return (
    <main className="relative min-h-screen overflow-hidden pb-24">
      <div aria-hidden className="pointer-events-none absolute inset-0 lf-glow" />

      <header className="relative pt-28 pb-16 sm:pt-36 sm:pb-20">
        <Container>
          <Reveal className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/50 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
              LandingForge
            </span>
            <h1 className="mt-6 text-balance text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
              <span className="lf-gradient-text">Many landings.</span>
              <br />
              One project.
            </h1>
            <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted">
              Every page below is generated from a single typed config object —
              its own theme, its own sections, its own animations. Add a new one
              without ever touching the others.
            </p>
          </Reveal>
        </Container>
      </header>

      <section className="relative">
        <Container>
          <Reveal className="mb-8 flex items-baseline justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-muted">
              All landings · {entries.length}
            </h2>
          </Reveal>
          <IndexGrid entries={entries} />
        </Container>
      </section>
    </main>
  );
}
