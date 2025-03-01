import {
  Menu,
  X,
  Sun,
  Moon,
  Home,
  User,
  Briefcase,
  FolderOpen,
  Mail,
  HelpCircle,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import Lottie from "lottie-react";
import thinkingAnimation from "../animations/thinking.json";
import chatbotAnimation from "../animations/chatbot.json";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === "/";
  const { theme, toggleTheme } = useTheme();
  const navigationInProgress = useRef(false);

  // Empêcher le défilement lorsque le menu mobile est ouvert
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
      document.body.classList.add("menu-open");
    } else {
      document.body.style.overflow = "auto";
      document.body.classList.remove("menu-open");
    }
    return () => {
      document.body.style.overflow = "auto";
      document.body.classList.remove("menu-open");
    };
  }, [isMenuOpen]);

  const menuItems = [
    {
      name: "Accueil",
      to: isHomePage ? "#home" : "/",
      icon: <Home className="h-5 w-5" />,
    },
    {
      name: "À propos",
      to: isHomePage ? "#about" : "/#about",
      icon: <User className="h-5 w-5" />,
    },
    {
      name: "Services",
      to: isHomePage ? "#services" : "/#services",
      icon: <Briefcase className="h-5 w-5" />,
    },
    {
      name: "Portfolio",
      to: isHomePage ? "#portfolio" : "/#portfolio",
      icon: <FolderOpen className="h-5 w-5" />,
    },
    {
      name: "Contact",
      to: isHomePage ? "#contact" : "/#contact",
      icon: <Mail className="h-5 w-5" />,
    },
    { name: "FAQ", to: "/faq", icon: <HelpCircle className="h-5 w-5" /> },
  ];

  const handleNavigation = (to: string) => {
    // Fermer le menu mobile
    setIsMenuOpen(false);

    // Éviter les navigations multiples
    if (navigationInProgress.current) return;
    navigationInProgress.current = true;

    console.log("Navigation vers:", to);

    // Délai pour permettre à l'animation de fermeture du menu de se terminer
    setTimeout(() => {
      // Si c'est un lien vers la FAQ
      if (to === "/faq") {
        navigate(to);
        navigationInProgress.current = false;
        return;
      }

      // Si c'est un lien vers la page d'accueil
      if (to === "/") {
        navigate(to);
        navigationInProgress.current = false;
        return;
      }

      // Si c'est un lien avec ancre et que nous sommes sur la page d'accueil
      if (to.startsWith("#") && isHomePage) {
        const element = document.getElementById(to.substring(1));
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
        navigationInProgress.current = false;
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
        }, 300);
        return;
      }

      navigationInProgress.current = false;
    }, 100);
  };

  // Vérifier si un lien est actif
  const isActive = (to: string) => {
    if (to === "/" && isHomePage && !location.hash) {
      return true;
    }
    if (to === "/faq" && location.pathname === "/faq") {
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

  return (
    <>
      <header className="fixed w-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm z-50 shadow-sm transition-colors duration-300">
        <nav className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <div className="h-10 w-10">
                <Lottie animationData={thinkingAnimation} loop={true} />
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                Christophe, développeur web
              </span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.to}
                  className={`text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors ${
                    isActive(item.to)
                      ? "text-blue-600 dark:text-blue-400 font-medium"
                      : ""
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigation(item.to);
                  }}
                >
                  {item.name}
                </Link>
              ))}

              {/* Bouton de basculement de thème */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                aria-label={
                  theme === "light"
                    ? "Activer le mode sombre"
                    : "Activer le mode clair"
                }
              >
                {theme === "light" ? (
                  <Moon className="h-5 w-5" />
                ) : (
                  <Sun className="h-5 w-5" />
                )}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-4">
              {/* Bouton de basculement de thème (mobile) */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                aria-label={
                  theme === "light"
                    ? "Activer le mode sombre"
                    : "Activer le mode clair"
                }
              >
                {theme === "light" ? (
                  <Moon className="h-5 w-5" />
                ) : (
                  <Sun className="h-5 w-5" />
                )}
              </button>

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6 text-gray-600 dark:text-gray-300" />
                ) : (
                  <Menu className="h-6 w-6 text-gray-600 dark:text-gray-300" />
                )}
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Menu mobile séparé complètement du header */}
      {isMenuOpen && (
        <div className="fixed inset-0 w-full h-full bg-white dark:bg-gray-900 z-[100] flex flex-col animate-menuFadeIn">
          {/* Barre supérieure avec bouton de fermeture */}
          <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
            <Link
              to="/"
              className="flex items-center space-x-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="h-10 w-10">
                <Lottie animationData={thinkingAnimation} loop={true} />
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                Christophe, développeur web
              </span>
            </Link>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Contenu du menu */}
          <div className="flex flex-col items-center justify-center flex-grow px-6 py-10 space-y-8 overflow-y-auto">
            {menuItems.map((item, index) => (
              <button
                key={item.name}
                className={`mobile-menu-link text-gray-800 dark:text-gray-100 font-semibold text-xl py-2 px-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all ${
                  isActive(item.to) ? "text-blue-600 dark:text-blue-400" : ""
                }`}
                onClick={() => handleNavigation(item.to)}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center">
                  <span className="mr-2">{item.icon}</span>
                  {item.name}
                </div>
              </button>
            ))}
          </div>

          {/* Animation chatbot en bas du menu */}
          <div className="mt-auto mb-8 w-full max-w-[180px] mx-auto">
            <Lottie animationData={chatbotAnimation} loop={true} />
          </div>
        </div>
      )}
    </>
  );
}
