import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LandingRenderer } from "@/components/LandingRenderer";
import { getLanding, getAllSlugs } from "@/lib/registry";
import { getStoredLanding } from "@/lib/store";
import { landingJsonLd } from "@/lib/structured-data";
import { absoluteUrl, siteUrl } from "@/lib/site";
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
  const url = absoluteUrl(`/l/${config.meta.slug}`);
  return {
    metadataBase: new URL(siteUrl()),
    // Landings own their full <title> — opt out of the root layout's template.
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
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
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(landingJsonLd(config)) }}
      />
      <LandingRenderer config={config} />
    </>
  );
}
