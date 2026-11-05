import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Remet la page en haut à chaque changement de page.
 * Sans lui, React Router garde la position de défilement : un clic sur
 * « Voir le détail des services » en bas de la home ouvrait /services
 * au milieu de son contenu. Les liens avec ancre (/#faq) sont laissés à
 * useNavigation, qui fait défiler jusqu'à la section visée.
 */
export default function RemiseEnHaut() {
  const { pathname, hash } = useLocation();

  useLayoutEffect(() => {
    if (hash) return;
    // "instant" : le scroll-behavior: smooth global ferait sinon défiler toute la page
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return null;
}
