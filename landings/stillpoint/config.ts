import type { LandingConfig } from "@/lib/landing.types";

/**
 * Stillpoint — fictional meditation & focus app.
 * Light theme with a calming sage accent.
 */
const stillpoint: LandingConfig = {
  meta: {
    slug: "stillpoint",
    title: "Stillpoint — Find your focus, one breath at a time",
    description:
      "Stillpoint blends guided meditation, focus soundscapes, and gentle reminders to help you stay calm and present.",
  },
  theme: {
    primary: "82 138 110", // sage green
    bg: "248 246 240",
    surface: "255 254 250",
    fg: "38 44 40",
    muted: "112 122 114",
    border: "226 222 212",
    mode: "light",
    radius: "1.25rem",
    font: '"Inter", system-ui, sans-serif',
  },
  sections: [
    {
      type: "hero",
      eyebrow: "Your calmer everyday",
      title: "Find your focus, one breath at a time",
      subtitle:
        "Stillpoint brings together guided meditations, focus soundscapes, and gentle nudges — so calm fits inside the day you already have.",
      actions: [
        { label: "Start free for 14 days", href: "#pricing", variant: "primary" },
        { label: "Explore the library", href: "#features", variant: "secondary" },
      ],
      note: "No ads · Cancel anytime · Loved by 1.2M people",
    },
    {
      type: "stats",
      items: [
        { value: "1.2M", label: "Daily meditators" },
        { value: "900+", label: "Guided sessions" },
        { value: "4.9★", label: "App Store rating" },
        { value: "18 min", label: "Avg. focus gain" },
      ],
    },
    {
      type: "features",
      eyebrow: "What's inside",
      title: "Calm, designed to be effortless",
      subtitle:
        "Every feature is built to lower the friction between you and a clearer mind.",
      columns: 3,
      items: [
        {
          icon: "Wind",
          title: "Guided breathing",
          description:
            "Animated breath pacers for stress, sleep, and focus — from 60 seconds to deep sessions.",
        },
        {
          icon: "Music",
          title: "Focus soundscapes",
          description:
            "Adaptive ambient mixes that respond to the time of day and gently fade as you settle in.",
        },
        {
          icon: "Moon",
          title: "Sleep stories",
          description:
            "Drift off to calming narrations recorded by world-class voices and sound designers.",
        },
        {
          icon: "Sun",
          title: "Morning rituals",
          description:
            "Short, intention-setting sessions to start the day grounded instead of reactive.",
        },
        {
          icon: "Heart",
          title: "Mood check-ins",
          description:
            "A 10-second daily check-in surfaces patterns and recommends the right session for now.",
        },
        {
          icon: "Sprout",
          title: "Gentle streaks",
          description:
            "Encouragement without pressure — your progress is celebrated, never weaponized.",
        },
      ],
    },
    {
      type: "testimonials",
      eyebrow: "From our community",
      title: "Small moments, big shift",
      items: [
        {
          quote:
            "I've tried every meditation app. Stillpoint is the first one that actually stuck — it's so quiet and uncluttered.",
          author: "Amara Lindqvist",
          role: "Teacher",
        },
        {
          quote:
            "The morning ritual is now non-negotiable. I'm noticeably less reactive with my kids before school.",
          author: "Daniel Okoye",
          role: "Product Designer",
        },
        {
          quote:
            "The sleep stories knocked my 2am scrolling habit. I fall asleep before they even finish.",
          author: "Mei Lin",
          role: "Nurse",
        },
      ],
    },
    {
      type: "pricing",
      eyebrow: "Membership",
      title: "One plan. Everything unlocked.",
      subtitle: "Start free. Keep it if it makes your days calmer.",
      tiers: [
        {
          name: "Free",
          price: "$0",
          period: "/mo",
          description: "A taste of calm to begin.",
          features: [
            "Daily free session",
            "3 breathing exercises",
            "Basic mood check-in",
          ],
          cta: { label: "Download the app", href: "#", variant: "secondary" },
        },
        {
          name: "Plus",
          price: "$9",
          period: "/mo",
          description: "Everything Stillpoint offers.",
          featured: true,
          features: [
            "Full 900+ session library",
            "All soundscapes & sleep stories",
            "Offline downloads",
            "Personalized recommendations",
            "Mood insights over time",
          ],
          cta: { label: "Start free trial", href: "#", variant: "primary" },
        },
        {
          name: "Family",
          price: "$15",
          period: "/mo",
          description: "Calm for up to 6 people.",
          features: [
            "Everything in Plus",
            "Up to 6 profiles",
            "Kids' bedtime collection",
            "Shared family streak",
          ],
          cta: { label: "Choose Family", href: "#", variant: "secondary" },
        },
      ],
    },
    {
      type: "faq",
      eyebrow: "Good to know",
      title: "Questions, answered",
      items: [
        {
          question: "Do I need any experience to start?",
          answer:
            "Not at all. Stillpoint has beginner journeys that walk you through the very basics in a few minutes a day.",
        },
        {
          question: "Can I use it offline?",
          answer:
            "Yes — Plus and Family members can download any session for flights, commutes, or screen-free time.",
        },
        {
          question: "Will it nag me with notifications?",
          answer:
            "Only if you want. Reminders are fully optional and designed to be gentle, never guilt-inducing.",
        },
        {
          question: "Can I cancel anytime?",
          answer:
            "Absolutely. Cancel in two taps and keep access until the end of your billing period — no questions asked.",
        },
      ],
    },
    {
      type: "cta",
      title: "Your calmest year starts today",
      subtitle:
        "Join over a million people building a quieter, more focused everyday with Stillpoint.",
      actions: [
        { label: "Start free for 14 days", href: "#", variant: "primary" },
        { label: "Browse sessions", href: "#", variant: "ghost" },
      ],
    },
    {
      type: "footer",
      brand: "Stillpoint",
      tagline: "Find your focus, one breath at a time.",
      columns: [
        {
          heading: "Explore",
          links: [
            { label: "Meditations", href: "#features" },
            { label: "Sleep", href: "#features" },
            { label: "Pricing", href: "#pricing" },
          ],
        },
        {
          heading: "Company",
          links: [
            { label: "About", href: "#" },
            { label: "Teachers", href: "#" },
            { label: "Press", href: "#" },
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
      legal: "© 2026 Stillpoint. A fictional demo product.",
    },
  ],
};

export default stillpoint;
