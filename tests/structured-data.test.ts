/**
 * SEO helpers: canonical URL resolution and JSON-LD shape.
 */
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { absoluteUrl, siteUrl } from "@/lib/site";
import { landingJsonLd } from "@/lib/structured-data";
import type { LandingConfig } from "@/lib/landing.types";

const prev = process.env.NEXT_PUBLIC_SITE_URL;
beforeAll(() => {
  process.env.NEXT_PUBLIC_SITE_URL = "https://example.com/";
});
afterAll(() => {
  if (prev === undefined) delete process.env.NEXT_PUBLIC_SITE_URL;
  else process.env.NEXT_PUBLIC_SITE_URL = prev;
});

function config(withFaq: boolean): LandingConfig {
  return {
    meta: { slug: "demo-page", title: "Demo", description: "A demo" },
    theme: { primary: "1 2 3", bg: "0 0 0", mode: "dark" },
    sections: [
      { type: "hero", title: "Hi" },
      ...(withFaq
        ? ([
            {
              type: "faq" as const,
              title: "FAQ",
              items: [{ question: "Q1?", answer: "A1" }],
            },
          ])
        : []),
      { type: "footer", brand: "Brand" },
    ],
  };
}

describe("site URL helpers", () => {
  it("trims trailing slashes from the origin", () => {
    expect(siteUrl()).toBe("https://example.com");
  });

  it("joins paths with a single slash", () => {
    expect(absoluteUrl("/l/demo-page")).toBe("https://example.com/l/demo-page");
    expect(absoluteUrl("sitemap.xml")).toBe("https://example.com/sitemap.xml");
  });
});

describe("landingJsonLd", () => {
  it("always emits a WebPage with the canonical url", () => {
    const ld = landingJsonLd(config(false)) as {
      "@graph": Array<Record<string, unknown>>;
    };
    expect(ld["@graph"]).toHaveLength(1);
    const webpage = ld["@graph"][0]!;
    expect(webpage["@type"]).toBe("WebPage");
    expect(webpage.url).toBe("https://example.com/l/demo-page");
  });

  it("adds a FAQPage when an FAQ section is present", () => {
    const ld = landingJsonLd(config(true)) as {
      "@graph": Array<Record<string, unknown>>;
    };
    expect(ld["@graph"]).toHaveLength(2);
    const faq = ld["@graph"].find((n) => n["@type"] === "FAQPage")!;
    expect(faq).toBeTruthy();
    expect((faq.mainEntity as unknown[]).length).toBe(1);
  });
});
