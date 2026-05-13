import { useEffect, useState, useRef, useCallback } from "react";
import { motion, useMotionValue, useSpring, useInView } from "framer-motion";
import Lottie from "lottie-react";
import chatbotAnimation from "../../animations/chatbot.json";
import CallToAction from "../common/CallToAction";
import {
  Particle,
  GeometricShape,
  GlowingOrb,
  CodeLine,
  AnimatedParticle,
  MouseGlow,
  containerVariants,
  itemVariants,
  lottieVariantsLeft,
  createCardVariants,
  generateParticles,
} from "../effects/FuturisticEffects";

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(contentRef, { once: true, margin: "-100px" });
  const [particles, setParticles] = useState<Particle[]>([]);

  // Suivi de la souris pour effet magnétique
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { damping: 50, stiffness: 300 });
  const smoothMouseY = useSpring(mouseY, { damping: 50, stiffness: 300 });

  // Initialiser les particules
  useEffect(() => {
    setParticles(generateParticles(20));
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

  const differentiators = [
    {
      emoji: "💬",
      title: "Je parle votre langue",
      description: "Pas de jargon technique, des explications claires",
    },
    {
      emoji: "⚡",
      title: "Disponible et réactif",
      description: "Réponse sous 24h, suivi personnalisé",
    },
    {
      emoji: "🤝",
      title: "Présent après livraison",
      description: "Accompagnement et modifications incluses",
    },
  ];

  // Variants pour les cartes
  const cardVariants = createCardVariants(0.3, 0.1);

  return (
    <section
      ref={containerRef}
      id="about"
      className="section-futuristic py-20"
      onMouseMove={handleMouseMove}
    >
      {/* Grille animée en fond */}
      <div className="absolute inset-0 bg-grid-opacity">
        <div className="absolute inset-0 bg-grid-pattern" />
      </div>

      {/* Orbes lumineuses */}
      <GlowingOrb size={300} colorClass="glowing-orb-cyan" left="75%" top="15%" delay={0} />
      <GlowingOrb size={250} colorClass="glowing-orb-purple" left="-5%" top="50%" delay={1.5} />
      <GlowingOrb size={180} colorClass="glowing-orb-pink" left="45%" top="75%" delay={3} />

      {/* Formes géométriques flottantes */}
      <div className="hidden md:block">
        <GeometricShape delay={0.5} duration={11} size={45} left="5%" top="20%" shape="circle" />
        <GeometricShape delay={1.5} duration={13} size={55} left="92%" top="35%" shape="hexagon" />
        <GeometricShape delay={2.5} duration={15} size={40} left="85%" top="75%" shape="square" />
        <GeometricShape delay={0} duration={12} size={35} left="10%" top="80%" shape="hexagon" />
      </div>

      {/* Lignes de code animées */}
      <div className="absolute left-0 right-0 top-1/4 space-y-16 opacity-40 hidden lg:block">
        <CodeLine delay={0.5} width="45%" />
        <CodeLine delay={1.5} width="60%" />
        <CodeLine delay={2.5} width="35%" />
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
      <div className="absolute inset-0 opacity-5 md:hidden pointer-events-none">
        <Lottie animationData={chatbotAnimation} loop={true} />
      </div>

      {/* Contenu principal */}
      <div className="container mx-auto px-6 relative z-10" ref={contentRef}>
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Animation Lottie - Desktop uniquement */}
          <motion.div
            variants={lottieVariantsLeft}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="hidden md:block flex-1 relative max-w-sm lg:max-w-md mx-auto"
          >
            <div className="lottie-glow animate-pulse" />
            <div className="relative scale-95">
              <Lottie animationData={chatbotAnimation} loop={true} />
            </div>
          </motion.div>

          {/* Contenu */}
          <motion.div
            className="flex-1 text-center md:text-left"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {/* Header avec badge discret */}
            <motion.div
              variants={itemVariants}
              className="flex items-center justify-center md:justify-start gap-3 mb-6"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                Qui suis-je ?
              </h2>
              <motion.img
                src="/assets/images/badge-dev.png"
                alt="Certification Développeur"
                className="w-12 h-12 object-contain"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              />
            </motion.div>

            {/* Paragraphes présentation */}
            <motion.div
              variants={itemVariants}
              className="space-y-4 text-gray-600 dark:text-gray-300 mb-8"
            >
              <p className="text-lg">
                Je m'appelle{" "}
                <strong className="text-gray-900 dark:text-white">
                  Christophe
                </strong>
                , développeur web freelance basé à{" "}
                <strong className="text-gray-900 dark:text-white">Artix</strong>
                , près de Pau.
              </p>
              <p>
                Après 12 ans dans le conseil client en multimédia, j'ai choisi
                de mettre mon expertise au service des entrepreneurs et des PME.
                Je comprends vos contraintes : budget à respecter, besoin de
                résultats concrets, pas de temps à perdre.
              </p>
              <p className="font-medium text-gray-900 dark:text-white">
                Mon approche : vous écouter, vous conseiller, et créer un site
                qui travaille pour vous — même quand vous dormez.
              </p>
            </motion.div>

            {/* 3 points différenciants */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {differentiators.map((item, index) => (
                <motion.div
                  key={index}
                  custom={index}
                  variants={cardVariants}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  whileHover={{ scale: 1.03, y: -4 }}
                  className="card-futuristic group"
                >
                  <div className="card-futuristic-glow" />
                  <motion.span
                    className="text-3xl mb-2 block"
                    whileHover={{ scale: 1.2, rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.4 }}
                  >
                    {item.emoji}
                  </motion.span>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* CTA unique */}
            <motion.div
              variants={itemVariants}
              className="flex justify-center md:justify-start"
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
                    text="Discutons de votre projet"
                    subtext="Premier échange gratuit"
                    icon="message"
                    size="large"
                    href="#contact"
                    location="about"
                    testId="about_cta"
                  />
                </div>
              </motion.div>
            </motion.div>

            {/* Encart audience tech */}
            <motion.a
              href="https://krismos.fr/"
              target="_blank"
              rel="noopener noreferrer"
              variants={itemVariants}
              whileHover={{ y: -2, boxShadow: "0 10px 30px -10px rgba(168, 85, 247, 0.25)" }}
              className="mt-8 block relative overflow-hidden rounded-2xl p-5 sm:p-6 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 border border-purple-200/60 dark:border-purple-700/40 text-left transition-all group"
              aria-label="Voir mon portfolio technique sur krismos.fr (nouvel onglet)"
              data-testid="about_cta_portfolio"
            >
              <div className="flex items-start gap-4">
                <div className="hidden sm:flex flex-shrink-0 w-12 h-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 text-white shadow-md">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 18l6-6-6-6M8 6l-6 6 6 6" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs uppercase tracking-wider font-semibold text-purple-600 dark:text-purple-300 mb-1">
                    Vous êtes recruteur, CTO ou DSI ?
                  </p>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                    Découvrez mon portfolio technique complet
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    CV, parcours, stack détaillée, projets perso et veille techno —
                    tout sur{" "}
                    <span className="font-semibold text-purple-600 dark:text-purple-300 group-hover:underline">
                      krismos.fr
                    </span>
                  </p>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-purple-500 dark:text-purple-400 flex-shrink-0 mt-1 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </motion.a>
          </motion.div>
        </div>
      </div>

      {/* Décorations de coins */}
      <div className="corner-decoration corner-top-left" />
      <div className="corner-decoration corner-top-right" />
      <div className="corner-decoration corner-bottom-left" />
      <div className="corner-decoration corner-bottom-right" />
    </section>
  );
}
