/**
 * The sitemap and robots routes are registry-driven, so they must stay in sync
 * with the landings without anyone remembering to update them.
 */
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import sitemap from "@/app/sitemap";
import robots from "@/app/robots";
import { getAllSlugs } from "@/lib/registry";

const prev = process.env.NEXT_PUBLIC_SITE_URL;
beforeAll(() => {
  process.env.NEXT_PUBLIC_SITE_URL = "https://example.com";
});
afterAll(() => {
  if (prev === undefined) delete process.env.NEXT_PUBLIC_SITE_URL;
  else process.env.NEXT_PUBLIC_SITE_URL = prev;
});

describe("sitemap", () => {
  it("includes the homepage and one entry per registered landing", () => {
    const entries = sitemap();
    expect(entries.length).toBe(getAllSlugs().length + 1);
    const urls = entries.map((e) => e.url);
    expect(urls).toContain("https://example.com/");
    for (const slug of getAllSlugs()) {
      expect(urls).toContain(`https://example.com/l/${slug}`);
    }
  });

  it("uses absolute https URLs", () => {
    for (const e of sitemap()) {
      expect(e.url).toMatch(/^https:\/\//);
    }
  });
});

describe("robots", () => {
  it("disallows admin/auth/api surfaces and points at the sitemap", () => {
    const result = robots();
    const rules = Array.isArray(result.rules) ? result.rules[0]! : result.rules!;
    const disallow = ([] as string[]).concat(rules.disallow ?? []);
    expect(disallow).toEqual(
      expect.arrayContaining(["/admin", "/trendpage", "/api"]),
    );
    expect(result.sitemap).toBe("https://example.com/sitemap.xml");
  });
});
