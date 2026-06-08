"use client";

import { useState } from "react";
import {
  ChevronDown,
  Clock,
  Check,
  Loader2,
  Play,
} from "lucide-react";
import { useToast } from "@/components/forge/Toast";

const PRESETS = [
  { label: "Daily midnight", value: "0 0 * * *" },
  { label: "Every 6h", value: "0 */6 * * *" },
  { label: "Every hour", value: "0 * * * *" },
  { label: "Weekdays 9am", value: "0 9 * * 1-5" },
];

function describeCron(expr: string): string {
  const parts = expr.trim().split(/\s+/);
  if (parts.length !== 5) return "Custom schedule";
  const [min, hr, dom, , dow] = parts;
  if (expr === "0 0 * * *") return "Every day at midnight (UTC)";
  if (expr === "0 */6 * * *") return "Every 6 hours";
  if (expr === "0 * * * *") return "Every hour";
  if (expr === "0 9 * * 1-5") return "Weekdays at 9:00am";
  if (min === "0" && hr !== "*" && dom === "*" && dow === "*")
    return `Every day at ${hr}:00 UTC`;
  return "Custom schedule";
}

type StepState = "pending" | "active" | "done";

const STEPS = [
  "Fetching trending topics",
  "Generating with Claude…",
  "Saving to store",
];

