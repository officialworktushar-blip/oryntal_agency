import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary brand color: Oryntal violet (#835FF5) with a lighter
        // gradient companion (#8A66FA) at brand-500.
        brand: {
          DEFAULT: "#835FF5",
          50: "#F5F3FF",
          100: "#EDE9FE",
          200: "#DDD4FD",
          300: "#C5B4FB",
          400: "#A98CF8",
          500: "#8A66FA",
          600: "#835FF5",
          700: "#6E45E0",
          800: "#5B36BC",
          900: "#4A2C99",
          950: "#2E1A66",
        },
        // Light violet/gray page background.
        surface: "#F8F9FE",
        ink: "#1A1033",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(26, 16, 51, 0.04), 0 12px 32px -12px rgba(76, 29, 149, 0.18)",
        cta: "0 10px 30px -10px rgba(76, 29, 149, 0.55)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
