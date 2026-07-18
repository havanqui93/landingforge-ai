import { z } from "zod";
import type { LandingConfig } from "./landing.types";

/* -------------------------------------------------------------------------- */
/*  Shared primitives                                                          */
/* -------------------------------------------------------------------------- */

const ctaButtonSchema = z.object({
  label: z.string(),
  href: z.string(),
  variant: z.enum(["primary", "secondary", "ghost"]).optional(),
});

/* -------------------------------------------------------------------------- */
/*  Section schemas                                                            */
/* -------------------------------------------------------------------------- */

const heroSectionSchema = z.object({
  type: z.literal("hero"),
  eyebrow: z.string().optional(),
  title: z.string(),
  subtitle: z.string().optional(),
  actions: z.array(ctaButtonSchema).optional(),
  note: z.string().optional(),
});

const featuresSectionSchema = z.object({
  type: z.literal("features"),
  eyebrow: z.string().optional(),
  title: z.string(),
  subtitle: z.string().optional(),
  columns: z.union([z.literal(2), z.literal(3), z.literal(4)]).optional(),
  items: z.array(
    z.object({
      icon: z.string(),
      title: z.string(),
      description: z.string(),
    }),
  ),
});

const statsSectionSchema = z.object({
  type: z.literal("stats"),
  title: z.string().optional(),
  subtitle: z.string().optional(),
  items: z.array(z.object({ value: z.string(), label: z.string() })),
});

const testimonialsSectionSchema = z.object({
  type: z.literal("testimonials"),
  eyebrow: z.string().optional(),
  title: z.string(),
  subtitle: z.string().optional(),
  items: z.array(
    z.object({
      quote: z.string(),
      author: z.string(),
      role: z.string().optional(),
      avatar: z.string().optional(),
    }),
  ),
});

const pricingTierSchema = z.object({
  name: z.string(),
  price: z.string(),
  period: z.string().optional(),
  description: z.string().optional(),
  features: z.array(z.string()),
  cta: ctaButtonSchema,
  featured: z.boolean().optional(),
});

const pricingSectionSchema = z.object({
  type: z.literal("pricing"),
  eyebrow: z.string().optional(),
  title: z.string(),
  subtitle: z.string().optional(),
  tiers: z.array(pricingTierSchema),
});

const faqSectionSchema = z.object({
  type: z.literal("faq"),
  eyebrow: z.string().optional(),
  title: z.string(),
  subtitle: z.string().optional(),
  items: z.array(z.object({ question: z.string(), answer: z.string() })),
});

const ctaSectionSchema = z.object({
  type: z.literal("cta"),
  title: z.string(),
  subtitle: z.string().optional(),
  actions: z.array(ctaButtonSchema),
});

const footerSectionSchema = z.object({
  type: z.literal("footer"),
  brand: z.string(),
  tagline: z.string().optional(),
  legal: z.string().optional(),
  columns: z
    .array(
      z.object({
        heading: z.string(),
        links: z.array(z.object({ label: z.string(), href: z.string() })),
      }),
    )
    .optional(),
});

const sectionSchema = z.discriminatedUnion("type", [
  heroSectionSchema,
  featuresSectionSchema,
  statsSectionSchema,
  testimonialsSectionSchema,
  pricingSectionSchema,
  faqSectionSchema,
  ctaSectionSchema,
  footerSectionSchema,
]);

/* -------------------------------------------------------------------------- */
/*  Root config schema                                                         */
/* -------------------------------------------------------------------------- */

export const landingConfigSchema = z.object({
  meta: z.object({
    slug: z.string().min(1),
    title: z.string().min(1),
    description: z.string(),
  }),
  theme: z.object({
    primary: z.string(),
    bg: z.string(),
    mode: z.enum(["light", "dark"]),
    primaryFg: z.string().optional(),
    surface: z.string().optional(),
    fg: z.string().optional(),
    muted: z.string().optional(),
    border: z.string().optional(),
    font: z.string().optional(),
    radius: z.string().optional(),
  }),
  sections: z.array(sectionSchema).min(1),
});

/**
 * Validates raw AI output against the LandingConfig schema.
 * Throws ZodError on failure — callers should catch and fall back.
 */
export function parseLandingConfig(raw: unknown): LandingConfig {
  return landingConfigSchema.parse(raw) as LandingConfig;
}
