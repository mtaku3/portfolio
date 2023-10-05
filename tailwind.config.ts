import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Noto Sans JP", "Noto Color Emoji", "sans-serif"],
      },
      backgroundImage: {
        "noise-white": "url('/noise.light.svg')",
        "noise-dark": "url('/noise.dark.svg')",
      },
      listStyleType: {
        roman: "lower-roman",
        alpha: "lower-alpha",
        circle: "circle",
        square: "square",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
export default config;
