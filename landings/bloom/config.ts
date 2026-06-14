import type { LandingConfig } from "@/lib/landing.types";

const bloom: LandingConfig = {
  meta: {
    slug: "bloom",
    title: "Bloom — Personalized wellness that actually fits your life",
    description:
      "Bloom is the AI-powered wellness companion that adapts to your schedule, energy, and goals — building habits that stick.",
  },
  theme: {
    primary: "52 211 153",
    bg: "250 252 250",
    surface: "255 255 255",
    fg: "18 40 30",
    muted: "100 130 115",
    border: "210 230 220",
    mode: "light",
    radius: "1.25rem",
    font: '"Nunito", "DM Sans", system-ui, sans-serif',
  },
  sections: [
    {
      type: "hero",
      eyebrow: "Your personal wellness coach",
      title: "Build habits that stick — not just streaks",
      subtitle:
        "Bloom learns your rhythms, energy patterns, and goals to build a wellness routine you'll actually keep. No rigid plans, no guilt trips.",
      actions: [
        { label: "Try Bloom free", href: "#pricing", variant: "primary" },
        { label: "See how it works", href: "#features", variant: "secondary" },
      ],
      note: "14-day free trial · Cancel any time · iOS & Android",
    },
    {
      type: "stats",
      items: [
        { value: "320K+", label: "Active members" },
        { value: "87%", label: "Still going after 90 days" },
        { value: "4.8 ★", label: "App Store rating" },
        { value: "18 min", label: "Avg. daily engagement" },
      ],
    },
    {
      type: "features",
      eyebrow: "How Bloom works",
      title: "Wellness that adapts — not prescribes",
      subtitle:
        "Science-backed routines personalized to you, not a one-size-fits-all program.",
      columns: 3,
      items: [
        {
          icon: "Brain",
          title: "Adaptive scheduling",
          description:
            "Bloom reads your calendar and energy data to schedule workouts, meditations, and check-ins when you'll actually do them.",
        },
        {
          icon: "Heart",
          title: "Holistic tracking",
          description:
            "Sleep, movement, nutrition, mindfulness — all in one view. Connect Apple Health, Garmin, Whoop, or Oura.",
        },
        {
          icon: "Sparkles",
          title: "AI coach check-ins",
          description:
            "Daily micro-conversations that keep you motivated without the pressure. Your coach remembers your context week to week.",
        },
        {
          icon: "Target",
          title: "Goal-based plans",
          description:
            "Weight, stress, sleep, strength — pick your focus. Bloom builds the path and adjusts when life gets in the way.",
        },
        {
          icon: "Users",
          title: "Community challenges",
          description:
            "Opt into group challenges and accountability pods. The social layer is opt-in, never in-your-face.",
        },
        {
          icon: "TrendingUp",
          title: "Weekly insights",
          description:
            "Plain-language summaries of your progress, patterns, and the one small thing to focus on next week.",
        },
      ],
    },
    {
      type: "testimonials",
      eyebrow: "Real people, real results",
      title: "Habits that actually last",
      items: [
        {
          quote:
            "I've tried every wellness app. Bloom is the first one that didn't make me feel like a failure on a bad day. It just adapts.",
          author: "Lena Fischer",
          role: "Teacher, Munich",
        },
        {
          quote:
            "Six months in, I'm sleeping better, moving more, and my anxiety is noticeably lower. The AI check-ins genuinely feel supportive.",
          author: "Marcus Osei",
          role: "Software Engineer, London",
        },
        {
          quote:
            "Bloom figured out I'm a night person and stopped scheduling 6am runs. Obvious in hindsight, but no other app ever did that.",
          author: "Camila Reyes",
          role: "Graphic Designer, São Paulo",
        },
      ],
    },
    {
      type: "pricing",
      eyebrow: "Pricing",
      title: "Start free, grow at your pace",
      subtitle:
        "Bloom is affordable because wellness shouldn't be a luxury.",
      tiers: [
        {
          name: "Free",
          price: "$0",
          period: "/mo",
          description: "Explore the basics with no commitment.",
          features: [
            "Basic habit tracking",
            "3 guided routines",
            "Weekly summary",
          ],
          cta: { label: "Get started", href: "#", variant: "secondary" },
        },
        {
          name: "Plus",
          price: "$9",
          period: "/mo",
          description: "For people serious about building lasting habits.",
          featured: true,
          features: [
            "Unlimited routines",
            "AI coach check-ins",
            "Health app integrations",
            "Community challenges",
            "Goal-based adaptive plans",
          ],
          cta: { label: "Start free trial", href: "#", variant: "primary" },
        },
        {
          name: "Family",
          price: "$19",
          period: "/mo",
          description: "Wellness for up to 6 people under one plan.",
          features: [
            "Everything in Plus",
            "6 member accounts",
            "Family dashboard",
            "Shared challenges",
          ],
          cta: { label: "Try family plan", href: "#", variant: "secondary" },
        },
      ],
    },
    {
      type: "faq",
      eyebrow: "FAQ",
      title: "Common questions",
      items: [
        {
          question: "Is Bloom backed by science?",
          answer:
            "Yes. Our habit-formation framework draws on research from Stanford's behavior lab and published sleep science. We cite our sources inside the app.",
        },
        {
          question: "What wearables does Bloom support?",
          answer:
            "Apple Watch, Garmin, Whoop, Oura, Fitbit, and any device that syncs to Apple Health or Google Fit.",
        },
        {
          question: "Can I cancel any time?",
          answer:
            "Absolutely. Cancel from the app or web in under 30 seconds. No dark patterns, no retention calls.",
        },
        {
          question: "Is my health data private?",
          answer:
            "Your data is never sold. Bloom is HIPAA-aligned, encrypted at rest and in transit, and you can export or delete everything at any time.",
        },
      ],
    },
    {
      type: "cta",
      title: "Your healthiest self is closer than you think",
      subtitle:
        "Join 320,000 people building wellness habits that actually stick. First 14 days free.",
      actions: [
        { label: "Start free trial", href: "#", variant: "primary" },
        { label: "Learn more", href: "#features", variant: "ghost" },
      ],
    },
    {
      type: "footer",
      brand: "Bloom",
      tagline: "Personalized wellness that adapts to your real life.",
      columns: [
        {
          heading: "Product",
          links: [
            { label: "Features", href: "#features" },
            { label: "Pricing", href: "#pricing" },
            { label: "Download", href: "#" },
          ],
        },
        {
          heading: "Company",
          links: [
            { label: "About", href: "#" },
            { label: "Blog", href: "#" },
            { label: "Press", href: "#" },
          ],
        },
        {
          heading: "Legal",
          links: [
            { label: "Privacy", href: "/privacy" },
            { label: "Terms", href: "/terms" },
            { label: "HIPAA", href: "#" },
          ],
        },
      ],
      legal: "© 2026 Bloom Health, Inc. All rights reserved.",
    },
  ],
};

export default bloom;
