// Importation des dépendances principales
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Récupération de l'élément racine
const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");

// Initialisation de React et rendu de l'application
createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
