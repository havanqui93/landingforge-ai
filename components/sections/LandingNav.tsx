"use client";

import { useState, useEffect } from "react";
import { Container } from "@/components/primitives";

export function LandingNav({ brand }: { brand: string }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-border bg-bg/80 shadow-sm backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <Container>
        <nav
          aria-label="Main navigation"
          className="flex h-16 items-center justify-between"
        >
          <span className="text-base font-bold tracking-tight text-fg">
            {brand}
          </span>

          <div className="flex items-center gap-6">
            <a
              href="#features"
              className="hidden text-sm text-muted transition-colors hover:text-fg sm:block"
            >
              Features
            </a>
            <a
              href="#pricing"
              className="hidden text-sm text-muted transition-colors hover:text-fg sm:block"
            >
              Pricing
            </a>
            <a
              href="#faq"
              className="hidden text-sm text-muted transition-colors hover:text-fg sm:block"
            >
              FAQ
            </a>
            <a
              href="#pricing"
              className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-fg shadow-sm transition-opacity hover:opacity-90"
            >
              Get started
            </a>
          </div>
        </nav>
      </Container>
    </header>
  );
}
