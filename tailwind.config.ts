import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: "#D4AF37",
          light: "#E6C65C",
          muted: "#9A7F28",
          foreground: "#0E0E0E",
        },
        "surface-container-low": "#131313",
        "surface-container-lowest": "#000000",
        "surface-container": "#191a1a",
        "surface-container-high": "#1f2020",
        "surface-container-highest": "#252626",
        "on-surface": "#e7e5e5",
        "on-surface-variant": "#acabaa",
      },
      fontFamily: {
        headline: ["Inter", "sans-serif"],
        body: ["Inter", "sans-serif"],
        label: ["Space Grotesk", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "0px",
        lg: "0px",
        xl: "0px",
        full: "9999px",
      },
    },
  },
  plugins: [],
};

export default config;
