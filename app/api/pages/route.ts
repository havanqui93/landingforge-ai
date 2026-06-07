import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { savePageSchema } from "@/lib/validators";
import { uniqueSlug } from "@/lib/slug";
import { ok, fail, handleError } from "@/lib/api";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// GET /api/pages → list all pages (newest first).
export async function GET() {
  try {
    const pages = await prisma.landingPage.findMany({
      orderBy: { createdAt: "desc" },
    });
    return ok(pages);
  } catch (err) {
    return handleError(err);
  }
}

// POST /api/pages → persist a generated page.
export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);
    if (!body) return fail("Request body must be valid JSON", 400);

    const input = savePageSchema.parse(body);
    const content = input.content;

    // Derive a unique slug from the AI slug (or title/keyword fallback).
    const slug = await uniqueSlug(content.slug || content.title || input.keyword);

    const isPublished = input.status === "published";
    const page = await prisma.landingPage.create({
      data: {
        slug,
        keyword: input.keyword,
        description: input.description || null,
        title: content.title,
        metaTitle: content.metaTitle,
        metaDescription: content.metaDescription,
        contentJson: content,
        status: input.status,
        category: input.category || null,
        country: input.country || null,
        source: input.source || null,
        sourceUrl: input.sourceUrl || null,
        publishedAt: isPublished ? new Date() : null,
      },
    });

    return ok(page, 201);
  } catch (err) {
    return handleError(err);
  }
}
