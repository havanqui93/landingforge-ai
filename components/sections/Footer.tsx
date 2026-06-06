"use client";

import Link from "next/link";
import { Container, Reveal } from "@/components/primitives";
import type { FooterSection } from "@/lib/landing.types";

export function Footer({ data }: { data: FooterSection }) {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border py-16">
      <Container>
        <Reveal>
          <div className="grid grid-cols-2 gap-10 md:grid-cols-[1.5fr_repeat(auto-fit,minmax(0,1fr))]">
            <div className="col-span-2 md:col-span-1">
              <div className="text-lg font-bold tracking-tight">
                {data.brand}
              </div>
              {data.tagline ? (
                <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">
                  {data.tagline}
                </p>
              ) : null}
            </div>

            {data.columns?.map((col) => (
              <div key={col.heading}>
                <div className="text-sm font-semibold">{col.heading}</div>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted transition-colors hover:text-fg"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-12 border-t border-border pt-6 text-sm text-muted">
            {data.legal ?? `© ${year} ${data.brand}. All rights reserved.`}
          </div>
        </Reveal>
      </Container>
    </footer>
  );
}
