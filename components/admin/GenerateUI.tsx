"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ChevronDown,
  Loader2,
  Check,
  ExternalLink,
  Copy,
  Layers,
} from "lucide-react";
import { useToast } from "@/components/forge/Toast";

const TRENDING = ["quantum computing", "AI agents", "WASM edge", "LLM fine-tuning"];

type StepState = "pending" | "active" | "done";
type PreviewState = "empty" | "loading" | "success";

interface Step {
  label: string;
  state: StepState;
}

const INITIAL_STEPS: Step[] = [
  { label: "Fetching trending topics", state: "pending" },
  { label: "Generating with Claude…", state: "pending" },
  { label: "Saving to store", state: "pending" },
];

async function delay(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

export function GenerateUI() {
  const router = useRouter();
  const { toast } = useToast();

  const [keyword, setKeyword] = useState("");
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [templateStyle, setTemplateStyle] = useState("auto");
  const [colorMode, setColorMode] = useState("auto");
  const [useAI, setUseAI] = useState(true);

  const [generating, setGenerating] = useState(false);
  const [steps, setSteps] = useState<Step[]>(INITIAL_STEPS);
  const [previewState, setPreviewState] = useState<PreviewState>("empty");
  const [generatedSlug, setGeneratedSlug] = useState<string | null>(null);

  function setStep(idx: number, state: StepState) {
    setSteps((prev) =>
      prev.map((s, i) => (i === idx ? { ...s, state } : s)),
    );
  }

  async function handleGenerate(e: React.FormEvent) {
    e.preventDefault();
    const kw = keyword.trim();
    if (!kw) return;

    setGenerating(true);
    setPreviewState("loading");
    setGeneratedSlug(null);
    setSteps([
      { label: "Fetching trending topics", state: "done" },
      { label: "Generating with Claude…", state: "active" },
      { label: "Saving to store", state: "pending" },
    ]);

    try {
      const res = await fetch("/api/generate-from-keyword", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ keyword: kw }),
      });

      setStep(1, "done");
      setStep(2, "active");
      await delay(600);

      const data = (await res.json()) as { url?: string; slug?: string; error?: string };

      if (!res.ok || !data.url) {
        throw new Error(data.error ?? "Generation failed");
      }

      setStep(2, "done");
      await delay(300);

      const slug = data.slug ?? data.url.replace("/l/", "");
      setGeneratedSlug(slug);
      setPreviewState("success");
      toast(`✓ Page generated: /l/${slug}`, "success");
    } catch (err) {
      toast(err instanceof Error ? err.message : "Generation failed", "error");
      setSteps(INITIAL_STEPS);
      setPreviewState("empty");
    } finally {
      setGenerating(false);
    }
  }

  function copySlug() {
    if (!generatedSlug) return;
    navigator.clipboard.writeText(`/l/${generatedSlug}`);
    toast("Slug copied to clipboard", "success");
  }

  const showSteps = generating || (previewState === "success" && generatedSlug);

  return (
    <div
      className="grid gap-6 animate-page-in"
      style={{ gridTemplateColumns: "60fr 40fr" }}
    >
      {/* ── Left: Form ── */}
      <div
        className="rounded-xl border border-border p-6"
        style={{ background: "#161626" }}
      >
        <h2 className="text-[16px] font-semibold text-fg">
          Generate Landing Page
        </h2>

        <form onSubmit={handleGenerate} className="mt-5">
          {/* Keyword input */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[12px] font-medium text-muted">
              Keyword or topic
            </label>
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              disabled={generating}
              placeholder="e.g. quantum computing…"
              className="h-12 w-full rounded-xl border border-border bg-surface px-4 text-[15px] text-fg placeholder:text-muted outline-none transition focus:border-primary focus:shadow-[0_0_0_3px_rgba(99,102,241,.15)] disabled:opacity-50"
            />
          </div>

          {/* Trending pills */}
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="text-[11px] text-muted">Trending now:</span>
            {TRENDING.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setKeyword(t)}
                disabled={generating}
                className="rounded-full border border-border px-3 py-1 text-[11px] text-muted transition hover:border-primary/40 hover:text-fg"
              >
                {t}
              </button>
            ))}
          </div>

          {/* Advanced options */}
          <div className="mt-5">
            <button
              type="button"
              onClick={() => setAdvancedOpen(!advancedOpen)}
              className="flex items-center gap-1.5 text-[13px] text-primary hover:underline"
            >
              Advanced options
              <ChevronDown
                size={13}
                className={`transition-transform duration-150 ${advancedOpen ? "rotate-180" : ""}`}
              />
            </button>

            {advancedOpen && (
              <div
                className="mt-3 rounded-xl border p-4"
                style={{
                  background: "rgba(99,102,241,.04)",
                  borderColor: "rgba(99,102,241,.1)",
                }}
              >
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[12px] font-medium text-muted">
                      Template style
                    </label>
                    <select
                      value={templateStyle}
                      onChange={(e) => setTemplateStyle(e.target.value)}
                      className="h-9 rounded-xl border border-border bg-surface px-3 text-[13px] text-fg outline-none transition focus:border-primary"
                    >
                      <option value="auto">Auto-detect</option>
                      <option value="saas">SaaS</option>
                      <option value="developer">Developer</option>
                      <option value="community">Community</option>
                      <option value="product">Product</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[12px] font-medium text-muted">
                      Color mode
                    </label>
                    <select
                      value={colorMode}
                      onChange={(e) => setColorMode(e.target.value)}
                      className="h-9 rounded-xl border border-border bg-surface px-3 text-[13px] text-fg outline-none transition focus:border-primary"
                    >
                      <option value="auto">Auto</option>
                      <option value="dark">Dark</option>
                      <option value="light">Light</option>
                    </select>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <p className="text-[13px] font-medium text-fg">
                      Use AI generation
                    </p>
                    <p className="text-[12px] text-muted">
                      ON = Claude, OFF = deterministic template
                    </p>
                  </div>
                  <label className="relative h-[22px] w-10 flex-shrink-0 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={useAI}
                      onChange={(e) => setUseAI(e.target.checked)}
                      className="sr-only"
                    />
                    <span
                      className={`forge-toggle-track ${useAI ? "forge-toggle-checked" : ""}`}
                    />
                  </label>
                </div>
              </div>
            )}
          </div>

          {/* Generate button */}
          <button
            type="submit"
            disabled={generating || !keyword.trim()}
            className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary text-[15px] font-medium text-white shadow-[0_4px_12px_rgba(99,102,241,.25)] transition hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(99,102,241,.35)] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {generating ? (
              <>
                <Loader2 size={16} className="animate-spin" /> Generating…
              </>
            ) : (
              "Generate →"
            )}
          </button>
        </form>

        {/* Progress steps */}
        {showSteps && (
          <div className="mt-6 flex flex-col gap-2">
            {steps.map((step, i) => (
              <div
                key={i}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 ${
                  step.state === "done"
                    ? "forge-step-done"
                    : step.state === "active"
                      ? "forge-step-active"
                      : "forge-step-pending"
                }`}
              >
                <span
                  className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full text-[10px] ${
                    step.state === "done"
                      ? "bg-success/20 text-success"
                      : step.state === "active"
                        ? "bg-primary/20 text-primary"
                        : "bg-surface text-muted"
                  }`}
                >
                  {step.state === "done" ? (
                    <Check size={10} />
                  ) : step.state === "active" ? (
                    <Loader2 size={10} className="animate-spin" />
                  ) : (
                    <span className="h-1.5 w-1.5 rounded-full bg-muted" />
                  )}
                </span>
                <span
                  className={`text-[13px] ${
                    step.state === "done"
                      ? "text-success"
                      : step.state === "active"
                        ? "text-primary"
                        : "text-muted"
                  }`}
                >
                  {step.label}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Right: Preview ── */}
      <div
        className="sticky top-24 self-start rounded-xl border border-border"
        style={{ background: "#161626" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <span className="text-[14px] font-semibold text-fg">Preview</span>
          {generatedSlug && (
            <a
              href={`/l/${generatedSlug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[12px] text-muted transition hover:bg-surface hover:text-fg"
            >
              Open page <ExternalLink size={11} />
            </a>
          )}
        </div>

        {/* Body */}
        <div className="p-5">
          {previewState === "empty" && (
            <div className="flex h-64 flex-col items-center justify-center gap-3">
              <Layers size={40} style={{ color: "#2A2A40" }} />
              <p className="text-[13px] text-muted">
                Your page will preview here
              </p>
            </div>
          )}

          {previewState === "loading" && (
            <div className="flex h-64 flex-col gap-3">
              {[{ w: "100%", h: 120 }, { w: "70%", h: 16 }, { w: "90%", h: 12 }, { w: "60%", h: 12 }].map(
                (s, i) => (
                  <div
                    key={i}
                    className="forge-skeleton rounded-xl"
                    style={{ height: s.h, width: s.w }}
                  />
                ),
              )}
            </div>
          )}

          {previewState === "success" && generatedSlug && (
            <div>
              {/* Mini preview */}
              <div
                className="h-[280px] w-full overflow-hidden rounded-xl border border-border"
                style={{
                  background:
                    "radial-gradient(ellipse at 50% 0%, rgba(99,102,241,.25) 0%, #080814 60%)",
                }}
              >
                <div className="flex h-full flex-col items-center justify-center gap-2 p-6 text-center">
                  <span className="forge-eyebrow text-[9px]">Preview</span>
                  <p className="text-[20px] font-bold tracking-tight text-fg">
                    {keyword}
                  </p>
                  <p className="text-[12px] text-muted">
                    Landing page generated successfully
                  </p>
                </div>
              </div>

              {/* Slug + actions */}
              <div className="mt-4 flex items-center gap-2">
                <span className="flex-1 truncate font-mono text-[11px] text-primary">
                  /l/{generatedSlug}
                </span>
                <button
                  onClick={copySlug}
                  className="flex items-center gap-1 rounded-lg border border-border px-2.5 py-1.5 text-[12px] text-muted transition hover:border-primary/40 hover:text-fg"
                >
                  <Copy size={11} /> Copy
                </button>
                <button
                  onClick={() => router.push(`/l/${generatedSlug}`)}
                  className="flex items-center gap-1.5 rounded-xl bg-primary px-3.5 py-1.5 text-[13px] font-medium text-white shadow-[0_4px_12px_rgba(99,102,241,.25)] transition hover:-translate-y-0.5"
                >
                  Visit page
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
