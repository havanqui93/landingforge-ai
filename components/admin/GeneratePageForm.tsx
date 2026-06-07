"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { GeneratedLandingPage } from "@/types/landing-page";

type FormState = {
  keyword: string;
  description: string;
  category: string;
  country: string;
};

const inputClass =
  "w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500";

export function GeneratePageForm() {
  const router = useRouter();
  const [form, setForm] = useState<FormState>({
    keyword: "",
    description: "",
    category: "",
    country: "",
  });
  const [generated, setGenerated] = useState<GeneratedLandingPage | null>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState<"draft" | "published" | null>(null);
  const [error, setError] = useState<string | null>(null);

  function update<K extends keyof FormState>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleGenerate(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setGenerated(null);
    setLoading(true);
    try {
      const res = await fetch("/api/generate-page", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || "Generation failed");
      }
      setGenerated(json.data as GeneratedLandingPage);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Generation failed");
    } finally {
      setLoading(false);
    }
  }

  async function handleSave(status: "draft" | "published") {
    if (!generated) return;
    setError(null);
    setSaving(status);
    try {
      const res = await fetch("/api/pages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          keyword: form.keyword,
          description: form.description || null,
          category: form.category || null,
          country: form.country || null,
          status,
          content: generated,
        }),
      });
      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || "Save failed");
      }
      router.push("/admin/pages");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
      setSaving(null);
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      {/* Form */}
      <form onSubmit={handleGenerate} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700">
            Keyword <span className="text-red-500">*</span>
          </label>
          <input
            className={inputClass}
            value={form.keyword}
            onChange={(e) => update("keyword", e.target.value)}
            placeholder="AI video generator for TikTok"
            required
            minLength={2}
            maxLength={120}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">
            Description
          </label>
          <textarea
            className={inputClass}
            value={form.description}
            onChange={(e) => update("description", e.target.value)}
            placeholder="A tool that helps creators generate short viral videos using AI."
            rows={4}
            maxLength={1000}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700">
              Category
            </label>
            <input
              className={inputClass}
              value={form.category}
              onChange={(e) => update("category", e.target.value)}
              placeholder="AI Tools"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">
              Country
            </label>
            <input
              className={inputClass}
              value={form.country}
              onChange={(e) => update("country", e.target.value)}
              placeholder="Global"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading || form.keyword.trim().length < 2}
          className="w-full rounded-lg bg-indigo-600 px-4 py-2.5 font-semibold text-white shadow-sm transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Generating…" : "Generate Page"}
        </button>

        {error ? (
          <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </p>
        ) : null}
      </form>

      {/* Preview */}
      <div className="rounded-xl border border-slate-200 bg-white p-6">
        {!generated ? (
          <p className="text-sm text-slate-400">
            Generated content preview will appear here.
          </p>
        ) : (
          <div className="space-y-4">
            <Preview label="Title" value={generated.title} />
            <Preview label="Slug" value={`/trends/${generated.slug}`} mono />
            <Preview label="Meta title" value={generated.metaTitle} />
            <Preview label="Meta description" value={generated.metaDescription} />
            <Preview label="Hero headline" value={generated.heroHeadline} />
            <Preview label="Summary" value={generated.summary} />
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Sections
              </p>
              <ul className="mt-1 list-disc pl-5 text-sm text-slate-600">
                {generated.sections.map((s, i) => (
                  <li key={i}>{s.heading}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                FAQs ({generated.faqs.length})
              </p>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => handleSave("draft")}
                disabled={saving !== null}
                className="flex-1 rounded-lg border border-slate-300 px-4 py-2 font-medium text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
              >
                {saving === "draft" ? "Saving…" : "Save Draft"}
              </button>
              <button
                onClick={() => handleSave("published")}
                disabled={saving !== null}
                className="flex-1 rounded-lg bg-emerald-600 px-4 py-2 font-medium text-white transition hover:bg-emerald-700 disabled:opacity-50"
              >
                {saving === "published" ? "Publishing…" : "Publish"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Preview({
  label,
  value,
  mono,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
        {label}
      </p>
      <p className={`mt-0.5 text-sm text-slate-700 ${mono ? "font-mono" : ""}`}>
        {value}
      </p>
    </div>
  );
}
