import type { EditorialConfig } from "@/lib/editorial.types";

/**
 * Almanac — reference landing for the editorial template. Exercises every
 * block type, the way landings/demo/config.ts exercises every default
 * section type. Copy this file to scaffold a new editorial landing.
 */
const almanac: EditorialConfig = {
  meta: {
    slug: "almanac",
    title: "Almanac — A field journal for your days",
    description:
      "Almanac is a quiet, structured journal for capturing days, weather, and small observations — built for people who like keeping records.",
  },
  theme: {
    primary: "180 83 43", // terracotta
    bg: "250 248 244", // cream paper
    surface: "244 239 230",
    fg: "31 28 23",
    muted: "125 116 103",
    border: "223 216 202",
    mode: "light",
    radius: "0.15rem",
    font: '"Iowan Old Style", "Palatino Linotype", Georgia, serif',
  },
  blocks: [
    {
      type: "masthead",
      issue: "Vol. 01 — No. 07",
      kicker: "A daily record",
      title: "Keep a plain, honest record of your days.",
      dek: "Almanac is a structured journal — one entry per day, a place for weather, a line for what mattered, and a long view of the season you're in.",
      byline: "Built for people who like keeping records",
      actions: [
        { label: "Start your almanac", href: "#ledger", variant: "primary" },
        { label: "Read a sample week", href: "#dispatches", variant: "secondary" },
      ],
      toc: ["Notes", "Dispatches", "Rates", "FAQ"],
    },
    {
      type: "index",
      kicker: "Notes",
      title: "How an entry is built",
      dek: "Four fields, five minutes, every day.",
      entries: [
        {
          title: "Weather & light",
          description:
            "A quick tap for sky, temperature, and how the light fell — the texture that memory forgets first.",
        },
        {
          title: "One line that mattered",
          description:
            "A single required line. Everything else is optional; the discipline is in the one line.",
        },
        {
          title: "A running season",
          description:
            "Entries roll up into seasons automatically, so a month reads as a season, not just a list.",
        },
        {
          title: "Private by default",
          description:
            "Nothing is shared unless you export it. No feed, no followers, no public profile.",
        },
      ],
    },
    {
      type: "ticker",
      entries: [
        { value: "9,400+", label: "Entries logged" },
        { value: "212", label: "Longest streak (days)" },
        { value: "38", label: "Countries keeping almanacs" },
        { value: "4.8", label: "Average rating" },
      ],
    },
    {
      type: "dispatches",
      kicker: "Dispatches",
      title: "Notes from other almanacs",
      entries: [
        {
          quote:
            "I've tried five journaling apps. This is the first one that felt like a ledger instead of a diary.",
          author: "Rosalind Ferry",
          role: "Keeps Vol. 03",
        },
        {
          quote:
            "The weather field sounds small until you read back a winter and remember exactly how grey it was.",
          author: "Tomas Eked",
          role: "Keeps Vol. 01",
        },
        {
          quote:
            "One line a day, six months in, and I have an actual record of a hard year instead of a vague memory of it.",
          author: "Priya Natarajan",
          role: "Keeps Vol. 02",
        },
      ],
    },
    {
      type: "ledger",
      kicker: "Rates",
      title: "Subscribe to a volume",
      dek: "Each volume runs twelve months. Cancel between volumes, never mid-season.",
      rows: [
        {
          name: "Field Edition",
          price: "$0",
          period: "/mo",
          description: "For a first season.",
          features: ["One active volume", "Weather & one-line entry", "Local export (Markdown)"],
          cta: { label: "Begin", href: "#", variant: "secondary" },
        },
        {
          name: "Almanac Pro",
          price: "$7",
          period: "/mo",
          description: "For a running record.",
          featured: true,
          features: [
            "Unlimited volumes",
            "Season summaries",
            "Photo attachments",
            "Yearly bound export",
          ],
          cta: { label: "Subscribe", href: "#", variant: "primary" },
        },
        {
          name: "Society",
          price: "$19",
          period: "/mo",
          description: "For reading circles & small groups.",
          features: [
            "Everything in Pro",
            "Shared reading circles",
            "Up to 6 keepers",
            "Priority support",
          ],
          cta: { label: "Talk to us", href: "#", variant: "secondary" },
        },
      ],
    },
    {
      type: "dossier",
      kicker: "FAQ",
      title: "Questions, answered plainly",
      entries: [
        {
          question: "Do I have to write every day?",
          answer:
            "No. A volume tracks whatever days you keep. Most keepers miss days — the record just has gaps, same as any almanac.",
        },
        {
          question: "Can I export what I've written?",
          answer:
            "Yes, any time. Free plans export as plain Markdown; Pro adds a yearly bound PDF export of the whole volume.",
        },
        {
          question: "Is anything public?",
          answer:
            "No. There is no feed, profile, or public page. Society plan sharing is opt-in, entry by entry, inside a private circle only.",
        },
        {
          question: "What happens when a volume ends?",
          answer:
            "It's archived, read-only, and yours forever. You can start a new volume immediately or take a season off.",
        },
      ],
    },
    {
      type: "colophon",
      statement: "Start Volume One.",
      actions: [{ label: "Begin your almanac", href: "#", variant: "primary" }],
      brand: "Almanac",
      columns: [
        {
          heading: "Almanac",
          links: [
            { label: "Notes", href: "#index" },
            { label: "Rates", href: "#" },
            { label: "FAQ", href: "#" },
          ],
        },
        {
          heading: "Company",
          links: [
            { label: "About", href: "#" },
            { label: "Journal", href: "#" },
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
    },
  ],
};

export default almanac;
