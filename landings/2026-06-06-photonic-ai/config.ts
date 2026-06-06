import type { LandingConfig } from "@/lib/landing.types";

/**
 * Daily landing — 2026-06-06
 * News angle: researchers unveiled a tiny chip that can generate, steer, and
 * read light-based information in a single device — a leap toward ultra-fast
 * photonic AI. This is a *fictional* product inspired by that story.
 */
const photonicAi20260606: LandingConfig = {
  meta: {
    slug: "2026-06-06-photonic-ai",
    title: "Lumina — train AI at the speed of light",
    description:
      "Lumina is the photonic compute platform that generates, steers, and reads light on a single chip — so your models train in flashes, not hours.",
  },
  theme: {
    primary: "56 189 248", // sky / photon cyan
    bg: "6 10 24",
    surface: "15 21 44",
    fg: "232 240 255",
    muted: "148 163 198",
    border: "32 41 74",
    mode: "dark",
    radius: "1rem",
    font: '"Inter", system-ui, sans-serif',
  },
  sections: [
    {
      type: "hero",
      eyebrow: "Now shipping silicon",
      title: "Train AI at the speed of light",
      subtitle:
        "Lumina puts generation, steering, and readout of optical signals on one chip — collapsing the bottleneck between memory and compute. Photons in, breakthroughs out.",
      actions: [
        { label: "Request early access", href: "#pricing", variant: "primary" },
        { label: "See the architecture", href: "#features", variant: "secondary" },
      ],
      note: "Backed by photonics researchers · No data-center retrofit required",
    },
    {
      type: "stats",
      items: [
        { value: "120×", label: "Faster matrix ops" },
        { value: "1/9th", label: "Energy per token" },
        { value: "<1ns", label: "On-chip latency" },
        { value: "0", label: "Moving electrons in the core" },
      ],
    },
    {
      type: "features",
      eyebrow: "Why photonic",
      title: "One chip. The whole light path.",
      subtitle:
        "Most accelerators shuttle electrons between blocks. Lumina keeps information as light from end to end.",
      columns: 3,
      items: [
        {
          icon: "Zap",
          title: "Generate",
          description:
            "Integrated laser sources spin up optical signals on-die — no off-chip light plumbing.",
        },
        {
          icon: "Spline",
          title: "Steer",
          description:
            "Programmable interferometer meshes route and weight signals at the speed of light.",
        },
        {
          icon: "ScanLine",
          title: "Read",
          description:
            "On-chip detectors convert results instantly, closing the loop without a round trip.",
        },
        {
          icon: "Gauge",
          title: "Near-zero latency",
          description:
            "Compute happens during propagation, so the core finishes before electrons would start.",
        },
        {
          icon: "Leaf",
          title: "Sips power",
          description:
            "Passive optical math means a fraction of the watts per token versus GPU clusters.",
        },
        {
          icon: "Plug",
          title: "Drop-in SDK",
          description:
            "A PyTorch-compatible runtime offloads tensor ops to light with a one-line device swap.",
        },
      ],
    },
    {
      type: "testimonials",
      eyebrow: "From the lab to production",
      title: "Teams already running on light",
      items: [
        {
          quote:
            "We cut a 14-hour fine-tune to under ten minutes. The first run, I assumed something was broken.",
          author: "Dr. Aisha Romero",
          role: "ML Infra Lead, Helios Labs",
        },
        {
          quote:
            "Same model, same accuracy, a ninth of the power bill. Our finance team thinks we're cheating.",
          author: "Marcus Feld",
          role: "VP Engineering, Driftwave",
        },
        {
          quote:
            "The PyTorch shim was the whole integration. One device flag and our pipeline lit up.",
          author: "Lena Okafor",
          role: "Staff Engineer, Northwind AI",
        },
      ],
    },
    {
      type: "pricing",
      eyebrow: "Plans",
      title: "Start small, scale to a beam",
      subtitle: "Cloud photonic instances today; on-prem cards next quarter.",
      tiers: [
        {
          name: "Spark",
          price: "$0",
          period: "/mo",
          description: "Kick the tires on a shared photonic instance.",
          features: [
            "5 hours/mo of light compute",
            "PyTorch runtime",
            "Community support",
          ],
          cta: { label: "Start free", href: "#", variant: "secondary" },
        },
        {
          name: "Beam",
          price: "$1,900",
          period: "/mo",
          description: "Dedicated lanes for teams shipping models weekly.",
          featured: true,
          features: [
            "Dedicated photonic instance",
            "Priority queue + autoscale",
            "Mixed optical/electronic ops",
            "Usage analytics",
            "Priority support",
          ],
          cta: { label: "Request early access", href: "#", variant: "primary" },
        },
        {
          name: "Observatory",
          price: "Custom",
          description: "On-prem photonic cards and white-glove onboarding.",
          features: [
            "On-prem chips & racks",
            "Dedicated solutions engineer",
            "SLA & security review",
            "Custom interconnect",
          ],
          cta: { label: "Talk to us", href: "#", variant: "secondary" },
        },
      ],
    },
    {
      type: "faq",
      eyebrow: "FAQ",
      title: "Questions, illuminated",
      items: [
        {
          question: "Do I have to rewrite my model?",
          answer:
            "No. Lumina ships a PyTorch-compatible runtime — switch the device target and supported tensor ops run on light, with the rest staying on your CPU/GPU.",
        },
        {
          question: "What workloads benefit most?",
          answer:
            "Anything dense in matrix multiplication: training and inference for transformers, vision models, and large embedding workloads.",
        },
        {
          question: "Is this real silicon or a simulator?",
          answer:
            "Lumina is fabricated photonic silicon. Cloud instances run on physical chips; on-prem cards follow next quarter.",
        },
        {
          question: "How do you keep results accurate with analog optics?",
          answer:
            "Calibrated detectors and error-correcting readout keep numerics in spec, so accuracy matches your electronic baseline.",
        },
      ],
    },
    {
      type: "cta",
      title: "Ready to compute with photons?",
      subtitle:
        "Join the early-access cohort and put your next training run on the fast lane.",
      actions: [
        { label: "Request early access", href: "#", variant: "primary" },
        { label: "Read the whitepaper", href: "#", variant: "ghost" },
      ],
    },
    {
      type: "footer",
      brand: "Lumina",
      tagline: "Photonic compute for the AI era — generate, steer, read, on one chip.",
      columns: [
        {
          heading: "Product",
          links: [
            { label: "Architecture", href: "#features" },
            { label: "Pricing", href: "#pricing" },
            { label: "SDK", href: "#" },
          ],
        },
        {
          heading: "Company",
          links: [
            { label: "Research", href: "#" },
            { label: "Careers", href: "#" },
            { label: "Press", href: "#" },
          ],
        },
        {
          heading: "Legal",
          links: [
            { label: "Privacy", href: "#" },
            { label: "Terms", href: "#" },
          ],
        },
      ],
    },
  ],
};

export default photonicAi20260606;
