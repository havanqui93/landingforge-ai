/**
 * AI-powered landing page generator using Claude.
 *
 * Unlike the deterministic generator in generate-landing.ts, this analyzes
 * the keyword and picks the most appropriate section structure + generates
 * unique copy for each page. Requires ANTHROPIC_API_KEY.
 *
 * Falls back to the deterministic generator when the key is absent or
 * the API call fails, so the flow always produces a result.
 */

import Anthropic from "@anthropic-ai/sdk";
import type { LandingConfig } from "./landing.types";
import { generateLanding } from "./generate-landing";
import { parseLandingConfig } from "./landing-schema";

/* -------------------------------------------------------------------------- */
/*  Tool schema — mirrors LandingConfig as a JSON Schema for Claude tool_use  */
/* -------------------------------------------------------------------------- */

const LANDING_CONFIG_SCHEMA: Anthropic.Tool["input_schema"] = {
  type: "object",
  required: ["meta", "theme", "sections"],
  properties: {
    meta: {
      type: "object",
      required: ["slug", "title", "description"],
      properties: {
        slug: {
          type: "string",
          description: "URL-safe slug, lowercase with hyphens only, max 40 chars",
        },
        title: { type: "string", description: "Page <title> tag" },
        description: { type: "string", description: "Meta description, ~150 chars" },
      },
    },

    theme: {
      type: "object",
      required: ["primary", "bg", "mode"],
      properties: {
        primary: {
          type: "string",
          description: "Brand accent color as space-separated 'R G B' triple, e.g. '124 92 255'",
        },
        bg: {
          type: "string",
          description: "Page background as 'R G B' triple",
        },
        surface: {
          type: "string",
          description: "Card / elevated surface as 'R G B' triple",
        },
        fg: { type: "string", description: "Body text color as 'R G B' triple" },
        muted: { type: "string", description: "Muted/secondary text as 'R G B' triple" },
        border: { type: "string", description: "Hairline border color as 'R G B' triple" },
        mode: { type: "string", enum: ["light", "dark"] },
        radius: {
          type: "string",
          description: "Base border radius e.g. '0.75rem', '1rem', '1.25rem'",
        },
        font: { type: "string", description: "CSS font-family stack" },
      },
    },

    sections: {
      type: "array",
      description: "Ordered list of page sections. Choose types and order based on keyword context.",
      items: {
        anyOf: [
          /* hero */
          {
            type: "object",
            required: ["type", "title"],
            properties: {
              type: { type: "string", enum: ["hero"] },
              eyebrow: { type: "string" },
              title: { type: "string" },
              subtitle: { type: "string" },
              note: { type: "string" },
              actions: {
                type: "array",
                items: {
                  type: "object",
                  required: ["label", "href"],
                  properties: {
                    label: { type: "string" },
                    href: { type: "string" },
                    variant: { type: "string", enum: ["primary", "secondary", "ghost"] },
                  },
                },
              },
            },
          },

          /* features */
          {
            type: "object",
            required: ["type", "title", "items"],
            properties: {
              type: { type: "string", enum: ["features"] },
              eyebrow: { type: "string" },
              title: { type: "string" },
              subtitle: { type: "string" },
              columns: { type: "number", enum: [2, 3, 4] },
              items: {
                type: "array",
                items: {
                  type: "object",
                  required: ["icon", "title", "description"],
                  properties: {
                    icon: {
                      type: "string",
                      description:
                        "Lucide React PascalCase icon name, e.g. Zap, ShieldCheck, BarChart3, Globe, Cpu, GitBranch, Terminal, Database, Lock, Cloud, Users, Layers, TrendingUp, Package, Rocket, Sparkles, Code2, MessageSquare, Workflow, FileText, Camera, Video, Music, Map, Briefcase, Award",
                    },
                    title: { type: "string" },
                    description: { type: "string" },
                  },
                },
              },
            },
          },

          /* stats */
          {
            type: "object",
            required: ["type", "items"],
            properties: {
              type: { type: "string", enum: ["stats"] },
              title: { type: "string" },
              subtitle: { type: "string" },
              items: {
                type: "array",
                items: {
                  type: "object",
                  required: ["value", "label"],
                  properties: {
                    value: { type: "string" },
                    label: { type: "string" },
                  },
                },
              },
            },
          },

          /* testimonials */
          {
            type: "object",
            required: ["type", "title", "items"],
            properties: {
              type: { type: "string", enum: ["testimonials"] },
              eyebrow: { type: "string" },
              title: { type: "string" },
              subtitle: { type: "string" },
              items: {
                type: "array",
                items: {
                  type: "object",
                  required: ["quote", "author"],
                  properties: {
                    quote: { type: "string" },
                    author: { type: "string" },
                    role: { type: "string" },
                  },
                },
              },
            },
          },

          /* pricing */
          {
            type: "object",
            required: ["type", "title", "tiers"],
            properties: {
              type: { type: "string", enum: ["pricing"] },
              eyebrow: { type: "string" },
              title: { type: "string" },
              subtitle: { type: "string" },
              tiers: {
                type: "array",
                items: {
                  type: "object",
                  required: ["name", "price", "features", "cta"],
                  properties: {
                    name: { type: "string" },
                    price: { type: "string" },
                    period: { type: "string" },
                    description: { type: "string" },
                    featured: { type: "boolean" },
                    features: { type: "array", items: { type: "string" } },
                    cta: {
                      type: "object",
                      required: ["label", "href"],
                      properties: {
                        label: { type: "string" },
                        href: { type: "string" },
                        variant: { type: "string", enum: ["primary", "secondary", "ghost"] },
                      },
                    },
                  },
                },
              },
            },
          },

          /* faq */
          {
            type: "object",
            required: ["type", "title", "items"],
            properties: {
              type: { type: "string", enum: ["faq"] },
              eyebrow: { type: "string" },
              title: { type: "string" },
              subtitle: { type: "string" },
              items: {
                type: "array",
                items: {
                  type: "object",
                  required: ["question", "answer"],
                  properties: {
                    question: { type: "string" },
                    answer: { type: "string" },
                  },
                },
              },
            },
          },

          /* cta */
          {
            type: "object",
            required: ["type", "title", "actions"],
            properties: {
              type: { type: "string", enum: ["cta"] },
              title: { type: "string" },
              subtitle: { type: "string" },
              actions: {
                type: "array",
                items: {
                  type: "object",
                  required: ["label", "href"],
                  properties: {
                    label: { type: "string" },
                    href: { type: "string" },
                    variant: { type: "string", enum: ["primary", "secondary", "ghost"] },
                  },
                },
              },
            },
          },

          /* footer */
          {
            type: "object",
            required: ["type", "brand"],
            properties: {
              type: { type: "string", enum: ["footer"] },
              brand: { type: "string" },
              tagline: { type: "string" },
              legal: { type: "string" },
              columns: {
                type: "array",
                items: {
                  type: "object",
                  required: ["heading", "links"],
                  properties: {
                    heading: { type: "string" },
                    links: {
                      type: "array",
                      items: {
                        type: "object",
                        required: ["label", "href"],
                        properties: {
                          label: { type: "string" },
                          href: { type: "string" },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        ],
      },
    },
  },
};

/* -------------------------------------------------------------------------- */
/*  System prompt                                                              */
/* -------------------------------------------------------------------------- */

const SYSTEM_PROMPT = `You are LandingForge — an AI that generates premium, realistic landing pages for fictional products and services.

WORKFLOW (follow this order every time):
1. Read the keyword and decide what TYPE of product/service it most naturally suggests.
2. Pick the best section STRUCTURE for that type. Different keywords → different structures.
3. Generate specific, compelling content — every word should feel like it belongs to this exact product.

─── SECTION SELECTION RULES ──────────────────────────────────────────────────
Always first: "hero"
Always last:  "footer"

Use these structures as guides (not strict rules — blend based on the keyword):

SaaS / productivity tool:   hero → features → stats → testimonials → pricing → faq → cta → footer
Developer CLI / library:    hero → features → stats → faq → cta → footer
Developer platform / API:   hero → features → stats → testimonials → pricing → faq → cta → footer
Open source project:        hero → features → stats → testimonials → faq → cta → footer
Community / forum:          hero → stats → features → testimonials → cta → footer
Mobile consumer app:        hero → stats → features → testimonials → pricing → cta → footer
Marketplace / directory:    hero → stats → features → testimonials → pricing → faq → cta → footer
Event / conference:         hero → stats → features → testimonials → faq → cta → footer
News / media platform:      hero → features → stats → testimonials → faq → cta → footer
Hardware / physical product: hero → features → stats → testimonials → pricing → cta → footer
Education / course:         hero → stats → features → testimonials → pricing → faq → cta → footer
Finance / fintech tool:     hero → features → stats → testimonials → faq → pricing → cta → footer

OMIT "pricing" for: open source, communities, events, libraries, developer tools with no SaaS model
OMIT "testimonials" for: early-stage dev tools, technical CLI tools, open source with no users yet
Use "stats" only when the numbers would feel plausible for this product type

─── CONTENT RULES ────────────────────────────────────────────────────────────
• Product is FICTIONAL but feels real, specific, and inspired by the keyword
• Hero title: bold, benefit-led, NOT generic ("Build. Ship. Scale." is bad — be specific)
• Features: 4-6 items, each icon must be a real Lucide PascalCase name
• Testimonials: 3 quotes from fictional but believable personas with specific roles
• FAQ: 4-5 questions someone would actually ask about this exact product
• Stats: plausible numbers that make sense for the product's stage
• Pricing tiers: 2-3 tiers; mark one as featured: true; use realistic price points

─── THEME RULES ──────────────────────────────────────────────────────────────
• ALL colors MUST be space-separated "R G B" triples (0-255 each), e.g. "124 92 255"
• NEVER use hex, hsl(), rgb() or named colors — only "R G B" triples
• Choose palette based on keyword vibe:
  - Developer/tech → cool blues, purples, or dark neutral with electric accent
  - Consumer/lifestyle → warm, vibrant, or pastel with light mode
  - Finance/enterprise → deep navy or charcoal with gold/green accent
  - Health/wellness → soft greens, teals, warm off-whites
  - Creative/design → bold saturated colors, dark mode preferred
  - Community/social → friendly purples, oranges, light mode option
• Set mode: "dark" when bg is very dark (lightness < 20%), "light" otherwise
• Ensure fg and muted contrast well against bg`;

/* -------------------------------------------------------------------------- */
/*  Public API                                                                 */
/* -------------------------------------------------------------------------- */

export async function generateLandingFromKeyword(
  keyword: string,
  dateISO: string,
): Promise<LandingConfig> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return generateLanding({ title: keyword, points: 0 }, { dateISO });
  }

  const client = new Anthropic({ apiKey });

  try {
    const message = await client.messages.create({
      model: "claude-sonnet-5",
      max_tokens: 4096,
      system: SYSTEM_PROMPT,
      tools: [
        {
          name: "save_landing_config",
          description: "Output the complete landing page configuration",
          input_schema: LANDING_CONFIG_SCHEMA,
        },
      ],
      tool_choice: { type: "any" },
      messages: [
        {
          role: "user",
          content: `Generate a premium landing page for a fictional product or service inspired by this keyword: "${keyword}"

Today's date: ${dateISO}

Analyze the keyword, determine the most appropriate product type and section structure, then generate compelling and specific content. The page should feel like a real product launch — not a template.`,
        },
      ],
    });

    const toolUse = message.content.find((b) => b.type === "tool_use");
    if (!toolUse || toolUse.type !== "tool_use") {
      throw new Error("Claude did not call the expected tool");
    }

    const raw = parseLandingConfig(toolUse.input);

    // Prefix slug with the date and sanitize it
    const baseSlug = (raw.meta?.slug ?? keyword)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 40);

    return {
      ...raw,
      meta: {
        ...raw.meta,
        slug: `${dateISO}-${baseSlug}`,
      },
    };
  } catch (err) {
    console.error("[ai-generate-landing] Claude failed, using fallback:", err);
    return generateLanding({ title: keyword, points: 0 }, { dateISO });
  }
}
