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
import type { Section, SectionType } from "@/lib/landing.types";

/** Section `type` values the renderer knows how to draw. */
const SECTION_TYPES: SectionType[] = [
  "hero",
  "features",
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
  return section.type === "features" ? section.items.map((i) => i.icon) : [];
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
});
