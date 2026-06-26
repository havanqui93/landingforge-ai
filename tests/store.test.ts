/**
 * Local-store fallback round-trip. When Vercel KV isn't configured (local dev,
 * CI), the store persists generated landings to a JSON file under cwd. We run
 * it in an isolated temp directory so the test never touches the repo.
 */
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import type { LandingConfig } from "@/lib/landing.types";
import {
  saveStoredLanding,
  getStoredLanding,
  getStoredSlugs,
  storedLandingExists,
  deleteStoredLanding,
  isStoreEnabled,
} from "@/lib/store";

const cwd = process.cwd();
let dir: string;

beforeAll(async () => {
  dir = await mkdtemp(path.join(tmpdir(), "lf-store-"));
  process.chdir(dir);
});

afterAll(async () => {
  process.chdir(cwd);
  await rm(dir, { recursive: true, force: true });
});

function fixture(slug: string): LandingConfig {
  return {
    meta: { slug, title: `${slug} title`, description: "desc" },
    theme: { primary: "124 92 255", bg: "9 9 19", mode: "dark" },
    sections: [
      { type: "hero", title: "Hi" },
      { type: "footer", brand: "Brand" },
    ],
  };
}

describe("local store round-trip", () => {
  it("is enabled outside production without KV", () => {
    expect(isStoreEnabled()).toBe(true);
  });

  it("saves and reads back a landing", async () => {
    await saveStoredLanding(fixture("alpha"));
    const got = await getStoredLanding("alpha");
    expect(got?.meta.slug).toBe("alpha");
    expect(await storedLandingExists("alpha")).toBe(true);
  });

  it("lists newest slug first", async () => {
    await saveStoredLanding(fixture("beta"));
    const slugs = await getStoredSlugs();
    expect(slugs[0]).toBe("beta");
    expect(slugs).toContain("alpha");
  });

  it("deletes a landing", async () => {
    await deleteStoredLanding("alpha");
    expect(await storedLandingExists("alpha")).toBe(false);
    expect(await getStoredLanding("alpha")).toBeUndefined();
  });
});
