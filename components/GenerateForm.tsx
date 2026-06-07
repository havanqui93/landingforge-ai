"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Sparkles, TrendingUp } from "lucide-react";

export function GenerateForm() {
  const [keyword, setKeyword] = useState("");
  const [generating, setGenerating] = useState(false);
  const [trending, setTrending] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  async function handleTrending() {
    setTrending(true);
    setError("");
    try {
      const res = await fetch("/api/trending");
      const data = (await res.json()) as { keyword?: string; error?: string };
      if (!res.ok || !data.keyword) {
        setError(data.error ?? "Could not fetch trending topic.");
        return;
      }
      setKeyword(data.keyword);
      inputRef.current?.focus();
    } catch {
      setError("Failed to fetch trending topic.");
    } finally {
      setTrending(false);
    }
  }

  async function handleGenerate(e: React.FormEvent) {
    e.preventDefault();
    const kw = keyword.trim();
    if (!kw) return;
    setGenerating(true);
    setError("");
    try {
      const res = await fetch("/api/generate-from-keyword", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ keyword: kw }),
      });
      const data = (await res.json()) as { url?: string; error?: string };
      if (!res.ok || !data.url) {
        setError(data.error ?? "Generation failed. Please try again.");
        return;
      }
      router.push(data.url);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setGenerating(false);
    }
  }

  const busy = generating || trending;

  return (
    <form onSubmit={handleGenerate} className="mt-8 w-full max-w-2xl">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch">
        {/* Keyword input */}
        <input
          ref={inputRef}
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Enter a keyword or topic…"
          disabled={busy}
          className="flex-1 rounded-xl border border-border bg-surface/60 px-4 py-3 text-sm text-fg placeholder:text-muted backdrop-blur-sm transition focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-50"
        />

        <div className="flex gap-2">
          {/* Trending button */}
          <button
            type="button"
            onClick={handleTrending}
            disabled={busy}
            title="Auto-fill with today's top Hacker News story"
            className="flex items-center gap-2 rounded-xl border border-border bg-surface/60 px-4 py-3 text-sm font-medium text-muted backdrop-blur-sm transition hover:border-primary/50 hover:text-fg disabled:opacity-50"
          >
            {trending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <TrendingUp className="h-4 w-4" />
            )}
            <span>Trending</span>
          </button>

          {/* Generate button */}
          <button
            type="submit"
            disabled={busy || !keyword.trim()}
            className="flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-fg shadow-lg shadow-primary/25 transition hover:opacity-90 hover:shadow-xl hover:shadow-primary/30 disabled:opacity-50"
          >
            {generating ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Sparkles className="h-4 w-4" />
            )}
            <span>{generating ? "Generating…" : "Generate"}</span>
          </button>
        </div>
      </div>

      {error && (
        <p className="mt-2 text-xs text-red-400">{error}</p>
      )}

      <p className="mt-2 text-xs text-muted/70">
        Generates a full landing page themed around your keyword · Powered by LandingForge
      </p>
    </form>
  );
}
