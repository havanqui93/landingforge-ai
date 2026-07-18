import { describe, expect, it } from "vitest";
import { slugify } from "@/lib/slug";

describe("slugify", () => {
  it("lowercases and hyphenates", () => {
    expect(slugify("Hello World")).toBe("hello-world");
  });

  it("strips accents/diacritics", () => {
    expect(slugify("Café Déjà Vu")).toBe("cafe-deja-vu");
    expect(slugify("Đông Nam Á")).toBe("ong-nam-a");
  });

  it("removes special characters but keeps separators", () => {
    expect(slugify("Node.js & TypeScript!")).toBe("nodejs-typescript");
    expect(slugify("price: $19/mo")).toBe("price-19mo");
  });

  it("collapses whitespace, underscores, and hyphens into one hyphen", () => {
    expect(slugify("a   b__c--d")).toBe("a-b-c-d");
  });

  it("trims leading and trailing separators", () => {
    expect(slugify("  --Hello--  ")).toBe("hello");
  });

  it("returns an empty string when there is nothing slug-worthy", () => {
    expect(slugify("!!!")).toBe("");
    expect(slugify("   ")).toBe("");
  });
});
