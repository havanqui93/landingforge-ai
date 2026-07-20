import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EditorialRenderer } from "@/components/editorial/EditorialRenderer";
import { getEditorialLanding, getAllEditorialSlugs } from "@/lib/editorial-registry";

interface Params {
  params: { slug: string };
}

export function generateStaticParams() {
  return getAllEditorialSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const config = getEditorialLanding(params.slug);
  if (!config) return {};
  const { title, description } = config.meta;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      siteName: "LandingForge — Editorial",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default function EditorialLandingPage({ params }: Params) {
  const config = getEditorialLanding(params.slug);
  if (!config) notFound();
  return <EditorialRenderer config={config} />;
}
