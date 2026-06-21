import type { LandingConfig } from "@/lib/landing.types";

/**
 * Ledgerly — fictional personal finance & budgeting app.
 * Dark theme with an emerald accent.
 */
const ledgerly: LandingConfig = {
  meta: {
    slug: "ledgerly",
    title: "Ledgerly — Money that finally makes sense",
    description:
      "Ledgerly connects every account, automates your budget, and shows exactly where your money goes.",
  },
  theme: {
    primary: "16 185 129", // emerald
    bg: "10 15 13",
    surface: "18 26 22",
    fg: "228 240 234",
    muted: "139 158 149",
    border: "32 46 39",
    mode: "dark",
    radius: "0.85rem",
    font: '"Inter", system-ui, sans-serif',
  },
  sections: [
    {
      type: "hero",
      eyebrow: "Now with smart auto-budgets",
      title: "Money that finally makes sense",
      subtitle:
        "Ledgerly connects all your accounts, sorts every transaction automatically, and tells you what you can safely spend today.",
      actions: [
        { label: "Get Ledgerly free", href: "#pricing", variant: "primary" },
        { label: "See how it works", href: "#features", variant: "secondary" },
      ],
      note: "Bank-grade encryption · Read-only access · Cancel anytime",
    },
    {
      type: "stats",
      items: [
        { value: "$2.1B", label: "Tracked monthly" },
        { value: "640K", label: "Active members" },
        { value: "$3,400", label: "Avg. yearly savings" },
        { value: "12,000+", label: "Banks supported" },
      ],
    },
    {
      type: "features",
      eyebrow: "Why Ledgerly",
      title: "Your whole financial life, in focus",
      subtitle:
        "Powerful enough for spreadsheet nerds, simple enough for everyone else.",
      columns: 3,
      items: [
        {
          icon: "Wallet",
          title: "All accounts, one view",
          description:
            "Link checking, savings, cards, and investments to see your true net worth update in real time.",
        },
        {
          icon: "Sparkles",
          title: "Auto-categorization",
          description:
            "Every transaction is sorted instantly and learns from your edits, so your budget stays accurate.",
        },
        {
          icon: "Target",
          title: "Safe-to-spend",
          description:
            "After bills and goals, Ledgerly shows exactly what's left to spend without breaking your plan.",
        },
        {
          icon: "PiggyBank",
          title: "Goals that grow",
          description:
            "Set targets for trips, an emergency fund, or a home, and watch automated transfers fill them.",
        },
        {
          icon: "BellRing",
          title: "Subscription radar",
          description:
            "Spot forgotten subscriptions and price hikes before they quietly drain your account.",
        },
        {
          icon: "Lock",
          title: "Private & secure",
          description:
            "256-bit encryption and read-only bank connections. We never sell your data — ever.",
        },
      ],
    },
    {
      type: "testimonials",
      eyebrow: "Member stories",
      title: "From anxious to in control",
      items: [
        {
          quote:
            "I paid off $11k in 14 months. Seeing safe-to-spend every morning completely changed my habits.",
          author: "Jordan Pierce",
          role: "Freelance Designer",
        },
        {
          quote:
            "Ledgerly found four subscriptions I forgot about. It saved me more in a month than it costs in a year.",
          author: "Sofia Ramirez",
          role: "Small Business Owner",
        },
        {
          quote:
            "Finally a budget app my partner and I both actually use. The shared goals feature is brilliant.",
          author: "Liam O'Connor",
          role: "Teacher",
        },
      ],
    },
    {
      type: "pricing",
      eyebrow: "Pricing",
      title: "Start free, upgrade when it pays off",
      subtitle: "No trials that auto-charge. No surprise fees.",
      tiers: [
        {
          name: "Basic",
          price: "$0",
          period: "/mo",
          description: "For getting your bearings.",
          features: [
            "Up to 2 linked accounts",
            "Auto-categorization",
            "Monthly budget",
          ],
          cta: { label: "Start free", href: "#", variant: "secondary" },
        },
        {
          name: "Premium",
          price: "$8",
          period: "/mo",
          description: "For taking full control.",
          featured: true,
          features: [
            "Unlimited accounts",
            "Safe-to-spend & goals",
            "Subscription radar",
            "Net worth & investments",
            "Custom categories",
          ],
          cta: { label: "Go Premium", href: "#", variant: "primary" },
        },
        {
          name: "Household",
          price: "$13",
          period: "/mo",
          description: "Shared money, made simple.",
          features: [
            "Everything in Premium",
            "Up to 5 members",
            "Shared goals & bills",
            "Per-person spending",
          ],
          cta: { label: "Choose Household", href: "#", variant: "secondary" },
        },
      ],
    },
    {
      type: "faq",
      eyebrow: "FAQ",
      title: "Questions, answered",
      items: [
        {
          question: "Is it safe to connect my bank?",
          answer:
            "Yes. Ledgerly uses read-only, bank-grade encrypted connections through trusted aggregators. We can never move your money.",
        },
        {
          question: "How does auto-budgeting work?",
          answer:
            "Ledgerly reviews your recent income and spending to suggest realistic category limits, then adjusts as your habits change.",
        },
        {
          question: "Will you sell my financial data?",
          answer:
            "Never. We make money from subscriptions, not your data. You can export or delete everything at any time.",
        },
        {
          question: "Which banks are supported?",
          answer:
            "Over 12,000 institutions across the US, UK, Canada, and the EU — including most credit unions and brokerages.",
        },
      ],
    },
    {
      type: "cta",
      title: "Know exactly where your money goes",
      subtitle:
        "Join 640,000 people who turned financial stress into a simple daily glance with Ledgerly.",
      actions: [
        { label: "Get Ledgerly free", href: "#", variant: "primary" },
        { label: "Compare plans", href: "#pricing", variant: "ghost" },
      ],
    },
    {
      type: "footer",
      brand: "Ledgerly",
      tagline: "Money that finally makes sense.",
      columns: [
        {
          heading: "Product",
          links: [
            { label: "Budgeting", href: "#features" },
            { label: "Goals", href: "#features" },
            { label: "Pricing", href: "#pricing" },
          ],
        },
        {
          heading: "Company",
          links: [
            { label: "About", href: "#" },
            { label: "Security", href: "#" },
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
      legal: "© 2026 Ledgerly Financial. A fictional demo product.",
    },
  ],
};

export default ledgerly;
