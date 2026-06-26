/**
 * Registry validation — the structural contract every landing must satisfy.
 *
 * `npm run typecheck` proves a config is *type*-valid; `npm run build` proves it
 * *renders*. This test guards the conventions the type system can't express
 * (documented in CLAUDE.md → "Conventions an agent must respect"):
 *
 *   - slugs are unique, URL-safe, and match their config
 *   - a landing opens with a hero and closes with a footer
 *   - colors are `"R G B"` triples so Tailwind opacity modifiers work
 *   - icons resolve to real Lucide icons (no silent Sparkles fallback)
 *
 * A broken landing fails here in milliseconds instead of at deploy time.
 */
import { describe, it, expect } from "vitest";
import { icons } from "lucide-react";
import { landings } from "@/lib/registry";
import { landingConfigSchema } from "@/lib/landing.schema";
import type { Section, SectionType } from "@/lib/landing.types";

/** Section `type` values the renderer knows how to draw. */
const SECTION_TYPES: SectionType[] = [
  "hero",
  "features",
  "logos",
  "stats",
  "testimonials",
  "pricing",
  "faq",
  "cta",
  "footer",
];

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const RGB_RE = /^\d{1,3} \d{1,3} \d{1,3}$/;

function isRgbTriple(value: string): boolean {
  if (!RGB_RE.test(value)) return false;
  return value.split(" ").every((n) => Number(n) >= 0 && Number(n) <= 255);
}

/** Mirror of getIcon's PascalCase resolution, used to detect typos. */
function pascal(name: string): string {
  return name
    .split(/[-_\s]/)
    .filter(Boolean)
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join("");
}

function iconNames(section: Section): string[] {
  if (section.type === "features") return section.items.map((i) => i.icon);
  if (section.type === "logos") {
    return section.items.flatMap((i) => (i.icon ? [i.icon] : []));
  }
  return [];
}

/** Relative luminance of an "R G B" triple (WCAG 2.x). */
function luminance(triple: string): number {
  const [r, g, b] = triple.split(" ").map((n) => {
    const c = Number(n) / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  }) as [number, number, number];
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/** WCAG contrast ratio between two "R G B" triples (1–21). */
function contrast(a: string, b: string): number {
  const l1 = luminance(a);
  const l2 = luminance(b);
  const [hi, lo] = l1 > l2 ? [l1, l2] : [l2, l1];
  return (hi + 0.05) / (lo + 0.05);
}

describe("landing registry", () => {
  it("has at least one landing", () => {
    expect(landings.length).toBeGreaterThan(0);
  });

  it("registry slugs are unique", () => {
    const slugs = landings.map((l) => l.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("every registry entry's slug matches its config", () => {
    for (const { slug, config } of landings) {
      expect(slug, `entry slug should equal config.meta.slug`).toBe(
        config.meta.slug,
      );
    }
  });
});

describe.each(landings)("landing: $slug", ({ config }) => {
  const { meta, theme, sections } = config;

  it("has a URL-safe slug", () => {
    expect(meta.slug).toMatch(SLUG_RE);
  });

  it("has non-empty title and description", () => {
    expect(meta.title.trim().length).toBeGreaterThan(0);
    expect(meta.description.trim().length).toBeGreaterThan(0);
  });

  it("opens with a hero and closes with a footer", () => {
    expect(sections.length).toBeGreaterThanOrEqual(2);
    expect(sections[0]!.type).toBe("hero");
    expect(sections[sections.length - 1]!.type).toBe("footer");
  });

  it("uses only known section types", () => {
    for (const s of sections) {
      expect(SECTION_TYPES).toContain(s.type);
    }
  });

  it("theme colors are 'R G B' triples", () => {
    const colorKeys = [
      "primary",
      "primaryFg",
      "bg",
      "surface",
      "fg",
      "muted",
      "border",
    ] as const;
    for (const key of colorKeys) {
      const value = theme[key];
      if (value == null) continue;
      expect(isRgbTriple(value), `theme.${key} = "${value}"`).toBe(true);
    }
  });

  it("theme mode is light or dark", () => {
    expect(["light", "dark"]).toContain(theme.mode);
  });

  it("all feature icons resolve to real Lucide icons", () => {
    const names = sections.flatMap(iconNames);
    for (const name of names) {
      const resolved = pascal(name);
      expect(
        Object.prototype.hasOwnProperty.call(icons, resolved),
        `icon "${name}" → "${resolved}" is not a Lucide icon`,
      ).toBe(true);
    }
  });

  it("validates against the runtime LandingConfig schema", () => {
    const result = landingConfigSchema.safeParse(config);
    expect(
      result.success,
      result.success ? "" : JSON.stringify(result.error.issues, null, 2),
    ).toBe(true);
  });

  // Legibility floor: body text must clear WCAG AA (4.5:1); muted/secondary
  // text must clear the 3:1 large-text/UI threshold. A theme that fails here
  // ships an unreadable page.
  it("theme text meets WCAG contrast thresholds", () => {
    const { bg, fg, muted, surface } = theme;
    if (fg) {
      expect(contrast(fg, bg), `fg on bg`).toBeGreaterThanOrEqual(4.5);
    }
    if (muted) {
      expect(contrast(muted, bg), `muted on bg`).toBeGreaterThanOrEqual(3);
      if (surface) {
        expect(
          contrast(muted, surface),
          `muted on surface`,
        ).toBeGreaterThanOrEqual(3);
      }
    }
  });
});
