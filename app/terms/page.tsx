import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service — LandingForge",
  description: "Terms governing use of LandingForge.",
};

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-24">
      <Link
        href="/"
        className="mb-8 inline-block text-sm text-muted transition-colors hover:text-fg"
      >
        ← Back to home
      </Link>

      <h1 className="text-3xl font-bold tracking-tight">Terms of Service</h1>
      <p className="mt-2 text-sm text-muted">Last updated: June 14, 2026</p>

      <div className="mt-10 space-y-8 leading-relaxed text-muted">
        <section>
          <h2 className="mb-3 text-lg font-semibold text-fg">Acceptance</h2>
          <p>
            By accessing LandingForge you agree to these terms. If you do not agree,
            please stop using the platform.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-fg">
            Fictional content disclaimer
          </h2>
          <p>
            All landing pages, product names, pricing, testimonials, and statistics
            displayed on this platform are entirely fictional and created for
            demonstration purposes. They do not represent real companies, real
            people, or real financial figures.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-fg">Permitted use</h2>
          <p>
            You may use this platform for personal and professional reference,
            learning, and inspiration. You may not reproduce or redistribute
            generated content as if it were genuine marketing material from a real
            company.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-fg">
            No warranties
          </h2>
          <p>
            LandingForge is provided "as is" without warranty of any kind. We make
            no guarantees of availability, accuracy, or fitness for a particular
            purpose.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-fg">Changes</h2>
          <p>
            These terms may be updated at any time. Continued use of the platform
            constitutes acceptance of the revised terms.
          </p>
        </section>
      </div>
    </main>
  );
}
