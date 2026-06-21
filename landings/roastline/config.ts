import type { LandingConfig } from "@/lib/landing.types";

/**
 * Roastline — fictional specialty coffee subscription brand.
 * Warm light theme with an amber accent.
 */
const roastline: LandingConfig = {
  meta: {
    slug: "roastline",
    title: "Roastline — Fresh-roasted coffee, on your schedule",
    description:
      "Roastline roasts to order and ships within 24 hours, so every cup tastes the way the farmer intended.",
  },
  theme: {
    primary: "194 120 53", // warm amber
    bg: "250 245 238",
    surface: "255 251 245",
    fg: "44 33 24",
    muted: "124 106 90",
    border: "229 218 204",
    mode: "light",
    radius: "1.1rem",
    font: '"Inter", system-ui, sans-serif',
  },
  sections: [
    {
      type: "hero",
      eyebrow: "Roasted to order, shipped in 24h",
      title: "Fresh-roasted coffee, on your schedule",
      subtitle:
        "Roastline sources single-origin beans from growers we know by name, roasts them the day you order, and delivers peak-freshness coffee to your door.",
      actions: [
        { label: "Build my subscription", href: "#pricing", variant: "primary" },
        { label: "Explore the roasts", href: "#features", variant: "secondary" },
      ],
      note: "Free shipping · Skip or pause anytime · 100% happiness guarantee",
    },
    {
      type: "stats",
      items: [
        { value: "24h", label: "Roast to ship" },
        { value: "38", label: "Partner farms" },
        { value: "150K", label: "Bags delivered" },
        { value: "4.9★", label: "From 21k reviews" },
      ],
    },
    {
      type: "features",
      eyebrow: "Why Roastline",
      title: "Coffee worth waking up for",
      subtitle:
        "We obsess over freshness, sourcing, and the details that make a cup unforgettable.",
      columns: 3,
      items: [
        {
          icon: "Flame",
          title: "Roasted to order",
          description:
            "Your beans hit the roaster the same day you order and ship within 24 hours — never stale, never warehoused.",
        },
        {
          icon: "Leaf",
          title: "Single-origin sourcing",
          description:
            "Direct-trade relationships with 38 farms mean traceable beans and fairer pay for growers.",
        },
        {
          icon: "Sliders",
          title: "Dial in your taste",
          description:
            "Tell us how you brew and how bold you like it — we match you to the perfect roast every cycle.",
        },
        {
          icon: "Truck",
          title: "Flexible delivery",
          description:
            "Choose weekly, biweekly, or monthly. Skip, swap, or pause in a tap whenever life changes.",
        },
        {
          icon: "Recycle",
          title: "Low-waste packaging",
          description:
            "Compostable bags and carbon-neutral shipping, because great coffee shouldn't cost the earth.",
        },
        {
          icon: "Gift",
          title: "Gift-ready",
          description:
            "Send a subscription or a one-off sampler with a handwritten note — perfect for any coffee lover.",
        },
      ],
    },
    {
      type: "testimonials",
      eyebrow: "From our regulars",
      title: "The best part of the morning",
      items: [
        {
          quote:
            "I didn't know coffee could taste like this at home. The difference fresh-roast makes is unreal.",
          author: "Priya Desai",
          role: "Subscriber since 2024",
        },
        {
          quote:
            "Roastline nailed my taste profile on the first try. Every bag since has been a delight.",
          author: "Caleb Moreno",
          role: "Home barista",
        },
        {
          quote:
            "I gifted a subscription to my dad and now he calls me every time a new roast arrives.",
          author: "Hannah Whitfield",
          role: "Subscriber",
        },
      ],
    },
    {
      type: "pricing",
      eyebrow: "Subscriptions",
      title: "Pick your pour",
      subtitle: "Every plan ships free and adjusts to your pace. Cancel anytime.",
      tiers: [
        {
          name: "Solo",
          price: "$16",
          period: "/bag",
          description: "One 12oz bag, your way.",
          features: [
            "1 bag per delivery",
            "Whole bean or ground",
            "Free shipping",
            "Skip anytime",
          ],
          cta: { label: "Start Solo", href: "#", variant: "secondary" },
        },
        {
          name: "Duo",
          price: "$29",
          period: "/mo",
          description: "Our most popular ritual.",
          featured: true,
          features: [
            "2 bags per delivery",
            "Rotating single origins",
            "Taste-match guarantee",
            "Free priority shipping",
            "Member-only roasts",
          ],
          cta: { label: "Start Duo", href: "#", variant: "primary" },
        },
        {
          name: "Roaster's Club",
          price: "$49",
          period: "/mo",
          description: "For the truly devoted.",
          features: [
            "4 bags per delivery",
            "First access to micro-lots",
            "Quarterly tasting kit",
            "Brew guides & live classes",
          ],
          cta: { label: "Join the Club", href: "#", variant: "secondary" },
        },
      ],
    },
    {
      type: "faq",
      eyebrow: "FAQ",
      title: "Questions, answered",
      items: [
        {
          question: "How fresh is the coffee really?",
          answer:
            "We roast the same day you order and ship within 24 hours, so your beans arrive within days of roasting — at their flavor peak.",
        },
        {
          question: "Can I choose whole bean or ground?",
          answer:
            "Yes. Pick whole bean or tell us your brew method and we'll grind to match — from espresso to French press.",
        },
        {
          question: "What if I don't like a roast?",
          answer:
            "Our happiness guarantee means we'll replace any bag you don't love, no questions asked.",
        },
        {
          question: "Can I pause or cancel?",
          answer:
            "Anytime, in a couple of taps. Skip a delivery when you're traveling or pause your plan whenever you need to.",
        },
      ],
    },
    {
      type: "cta",
      title: "Your best cup is one order away",
      subtitle:
        "Build a subscription in under a minute and taste what fresh-roasted really means.",
      actions: [
        { label: "Build my subscription", href: "#", variant: "primary" },
        { label: "Send as a gift", href: "#", variant: "ghost" },
      ],
    },
    {
      type: "footer",
      brand: "Roastline",
      tagline: "Fresh-roasted coffee, on your schedule.",
      columns: [
        {
          heading: "Shop",
          links: [
            { label: "Subscriptions", href: "#pricing" },
            { label: "Single bags", href: "#" },
            { label: "Gifts", href: "#" },
          ],
        },
        {
          heading: "Learn",
          links: [
            { label: "Our farms", href: "#features" },
            { label: "Brew guides", href: "#" },
            { label: "Sustainability", href: "#" },
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
      legal: "© 2026 Roastline Coffee Co. A fictional demo product.",
    },
  ],
};

export default roastline;
