import { NextRequest } from "next/server";
import { deleteStoredLanding, storedLandingExists } from "@/lib/store";
import { ok, fail, handleError } from "@/lib/api";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Params = { params: { slug: string } };

export async function DELETE(_req: NextRequest, { params }: Params) {
  try {
    const exists = await storedLandingExists(params.slug);
    if (!exists) return fail("Landing not found", 404);
    await deleteStoredLanding(params.slug);
    return ok({ slug: params.slug, deleted: true });
  } catch (err) {
    return handleError(err);
  }
}
