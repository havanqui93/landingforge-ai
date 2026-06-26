/**
 * Negative-path coverage for the runtime LandingConfig schema. The registry
 * test proves valid configs pass; these prove the validator actually rejects
 * the malformed AI output it exists to catch.
 */
import { describe, it, expect } from "vitest";
import { landingConfigSchema, rgbTriple } from "@/lib/landing.schema";

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
