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
      },
      fontFamily: {
        sans: ["var(--lf-font)", "system-ui", "sans-serif"],
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
    },
  },
  plugins: [],
};

export default config;
