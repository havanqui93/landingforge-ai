import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";

/**
 * Allow indexing of public pages; keep the System B admin/auth surfaces out of
 * search results. Points crawlers at the generated sitemap.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/trendpage", "/api", "/login", "/register"],
    },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
