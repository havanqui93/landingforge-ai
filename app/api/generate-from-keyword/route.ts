import { NextRequest, NextResponse } from "next/server";
import { generateLanding } from "@/lib/generate-landing";
import {
  isStoreEnabled,
  saveStoredLanding,
  storedLandingExists,
} from "@/lib/store";

export const dynamic = "force-dynamic";
export const maxDuration = 30;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);
    const keyword = ((body?.keyword as string) ?? "").trim();
    if (!keyword) {
      return NextResponse.json({ error: "keyword is required" }, { status: 400 });
    }

    if (!isStoreEnabled()) {
      return NextResponse.json(
        {
          error:
            "KV store not configured. Add a Vercel KV store (KV_REST_API_URL + KV_REST_API_TOKEN) to enable on-demand generation.",
        },
        { status: 503 },
      );
    }

    const dateISO = new Date().toISOString().slice(0, 10);
    let config = generateLanding({ title: keyword, points: 0 }, { dateISO });

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
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
