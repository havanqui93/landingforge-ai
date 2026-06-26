import type { Metadata } from "next";
import Link from "next/link";
import { Zap, Github } from "lucide-react";
import { Container } from "@/components/primitives";
import { IndexGrid } from "@/components/IndexGrid";
import { HomeNav } from "@/components/HomeNav";
import { HomeGenerateCard } from "@/components/HomeGenerateCard";
import { landings, type RegistryEntry } from "@/lib/registry";
import { getStoredLandings } from "@/lib/store";
import { siteJsonLd } from "@/lib/structured-data";
import { absoluteUrl } from "@/lib/site";

const homeTitle = "LandingForge — many landings, one project";
const homeDescription =
  "A config-driven platform for hosting many independent, premium landing pages.";

export const metadata: Metadata = {
  // Absolute so the root layout's "%s · LandingForge" template doesn't double
  // the brand on the homepage.
  title: { absolute: homeTitle },
  description: homeDescription,
  alternates: { canonical: absoluteUrl("/") },
};

export const dynamic = "force-dynamic";

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
    <div className="min-h-screen" style={{ background: "#080814" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(siteJsonLd(homeTitle, homeDescription)),
        }}
      />
      <HomeNav />

      <main id="main-content">
        {/* Hero */}
        <section className="relative overflow-hidden pb-20 pt-[112px]">
          {/* Radial glow */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[900px] -translate-x-1/2"
            style={{
              background:
                "radial-gradient(ellipse at 50% 0%, rgba(99,102,241,.18) 0%, transparent 65%)",
            }}
          />

          <Container>
            <div className="relative z-10 flex flex-col items-center text-center">
              {/* Eyebrow */}
              <span className="forge-eyebrow">
                AI-Powered · Daily Updates
              </span>

              {/* Headline */}
              <h1
                className="mt-6 max-w-3xl font-bold leading-[1.1] tracking-[-0.02em]"
                style={{ fontSize: "clamp(40px, 6vw, 60px)" }}
              >
                <span
                  style={{
                    background: "linear-gradient(120deg, #EDEDE5, #6366F1)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Many landings.
                </span>
                <br />
                <span className="text-fg">One project.</span>
              </h1>

              {/* Subtitle */}
              <p className="mt-6 max-w-[560px] text-[18px] leading-relaxed text-muted">
                Generate premium, config-driven landing pages in seconds. Each
                page gets its own theme, sections, and animations —
                automatically.
              </p>

              {/* CTAs */}
              <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
                <Link
                  href="/admin/generate"
                  className="flex h-11 items-center gap-2 rounded-xl bg-primary px-6 text-[15px] font-medium text-white shadow-[0_4px_12px_rgba(99,102,241,.25)] transition hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(99,102,241,.35)]"
                >
                  Generate a page
                </Link>
                <a
                  href="#gallery"
                  className="flex h-11 items-center gap-2 rounded-xl border border-border bg-surface px-6 text-[15px] font-medium text-fg transition hover:border-primary/60 hover:-translate-y-0.5"
                >
                  Browse gallery
                </a>
              </div>

              <p className="mt-4 text-[12px] text-muted">
                ✦&nbsp; New page generated daily from trending news
              </p>

              {/* Generate form card */}
              <HomeGenerateCard />
            </div>
          </Container>
        </section>

        {/* Gallery */}
        <section className="pb-24">
          <Container>
            <IndexGrid entries={entries} />
          </Container>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-[1152px] flex-col items-start justify-between gap-6 px-6 py-12 sm:flex-row sm:items-center">
          <div>
            <Link
              href="/"
              className="flex items-center gap-1.5 text-[16px] font-bold tracking-tight"
            >
              <Zap size={16} className="text-primary" fill="currentColor" />
              <span className="text-fg">Landing</span>
              <span className="text-primary">Forge</span>
            </Link>
            <p className="mt-2 max-w-[280px] text-[13px] text-muted">
              Many landings. One project.
              <br />
              Auto-generates daily from trending headlines.
            </p>
          </div>
          <div className="flex items-center gap-5">
            {["GitHub", "Docs", "Status"].map((label) => (
              <a
                key={label}
                href="#"
                className="flex items-center gap-1.5 text-[13px] text-muted transition hover:text-fg"
              >
                {label === "GitHub" && <Github size={13} />}
                {label}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
