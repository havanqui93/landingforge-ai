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
  // death / fatality variants
  "death",
  "deaths",
  "dead",
  "deadly",
  "dies",
  "died",
  // kill variants
  "kill",
  "kills",
  "killed",
  "killing",
  "killings",
  // violence
  "murder",
  "murders",
  "murdered",
  "suicide",
  "war",
  "attack",
  "attacks",
  "shooting",
  "shoot",
  "bomb",
  "bombing",
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

/** Escape regex metacharacters so blocklist entries match literally. */
function escapeRegExp(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Whole-word matcher for the blocklist. Substring matching (the old approach)
 * wrongly flagged benign tech stories — "war" matched "software"/"hardware",
 * "hack" matched "hackathon" (and Hacker News itself), "dead" matched
 * "deadline". Word boundaries keep the intent (block "war", "hack", "dead")
 * without swallowing unrelated words that merely contain those letters.
 */
const SENSITIVE_PATTERN = new RegExp(
  `\\b(?:${SENSITIVE.map(escapeRegExp).join("|")})\\b`,
  "i",
);

export function isSensitive(title: string): boolean {
  return SENSITIVE_PATTERN.test(title);
}

export interface AlgoliaHit {
  title: string | null;
  url: string | null;
  points: number | null;
}

/**
 * Pure selection logic: filter, sanitise, sort, and return the top story from
 * a list of raw Algolia hits. Extracted from fetchTopStory so it can be unit-
 * tested without network access.
 */
export function selectTopStory(hits: AlgoliaHit[]): NewsItem | null {
  const candidates = hits
    .filter((h): h is { title: string; url: string; points: number } =>
      Boolean(h.title && h.url),
    )
    .map((h) => ({ title: h.title, url: h.url, points: h.points ?? 0 }))
    .filter((h) => !isSensitive(h.title))
    .sort((a, b) => b.points - a.points);

  return candidates[0] ?? null;
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
  return selectTopStory(data.hits ?? []);
}
