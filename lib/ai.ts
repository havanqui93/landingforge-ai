import type { GeneratePageInput, GeneratedLandingPage } from "@/types/landing-page";
import { generatedContentSchema } from "@/lib/validators";
import { slugify } from "@/lib/slug";

// ---------------------------------------------------------------------------
// AI landing-page generator.
//
// If OPENAI_API_KEY is set we ask OpenAI for structured JSON. Otherwise we fall
// back to a deterministic local template so the whole MVP flow (generate →
// save → publish → render) works end-to-end without any API key.
// ---------------------------------------------------------------------------

const SYSTEM_PROMPT = `You are an SEO landing page generator.
Generate a complete SEO landing page from the user keyword and description.
Return JSON only. Do not return markdown.
Rules:
- Generate original content.
- Do not copy full articles.
- Do not make fake claims.
- Avoid unsupported medical, financial, political, or legal claims.
- Keep the content factual and useful.
- Make the page SEO-friendly.
- Use clear headings.
- Include FAQ.
- Include related keywords.
- Create a short, clean URL slug.
- Meta title must be under 60 characters if possible.
- Meta description must be under 160 characters if possible.
Return this JSON structure:
{
  "title": "",
  "slug": "",
  "metaTitle": "",
  "metaDescription": "",
  "heroHeadline": "",
  "heroSubheadline": "",
  "summary": "",
  "whyTrending": "",
  "sections": [{ "heading": "", "content": "" }],
  "faqs": [{ "question": "", "answer": "" }],
  "ctaTitle": "",
  "ctaDescription": "",
  "relatedKeywords": []
}`;

export async function generateLandingPage(
  input: GeneratePageInput,
): Promise<GeneratedLandingPage> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (apiKey) {
    try {
      return await generateWithOpenAI(input, apiKey);
    } catch (err) {
      // Never hard-fail the request because the model misbehaved or the
      // network blipped — fall back to the deterministic template.
      console.error("[ai] OpenAI generation failed, using fallback:", err);
    }
  }
  return fallbackLandingPage(input);
}

async function generateWithOpenAI(
  input: GeneratePageInput,
  apiKey: string,
): Promise<GeneratedLandingPage> {
  const model = process.env.OPENAI_MODEL || "gpt-4o-mini";
  const userPrompt = `Keyword: ${input.keyword}\nDescription: ${
    input.description || "(none provided)"
  }${input.category ? `\nCategory: ${input.category}` : ""}${
    input.country ? `\nCountry: ${input.country}` : ""
  }`;

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      temperature: 0.7,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: userPrompt },
      ],
    }),
  });

  if (!res.ok) {
    throw new Error(`OpenAI HTTP ${res.status}: ${await res.text()}`);
  }

  const data = (await res.json()) as {
    choices?: { message?: { content?: string } }[];
  };
  const content = data.choices?.[0]?.message?.content;
  if (!content) throw new Error("OpenAI returned empty content");

  const parsed = generatedContentSchema.parse(JSON.parse(content));
  // Always normalise the slug ourselves — never trust the model's URL.
  return { ...parsed, slug: slugify(parsed.slug || parsed.title || input.keyword) };
}

// ---------------------------------------------------------------------------
// Deterministic fallback (no API key required).
// ---------------------------------------------------------------------------

function titleCase(s: string): string {
  return s
    .split(/\s+/)
    .map((w) => (w ? w[0]!.toUpperCase() + w.slice(1) : w))
    .join(" ");
}

function clamp(s: string, max: number): string {
  return s.length <= max ? s : s.slice(0, max - 1).trimEnd() + "…";
}

function fallbackLandingPage(input: GeneratePageInput): GeneratedLandingPage {
  const keyword = input.keyword.trim();
  const niceKeyword = titleCase(keyword);
  const description =
    input.description?.trim() ||
    `${niceKeyword} is gaining attention. Here is a clear, useful overview.`;

  const title = `${niceKeyword}: What It Is & Why It's Trending`;

  return {
    title,
    slug: slugify(keyword),
    metaTitle: clamp(`${niceKeyword} — Trends & Guide`, 60),
    metaDescription: clamp(
      `Understand ${niceKeyword}: what it is, why it's trending, key facts, and FAQs. ${description}`,
      160,
    ),
    heroHeadline: `${niceKeyword}, explained`,
    heroSubheadline: clamp(description, 180),
    summary: `${niceKeyword} is a topic many people are searching for right now. ${description} This page gives you a concise, original overview without hype or unverified claims.`,
    whyTrending: `Interest in ${niceKeyword} is rising as more people look for clear, trustworthy information. Search demand, social conversation, and ongoing developments are all contributing to its momentum.`,
    sections: [
      {
        heading: `What is ${niceKeyword}?`,
        content: `${niceKeyword} refers to the topic described above. ${description} This section gives you the essentials so you can quickly understand the basics.`,
      },
      {
        heading: `Key things to know`,
        content: `Here are the most useful points about ${niceKeyword}: who it matters to, how it's typically used, and what to keep in mind. We focus on practical, factual takeaways rather than speculation.`,
      },
      {
        heading: `How to get started`,
        content: `If you're exploring ${niceKeyword}, start by understanding your own goals, then evaluate the options available. Take a measured approach and verify details from primary sources before making decisions.`,
      },
    ],
    faqs: [
      {
        question: `What is ${niceKeyword}?`,
        answer: `${niceKeyword} is the subject of this page. ${clamp(description, 200)}`,
      },
      {
        question: `Why is ${niceKeyword} trending?`,
        answer: `Growing search interest and ongoing discussion are driving attention to ${niceKeyword}.`,
      },
      {
        question: `Where can I learn more about ${niceKeyword}?`,
        answer: `Start with reputable primary sources and official documentation related to ${niceKeyword}, then compare multiple perspectives.`,
      },
    ],
    ctaTitle: `Stay ahead on ${niceKeyword}`,
    ctaDescription: `Get clear, original takes on trending topics like ${niceKeyword} — no hype, just useful information.`,
    relatedKeywords: [
      keyword.toLowerCase(),
      `${keyword.toLowerCase()} guide`,
      `${keyword.toLowerCase()} explained`,
      `what is ${keyword.toLowerCase()}`,
      `${keyword.toLowerCase()} 2026`,
    ],
  };
}
