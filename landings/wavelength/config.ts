import type { LandingConfig } from "@/lib/landing.types";

/**
 * Wavelength — fictional cybersecurity & threat-detection platform.
 * Dark theme with a crimson accent.
 */
const wavelength: LandingConfig = {
  meta: {
    slug: "wavelength",
    title: "Wavelength — Detect threats before they spread",
    description:
      "Wavelength is an AI-driven security platform that spots, prioritizes, and contains threats across your entire stack.",
  },
  theme: {
    primary: "239 68 68", // crimson
    bg: "12 10 12",
    surface: "22 17 19",
    fg: "240 230 232",
    muted: "160 144 148",
    border: "46 34 38",
    mode: "dark",
    radius: "0.7rem",
    font: '"Inter", system-ui, sans-serif',
  },
  sections: [
    {
      type: "hero",
      eyebrow: "Backed by an autonomous detection engine",
      title: "Detect threats before they spread",
      subtitle:
        "Wavelength watches every endpoint, identity, and cloud workload, correlates the signals, and contains attacks in seconds — not days.",
      actions: [
        { label: "Request a demo", href: "#pricing", variant: "primary" },
        { label: "See the platform", href: "#features", variant: "secondary" },
      ],
      note: "Deploys in hours · MITRE ATT&CK mapped · SOC 2 + ISO 27001",
    },
    {
      type: "stats",
      items: [
        { value: "1.4T", label: "Events analyzed / day" },
        { value: "<60s", label: "Mean time to contain" },
        { value: "98%", label: "Alert noise reduction" },
        { value: "900+", label: "Security teams" },
      ],
    },
    {
      type: "features",
      eyebrow: "Why Wavelength",
      title: "One platform, full coverage",
      subtitle:
        "Replace your patchwork of point tools with a unified detection and response layer.",
      columns: 3,
      items: [
        {
          icon: "Radar",
          title: "Unified detection",
          description:
            "Correlate endpoint, identity, network, and cloud signals into a single ranked threat timeline.",
        },
        {
          icon: "Bot",
          title: "Autonomous triage",
          description:
            "AI investigates every alert, gathers evidence, and recommends the next action automatically.",
        },
        {
          icon: "ShieldAlert",
          title: "Instant containment",
          description:
            "Isolate a host, revoke a token, or block an IP with one click — or let policies do it for you.",
        },
        {
          icon: "Crosshair",
          title: "Threat hunting",
          description:
            "Query months of history with a fast search built for analysts, not just dashboards.",
        },
        {
          icon: "FileSearch",
          title: "Compliance ready",
          description:
            "Pre-built reports for SOC 2, ISO 27001, and HIPAA generated straight from live telemetry.",
        },
        {
          icon: "Lock",
          title: "Zero-trust native",
          description:
            "Continuous identity verification and least-privilege enforcement baked into the core.",
        },
      ],
    },
    {
      type: "testimonials",
      eyebrow: "Trusted by defenders",
      title: "Built for the team on the front line",
      items: [
        {
          quote:
            "Wavelength caught lateral movement our old SIEM completely missed. We contained it before it touched prod.",
          author: "Marcus Bello",
          role: "CISO, Hadron Systems",
        },
        {
          quote:
            "Our analysts went from drowning in alerts to actually hunting. Noise is down 98% and morale is up.",
          author: "Priya Venkat",
          role: "SOC Manager, Brightline",
        },
        {
          quote:
            "Deployment took an afternoon. The autonomous triage feels like adding ten senior analysts.",
          author: "Erik Halvorsen",
          role: "Head of Security, Northgate",
        },
      ],
    },
    {
      type: "pricing",
      eyebrow: "Pricing",
      title: "Protection that scales with you",
      subtitle: "Transparent per-asset pricing. No surprise data-ingest bills.",
      tiers: [
        {
          name: "Core",
          price: "$6",
          period: "/asset/mo",
          description: "For growing teams getting serious.",
          features: [
            "Endpoint & identity detection",
            "30-day retention",
            "Email & Slack alerts",
            "Standard support",
          ],
          cta: { label: "Start with Core", href: "#", variant: "secondary" },
        },
        {
          name: "Advanced",
          price: "$11",
          period: "/asset/mo",
          description: "Full detection and response.",
          featured: true,
          features: [
            "All signal sources",
            "Autonomous triage",
            "1-year retention",
            "Threat hunting",
            "24/7 priority support",
          ],
          cta: { label: "Request a demo", href: "#", variant: "primary" },
        },
        {
          name: "Enterprise",
          price: "Custom",
          description: "For complex, regulated environments.",
          features: [
            "Unlimited retention",
            "Managed detection (MDR)",
            "Dedicated threat analyst",
            "Custom integrations",
            "99.99% SLA",
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
          question: "How long does deployment take?",
          answer:
            "Most teams are ingesting telemetry within a few hours using lightweight agents and existing cloud connectors.",
        },
        {
          question: "Will this replace my SIEM?",
          answer:
            "For many teams, yes. Wavelength unifies detection, investigation, and response, and can also feed an existing SIEM.",
        },
        {
          question: "Is the autonomous response safe?",
          answer:
            "You stay in control. Start in recommend-only mode, then graduate specific actions to fully automated as you build trust.",
        },
        {
          question: "How is pricing calculated?",
          answer:
            "By protected asset, not by data volume — so your bill is predictable even as telemetry grows.",
        },
      ],
    },
    {
      type: "cta",
      title: "Stay ahead of the next breach",
      subtitle:
        "See how Wavelength turns a flood of alerts into a handful of decisive actions.",
      actions: [
        { label: "Request a demo", href: "#", variant: "primary" },
        { label: "Read the docs", href: "#", variant: "ghost" },
      ],
    },
    {
      type: "footer",
      brand: "Wavelength",
      tagline: "Detect threats before they spread.",
      columns: [
        {
          heading: "Platform",
          links: [
            { label: "Detection", href: "#features" },
            { label: "Response", href: "#features" },
            { label: "Pricing", href: "#pricing" },
          ],
        },
        {
          heading: "Resources",
          links: [
            { label: "Docs", href: "#" },
            { label: "Threat research", href: "#" },
            { label: "Trust center", href: "#" },
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
      legal: "© 2026 Wavelength Security. A fictional demo product.",
    },
  ],
};

export default wavelength;
