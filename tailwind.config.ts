import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        glass: "rgba(255,255,255,0.05)",
        "glass-border": "rgba(255,255,255,0.1)",
        accent: "#e53935",
        "accent-hover": "#ff5252",
        surface: "#0f0f0f",
        "surface-2": "#1a1a1a",
        "surface-3": "#242424",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        ethiopic: ["var(--font-noto-ethiopic)", "serif"],
      },
      backdropBlur: {
        glass: "12px",
      },
      boxShadow: {
        glass: "0 4px 32px rgba(0,0,0,0.4), inset 0 0 0 1px rgba(255,255,255,0.08)",
        card: "0 2px 20px rgba(0,0,0,0.5)",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        fadeIn: {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        shimmer: "shimmer 1.6s infinite linear",
        fadeIn: "fadeIn 0.3s ease forwards",
      },
    },
  },
  plugins: [],
};

export default config;
