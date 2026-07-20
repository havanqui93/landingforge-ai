/**
 * Editorial template — a second, structurally distinct page system.
 *
 * Where LandingForge's default template (landing.types.ts) stacks centered,
 * card-based sections, the editorial template renders a magazine-style
 * layout: asymmetric columns, numbered lists, hairline rules, and inverted
 * sign-off blocks. It reuses the same theme contract (LandingTheme) and CTA
 * shape so both templates share ThemeProvider and animation primitives, but
 * defines its own `Block` union so the two renderers stay independent —
 * editing one never risks the other.
 *
 * To add a new block type: add a `*Block` interface, add it to the `Block`
 * union, build the matching component under components/editorial/blocks,
 * and add a case to EditorialRenderer's exhaustive switch.
 */

import type { CTAButton, LandingMeta, LandingTheme } from "./landing.types";

export interface MastheadBlock {
  type: "masthead";
  /** e.g. "Vol. 04 — No. 12" */
  issue?: string;
  kicker?: string;
  title: string;
  /** Deck / subtitle. */
  dek?: string;
  byline?: string;
  actions?: CTAButton[];
  /** Short labels for the side table-of-contents (desktop only). */
  toc?: string[];
}

export interface IndexEntry {
  title: string;
  description: string;
}

export interface IndexBlock {
  type: "index";
  kicker?: string;
  title: string;
  dek?: string;
  entries: IndexEntry[];
}

export interface TickerItem {
  value: string;
  label: string;
}

export interface TickerBlock {
  type: "ticker";
  entries: TickerItem[];
}

export interface DispatchItem {
  quote: string;
  author: string;
  role?: string;
}

export interface DispatchesBlock {
  type: "dispatches";
  kicker?: string;
  title?: string;
  entries: DispatchItem[];
}

export interface LedgerRow {
  name: string;
  price: string;
  period?: string;
  description?: string;
  features: string[];
  cta: CTAButton;
  featured?: boolean;
}

export interface LedgerBlock {
  type: "ledger";
  kicker?: string;
  title: string;
  dek?: string;
  rows: LedgerRow[];
}

export interface DossierItem {
  question: string;
  answer: string;
}

export interface DossierBlock {
  type: "dossier";
  kicker?: string;
  title: string;
  entries: DossierItem[];
}

export interface ColophonColumn {
  heading: string;
  links: { label: string; href: string }[];
}

export interface ColophonBlock {
  type: "colophon";
  statement: string;
  actions?: CTAButton[];
  brand: string;
  columns?: ColophonColumn[];
  legal?: string;
}

export type Block =
  | MastheadBlock
  | IndexBlock
  | TickerBlock
  | DispatchesBlock
  | LedgerBlock
  | DossierBlock
  | ColophonBlock;

export type BlockType = Block["type"];

export interface EditorialConfig {
  meta: LandingMeta;
  theme: LandingTheme;
  blocks: Block[];
}
