import { useEffect, type RefObject } from "react";

/**
 * Met en pause les animations d'une scène SVG quand elle sort de l'écran
 * (attribut data-pause lu par index.css pour les animations CSS, et
 * pauseAnimations() pour les animations SVG natives <animateMotion>).
 * Coupe aussi les animations SVG natives si l'utilisateur a demandé de
 * réduire les animations : la media query CSS n'a aucun effet sur elles.
 */
export function usePauseHorsEcran(ref: RefObject<SVGSVGElement>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduit = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduit) {
      el.pauseAnimations?.();
      el.setCurrentTime?.(1.5);
      return;
    }
    if (!("IntersectionObserver" in window)) return;
    const obs = new IntersectionObserver(([e]) => {
      el.toggleAttribute("data-pause", !e.isIntersecting);
      if (e.isIntersecting) el.unpauseAnimations?.();
      else el.pauseAnimations?.();
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref]);
}
