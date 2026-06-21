import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Documentation — LandingForge",
  description: "Learn how to build and launch landing pages with LandingForge.",
};

export default function DocsPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-24">
      <Link
        href="/"
        className="mb-8 inline-block text-sm text-muted transition-colors hover:text-fg"
      >
        ← Back to home
      </Link>

      <h1 className="text-3xl font-bold tracking-tight">Documentation</h1>
      <p className="mt-4 text-lg text-muted">
        Full documentation is coming soon. In the meantime, consult the{" "}
        <code className="rounded bg-surface/60 px-1.5 py-0.5 font-mono text-sm">
          CLAUDE.md
        </code>{" "}
        file in the repository for architecture notes and the &ldquo;add a
        landing&rdquo; contract.
      </p>

      <div className="mt-10 space-y-6 leading-relaxed text-muted">
        <section>
          <h2 className="mb-3 text-lg font-semibold text-fg">Quick start</h2>
          <ol className="list-decimal space-y-2 pl-5">
            <li>
              Create{" "}
              <code className="rounded bg-surface/60 px-1 font-mono text-sm">
                landings/&lt;slug&gt;/config.ts
              </code>{" "}
              exporting a <code className="font-mono text-sm">LandingConfig</code>.
            </li>
            <li>
              Register it in{" "}
              <code className="rounded bg-surface/60 px-1 font-mono text-sm">
                lib/registry.ts
              </code>
              .
            </li>
            <li>
              Run{" "}
              <code className="rounded bg-surface/60 px-1 font-mono text-sm">
                npm run typecheck
              </code>{" "}
              to validate.
            </li>
            <li>
              Visit{" "}
              <code className="rounded bg-surface/60 px-1 font-mono text-sm">
                /l/&lt;slug&gt;
              </code>{" "}
              — your page is live.
            </li>
          </ol>
        </section>
      </div>
    </main>
  );
}
