"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Eye, Trash2, Layers, Search } from "lucide-react";
import { useToast } from "@/components/forge/Toast";

export type AdminPage = {
  slug: string;
  title: string;
  description: string;
  source: "cron" | "ai" | "manual";
  status: "published" | "draft";
  category: string;
  sections: string[];
  createdAt: string;
  /** false for registry (file-based) pages which cannot be deleted via API */
  deletable: boolean;
};

type StatusFilter = "all" | "published" | "draft";
type SourceFilter = "all" | "ai" | "manual" | "cron";

const ITEMS_PER_PAGE = 10;

export function PagesTableUI({ initialPages }: { initialPages: AdminPage[] }) {
  const { toast } = useToast();
  const [pages, setPages] = useState(initialPages);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [sourceFilter, setSourceFilter] = useState<SourceFilter>("all");
  const [currentPage, setCurrentPage] = useState(1);

  // Filter
  const filtered = useMemo(() => {
    return pages.filter((p) => {
      if (statusFilter !== "all" && p.status !== statusFilter) return false;
      if (sourceFilter !== "all" && p.source !== sourceFilter) return false;
      if (search) {
        const q = search.toLowerCase();
        return p.slug.includes(q) || p.title.toLowerCase().includes(q);
      }
      return true;
    });
  }, [pages, statusFilter, sourceFilter, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const page = Math.min(currentPage, totalPages);
  const paged = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const allSelected =
    paged.length > 0 && paged.every((p) => selected.has(p.slug));

  function toggleAll() {
    if (allSelected) {
      setSelected((prev) => {
        const next = new Set(prev);
        paged.forEach((p) => next.delete(p.slug));
        return next;
      });
    } else {
      setSelected((prev) => {
        const next = new Set(prev);
        paged.forEach((p) => next.add(p.slug));
        return next;
      });
    }
  }

  function toggleRow(slug: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(slug) ? next.delete(slug) : next.add(slug);
      return next;
    });
  }

  async function deletePage(slug: string) {
    const page = pages.find((p) => p.slug === slug);
    if (!page?.deletable) {
      toast("Registry pages cannot be deleted via admin — remove them from lib/registry.ts", "error");
      return;
    }
    try {
      const res = await fetch(`/api/stored-landings/${slug}`, { method: "DELETE" });
      if (!res.ok) throw new Error(await res.text());
      setPages((prev) => prev.filter((p) => p.slug !== slug));
      setSelected((prev) => { const n = new Set(prev); n.delete(slug); return n; });
      toast(`Deleted /l/${slug}`, "success");
    } catch {
      toast(`Failed to delete /l/${slug}`, "error");
    }
  }

  async function bulkDelete() {
    const toDelete = pages.filter((p) => selected.has(p.slug) && p.deletable);
    const skipped = pages.filter((p) => selected.has(p.slug) && !p.deletable);

    if (toDelete.length === 0) {
      toast("Selected pages are registry pages and cannot be deleted", "error");
      return;
    }

    const results = await Promise.allSettled(
      toDelete.map((p) => fetch(`/api/stored-landings/${p.slug}`, { method: "DELETE" }))
    );

    const deleted = toDelete.filter((_, i) => {
      const r = results[i];
      return r !== undefined && r.status === "fulfilled" && (r as PromiseFulfilledResult<Response>).value.ok;
    });
    const failed = toDelete.length - deleted.length;

    const deletedSlugs = new Set(deleted.map((p) => p.slug));
    setPages((prev) => prev.filter((p) => !deletedSlugs.has(p.slug)));
    setSelected(new Set());

    const parts: string[] = [];
    if (deleted.length) parts.push(`Deleted ${deleted.length} page${deleted.length !== 1 ? "s" : ""}`);
    if (skipped.length) parts.push(`${skipped.length} registry page${skipped.length !== 1 ? "s" : ""} skipped`);
    if (failed) parts.push(`${failed} failed`);
    toast(parts.join(" · "), deleted.length > 0 ? "success" : "error");
  }

  const sourceBadge = (source: AdminPage["source"]) => {
    if (source === "cron")
      return <span className="forge-badge forge-badge-primary">cron</span>;
    if (source === "ai")
      return <span className="forge-badge forge-badge-purple">ai</span>;
    return <span className="forge-badge forge-badge-muted">manual</span>;
  };

  const statusBadge = (status: AdminPage["status"]) =>
    status === "published" ? (
      <span className="forge-badge forge-badge-success">published</span>
    ) : (
      <span className="forge-badge forge-badge-warning">draft</span>
    );

  return (
    <div className="animate-page-in">
      {/* Heading row */}
      <div className="mb-6 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <h1 className="text-[24px] font-bold tracking-tight text-fg">
            All Pages
          </h1>
          <span className="forge-badge forge-badge-muted text-[12px] px-2.5 py-1">
            {pages.length}
          </span>
        </div>

        {/* Search */}
        <div className="relative">
          <Search
            size={13}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
          />
          <input
            type="text"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
            placeholder="Search pages…"
            className="h-9 w-60 rounded-xl border border-border bg-surface pl-8 pr-3 text-[13px] text-fg placeholder:text-muted outline-none transition focus:border-primary focus:shadow-[0_0_0_3px_rgba(99,102,241,.15)]"
          />
        </div>
      </div>

      {/* Filter row */}
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <div className="flex gap-1.5">
          {(["all", "published", "draft"] as StatusFilter[]).map((f) => (
            <button
              key={f}
              onClick={() => { setStatusFilter(f); setCurrentPage(1); }}
              className={`rounded-full border px-3.5 py-1.5 text-[12px] font-medium transition-all ${
                statusFilter === f
                  ? "border-primary bg-primary text-white shadow-[0_0_14px_rgba(99,102,241,.3)]"
                  : "border-border text-muted hover:border-primary/40 hover:text-fg"
              }`}
            >
              {f === "all" ? "All" : f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        <div className="h-4 w-px bg-border" />

        <div className="flex gap-1.5">
          {(["all", "ai", "manual", "cron"] as SourceFilter[]).map((f) => (
            <button
              key={f}
              onClick={() => { setSourceFilter(f); setCurrentPage(1); }}
              className={`rounded-full border px-3.5 py-1.5 text-[12px] font-medium transition-all ${
                sourceFilter === f
                  ? "border-primary bg-primary text-white shadow-[0_0_14px_rgba(99,102,241,.3)]"
                  : "border-border text-muted hover:border-primary/40 hover:text-fg"
              }`}
            >
              {f === "all" ? "All Sources" : f === "ai" ? "AI Generated" : f === "manual" ? "Manual" : "Daily Cron"}
            </button>
          ))}
        </div>

        {selected.size > 0 && (
          <button
            onClick={bulkDelete}
            className="ml-auto rounded-xl border border-danger/50 px-4 py-1.5 text-[12px] font-medium text-danger transition hover:bg-danger/10"
          >
            Bulk delete
          </button>
        )}
      </div>

      {/* Bulk action bar */}
      {selected.size > 0 && (
        <div
          className="mb-4 flex items-center justify-between rounded-xl border px-5 py-3"
          style={{
            background: "rgba(220,38,38,.08)",
            borderColor: "rgba(220,38,38,.2)",
            animation: "forge-card-in .2s ease both",
          }}
        >
          <span className="text-[13px] text-fg">
            {selected.size} row{selected.size !== 1 ? "s" : ""} selected
          </span>
          <button
            onClick={bulkDelete}
            className="rounded-xl bg-danger px-4 py-1.5 text-[13px] font-medium text-white transition hover:brightness-90"
          >
            Delete selected
          </button>
        </div>
      )}

      {/* Table */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-xl border border-border py-20 text-center"
          style={{ background: "#161626" }}>
          <Layers size={48} style={{ color: "#2A2A40" }} />
          <p className="text-[15px] font-semibold text-fg">No pages yet</p>
          <Link
            href="/admin/generate"
            className="text-[13px] text-primary hover:underline"
          >
            Generate your first landing page →
          </Link>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-border shadow-[0_0_0_1px_#2A2A40,0_4px_24px_rgba(0,0,0,.4)]">
          <table className="w-full border-collapse">
            <thead>
              <tr style={{ background: "rgba(8,8,20,.5)" }}>
                <th className="border-b border-border px-4 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={toggleAll}
                    className="h-3.5 w-3.5 accent-primary"
                  />
                </th>
                {["Slug", "Title", "Source", "Status", "Created", "Actions"].map(
                  (h) => (
                    <th
                      key={h}
                      className="border-b border-border px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-[.06em] text-muted"
                    >
                      {h}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody>
              {paged.map((p) => (
                <tr
                  key={p.slug}
                  className="border-b border-border last:border-0 transition-colors hover:bg-[rgba(26,26,48,.7)]"
                  style={
                    selected.has(p.slug)
                      ? { background: "rgba(99,102,241,.06)" }
                      : undefined
                  }
                >
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selected.has(p.slug)}
                      onChange={() => toggleRow(p.slug)}
                      className="h-3.5 w-3.5 accent-primary"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <span className="font-mono text-[11px] text-primary">
                      /l/{p.slug}
                    </span>
                  </td>
                  <td className="max-w-[260px] truncate px-4 py-3 text-[13px] font-medium text-fg">
                    {p.title}
                  </td>
                  <td className="px-4 py-3">{sourceBadge(p.source)}</td>
                  <td className="px-4 py-3">{statusBadge(p.status)}</td>
                  <td className="px-4 py-3 text-[13px] text-muted">
                    {p.createdAt}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <a
                        href={`/l/${p.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-lg p-1.5 text-muted transition hover:bg-surface hover:text-fg"
                        title="Preview"
                      >
                        <Eye size={13} />
                      </a>
                      <button
                        onClick={() => deletePage(p.slug)}
                        disabled={!p.deletable}
                        className="rounded-lg p-1.5 text-muted transition hover:bg-surface hover:text-danger disabled:cursor-not-allowed disabled:opacity-30"
                        title={p.deletable ? "Delete" : "Registry pages cannot be deleted via admin"}
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-3 border-t border-border px-4 py-4">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="rounded-lg border border-border px-3 py-1.5 text-[12px] text-muted transition hover:border-primary/50 hover:text-fg disabled:opacity-40"
              >
                ← Previous
              </button>
              <span className="text-[13px] text-muted">
                Page {page} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="rounded-lg border border-border px-3 py-1.5 text-[12px] text-muted transition hover:border-primary/50 hover:text-fg disabled:opacity-40"
              >
                Next →
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
