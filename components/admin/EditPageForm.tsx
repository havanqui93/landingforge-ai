"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { GeneratedLandingPage } from "@/types/landing-page";

export type EditablePage = {
  id: string;
  keyword: string;
  description: string | null;
  category: string | null;
  country: string | null;
  status: string;
  content: GeneratedLandingPage;
};

const inputClass =
  "w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500";

export function EditPageForm({ page }: { page: EditablePage }) {
  const router = useRouter();
  const c = page.content;

  const [keyword, setKeyword] = useState(page.keyword);
  const [description, setDescription] = useState(page.description ?? "");
  const [category, setCategory] = useState(page.category ?? "");
  const [country, setCountry] = useState(page.country ?? "");
  const [status, setStatus] = useState(page.status);

  const [title, setTitle] = useState(c.title);
  const [metaTitle, setMetaTitle] = useState(c.metaTitle);
  const [metaDescription, setMetaDescription] = useState(c.metaDescription);
  const [heroHeadline, setHeroHeadline] = useState(c.heroHeadline);
  const [heroSubheadline, setHeroSubheadline] = useState(c.heroSubheadline);
  const [summary, setSummary] = useState(c.summary);
  const [whyTrending, setWhyTrending] = useState(c.whyTrending);
  const [ctaTitle, setCtaTitle] = useState(c.ctaTitle);
  const [ctaDescription, setCtaDescription] = useState(c.ctaDescription);

  // Sections / FAQs / related keywords edited as JSON for MVP simplicity.
  const [advanced, setAdvanced] = useState(() =>
    JSON.stringify(
      {
        sections: c.sections,
        faqs: c.faqs,
        relatedKeywords: c.relatedKeywords,
      },
      null,
      2,
    ),
  );

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    let adv: Pick<
      GeneratedLandingPage,
      "sections" | "faqs" | "relatedKeywords"
    >;
    try {
      adv = JSON.parse(advanced);
    } catch {
      setError("Sections/FAQs JSON is invalid.");
      return;
    }

    const content: GeneratedLandingPage = {
      ...c,
      title,
      slug: c.slug,
      metaTitle,
      metaDescription,
      heroHeadline,
      heroSubheadline,
      summary,
      whyTrending,
      ctaTitle,
      ctaDescription,
      sections: adv.sections ?? c.sections,
      faqs: adv.faqs ?? c.faqs,
      relatedKeywords: adv.relatedKeywords ?? c.relatedKeywords,
    };

    setSaving(true);
    try {
      const res = await fetch(`/api/pages/${page.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          keyword,
          description: description || null,
          category: category || null,
          country: country || null,
          status,
          content,
        }),
      });
      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || "Save failed");
      }
      router.push("/admin/pages");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Keyword">
          <input className={inputClass} value={keyword} onChange={(e) => setKeyword(e.target.value)} />
        </Field>
        <Field label="Status">
          <select className={inputClass} value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="draft">draft</option>
            <option value="published">published</option>
          </select>
        </Field>
        <Field label="Category">
          <input className={inputClass} value={category} onChange={(e) => setCategory(e.target.value)} />
        </Field>
        <Field label="Country">
          <input className={inputClass} value={country} onChange={(e) => setCountry(e.target.value)} />
        </Field>
      </div>

      <Field label="Description">
        <textarea className={inputClass} rows={2} value={description} onChange={(e) => setDescription(e.target.value)} />
      </Field>

      <hr className="border-slate-200" />

      <Field label="Title">
        <input className={inputClass} value={title} onChange={(e) => setTitle(e.target.value)} />
      </Field>
      <Field label="Meta title">
        <input className={inputClass} value={metaTitle} onChange={(e) => setMetaTitle(e.target.value)} />
      </Field>
      <Field label="Meta description">
        <textarea className={inputClass} rows={2} value={metaDescription} onChange={(e) => setMetaDescription(e.target.value)} />
      </Field>
      <Field label="Hero headline">
        <input className={inputClass} value={heroHeadline} onChange={(e) => setHeroHeadline(e.target.value)} />
      </Field>
      <Field label="Hero subheadline">
        <textarea className={inputClass} rows={2} value={heroSubheadline} onChange={(e) => setHeroSubheadline(e.target.value)} />
      </Field>
      <Field label="Summary">
        <textarea className={inputClass} rows={3} value={summary} onChange={(e) => setSummary(e.target.value)} />
      </Field>
      <Field label="Why trending">
        <textarea className={inputClass} rows={3} value={whyTrending} onChange={(e) => setWhyTrending(e.target.value)} />
      </Field>
      <Field label="CTA title">
        <input className={inputClass} value={ctaTitle} onChange={(e) => setCtaTitle(e.target.value)} />
      </Field>
      <Field label="CTA description">
        <textarea className={inputClass} rows={2} value={ctaDescription} onChange={(e) => setCtaDescription(e.target.value)} />
      </Field>

      <Field label="Sections, FAQs & related keywords (JSON)">
        <textarea
          className={`${inputClass} font-mono text-xs`}
          rows={12}
          value={advanced}
          onChange={(e) => setAdvanced(e.target.value)}
        />
      </Field>

      {error ? (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
      ) : null}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={saving}
          className="rounded-lg bg-indigo-600 px-5 py-2.5 font-semibold text-white shadow-sm transition hover:bg-indigo-700 disabled:opacity-50"
        >
          {saving ? "Saving…" : "Save changes"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/pages")}
          className="rounded-lg border border-slate-300 px-5 py-2.5 font-medium text-slate-700 transition hover:bg-slate-50"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-slate-700">{label}</span>
      {children}
    </label>
  );
}
