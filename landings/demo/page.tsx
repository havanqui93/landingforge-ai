import { LandingRenderer } from "@/components/LandingRenderer";
import config from "./config";

/**
 * Thin renderer for the demo landing. This file is intentionally tiny —
 * all content lives in config.ts. The canonical public URL is /l/demo
 * (see app/l/[slug]/page.tsx); this co-located page keeps each landing
 * self-contained and independently importable.
 */
export default function DemoLandingPage() {
  return <LandingRenderer config={config} />;
}
