import { landings, type RegistryEntry } from "@/lib/registry";
import { getStoredLandings } from "@/lib/store";
import { PagesTableUI, type AdminPage } from "@/components/admin/PagesTableUI";
import type { LandingConfig } from "@/lib/landing.types";

export const dynamic = "force-dynamic";

function detectSource(slug: string): AdminPage["source"] {
  if (/^\d{4}-\d{2}-\d{2}/.test(slug)) return "cron";
  return "manual";
}

function extractDate(slug: string): string {
  const match = slug.match(/^(\d{4}-\d{2}-\d{2})/);
  return match?.[1] ?? "—";
}

function toAdminPage(
  slug: string,
  config: LandingConfig,
  source: AdminPage["source"],
  deletable: boolean,
): AdminPage {
  return {
    slug,
    title: config.meta.title,
    description: config.meta.description,
    source,
    status: "published",
    category: "product",
    sections: config.sections.map((s) => s.type),
    createdAt: extractDate(slug),
    deletable,
  };
}

async function getAllAdminPages(): Promise<AdminPage[]> {
  const stored = await getStoredLandings();
  const seen = new Set(landings.map((l) => l.slug));

  const storedPages: AdminPage[] = stored
    .filter((config) => !seen.has(config.meta.slug))
    .map((config) =>
      toAdminPage(config.meta.slug, config, detectSource(config.meta.slug), true),
    );

  const registryPages: AdminPage[] = landings.map(({ slug, config }) =>
    toAdminPage(slug, config, "manual", false),
  );

  return [...storedPages, ...registryPages];
}

export default async function AdminPagesPage() {
  const pages = await getAllAdminPages();
  return <PagesTableUI initialPages={pages} />;
}
