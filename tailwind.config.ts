import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#17212b",
        muted: "#5d6875",
        line: "#dfe5ec",
        panel: "#f7f9fb",
        brand: "#0f766e",
        accent: "#b45309"
      },
      boxShadow: {
        soft: "0 12px 30px rgba(23, 33, 43, 0.08)"
      }
    }
  },
  plugins: []
};

export default config;
