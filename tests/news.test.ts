/**
 * The daily job themes a page around a real headline, so the sensitivity
 * filter is the editorial guardrail that keeps tragic/sensitive stories out.
 */
import { describe, it, expect } from "vitest";
import { isSensitive } from "@/lib/news";

describe("isSensitive", () => {
  it("flags headlines containing blocklisted topics", () => {
    const sensitive = [
      "Dozens dead after earthquake",
      "New study links product to cancer",
      "Company announces major layoffs",
      "Massive data breach exposes users",
      "Election results spark debate",
      "War escalates in the region",
    ];
    for (const title of sensitive) {
      expect(isSensitive(title), title).toBe(true);
    }
  });

  it("is case-insensitive", () => {
    expect(isSensitive("BREACH of trust")).toBe(true);
    expect(isSensitive("Layoff announced")).toBe(true);
  });

  it("allows upbeat, non-sensitive headlines", () => {
    const fine = [
      "Show HN: A delightful animation toolkit",
      "Local-first software is having a moment",
      "A faster way to build typed configs",
      "Open protocol for ambient computing released",
    ];
    for (const title of fine) {
      expect(isSensitive(title), title).toBe(false);
    }
  });

  // Regression: word-boundary matching must not flag benign words that merely
  // contain a blocklist term as a substring.
  it("does not flag benign words containing a blocklist substring", () => {
    const benign = [
      "software",
      "award-winning design",
      "swarm intelligence",
      "skill tree",
      "a sword in the stone",
      "a classic rework",
    ];
    for (const title of benign) {
      expect(isSensitive(title), title).toBe(false);
    }
  });

  // ...while still catching inflected forms of real blocklist terms.
  it("still catches inflected forms", () => {
    for (const title of ["killed", "dies suddenly", "attacks doubled", "breached"]) {
      expect(isSensitive(title), title).toBe(true);
    }
  });
});
