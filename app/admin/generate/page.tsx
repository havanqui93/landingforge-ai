import { GeneratePageForm } from "@/components/admin/GeneratePageForm";

export const dynamic = "force-dynamic";

export default function GeneratePage() {
  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight">Generate a page</h1>
      <p className="mt-1 text-sm text-slate-500">
        Enter a keyword and description. AI drafts a full SEO landing page you
        can review, then save or publish.
      </p>
      <div className="mt-8">
        <GeneratePageForm />
      </div>
    </div>
  );
}
