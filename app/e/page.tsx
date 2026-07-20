import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { editorialLandings } from "@/lib/editorial-registry";

export const metadata: Metadata = {
  title: "Editorial — LandingForge",
  description:
    "A second, magazine-style landing template — asymmetric layouts, numbered lists, and ruled sign-off blocks instead of the default centered card stack.",
};

export default function EditorialGalleryPage() {
  return (
    <div className="min-h-screen bg-[#080814] text-[#EDEDF5]">
      <div className="mx-auto w-full max-w-[1152px] px-6 py-16 sm:px-8">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-[13px] text-[#9494AA] transition hover:text-[#EDEDF5]"
        >
          <ArrowLeft size={14} /> Back to LandingForge
        </Link>

        <div className="mt-8 max-w-xl">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#9494AA]">
            Second template
          </span>
          <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            Editorial
          </h1>
          <p className="mt-4 leading-relaxed text-[#9494AA]">
            A magazine-style layout — asymmetric columns, numbered lists, and
            an inverted sign-off block — built on its own{" "}
            <code className="rounded bg-white/[0.06] px-1.5 py-0.5 text-[13px]">
              Block
            </code>{" "}
            union and renderer, independent of the default template.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {editorialLandings.map(({ slug, config }) => (
            <Link
              key={slug}
              href={`/e/${slug}`}
              className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-white/25"
            >
              <div className="flex items-start justify-between gap-4">
                <span className="font-mono text-[11px] text-[#C97B4A]">/e/{slug}</span>
                <ArrowUpRight
                  size={15}
                  className="text-[#9494AA] transition group-hover:text-[#EDEDF5]"
                />
              </div>
              <h2 className="mt-3 text-[17px] font-semibold leading-snug">
                {config.meta.title}
              </h2>
              <p className="mt-2 line-clamp-2 text-[13px] leading-relaxed text-[#9494AA]">
                {config.meta.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
