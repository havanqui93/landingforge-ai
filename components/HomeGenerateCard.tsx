"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Loader2, ArrowRight } from "lucide-react";
import Link from "next/link";

const TRENDING_PILLS = ["Rust async", "edge computing", "sleep tracker"];

function useAuth() {
  const [loggedIn, setLoggedIn] = useState<boolean | null>(null);
  useEffect(() => {
    setLoggedIn(localStorage.getItem("forge_auth") === "1");
  }, []);
  return loggedIn;
}

export function HomeGenerateCard() {
  const loggedIn = useAuth();
  const [keyword, setKeyword] = useState("");
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

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

  return (
    <div className="relative mt-10 w-full max-w-[520px]">
      {/* Glass card */}
      <div
        className="relative rounded-xl border border-border p-5"
        style={{ background: "rgba(22,22,38,.6)", backdropFilter: "blur(12px)" }}
      >
        <form onSubmit={handleGenerate}>
          {/* Large input */}
          <input
            ref={inputRef}
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="e.g. AI code editor, crypto wallet, fitness tracker"
            disabled={generating || loggedIn === false}
            className="h-12 w-full rounded-xl border border-border bg-surface px-4 text-[15px] text-fg placeholder:text-muted outline-none transition focus:border-primary focus:shadow-[0_0_0_3px_rgba(99,102,241,.15)] disabled:opacity-50"
          />

          {/* Trending row */}
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="font-mono text-[11px] text-muted">Trending:</span>
            {TRENDING_PILLS.map((pill) => (
              <button
                key={pill}
                type="button"
                onClick={() => {
                  setKeyword(pill);
                  inputRef.current?.focus();
                }}
                disabled={generating}
                className="rounded-full border border-border px-3 py-1 text-[11px] text-muted transition hover:border-primary/40 hover:text-fg"
              >
                {pill}
              </button>
            ))}
          </div>

          {/* Generate button */}
          <button
            type="submit"
            disabled={generating || !keyword.trim() || loggedIn === false}
            className="mt-4 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary text-[15px] font-medium text-white shadow-[0_4px_12px_rgba(99,102,241,.25)] transition hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(99,102,241,.35)] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {generating ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Generating…
              </>
            ) : (
              <>
                Generate
                <ArrowRight size={15} />
              </>
            )}
          </button>

          {error && (
            <p className="mt-2 text-[12px] text-danger">{error}</p>
          )}
        </form>

        {/* Logged-out overlay */}
        {loggedIn === false && (
          <div
            className="absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-xl"
            style={{ background: "rgba(8,8,20,.75)", backdropFilter: "blur(4px)" }}
          >
            <Lock size={20} className="text-muted" />
            <p className="text-[13px] text-muted">Sign in to generate pages</p>
            <Link
              href="/login"
              className="rounded-xl bg-primary px-5 py-2 text-[13px] font-medium text-white shadow-[0_4px_12px_rgba(99,102,241,.25)] transition hover:-translate-y-0.5"
            >
              Sign in
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
