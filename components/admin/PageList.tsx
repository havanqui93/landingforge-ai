"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export type PageRow = {
  id: string;
  title: string;
  keyword: string;
  slug: string;
  status: string;
  createdAt: string;
};

export function PageList({ pages }: { pages: PageRow[] }) {
  const router = useRouter();
  const [busyId, setBusyId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function call(url: string, init: RequestInit, id: string) {
    setBusyId(id);
    setError(null);
    try {
      const res = await fetch(url, init);
      const json = await res.json().catch(() => ({}));
      if (!res.ok || json.success === false) {
        throw new Error(json.error || "Request failed");
      }
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Request failed");
    } finally {
      setBusyId(null);
    }
  }

  function setStatus(id: string, status: "published" | "draft") {
    return call(
      `/api/pages/${id}/publish`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      },
      id,
    );
  }

  function remove(id: string) {
    if (!confirm("Delete this page? This cannot be undone.")) return;
    return call(`/api/pages/${id}`, { method: "DELETE" }, id);
  }

  if (!pages.length) {
    return (
      <p className="rounded-xl border border-dashed border-slate-300 p-8 text-center text-slate-400">
        No pages yet.{" "}
        <Link href="/admin/generate" className="text-indigo-600 underline">
          Generate your first page.
        </Link>
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {error ? (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      ) : null}
      <div className="overflow-x-auto rounded-xl border border-slate-200">
        <table className="min-w-full divide-y divide-slate-200 text-sm">
          <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Keyword</th>
              <th className="px-4 py-3">Slug</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Created</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {pages.map((p) => {
              const published = p.status === "published";
              const busy = busyId === p.id;
              return (
                <tr key={p.id} className="text-slate-700">
                  <td className="max-w-[16rem] truncate px-4 py-3 font-medium text-slate-900">
                    {p.title}
                  </td>
                  <td className="px-4 py-3">{p.keyword}</td>
                  <td className="px-4 py-3 font-mono text-xs text-slate-500">
                    {p.slug}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                        published
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {p.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-500">
                    {new Date(p.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2 text-xs">
                      {published ? (
                        <a
                          href={`/trends/${p.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-indigo-600 hover:underline"
                        >
                          View
                        </a>
                      ) : null}
                      <Link
                        href={`/admin/pages/${p.id}/edit`}
                        className="text-slate-600 hover:underline"
                      >
                        Edit
                      </Link>
                      {published ? (
                        <button
                          disabled={busy}
                          onClick={() => setStatus(p.id, "draft")}
                          className="text-amber-600 hover:underline disabled:opacity-50"
                        >
                          Unpublish
                        </button>
                      ) : (
                        <button
                          disabled={busy}
                          onClick={() => setStatus(p.id, "published")}
                          className="text-emerald-600 hover:underline disabled:opacity-50"
                        >
                          Publish
                        </button>
                      )}
                      <button
                        disabled={busy}
                        onClick={() => remove(p.id)}
                        className="text-red-600 hover:underline disabled:opacity-50"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
