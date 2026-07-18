import { z } from "zod";
import type { LandingConfig } from "./landing.types";

/* -------------------------------------------------------------------------- */
/*  Color validator                                                            */
/* -------------------------------------------------------------------------- */

/**
 * Validates a Tailwind-compatible color value: space-separated "R G B" triple
 * where each channel is a decimal integer in 0-255.
 * Rejects hex (#ff0000), rgb() notation, and out-of-range values so that
 * Tailwind opacity modifiers (bg-primary/15) work correctly at runtime.
 */
const rgbTriple = z
  .string()
  .regex(/^\d{1,3} \d{1,3} \d{1,3}$/, 'Expected "R G B" triple, e.g. "124 92 255"')
  .refine(
    (s) => s.split(" ").map(Number).every((n) => n >= 0 && n <= 255),
    { message: "Each RGB channel must be in the 0-255 range" },
  );

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
    primary: rgbTriple,
    bg: rgbTriple,
    mode: z.enum(["light", "dark"]),
    primaryFg: rgbTriple.optional(),
    surface: rgbTriple.optional(),
    fg: rgbTriple.optional(),
    muted: rgbTriple.optional(),
    border: rgbTriple.optional(),
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
