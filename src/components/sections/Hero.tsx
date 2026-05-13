import { useEffect, useState, useRef, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import Lottie from "lottie-react";
import companyAnimation from "../../animations/company.json";
import CallToAction from "../common/CallToAction";
import {
  Phone,
  FileText,
  Code2,
  Rocket,
  ExternalLink,
} from "lucide-react";
import {
  Particle,
  GeometricShape,
  GlowingOrb,
  CodeLine,
  AnimatedParticle,
  MouseGlow,
  containerVariants,
  itemVariants,
  lottieVariants,
  generateParticles,
} from "../effects/FuturisticEffects";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Suivi de la souris pour effet magnétique
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { damping: 50, stiffness: 300 });
  const smoothMouseY = useSpring(mouseY, { damping: 50, stiffness: 300 });

  // Initialiser les particules
  useEffect(() => {
    setParticles(generateParticles(30));
    setTimeout(() => setIsLoaded(true), 100);
  }, []);

  // Gestionnaire de mouvement de souris
  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    },
    [mouseX, mouseY]
  );

  return (
    <section
      ref={containerRef}
      id="home"
      className="section-futuristic pt-24 pb-12 md:pt-32 md:pb-20"
      onMouseMove={handleMouseMove}
    >
      {/* Grille animée en fond */}
      <div className="absolute inset-0 bg-grid-opacity">
        <div className="absolute inset-0 bg-grid-pattern" />
      </div>

      {/* Orbes lumineuses */}
      <GlowingOrb size={350} colorClass="glowing-orb-cyan" left="-5%" top="10%" delay={0} />
      <GlowingOrb size={280} colorClass="glowing-orb-purple" left="65%" top="50%" delay={1.5} />
      <GlowingOrb size={200} colorClass="glowing-orb-pink" left="40%" top="5%" delay={3} />

      {/* Formes géométriques flottantes */}
      <div className="hidden md:block">
        <GeometricShape delay={0} duration={10} size={50} left="8%" top="25%" shape="hexagon" />
        <GeometricShape delay={1} duration={12} size={35} left="88%" top="20%" shape="circle" />
        <GeometricShape delay={2} duration={14} size={60} left="80%" top="65%" shape="square" />
        <GeometricShape delay={0.5} duration={11} size={40} left="15%" top="70%" shape="circle" />
      </div>

      {/* Lignes de code animées */}
      <div className="absolute left-0 right-0 top-1/3 space-y-12 opacity-40 hidden lg:block">
        <CodeLine delay={0} width="50%" />
        <CodeLine delay={0.8} width="35%" />
        <CodeLine delay={1.6} width="65%" />
      </div>

      {/* Système de particules */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle) => (
          <AnimatedParticle key={particle.id} particle={particle} />
        ))}
      </div>

      {/* Lueur qui suit la souris */}
      <MouseGlow smoothMouseX={smoothMouseX} smoothMouseY={smoothMouseY} />

      {/* Animation Lottie en arrière-plan pour mobile */}
      <div className="absolute inset-0 opacity-10 md:hidden pointer-events-none">
        <Lottie animationData={companyAnimation} loop={true} />
      </div>

      {/* Contenu principal */}
      <motion.div
        className="container mx-auto px-6 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate={isLoaded ? "visible" : "hidden"}
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="flex-1 text-center md:text-left">
            {/* Titre principal */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight"
            >
              Création de Sites Internet à{" "}
              <span className="hero-location-text">Pau</span>
            </motion.h1>

            {/* Sous-titre */}
            <motion.p
              variants={itemVariants}
              className="mt-6 text-xl text-gray-600 dark:text-gray-300 leading-relaxed"
            >
              Des sites web modernes qui attirent vos clients et valorisent
              votre activité
            </motion.p>

            {/* Badges de réassurance */}
            <motion.div
              variants={itemVariants}
              className="mt-6 flex flex-wrap justify-center md:justify-start gap-3"
            >
              {[
                { icon: "📍", text: "Déplacement gratuit dans le 64" },
                { icon: "⚡", text: "Devis sous 24h" },
                { icon: "💳", text: "Paiement en 3x sans frais" },
              ].map((badge, index) => (
                <motion.span
                  key={index}
                  className="badge-futuristic"
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {badge.icon} {badge.text}
                </motion.span>
              ))}
            </motion.div>

            {/* Boutons CTA */}
            <motion.div
              variants={itemVariants}
              className="mt-8 flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4"
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="cta-glow-wrapper group"
              >
                <div className="cta-glow" />
                <div className="relative">
                  <CallToAction
                    variant="gradient"
                    text="Demander un devis gratuit"
                    subtext="Réponse sous 24h"
                    icon="send"
                    size="large"
                    href="#contact"
                    location="hero"
                    testId="hero_cta_primary"
                  />
                </div>
              </motion.div>

              <motion.a
                href="https://krismos.fr/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-purple-600 dark:text-purple-300 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-2 border-purple-300/60 dark:border-purple-500/40 hover:border-purple-500 dark:hover:border-purple-400 hover:bg-purple-50 dark:hover:bg-gray-700/80 transition-colors shadow-sm hover:shadow-md"
                aria-label="Voir mon portfolio technique sur krismos.fr (nouvel onglet)"
                data-testid="hero_cta_portfolio"
              >
                <Code2 className="w-5 h-5" aria-hidden="true" />
                <span>Mon portfolio technique</span>
                <ExternalLink className="w-4 h-4 opacity-70" aria-hidden="true" />
              </motion.a>
            </motion.div>

            {/* Mini-processus de travail */}
            <motion.div
              variants={itemVariants}
              className="mt-10 pt-8 border-t border-gray-200/50 dark:border-gray-700/50"
            >
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 text-center md:text-left">
                Comment ça se passe ?
              </p>
              <div className="flex flex-wrap justify-center md:justify-start items-center gap-2 sm:gap-3">
                {[
                  { icon: <Phone className="h-4 w-4" />, text: "Échange gratuit", step: 1 },
                  { icon: <FileText className="h-4 w-4" />, text: "Devis 24h", step: 2 },
                  { icon: <Code2 className="h-4 w-4" />, text: "Développement", step: 3 },
                  { icon: <Rocket className="h-4 w-4" />, text: "Livraison", step: 4 },
                ].map((item, index) => (
                  <motion.div
                    key={item.step}
                    className="flex items-center gap-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 + index * 0.15 }}
                  >
                    <div className="flex items-center gap-2 px-3 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg border border-gray-200/50 dark:border-gray-700/50 shadow-sm">
                      <span className="flex items-center justify-center w-5 h-5 bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 rounded-full text-xs font-bold">
                        {item.step}
                      </span>
                      <span className="text-gray-600 dark:text-gray-300">
                        {item.icon}
                      </span>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                        {item.text}
                      </span>
                    </div>
                    {index < 3 && (
                      <span className="text-gray-400 dark:text-gray-500 hidden sm:block">→</span>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Animation Lottie - visible sur desktop */}
          <motion.div
            variants={lottieVariants}
            className="flex-1 hidden md:block relative max-w-md lg:max-w-lg mx-auto"
          >
            <div className="lottie-glow animate-pulse" />
            <div className="relative scale-95">
              <Lottie animationData={companyAnimation} loop={true} />
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Décorations de coins */}
      <div className="corner-decoration corner-top-left" />
      <div className="corner-decoration corner-top-right" />
      <div className="corner-decoration corner-bottom-left" />
      <div className="corner-decoration corner-bottom-right" />

      {/* Indicateur de scroll */}
      <motion.div
        className="absolute bottom-4 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.5 }}
      >
        <motion.div
          className="scroll-indicator"
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.div
            className="scroll-indicator-dot"
            animate={{ y: [0, 8, 0], opacity: [1, 0.5, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
