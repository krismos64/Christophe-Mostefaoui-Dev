/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    extend: {
      container: {
        center: true,
        padding: "1rem",
      },
      colors: {
        blue: {
          50: "#f0f9ff",
          100: "#e0f2fe",
          200: "#bae6fd",
          300: "#7dd3fc",
          400: "#38bdf8",
          500: "#0ea5e9",
          600: "#0284c7",
          700: "#0369a1",
          800: "#075985",
          900: "#0c4a6e",
        },
        scrollbar: {
          track: "#f1f1f1",
          thumb: "#0ea5e9",
          "thumb-hover": "#0284c7",
        },
      },
      animation: {
        "menu-open-anim": "menu-open-anim 0.5s ease-out forwards",
        "menu-item-anim": "menu-item-anim 0.5s ease-out forwards",
      },
      keyframes: {
        "menu-open-anim": {
          "0%": {
            transform: "scale(0)",
            "border-radius": "100%",
          },
          "100%": {
            transform: "scale(1)",
            "border-radius": "0",
          },
        },
        "menu-item-anim": {
          "0%": {
            opacity: "0",
            transform: "translateX(30px) skewX(-15deg)",
          },
          "100%": {
            opacity: "1",
            transform: "translateX(0) skewX(0)",
          },
        },
      },
    },
  },
  plugins: [],
};
