import type { LandingConfig } from "@/lib/landing.types";

/**
 * Demo landing — exercises every section type so animations & theming
 * can be verified end to end. Copy this file to scaffold a new landing.
 */
const demo: LandingConfig = {
  meta: {
    slug: "demo",
    title: "Nova — Ship landing pages at light speed",
    description:
      "Nova is the all-in-one platform to design, launch, and measure high-converting landing pages.",
  },
  theme: {
    primary: "124 92 255", // indigo-violet
    bg: "9 9 19",
    surface: "23 23 40",
    fg: "237 237 247",
    muted: "152 152 176",
    border: "44 44 68",
    mode: "dark",
    radius: "0.9rem",
    font: '"Inter", system-ui, sans-serif',
  },
  sections: [
    {
      type: "hero",
      eyebrow: "Now in public beta",
      title: "Ship landing pages at light speed",
      subtitle:
        "Nova gives your team a config-driven foundation for premium, animated landing pages — design once, launch endlessly.",
      actions: [
        { label: "Start building free", href: "#pricing", variant: "primary" },
        { label: "Watch the demo", href: "#features", variant: "secondary" },
      ],
      note: "No credit card required · 14-day Pro trial",
    },
    {
      type: "stats",
      items: [
        { value: "12,000+", label: "Pages launched" },
        { value: "99.99%", label: "Uptime" },
        { value: "$48M", label: "Revenue driven" },
        { value: "4.9", label: "Avg. rating" },
      ],
    },
    {
      type: "features",
      eyebrow: "Why Nova",
      title: "Everything you need to convert",
      subtitle:
        "A polished foundation with the primitives, animations, and analytics baked in.",
      columns: 3,
      items: [
        {
          icon: "Zap",
          title: "Blazing fast",
          description:
            "Static-first rendering with 60fps transform-only animations. Lighthouse loves it.",
        },
        {
          icon: "Palette",
          title: "Theme per page",
          description:
            "Every landing carries its own palette and font, driven entirely by CSS variables.",
        },
        {
          icon: "LayoutGrid",
          title: "Composable sections",
          description:
            "Hero, Features, Pricing, FAQ and more — assemble pages from a typed config object.",
        },
        {
          icon: "ShieldCheck",
          title: "Accessible by default",
          description:
            "Semantic HTML, visible focus states, and full prefers-reduced-motion support.",
        },
        {
          icon: "Wand2",
          title: "Delightful motion",
          description:
            "Scroll-triggered reveals, staggered entrances, and parallax that feels effortless.",
        },
        {
          icon: "BarChart3",
          title: "Built-in insights",
          description:
            "Track scroll depth and conversions out of the box, no extra tooling required.",
        },
      ],
    },
    {
      type: "testimonials",
      eyebrow: "Loved by teams",
      title: "Don't just take our word for it",
      items: [
        {
          quote:
            "We replaced three tools with Nova and shipped our relaunch in a single afternoon.",
          author: "Maya Chen",
          role: "Head of Growth, Lumen",
        },
        {
          quote:
            "The animation quality is genuinely best-in-class. Our bounce rate dropped 22%.",
          author: "Diego Alvarez",
          role: "Founder, Stack",
        },
        {
          quote:
            "Adding a new landing page is now a five-minute job instead of a five-day project.",
          author: "Priya Nair",
          role: "Design Lead, Orbit",
        },
      ],
    },
    {
      type: "pricing",
      eyebrow: "Pricing",
      title: "Simple, transparent plans",
      subtitle: "Start free. Upgrade when you're ready to scale.",
      tiers: [
        {
          name: "Starter",
          price: "$0",
          period: "/mo",
          description: "For side projects and experiments.",
          features: [
            "3 landing pages",
            "Core section library",
            "Community support",
          ],
          cta: { label: "Get started", href: "#", variant: "secondary" },
        },
        {
          name: "Pro",
          price: "$29",
          period: "/mo",
          description: "For growing teams that ship often.",
          featured: true,
          features: [
            "Unlimited landing pages",
            "All sections + animations",
            "Custom themes & fonts",
            "Conversion analytics",
            "Priority support",
          ],
          cta: { label: "Start free trial", href: "#", variant: "primary" },
        },
        {
          name: "Enterprise",
          price: "Custom",
          description: "For organizations with advanced needs.",
          features: [
            "SSO & SAML",
            "Dedicated infrastructure",
            "SLA & onboarding",
            "Audit logs",
          ],
          cta: { label: "Contact sales", href: "#", variant: "secondary" },
        },
      ],
    },
    {
      type: "faq",
      eyebrow: "FAQ",
      title: "Questions, answered",
      items: [
        {
          question: "How do I add a new landing page?",
          answer:
            "Create a config.ts under /landings/<slug>, register it in lib/registry.ts, and it's instantly live at /l/<slug>. No existing pages are touched.",
        },
        {
          question: "Can each page have its own design?",
          answer:
            "Yes. Every landing defines its own theme — primary color, background, surface, fonts and radius — all driven by CSS variables.",
        },
        {
          question: "Are the animations accessible?",
          answer:
            "Absolutely. All motion is gated behind prefers-reduced-motion and only animates transform/opacity for smooth 60fps performance.",
        },
        {
          question: "Is it production-ready?",
          answer:
            "It's built on Next.js 14 with strict TypeScript, static rendering, and an exhaustive section renderer that fails the build if a type is unhandled.",
        },
      ],
    },
    {
      type: "cta",
      title: "Ready to forge your next landing?",
      subtitle:
        "Join thousands of teams shipping premium pages with Nova. Your first page is free.",
      actions: [
        { label: "Start building free", href: "#", variant: "primary" },
        { label: "Talk to sales", href: "#", variant: "ghost" },
      ],
    },
    {
      type: "footer",
      brand: "Nova",
      tagline:
        "The config-driven platform for premium, animated landing pages.",
      columns: [
        {
          heading: "Product",
          links: [
            { label: "Features", href: "#features" },
            { label: "Pricing", href: "#pricing" },
            { label: "Changelog", href: "#" },
          ],
        },
        {
          heading: "Company",
          links: [
            { label: "About", href: "#" },
            { label: "Blog", href: "#" },
            { label: "Careers", href: "#" },
          ],
        },
        {
          heading: "Legal",
          links: [
            { label: "Privacy", href: "/privacy" },
            { label: "Terms", href: "/terms" },
          ],
        },
      ],
    },
  ],
};

export default demo;
