import type { LandingConfig } from "@/lib/landing.types";

const nexus: LandingConfig = {
  meta: {
    slug: "nexus",
    title: "Nexus — The API platform built for developers",
    description:
      "Nexus gives your team a unified gateway for every API — authentication, rate limiting, observability, and docs in one place.",
  },
  theme: {
    primary: "0 212 255",
    bg: "4 10 20",
    surface: "10 20 38",
    fg: "220 235 255",
    muted: "100 130 165",
    border: "25 45 75",
    mode: "dark",
    radius: "0.6rem",
    font: '"JetBrains Mono", "Fira Code", monospace',
  },
  sections: [
    {
      type: "hero",
      eyebrow: "Now generally available",
      title: "One gateway for every API you'll ever build",
      subtitle:
        "Nexus sits between your services and the world — handling auth, rate limits, versioning, and real-time analytics so your team ships features, not plumbing.",
      actions: [
        { label: "Start for free", href: "#pricing", variant: "primary" },
        { label: "Read the docs", href: "/docs", variant: "secondary" },
      ],
      note: "Free tier · No credit card · Deploy in 60 seconds",
    },
    {
      type: "stats",
      items: [
        { value: "2.4B+", label: "API calls routed daily" },
        { value: "<1ms", label: "Median gateway latency" },
        { value: "99.999%", label: "Uptime SLA" },
        { value: "180+", label: "Countries served" },
      ],
    },
    {
      type: "features",
      eyebrow: "Platform capabilities",
      title: "Everything between your code and your customers",
      subtitle:
        "Stop rebuilding the same API infrastructure for every project.",
      columns: 3,
      items: [
        {
          icon: "KeyRound",
          title: "Unified auth",
          description:
            "JWT, API keys, OAuth 2.0 and mTLS — configure once, apply to any route without touching your service code.",
        },
        {
          icon: "Gauge",
          title: "Adaptive rate limiting",
          description:
            "Per-consumer, per-endpoint, and global quotas with burst allowances. Automatically backed off with Retry-After headers.",
        },
        {
          icon: "GitBranch",
          title: "Versioning & routing",
          description:
            "Semantic version routing, A/B traffic splits, and canary rollouts with zero downtime.",
        },
        {
          icon: "LineChart",
          title: "Live observability",
          description:
            "Request traces, error rates, and p99 latencies streamed in real time. Export to Datadog, Grafana, or your own sink.",
        },
        {
          icon: "BookOpen",
          title: "Auto-generated docs",
          description:
            "OpenAPI specs produced automatically from your routes. Interactive Try-It UI your consumers will actually use.",
        },
        {
          icon: "ShieldCheck",
          title: "OWASP-hardened",
          description:
            "WAF rules, DDoS protection, and automated CVE patching on every plan — not just enterprise.",
        },
      ],
    },
    {
      type: "testimonials",
      eyebrow: "Trusted by engineering teams",
      title: "What developers are saying",
      items: [
        {
          quote:
            "We decommissioned our home-grown API gateway in a week. Nexus handled 10× our traffic on day one without a hiccup.",
          author: "Tobias Holm",
          role: "Staff Engineer, Flare Systems",
        },
        {
          quote:
            "The observability layer alone saved us three days of debugging a silent rate-limit bug. Worth every cent.",
          author: "Aisha Kimura",
          role: "Platform Lead, Stackline",
        },
        {
          quote:
            "Auto-generated docs meant our partners could self-serve immediately. Support tickets dropped 40% overnight.",
          author: "Rui Andrade",
          role: "Head of Developer Relations, Kona",
        },
      ],
    },
    {
      type: "pricing",
      eyebrow: "Pricing",
      title: "Pay for what you use",
      subtitle: "Transparent, usage-based pricing with a generous free tier.",
      tiers: [
        {
          name: "Developer",
          price: "$0",
          period: "/mo",
          description: "For side projects and personal APIs.",
          features: [
            "1M requests / month",
            "3 API gateways",
            "Community support",
            "Basic analytics",
          ],
          cta: { label: "Deploy free", href: "#", variant: "secondary" },
        },
        {
          name: "Team",
          price: "$49",
          period: "/mo",
          description: "For growing teams shipping production APIs.",
          featured: true,
          features: [
            "50M requests / month",
            "Unlimited gateways",
            "Custom auth providers",
            "Real-time observability",
            "Slack & email support",
          ],
          cta: { label: "Start trial", href: "#", variant: "primary" },
        },
        {
          name: "Enterprise",
          price: "Custom",
          description: "For orgs with compliance and scale requirements.",
          features: [
            "Unlimited requests",
            "Dedicated nodes",
            "SOC 2 & HIPAA",
            "SLA guarantee",
            "Onboarding & training",
          ],
          cta: { label: "Talk to us", href: "#", variant: "secondary" },
        },
      ],
    },
    {
      type: "faq",
      eyebrow: "FAQ",
      title: "Your questions, answered",
      items: [
        {
          question: "How does Nexus compare to Kong or AWS API Gateway?",
          answer:
            "Nexus is cloud-agnostic, ships with richer built-in auth than Kong's open-source tier, and doesn't lock you into AWS pricing models. Deploy on any cloud or on-prem.",
        },
        {
          question: "Can I migrate my existing gateway configuration?",
          answer:
            "Yes. Nexus imports Kong, AWS, and Apigee configs via our CLI. Most teams migrate in under an hour.",
        },
        {
          question: "What latency overhead does Nexus add?",
          answer:
            "Our p50 overhead is under 1ms globally. We publish live performance stats on our status page — no marketing numbers.",
        },
        {
          question: "Is my traffic data stored?",
          answer:
            "Request metadata (not payloads) is retained for 30 days by default for analytics. Enterprise customers can configure 0-day retention.",
        },
      ],
    },
    {
      type: "cta",
      title: "Your APIs deserve better infrastructure",
      subtitle:
        "Get started in 60 seconds. No lock-in, no ops overhead, no surprises on your bill.",
      actions: [
        { label: "Deploy free", href: "#", variant: "primary" },
        { label: "Book a demo", href: "#", variant: "ghost" },
      ],
    },
    {
      type: "footer",
      brand: "Nexus",
      tagline: "The unified API gateway for modern engineering teams.",
      columns: [
        {
          heading: "Platform",
          links: [
            { label: "Gateway", href: "#" },
            { label: "Observability", href: "#" },
            { label: "Docs", href: "#" },
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
            { label: "Security", href: "#" },
          ],
        },
      ],
      legal: "© 2026 Nexus Technologies, Inc. All rights reserved.",
    },
  ],
};

export default nexus;
