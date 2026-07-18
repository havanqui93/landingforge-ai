/**
 * Smoke tests for the daily landing cron route.
 *
 * All I/O dependencies are mocked so this runs in CI without credentials:
 *   - @/lib/news      → fetchTopStory
 *   - @/lib/ai-generate-landing → generateLandingFromKeyword
 *   - @/lib/store     → isStoreEnabled / saveStoredLanding / storedLandingExists
 *   - next/server     → NextResponse (returns plain {body, status} for easy assertion)
 */

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

/* ---- mocks must be declared before the imports they affect --------------- */

type MockRes = { body: unknown; status: number };

vi.mock("next/server", () => ({
  NextResponse: {
    json: vi.fn(
      (body: unknown, init?: { status?: number }): MockRes => ({
        body,
        status: init?.status ?? 200,
      }),
    ),
  },
}));

vi.mock("@/lib/news", () => ({ fetchTopStory: vi.fn() }));
vi.mock("@/lib/ai-generate-landing", () => ({
  generateLandingFromKeyword: vi.fn(),
}));
vi.mock("@/lib/store", () => ({
  isStoreEnabled: vi.fn(),
  saveStoredLanding: vi.fn(),
  storedLandingExists: vi.fn(),
}));

import { GET } from "@/app/api/cron/daily-landing/route";
import { fetchTopStory } from "@/lib/news";
import { generateLandingFromKeyword } from "@/lib/ai-generate-landing";
import { isStoreEnabled, saveStoredLanding, storedLandingExists } from "@/lib/store";

/* ---- helpers ------------------------------------------------------------- */

const TODAY = new Date().toISOString().slice(0, 10);

const MOCK_STORY = {
  title: "A great new open-source framework",
  url: "https://example.com/story",
  points: 400,
};

const MOCK_CONFIG = {
  meta: {
    slug: `${TODAY}-frameworkflow`,
    title: "FrameworkFlow",
    description: "Inspired by today's headlines.",
  },
  theme: { primary: "99 102 241", bg: "10 10 20", mode: "dark" as const },
  sections: [
    { type: "hero" as const, title: "Ship faster" },
    { type: "footer" as const, brand: "FrameworkFlow" },
  ],
};

function req(headers: Record<string, string> = {}): Request {
  return new Request("http://localhost/api/cron/daily-landing", { headers });
}

async function call(headers: Record<string, string> = {}): Promise<MockRes> {
  return GET(req(headers)) as unknown as Promise<MockRes>;
}

/* ---- test setup ---------------------------------------------------------- */

beforeEach(() => {
  vi.mocked(isStoreEnabled).mockReturnValue(true);
  vi.mocked(fetchTopStory).mockResolvedValue(MOCK_STORY);
  vi.mocked(generateLandingFromKeyword).mockResolvedValue(MOCK_CONFIG);
  vi.mocked(storedLandingExists).mockResolvedValue(false);
  vi.mocked(saveStoredLanding).mockResolvedValue(undefined);
});

afterEach(() => {
  delete process.env.CRON_SECRET;
  vi.clearAllMocks();
});

/* ---- tests --------------------------------------------------------------- */

describe("GET /api/cron/daily-landing", () => {
  describe("auth guard", () => {
    it("returns 401 when CRON_SECRET is set but auth header is absent", async () => {
      process.env.CRON_SECRET = "super-secret";
      const res = await call();
      expect(res.status).toBe(401);
      expect((res.body as { error: string }).error).toBe("Unauthorized");
    });

    it("returns 401 when CRON_SECRET is set and Bearer token is wrong", async () => {
      process.env.CRON_SECRET = "super-secret";
      const res = await call({ authorization: "Bearer wrong-token" });
      expect(res.status).toBe(401);
    });

    it("proceeds when CRON_SECRET is set and token matches", async () => {
      process.env.CRON_SECRET = "super-secret";
      const res = await call({ authorization: "Bearer super-secret" });
      expect(res.status).toBe(200);
    });

    it("skips the auth check when CRON_SECRET is not set", async () => {
      const res = await call(); // no auth header, no secret configured
      expect(res.status).toBe(200);
    });
  });

  describe("store guard", () => {
    it("returns 503 when the store is not enabled", async () => {
      vi.mocked(isStoreEnabled).mockReturnValue(false);
      const res = await call();
      expect(res.status).toBe(503);
    });
  });

  describe("news fetch", () => {
    it("returns 502 when no suitable story is found", async () => {
      vi.mocked(fetchTopStory).mockResolvedValue(null);
      const res = await call();
      expect(res.status).toBe(502);
    });
  });

  describe("happy path", () => {
    it("returns 200 with slug and URL on success", async () => {
      const res = await call();
      expect(res.status).toBe(200);
      const body = res.body as { ok: boolean; slug: string; url: string; source: string };
      expect(body.ok).toBe(true);
      expect(body.slug).toBe(MOCK_CONFIG.meta.slug);
      expect(body.url).toBe(`/l/${MOCK_CONFIG.meta.slug}`);
      expect(body.source).toBe(MOCK_STORY.url);
    });

    it("calls generateLandingFromKeyword with the story title and today's date", async () => {
      await call();
      expect(vi.mocked(generateLandingFromKeyword)).toHaveBeenCalledWith(
        MOCK_STORY.title,
        TODAY,
      );
    });

    it("saves the generated config to the store", async () => {
      await call();
      expect(vi.mocked(saveStoredLanding)).toHaveBeenCalledWith(MOCK_CONFIG);
    });
  });

  describe("slug collision deduplication", () => {
    it("appends a suffix to the slug when it already exists in the store", async () => {
      vi.mocked(storedLandingExists).mockResolvedValue(true);
      const res = await call();
      expect(res.status).toBe(200);
      const body = res.body as { slug: string };
      // Slug must be longer than the original and start with it
      expect(body.slug.startsWith(MOCK_CONFIG.meta.slug)).toBe(true);
      expect(body.slug).not.toBe(MOCK_CONFIG.meta.slug);
    });

    it("stores the deduplicated slug, not the original", async () => {
      vi.mocked(storedLandingExists).mockResolvedValue(true);
      await call();
      const savedConfig = vi.mocked(saveStoredLanding).mock.calls[0]?.[0];
      expect(savedConfig?.meta.slug).not.toBe(MOCK_CONFIG.meta.slug);
      expect(savedConfig?.meta.slug.startsWith(MOCK_CONFIG.meta.slug)).toBe(true);
    });
  });

  describe("error handling", () => {
    it("returns 500 when an unexpected error is thrown", async () => {
      vi.mocked(fetchTopStory).mockRejectedValue(new Error("HN fetch failed: 503"));
      const res = await call();
      expect(res.status).toBe(500);
      expect((res.body as { error: string }).error).toBe("HN fetch failed: 503");
    });
  });
});
