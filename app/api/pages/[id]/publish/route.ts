import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { pageStatusSchema } from "@/lib/validators";
import { ok, fail, handleError } from "@/lib/api";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Params = { params: { id: string } };

// PATCH /api/pages/[id]/publish → set status. Body: { status?: "published" | "draft" }.
// Defaults to "published" when no status is provided.
export async function PATCH(req: NextRequest, { params }: Params) {
  try {
    const existing = await prisma.landingPage.findUnique({
      where: { id: params.id },
      select: { id: true, status: true },
    });
    if (!existing) return fail("Page not found", 404);

    const body = await req.json().catch(() => ({}));
    const status = pageStatusSchema.catch("published").parse(body?.status ?? "published");

    const page = await prisma.landingPage.update({
      where: { id: params.id },
      data: {
        status,
        publishedAt:
          status === "published"
            ? existing.status === "published"
              ? undefined
              : new Date()
            : null,
      },
    });
    return ok(page);
  } catch (err) {
    return handleError(err);
  }
}
