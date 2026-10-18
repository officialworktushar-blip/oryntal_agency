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
        // Design tokens (CSS variables so components never hard-code hex)
        brand: {
          DEFAULT: "var(--brand)",
          hover: "var(--brand-hover)",
          dark: "var(--brand-dark)",
          soft: "var(--brand-soft)",
          wash: "var(--brand-wash)",
          50: "var(--brand-wash)",
          100: "var(--brand-soft)",
          200: "#DCD1FD",
          300: "#C4B0FB",
          400: "#A487F6",
          500: "#8560EF",
          600: "var(--brand)",
          700: "var(--brand-hover)",
          800: "#42199F",
          900: "#341480",
          950: "var(--brand-dark)",
        },
        ink: "var(--ink)",
        muted: "var(--muted)",
        line: "var(--line)",
        surface: "var(--surface)",
        success: "var(--success)",
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
      },
      animation: {
        marquee: "marquee 38s linear infinite",
        "pulse-ring": "pulse-ring 2.2s cubic-bezier(0.2, 0.6, 0.4, 1) infinite",
        float: "float 5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
