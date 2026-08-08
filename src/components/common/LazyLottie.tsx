import { Suspense, lazy, useEffect, useRef, useState } from "react";

/**
 * Lottie chargé à la demande.
 *
 * Pourquoi : `lottie-react` embarque `lottie-web`, et les JSON d'animation du
 * site pèsent 462 Ko à eux seuls. Importés statiquement, moteur et JSON étaient
 * téléchargés ET parsés avant que le hero puisse s'afficher : 732 ms de CPU sur
 * le chemin critique pour des animations dont aucune n'est au-dessus de la
 * ligne de flottaison (mesuré le 12/08/2026, LCP à 5,0 s dont 4,4 s de render
 * delay).
 *
 * Ici, le moteur et le JSON ne sont récupérés qu'à l'approche du viewport, via
 * un IntersectionObserver avec une marge d'anticipation : l'animation est prête
 * avant que le visiteur n'arrive dessus.
 *
 * Le conteneur porte des dimensions fixes et réserve la place AVANT le
 * chargement, sinon l'insertion du SVG décalerait la mise en page (le CLS du
 * site est à 0, il doit le rester).
 */

const LottiePlayer = lazy(() => import("lottie-react"));

type LottieJson = Record<string, unknown>;

interface LazyLottieProps {
  /** Import dynamique du JSON, ex. () => import("../../animations/thinking.json") */
  load: () => Promise<{ default: LottieJson }>;
  /** Classes du conteneur. Doivent fixer la taille pour préserver le CLS. */
  className?: string;
  /**
   * Marge d'anticipation de l'IntersectionObserver. Par défaut 200px : le
   * chargement démarre avant que l'animation n'entre réellement à l'écran.
   */
  rootMargin?: string;
  /**
   * Pour les éléments déjà visibles au chargement (bouton flottant du chatbot,
   * menu mobile) : on n'attend pas le scroll, mais on attend quand même que le
   * navigateur soit inactif. Sans cela, le moteur Lottie repartait dans le
   * chemin critique et retardait l'affichage du hero.
   */
  eager?: boolean;
}

export default function LazyLottie({
  load,
  className,
  rootMargin = "200px",
  eager = false,
}: LazyLottieProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [animationData, setAnimationData] = useState<LottieJson | null>(null);

  useEffect(() => {
    // Chargé une seule fois : dès que les données sont là, plus rien à observer.
    if (animationData) return;

    let cancelled = false;
    const fetchAnimation = () => {
      load().then((mod) => {
        if (!cancelled) setAnimationData(mod.default);
      });
    };

    // `eager` ne veut pas dire « tout de suite » : on laisse le navigateur
    // finir le rendu initial, puis on charge pendant un moment d'inactivité.
    // L'animation apparaît une fraction de seconde après le reste, ce qui est
    // invisible à l'usage et sort le moteur du chemin critique.
    if (eager) {
      const idle =
        typeof requestIdleCallback === "function"
          ? requestIdleCallback(fetchAnimation, { timeout: 3000 })
          : (setTimeout(fetchAnimation, 1200) as unknown as number);
      return () => {
        cancelled = true;
        if (typeof cancelIdleCallback === "function") cancelIdleCallback(idle);
        else clearTimeout(idle);
      };
    }

    const el = containerRef.current;
    // Sans IntersectionObserver (navigateur ancien), on charge directement
    // plutôt que de ne jamais afficher l'animation.
    if (!el || typeof IntersectionObserver === "undefined") {
      fetchAnimation();
      return () => {
        cancelled = true;
      };
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          observer.disconnect();
          fetchAnimation();
        }
      },
      { rootMargin }
    );
    observer.observe(el);

    return () => {
      cancelled = true;
      observer.disconnect();
    };
  }, [animationData, eager, load, rootMargin]);

  return (
    <div ref={containerRef} className={className} aria-hidden="true">
      {animationData && (
        <Suspense fallback={null}>
          <LottiePlayer animationData={animationData} loop />
        </Suspense>
      )}
    </div>
  );
}
