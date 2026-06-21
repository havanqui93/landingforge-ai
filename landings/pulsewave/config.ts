import type { LandingConfig } from "@/lib/landing.types";

/**
 * Pulsewave — fictional API observability & uptime monitoring platform.
 * Dark theme with an electric-cyan accent.
 */
const pulsewave: LandingConfig = {
  meta: {
    slug: "pulsewave",
    title: "Pulsewave — Observability that never blinks",
    description:
      "Pulsewave watches every endpoint, trace, and deploy so you catch incidents before your users do.",
  },
  theme: {
    primary: "34 211 238", // cyan
    bg: "8 12 18",
    surface: "16 23 33",
    fg: "226 240 247",
    muted: "138 158 173",
    border: "30 44 58",
    mode: "dark",
    radius: "0.75rem",
    font: '"Inter", system-ui, sans-serif',
  },
  sections: [
    {
      type: "hero",
      eyebrow: "Now with AI incident summaries",
      title: "Observability that never blinks",
      subtitle:
        "Pulsewave unifies uptime, traces, and logs into one fast dashboard — so your team finds the root cause in seconds, not standups.",
      actions: [
        { label: "Start monitoring free", href: "#pricing", variant: "primary" },
        { label: "See a live demo", href: "#features", variant: "secondary" },
      ],
      note: "5-minute setup · No agent to install · SOC 2 Type II",
    },
    {
      type: "stats",
      items: [
        { value: "8.4B", label: "Checks / month" },
        { value: "<30s", label: "Median alert time" },
        { value: "99.99%", label: "Platform uptime" },
        { value: "2,300+", label: "Engineering teams" },
      ],
    },
    {
      type: "features",
      eyebrow: "Why Pulsewave",
      title: "Everything in one signal",
      subtitle:
        "Stop stitching together five tools. Pulsewave correlates metrics, traces, and logs automatically.",
      columns: 3,
      items: [
        {
          icon: "Activity",
          title: "Real-time uptime",
          description:
            "Global probes from 24 regions hit your endpoints every 10 seconds with smart retry logic.",
        },
        {
          icon: "Waypoints",
          title: "Distributed tracing",
          description:
            "Follow a request across every service and database call with flame graphs that load instantly.",
        },
        {
          icon: "Bell",
          title: "Noise-free alerts",
          description:
            "ML-based deduplication groups related signals so you get one page, not forty.",
        },
        {
          icon: "Sparkles",
          title: "AI root cause",
          description:
            "Every incident ships with a plain-English summary and the exact deploy that likely caused it.",
        },
        {
          icon: "GitBranch",
          title: "Deploy markers",
          description:
            "Connect your CI to overlay releases on every chart and instantly spot regressions.",
        },
        {
          icon: "ShieldCheck",
          title: "Private by design",
          description:
            "Scrub PII at the edge, bring your own keys, and keep raw data in your own region.",
        },
      ],
    },
    {
      type: "testimonials",
      eyebrow: "Trusted on call",
      title: "The last dashboard you'll open at 3am",
      items: [
        {
          quote:
            "We cut mean-time-to-resolution from 47 minutes to under 6. Pulsewave paid for itself in one outage.",
          author: "Renee Okafor",
          role: "Staff SRE, Tideline",
        },
        {
          quote:
            "The AI incident summaries are uncanny. It pointed straight at the migration that broke checkout.",
          author: "Tomas Berg",
          role: "VP Engineering, Cargoflow",
        },
        {
          quote:
            "Onboarding took an afternoon and replaced three vendors. Our alert fatigue is basically gone.",
          author: "Hana Sato",
          role: "Platform Lead, Northwind",
        },
      ],
    },
    {
      type: "pricing",
      eyebrow: "Pricing",
      title: "Scales with your traffic, not your headcount",
      subtitle: "Generous free tier. Usage-based after that — no per-seat tax.",
      tiers: [
        {
          name: "Hobby",
          price: "$0",
          period: "/mo",
          description: "For side projects and small services.",
          features: [
            "10 monitors",
            "7-day retention",
            "Email + Slack alerts",
            "Community support",
          ],
          cta: { label: "Get started", href: "#", variant: "secondary" },
        },
        {
          name: "Team",
          price: "$89",
          period: "/mo",
          description: "For teams running production workloads.",
          featured: true,
          features: [
            "Unlimited monitors",
            "90-day retention",
            "Distributed tracing",
            "AI root-cause summaries",
            "PagerDuty & Opsgenie",
          ],
          cta: { label: "Start free trial", href: "#", variant: "primary" },
        },
        {
          name: "Enterprise",
          price: "Custom",
          description: "For regulated and high-scale orgs.",
          features: [
            "Unlimited retention",
            "BYOK & data residency",
            "SSO / SCIM",
            "Dedicated support engineer",
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
          question: "Do I need to install an agent?",
          answer:
            "No. Pulsewave works with a lightweight SDK or OpenTelemetry export — most teams are live in under five minutes.",
        },
        {
          question: "How does usage-based pricing work?",
          answer:
            "You pay for the events you send, billed per million with volume discounts. There are no per-seat charges, ever.",
        },
        {
          question: "Can I keep data in my own region?",
          answer:
            "Yes. Enterprise plans support EU, US, and APAC residency plus bring-your-own-key encryption.",
        },
        {
          question: "What integrations are supported?",
          answer:
            "Slack, PagerDuty, Opsgenie, GitHub, GitLab, and any webhook. OpenTelemetry means your existing instrumentation just works.",
        },
      ],
    },
    {
      type: "cta",
      title: "Sleep through the next deploy",
      subtitle:
        "Set up Pulsewave in five minutes and let the dashboard watch your stack so you don't have to.",
      actions: [
        { label: "Start monitoring free", href: "#", variant: "primary" },
        { label: "Book a walkthrough", href: "#", variant: "ghost" },
      ],
    },
    {
      type: "footer",
      brand: "Pulsewave",
      tagline: "Observability that never blinks.",
      columns: [
        {
          heading: "Product",
          links: [
            { label: "Uptime", href: "#features" },
            { label: "Tracing", href: "#features" },
            { label: "Pricing", href: "#pricing" },
          ],
        },
        {
          heading: "Developers",
          links: [
            { label: "Docs", href: "#" },
            { label: "API", href: "#" },
            { label: "Status", href: "#" },
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
      legal: "© 2026 Pulsewave Labs, Inc. A fictional demo product.",
    },
  ],
};

export default pulsewave;
