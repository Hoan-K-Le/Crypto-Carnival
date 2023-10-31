import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
     "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js"
  ],
  darkMode: ["class"],
  theme: {
    extend: {
      colors: {
        white100: "#ffffff",
        grey100: "#FCFCFC",
        green200: "#00FC2A",
        slate700: "#2C2F36",
        slate800: "#1F2128",
        slate900: "#191b1f",
        'lightning': "#1e1932",
        carousel: '#7878FA'
      },
      maxWidth: {
        "3.5xl": "52.1875rem",
        "8xl": "118.75rem",
      },
      borderWidth: {
        DEFAULT: '1px',
        '0': '0',
        '2': '2px',
        '3': '3px',
        '4': '4px'
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
};
export default config;