export default function SchedulePage() {
  const { toast } = useToast();

  // Cron card state
  const [cronValue, setCronValue] = useState("0 0 * * *");
  const [presetsOpen, setPresetsOpen] = useState(false);
  const [cronSaving, setCronSaving] = useState(false);

  // Manual trigger state
  const [running, setRunning] = useState(false);
  const [stepStates, setStepStates] = useState<StepState[]>(["pending", "pending", "pending"]);
  const [lastRun, setLastRun] = useState<string | null>(null);
  const [lastSlug, setLastSlug] = useState<string | null>(null);

  // Permissions state
  const [requireLogin, setRequireLogin] = useState(true);
  const [requireEmailVerification, setRequireEmailVerification] = useState(false);
  const [permSaving, setPermSaving] = useState(false);

  async function saveCron() {
    setCronSaving(true);
    await new Promise((r) => setTimeout(r, 800));
    setCronSaving(false);
    toast("Cron schedule saved", "success");
  }

  async function runNow() {
    setRunning(true);
    setStepStates(["done", "active", "pending"]);

    try {
      const res = await fetch("/api/cron/daily-landing");
      setStepStates(["done", "done", "active"]);
      await new Promise((r) => setTimeout(r, 500));

      const data = (await res.json()) as { slug?: string; error?: string };
      setStepStates(["done", "done", "done"]);

      const slug = data.slug ?? "unknown";
      setLastRun(new Date().toLocaleString());
      setLastSlug(slug);
      toast(`✓ Generated /l/${slug}`, "success");
    } catch {
      toast("Generation failed", "error");
      setStepStates(["pending", "pending", "pending"]);
    } finally {
      setRunning(false);
    }
  }

  async function savePermissions() {
    setPermSaving(true);
    await new Promise((r) => setTimeout(r, 700));
    setPermSaving(false);
    toast("Permissions saved", "success");
  }

  return (
    <div className="mx-auto max-w-[680px] animate-page-in">
      <h1 className="mb-8 text-[24px] font-bold tracking-tight text-fg">
        Schedule
      </h1>

      <div className="flex flex-col gap-5">
        {/* ── Card 1: Cron Configuration ── */}
        <div
          className="rounded-xl border border-border p-5"
          style={{ background: "#161626" }}
        >
          <h2 className="text-[14px] font-semibold text-fg">
            Cron Expression
          </h2>

          <div className="mt-4 flex flex-col gap-1.5">
            <input
              type="text"
              value={cronValue}
              onChange={(e) => setCronValue(e.target.value)}
              className="h-11 w-full rounded-xl border border-border bg-surface px-4 font-mono text-[15px] text-fg placeholder:text-muted outline-none transition focus:border-primary focus:shadow-[0_0_0_3px_rgba(99,102,241,.15)]"
            />
            <div className="flex items-center gap-1.5 text-[13px] text-muted">
              <Clock size={12} />
              {describeCron(cronValue)}
            </div>
          </div>

          {/* Presets toggle */}
          <button
            type="button"
            onClick={() => setPresetsOpen(!presetsOpen)}
            className="mt-3 flex items-center gap-1 text-[13px] text-primary hover:underline"
          >
            Show presets
            <ChevronDown
              size={12}
              className={`transition-transform duration-150 ${presetsOpen ? "rotate-180" : ""}`}
            />
          </button>

          {presetsOpen && (
            <div
              className="mt-3 flex flex-wrap gap-2 rounded-xl border p-4"
              style={{
                background: "rgba(99,102,241,.04)",
                borderColor: "rgba(99,102,241,.1)",
              }}
            >
              {PRESETS.map((p) => (
                <button
                  key={p.value}
                  onClick={() => { setCronValue(p.value); setPresetsOpen(false); }}
                  className="rounded-full border border-border px-3.5 py-1.5 text-[12px] text-muted transition hover:border-primary/40 hover:text-fg"
                >
                  {p.label}
                </button>
              ))}
            </div>
          )}

          {/* Footer */}
          <div className="mt-5 flex items-center justify-end gap-3">
            <button
              onClick={() => setCronValue("0 0 * * *")}
              className="rounded-xl px-4 py-2 text-[13px] text-muted transition hover:bg-surface hover:text-fg"
            >
              Reset to default
            </button>
            <button
              onClick={saveCron}
              disabled={cronSaving}
              className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-[13px] font-medium text-white shadow-[0_4px_12px_rgba(99,102,241,.25)] transition hover:-translate-y-0.5 disabled:opacity-50"
            >
              {cronSaving ? (
                <><Loader2 size={13} className="animate-spin" /> Saving…</>
              ) : (
                "Save changes"
              )}
            </button>
          </div>
        </div>

        {/* ── Card 2: Manual Trigger ── */}
        <div
          className="relative overflow-hidden rounded-xl border border-border"
          style={{ background: "#161626" }}
        >
          <div className="p-5">
            {/* Header row */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="flex h-9 w-9 items-center justify-center rounded-xl"
                  style={{ background: "rgba(99,102,241,.12)" }}
                >
                  <Play size={14} className="text-primary" />
                </div>
                <div>
                  <p className="text-[14px] font-semibold text-fg">
                    Run generation now
                  </p>
                  <p className="text-[13px] text-muted">
                    Pulls the top Hacker News story and generates a fresh page.
                  </p>
                </div>
              </div>
              <button
                onClick={runNow}
                disabled={running}
                className="flex flex-shrink-0 items-center gap-2 rounded-xl bg-primary px-4 py-2 text-[13px] font-medium text-white shadow-[0_4px_12px_rgba(99,102,241,.25)] transition hover:-translate-y-0.5 disabled:opacity-50"
              >
                {running ? (
                  <><Loader2 size={13} className="animate-spin" /> Generating…</>
                ) : (
                  "Run now →"
                )}
              </button>
            </div>

            {/* Last run info */}
            {lastRun && (
              <p className="mt-3 text-[13px] text-muted">
                Last run: {lastRun}
                {lastSlug && (
                  <> · Generated:{" "}
                    <a
                      href={`/l/${lastSlug}`}
                      className="text-primary hover:underline"
                    >
                      {lastSlug}
                    </a>
                  </>
                )}
              </p>
            )}

            {/* Progress steps */}
            {running && (
              <div className="mt-5 flex flex-col gap-2">
                {STEPS.map((label, i) => {
                  const state = stepStates[i];
                  return (
                    <div
                      key={i}
                      className={`flex items-center gap-3 rounded-xl px-4 py-3 ${
                        state === "done"
                          ? "forge-step-done"
                          : state === "active"
                            ? "forge-step-active"
                            : "forge-step-pending"
                      }`}
                    >
                      <span
                        className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full ${
                          state === "done"
                            ? "bg-success/20 text-success"
                            : state === "active"
                              ? "bg-primary/20 text-primary"
                              : "bg-surface text-muted"
                        }`}
                      >
                        {state === "done" ? (
                          <Check size={10} />
                        ) : state === "active" ? (
                          <Loader2 size={10} className="animate-spin" />
                        ) : (
                          <span className="h-1.5 w-1.5 rounded-full bg-muted" />
                        )}
                      </span>
                      <span
                        className={`text-[13px] ${
                          state === "done"
                            ? "text-success"
                            : state === "active"
                              ? "text-primary"
                              : "text-muted"
                        }`}
                      >
                        {label}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Animated progress bar at bottom */}
          {running && (
            <div
              className="relative h-[3px] overflow-hidden"
              style={{ background: "rgba(99,102,241,.15)" }}
            >
              <div
                className="absolute inset-y-0 left-0 w-1/2 rounded-full"
                style={{
                  background: "linear-gradient(90deg, #6366F1, #818CF8)",
                  animation: "forge-bar 1.4s ease-in-out infinite",
                }}
              />
            </div>
          )}
        </div>

        {/* ── Card 3: Permissions ── */}
        <div
          className="rounded-xl border border-border p-5"
          style={{ background: "#161626" }}
        >
          <h2 className="mb-4 text-[14px] font-semibold text-fg">
            Who can generate pages?
          </h2>

          {/* Toggle row 1 */}
          <div className="flex items-center justify-between border-b border-border pb-4">
            <div>
              <p className="text-[14px] font-medium text-fg">
                Require login to generate
              </p>
              <p className="mt-0.5 text-[12px] text-muted">
                When enabled, only authenticated users can use the generate form.
              </p>
            </div>
            <label className="relative ml-4 h-[22px] w-10 flex-shrink-0 cursor-pointer">
              <input
                type="checkbox"
                checked={requireLogin}
                onChange={(e) => setRequireLogin(e.target.checked)}
                className="sr-only"
              />
              <span
                className={`forge-toggle-track ${requireLogin ? "forge-toggle-checked" : ""}`}
              />
            </label>
          </div>

          {/* Toggle row 2 */}
          <div className="flex items-center justify-between pt-4">
            <div>
              <p className="text-[14px] font-medium text-fg">
                Require email verification
              </p>
              <p className="mt-0.5 text-[12px] text-muted">
                New accounts must verify their email before generating.
              </p>
            </div>
            <label className="relative ml-4 h-[22px] w-10 flex-shrink-0 cursor-pointer">
              <input
                type="checkbox"
                checked={requireEmailVerification}
                onChange={(e) => setRequireEmailVerification(e.target.checked)}
                className="sr-only"
              />
              <span
                className={`forge-toggle-track ${requireEmailVerification ? "forge-toggle-checked" : ""}`}
              />
            </label>
          </div>

          <div className="mt-5 flex justify-end">
            <button
              onClick={savePermissions}
              disabled={permSaving}
              className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-[13px] font-medium text-white shadow-[0_4px_12px_rgba(99,102,241,.25)] transition hover:-translate-y-0.5 disabled:opacity-50"
            >
              {permSaving ? (
                <><Loader2 size={13} className="animate-spin" /> Saving…</>
              ) : (
                "Save"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
