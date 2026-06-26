import { NextResponse } from "next/server";
import { fetchTopStory } from "@/lib/news";
import { generateLandingFromKeyword } from "@/lib/ai-generate-landing";
import { getLanding } from "@/lib/registry";
import { safeParseLandingConfig } from "@/lib/landing.schema";
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
export const maxDuration = 60;

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
    let config = await generateLandingFromKeyword(story.title, dateISO);

    // Never shadow a static registry slug (the registry wins in resolveLanding,
    // which would make the stored landing unreachable) and don't clobber an
    // existing stored slug if the job runs more than once a day.
    const collides = async (slug: string) =>
      Boolean(getLanding(slug)) || (await storedLandingExists(slug));

    if (await collides(config.meta.slug)) {
      const suffix = Date.now().toString(36).slice(-4);
      config = {
        ...config,
        meta: { ...config.meta, slug: `${config.meta.slug}-${suffix}` },
      };
    }

    // Belt-and-suspenders: validate the final config before it reaches KV so a
    // malformed generator output can never persist as a broken page.
    const parsed = safeParseLandingConfig(config);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Generated config failed validation", issues: parsed.error.issues },
        { status: 500 },
      );
    }

    await saveStoredLanding(parsed.data);

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
