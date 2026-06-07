/**
 * Templated landing generator (no LLM).
 *
 * Turns a news headline into a complete, type-safe LandingConfig for a
 * *fictional* product inspired by the story. Everything is deterministic:
 * the same headline + date always yields the same page. Palette, product name,
 * and copy variants are all derived from a hash of the title so each day feels
 * distinct while staying on-brand and legible.
 */

import type {
  CTAButton,
  LandingConfig,
  Section,
} from "./landing.types";
import type { NewsItem } from "./news";

/* -------------------------------------------------------------------------- */
/*  Deterministic helpers                                                      */
/* -------------------------------------------------------------------------- */

function hash(str: string): number {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function pick<T>(arr: readonly T[], seed: number): T {
  // Normalize to a non-negative index — signed shifts upstream can go negative.
  const i = ((Math.trunc(seed) % arr.length) + arr.length) % arr.length;
  return arr[i]!;
}

function titleCase(word: string): string {
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40);
}

/* -------------------------------------------------------------------------- */
/*  Palette (HSL → "R G B" triple, dark, legible)                             */
/* -------------------------------------------------------------------------- */

function hslToTriple(h: number, s: number, l: number): string {
  const sN = s / 100;
  const lN = l / 100;
  const c = (1 - Math.abs(2 * lN - 1)) * sN;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = lN - c / 2;
  let r = 0;
  let g = 0;
  let b = 0;
  if (h < 60) [r, g, b] = [c, x, 0];
  else if (h < 120) [r, g, b] = [x, c, 0];
  else if (h < 180) [r, g, b] = [0, c, x];
  else if (h < 240) [r, g, b] = [0, x, c];
  else if (h < 300) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];
  const to255 = (v: number) => Math.round((v + m) * 255);
  return `${to255(r)} ${to255(g)} ${to255(b)}`;
}

function buildTheme(seed: number): LandingConfig["theme"] {
  const hue = seed % 360;
  const accent = (hue + 35) % 360; // slight shift keeps the bg from matching primary
  return {
    primary: hslToTriple(hue, 80, 62),
    bg: hslToTriple(accent, 32, 6),
    surface: hslToTriple(accent, 28, 12),
    fg: hslToTriple(accent, 18, 95),
    muted: hslToTriple(accent, 16, 68),
    border: hslToTriple(accent, 22, 20),
    mode: "dark",
    radius: pick(["0.75rem", "0.9rem", "1rem", "1.25rem"], seed),
    font: '"Inter", system-ui, sans-serif',
  };
}

/* -------------------------------------------------------------------------- */
/*  Copy building blocks                                                       */
/* -------------------------------------------------------------------------- */

const STOPWORDS = new Set([
  "a", "an", "the", "of", "to", "in", "on", "for", "and", "or", "with", "is",
  "are", "new", "how", "why", "what", "your", "you", "this", "that", "from",
  "by", "as", "at", "it", "its", "has", "have", "will", "can", "could", "says",
  "after", "over", "into", "out", "up", "down", "more", "most", "than", "then",
  "but", "not", "all", "we", "our", "be", "was", "were", "his", "her", "their",
  "i", "my", "me", "do", "does", "now", "just", "via", "vs", "show", "hn",
]);

function keywords(title: string): string[] {
  return title
    .replace(/[^a-zA-Z0-9 ]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 3 && !STOPWORDS.has(w.toLowerCase()));
}

const NAME_SUFFIXES = [
  "Flow", "Labs", "Grid", "Wave", "Loop", "Forge", "Hub", "OS", "ly", "Stack",
];

const PRODUCT_NOUNS = ["platform", "toolkit", "studio", "engine", "app", "workspace"];

function productName(words: string[], seed: number): string {
  const base = words[0] ? titleCase(words[0]) : pick(["Nimbus", "Vertex", "Lumen", "Aster", "Pulse"], seed);
  return `${base}${pick(NAME_SUFFIXES, seed >> 3)}`;
}

const HERO_TITLES = [
  "Build on what's next, today",
  "Turn the headline into your edge",
  "Ride the wave before everyone else",
  "The fast lane for what's coming",
  "From breaking news to breakthrough product",
];

const HERO_SUBS = [
  "{name} packages the momentum behind {topic} into a product your team can ship this week.",
  "Inspired by today's news on {topic}, {name} gives you a head start while the trend is still fresh.",
  "{name} turns the energy around {topic} into a polished, ready-to-launch experience.",
];

const FEATURE_POOL: { icon: string; title: string; description: string }[] = [
  { icon: "Zap", title: "Lightning fast", description: "Static-first rendering and transform-only motion keep everything buttery at 60fps." },
  { icon: "Sparkles", title: "On-trend by design", description: "Every release is themed around what's making news, so you always feel current." },
  { icon: "ShieldCheck", title: "Solid foundations", description: "Strict typing and accessible, semantic markup mean fewer surprises in production." },
  { icon: "Rocket", title: "Ship in minutes", description: "Go from idea to a live, polished page faster than a coffee break." },
  { icon: "BarChart3", title: "Measure what matters", description: "Built-in insights track engagement so you can double down on what works." },
  { icon: "Globe", title: "Reach everywhere", description: "Fast, lightweight pages that load instantly for visitors around the world." },
  { icon: "Palette", title: "Distinct every day", description: "A fresh palette and identity generated for each launch — never two the same." },
  { icon: "Workflow", title: "Fully automated", description: "A scheduled job assembles, themes, and publishes the page while you sleep." },
];

