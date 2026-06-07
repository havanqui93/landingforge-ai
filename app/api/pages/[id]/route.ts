import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { updatePageSchema } from "@/lib/validators";
import { ok, fail, handleError } from "@/lib/api";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Params = { params: { id: string } };

// GET /api/pages/[id] → fetch a single page.
export async function GET(_req: NextRequest, { params }: Params) {
  try {
    const page = await prisma.landingPage.findUnique({
      where: { id: params.id },
    });
    if (!page) return fail("Page not found", 404);
    return ok(page);
  } catch (err) {
    return handleError(err);
  }
}

// PATCH /api/pages/[id] → update editable fields and/or content.
export async function PATCH(req: NextRequest, { params }: Params) {
  try {
    const existing = await prisma.landingPage.findUnique({
      where: { id: params.id },
      select: { id: true, status: true },
    });
    if (!existing) return fail("Page not found", 404);

    const body = await req.json().catch(() => null);
    if (!body) return fail("Request body must be valid JSON", 400);
    const input = updatePageSchema.parse(body);

    const data: Record<string, unknown> = {};
    if (input.keyword !== undefined) data.keyword = input.keyword;
    if (input.description !== undefined) data.description = input.description || null;
    if (input.category !== undefined) data.category = input.category || null;
    if (input.country !== undefined) data.country = input.country || null;
    if (input.source !== undefined) data.source = input.source || null;
    if (input.sourceUrl !== undefined) data.sourceUrl = input.sourceUrl || null;

    if (input.content) {
      data.contentJson = input.content;
      data.title = input.content.title;
      data.metaTitle = input.content.metaTitle;
      data.metaDescription = input.content.metaDescription;
    }

    if (input.status !== undefined) {
      data.status = input.status;
      // Set publishedAt the first time we publish; clear it when unpublishing.
      if (input.status === "published" && existing.status !== "published") {
        data.publishedAt = new Date();
      } else if (input.status === "draft") {
        data.publishedAt = null;
      }
    }

    const page = await prisma.landingPage.update({
      where: { id: params.id },
      data,
    });
    return ok(page);
  } catch (err) {
    return handleError(err);
  }
}

// DELETE /api/pages/[id] → remove a page.
export async function DELETE(_req: NextRequest, { params }: Params) {
  try {
    await prisma.landingPage.delete({ where: { id: params.id } });
    return ok({ id: params.id, deleted: true });
  } catch (err) {
    return handleError(err);
  }
}
