import type { MetadataRoute } from "next";
import { getAllSlugs } from "@/lib/registry";
import { absoluteUrl } from "@/lib/site";

/**
 * Sitemap for the file-based landings (System A).
 *
 * Store-backed landings (the daily KV job) are intentionally omitted: the
 * sitemap is statically generated and KV may be empty at build time. Add them
 * here if/when the store exposes a synchronous slug list.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const home: MetadataRoute.Sitemap[number] = {
    url: absoluteUrl("/"),
    lastModified: now,
    changeFrequency: "daily",
    priority: 1,
  };

  const landings: MetadataRoute.Sitemap = getAllSlugs().map((slug) => ({
    url: absoluteUrl(`/l/${slug}`),
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [home, ...landings];
}
