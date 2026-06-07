import { prisma } from "@/lib/prisma";

// Combining diacritical marks (U+0300–U+036F), used to strip accents.
const DIACRITICS = /[̀-ͯ]/g;

/**
 * Turn an arbitrary string into a clean, URL-safe slug.
 * - lowercase
 * - strip accents/diacritics
 * - remove non-alphanumeric characters
 * - collapse whitespace/separators into single hyphens
 */
export function slugify(input: string): string {
  return input
    .normalize("NFKD")
    .replace(DIACRITICS, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s_-]/g, "") // remove special chars (keep separators)
    .replace(/[\s_-]+/g, "-") // collapse separators to single hyphen
    .replace(/^-+|-+$/g, ""); // trim leading/trailing hyphens
}

/**
 * Produce a slug that is unique in the LandingPage table. If `base` (after
 * slugifying) is taken, append -2, -3, … until a free one is found.
 *
 * `ignoreId` lets an existing page keep/regenerate its own slug without
 * colliding with itself.
 */
export async function uniqueSlug(
  raw: string,
  ignoreId?: string,
): Promise<string> {
  const base = slugify(raw) || "page";
  let candidate = base;
  let suffix = 1;

  // Loop until the candidate is unused (or only used by the page we ignore).
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const existing = await prisma.landingPage.findUnique({
      where: { slug: candidate },
      select: { id: true },
    });
    if (!existing || existing.id === ignoreId) return candidate;
    suffix += 1;
    candidate = `${base}-${suffix}`;
  }
}
