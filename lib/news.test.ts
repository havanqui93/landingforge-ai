import { describe, expect, it } from "vitest";
import { isSensitive } from "@/lib/news";

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
  });

  it("returns false for a typical upbeat headline", () => {
    expect(isSensitive("A delightful new way to build landing pages")).toBe(false);
  });
});
