import Link from "next/link";
import { Layers, FileText, Calendar, Zap } from "lucide-react";
import { landings } from "@/lib/registry";
import { getStoredLandings } from "@/lib/store";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const stored = await getStoredLandings();
  const total = landings.length + stored.filter(
    (s) => !landings.find((l) => l.slug === s.meta.slug)
  ).length;

  const cards = [
    {
      label: "Total Pages",
      value: total,
      icon: FileText,
      href: "/admin/pages",
      color: "#6366F1",
    },
    {
      label: "Generate New",
      value: "→",
      icon: Layers,
      href: "/admin/generate",
      color: "#8B5CF6",
    },
    {
      label: "Schedule",
      value: "0 0 * * *",
      icon: Calendar,
      href: "/admin/schedule",
      color: "#059669",
      mono: true,
    },
  ];

  return (
    <div className="animate-page-in">
      <div className="mb-8">
        <div className="flex items-center gap-2 text-[24px] font-bold tracking-tight text-fg">
          <Zap size={22} className="text-primary" fill="currentColor" />
          Dashboard
        </div>
        <p className="mt-1 text-[14px] text-muted">
          Overview of your LandingForge project.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {cards.map((c) => (
          <Link
            key={c.label}
            href={c.href}
            className="group flex flex-col gap-4 rounded-xl border border-border p-5 transition hover:-translate-y-1 hover:border-primary/40"
            style={{ background: "#161626" }}
          >
            <div
              className="flex h-10 w-10 items-center justify-center rounded-xl"
              style={{ background: `${c.color}20` }}
            >
              <c.icon size={18} style={{ color: c.color }} />
            </div>
            <div>
              <p className="text-[12px] font-medium uppercase tracking-[.06em] text-muted">
                {c.label}
              </p>
              <p
                className={`mt-1 text-[24px] font-bold tracking-tight text-fg ${c.mono ? "font-mono text-[16px]" : ""}`}
              >
                {c.value}
              </p>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-8 rounded-xl border border-border p-5" style={{ background: "#161626" }}>
        <h2 className="mb-1 text-[14px] font-semibold text-fg">Quick actions</h2>
        <p className="mb-4 text-[13px] text-muted">
          Jump to the most common tasks.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/admin/generate"
            className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-[13px] font-medium text-white shadow-[0_4px_12px_rgba(99,102,241,.25)] transition hover:-translate-y-0.5"
          >
            <Layers size={13} /> Generate page
          </Link>
          <Link
            href="/admin/pages"
            className="flex items-center gap-2 rounded-xl border border-border px-4 py-2 text-[13px] font-medium text-fg transition hover:border-primary/60 hover:-translate-y-0.5"
          >
            <FileText size={13} /> View all pages
          </Link>
          <Link
            href="/admin/schedule"
            className="flex items-center gap-2 rounded-xl border border-border px-4 py-2 text-[13px] font-medium text-fg transition hover:border-primary/60 hover:-translate-y-0.5"
          >
            <Calendar size={13} /> Configure schedule
          </Link>
        </div>
      </div>
    </div>
  );
}
