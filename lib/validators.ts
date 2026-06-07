import { z } from "zod";

// ---------------------------------------------------------------------------
// Input validation (Zod). Used by API routes and the generate flow.
// ---------------------------------------------------------------------------

export const generatePageSchema = z.object({
  keyword: z
    .string()
    .trim()
    .min(2, "Keyword must be at least 2 characters.")
    .max(120, "Keyword must be at most 120 characters."),
  description: z
    .string()
    .trim()
    .max(1000, "Description must be at most 1000 characters.")
    .optional()
    .or(z.literal("")),
  category: z.string().trim().max(120).optional().or(z.literal("")),
  country: z.string().trim().max(120).optional().or(z.literal("")),
});

export type GeneratePageSchema = z.infer<typeof generatePageSchema>;

export const pageStatusSchema = z.enum(["draft", "published"]);

/** Shape of the structured AI content we persist + render. */
export const generatedContentSchema = z.object({
  title: z.string(),
  slug: z.string(),
  metaTitle: z.string(),
  metaDescription: z.string(),
  heroHeadline: z.string(),
  heroSubheadline: z.string(),
  summary: z.string(),
  whyTrending: z.string(),
  sections: z.array(
    z.object({ heading: z.string(), content: z.string() }),
  ),
  faqs: z.array(z.object({ question: z.string(), answer: z.string() })),
  ctaTitle: z.string(),
  ctaDescription: z.string(),
  relatedKeywords: z.array(z.string()),
});

/** Payload accepted when saving a page (POST /api/pages). */
export const savePageSchema = z.object({
  keyword: z.string().trim().min(2).max(120),
  description: z.string().trim().max(1000).optional().nullable(),
  category: z.string().trim().max(120).optional().nullable(),
  country: z.string().trim().max(120).optional().nullable(),
  source: z.string().trim().max(200).optional().nullable(),
  sourceUrl: z.string().trim().url().max(500).optional().nullable().or(z.literal("")),
  status: pageStatusSchema.default("draft"),
  content: generatedContentSchema,
});

export type SavePageSchema = z.infer<typeof savePageSchema>;

/** Payload accepted when updating a page (PATCH /api/pages/[id]). */
export const updatePageSchema = z.object({
  keyword: z.string().trim().min(2).max(120).optional(),
  description: z.string().trim().max(1000).optional().nullable(),
  category: z.string().trim().max(120).optional().nullable(),
  country: z.string().trim().max(120).optional().nullable(),
  source: z.string().trim().max(200).optional().nullable(),
  sourceUrl: z.string().trim().url().max(500).optional().nullable().or(z.literal("")),
  status: pageStatusSchema.optional(),
  content: generatedContentSchema.optional(),
});

export type UpdatePageSchema = z.infer<typeof updatePageSchema>;
