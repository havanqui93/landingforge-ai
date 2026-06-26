/**
 * Negative-path coverage for the runtime LandingConfig schema. The registry
 * test proves valid configs pass; these prove the validator actually rejects
 * the malformed AI output it exists to catch.
 */
import { describe, it, expect } from "vitest";
import { landingConfigSchema, rgbTriple, sectionSchema } from "@/lib/landing.schema";

// The one canonical set of section types. Keep in lockstep with the
// `Section` union (landing.types.ts), the renderer switch, and the registry
// test's SECTION_TYPES list. The lockstep test below fails if the Zod union
// drifts from this.
const CANONICAL_SECTION_TYPES = [
  "cta",
  "faq",
  "features",
  "footer",
  "hero",
  "logos",
  "pricing",
  "stats",
  "testimonials",
].sort();

const valid = {
  meta: { slug: "ok", title: "Title", description: "Desc" },
  theme: { primary: "124 92 255", bg: "9 9 19", mode: "dark" },
  sections: [
    { type: "hero", title: "Hi" },
    { type: "footer", brand: "Brand" },
  ],
};

describe("landingConfigSchema rejects malformed configs", () => {
  it("accepts a well-formed config", () => {
    expect(landingConfigSchema.safeParse(valid).success).toBe(true);
  });

  it("rejects an unknown section type", () => {
    const bad = { ...valid, sections: [{ type: "carousel", title: "x" }] };
    expect(landingConfigSchema.safeParse(bad).success).toBe(false);
  });

  it("rejects a missing required field (footer.brand)", () => {
    const bad = {
      ...valid,
      sections: [{ type: "hero", title: "Hi" }, { type: "footer" }],
    };
    expect(landingConfigSchema.safeParse(bad).success).toBe(false);
  });

  it("rejects a non-RGB color", () => {
    const bad = { ...valid, theme: { ...valid.theme, primary: "#7c5cff" } };
    expect(landingConfigSchema.safeParse(bad).success).toBe(false);
  });

  it("rejects an out-of-range color channel", () => {
    expect(rgbTriple.safeParse("300 0 0").success).toBe(false);
    expect(rgbTriple.safeParse("255 255 255").success).toBe(true);
  });

  it("rejects an invalid theme mode", () => {
    const bad = { ...valid, theme: { ...valid.theme, mode: "auto" } };
    expect(landingConfigSchema.safeParse(bad).success).toBe(false);
  });

  it("rejects empty sections", () => {
    expect(landingConfigSchema.safeParse({ ...valid, sections: [] }).success).toBe(
      false,
    );
  });

  it("Zod discriminated union covers exactly the canonical section types", () => {
    const literals = sectionSchema.options
      .map((opt) => opt.shape.type.value as string)
      .sort();
    expect(literals).toEqual(CANONICAL_SECTION_TYPES);
  });

  it("rejects a features section with no items", () => {
    const bad = {
      ...valid,
      sections: [
        { type: "hero", title: "Hi" },
        { type: "features", title: "F", items: [] },
        { type: "footer", brand: "Brand" },
      ],
    };
    expect(landingConfigSchema.safeParse(bad).success).toBe(false);
  });
});
