// Importation des dépendances principales
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { initDataLayer } from "./utils/analytics";

// Prépare window.dataLayer pour les events du chatbot (no-op sans GTM)
initDataLayer();

// Récupération de l'élément racine
const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");

// Initialisation de React et rendu de l'application
createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
