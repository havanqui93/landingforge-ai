import { describe, expect, it } from "vitest";
import { landingConfigSchema, parseLandingConfig } from "@/lib/landing-schema";

/* -------------------------------------------------------------------------- */
/*  Fixtures                                                                   */
/* -------------------------------------------------------------------------- */

const VALID_CONFIG = {
  meta: { slug: "2026-07-18-test", title: "Test Product", description: "A test." },
  theme: { primary: "124 92 255", bg: "10 10 20", mode: "dark" as const },
  sections: [
    { type: "hero" as const, title: "Ship faster" },
    { type: "footer" as const, brand: "TestCo" },
  ],
};

/* -------------------------------------------------------------------------- */
/*  Happy path                                                                 */
/* -------------------------------------------------------------------------- */

describe("landingConfigSchema — valid input", () => {
  it("accepts a minimal valid config", () => {
    const result = landingConfigSchema.safeParse(VALID_CONFIG);
    expect(result.success).toBe(true);
  });

  it("accepts optional theme fields when present", () => {
    const config = {
      ...VALID_CONFIG,
      theme: {
        ...VALID_CONFIG.theme,
        surface: "20 20 40",
        fg: "240 240 250",
        muted: "120 120 140",
        border: "40 40 60",
        radius: "0.75rem",
        font: '"Inter", sans-serif',
      },
    };
    expect(landingConfigSchema.safeParse(config).success).toBe(true);
  });

  it("accepts all section types", () => {
    const config = {
      ...VALID_CONFIG,
      sections: [
        { type: "hero", title: "H" },
        { type: "features", title: "F", items: [{ icon: "Zap", title: "Fast", description: "..." }] },
        { type: "stats", items: [{ value: "1k+", label: "Users" }] },
        { type: "testimonials", title: "T", items: [{ quote: "Great", author: "Alice" }] },
        { type: "pricing", title: "P", tiers: [{ name: "Free", price: "$0", features: ["x"], cta: { label: "Go", href: "#" } }] },
        { type: "faq", title: "Q", items: [{ question: "Q?", answer: "A." }] },
        { type: "cta", title: "CTA", actions: [{ label: "Go", href: "#" }] },
        { type: "footer", brand: "TestCo" },
      ],
    };
    expect(landingConfigSchema.safeParse(config).success).toBe(true);
  });
});

/* -------------------------------------------------------------------------- */
/*  Rejection cases                                                            */
/* -------------------------------------------------------------------------- */

describe("landingConfigSchema — invalid input", () => {
  it("rejects a missing meta.slug", () => {
    const { slug: _unused, ...metaWithoutSlug } = VALID_CONFIG.meta;
    const config = { ...VALID_CONFIG, meta: metaWithoutSlug };
    expect(landingConfigSchema.safeParse(config).success).toBe(false);
  });

  it("rejects an empty slug string", () => {
    const config = { ...VALID_CONFIG, meta: { ...VALID_CONFIG.meta, slug: "" } };
    expect(landingConfigSchema.safeParse(config).success).toBe(false);
  });

  it("rejects an unknown section type", () => {
    const config = {
      ...VALID_CONFIG,
      sections: [{ type: "unknown-section", title: "?" }],
    };
    expect(landingConfigSchema.safeParse(config).success).toBe(false);
  });

  it("rejects a hero section missing the required title", () => {
    const config = {
      ...VALID_CONFIG,
      sections: [{ type: "hero" }],
    };
    expect(landingConfigSchema.safeParse(config).success).toBe(false);
  });

  it("rejects an empty sections array", () => {
    const config = { ...VALID_CONFIG, sections: [] };
    expect(landingConfigSchema.safeParse(config).success).toBe(false);
  });

  it("rejects an invalid theme.mode value", () => {
    const config = { ...VALID_CONFIG, theme: { ...VALID_CONFIG.theme, mode: "auto" } };
    expect(landingConfigSchema.safeParse(config).success).toBe(false);
  });

  it("rejects a missing theme.primary", () => {
    const { primary: _unused, ...themeWithoutPrimary } = VALID_CONFIG.theme;
    const config = { ...VALID_CONFIG, theme: themeWithoutPrimary };
    expect(landingConfigSchema.safeParse(config).success).toBe(false);
  });

  it("rejects a hex color string", () => {
    const config = { ...VALID_CONFIG, theme: { ...VALID_CONFIG.theme, primary: "#7c5cff" } };
    expect(landingConfigSchema.safeParse(config).success).toBe(false);
  });

  it("rejects rgb() function notation", () => {
    const config = { ...VALID_CONFIG, theme: { ...VALID_CONFIG.theme, primary: "rgb(124, 92, 255)" } };
    expect(landingConfigSchema.safeParse(config).success).toBe(false);
  });

  it("rejects out-of-range channel values", () => {
    const config = { ...VALID_CONFIG, theme: { ...VALID_CONFIG.theme, bg: "300 0 0" } };
    expect(landingConfigSchema.safeParse(config).success).toBe(false);
  });

  it("rejects an invalid optional color field", () => {
    const config = { ...VALID_CONFIG, theme: { ...VALID_CONFIG.theme, surface: "hsl(240 5% 10%)" } };
    expect(landingConfigSchema.safeParse(config).success).toBe(false);
  });
});

/* -------------------------------------------------------------------------- */
/*  parseLandingConfig helper                                                  */
/* -------------------------------------------------------------------------- */

describe("parseLandingConfig", () => {
  it("returns the parsed config on valid input", () => {
    const result = parseLandingConfig(VALID_CONFIG);
    expect(result.meta.slug).toBe("2026-07-18-test");
  });

  it("throws on invalid input", () => {
    expect(() => parseLandingConfig({ broken: true })).toThrow();
  });
});
