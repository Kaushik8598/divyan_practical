import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: "#0a0a0f",
        surface: "#11111a",
        primary: {
          DEFAULT: "#00f3ff",
          dark: "#00b8c2",
        },
        textMain: "#e2e8f0",
        textMuted: "#94a3b8",
        borderDark: "#1f2937"
      },
      boxShadow: {
        'neon': '0 0 10px rgba(0, 243, 255, 0.3)',
      }
    },
  },
  plugins: [],
};
export default config;