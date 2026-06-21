import type { LandingConfig } from "@/lib/landing.types";

/**
 * Coastline — fictional travel & trip-planning app.
 * Light theme with an ocean-teal accent.
 */
const coastline: LandingConfig = {
  meta: {
    slug: "coastline",
    title: "Coastline — Plan the trip, skip the chaos",
    description:
      "Coastline turns scattered tabs and group chats into one beautiful, collaborative travel itinerary.",
  },
  theme: {
    primary: "13 148 136", // teal
    bg: "247 251 251",
    surface: "255 255 255",
    fg: "23 37 38",
    muted: "96 116 117",
    border: "215 232 231",
    mode: "light",
    radius: "1.15rem",
    font: '"Inter", system-ui, sans-serif',
  },
  sections: [
    {
      type: "hero",
      eyebrow: "Trip planning, finally enjoyable",
      title: "Plan the trip, skip the chaos",
      subtitle:
        "Coastline pulls your flights, stays, and must-sees into one shared itinerary the whole group can edit — no more twelve tabs and a frantic group chat.",
      actions: [
        { label: "Start planning free", href: "#pricing", variant: "primary" },
        { label: "See it in action", href: "#features", variant: "secondary" },
      ],
      note: "Free to plan · Works on every device · No booking fees",
    },
    {
      type: "stats",
      items: [
        { value: "4.2M", label: "Trips planned" },
        { value: "180+", label: "Countries mapped" },
        { value: "9 hrs", label: "Saved per trip" },
        { value: "4.9★", label: "Traveler rating" },
      ],
    },
    {
      type: "features",
      eyebrow: "Why Coastline",
      title: "Everything for the journey, in one place",
      subtitle:
        "From the first daydream to the last boarding pass, Coastline keeps the whole trip together.",
      columns: 3,
      items: [
        {
          icon: "Map",
          title: "Visual itinerary",
          description:
            "See every day laid out on a map and timeline, so travel times and gaps are obvious at a glance.",
        },
        {
          icon: "Users",
          title: "Plan together",
          description:
            "Invite friends to add ideas, vote on options, and split who's booking what — in real time.",
        },
        {
          icon: "Plane",
          title: "Auto-import bookings",
          description:
            "Forward a confirmation email and flights, hotels, and rentals appear in your timeline instantly.",
        },
        {
          icon: "Compass",
          title: "Local recommendations",
          description:
            "Discover hand-picked spots near each stop, filtered by your pace, budget, and tastes.",
        },
        {
          icon: "Wallet",
          title: "Shared budget",
          description:
            "Track costs per person and settle up at the end without the awkward spreadsheet math.",
        },
        {
          icon: "WifiOff",
          title: "Offline ready",
          description:
            "Download your whole trip so maps, tickets, and notes work even with no signal abroad.",
        },
      ],
    },
    {
      type: "testimonials",
      eyebrow: "From the road",
      title: "Trips that just flow",
      items: [
        {
          quote:
            "We planned a 3-week, 5-city trip with eight friends and it was actually fun. Coastline kept everyone aligned.",
          author: "Naomi Klein",
          role: "Frequent traveler",
        },
        {
          quote:
            "Forwarding my confirmations and watching the itinerary build itself felt like cheating. Loved it.",
          author: "Owen Tanaka",
          role: "Digital nomad",
        },
        {
          quote:
            "The offline maps saved us in rural Portugal when nothing else loaded. Worth it for that alone.",
          author: "Lucia Fernández",
          role: "Weekend explorer",
        },
      ],
    },
    {
      type: "pricing",
      eyebrow: "Pricing",
      title: "Plan free, upgrade for the extras",
      subtitle: "Everyone can plan together. Pro adds the power-traveler tools.",
      tiers: [
        {
          name: "Explorer",
          price: "$0",
          period: "/mo",
          description: "Everything to plan a great trip.",
          features: [
            "Unlimited trips",
            "Collaborative itinerary",
            "Map & timeline",
            "Email import",
          ],
          cta: { label: "Start free", href: "#", variant: "secondary" },
        },
        {
          name: "Pro",
          price: "$7",
          period: "/mo",
          description: "For the serious traveler.",
          featured: true,
          features: [
            "Everything in Explorer",
            "Offline downloads",
            "Shared budget & splitting",
            "Smart recommendations",
            "Priority support",
          ],
          cta: { label: "Go Pro", href: "#", variant: "primary" },
        },
        {
          name: "Crew",
          price: "$15",
          period: "/mo",
          description: "For groups that travel a lot.",
          features: [
            "Everything in Pro",
            "Up to 10 members",
            "Group dashboards",
            "Shared trip library",
          ],
          cta: { label: "Choose Crew", href: "#", variant: "secondary" },
        },
      ],
    },
    {
      type: "faq",
      eyebrow: "FAQ",
      title: "Questions, answered",
      items: [
        {
          question: "Does Coastline book my flights and hotels?",
          answer:
            "Coastline organizes everything in one itinerary and links out to book — with no markup or booking fees on our end.",
        },
        {
          question: "How does email import work?",
          answer:
            "Forward any confirmation to your Coastline address and we'll parse the dates, times, and locations into your timeline.",
        },
        {
          question: "Can my friends edit without an account?",
          answer:
            "They can view via a share link instantly, and a free account lets them add ideas and vote in real time.",
        },
        {
          question: "Will it work without internet abroad?",
          answer:
            "Yes — Pro lets you download your full trip, including maps and tickets, for reliable offline access.",
        },
      ],
    },
    {
      type: "cta",
      title: "Your next adventure, beautifully organized",
      subtitle:
        "Join millions of travelers who plan smoother trips with Coastline. Start free today.",
      actions: [
        { label: "Start planning free", href: "#", variant: "primary" },
        { label: "Browse sample trips", href: "#", variant: "ghost" },
      ],
    },
    {
      type: "footer",
      brand: "Coastline",
      tagline: "Plan the trip, skip the chaos.",
      columns: [
        {
          heading: "Product",
          links: [
            { label: "Features", href: "#features" },
            { label: "Mobile app", href: "#" },
            { label: "Pricing", href: "#pricing" },
          ],
        },
        {
          heading: "Discover",
          links: [
            { label: "Destinations", href: "#" },
            { label: "Travel guides", href: "#" },
            { label: "Blog", href: "#" },
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
      legal: "© 2026 Coastline Travel. A fictional demo product.",
    },
  ],
};

export default coastline;
