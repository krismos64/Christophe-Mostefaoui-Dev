import { useMemo } from "react";
import { generateFinalStructuredData } from "../utils/structured-data-final";
import { generateVideoStructuredData } from "../utils/video-seo-optimization";
import { generateLocationStructuredData } from "../utils/seo-location-data";
import { generateLocalSEOSchema } from "../utils/local-seo-schema";
import { generateViralVideoSEO } from "../utils/viral-video-seo";

/**
 * Hook personnalisé pour générer et mémoriser toutes les données structurées SEO
 * Optimisé avec useMemo pour éviter les recalculs inutiles
 * @returns Objet contenant toutes les données structurées organisées par type
 */
export function useStructuredData() {
  const structuredData = useMemo(() => {
    return {
      final: generateFinalStructuredData(),
      video: generateVideoStructuredData(),
      location: generateLocationStructuredData(),
      localSEO: generateLocalSEOSchema(),
      viralVideo: generateViralVideoSEO(),
    };
  }, []);

  return structuredData;
}
