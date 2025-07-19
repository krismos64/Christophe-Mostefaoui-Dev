import { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const useNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const navigationInProgress = useRef(false);
  const isHomePage = location.pathname === "/";

  const handleNavigation = (to: string, onComplete?: () => void) => {
    // Éviter les navigations multiples
    if (navigationInProgress.current) return;
    navigationInProgress.current = true;

    // Délai pour permettre aux animations de se terminer
    setTimeout(() => {
      // Si c'est un lien vers une page (FAQ, mentions légales, etc.)
      if (!to.includes("#")) {
        navigate(to);
        navigationInProgress.current = false;
        onComplete?.();
        return;
      }

      // Si c'est un lien avec ancre et que nous sommes sur la page d'accueil
      if (to.startsWith("#") && isHomePage) {
        const element = document.getElementById(to.substring(1));
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
        navigationInProgress.current = false;
        onComplete?.();
        return;
      }

      // Si c'est un lien avec ancre mais que nous ne sommes pas sur la page d'accueil
      if (to.includes("#") && !isHomePage) {
        navigate("/");
        // On attend que la navigation soit terminée avant de scroller
        setTimeout(() => {
          const anchorId = to.split("#")[1];
          const element = document.getElementById(anchorId);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
          navigationInProgress.current = false;
          onComplete?.();
        }, 300);
        return;
      }

      navigationInProgress.current = false;
      onComplete?.();
    }, 100);
  };

  const isActive = (to: string) => {
    if (to === "/" && isHomePage && !location.hash) {
      return true;
    }
    if (!to.includes("#") && location.pathname === to) {
      return true;
    }
    if (to.startsWith("#") && location.hash === to) {
      return true;
    }
    if (
      to.includes("#") &&
      !to.startsWith("#") &&
      location.pathname + location.hash === to
    ) {
      return true;
    }
    return false;
  };

  return {
    handleNavigation,
    isActive,
    isHomePage,
    currentPath: location.pathname,
    currentHash: location.hash
  };
};