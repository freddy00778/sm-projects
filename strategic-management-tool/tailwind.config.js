/** @type {import('tailwindcss').Config} */
import tailwindScrollbar from "tailwind-scrollbar";
import flowbitePlugin from "flowbite/plugin";
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      scrollbar: {
        thin: {
          width: "1px",
          height: "1px",
        },
      },
      fontFamily: {
        poppins: ["Poppins"],
      },
      colors: {
        primary: {
          50: "#F6E6E6",
          100: "#E2B1B0",
          200: "#D58C8A",
          300: "#C15755",
          400: "#B53634",
          500: "#A30401",
          600: "#940401",
          700: "#740301",
          800: "#5A0201",
          900: "#440200",
        },
        secondary: {
          50: "#E7E9EB",
          100: "#B6BBC0",
          200: "#929AA2",
          300: "#616C77",
          400: "#424F5D",
          500: "#132334",
          600: "#11202F",
          700: "#0D1925",
          800: "#0A131D",
          900: "#080F16",
        },
        black: "#929292",
        white: "#FFFFFF",
        border: "#BCBCBC",
        label: "#696969",
        placeholder: "#A3A3A3",
      },
    },
  },
  plugins: [tailwindScrollbar],
};
