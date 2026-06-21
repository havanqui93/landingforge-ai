import type { LandingConfig } from "@/lib/landing.types";

/**
 * Lumen Academy — fictional online learning & courses platform.
 * Light theme with a violet accent.
 */
const lumenAcademy: LandingConfig = {
  meta: {
    slug: "lumen-academy",
    title: "Lumen Academy — Learn skills that actually stick",
    description:
      "Lumen Academy pairs world-class instructors with hands-on projects and mentor feedback so you learn by doing.",
  },
  theme: {
    primary: "139 92 246", // violet
    bg: "250 249 254",
    surface: "255 255 255",
    fg: "28 24 40",
    muted: "110 104 128",
    border: "231 227 244",
    mode: "light",
    radius: "1rem",
    font: '"Inter", system-ui, sans-serif',
  },
  sections: [
    {
      type: "hero",
      eyebrow: "Project-based courses, real feedback",
      title: "Learn skills that actually stick",
      subtitle:
        "Lumen Academy pairs world-class instructors with hands-on projects and human mentor feedback — so you build a portfolio, not just a stack of finished videos.",
      actions: [
        { label: "Start learning free", href: "#pricing", variant: "primary" },
        { label: "Browse courses", href: "#features", variant: "secondary" },
      ],
      note: "7-day free trial · Certificates included · Learn at your pace",
    },
    {
      type: "stats",
      items: [
        { value: "1,200+", label: "Courses & projects" },
        { value: "780K", label: "Learners enrolled" },
        { value: "92%", label: "Finish their path" },
        { value: "4.8★", label: "Average rating" },
      ],
    },
    {
      type: "features",
      eyebrow: "Why Lumen",
      title: "Built so the learning lasts",
      subtitle:
        "We designed every part of Lumen around how people actually retain new skills.",
      columns: 3,
      items: [
        {
          icon: "Hammer",
          title: "Learn by building",
          description:
            "Every course centers on a real project you'll ship and keep, not passive lectures you forget.",
        },
        {
          icon: "MessageSquare",
          title: "Mentor feedback",
          description:
            "Submit your work and get personalized reviews from practicing experts within 24 hours.",
        },
        {
          icon: "Route",
          title: "Guided paths",
          description:
            "Follow curated tracks from beginner to job-ready, with clear milestones along the way.",
        },
        {
          icon: "BrainCircuit",
          title: "Spaced practice",
          description:
            "Smart review prompts resurface key concepts right before you'd forget them.",
        },
        {
          icon: "Award",
          title: "Shareable certificates",
          description:
            "Earn verifiable certificates and portfolio pieces you can show employers with pride.",
        },
        {
          icon: "Users",
          title: "Learn with peers",
          description:
            "Join cohorts and study groups so you stay accountable and never get stuck alone.",
        },
      ],
    },
    {
      type: "testimonials",
      eyebrow: "Learner stories",
      title: "From curious to capable",
      items: [
        {
          quote:
            "I switched careers in eight months. The mentor reviews are what made the difference — I actually got better.",
          author: "Grace Mbeki",
          role: "Now a UX Designer",
        },
        {
          quote:
            "Project-based learning finally clicked for me. I have four real things in my portfolio now.",
          author: "Tobias Lund",
          role: "Front-end Developer",
        },
        {
          quote:
            "The cohorts kept me going. Learning alongside others made it feel like a real program, not a playlist.",
          author: "Anjali Mehta",
          role: "Data Analyst",
        },
      ],
    },
    {
      type: "pricing",
      eyebrow: "Pricing",
      title: "Invest in skills, not subscriptions you forget",
      subtitle: "Start free. Go unlimited when you're ready to commit.",
      tiers: [
        {
          name: "Free",
          price: "$0",
          period: "/mo",
          description: "Sample the experience.",
          features: [
            "50+ free lessons",
            "1 starter project",
            "Community access",
          ],
          cta: { label: "Start free", href: "#", variant: "secondary" },
        },
        {
          name: "Pro",
          price: "$19",
          period: "/mo",
          description: "Unlimited learning, your pace.",
          featured: true,
          features: [
            "All 1,200+ courses",
            "Hands-on projects",
            "Mentor feedback",
            "Certificates",
            "Offline downloads",
          ],
          cta: { label: "Start 7-day trial", href: "#", variant: "primary" },
        },
        {
          name: "Teams",
          price: "$32",
          period: "/seat/mo",
          description: "Upskill your whole team.",
          features: [
            "Everything in Pro",
            "Admin & reporting",
            "Skill assessments",
            "Custom learning paths",
            "SSO",
          ],
          cta: { label: "Talk to us", href: "#", variant: "secondary" },
        },
      ],
    },
    {
      type: "faq",
      eyebrow: "FAQ",
      title: "Questions, answered",
      items: [
        {
          question: "How is this different from video courses?",
          answer:
            "Lumen is built around projects and real human feedback, so you actually apply what you learn instead of just watching.",
        },
        {
          question: "Who gives the mentor feedback?",
          answer:
            "Practicing professionals in each field review your submitted work and leave detailed, actionable notes within 24 hours.",
        },
        {
          question: "Are the certificates recognized?",
          answer:
            "Each certificate is verifiable and pairs with portfolio projects — employers can see exactly what you built.",
        },
        {
          question: "Can I learn at my own pace?",
          answer:
            "Absolutely. Go fast or slow; cohorts are optional, and your progress and projects are always saved.",
        },
      ],
    },
    {
      type: "cta",
      title: "Start building skills today",
      subtitle:
        "Join 780,000 learners who chose hands-on, mentor-backed learning with Lumen Academy.",
      actions: [
        { label: "Start learning free", href: "#", variant: "primary" },
        { label: "Explore paths", href: "#features", variant: "ghost" },
      ],
    },
    {
      type: "footer",
      brand: "Lumen Academy",
      tagline: "Learn skills that actually stick.",
      columns: [
        {
          heading: "Learn",
          links: [
            { label: "Courses", href: "#features" },
            { label: "Paths", href: "#features" },
            { label: "Pricing", href: "#pricing" },
          ],
        },
        {
          heading: "Community",
          links: [
            { label: "Become a mentor", href: "#" },
            { label: "Student stories", href: "#" },
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
      legal: "© 2026 Lumen Academy. A fictional demo product.",
    },
  ],
};

export default lumenAcademy;
