import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./landings/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Driven by per-landing CSS variables (see ThemeProvider + globals.css).
        primary: "rgb(var(--lf-primary) / <alpha-value>)",
        "primary-fg": "rgb(var(--lf-primary-fg) / <alpha-value>)",
        bg: "rgb(var(--lf-bg) / <alpha-value>)",
        surface: "rgb(var(--lf-surface) / <alpha-value>)",
        fg: "rgb(var(--lf-fg) / <alpha-value>)",
        muted: "rgb(var(--lf-muted) / <alpha-value>)",
        border: "rgb(var(--lf-border) / <alpha-value>)",
        // Forge semantic colors (fixed, not per-landing)
        success: "#059669",
        warning: "#D97706",
        danger: "#DC2626",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "var(--lf-font)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "monospace"],
      },
      borderRadius: {
        xl: "var(--lf-radius)",
        "2xl": "calc(var(--lf-radius) * 1.5)",
      },
      maxWidth: {
        content: "72rem",
      },
      transitionTimingFunction: {
        expo: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        "toast-in": {
          from: { opacity: "0", transform: "translateX(20px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        "page-in": {
          from: { opacity: "0", transform: "translateY(6px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-400px 0" },
          "100%": { backgroundPosition: "400px 0" },
        },
        "spin-slow": {
          to: { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "toast-in": "toast-in 0.3s cubic-bezier(0.22,1,0.36,1) both",
        "page-in": "page-in 0.25s ease-out both",
        shimmer: "shimmer 1.5s infinite linear",
        "spin-slow": "spin-slow 0.6s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
