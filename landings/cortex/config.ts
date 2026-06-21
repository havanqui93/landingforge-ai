import type { LandingConfig } from "@/lib/landing.types";

/**
 * Cortex — fictional AI note-taking & knowledge workspace.
 * Light theme with an indigo accent.
 */
const cortex: LandingConfig = {
  meta: {
    slug: "cortex",
    title: "Cortex — Your second brain, finally connected",
    description:
      "Cortex captures your notes, meetings, and docs, then links them automatically so you never lose an idea again.",
  },
  theme: {
    primary: "99 102 241", // indigo
    bg: "250 250 253",
    surface: "255 255 255",
    fg: "26 27 38",
    muted: "108 110 128",
    border: "229 230 240",
    mode: "light",
    radius: "1rem",
    font: '"Inter", system-ui, sans-serif',
  },
  sections: [
    {
      type: "hero",
      eyebrow: "Meet your AI workspace",
      title: "Your second brain, finally connected",
      subtitle:
        "Cortex captures notes, meetings, and docs — then links related ideas automatically so the right thought always finds you.",
      actions: [
        { label: "Try Cortex free", href: "#pricing", variant: "primary" },
        { label: "Watch the tour", href: "#features", variant: "secondary" },
      ],
      note: "Free forever plan · Works offline · Your data stays yours",
    },
    {
      type: "stats",
      items: [
        { value: "320K", label: "Knowledge workers" },
        { value: "11M", label: "Notes connected" },
        { value: "6.5 hrs", label: "Saved per week" },
        { value: "4.8★", label: "Average rating" },
      ],
    },
    {
      type: "features",
      eyebrow: "Why Cortex",
      title: "Capture less, remember more",
      subtitle:
        "Cortex does the busywork of organizing so you can stay in the flow of thinking.",
      columns: 3,
      items: [
        {
          icon: "Link2",
          title: "Auto-linked notes",
          description:
            "Cortex surfaces related notes as you type, building a living map of everything you know.",
        },
        {
          icon: "Mic",
          title: "Meeting capture",
          description:
            "Record, transcribe, and summarize meetings into searchable notes with action items extracted.",
        },
        {
          icon: "Search",
          title: "Ask your notes",
          description:
            "Ask a question in plain language and get answers cited from your own knowledge base.",
        },
        {
          icon: "Layers",
          title: "Everything in one place",
          description:
            "Docs, tasks, web clips, and PDFs live side by side — no more hunting across ten apps.",
        },
        {
          icon: "Users",
          title: "Shared brains",
          description:
            "Invite your team to a shared space where knowledge compounds instead of getting siloed.",
        },
        {
          icon: "WifiOff",
          title: "Offline first",
          description:
            "Everything works on a plane or a subway and syncs the moment you're back online.",
        },
      ],
    },
    {
      type: "testimonials",
      eyebrow: "Loved by thinkers",
      title: "The notes app that thinks with you",
      items: [
        {
          quote:
            "Cortex resurfaced a note from two years ago that solved my exact problem. It felt like magic.",
          author: "Elena Vasquez",
          role: "Researcher",
        },
        {
          quote:
            "Meeting summaries alone save me an hour a day. The action items just appear in my task list.",
          author: "Marcus Hale",
          role: "Product Manager",
        },
        {
          quote:
            "I moved my whole team's wiki into Cortex. Onboarding new hires is finally painless.",
          author: "Aisha Rahman",
          role: "Engineering Manager",
        },
      ],
    },
    {
      type: "pricing",
      eyebrow: "Pricing",
      title: "Free for individuals, fair for teams",
      subtitle: "Start free forever. Upgrade for AI and collaboration.",
      tiers: [
        {
          name: "Personal",
          price: "$0",
          period: "/mo",
          description: "Your private second brain.",
          features: [
            "Unlimited notes",
            "Auto-linking",
            "Offline sync",
            "Web clipper",
          ],
          cta: { label: "Start free", href: "#", variant: "secondary" },
        },
        {
          name: "Pro",
          price: "$12",
          period: "/mo",
          description: "AI superpowers for power users.",
          featured: true,
          features: [
            "Everything in Personal",
            "Ask your notes (AI)",
            "Meeting transcription",
            "Unlimited web clips",
            "Priority support",
          ],
          cta: { label: "Go Pro", href: "#", variant: "primary" },
        },
        {
          name: "Team",
          price: "$20",
          period: "/user/mo",
          description: "Shared knowledge for teams.",
          features: [
            "Everything in Pro",
            "Shared spaces",
            "Permissions & roles",
            "Admin controls",
            "SSO",
          ],
          cta: { label: "Start team trial", href: "#", variant: "secondary" },
        },
      ],
    },
    {
      type: "faq",
      eyebrow: "FAQ",
      title: "Questions, answered",
      items: [
        {
          question: "How is this different from a regular notes app?",
          answer:
            "Cortex automatically connects related notes and lets you ask questions across everything you've ever written — no manual tagging required.",
        },
        {
          question: "Is my data private?",
          answer:
            "Yes. Your notes are encrypted, never used to train public models, and exportable to open formats at any time.",
        },
        {
          question: "Does the AI work on my own notes?",
          answer:
            "Exactly. Pro's assistant answers using your personal knowledge base and cites the source notes so you can trust it.",
        },
        {
          question: "Can I import from other apps?",
          answer:
            "Yes — one-click importers cover the most popular note and wiki tools, including Markdown and plain text.",
        },
      ],
    },
    {
      type: "cta",
      title: "Never lose a good idea again",
      subtitle:
        "Join 320,000 people building a connected, searchable second brain with Cortex.",
      actions: [
        { label: "Try Cortex free", href: "#", variant: "primary" },
        { label: "See pricing", href: "#pricing", variant: "ghost" },
      ],
    },
    {
      type: "footer",
      brand: "Cortex",
      tagline: "Your second brain, finally connected.",
      columns: [
        {
          heading: "Product",
          links: [
            { label: "Features", href: "#features" },
            { label: "AI assistant", href: "#features" },
            { label: "Pricing", href: "#pricing" },
          ],
        },
        {
          heading: "Resources",
          links: [
            { label: "Templates", href: "#" },
            { label: "Guides", href: "#" },
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
      legal: "© 2026 Cortex Labs. A fictional demo product.",
    },
  ],
};

export default cortex;
