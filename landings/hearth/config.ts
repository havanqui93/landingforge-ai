import type { LandingConfig } from "@/lib/landing.types";

/**
 * Hearth — fictional smart-home hub & automation platform.
 * Dark theme with a warm-orange accent.
 */
const hearth: LandingConfig = {
  meta: {
    slug: "hearth",
    title: "Hearth — A smart home that feels like home",
    description:
      "Hearth unifies every smart device into one calm app and learns your routines so your home just works.",
  },
  theme: {
    primary: "249 146 58", // warm orange
    bg: "16 13 11",
    surface: "26 21 17",
    fg: "242 234 226",
    muted: "166 150 138",
    border: "48 39 31",
    mode: "dark",
    radius: "1rem",
    font: '"Inter", system-ui, sans-serif',
  },
  sections: [
    {
      type: "hero",
      eyebrow: "Works with 100,000+ devices",
      title: "A smart home that feels like home",
      subtitle:
        "Hearth brings every light, lock, and thermostat into one calm app — then learns your routines so the right thing happens before you ask.",
      actions: [
        { label: "Get the Hearth Hub", href: "#pricing", variant: "primary" },
        { label: "See how it works", href: "#features", variant: "secondary" },
      ],
      note: "Local-first · No subscription required · Set up in 10 minutes",
    },
    {
      type: "stats",
      items: [
        { value: "100K+", label: "Compatible devices" },
        { value: "320K", label: "Homes connected" },
        { value: "40%", label: "Avg. energy saved" },
        { value: "4.8★", label: "Owner rating" },
      ],
    },
    {
      type: "features",
      eyebrow: "Why Hearth",
      title: "One home, perfectly in sync",
      subtitle:
        "Hearth replaces a drawer full of half-working apps with one that actually feels effortless.",
      columns: 3,
      items: [
        {
          icon: "Home",
          title: "Everything in one app",
          description:
            "Lights, locks, cameras, climate, and media from any brand, finally controlled in a single place.",
        },
        {
          icon: "Sparkles",
          title: "Routines that learn",
          description:
            "Hearth notices your patterns and suggests automations — wake-up, away, movie night — that just work.",
        },
        {
          icon: "Cpu",
          title: "Local-first control",
          description:
            "Core automations run on the hub, so your home keeps working even when the internet doesn't.",
        },
        {
          icon: "Leaf",
          title: "Energy insights",
          description:
            "See what's drawing power and let Hearth trim waste, cutting bills without you lifting a finger.",
        },
        {
          icon: "ShieldCheck",
          title: "Private by design",
          description:
            "Video and sensor data stay on your hub. No data resale, no mandatory cloud, ever.",
        },
        {
          icon: "Mic",
          title: "Voice & widgets",
          description:
            "Works with your favorite assistants plus fast widgets and a tap-friendly wall dashboard.",
        },
      ],
    },
    {
      type: "testimonials",
      eyebrow: "From real homes",
      title: "The home that anticipates you",
      items: [
        {
          quote:
            "Hearth replaced five apps. The morning routine kicks in before my alarm and the house is just ready.",
          author: "Daniel Cho",
          role: "Homeowner",
        },
        {
          quote:
            "Local control sold me. When our wifi went down for a day, every automation still ran perfectly.",
          author: "Fatima Noor",
          role: "Smart-home enthusiast",
        },
        {
          quote:
            "Our energy bill dropped noticeably the first month. The insights showed exactly where it was leaking.",
          author: "Greg Salonen",
          role: "Owner of 2 Hearth Hubs",
        },
      ],
    },
    {
      type: "pricing",
      eyebrow: "Pricing",
      title: "Own your home, not a subscription",
      subtitle: "Buy the hub once. Premium features are optional, never required.",
      tiers: [
        {
          name: "Hearth Hub",
          price: "$149",
          period: "one-time",
          description: "The core of your smart home.",
          features: [
            "Unlimited devices",
            "Local automations",
            "All core controls",
            "Free app, forever",
          ],
          cta: { label: "Buy the Hub", href: "#", variant: "secondary" },
        },
        {
          name: "Hearth+",
          price: "$5",
          period: "/mo",
          description: "For power users who want more.",
          featured: true,
          features: [
            "Adaptive learning routines",
            "30-day video history",
            "Advanced energy reports",
            "Remote access & sharing",
            "Priority support",
          ],
          cta: { label: "Start Hearth+", href: "#", variant: "primary" },
        },
        {
          name: "Whole Home",
          price: "$399",
          period: "bundle",
          description: "Hub plus essential sensors.",
          features: [
            "Hearth Hub",
            "4 motion + door sensors",
            "Smart plug pack",
            "1 year of Hearth+",
          ],
          cta: { label: "Get the bundle", href: "#", variant: "secondary" },
        },
      ],
    },
    {
      type: "faq",
      eyebrow: "FAQ",
      title: "Questions, answered",
      items: [
        {
          question: "Will it work with the devices I already own?",
          answer:
            "Almost certainly — Hearth supports over 100,000 devices across Matter, Zigbee, Z-Wave, Wi-Fi, and Thread.",
        },
        {
          question: "Do I need a subscription?",
          answer:
            "No. The hub and core features are yours after a one-time purchase. Hearth+ is optional for advanced extras.",
        },
        {
          question: "What happens if my internet goes down?",
          answer:
            "Your routines keep running. Hearth is local-first, so the hub controls your home with or without the cloud.",
        },
        {
          question: "Is my video and sensor data private?",
          answer:
            "Yes. Data is processed and stored locally on your hub by default. We never sell or mine your home data.",
        },
      ],
    },
    {
      type: "cta",
      title: "Make your home feel effortless",
      subtitle:
        "Set up Hearth in ten minutes and let your home start taking care of the little things.",
      actions: [
        { label: "Get the Hearth Hub", href: "#", variant: "primary" },
        { label: "Check compatibility", href: "#", variant: "ghost" },
      ],
    },
    {
      type: "footer",
      brand: "Hearth",
      tagline: "A smart home that feels like home.",
      columns: [
        {
          heading: "Product",
          links: [
            { label: "Features", href: "#features" },
            { label: "Compatibility", href: "#" },
            { label: "Pricing", href: "#pricing" },
          ],
        },
        {
          heading: "Support",
          links: [
            { label: "Setup guides", href: "#" },
            { label: "Help center", href: "#" },
            { label: "Community", href: "#" },
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
      legal: "© 2026 Hearth Home, Inc. A fictional demo product.",
    },
  ],
};

export default hearth;
