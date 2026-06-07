import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "TrendPage AI — Admin",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <nav className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link href="/admin/pages" className="font-bold tracking-tight">
            TrendPage <span className="text-indigo-600">AI</span>
          </Link>
          <div className="flex gap-4 text-sm font-medium text-slate-600">
            <Link href="/admin/generate" className="hover:text-indigo-600">
              Generate
            </Link>
            <Link href="/admin/pages" className="hover:text-indigo-600">
              Pages
            </Link>
          </div>
        </div>
      </nav>
      <div className="mx-auto max-w-5xl px-6 py-10">{children}</div>
    </div>
  );
}
