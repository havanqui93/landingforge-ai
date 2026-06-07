import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import type { GeneratedLandingPage } from "@/types/landing-page";
import { LandingPageTemplate } from "@/components/landing/LandingPageTemplate";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Params = { params: { slug: string } };

async function getPublishedPage(slug: string) {
  return prisma.landingPage.findFirst({
    where: { slug, status: "published" },
  });
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const page = await getPublishedPage(params.slug);
  if (!page) return { title: "Not found" };
  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: { canonical: `/trends/${page.slug}` },
    openGraph: {
      title: page.metaTitle,
      description: page.metaDescription,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: page.metaTitle,
      description: page.metaDescription,
    },
  };
}

export default async function TrendPage({ params }: Params) {
  const page = await getPublishedPage(params.slug);
  if (!page) notFound();

  const content = page.contentJson as unknown as GeneratedLandingPage;

  // FAQ structured data for richer search results.
  const faqJsonLd =
    content.faqs?.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: content.faqs.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: { "@type": "Answer", text: f.answer },
          })),
        }
      : null;

  return (
    <>
      {faqJsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      ) : null}
      <LandingPageTemplate
        content={content}
        keyword={page.keyword}
        category={page.category}
        source={page.source}
        sourceUrl={page.sourceUrl}
      />
    </>
  );
}
