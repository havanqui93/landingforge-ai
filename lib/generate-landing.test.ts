import { describe, expect, it } from "vitest";
import { generateLanding, slugify } from "@/lib/generate-landing";
import type { NewsItem } from "@/lib/news";
import type { SectionType } from "@/lib/landing.types";

const VALID_SECTION_TYPES: ReadonlySet<SectionType> = new Set([
  "hero",
  "features",
  "stats",
  "testimonials",
  "pricing",
  "faq",
  "cta",
  "footer",
]);

const RGB_TRIPLE = /^\d{1,3} \d{1,3} \d{1,3}$/;

const story: NewsItem = {
  title: "A Delightful New Way to Build Software Tools",
  url: "https://example.com/story",
  points: 200,
};

describe("slugify (generator)", () => {
  it("produces a url-safe slug", () => {
    expect(slugify("Hello, World! 2026")).toBe("hello-world-2026");
  });

  it("caps length at 40 chars", () => {
    const long = "a".repeat(100);
    expect(slugify(long).length).toBeLessThanOrEqual(40);
  });
});

describe("generateLanding", () => {
  it("is deterministic for the same title + date", () => {
    const a = generateLanding(story, { dateISO: "2026-07-17" });
    const b = generateLanding(story, { dateISO: "2026-07-17" });
    expect(a).toEqual(b);
  });

  it("produces a different slug on a different date", () => {
    const a = generateLanding(story, { dateISO: "2026-07-17" });
    const b = generateLanding(story, { dateISO: "2026-07-18" });
    expect(a.meta.slug).not.toBe(b.meta.slug);
  });

  it("prefixes the slug with the date and keeps it url-safe", () => {
    const config = generateLanding(story, { dateISO: "2026-07-17" });
    expect(config.meta.slug.startsWith("2026-07-17-")).toBe(true);
    expect(config.meta.slug).toMatch(/^[a-z0-9-]+$/);
  });

  it("opens with a hero and closes with a footer", () => {
    const { sections } = generateLanding(story, { dateISO: "2026-07-17" });
    expect(sections[0]?.type).toBe("hero");
    expect(sections[sections.length - 1]?.type).toBe("footer");
  });

  it("only emits known section types", () => {
    const { sections } = generateLanding(story, { dateISO: "2026-07-17" });
    for (const section of sections) {
      expect(VALID_SECTION_TYPES.has(section.type)).toBe(true);
    }
  });

  it("themes colors as space-separated R G B triples", () => {
    const { theme } = generateLanding(story, { dateISO: "2026-07-17" });
    for (const value of [
      theme.primary,
      theme.bg,
      theme.surface,
      theme.fg,
      theme.muted,
      theme.border,
    ]) {
      expect(value).toBeDefined();
      expect(value!).toMatch(RGB_TRIPLE);
    }
  });

  it("keeps every RGB channel within 0-255", () => {
    const { theme } = generateLanding(story, { dateISO: "2026-07-17" });
    const channels = theme.primary.split(" ").map(Number);
    for (const c of channels) {
      expect(c).toBeGreaterThanOrEqual(0);
      expect(c).toBeLessThanOrEqual(255);
    }
  });

  it("falls back to a topic when the title has no usable keywords", () => {
    const bland: NewsItem = { title: "the a of to", points: 1 };
    const config = generateLanding(bland, { dateISO: "2026-07-17" });
    expect(config.sections[0]?.type).toBe("hero");
    expect(config.meta.title.length).toBeGreaterThan(0);
  });
});
