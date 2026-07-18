import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/prisma", () => ({
  prisma: {
    landingPage: { findUnique: vi.fn() },
  },
}));

import { prisma } from "@/lib/prisma";
import { uniqueSlug } from "@/lib/slug";

// Cast to bypass Prisma's generated overload types — the mock returns a plain object.
const findUnique = prisma.landingPage.findUnique as any;

beforeEach(() => {
  vi.clearAllMocks();
});

describe("uniqueSlug", () => {
  it("returns the slugified base when the slug is not taken", async () => {
    findUnique.mockResolvedValue(null);
    expect(await uniqueSlug("Hello World")).toBe("hello-world");
  });

  it("appends -2 when the base slug is already taken", async () => {
    findUnique
      .mockResolvedValueOnce({ id: "other" }) // "hello-world" taken
      .mockResolvedValueOnce(null); // "hello-world-2" free
    expect(await uniqueSlug("Hello World")).toBe("hello-world-2");
  });

  it("increments the suffix until a free slug is found", async () => {
    // Loop: candidate="test" → taken; candidate="test-2" → taken; candidate="test-3" → free
    findUnique
      .mockResolvedValueOnce({ id: "a" }) // "test" taken
      .mockResolvedValueOnce({ id: "b" }) // "test-2" taken
      .mockResolvedValueOnce(null); // "test-3" free
    expect(await uniqueSlug("test")).toBe("test-3");
  });

  it("returns the base slug when it belongs to the ignored id", async () => {
    findUnique.mockResolvedValue({ id: "my-page-id" });
    expect(await uniqueSlug("Hello World", "my-page-id")).toBe("hello-world");
  });

  it("falls back to 'page' when the input slugifies to an empty string", async () => {
    findUnique.mockResolvedValue(null);
    expect(await uniqueSlug("!!!")).toBe("page");
  });
});
