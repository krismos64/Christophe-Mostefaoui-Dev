import { motion, AnimatePresence } from "framer-motion";
import Lottie from "lottie-react";
import {
  Brain,
  Briefcase,
  Code2,
  ExternalLink,
  FolderOpen,
  Github,
  HelpCircle,
  Home,
  Linkedin,
  Mail,
  Menu,
  Moon,
  Play,
  Sun,
  User,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import chatbotAnimation from "../../animations/chatbot.json";
import { useTheme } from "../../context/ThemeContext";
import { useNavigation } from "../../hooks/useNavigation";
import { MenuItem } from "../../types/common";

const triggerHapticFeedback = () => {
  if (window.navigator && window.navigator.vibrate) {
    window.navigator.vibrate(5);
  }
};

// Variants pour les animations du menu mobile
const menuOverlayVariants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.3, ease: "easeInOut" as const }
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut" as const }
  }
};

const menuItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.1 + i * 0.08,
      duration: 0.4,
      ease: "easeOut" as const
    }
  }),
  exit: { opacity: 0, y: -10, transition: { duration: 0.2 } }
};

const orbVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: (delay: number) => ({
    scale: 1,
    opacity: 0.6,
    transition: { delay, duration: 0.6, ease: "easeOut" as const }
  })
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
      name: "Présentation",
      to: isHomePage ? "#video-presentation" : "/#video-presentation",
      icon: <Play className="h-5 w-5" />,
    },
    {
      name: "Services",
      to: isHomePage ? "#services" : "/#services",
      icon: <Briefcase className="h-5 w-5" />,
    },
    {
      name: "Solutions IA",
      to: isHomePage ? "#ai-integration" : "/#ai-integration",
      icon: <Brain className="h-5 w-5" />,
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

  const handleMenuNavigation = (to: string) => {
    setIsMenuOpen(false);
    handleNavigation(to);
  };

  return (
    <>
      <header className="fixed w-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm z-50 shadow-sm transition-colors duration-300">
        <div className="accent-line-rgb"></div>
        <nav className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <div className="h-12 w-12 rounded-full overflow-hidden">
                <video
                  src="/assets/videos/animation-chris-dev.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                  aria-label="Animation Christophe développeur"
                />
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                Christophe, <span className="rgb-text">développeur web</span>
              </span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
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

              {/* Lien externe vers portfolio technique */}
              <a
                href="https://krismos.fr/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium text-purple-600 dark:text-purple-300 bg-purple-50 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-700/50 hover:bg-purple-100 dark:hover:bg-purple-900/50 hover:border-purple-400 dark:hover:border-purple-500 transition-colors"
                aria-label="Mon portfolio technique sur krismos.fr (nouvel onglet)"
              >
                <Code2 className="h-4 w-4" aria-hidden="true" />
                <span>Portfolio tech</span>
                <ExternalLink className="h-3 w-3 opacity-70" aria-hidden="true" />
              </a>

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

              <motion.button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                whileTap={{ scale: 0.95 }}
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6 text-gray-600 dark:text-gray-300" />
                ) : (
                  <Menu className="h-6 w-6 text-gray-600 dark:text-gray-300" />
                )}
              </motion.button>
            </div>
          </div>
        </nav>
      </header>

      {/* Menu mobile futuriste */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 w-full h-full z-[100] overflow-hidden"
            variants={menuOverlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {/* Background avec glassmorphism */}
            <div className="absolute inset-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl" />

            {/* Orbes flottants animés */}
            <motion.div
              className="absolute w-72 h-72 rounded-full glowing-orb-cyan blur-3xl"
              style={{ left: "5%", top: "10%" }}
              variants={orbVariants}
              custom={0.2}
              initial="hidden"
              animate="visible"
            />
            <motion.div
              className="absolute w-64 h-64 rounded-full glowing-orb-purple blur-3xl"
              style={{ right: "5%", top: "40%" }}
              variants={orbVariants}
              custom={0.4}
              initial="hidden"
              animate="visible"
            />
            <motion.div
              className="absolute w-56 h-56 rounded-full glowing-orb-pink blur-3xl"
              style={{ left: "30%", bottom: "15%" }}
              variants={orbVariants}
              custom={0.6}
              initial="hidden"
              animate="visible"
            />

            {/* Formes géométriques flottantes */}
            <motion.div
              className="absolute w-12 h-12 border-2 border-cyan-500/30 dark:border-cyan-400/30"
              style={{
                left: "10%",
                top: "25%",
                clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)"
              }}
              animate={{
                y: [0, -15, 0],
                rotate: [0, 180, 360],
                opacity: [0.3, 0.6, 0.3]
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute w-10 h-10 border-2 border-purple-500/30 dark:border-purple-400/30 rounded-full"
              style={{ right: "15%", top: "20%" }}
              animate={{
                y: [0, 20, 0],
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            />
            <motion.div
              className="absolute w-8 h-8 border-2 border-pink-500/30 dark:border-pink-400/30 rotate-45"
              style={{ right: "20%", bottom: "30%" }}
              animate={{
                y: [0, -10, 0],
                rotate: [45, 135, 45],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            />

            {/* Lignes de code décoratives */}
            <motion.div
              className="absolute h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent"
              style={{ width: "40%", left: "5%", top: "35%" }}
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            />
            <motion.div
              className="absolute h-px bg-gradient-to-r from-transparent via-purple-500/40 to-transparent"
              style={{ width: "35%", right: "10%", bottom: "40%" }}
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            />

            {/* Animation Lottie en haut à gauche */}
            <motion.div
              className="absolute top-6 left-6 w-16 sm:w-20 z-10"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              <Lottie animationData={chatbotAnimation} loop={true} />
            </motion.div>

            {/* Bouton de fermeture */}
            <motion.button
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-6 right-6 p-3 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-md text-gray-600 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-700 transition-colors shadow-lg border border-gray-200/50 dark:border-gray-700/50 z-20"
              aria-label="Fermer le menu"
              initial={{ opacity: 0, scale: 0.5, rotate: -90 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.5, rotate: 90 }}
              transition={{ delay: 0.2, duration: 0.3 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <X className="h-7 w-7" />
            </motion.button>

            {/* Contenu du menu */}
            <div className="relative h-full w-full flex flex-col items-center justify-center z-10">
              <motion.div
                className="flex-1 flex items-center justify-center w-full overflow-hidden"
                drag="y"
                dragConstraints={{ top: -80, bottom: 80 }}
                dragTransition={{ bounceStiffness: 400, bounceDamping: 20 }}
                dragElastic={0.15}
                onDragStart={triggerHapticFeedback}
              >
                <nav className="flex flex-col items-center justify-center text-center py-8">
                  {menuItems.map((item, index) => (
                    <motion.div
                      key={item.name}
                      custom={index}
                      variants={menuItemVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      <motion.a
                        href={item.to}
                        className={`flex items-center gap-3 text-xl sm:text-2xl font-semibold my-1.5 sm:my-2 px-5 py-1.5 rounded-xl transition-all duration-300 ${
                          isActive(item.to)
                            ? "text-blue-600 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-900/20"
                            : "text-gray-800 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100/50 dark:hover:bg-gray-800/50"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          handleMenuNavigation(item.to);
                        }}
                        whileHover={{ scale: 1.05, x: 10 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span className={`p-2 rounded-lg ${
                          isActive(item.to)
                            ? "bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400"
                            : "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400"
                        }`}>
                          {item.icon}
                        </span>
                        <span>{item.name}</span>
                      </motion.a>
                    </motion.div>
                  ))}

                  {/* Lien externe Portfolio technique */}
                  <motion.div
                    custom={menuItems.length}
                    variants={menuItemVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <motion.a
                      href="https://krismos.fr/"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center gap-3 text-xl sm:text-2xl font-semibold my-1.5 sm:my-2 px-5 py-1.5 rounded-xl transition-all duration-300 text-purple-600 dark:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-900/30"
                      whileHover={{ scale: 1.05, x: 10 }}
                      whileTap={{ scale: 0.98 }}
                      aria-label="Mon portfolio technique sur krismos.fr (nouvel onglet)"
                    >
                      <span className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400">
                        <Code2 className="h-5 w-5" />
                      </span>
                      <span>Portfolio tech</span>
                      <ExternalLink className="h-4 w-4 opacity-70" aria-hidden="true" />
                    </motion.a>
                  </motion.div>
                </nav>
              </motion.div>

              {/* Liens sociaux */}
              <motion.div
                className="absolute bottom-12 flex items-center gap-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.4 }}
              >
                <motion.a
                  href="https://www.linkedin.com/in/christophemostefaoui/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Profil LinkedIn"
                  className="p-3 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-md text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors shadow-md border border-gray-200/50 dark:border-gray-700/50"
                  whileHover={{ scale: 1.15, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Linkedin className="h-6 w-6" />
                </motion.a>
                <motion.a
                  href="https://github.com/krismos64"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Profil GitHub"
                  className="p-3 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-md text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors shadow-md border border-gray-200/50 dark:border-gray-700/50"
                  whileHover={{ scale: 1.15, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Github className="h-6 w-6" />
                </motion.a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
