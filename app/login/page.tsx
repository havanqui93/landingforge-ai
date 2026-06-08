"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Zap, Eye, EyeOff, Loader2, AlertCircle } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  function validate() {
    const e: typeof errors = {};
    if (!email.includes("@") || !email.includes("."))
      e.email = "Enter a valid email address";
    if (!password) e.password = "Password is required";
    return e;
  }

  async function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({});
    setLoading(true);
    // Simulate auth (no real backend)
    await new Promise((r) => setTimeout(r, 1200));
    localStorage.setItem("forge_auth", "1");
    setLoading(false);
    router.push("/");
  }

  return (
    <div
      className="forge-dot-grid flex min-h-screen items-center justify-center px-4"
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

        {/* Heading */}
        <h1 className="mt-7 text-center text-[28px] font-bold tracking-[-0.02em] text-fg">
          Welcome back
        </h1>
        <p className="mt-2 text-center text-[14px] text-muted">
          Sign in to generate and manage landing pages.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[12px] font-medium text-muted">
              Email address
            </label>
            <input
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              className={`h-[38px] w-full rounded-xl border bg-surface px-3 text-[14px] text-fg placeholder:text-muted outline-none transition ${
                errors.email
                  ? "border-danger shadow-[0_0_0_3px_rgba(220,38,38,.15)]"
                  : "border-border focus:border-primary focus:shadow-[0_0_0_3px_rgba(99,102,241,.15)]"
              } disabled:opacity-50`}
              placeholder="you@example.com"
            />
            {errors.email && (
              <span className="flex items-center gap-1 text-[12px] text-danger">
                <AlertCircle size={11} /> {errors.email}
              </span>
            )}
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[12px] font-medium text-muted">
              Password
            </label>
            <div className="relative">
              <input
                type={showPw ? "text" : "password"}
                autoComplete="current-password"
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
            {errors.password && (
              <span className="flex items-center gap-1 text-[12px] text-danger">
                <AlertCircle size={11} /> {errors.password}
              </span>
            )}
          </div>

          {/* Forgot password */}
          <div className="flex justify-end">
            <a href="#" className="text-[12px] text-primary hover:underline">
              Forgot password?
            </a>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-primary text-[14px] font-medium text-white shadow-[0_4px_12px_rgba(99,102,241,.25)] transition hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(99,102,241,.35)] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading && <Loader2 size={15} className="animate-spin" />}
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>

        {/* Divider */}
        <div className="forge-divider my-6">or continue with</div>

        {/* Google button */}
        <button
          type="button"
          disabled={loading}
          className="flex h-[42px] w-full items-center justify-center gap-2.5 rounded-xl border border-border bg-surface text-[13px] font-medium text-fg transition hover:border-primary/60 hover:-translate-y-0.5 disabled:opacity-50"
        >
          {/* Google logo */}
          <svg width="16" height="16" viewBox="0 0 48 48">
            <path fill="#4285F4" d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 5.1 29.6 3 24 3 12.9 3 4 11.9 4 23s8.9 20 20 20c11 0 19.7-7.7 19.7-20 0-1.3-.1-2.7-.2-3z"/>
            <path fill="#34A853" d="M6.3 14.7l7 5.1C15.1 16.1 19.2 13 24 13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 5.1 29.6 3 24 3 16.3 3 9.7 7.9 6.3 14.7z"/>
            <path fill="#FBBC05" d="M24 43c5.9 0 11-2 14.7-5.3l-6.8-5.6C29.9 33.9 27.1 35 24 35c-6 0-11.1-4-12.9-9.5L4 31c3.4 7 10.3 12 20 12z"/>
            <path fill="#EA4335" d="M44.5 20H24v8.5h11.8c-.9 2.7-2.8 5-5.3 6.5l6.8 5.6C41.2 37.1 44.5 30.6 44.5 23c0-1.3-.1-2-.2-3z"/>
          </svg>
          Continue with Google
        </button>

        {/* Footer */}
        <p className="mt-6 text-center text-[13px] text-muted">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-primary hover:underline">
            Sign up →
          </Link>
        </p>
      </div>
    </div>
  );
}
