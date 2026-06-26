/**
 * LandingForge — type system
 *
 * Every landing page is described by a single typed `LandingConfig` object.
 * Sections are a discriminated union keyed on `type`, so `LandingRenderer`
 * can exhaustively switch and TypeScript guarantees each variant carries
 * exactly the data its component needs.
 *
 * To add a new section type:
 *   1. add a `*Section` interface below
 *   2. add it to the `Section` union
 *   3. create the matching component + register it in LandingRenderer
 * Existing landings are never touched.
 */

/* -------------------------------------------------------------------------- */
/*  Theme + meta                                                              */
/* -------------------------------------------------------------------------- */

export interface LandingTheme {
  /** Brand color as an `R G B` triple, e.g. "99 102 241". */
  primary: string;
  /** Foreground color used on top of `primary`. */
  primaryFg?: string;
  /** Page background as an `R G B` triple. */
  bg: string;
  /** Optional elevated-surface color (cards). Falls back to a tint of bg. */
  surface?: string;
  /** Body text color. */
  fg?: string;
  /** Muted/secondary text color. */
  muted?: string;
  /** Border / hairline color. */
  border?: string;
  /** CSS font-family stack applied via `--lf-font`. */
  font?: string;
  /** Base border radius, e.g. "0.75rem". */
  radius?: string;
  /** Light or dark scheme — sets `color-scheme` + sensible fallbacks. */
  mode: "light" | "dark";
}

export interface LandingMeta {
  slug: string;
  title: string;
  description: string;
}

/* -------------------------------------------------------------------------- */
/*  Shared primitives                                                         */
/* -------------------------------------------------------------------------- */

export interface CTAButton {
  label: string;
  href: string;
  /** Visual emphasis. Defaults to "primary". */
  variant?: "primary" | "secondary" | "ghost";
}

/** Lucide icon name (string) so configs stay serializable & declarative. */
export type IconName = string;

/* -------------------------------------------------------------------------- */
/*  Section variants                                                          */
/* -------------------------------------------------------------------------- */

export interface HeroSection {
  type: "hero";
  eyebrow?: string;
  title: string;
  subtitle?: string;
  /** Primary + optional secondary actions. */
  actions?: CTAButton[];
  /** Optional small trust line under the buttons. */
  note?: string;
}

export interface FeatureItem {
  icon: IconName;
  title: string;
  description: string;
}

export interface FeaturesSection {
  type: "features";
  eyebrow?: string;
  title: string;
  subtitle?: string;
  items: FeatureItem[];
  /** Grid columns at desktop. Defaults to 3. */
  columns?: 2 | 3 | 4;
}

export interface LogoItem {
  /** Brand/customer name shown in the strip. */
  name: string;
  /** Optional Lucide icon rendered beside the name. */
  icon?: IconName;
}

export interface LogosSection {
  type: "logos";
  /** Small heading above the strip, e.g. "Trusted by teams at". */
  title?: string;
  items: LogoItem[];
}

export interface StatItem {
  value: string;
  label: string;
}

export interface StatsSection {
  type: "stats";
  title?: string;
  subtitle?: string;
  items: StatItem[];
}

export interface TestimonialItem {
  quote: string;
  author: string;
  role?: string;
  avatar?: string;
}

export interface TestimonialsSection {
  type: "testimonials";
  eyebrow?: string;
  title: string;
  subtitle?: string;
  items: TestimonialItem[];
}

export interface PricingTier {
  name: string;
  price: string;
  period?: string;
  description?: string;
  features: string[];
  cta: CTAButton;
  /** Highlight this tier as the recommended plan. */
  featured?: boolean;
}

export interface PricingSection {
  type: "pricing";
  eyebrow?: string;
  title: string;
  subtitle?: string;
  tiers: PricingTier[];
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQSection {
  type: "faq";
  eyebrow?: string;
  title: string;
  subtitle?: string;
  items: FAQItem[];
}

export interface CTASection {
  type: "cta";
  title: string;
  subtitle?: string;
  actions: CTAButton[];
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterColumn {
  heading: string;
  links: FooterLink[];
}

export interface FooterSection {
  type: "footer";
  brand: string;
  tagline?: string;
  columns?: FooterColumn[];
  /** Free-form copyright/legal line. */
  legal?: string;
}

/* -------------------------------------------------------------------------- */
/*  Union + config                                                            */
/* -------------------------------------------------------------------------- */

export type Section =
  | HeroSection
  | FeaturesSection
  | LogosSection
  | StatsSection
  | TestimonialsSection
  | PricingSection
  | FAQSection
  | CTASection
  | FooterSection;

export type SectionType = Section["type"];

export interface LandingConfig {
  meta: LandingMeta;
  theme: LandingTheme;
  sections: Section[];
}
