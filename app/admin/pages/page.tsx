import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { PageList, type PageRow } from "@/components/admin/PageList";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export default async function AdminPagesList() {
  let rows: PageRow[] = [];
  let dbError: string | null = null;

  try {
    const pages = await prisma.landingPage.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        title: true,
        keyword: true,
        slug: true,
        status: true,
        createdAt: true,
      },
    });
    rows = pages.map((p) => ({ ...p, createdAt: p.createdAt.toISOString() }));
  } catch (err) {
    dbError =
      err instanceof Error ? err.message : "Could not connect to the database";
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Pages</h1>
        <Link
          href="/admin/generate"
          className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
        >
          + Generate
        </Link>
      </div>
      <div className="mt-8">
        {dbError ? (
          <p className="rounded-lg bg-amber-50 px-4 py-3 text-sm text-amber-800">
            Database unavailable: {dbError}. Set <code>DATABASE_URL</code> and run{" "}
            <code>npm run db:push</code>.
          </p>
        ) : (
          <PageList pages={rows} />
        )}
      </div>
    </div>
  );
}
