import type { CSSProperties, ReactNode } from "react";
import type { LandingTheme } from "@/lib/landing.types";

/**
 * Injects a landing's palette as CSS variables on a wrapper element.
 * Every section reads `rgb(var(--lf-*))` via Tailwind tokens, so a landing's
 * entire look is driven by its config — no per-landing CSS files.
 */

function buildVars(theme: LandingTheme): CSSProperties {
  const isDark = theme.mode === "dark";
  const vars: Record<string, string> = {
    "--lf-primary": theme.primary,
    "--lf-primary-fg": theme.primaryFg ?? "255 255 255",
    "--lf-bg": theme.bg,
    "--lf-surface": theme.surface ?? (isDark ? "26 26 44" : "255 255 255"),
    "--lf-fg": theme.fg ?? (isDark ? "237 237 245" : "17 17 27"),
    "--lf-muted": theme.muted ?? (isDark ? "148 148 170" : "90 90 110"),
    "--lf-border": theme.border ?? (isDark ? "42 42 64" : "228 228 238"),
    "--lf-radius": theme.radius ?? "0.85rem",
    "--lf-font": theme.font ?? '"Inter", system-ui, sans-serif',
  };

  return vars as CSSProperties;
}

export function ThemeProvider({
  theme,
  children,
}: {
  theme: LandingTheme;
  children: ReactNode;
}) {
  return (
    <div
      style={buildVars(theme)}
      data-mode={theme.mode}
      className="min-h-screen bg-bg text-fg antialiased"
    >
      {children}
    </div>
  );
}
