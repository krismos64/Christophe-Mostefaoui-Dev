import { useMemo } from "react";
import { generateFinalStructuredData } from "../utils/structured-data-final";

/**
 * Hook personnalisé pour générer et mémoriser les données structurées SEO
 * Source unique : structured-data-final.tsx (évite les doublons de schemas)
 */
export function useStructuredData() {
  const structuredData = useMemo(() => {
    return generateFinalStructuredData();
  }, []);

  return structuredData;
}
