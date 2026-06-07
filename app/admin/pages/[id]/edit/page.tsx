import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import type { GeneratedLandingPage } from "@/types/landing-page";
import { EditPageForm } from "@/components/admin/EditPageForm";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Params = { params: { id: string } };

export default async function EditPage({ params }: Params) {
  const page = await prisma.landingPage.findUnique({
    where: { id: params.id },
  });
  if (!page) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight">Edit page</h1>
      <p className="mt-1 font-mono text-sm text-slate-500">/trends/{page.slug}</p>
      <div className="mt-8">
        <EditPageForm
          page={{
            id: page.id,
            keyword: page.keyword,
            description: page.description,
            category: page.category,
            country: page.country,
            status: page.status,
            content: page.contentJson as unknown as GeneratedLandingPage,
          }}
        />
      </div>
    </div>
  );
}
