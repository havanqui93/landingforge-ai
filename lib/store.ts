/**
 * Store for runtime-generated landings.
 *
 * The daily Vercel Cron job (app/api/cron/daily-landing) writes a fresh
 * LandingConfig here each morning. The index page and /l/[slug] read from
 * here in addition to the static, file-based registry (lib/registry.ts).
 *
 * Vercel serverless functions can't write files into the deployed bundle, so
 * generated landings live in Vercel KV instead of as committed config.ts files.
 *
 * When KV isn't configured in local dev, writes fall back to a small JSON file
 * so on-demand generation can be tested without Vercel credentials. Production
 * still requires Vercel KV.
 */

import { kv } from "@vercel/kv";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import type { LandingConfig } from "./landing.types";

/** Sorted set of slugs, scored by creation time (newest first via rev). */
const INDEX_KEY = "landings:index";
const landingKey = (slug: string) => `landing:${slug}`;

interface LocalStore {
  index: string[];
  landings: Record<string, LandingConfig>;
}

const LOCAL_STORE_DIR = ".landingforge-store";
const LOCAL_STORE_FILE = "landings.json";
const localStorePath = () =>
  path.join(process.cwd(), LOCAL_STORE_DIR, LOCAL_STORE_FILE);

/** KV is only usable when Vercel injected its REST credentials. */
function hasKvStore(): boolean {
  return Boolean(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);
}

function hasLocalStore(): boolean {
  return (
    process.env.NODE_ENV !== "production" &&
    process.env.LANDINGFORGE_LOCAL_STORE !== "0"
  );
}

export function isStoreEnabled(): boolean {
  return hasKvStore() || hasLocalStore();
}

export async function saveStoredLanding(config: LandingConfig): Promise<void> {
  if (hasKvStore()) {
    await kv.set(landingKey(config.meta.slug), config);
    await kv.zadd(INDEX_KEY, { score: Date.now(), member: config.meta.slug });
    return;
  }

  if (hasLocalStore()) {
    await saveLocalLanding(config);
    return;
  }

  throw new Error("KV store is not configured");
}

export async function getStoredLanding(
  slug: string,
): Promise<LandingConfig | undefined> {
  if (hasKvStore()) {
    const config = await kv.get<LandingConfig>(landingKey(slug));
    return config ?? undefined;
  }

  if (hasLocalStore()) {
    const store = await readLocalStore();
    return store.landings[slug];
  }

  return undefined;
}

/** Slugs of stored landings, newest first. */
export async function getStoredSlugs(): Promise<string[]> {
  if (hasKvStore()) {
    const slugs = await kv.zrange<string[]>(INDEX_KEY, 0, -1, { rev: true });
    return slugs ?? [];
  }

  if (hasLocalStore()) {
    const store = await readLocalStore();
    return store.index;
  }

  return [];
}

/** Full stored landing configs, newest first. */
export async function getStoredLandings(): Promise<LandingConfig[]> {
  const slugs = await getStoredSlugs();
  if (slugs.length === 0) return [];
  const configs = await Promise.all(slugs.map((slug) => getStoredLanding(slug)));
  return configs.filter((c): c is LandingConfig => Boolean(c));
}

export async function storedLandingExists(slug: string): Promise<boolean> {
  if (hasKvStore()) {
    return (await kv.exists(landingKey(slug))) === 1;
  }

  if (hasLocalStore()) {
    const store = await readLocalStore();
    return Object.prototype.hasOwnProperty.call(store.landings, slug);
  }

  return false;
}

async function saveLocalLanding(config: LandingConfig): Promise<void> {
  const store = await readLocalStore();
  const slug = config.meta.slug;
  store.landings[slug] = config;
  store.index = [slug, ...store.index.filter((item) => item !== slug)];
  await writeLocalStore(store);
}

async function readLocalStore(): Promise<LocalStore> {
  try {
    const raw = await readFile(localStorePath(), "utf8");
    const parsed = JSON.parse(raw) as Partial<LocalStore>;
    return {
      index: Array.isArray(parsed.index) ? parsed.index : [],
      landings:
        parsed.landings && typeof parsed.landings === "object"
          ? (parsed.landings as Record<string, LandingConfig>)
          : {},
    };
  } catch (err) {
    const code = err instanceof Error && "code" in err ? err.code : undefined;
    if (code === "ENOENT") {
      return { index: [], landings: {} };
    }
    throw err;
  }
}

async function writeLocalStore(store: LocalStore): Promise<void> {
  await mkdir(path.dirname(localStorePath()), { recursive: true });
  await writeFile(localStorePath(), `${JSON.stringify(store, null, 2)}\n`);
}
