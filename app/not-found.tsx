import Link from "next/link";
import { landings } from "@/lib/registry";

export default function NotFound() {
  // Surface a few real landings so a wrong slug still leads somewhere useful.
  const suggestions = landings.slice(0, 8);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <div aria-hidden className="pointer-events-none absolute inset-0 lf-glow" />
      <p className="text-sm font-semibold uppercase tracking-widest text-primary">
        404
      </p>
      <h1 className="mt-4 text-4xl font-bold tracking-tight">
        Landing not found
      </h1>
      <p className="mt-3 max-w-md text-muted">
        That landing isn&apos;t registered. Check the slug, or pick one of these.
      </p>

      {suggestions.length > 0 ? (
        <ul className="mt-8 flex max-w-xl flex-wrap items-center justify-center gap-2">
          {suggestions.map(({ slug, config }) => (
            <li key={slug}>
              <Link
                href={`/l/${slug}`}
                className="inline-flex items-center rounded-full border border-border bg-surface/50 px-4 py-1.5 text-sm font-medium text-muted transition-colors hover:text-fg"
              >
                {config.meta.title.split(" — ")[0]?.trim() || slug}
              </Link>
            </li>
          ))}
        </ul>
      ) : null}

      <Link
        href="/"
        className="mt-8 inline-flex items-center rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-fg shadow-lg shadow-primary/25 transition-transform hover:-translate-y-0.5"
      >
        Back to all landings
      </Link>
    </main>
  );
}
