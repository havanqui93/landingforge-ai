/**
 * Editorial-template registry — mirrors lib/registry.ts but for the
 * magazine-style template (lib/editorial.types.ts, components/editorial/*).
 * Kept as a separate list so the two templates can evolve independently.
 *
 * Adding an editorial landing:
 *   1. create  /landings-editorial/<slug>/config.ts  (export default an EditorialConfig)
 *   2. add one entry to `editorialLandings` below
 *
 * The dynamic route /e/[slug] and the /e gallery both read from here.
 */

import type { EditorialConfig } from "./editorial.types";
import almanac from "@/landings-editorial/almanac/config";

export interface EditorialRegistryEntry {
  slug: string;
  config: EditorialConfig;
}

export const editorialLandings: EditorialRegistryEntry[] = [
  { slug: almanac.meta.slug, config: almanac },
  // 👇 add new editorial landings here
];

export function getEditorialLanding(slug: string): EditorialConfig | undefined {
  return editorialLandings.find((l) => l.slug === slug)?.config;
}

export function getAllEditorialSlugs(): string[] {
  return editorialLandings.map((l) => l.slug);
}
