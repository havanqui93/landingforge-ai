import { NextResponse } from "next/server";
import { fetchTopStory } from "@/lib/news";
import { generateLanding } from "@/lib/generate-landing";
import {
  isStoreEnabled,
  saveStoredLanding,
  storedLandingExists,
} from "@/lib/store";

/**
 * Daily landing job — invoked by Vercel Cron (see vercel.json).
 *
 * 1. Pulls the top non-sensitive Hacker News story (free, no API key).
 * 2. Generates a templated, fictional-product LandingConfig themed around it.
 * 3. Saves it to Vercel KV so it renders at /l/<slug> and on the index.
 *
 * Runs on demand too: GET /api/cron/daily-landing (protected by CRON_SECRET
 * when that env var is set — Vercel sends it as a Bearer token automatically).
 */

export const dynamic = "force-dynamic";
export const maxDuration = 30;

export async function GET(request: Request): Promise<NextResponse> {
  // Verify the Vercel Cron secret if one is configured.
  const secret = process.env.CRON_SECRET;
  if (secret) {
    const auth = request.headers.get("authorization");
    if (auth !== `Bearer ${secret}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  if (!isStoreEnabled()) {
    return NextResponse.json(
      {
        error:
          "KV store not configured. Add a Vercel KV store and its env vars (KV_REST_API_URL, KV_REST_API_TOKEN).",
      },
      { status: 503 },
    );
  }

  try {
    const story = await fetchTopStory();
    if (!story) {
      return NextResponse.json(
        { error: "No suitable story found today." },
        { status: 502 },
      );
    }

    const dateISO = new Date().toISOString().slice(0, 10);
    let config = generateLanding(story, { dateISO });

    // Avoid clobbering an existing slug if the job runs more than once a day.
    if (await storedLandingExists(config.meta.slug)) {
      config = {
        ...config,
        meta: {
          ...config.meta,
          slug: `${config.meta.slug}-${Date.now().toString(36).slice(-4)}`,
        },
      };
    }

    await saveStoredLanding(config);

    return NextResponse.json({
      ok: true,
      slug: config.meta.slug,
      url: `/l/${config.meta.slug}`,
      source: story.url,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