const FAQ_POOL: { question: string; answer: string }[] = [
  { question: "Is this a real product?", answer: "This is a demo landing generated automatically from today's news as inspiration — the product concept is fictional." },
  { question: "How often does it update?", answer: "A scheduled job runs every morning, pulls fresh headlines, and publishes a brand-new themed page." },
  { question: "Can each page look different?", answer: "Yes — palette, typography, and identity are derived from the day's story, so every page is distinct." },
  { question: "How fast are the pages?", answer: "They're statically themed and animate only transform/opacity, so they stay smooth and load quickly." },
];

/* -------------------------------------------------------------------------- */
/*  Generator                                                                  */
/* -------------------------------------------------------------------------- */

export interface GenerateOptions {
  /** Date used to prefix the slug, e.g. "2026-06-06". */
  dateISO: string;
}

export function generateLanding(
  news: NewsItem,
  { dateISO }: GenerateOptions,
): LandingConfig {
  const seed = hash(news.title + dateISO);
  const words = keywords(news.title);
  const topic = (words.slice(0, 3).join(" ") || "innovation").toLowerCase();
  const name = productName(words, seed);
  const theme = buildTheme(seed);

  const slug = `${dateISO}-${slugify(name + "-" + (words[0] ?? "daily"))}`;
  const fill = (s: string) => s.replace(/\{name\}/g, name).replace(/\{topic\}/g, topic);

  const heroActions: CTAButton[] = [
    { label: "Get early access", href: "#pricing", variant: "primary" },
    { label: "See features", href: "#features", variant: "secondary" },
  ];

  // Rotate the feature/faq pools deterministically so days differ.
  const features = [...FEATURE_POOL]
    .sort((a, b) => hash(a.title + seed) - hash(b.title + seed))
    .slice(0, 6);
  const faqs = [...FAQ_POOL]
    .sort((a, b) => hash(a.question + seed) - hash(b.question + seed))
    .slice(0, 4);

  const sections: Section[] = [
    {
      type: "hero",
      eyebrow: `Fresh for ${dateISO}`,
      title: pick(HERO_TITLES, seed),
      subtitle: fill(pick(HERO_SUBS, seed >> 5)),
      actions: heroActions,
      note: "Auto-generated daily · Inspired by today's headlines",
    },
    {
      type: "stats",
      items: [
        { value: `${10 + (seed % 90)}k+`, label: "Early sign-ups" },
        { value: "99.9%", label: "Uptime" },
        { value: `${2 + (seed % 8)}×`, label: "Faster launch" },
        { value: "4.9", label: "Avg. rating" },
      ],
    },
    {
      type: "features",
      eyebrow: `Why ${name}`,
      title: "Everything you need, day one",
      subtitle: fill("A polished foundation built around {topic} — nothing to wire up."),
      columns: 3,
      items: features,
    },
    {
      type: "testimonials",
      eyebrow: "Early reactions",
      title: "Teams are already on board",
      items: [
        { quote: fill("We jumped on {topic} the morning it broke — {name} had us live before lunch."), author: "Maya Chen", role: "Head of Growth" },
        { quote: fill("Finally, a way to act on a trend while it's still a trend. {name} is that fast."), author: "Diego Alvarez", role: "Founder" },
        { quote: fill("The page basically built itself, and it looks like we spent a week on it."), author: "Priya Nair", role: "Design Lead" },
      ],
    },
    {
      type: "pricing",
      eyebrow: "Pricing",
      title: "Simple, honest plans",
      subtitle: "Start free. Upgrade when you're ready to scale.",
      tiers: [
        {
          name: "Starter",
          price: "$0",
          period: "/mo",
          description: "For experiments and side projects.",
          features: ["1 live page", "Daily themed refresh", "Community support"],
          cta: { label: "Start free", href: "#", variant: "secondary" },
        },
        {
          name: "Pro",
          price: `$${19 + (seed % 20)}`,
          period: "/mo",
          description: "For teams that move with the news.",
          featured: true,
          features: ["Unlimited pages", "Custom themes", "Analytics", "Priority support"],
          cta: { label: "Get early access", href: "#", variant: "primary" },
        },
        {
          name: "Scale",
          price: "Custom",
          description: "For organizations with bigger needs.",
          features: ["SSO & SAML", "Dedicated support", "SLA & onboarding", "Audit logs"],
          cta: { label: "Contact us", href: "#", variant: "secondary" },
        },
      ],
    },
    {
      type: "faq",
      eyebrow: "FAQ",
      title: "Questions, answered",
      items: faqs,
    },
    {
      type: "cta",
      title: fill("Ready to move on {topic}?"),
      subtitle: fill("Join the early cohort and put {name} to work today."),
      actions: [
        { label: "Get early access", href: "#", variant: "primary" },
        { label: "Read more", href: news.url ?? "#", variant: "ghost" },
      ],
    },
    {
      type: "footer",
      brand: name,
      tagline: fill("A fictional product, freshly themed around {topic}."),
      columns: [
        {
          heading: "Product",
          links: [
            { label: "Features", href: "#features" },
            { label: "Pricing", href: "#pricing" },
          ],
        },
        {
          heading: "Source",
          links: [
            { label: "Today's inspiration", href: news.url ?? "#" },
          ],
        },
        {
          heading: "Legal",
          links: [
            { label: "Privacy", href: "#" },
            { label: "Terms", href: "#" },
          ],
        },
      ],
      legal: `Auto-generated demo landing for ${dateISO}. Product is fictional.`,
    },
  ];

  return {
    meta: {
      slug,
      title: `${name} — ${pick(HERO_TITLES, seed)}`,
      description: fill("{name}: a fictional product, auto-generated and themed around {topic} from today's headlines."),
    },
    theme,
    sections,
  };
}
