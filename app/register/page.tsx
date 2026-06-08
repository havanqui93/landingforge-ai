"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Zap, Eye, EyeOff, Check, X, Loader2, AlertCircle } from "lucide-react";

function strengthScore(pw: string): 0 | 1 | 2 | 3 | 4 {
  let s = 0;
  if (pw.length >= 8) s++;
  if (/[A-Z]/.test(pw)) s++;
  if (/\d/.test(pw)) s++;
  if (/[^A-Za-z0-9]/.test(pw)) s++;
  return s as 0 | 1 | 2 | 3 | 4;
}

const STRENGTH_LABELS = ["", "Weak", "Fair", "Good", "Strong"];
const STRENGTH_COLORS = ["", "#DC2626", "#D97706", "#6366F1", "#059669"];

function SegmentBar({ score }: { score: number }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="forge-strength-seg"
          style={
            i <= score
              ? {
                  background:
                    score === 1
                      ? "#DC2626"
                      : score === 2
                        ? "#D97706"
                        : score === 3
                          ? "#6366F1"
                          : "#059669",
                }
              : undefined
          }
        />
      ))}
    </div>
  );
}

function InlineIcon({ valid, touched }: { valid: boolean; touched: boolean }) {
  if (!touched) return null;
  return valid ? (
    <Check size={13} className="text-success" />
  ) : (
    <X size={13} className="text-danger" />
  );
}

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const score = strengthScore(password);

  // Inline validation
  const nameTouched = name.length > 0;
  const nameValid = name.length >= 2;
  const emailTouched = email.length > 0;
  const emailValid = email.includes("@") && email.includes(".");
  const confirmTouched = confirm.length > 0;
  const confirmValid = confirm === password && confirm.length > 0;

  function validate() {
    const e: Record<string, string> = {};
    if (!nameValid) e.name = "Name must be at least 2 characters";
    if (!emailValid) e.email = "Enter a valid email address";
    if (score < 1) e.password = "Password must be at least 8 characters";
    if (!confirmValid) e.confirm = "Passwords do not match";
    if (!agreed) e.tos = "You must agree to the Terms of Service";
    return e;
  }

  async function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({});
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1400));
    localStorage.setItem("forge_auth", "1");
    setLoading(false);
    router.push("/");
  }

  return (
    <div
      className="flex min-h-screen items-center justify-center px-4 py-12"
      style={{
        background: "#080814",
        backgroundImage:
          "radial-gradient(rgba(42,42,64,.8) 1px, transparent 1px), radial-gradient(ellipse at 50% 50%, rgba(99,102,241,.06) 0%, transparent 60%)",
        backgroundSize: "28px 28px, 100% 100%",
      }}
    >
      <div
        className="forge-card-in w-full max-w-[480px] rounded-[20px] border border-border p-10"
        style={{ background: "rgba(22,22,38,.7)", backdropFilter: "blur(16px)" }}
      >
        {/* Logo */}
        <div className="flex items-center justify-center gap-1.5 text-[18px] font-bold tracking-tight">
          <Zap size={20} className="text-primary" fill="currentColor" />
          <span className="text-fg">Landing</span>
          <span className="text-primary">Forge</span>
        </div>

        <h1 className="mt-7 text-center text-[28px] font-bold tracking-[-0.02em] text-fg">
          Create your account
        </h1>
        <p className="mt-2 text-center text-[14px] text-muted">
          Start generating premium landing pages.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-3.5">
          {/* Name */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[12px] font-medium text-muted">Full name</label>
            <div className="relative">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={loading}
                className={`h-[38px] w-full rounded-xl border bg-surface pl-3 pr-9 text-[14px] text-fg placeholder:text-muted outline-none transition ${
                  errors.name
                    ? "border-danger shadow-[0_0_0_3px_rgba(220,38,38,.15)]"
                    : nameTouched && nameValid
                      ? "border-success shadow-[0_0_0_3px_rgba(5,150,105,.12)]"
                      : "border-border focus:border-primary focus:shadow-[0_0_0_3px_rgba(99,102,241,.15)]"
                } disabled:opacity-50`}
                placeholder="Jane Smith"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2">
                <InlineIcon valid={nameValid} touched={nameTouched} />
              </span>
            </div>
            {errors.name && (
              <span className="flex items-center gap-1 text-[12px] text-danger">
                <AlertCircle size={11} /> {errors.name}
              </span>
            )}
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[12px] font-medium text-muted">Email</label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                className={`h-[38px] w-full rounded-xl border bg-surface pl-3 pr-9 text-[14px] text-fg placeholder:text-muted outline-none transition ${
                  errors.email
                    ? "border-danger shadow-[0_0_0_3px_rgba(220,38,38,.15)]"
                    : emailTouched && emailValid
                      ? "border-success shadow-[0_0_0_3px_rgba(5,150,105,.12)]"
                      : "border-border focus:border-primary focus:shadow-[0_0_0_3px_rgba(99,102,241,.15)]"
                } disabled:opacity-50`}
                placeholder="you@example.com"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2">
                <InlineIcon valid={emailValid} touched={emailTouched} />
              </span>
            </div>
            {errors.email && (
              <span className="flex items-center gap-1 text-[12px] text-danger">
                <AlertCircle size={11} /> {errors.email}
              </span>
            )}
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[12px] font-medium text-muted">Password</label>
            <div className="relative">
              <input
                type={showPw ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                className={`h-[38px] w-full rounded-xl border bg-surface pl-3 pr-10 text-[14px] text-fg placeholder:text-muted outline-none transition ${
                  errors.password
                    ? "border-danger shadow-[0_0_0_3px_rgba(220,38,38,.15)]"
                    : "border-border focus:border-primary focus:shadow-[0_0_0_3px_rgba(99,102,241,.15)]"
                } disabled:opacity-50`}
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPw(!showPw)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted transition hover:text-fg"
              >
                {showPw ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </div>
            {/* Strength meter */}
            {password.length > 0 && (
              <div className="flex flex-col gap-1">
                <SegmentBar score={score} />
                <span
                  className="text-[11px] font-medium"
                  style={{ color: STRENGTH_COLORS[score] || "#9494AA" }}
                >
                  {STRENGTH_LABELS[score] || ""}
                </span>
              </div>
            )}
            {errors.password && (
              <span className="flex items-center gap-1 text-[12px] text-danger">
                <AlertCircle size={11} /> {errors.password}
              </span>
            )}
          </div>

          {/* Confirm password */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[12px] font-medium text-muted">
              Confirm password
            </label>
            <div className="relative">
              <input
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                disabled={loading}
                className={`h-[38px] w-full rounded-xl border bg-surface pl-3 pr-9 text-[14px] text-fg placeholder:text-muted outline-none transition ${
                  errors.confirm
                    ? "border-danger shadow-[0_0_0_3px_rgba(220,38,38,.15)]"
                    : confirmTouched && confirmValid
                      ? "border-success shadow-[0_0_0_3px_rgba(5,150,105,.12)]"
                      : "border-border focus:border-primary focus:shadow-[0_0_0_3px_rgba(99,102,241,.15)]"
                } disabled:opacity-50`}
                placeholder="••••••••"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2">
                <InlineIcon valid={confirmValid} touched={confirmTouched} />
              </span>
            </div>
            {errors.confirm && (
              <span className="flex items-center gap-1 text-[12px] text-danger">
                <AlertCircle size={11} /> {errors.confirm}
              </span>
            )}
          </div>

          {/* ToS checkbox */}
          <label className="flex cursor-pointer items-start gap-2.5">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-0.5 h-4 w-4 accent-primary"
            />
            <span className="text-[13px] text-muted">
              I agree to the{" "}
              <a href="#" className="text-primary hover:underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-primary hover:underline">
                Privacy Policy
              </a>
            </span>
          </label>
          {errors.tos && (
            <span className="flex items-center gap-1 text-[12px] text-danger">
              <AlertCircle size={11} /> {errors.tos}
            </span>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="mt-1 flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-primary text-[14px] font-medium text-white shadow-[0_4px_12px_rgba(99,102,241,.25)] transition hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(99,102,241,.35)] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading && <Loader2 size={15} className="animate-spin" />}
            {loading ? "Creating account…" : "Create account"}
          </button>
        </form>

        {/* Divider + Google */}
        <div className="forge-divider my-6">or continue with</div>
        <button
          type="button"
          disabled={loading}
          className="flex h-[42px] w-full items-center justify-center gap-2.5 rounded-xl border border-border bg-surface text-[13px] font-medium text-fg transition hover:border-primary/60 hover:-translate-y-0.5 disabled:opacity-50"
        >
          <svg width="16" height="16" viewBox="0 0 48 48">
            <path fill="#4285F4" d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 5.1 29.6 3 24 3 12.9 3 4 11.9 4 23s8.9 20 20 20c11 0 19.7-7.7 19.7-20 0-1.3-.1-2.7-.2-3z"/>
            <path fill="#34A853" d="M6.3 14.7l7 5.1C15.1 16.1 19.2 13 24 13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 5.1 29.6 3 24 3 16.3 3 9.7 7.9 6.3 14.7z"/>
            <path fill="#FBBC05" d="M24 43c5.9 0 11-2 14.7-5.3l-6.8-5.6C29.9 33.9 27.1 35 24 35c-6 0-11.1-4-12.9-9.5L4 31c3.4 7 10.3 12 20 12z"/>
            <path fill="#EA4335" d="M44.5 20H24v8.5h11.8c-.9 2.7-2.8 5-5.3 6.5l6.8 5.6C41.2 37.1 44.5 30.6 44.5 23c0-1.3-.1-2-.2-3z"/>
          </svg>
          Continue with Google
        </button>

        <p className="mt-6 text-center text-[13px] text-muted">
          Already have an account?{" "}
          <Link href="/login" className="text-primary hover:underline">
            Sign in →
          </Link>
        </p>
      </div>
    </div>
  );
}
