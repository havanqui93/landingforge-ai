import Link from "next/link";

export default function NotFound() {
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
        That landing isn&apos;t registered. Check the slug, or head back to the
        directory.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-fg shadow-lg shadow-primary/25 transition-transform hover:-translate-y-0.5"
      >
        Back to all landings
      </Link>
    </main>
  );
}
