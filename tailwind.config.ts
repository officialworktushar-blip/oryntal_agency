import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Design tokens — RGB channels so opacity modifiers (bg-brand/20) work
        brand: {
          DEFAULT: "rgb(var(--brand-rgb) / <alpha-value>)",
          hover: "rgb(var(--brand-hover-rgb) / <alpha-value>)",
          dark: "rgb(var(--brand-dark-rgb) / <alpha-value>)",
          soft: "rgb(var(--brand-soft-rgb) / <alpha-value>)",
          wash: "rgb(var(--brand-wash-rgb) / <alpha-value>)",
        },
        ink: "rgb(var(--ink-rgb) / <alpha-value>)",
        muted: "rgb(var(--muted-rgb) / <alpha-value>)",
        line: "rgb(var(--line-rgb) / <alpha-value>)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        container: "80rem", // 1280px = max-w-7xl
      },
      borderRadius: {
        lg: "0.5rem",
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
      boxShadow: {
        card: "0 1px 2px rgba(47, 28, 106, 0.04), 0 12px 28px -14px rgba(47, 28, 106, 0.18)",
        lift: "0 18px 40px -18px rgba(103, 61, 230, 0.42)",
        cta: "0 10px 26px -12px rgba(103, 61, 230, 0.6)",
        pop: "0 24px 60px -24px rgba(47, 28, 106, 0.35)",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(1)", opacity: "0.7" },
          "80%": { transform: "scale(1.55)", opacity: "0" },
          "100%": { transform: "scale(1.55)", opacity: "0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        marquee: "marquee 38s linear infinite",
        "pulse-ring": "pulse-ring 2.2s cubic-bezier(0.2, 0.6, 0.4, 1) infinite",
        float: "float 5s ease-in-out infinite",
        "spin-slow": "spin-slow 18s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
