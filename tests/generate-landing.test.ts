/**
 * The deterministic generator is the daily job's fallback (and the result
 * whenever ANTHROPIC_API_KEY is absent). It runs unattended, so we hold it to
 * the same contract the registry test enforces on hand-authored landings:
 * schema-valid, hero-first/footer-last, URL-safe slug, and legible contrast —
 * for a wide spread of inputs, not just one.
 */
import { describe, it, expect } from "vitest";
import { generateLanding } from "@/lib/generate-landing";
import { landingConfigSchema } from "@/lib/landing.schema";

function luminance(triple: string): number {
  const [r, g, b] = triple.split(" ").map((n) => {
    const c = Number(n) / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  }) as [number, number, number];
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
function contrast(a: string, b: string): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi! + 0.05) / (lo! + 0.05);
}

// A spread of real-ish headlines exercising different hashes/keyword shapes.
const HEADLINES = [
  "Show HN: A tiny database written in Rust",
  "The quiet rise of local-first software",
  "Why developers are flocking to typed configs",
  "An open protocol for ambient computing",
  "A new approach to building fast web apps",
  "Designers ship a delightful animation toolkit",
  "Edge runtimes and the future of latency",
  "Community builds an offline maps engine",
  "S",
  "ALL CAPS HEADLINE WITH PUNCTUATION!!!",
];
const DATE = "2026-06-26";

describe.each(HEADLINES)("generateLanding(%j)", (title) => {
  const config = generateLanding({ title, url: "https://example.com", points: 3 }, { dateISO: DATE });

  it("validates against the runtime schema", () => {
    const result = landingConfigSchema.safeParse(config);
    expect(
      result.success,
      result.success ? "" : JSON.stringify(result.error.issues, null, 2),
    ).toBe(true);
  });

  it("opens with a hero and closes with a footer", () => {
    expect(config.sections[0]!.type).toBe("hero");
    expect(config.sections.at(-1)!.type).toBe("footer");
  });

  it("produces a dated, URL-safe slug within length limits", () => {
    expect(config.meta.slug).toMatch(/^\d{4}-\d{2}-\d{2}-[a-z0-9]+(?:-[a-z0-9]+)*$/);
    expect(config.meta.slug.length).toBeLessThanOrEqual(60);
  });

  it("themes for legibility (WCAG)", () => {
    const { bg, fg, muted, surface } = config.theme;
    expect(contrast(fg!, bg)).toBeGreaterThanOrEqual(4.5);
    expect(contrast(muted!, bg)).toBeGreaterThanOrEqual(3);
    expect(contrast(muted!, surface!)).toBeGreaterThanOrEqual(3);
  });
});

describe("determinism", () => {
  it("same headline + date yields identical output", () => {
    const a = generateLanding({ title: "Repeatable", points: 1 }, { dateISO: DATE });
    const b = generateLanding({ title: "Repeatable", points: 1 }, { dateISO: DATE });
    expect(a).toEqual(b);
  });

  it("different dates yield different slugs", () => {
    const a = generateLanding({ title: "Same title", points: 1 }, { dateISO: "2026-01-01" });
    const b = generateLanding({ title: "Same title", points: 1 }, { dateISO: "2026-12-31" });
    expect(a.meta.slug).not.toBe(b.meta.slug);
  });
});
