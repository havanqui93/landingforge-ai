"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  Zap,
  ChevronDown,
  ExternalLink,
  LayoutGrid,
  FileText,
  Settings,
  LogOut,
  X,
  Menu,
} from "lucide-react";

// Simulate logged-in state via localStorage (no real auth)
function useAuth() {
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    setLoggedIn(localStorage.getItem("forge_auth") === "1");
  }, []);
  return {
    loggedIn,
    signOut: () => {
      localStorage.removeItem("forge_auth");
      setLoggedIn(false);
    },
  };
}

export function HomeNav() {
  const { loggedIn, signOut } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <>
      <nav
        className="sticky top-0 z-[100] h-16 border-b border-border"
        style={{ background: "rgba(8,8,20,.85)", backdropFilter: "blur(16px)" }}
      >
        <div className="mx-auto flex h-full max-w-[1152px] items-center gap-8 px-6">
          {/* Wordmark */}
          <Link
            href="/"
            className="flex flex-shrink-0 items-center gap-1.5 text-[16px] font-bold tracking-tight"
          >
            <Zap size={18} className="text-primary" fill="currentColor" />
            <span className="text-fg">Landing</span>
            <span className="text-primary">Forge</span>
          </Link>

          {/* Center links — desktop */}
          <div className="hidden flex-1 items-center justify-center gap-0.5 md:flex">
            {["Gallery", "Docs", "Pricing"].map((label) => (
              <a
                key={label}
                href={label === "Gallery" ? "#gallery" : "#"}
                className="rounded-lg px-3 py-1.5 text-[14px] text-muted transition hover:bg-white/[0.04] hover:text-fg"
              >
                {label}
              </a>
            ))}
          </div>

          {/* Right actions — desktop */}
          <div className="hidden flex-shrink-0 items-center gap-2 md:flex">
            {loggedIn ? (
              <>
                <Link
                  href="/admin/generate"
                  className="flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-[13px] font-medium text-white shadow-[0_4px_12px_rgba(99,102,241,.25)] transition hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(99,102,241,.35)]"
                >
                  New page
                </Link>
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center gap-1.5 rounded-xl px-2 py-1 text-muted transition hover:text-fg"
                  >
                    <div
                      className="flex h-8 w-8 items-center justify-center rounded-full text-[11px] font-bold text-primary"
                      style={{
                        background: "rgba(99,102,241,.18)",
                        border: "1px solid rgba(99,102,241,.3)",
                      }}
                    >
                      A
                    </div>
                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-150 ${dropdownOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  {dropdownOpen && (
                    <div
                      className="absolute right-0 top-[calc(100%+8px)] z-[200] min-w-[168px] overflow-hidden rounded-xl border border-border bg-surface shadow-[0_8px_32px_rgba(0,0,0,.5)]"
                      style={{ animation: "forge-card-in .15s ease both" }}
                    >
                      <Link
                        href="/"
                        className="flex items-center gap-2 px-3.5 py-2.5 text-[13px] text-fg transition hover:bg-primary/[0.08]"
                        onClick={() => setDropdownOpen(false)}
                      >
                        <ExternalLink size={13} className="text-muted" /> My Pages
                      </Link>
                      <Link
                        href="/admin"
                        className="flex items-center gap-2 px-3.5 py-2.5 text-[13px] text-fg transition hover:bg-primary/[0.08]"
                        onClick={() => setDropdownOpen(false)}
                      >
                        <LayoutGrid size={13} className="text-muted" /> Admin
                      </Link>
                      <Link
                        href="/admin/settings"
                        className="flex items-center gap-2 px-3.5 py-2.5 text-[13px] text-fg transition hover:bg-primary/[0.08]"
                        onClick={() => setDropdownOpen(false)}
                      >
                        <Settings size={13} className="text-muted" /> Settings
                      </Link>
                      <div className="my-1 h-px bg-border" />
                      <button
                        onClick={() => { signOut(); setDropdownOpen(false); }}
                        className="flex w-full items-center gap-2 px-3.5 py-2.5 text-[13px] text-danger transition hover:bg-primary/[0.08]"
                      >
                        <LogOut size={13} /> Sign out
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="rounded-xl px-4 py-2 text-[13px] text-fg/80 transition hover:bg-surface/60 hover:text-fg"
                >
                  Sign in
                </Link>
                <Link
                  href="/register"
                  className="flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-[13px] font-medium text-white shadow-[0_4px_12px_rgba(99,102,241,.25)] transition hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(99,102,241,.35)]"
                >
                  Get started
                </Link>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className="ml-auto flex h-8 w-8 items-center justify-center rounded-lg text-muted transition hover:text-fg md:hidden"
            onClick={() => setMobileOpen(true)}
          >
            <Menu size={18} />
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[200] flex flex-col bg-bg">
          <div className="flex h-16 items-center justify-between border-b border-border px-6">
            <Link
              href="/"
              className="flex items-center gap-1.5 text-[16px] font-bold tracking-tight"
              onClick={() => setMobileOpen(false)}
            >
              <Zap size={18} className="text-primary" fill="currentColor" />
              <span className="text-fg">Landing</span>
              <span className="text-primary">Forge</span>
            </Link>
            <button
              className="rounded-lg p-1.5 text-muted hover:text-fg"
              onClick={() => setMobileOpen(false)}
            >
              <X size={18} />
            </button>
          </div>
          <nav className="flex flex-col gap-1 p-4">
            {["Gallery", "Docs", "Pricing"].map((label) => (
              <a
                key={label}
                href={label === "Gallery" ? "#gallery" : "#"}
                className="rounded-xl px-4 py-3 text-[15px] text-fg transition hover:bg-surface"
                onClick={() => setMobileOpen(false)}
              >
                {label}
              </a>
            ))}
            <div className="my-2 h-px bg-border" />
            {loggedIn ? (
              <>
                <Link
                  href="/admin/generate"
                  className="rounded-xl bg-primary px-4 py-3 text-center text-[15px] font-medium text-white"
                  onClick={() => setMobileOpen(false)}
                >
                  New page
                </Link>
                <button
                  onClick={() => { signOut(); setMobileOpen(false); }}
                  className="rounded-xl px-4 py-3 text-center text-[15px] text-danger"
                >
                  Sign out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="rounded-xl border border-border px-4 py-3 text-center text-[15px] text-fg"
                  onClick={() => setMobileOpen(false)}
                >
                  Sign in
                </Link>
                <Link
                  href="/register"
                  className="rounded-xl bg-primary px-4 py-3 text-center text-[15px] font-medium text-white"
                  onClick={() => setMobileOpen(false)}
                >
                  Get started
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </>
  );
}
