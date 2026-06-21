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
import nexus from "@/landings/nexus/config";
import bloom from "@/landings/bloom/config";
import orbit from "@/landings/orbit/config";
import pulsewave from "@/landings/pulsewave/config";
import stillpoint from "@/landings/stillpoint/config";
import ledgerly from "@/landings/ledgerly/config";
import cortex from "@/landings/cortex/config";
import roastline from "@/landings/roastline/config";

export interface RegistryEntry {
  slug: string;
  config: LandingConfig;
}

export const landings: RegistryEntry[] = [
  { slug: demo.meta.slug, config: demo },
  { slug: photonicAi20260606.meta.slug, config: photonicAi20260606 },
  { slug: vang.meta.slug, config: vang },
  { slug: nexus.meta.slug, config: nexus },
  { slug: bloom.meta.slug, config: bloom },
  { slug: orbit.meta.slug, config: orbit },
  { slug: pulsewave.meta.slug, config: pulsewave },
  { slug: stillpoint.meta.slug, config: stillpoint },
  { slug: ledgerly.meta.slug, config: ledgerly },
  { slug: cortex.meta.slug, config: cortex },
  { slug: roastline.meta.slug, config: roastline },
  // 👇 add new landings here, e.g.  { slug: acme.meta.slug, config: acme },
];

export function getLanding(slug: string): LandingConfig | undefined {
  return landings.find((l) => l.slug === slug)?.config;
}

export function getAllSlugs(): string[] {
  return landings.map((l) => l.slug);
}
