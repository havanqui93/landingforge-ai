import type { LandingConfig } from "@/lib/landing.types";

const orbit: LandingConfig = {
  meta: {
    slug: "orbit",
    title: "Orbit — Project management for async-first teams",
    description:
      "Orbit replaces stand-ups, status emails, and Slack noise with a single calm source of truth for your team's work.",
  },
  theme: {
    primary: "99 102 241",
    primaryFg: "255 255 255",
    bg: "13 13 26",
    surface: "20 20 40",
    fg: "230 230 245",
    muted: "130 130 160",
    border: "40 40 70",
    mode: "dark",
    radius: "0.8rem",
    font: '"Inter", system-ui, sans-serif',
  },
  sections: [
    {
      type: "hero",
      eyebrow: "Built for remote teams",
      title: "Kill the stand-up. Keep the momentum.",
      subtitle:
        "Orbit gives every team member a calm, async-first workspace — no meetings required. Know what matters, who's on it, and what's next.",
      actions: [
        { label: "Try free for 30 days", href: "#pricing", variant: "primary" },
        { label: "See a live demo", href: "#features", variant: "secondary" },
      ],
      note: "No meetings required to get started · Works with GitHub, Figma & Notion",
    },
    {
      type: "stats",
      items: [
        { value: "74%", label: "Fewer status meetings" },
        { value: "2.1×", label: "Faster shipping cycle" },
        { value: "18K+", label: "Teams worldwide" },
        { value: "4.9 ★", label: "G2 rating" },
      ],
    },
    {
      type: "features",
      eyebrow: "How Orbit works",
      title: "One workspace. Total clarity.",
      subtitle:
        "Everything your team needs to stay aligned — without the noise.",
      columns: 3,
      items: [
        {
          icon: "LayoutDashboard",
          title: "Timeline at a glance",
          description:
            "A single, auto-updating view shows every project's status, owner, and next milestone. No curator required.",
        },
        {
          icon: "MessageSquare",
          title: "Async updates",
          description:
            "Structured daily updates replace Slack threads and stand-up notes. Searchable, linked to tasks, never lost.",
        },
        {
          icon: "GitPullRequest",
          title: "Deep integrations",
          description:
            "GitHub PRs, Figma frames, and Notion docs appear inline. Context lives next to the work, not in a separate tab.",
        },
        {
          icon: "BellOff",
          title: "Calm notifications",
          description:
            "Only paged when you're truly needed. Orbit batches non-urgent signals into a daily digest so focus stays intact.",
        },
        {
          icon: "Users",
          title: "Team capacity view",
          description:
            "See who's heads-down, who has slack, and where bottlenecks will hit before they slow you down.",
        },
        {
          icon: "Zap",
          title: "Automations",
          description:
            "Auto-close stale tasks, remind owners before deadlines, and escalate blockers — all configurable without code.",
        },
      ],
    },
    {
      type: "testimonials",
      eyebrow: "Loved by remote teams",
      title: "Teams that switched to async",
      items: [
        {
          quote:
            "We cut our weekly meeting load by 80% in the first month. The team says it's the most focused they've ever been.",
          author: "Yuki Tanaka",
          role: "Engineering Manager, Prism Labs",
        },
        {
          quote:
            "Orbit replaced four tools — Jira, Confluence, Slack status updates, and our sprint board. Everything is finally in one place.",
          author: "Fatima Al-Rashid",
          role: "Product Director, Crestline",
        },
        {
          quote:
            "We're a 12-person team spread across 8 time zones. Orbit is the reason we actually ship on time.",
          author: "Ben Howarth",
          role: "CTO, Archipelago",
        },
      ],
    },
    {
      type: "pricing",
      eyebrow: "Pricing",
      title: "Simple pricing, no surprises",
      subtitle: "Cancel or change plan any time. Always transparent.",
      tiers: [
        {
          name: "Starter",
          price: "$0",
          period: "/mo",
          description: "For small teams just getting started.",
          features: [
            "Up to 5 members",
            "3 active projects",
            "GitHub integration",
            "30-day history",
          ],
          cta: { label: "Get started free", href: "#", variant: "secondary" },
        },
        {
          name: "Growth",
          price: "$16",
          period: "/seat/mo",
          description: "For scaling teams that ship fast.",
          featured: true,
          features: [
            "Unlimited members",
            "Unlimited projects",
            "All integrations",
            "Automations",
            "Capacity planning",
            "Priority support",
          ],
          cta: { label: "Start 30-day trial", href: "#", variant: "primary" },
        },
        {
          name: "Enterprise",
          price: "Custom",
          description: "For large orgs with security & compliance needs.",
          features: [
            "SSO & SCIM",
            "Audit logs",
            "Custom data residency",
            "Dedicated CSM",
            "SLA",
          ],
          cta: { label: "Contact sales", href: "#", variant: "secondary" },
        },
      ],
    },
    {
      type: "faq",
      eyebrow: "FAQ",
      title: "Still have questions?",
      items: [
        {
          question: "How is Orbit different from Linear or Jira?",
          answer:
            "Orbit is async-first by design — it replaces the communication layer (Slack threads, stand-ups, status emails) that Jira and Linear don't touch. Think of it as project management plus team communication, minus the noise.",
        },
        {
          question: "Does Orbit work with our existing tools?",
          answer:
            "Yes. Orbit has native integrations with GitHub, GitLab, Figma, Notion, Slack, and Google Drive. We also offer a Zapier connector and a public API.",
        },
        {
          question: "What does the migration from Jira look like?",
          answer:
            "Our import wizard pulls your Jira projects, issues, and labels in under 10 minutes. We've migrated 500+ teams — it's rarely more than an afternoon of work.",
        },
        {
          question: "Is there a data export option?",
          answer:
            "Full JSON and CSV export at any time. Your data is yours, always. We don't hold it hostage if you decide to leave.",
        },
      ],
    },
    {
      type: "cta",
      title: "Your team deserves calmer, faster work",
      subtitle:
        "Join 18,000 teams that replaced meeting chaos with async clarity. 30 days free.",
      actions: [
        { label: "Try Orbit free", href: "#", variant: "primary" },
        { label: "Book a walkthrough", href: "#", variant: "ghost" },
      ],
    },
    {
      type: "footer",
      brand: "Orbit",
      tagline: "Async-first project management for remote teams that ship.",
      columns: [
        {
          heading: "Product",
          links: [
            { label: "Features", href: "#features" },
            { label: "Integrations", href: "#" },
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
            { label: "Security", href: "#" },
          ],
        },
      ],
      legal: "© 2026 Orbit Software, Inc. All rights reserved.",
    },
  ],
};

export default orbit;
