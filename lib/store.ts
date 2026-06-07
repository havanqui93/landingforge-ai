/**
 * KV-backed store for runtime-generated landings.
 *
 * The daily Vercel Cron job (app/api/cron/daily-landing) writes a fresh
 * LandingConfig here each morning. The index page and /l/[slug] read from
 * here in addition to the static, file-based registry (lib/registry.ts).
 *
 * Vercel serverless functions can't write files into the deployed bundle, so
 * generated landings live in Vercel KV instead of as committed config.ts files.
 *
 * When KV isn't configured (e.g. local dev without env vars), every read is a
 * no-op returning empty data, so the app still works off the static registry.
 */

import { kv } from "@vercel/kv";
import type { LandingConfig } from "./landing.types";

/** Sorted set of slugs, scored by creation time (newest first via rev). */
const INDEX_KEY = "landings:index";
const landingKey = (slug: string) => `landing:${slug}`;

/** KV is only usable when Vercel injected its REST credentials. */
export function isStoreEnabled(): boolean {
  return Boolean(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);
}

export async function saveStoredLanding(config: LandingConfig): Promise<void> {
  if (!isStoreEnabled()) throw new Error("KV store is not configured");
  await kv.set(landingKey(config.meta.slug), config);
  await kv.zadd(INDEX_KEY, { score: Date.now(), member: config.meta.slug });
}

export async function getStoredLanding(
  slug: string,
): Promise<LandingConfig | undefined> {
  if (!isStoreEnabled()) return undefined;
  const config = await kv.get<LandingConfig>(landingKey(slug));
  return config ?? undefined;
}

/** Slugs of stored landings, newest first. */
export async function getStoredSlugs(): Promise<string[]> {
  if (!isStoreEnabled()) return [];
  const slugs = await kv.zrange<string[]>(INDEX_KEY, 0, -1, { rev: true });
  return slugs ?? [];
}

/** Full stored landing configs, newest first. */
export async function getStoredLandings(): Promise<LandingConfig[]> {
  const slugs = await getStoredSlugs();
  if (slugs.length === 0) return [];
  const configs = await Promise.all(slugs.map((slug) => getStoredLanding(slug)));
  return configs.filter((c): c is LandingConfig => Boolean(c));
}

export async function storedLandingExists(slug: string): Promise<boolean> {
  if (!isStoreEnabled()) return false;
  return (await kv.exists(landingKey(slug))) === 1;
}
