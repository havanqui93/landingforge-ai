/**
 * Runtime (Zod) mirror of the `LandingConfig` types in `landing.types.ts`.
 *
 * TypeScript proves a *literal* config is well-formed at compile time, but
 * configs that arrive at runtime — most importantly the JSON Claude/OpenAI
 * return from the AI generators — are just `unknown`. This schema is the
 * runtime gate: parse AI output (or any untrusted config) before rendering or
 * persisting it, so a hallucinated/missing field fails loudly instead of
 * shipping a broken page.
 *
 * Keep this in lockstep with `landing.types.ts`. The registry test parses every
 * built-in config through `landingConfigSchema`, so drift fails CI.
 */
import { z } from "zod";

/** `"R G B"` triple, e.g. "124 92 255" — each channel 0–255. */
export const rgbTriple = z
  .string()
  .regex(/^\d{1,3} \d{1,3} \d{1,3}$/, "Expected an 'R G B' triple")
  .refine(
    (v) => v.split(" ").every((n) => Number(n) >= 0 && Number(n) <= 255),
    "Each channel must be 0–255",
  );

const ctaButton = z.object({
  label: z.string().min(1),
  href: z.string().min(1),
  variant: z.enum(["primary", "secondary", "ghost"]).optional(),
});

const themeSchema = z.object({
  primary: rgbTriple,
  primaryFg: rgbTriple.optional(),
  bg: rgbTriple,
  surface: rgbTriple.optional(),
  fg: rgbTriple.optional(),
  muted: rgbTriple.optional(),
  border: rgbTriple.optional(),
  font: z.string().optional(),
  radius: z.string().optional(),
  mode: z.enum(["light", "dark"]),
});

const metaSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
});

const heroSection = z.object({
  type: z.literal("hero"),
  eyebrow: z.string().optional(),
  title: z.string().min(1),
  subtitle: z.string().optional(),
  actions: z.array(ctaButton).optional(),
  note: z.string().optional(),
});

const featuresSection = z.object({
  type: z.literal("features"),
  eyebrow: z.string().optional(),
  title: z.string().min(1),
  subtitle: z.string().optional(),
  items: z
    .array(
      z.object({
        icon: z.string().min(1),
        title: z.string().min(1),
        description: z.string().min(1),
      }),
    )
    .min(1),
  columns: z.union([z.literal(2), z.literal(3), z.literal(4)]).optional(),
});

const logosSection = z.object({
  type: z.literal("logos"),
  title: z.string().optional(),
  items: z
    .array(
      z.object({ name: z.string().min(1), icon: z.string().min(1).optional() }),
    )
    .min(1),
});

const statsSection = z.object({
  type: z.literal("stats"),
  title: z.string().optional(),
  subtitle: z.string().optional(),
  items: z
    .array(z.object({ value: z.string().min(1), label: z.string().min(1) }))
    .min(1),
});

const testimonialsSection = z.object({
  type: z.literal("testimonials"),
  eyebrow: z.string().optional(),
  title: z.string().min(1),
  subtitle: z.string().optional(),
  items: z
    .array(
      z.object({
        quote: z.string().min(1),
        author: z.string().min(1),
        role: z.string().optional(),
        avatar: z.string().optional(),
      }),
    )
    .min(1),
});

const pricingSection = z.object({
  type: z.literal("pricing"),
  eyebrow: z.string().optional(),
  title: z.string().min(1),
  subtitle: z.string().optional(),
  tiers: z
    .array(
      z.object({
        name: z.string().min(1),
        price: z.string().min(1),
        period: z.string().optional(),
        description: z.string().optional(),
        features: z.array(z.string().min(1)).min(1),
        cta: ctaButton,
        featured: z.boolean().optional(),
      }),
    )
    .min(1),
});

const faqSection = z.object({
  type: z.literal("faq"),
  eyebrow: z.string().optional(),
  title: z.string().min(1),
  subtitle: z.string().optional(),
  items: z
    .array(
      z.object({ question: z.string().min(1), answer: z.string().min(1) }),
    )
    .min(1),
});

const ctaSection = z.object({
  type: z.literal("cta"),
  title: z.string().min(1),
  subtitle: z.string().optional(),
  actions: z.array(ctaButton).min(1),
});

const footerSection = z.object({
  type: z.literal("footer"),
  brand: z.string().min(1),
  tagline: z.string().optional(),
  columns: z
    .array(
      z.object({
        heading: z.string().min(1),
        links: z
          .array(z.object({ label: z.string().min(1), href: z.string().min(1) }))
          .min(1),
      }),
    )
    .optional(),
  legal: z.string().optional(),
});

export const sectionSchema = z.discriminatedUnion("type", [
  heroSection,
  featuresSection,
  logosSection,
  statsSection,
  testimonialsSection,
  pricingSection,
  faqSection,
  ctaSection,
  footerSection,
]);

export const landingConfigSchema = z.object({
  meta: metaSchema,
  theme: themeSchema,
  sections: z.array(sectionSchema).min(1),
});

/** Parse unknown input into a validated LandingConfig (throws on failure). */
export function parseLandingConfig(input: unknown) {
  return landingConfigSchema.parse(input);
}

/** Non-throwing variant for callers that want to branch on validity. */
export function safeParseLandingConfig(input: unknown) {
  return landingConfigSchema.safeParse(input);
}
