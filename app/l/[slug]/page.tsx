import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LandingRenderer } from "@/components/LandingRenderer";
import { getLanding, getAllSlugs } from "@/lib/registry";

interface Params {
  params: { slug: string };
}

/** Pre-render every registered landing at build time. */
export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  const config = getLanding(params.slug);
  if (!config) return {};
  return {
    title: config.meta.title,
    description: config.meta.description,
  };
}

export default function LandingPage({ params }: Params) {
  const config = getLanding(params.slug);
  if (!config) notFound();
  return <LandingRenderer config={config} />;
}
