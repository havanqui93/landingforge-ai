import { NextResponse } from "next/server";
import { fetchTopStory } from "@/lib/news";

export const dynamic = "force-dynamic";
export const maxDuration = 15;

export async function GET() {
  try {
    const story = await fetchTopStory();
    if (!story) {
      return NextResponse.json(
        { error: "No suitable trending story found." },
        { status: 404 },
      );
    }
    return NextResponse.json({ keyword: story.title, url: story.url });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
