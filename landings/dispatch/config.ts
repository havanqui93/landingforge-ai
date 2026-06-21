import type { LandingConfig } from "@/lib/landing.types";

/**
 * Dispatch — fictional newsletter & creator publishing platform.
 * Light theme with a rose accent.
 */
const dispatch: LandingConfig = {
  meta: {
    slug: "dispatch",
    title: "Dispatch — Write to your people, own your audience",
    description:
      "Dispatch is the publishing platform for writers and creators: beautiful newsletters, real analytics, and payments built in.",
  },
  theme: {
    primary: "225 76 122", // rose
    bg: "252 248 250",
    surface: "255 255 255",
    fg: "38 26 32",
    muted: "126 106 114",
    border: "240 226 232",
    mode: "light",
    radius: "1rem",
    font: '"Inter", system-ui, sans-serif',
  },
  sections: [
    {
      type: "hero",
      eyebrow: "The home for independent writers",
      title: "Write to your people, own your audience",
      subtitle:
        "Dispatch gives you a beautiful newsletter, a fast website, and built-in payments — so you can focus on writing while owning every subscriber relationship.",
      actions: [
        { label: "Start writing free", href: "#pricing", variant: "primary" },
        { label: "See an example", href: "#features", variant: "secondary" },
      ],
      note: "Free to start · Keep 100% on free plan · Export your list anytime",
    },
    {
      type: "stats",
      items: [
        { value: "120K", label: "Writers publishing" },
        { value: "$240M", label: "Paid to creators" },
        { value: "58%", label: "Avg. open rate" },
        { value: "4.9★", label: "Creator rating" },
      ],
    },
    {
      type: "features",
      eyebrow: "Why Dispatch",
      title: "Everything to publish and get paid",
      subtitle:
        "No plugins, no patchwork. Dispatch handles the whole stack so you can just hit send.",
      columns: 3,
      items: [
        {
          icon: "PenLine",
          title: "Distraction-free editor",
          description:
            "A clean writing space that turns into a polished email and web post the moment you publish.",
        },
        {
          icon: "Mail",
          title: "Newsletters that land",
          description:
            "High-deliverability sending with built-in warmup, so your words reach the inbox, not spam.",
        },
        {
          icon: "CreditCard",
          title: "Payments built in",
          description:
            "Turn on paid subscriptions in a click and start earning recurring revenue from day one.",
        },
        {
          icon: "BarChart3",
          title: "Honest analytics",
          description:
            "Real opens, clicks, and growth — plus which posts convert free readers into paying ones.",
        },
        {
          icon: "Users",
          title: "You own the list",
          description:
            "Your subscribers are yours. Export the full list anytime — no lock-in, no hostage-taking.",
        },
        {
          icon: "Globe",
          title: "Your own site",
          description:
            "Every publication gets a fast, customizable website and a custom domain at no extra cost.",
        },
      ],
    },
    {
      type: "testimonials",
      eyebrow: "Creator stories",
      title: "Independence, made sustainable",
      items: [
        {
          quote:
            "I left a platform that took 30% and replaced my salary on Dispatch within five months.",
          author: "Marisol Reyes",
          role: "Food & culture writer",
        },
        {
          quote:
            "Switching was painless — I imported 12k subscribers in minutes and deliverability actually improved.",
          author: "Theo Adeyemi",
          role: "Tech essayist",
        },
        {
          quote:
            "Payments, site, and newsletter in one place means I write more and fiddle with tools less.",
          author: "Hana Park",
          role: "Independent journalist",
        },
      ],
    },
    {
      type: "pricing",
      eyebrow: "Pricing",
      title: "Start free, pay only when you earn",
      subtitle: "No monthly fee to publish. We earn a small cut only on paid subscriptions.",
      tiers: [
        {
          name: "Free",
          price: "$0",
          period: "/mo",
          description: "Everything to start publishing.",
          features: [
            "Unlimited free subscribers",
            "Newsletter + website",
            "Custom domain",
            "Core analytics",
          ],
          cta: { label: "Start free", href: "#", variant: "secondary" },
        },
        {
          name: "Creator",
          price: "5%",
          period: "of paid revenue",
          description: "For writers earning from their work.",
          featured: true,
          features: [
            "Everything in Free",
            "Paid subscriptions",
            "Advanced analytics",
            "Subscriber segments",
            "Priority support",
          ],
          cta: { label: "Enable payments", href: "#", variant: "primary" },
        },
        {
          name: "Pro",
          price: "$29",
          period: "/mo",
          description: "Flat fee for high earners.",
          features: [
            "0% on paid revenue",
            "Team collaborators",
            "Automations & series",
            "API access",
            "Dedicated support",
          ],
          cta: { label: "Go Pro", href: "#", variant: "secondary" },
        },
      ],
    },
    {
      type: "faq",
      eyebrow: "FAQ",
      title: "Questions, answered",
      items: [
        {
          question: "Can I bring my existing subscribers?",
          answer:
            "Yes. Import your list in minutes from a CSV or another platform — and you can export it again anytime.",
        },
        {
          question: "How do payouts work?",
          answer:
            "Connect a payout account and Dispatch handles billing, taxes, and transfers, depositing your earnings on a regular schedule.",
        },
        {
          question: "Will my emails actually get delivered?",
          answer:
            "Deliverability is our obsession — managed sending infrastructure and automatic warmup keep you out of the spam folder.",
        },
        {
          question: "Is there really no monthly fee to start?",
          answer:
            "Correct. The Free plan is fully featured for publishing; we only take a small percentage when you earn from paid subscriptions.",
        },
      ],
    },
    {
      type: "cta",
      title: "Your words. Your audience. Your business.",
      subtitle:
        "Join 120,000 writers building independent, sustainable publications on Dispatch.",
      actions: [
        { label: "Start writing free", href: "#", variant: "primary" },
        { label: "Read the guide", href: "#", variant: "ghost" },
      ],
    },
    {
      type: "footer",
      brand: "Dispatch",
      tagline: "Write to your people, own your audience.",
      columns: [
        {
          heading: "Product",
          links: [
            { label: "Features", href: "#features" },
            { label: "Payments", href: "#features" },
            { label: "Pricing", href: "#pricing" },
          ],
        },
        {
          heading: "Creators",
          links: [
            { label: "Discover", href: "#" },
            { label: "Creator stories", href: "#" },
            { label: "Help center", href: "#" },
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
      legal: "© 2026 Dispatch Media. A fictional demo product.",
    },
  ],
};

export default dispatch;
