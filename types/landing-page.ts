// Shared types for TrendPage AI generated landing pages.

/** The structured content the AI returns and we persist in `contentJson`. */
export type GeneratedLandingPage = {
  title: string;
  slug: string;
  metaTitle: string;
  metaDescription: string;
  heroHeadline: string;
  heroSubheadline: string;
  summary: string;
  whyTrending: string;
  sections: {
    heading: string;
    content: string;
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
  ctaTitle: string;
  ctaDescription: string;
  relatedKeywords: string[];
};

export type PageStatus = "draft" | "published";

/** Input accepted by POST /api/generate-page. */
export type GeneratePageInput = {
  keyword: string;
  description?: string;
  category?: string;
  country?: string;
};
