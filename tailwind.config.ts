import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        brand: {
          purple: "var(--brand-purple)",
          magenta: "var(--brand-magenta)",
          gold: "var(--brand-gold)",
        }
      },
      fontFamily: {
        outfit: ["var(--font-outfit)", "sans-serif"],
        dmsans: ["var(--font-dm-sans)", "sans-serif"],
        ios: ["-apple-system", "BlinkMacSystemFont", "SF Pro Display", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
