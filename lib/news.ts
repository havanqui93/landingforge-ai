/**
 * Free news source for the daily landing job — Hacker News front page via the
 * public Algolia API (no API key required).
 *
 * Returns one upbeat, non-sensitive story to theme a fictional product around.
 * The headline is used only as *inspiration* (see editorial guardrails in
 * CLAUDE.md) — we never reproduce article text.
 */

export interface NewsItem {
  title: string;
  url?: string;
  points: number;
}

const FRONT_PAGE =
  "https://hn.algolia.com/api/v1/search?tags=front_page&hitsPerPage=40";

/** Lowercase substrings that mark a story as too sensitive/tragic to theme. */
const SENSITIVE = [
  "death",
  "dead",
  "dies",
  "died",
  "kill",
  "murder",
  "suicide",
  "war",
  "attack",
  "shooting",
  "shoot",
  "bomb",
  "terror",
  "crash",
  "disaster",
  "victim",
  "abuse",
  "assault",
  "disease",
  "cancer",
  "covid",
  "outbreak",
  "layoff",
  "lawsuit",
  "scandal",
  "fraud",
  "hack",
  "breach",
  "election",
  "war crime",
  "genocide",
  "famine",
  "refugee",
];

/**
 * Match each blocklist term at a word boundary (start of a word), so inflections
 * are still caught ("kill" → "killed", "attack" → "attacks") without the naive
 * substring false positives that flagged benign words ("software" → "war",
 * "award", "swarm", "skill").
 */
const SENSITIVE_RE = new RegExp(
  `\\b(?:${SENSITIVE.map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`,
  "i",
);

export function isSensitive(title: string): boolean {
  return SENSITIVE_RE.test(title);
}

interface AlgoliaHit {
  title: string | null;
  url: string | null;
  points: number | null;
}

/**
 * Fetch the HN front page and return the highest-ranked story that has a title,
 * a link, and no sensitive keywords. Returns null if nothing suitable is found.
 */
export async function fetchTopStory(): Promise<NewsItem | null> {
  const res = await fetch(FRONT_PAGE, {
    headers: { accept: "application/json" },
    // Always fetch fresh news at job time.
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`HN fetch failed: ${res.status}`);

  const data = (await res.json()) as { hits?: AlgoliaHit[] };
  const candidates = (data.hits ?? [])
    .filter((h): h is { title: string; url: string; points: number } =>
      Boolean(h.title && h.url),
    )
    .map((h) => ({ title: h.title, url: h.url, points: h.points ?? 0 }))
    .filter((h) => !isSensitive(h.title))
    .sort((a, b) => b.points - a.points);

  return candidates[0] ?? null;
}
