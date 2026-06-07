/**
 * Landing registry — the single source of truth for every landing page.
 *
 * Adding a landing:
 *   1. create  /landings/<slug>/config.ts  (export default a LandingConfig)
 *   2. create  /landings/<slug>/page.tsx   (thin renderer — optional, for /landings preview)
 *   3. add one entry to `landings` below
 *
 * The dynamic route /l/[slug] and the index page at / both read from here,
 * so registering once wires up routing AND the directory card automatically.
 */

import type { LandingConfig } from "./landing.types";
import demo from "@/landings/demo/config";
import photonicAi20260606 from "@/landings/2026-06-06-photonic-ai/config";
import vang from "@/landings/vang/config";

export interface RegistryEntry {
  slug: string;
  config: LandingConfig;
}

export const landings: RegistryEntry[] = [
  { slug: demo.meta.slug, config: demo },
  { slug: photonicAi20260606.meta.slug, config: photonicAi20260606 },
  { slug: vang.meta.slug, config: vang },
  // 👇 add new landings here, e.g.  { slug: acme.meta.slug, config: acme },
];

export function getLanding(slug: string): LandingConfig | undefined {
  return landings.find((l) => l.slug === slug)?.config;
}

export function getAllSlugs(): string[] {
  return landings.map((l) => l.slug);
}
