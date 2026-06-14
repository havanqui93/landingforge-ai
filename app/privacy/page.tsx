import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy — LandingForge",
  description: "How LandingForge handles your data.",
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-24">
      <Link
        href="/"
        className="mb-8 inline-block text-sm text-muted transition-colors hover:text-fg"
      >
        ← Back to home
      </Link>

      <h1 className="text-3xl font-bold tracking-tight">Privacy Policy</h1>
      <p className="mt-2 text-sm text-muted">Last updated: June 14, 2026</p>

      <div className="mt-10 space-y-8 leading-relaxed text-muted">
        <section>
          <h2 className="mb-3 text-lg font-semibold text-fg">Overview</h2>
          <p>
            LandingForge is a demonstration platform. All landing pages shown here
            are fictional products created for illustrative purposes only. No real
            goods or services are offered.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-fg">Data we collect</h2>
          <p>
            This demo does not collect personal data. No cookies, analytics, or
            tracking scripts are installed beyond what the hosting provider logs by
            default (IP address, browser UA, access time).
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-fg">Third-party services</h2>
          <p>
            The site is deployed on Vercel. Refer to the{" "}
            <a
              href="https://vercel.com/legal/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-fg underline underline-offset-2 hover:no-underline"
            >
              Vercel Privacy Policy
            </a>{" "}
            for infrastructure-level data handling.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-lg font-semibold text-fg">Contact</h2>
          <p>
            Questions? Open an issue or reach out via the project repository.
          </p>
        </section>
      </div>
    </main>
  );
}
