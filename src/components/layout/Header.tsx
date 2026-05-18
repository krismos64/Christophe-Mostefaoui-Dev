import { AnimatePresence, motion } from "framer-motion";
import Lottie from "lottie-react";
import {
  ArrowUpRight,
  Briefcase,
  ExternalLink,
  FolderOpen,
  Github,
  HelpCircle,
  Linkedin,
  Mail,
  Menu,
  Moon,
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

const overlayVariants = {
  hidden: {
    opacity: 0,
    transition: { duration: 0.3, ease: "easeInOut" as const },
  },
  visible: {
    opacity: 1,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.15 + i * 0.06,
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  }),
  exit: { opacity: 0, y: -8, transition: { duration: 0.2 } },
};

// Chiffres romains pour numérotation édito
const toRoman = (n: number) => {
  const map: [number, string][] = [
    [10, "X"],
    [9, "IX"],
    [5, "V"],
    [4, "IV"],
    [1, "I"],
  ];
  let result = "";
  for (const [value, numeral] of map) {
    while (n >= value) {
      result += numeral;
      n -= value;
    }
  }
  return result;
};

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { handleNavigation, isActive, isHomePage } = useNavigation();

  // Détection scroll pour passer en mode opaque
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
    {
      name: "FAQ",
      to: isHomePage ? "#faq" : "/#faq",
      icon: <HelpCircle className="h-5 w-5" />,
    },
  ];

  const handleMenuNavigation = (to: string) => {
    setIsMenuOpen(false);
    handleNavigation(to);
  };

  // Classes adaptatives selon état (transparent sur Hero / opaque après scroll)
  const headerBg = isScrolled
    ? "bg-[#F4EFE6]/95 dark:bg-[#13110F]/95 backdrop-blur-md border-b border-[#1A1715]/10 dark:border-[#F4EFE6]/10"
    : "bg-transparent border-b border-transparent";

  const textColor = isScrolled
    ? "text-[#1A1715] dark:text-[#F4EFE6]"
    : "text-[#F4EFE6]";

  const textColorMuted = isScrolled
    ? "text-[#1A1715]/70 dark:text-[#F4EFE6]/75"
    : "text-[#F4EFE6]/85";

  return (
    <>
      <header
        className={`fixed w-full z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ${headerBg}`}
      >
        <nav className="container mx-auto px-4 sm:px-6 lg:px-10 py-3 sm:py-4">
          <div className="flex items-center justify-between gap-3">
            {/* Logo : vidéo ronde + nom Fraunces italique */}
            <Link
              to="/"
              className="flex items-center gap-3 min-w-0 flex-shrink"
              onClick={(e) => {
                if (isHomePage) {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
            >
              <div className="h-10 w-10 sm:h-11 sm:w-11 rounded-full overflow-hidden flex-shrink-0 ring-1 ring-[#F4D35E]/30">
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
              <span
                className={`hero-body text-[15px] sm:text-base lg:text-[17px] font-medium whitespace-nowrap transition-colors ${textColor}`}
              >
                Christophe,{" "}
                <span
                  className="hero-display-inline italic"
                  style={{
                    fontFamily: '"Fraunces", "Times New Roman", serif',
                    fontStyle: "italic",
                    fontWeight: 500,
                  }}
                >
                  développeur web
                </span>
              </span>
            </Link>

            {/* Menu desktop (lg+) */}
            <div className="hidden lg:flex items-center gap-6 xl:gap-7">
              <ul className="flex items-center gap-5 xl:gap-6">
                {menuItems.map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.to}
                      className={`nav-link hero-body text-[14px] tracking-[-0.01em] whitespace-nowrap ${
                        isActive(item.to)
                          ? `${textColor} nav-link-active`
                          : `${textColorMuted} hover:text-[#F4D35E]`
                      }`}
                      onClick={(e) => {
                        e.preventDefault();
                        handleMenuNavigation(item.to);
                      }}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Lien externe krismos.fr */}
              <a
                href="https://krismos.fr/"
                target="_blank"
                rel="noopener noreferrer"
                className={`hero-body group inline-flex items-center gap-1 text-[13px] ${textColorMuted} hover:text-[#F4D35E] transition-colors whitespace-nowrap`}
                aria-label="Mon portfolio technique sur krismos.fr (nouvel onglet)"
              >
                <span className="border-b border-current/40 pb-0.5 group-hover:border-[#F4D35E]">
                  krismos.fr
                </span>
                <ArrowUpRight
                  className="h-3.5 w-3.5 opacity-70 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </a>

              {/* Toggle theme */}
              <button
                onClick={toggleTheme}
                className={`p-1.5 transition-colors hover:text-[#F4D35E] ${textColor}`}
                aria-label={
                  theme === "light"
                    ? "Activer le mode sombre"
                    : "Activer le mode clair"
                }
              >
                {theme === "light" ? (
                  <Moon className="h-[18px] w-[18px]" />
                ) : (
                  <Sun className="h-[18px] w-[18px]" />
                )}
              </button>

              {/* CTA Devis */}
              <button
                onClick={() =>
                  handleMenuNavigation(isHomePage ? "#contact" : "/#contact")
                }
                className="hero-cta-nav group inline-flex items-center gap-1.5"
                aria-label="Demander un devis"
              >
                <span
                  style={{
                    fontFamily: '"Fraunces", serif',
                    fontStyle: "italic",
                    fontWeight: 500,
                  }}
                  className="text-[15px]"
                >
                  Devis
                </span>
                <ArrowUpRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </button>
            </div>

            {/* Mobile/tablette : toggle + burger */}
            <div className="lg:hidden flex items-center gap-2 sm:gap-3 flex-shrink-0">
              <button
                onClick={toggleTheme}
                className={`p-1.5 transition-colors hover:text-[#F4D35E] ${textColor}`}
                aria-label={
                  theme === "light"
                    ? "Activer le mode sombre"
                    : "Activer le mode clair"
                }
              >
                {theme === "light" ? (
                  <Moon className="h-[18px] w-[18px]" />
                ) : (
                  <Sun className="h-[18px] w-[18px]" />
                )}
              </button>

              <motion.button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`p-1.5 transition-colors hover:text-[#F4D35E] ${textColor}`}
                whileTap={{ scale: 0.94 }}
                aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
                aria-expanded={isMenuOpen}
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </motion.button>
            </div>
          </div>
        </nav>
      </header>

      {/* Menu mobile éditorial */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 w-full h-full z-[100] overflow-hidden bg-[#0B0805]"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {/* Texture grain papier subtile (SVG noise) */}
            <div
              className="absolute inset-0 opacity-[0.06] mix-blend-overlay pointer-events-none"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
              }}
              aria-hidden="true"
            />

            {/* Animation Lottie chatbot — conservée en haut à gauche */}
            <motion.div
              className="absolute top-5 left-5 sm:top-6 sm:left-6 w-16 sm:w-20 z-10"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <Lottie animationData={chatbotAnimation} loop={true} />
            </motion.div>

            {/* Bouton fermer */}
            <motion.button
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-6 right-5 sm:top-7 sm:right-7 z-20 p-2 text-[#F4EFE6] hover:text-[#F4D35E] transition-colors"
              aria-label="Fermer le menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.15, duration: 0.3 }}
              whileTap={{ scale: 0.92 }}
            >
              <X className="h-7 w-7" strokeWidth={1.5} />
            </motion.button>

            {/* Contenu */}
            <div className="relative h-full w-full flex flex-col z-10 px-7 sm:px-10 pt-28 sm:pt-32 pb-10 overflow-y-auto">
              <motion.nav
                className="flex-1 flex flex-col justify-center w-full max-w-xl"
                drag="y"
                dragConstraints={{ top: -40, bottom: 40 }}
                dragTransition={{ bounceStiffness: 400, bounceDamping: 22 }}
                dragElastic={0.1}
                onDragStart={triggerHapticFeedback}
              >
                <ul className="flex flex-col gap-1">
                  {menuItems.map((item, index) => (
                    <motion.li
                      key={item.name}
                      custom={index}
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      <a
                        href={item.to}
                        onClick={(e) => {
                          e.preventDefault();
                          handleMenuNavigation(item.to);
                        }}
                        className={`group flex items-baseline gap-4 sm:gap-5 py-2 sm:py-2.5 ${
                          isActive(item.to)
                            ? "text-[#F4D35E]"
                            : "text-[#F4EFE6] hover:text-[#F4D35E]"
                        } transition-colors`}
                      >
                        <span
                          className="text-[12px] sm:text-[13px] font-mono tabular-nums opacity-50 group-hover:opacity-100 transition-opacity w-10 flex-shrink-0 tracking-wider"
                          aria-hidden="true"
                        >
                          {toRoman(index + 1)}.
                        </span>
                        <span
                          style={{
                            fontFamily: '"Fraunces", "Times New Roman", serif',
                            fontStyle: "italic",
                            fontWeight: 400,
                            fontVariationSettings: '"opsz" 144',
                          }}
                          className="text-[32px] sm:text-[40px] md:text-[44px] leading-[1.05] tracking-[-0.01em] transition-transform group-hover:translate-x-1"
                        >
                          {item.name}
                        </span>
                      </a>
                    </motion.li>
                  ))}
                </ul>

                {/* Séparateur */}
                <motion.div
                  custom={menuItems.length}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="my-6 sm:my-8 h-px w-20 bg-[#F4EFE6]/30"
                  aria-hidden="true"
                />

                {/* Lien externe krismos.fr */}
                <motion.a
                  custom={menuItems.length + 1}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  href="https://krismos.fr/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsMenuOpen(false)}
                  className="group inline-flex flex-col gap-0.5 text-[#F4EFE6] hover:text-[#F4D35E] transition-colors"
                  aria-label="Mon portfolio technique sur krismos.fr (nouvel onglet)"
                >
                  <span className="inline-flex items-center gap-1.5">
                    <span
                      style={{
                        fontFamily: '"Fraunces", serif',
                        fontStyle: "italic",
                        fontWeight: 500,
                      }}
                      className="text-[22px] sm:text-[26px] border-b border-current/40 pb-0.5 group-hover:border-[#F4D35E]"
                    >
                      krismos.fr
                    </span>
                    <ExternalLink
                      className="h-4 w-4 opacity-70 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden="true"
                    />
                  </span>
                  <span className="hero-handwritten text-[16px] sm:text-[18px] text-[#F4EFE6]/60 group-hover:text-[#F4D35E]/80">
                    mon laboratoire technique
                  </span>
                </motion.a>
              </motion.nav>

              {/* Liens sociaux + signature en bas */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.5 }}
                className="mt-10 flex flex-col items-start gap-4"
              >
                <div className="h-px w-32 bg-[#F4EFE6]/20" aria-hidden="true" />
                <div className="flex items-center gap-5 text-[#F4EFE6]/70">
                  <a
                    href="https://www.linkedin.com/in/christophemostefaoui/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Profil LinkedIn"
                    className="inline-flex items-center gap-1.5 hover:text-[#F4D35E] transition-colors"
                  >
                    <Linkedin className="h-4 w-4" />
                    <span className="hero-body text-[13px]">LinkedIn</span>
                  </a>
                  <span className="text-[#F4EFE6]/30">·</span>
                  <a
                    href="https://github.com/krismos64"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Profil GitHub"
                    className="inline-flex items-center gap-1.5 hover:text-[#F4D35E] transition-colors"
                  >
                    <Github className="h-4 w-4" />
                    <span className="hero-body text-[13px]">GitHub</span>
                  </a>
                </div>
                <span className="hero-handwritten text-[14px] text-[#F4EFE6]/40">
                  C.M. — Pau, 2026
                </span>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
