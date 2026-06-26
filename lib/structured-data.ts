/**
 * Build JSON-LD (schema.org) structured data for a landing page so it's
 * eligible for rich results. We emit a `WebPage` for every landing and a
 * `FAQPage` whenever the config includes an FAQ section.
 *
 * The returned value is a plain object; render it inside a
 * <script type="application/ld+json"> tag.
 */
import type { LandingConfig } from "./landing.types";
import { absoluteUrl } from "./site";

export function landingJsonLd(config: LandingConfig): Record<string, unknown> {
  const url = absoluteUrl(`/l/${config.meta.slug}`);

  const graph: Record<string, unknown>[] = [
    {
      "@type": "WebPage",
      "@id": `${url}#webpage`,
      url,
      name: config.meta.title,
      description: config.meta.description,
    },
  ];

  const faq = config.sections.find((s) => s.type === "faq");
  if (faq && faq.type === "faq" && faq.items.length > 0) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${url}#faq`,
      mainEntity: faq.items.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    });
  }

  return { "@context": "https://schema.org", "@graph": graph };
}

/** Site-level WebSite node for the homepage. */
export function siteJsonLd(name: string, description: string): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name,
    description,
    url: absoluteUrl("/"),
  };
}
