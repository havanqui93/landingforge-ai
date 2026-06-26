/**
 * Canonical site URL resolution.
 *
 * Order of preference:
 *   1. NEXT_PUBLIC_SITE_URL — set this in production for stable, canonical URLs.
 *   2. VERCEL_URL           — auto-injected on Vercel deploys/previews.
 *   3. http://localhost:3000 — local dev fallback.
 *
 * Always returns an absolute origin with no trailing slash.
 */
export function siteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/+$/, "");

  const vercel = process.env.VERCEL_URL;
  if (vercel) return `https://${vercel.replace(/\/+$/, "")}`;

  return "http://localhost:3000";
}

/** Build an absolute URL for a path against the canonical origin. */
export function absoluteUrl(path = "/"): string {
  return `${siteUrl()}${path.startsWith("/") ? path : `/${path}`}`;
}
