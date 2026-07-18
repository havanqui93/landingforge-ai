import { describe, expect, it } from "vitest";
import { isSensitive, selectTopStory } from "@/lib/news";
import type { AlgoliaHit } from "@/lib/news";

/* -------------------------------------------------------------------------- */
/*  isSensitive                                                                */
/* -------------------------------------------------------------------------- */

describe("isSensitive", () => {
  it("flags genuinely sensitive headlines", () => {
    expect(isSensitive("Dozens dead after building collapse")).toBe(true);
    expect(isSensitive("New war crime allegations surface")).toBe(true);
    expect(isSensitive("Major data breach exposes millions")).toBe(true);
    expect(isSensitive("Company announces massive layoff")).toBe(true);
    expect(isSensitive("Election results contested")).toBe(true);
  });

  it("matches keywords case-insensitively", () => {
    expect(isSensitive("MURDER investigation continues")).toBe(true);
    expect(isSensitive("Terror Attack foiled")).toBe(true);
  });

  it("catches inflected variants added in blocklist expansion", () => {
    // death variants
    expect(isSensitive("30 deaths reported after flooding")).toBe(true);
    expect(isSensitive("Deadly earthquake strikes region")).toBe(true);
    // kill variants
    expect(isSensitive("Gunman kills 3 at shopping centre")).toBe(true);
    expect(isSensitive("Two people killed in highway collision")).toBe(true);
    expect(isSensitive("Killing of journalist sparks outrage")).toBe(true);
    // other verb forms
    expect(isSensitive("Bombing campaign intensifies")).toBe(true);
    expect(isSensitive("Multiple attacks reported overnight")).toBe(true);
    expect(isSensitive("Man murdered in downtown alley")).toBe(true);
  });

  it("does not flag benign tech words that merely contain blocked substrings", () => {
    // "war" must not match software/hardware/warehouse/forward/award
    expect(isSensitive("New open-source software framework released")).toBe(false);
    expect(isSensitive("Building custom hardware at home")).toBe(false);
    expect(isSensitive("Warehouse automation with robots")).toBe(false);
    expect(isSensitive("A forward-thinking approach to design")).toBe(false);
    // "hack" must not match hackathon / Hacker News
    expect(isSensitive("Weekend hackathon builds a compiler")).toBe(false);
    expect(isSensitive("Show HN: my new side project")).toBe(false);
    // "dead" must not match deadline / deadlock
    expect(isSensitive("Beating the deadline with better tooling")).toBe(false);
    expect(isSensitive("Resolving a database deadlock")).toBe(false);
    // "kill" must not match skills
    expect(isSensitive("Level up your engineering skills")).toBe(false);
    // "attack" must not match "attackVector" / "stackattack" is not a word, but
    // "stack" ends with 'ck' not 'attack', so this is fine; verify "attacks"
    // doesn't inadvertently break a benign headline
    expect(isSensitive("How Rust prevents memory safety vulnerabilities")).toBe(false);
  });

  it("returns false for a typical upbeat headline", () => {
    expect(isSensitive("A delightful new way to build landing pages")).toBe(false);
  });
});

/* -------------------------------------------------------------------------- */
/*  selectTopStory                                                             */
/* -------------------------------------------------------------------------- */

const hit = (
  title: string,
  url: string | null = "https://example.com",
  points: number | null = 100,
): AlgoliaHit => ({ title, url, points });

describe("selectTopStory", () => {
  it("returns null for an empty hits array", () => {
    expect(selectTopStory([])).toBeNull();
  });

  it("returns null when all stories lack a URL", () => {
    expect(selectTopStory([hit("Good story", null)])).toBeNull();
  });

  it("returns null when all stories are sensitive", () => {
    expect(selectTopStory([hit("Gunman kills 3")])).toBeNull();
  });

  it("picks the highest-scoring non-sensitive story", () => {
    const stories: AlgoliaHit[] = [
      hit("Low score story", "https://a.com", 50),
      hit("Top story: new open-source framework", "https://b.com", 400),
      hit("Middle story: new dev tool released", "https://c.com", 200),
    ];
    const result = selectTopStory(stories);
    expect(result?.title).toBe("Top story: new open-source framework");
    expect(result?.points).toBe(400);
  });

  it("skips sensitive stories and picks the next best", () => {
    const stories: AlgoliaHit[] = [
      hit("Top rated but deadly crash kills many", "https://bad.com", 500),
      hit("Great dev tool ships v2", "https://good.com", 300),
    ];
    expect(selectTopStory(stories)?.title).toBe("Great dev tool ships v2");
  });

  it("treats null points as zero", () => {
    const stories: AlgoliaHit[] = [
      hit("No points story", "https://a.com", null),
      hit("Has points story", "https://b.com", 1),
    ];
    expect(selectTopStory(stories)?.title).toBe("Has points story");
  });

  it("returns a NewsItem with title, url, and points", () => {
    const result = selectTopStory([hit("Nice story", "https://example.com", 42)]);
    expect(result).toEqual({ title: "Nice story", url: "https://example.com", points: 42 });
  });
});
