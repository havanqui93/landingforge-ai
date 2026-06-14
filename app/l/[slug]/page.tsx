import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LandingRenderer } from "@/components/LandingRenderer";
import { getLanding, getAllSlugs } from "@/lib/registry";
import { getStoredLanding } from "@/lib/store";
import type { LandingConfig } from "@/lib/landing.types";

interface Params {
  params: { slug: string };
}

/**
 * Resolve a landing from the static, file-based registry first, then fall back
 * to the KV store (where the daily Vercel Cron job writes generated landings).
 */
async function resolveLanding(slug: string): Promise<LandingConfig | undefined> {
  return getLanding(slug) ?? (await getStoredLanding(slug));
}

/** Pre-render every file-based landing at build time. Store-backed slugs are
 *  rendered on demand (dynamicParams defaults to true). */
export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const config = await resolveLanding(params.slug);
  if (!config) return {};
  const { title, description } = config.meta;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      siteName: "LandingForge",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function LandingPage({ params }: Params) {
  const config = await resolveLanding(params.slug);
  if (!config) notFound();
  return <LandingRenderer config={config} />;
}
