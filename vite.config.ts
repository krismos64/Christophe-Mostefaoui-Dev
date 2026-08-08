import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

/**
 * Vite ajoute un <link rel="modulepreload"> pour chaque chunk atteignable par
 * import(), y compris ceux qui ne servent qu'au scroll. Le moteur Lottie
 * (~314 Ko) était ainsi téléchargé ET évalué avant le premier rendu, ce qui
 * annulait le bénéfice du chargement différé : 276 ms de CPU pour des
 * animations dont aucune n'est au-dessus de la ligne de flottaison.
 *
 * Ce plugin retire ces préchargements du HTML. Les chunks restent parfaitement
 * atteignables, ils sont simplement récupérés au moment où LazyLottie les
 * demande.
 *
 * Il ne suffit pas à lui seul : le pré-rendu capture le DOM après exécution de
 * React, et Vite réinjecte alors le lien au moment de l'import(). Le même
 * nettoyage est donc refait dans scripts/prerender.mjs. Celui-ci couvre le
 * HTML de base (build:spa, routes non pré-rendues).
 */
const dropLottiePreload = () => ({
  name: "drop-lottie-modulepreload",
  transformIndexHtml(html: string) {
    return html.replace(
      /<link[^>]+rel="modulepreload"[^>]+href="[^"]*(?:index\.es|lottie|thinking|chatbot|Cut%20Video|Drone%20Camera)[^"]*"[^>]*>/g,
      ""
    );
  },
});

export default defineConfig({
  plugins: [react(), dropLottiePreload()],
  base: "/",
  build: {
    outDir: "dist",
    assetsDir: "assets",
    sourcemap: false,
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ["console.log", "console.info"],
      },
    },
    rollupOptions: {
      output: {
        // `lottie-react` est volontairement absent : le nommer ici le forcerait
        // dans un chunk chargé au démarrage, alors qu'il n'est atteint que par
        // des import() différés (voir components/common/LazyLottie.tsx). Rollup
        // lui réserve donc son propre chunk, téléchargé à l'approche du
        // viewport plutôt qu'avant le premier rendu.
        manualChunks: {
          vendor: ["react", "react-dom", "react-router-dom"],
          animations: ["framer-motion"],
          ui: ["lucide-react", "@heroicons/react"],
          helmet: ["react-helmet-async"],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
  server: {
    port: 3000,
    open: true,
    warmup: {
      clientFiles: [
        "./src/App.tsx",
        "./src/main.tsx",
        "./src/components/layout/Header.tsx",
        "./src/components/layout/Footer.tsx",
      ],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  publicDir: "public",
  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "react-router-dom",
      "framer-motion",
      "lottie-react",
    ],
  },
});
