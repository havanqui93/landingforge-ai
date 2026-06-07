import { NextRequest } from "next/server";
import { generatePageSchema } from "@/lib/validators";
import { generateLandingPage } from "@/lib/ai";
import { ok, fail, handleError } from "@/lib/api";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// POST /api/generate-page → run AI generation, return structured content.
// This does NOT persist anything; the client saves via POST /api/pages.
export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);
    if (!body) return fail("Request body must be valid JSON", 400);

    const input = generatePageSchema.parse(body);
    const data = await generateLandingPage({
      keyword: input.keyword,
      description: input.description || undefined,
      category: input.category || undefined,
      country: input.country || undefined,
    });

    return ok(data);
  } catch (err) {
    return handleError(err);
  }
}
