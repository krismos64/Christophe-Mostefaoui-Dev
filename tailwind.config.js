/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    extend: {
      container: {
        center: true,
        padding: "1rem",
      },
      // Charte « Pied des Pyrénées » (refonte du 05/11/2026).
      // Contrastes vérifiés : texte creme sur foret 12:1, texte foret sur soleil 6,9:1.
      colors: {
        foret: {
          DEFAULT: "#12312B",
          profond: "#0B2420",
          moyen: "#24594C",
          clair: "#3E7A68",
          brume: "#C5D3CC",
        },
        soleil: {
          DEFAULT: "#F2A25C",
          clair: "#F7C08E",
        },
        creme: "#F5F1E8",
        neige: "#E8EFEC",
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
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "monospace"],
      },
    },
  },
  plugins: [],
};
