import { motion } from "framer-motion";
import Lottie from "lottie-react";
import {
  Briefcase,
  FolderOpen,
  Github,
  HelpCircle,
  Home,
  Linkedin,
  Mail,
  Menu,
  Moon,
  Star,
  Sun,
  User,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import chatbotAnimation from "../../animations/chatbot.json";
import thinkingAnimation from "../../animations/thinking.json";
import { useTheme } from "../../context/ThemeContext";
import { useNavigation } from "../../hooks/useNavigation";
import { MenuItem } from "../../types/common";

const triggerHapticFeedback = () => {
  if (window.navigator && window.navigator.vibrate) {
    window.navigator.vibrate(5); // Vibration courte et subtile
  }
};

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { handleNavigation, isActive, isHomePage } = useNavigation();

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

  const menuItems: MenuItem[] = [
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
      name: "Avis",
      to: isHomePage ? "#testimonials" : "/#testimonials",
      icon: <Star className="h-5 w-5" />,
    },
    {
      name: "Contact",
      to: isHomePage ? "#contact" : "/#contact",
      icon: <Mail className="h-5 w-5" />,
    },
    { name: "FAQ", to: "/faq", icon: <HelpCircle className="h-5 w-5" /> },
  ];

  const handleMenuNavigation = (to: string) => {
    // Fermer le menu mobile
    setIsMenuOpen(false);
    // Utiliser le hook de navigation
    handleNavigation(to);
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
                    handleMenuNavigation(item.to);
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
        <div
          className="fixed inset-0 w-full h-full bg-gradient-to-br from-white to-gray-100 dark:from-gray-900 dark:to-black z-[100] flex flex-col items-center justify-center origin-top-right animate-menu-open-anim"
          style={{ transformOrigin: "top right" }}
        >
          {/* Bouton de fermeture à l'intérieur du menu */}
          <button
            onClick={() => setIsMenuOpen(false)}
            className="absolute top-6 right-6 p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label="Fermer le menu"
          >
            <X className="h-8 w-8" />
          </button>

          <div className="relative h-[60vh] w-full flex items-center justify-center overflow-hidden">
            <motion.div
              className="absolute"
              drag="y"
              dragConstraints={{ top: -80, bottom: 80 }}
              dragTransition={{ bounceStiffness: 400, bounceDamping: 20 }}
              dragElastic={0.15}
              onDragStart={triggerHapticFeedback}
            >
              <nav className="flex flex-col items-center justify-center text-center">
                {menuItems.map((item, index) => (
                  <div
                    key={item.name}
                    className="animate-menu-item-anim"
                    style={{ animationDelay: `${150 + index * 100}ms` }}
                  >
                    <a
                      href={item.to}
                      className={`text-3xl font-semibold my-4 p-2 text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300 relative group ${
                        isActive(item.to)
                          ? "text-blue-600 dark:text-blue-400"
                          : ""
                      }`}
                      onClick={(e) => {
                        e.preventDefault();
                        handleMenuNavigation(item.to);
                      }}
                    >
                      {item.name}
                      <span
                        className={`absolute bottom-0 left-1/2 w-0 h-0.5 bg-blue-600 dark:bg-blue-400 transition-all duration-300 group-hover:w-full group-hover:left-0 drop-shadow-[0_0_8px_rgba(59,130,246,0.5)] ${
                          isActive(item.to) ? "w-full left-0" : ""
                        }`}
                      ></span>
                    </a>
                  </div>
                ))}
              </nav>
            </motion.div>
          </div>

          <div
            className="absolute bottom-24 w-full max-w-[180px] mx-auto animate-menu-item-anim"
            style={{ animationDelay: `${150 + menuItems.length * 100}ms` }}
          >
            <Lottie animationData={chatbotAnimation} loop={true} />
          </div>

          <div
            className="absolute bottom-10 flex space-x-6 animate-menu-item-anim"
            style={{ animationDelay: `${250 + menuItems.length * 100}ms` }}
          >
            <a
              href="https://www.linkedin.com/in/christophemostefaoui/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Profil LinkedIn"
              className="text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <Linkedin className="h-6 w-6" />
            </a>
            <a
              href="https://github.com/krismos64"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Profil GitHub"
              className="text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <Github className="h-6 w-6" />
            </a>
          </div>
        </div>
      )}
    </>
  );
}
