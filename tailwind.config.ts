import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        crimson: {
          light: "#B82236",
          DEFAULT: "#9E1023",
          deep: "#720E1B",
          dark: "#4D0711",
        },
        burgundy: {
          light: "#791524",
          DEFAULT: "#5A0F1A",
          dark: "#30080F",
          night: "#100609",
        },
        cream: {
          light: "#FFF8F2",
          DEFAULT: "#F8E8DC",
          parchment: "#F3DFD0",
          dark: "#E5C8B4",
        },
        rose: {
          soft: "#E8A8B0",
          blush: "#D98A96",
          petal: "#C96373",
        },
        gold: {
          light: "#F0CF8D",
          DEFAULT: "#D7A85C",
          glow: "rgba(215, 168, 92, 0.35)",
          dark: "#B38539",
        },
      },
      fontFamily: {
        display: ["var(--font-playfair)", "Cormorant Garamond", "serif"],
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        script: ["var(--font-great-vibes)", "cursive"],
        sans: ["var(--font-jakarta)", "Inter", "sans-serif"],
      },
      animation: {
        "float-slow": "float 6s ease-in-out infinite",
        "pulse-glow": "pulseGlow 3s ease-in-out infinite",
        "shimmer-gold": "shimmer 2.5s linear infinite",
        "flicker": "candleFlicker 1.8s infinite ease-in-out alternate",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.6", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.05)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        candleFlicker: {
          "0%": { transform: "scale(1) rotate(-1deg)", opacity: "0.9" },
          "25%": { transform: "scale(1.08) rotate(1deg)", opacity: "1" },
          "50%": { transform: "scale(0.95) rotate(-0.5deg)", opacity: "0.85" },
          "75%": { transform: "scale(1.05) rotate(1.5deg)", opacity: "0.95" },
          "100%": { transform: "scale(1) rotate(0deg)", opacity: "1" },
        },
      },
      boxShadow: {
        "rose-glow": "0 0 25px rgba(158, 16, 35, 0.45)",
        "gold-glow": "0 0 25px rgba(215, 168, 92, 0.35)",
        "polaroid": "0 15px 35px -5px rgba(16, 6, 9, 0.35), 0 5px 15px rgba(0, 0, 0, 0.2)",
      },
    },
  },
  plugins: [],
};

export default config;
