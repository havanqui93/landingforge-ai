import type { GeneratedLandingPage } from "@/types/landing-page";
import { HeroSection } from "@/components/landing/HeroSection";
import { FAQSection } from "@/components/landing/FAQSection";
import { CTASection } from "@/components/landing/CTASection";

type LandingPageTemplateProps = {
  content: GeneratedLandingPage;
  keyword: string;
  category?: string | null;
  source?: string | null;
  sourceUrl?: string | null;
};

/**
 * Full public landing-page layout assembled from generated content.
 * Light, clean, mobile-first, SEO-friendly. Independent of LandingForge theme.
 */
export function LandingPageTemplate({
  content,
  keyword,
  category,
  source,
  sourceUrl,
}: LandingPageTemplateProps) {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <HeroSection
        headline={content.heroHeadline}
        subheadline={content.heroSubheadline}
        keyword={keyword}
        category={category}
      />

      {/* Summary */}
      <section className="mx-auto max-w-3xl px-6 py-12">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">
          Overview
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-slate-600">
          {content.summary}
        </p>
      </section>

      {/* Why trending */}
      {content.whyTrending ? (
        <section className="bg-slate-50">
          <div className="mx-auto max-w-3xl px-6 py-12">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              Why this is trending
            </h2>
            <p className="mt-4 leading-relaxed text-slate-600">
              {content.whyTrending}
            </p>
          </div>
        </section>
      ) : null}

      {/* Main content sections */}
      {content.sections.length ? (
        <div className="mx-auto max-w-3xl px-6 py-12">
          <div className="space-y-10">
            {content.sections.map((section, i) => (
              <article key={i}>
                <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                  {section.heading}
                </h2>
                <p className="mt-3 leading-relaxed text-slate-600">
                  {section.content}
                </p>
              </article>
            ))}
          </div>
        </div>
      ) : null}

      {/* Related keywords */}
      {content.relatedKeywords.length ? (
        <section className="mx-auto max-w-3xl px-6 py-8">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-400">
            Related topics
          </h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {content.relatedKeywords.map((kw, i) => (
              <li
                key={i}
                className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-sm text-slate-600"
              >
                {kw}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <FAQSection faqs={content.faqs} />

      <CTASection
        title={content.ctaTitle}
        description={content.ctaDescription}
      />

      {/* Source attribution + AI-generated disclosure */}
      <footer className="border-t border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-3xl px-6 py-8 text-sm text-slate-500">
          {source || sourceUrl ? (
            <p>
              Source:{" "}
              {sourceUrl ? (
                <a
                  href={sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="text-indigo-600 underline"
                >
                  {source || sourceUrl}
                </a>
              ) : (
                source
              )}
            </p>
          ) : null}
          <p className="mt-2">
            This summary is AI-generated for informational purposes and may
            contain inaccuracies. Please verify with primary sources.
          </p>
        </div>
      </footer>
    </main>
  );
}
