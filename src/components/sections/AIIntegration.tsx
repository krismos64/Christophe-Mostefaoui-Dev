import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  Brain,
  Sparkles,
  MessageSquare,
  TrendingUp,
  Eye,
  BarChart3,
  Zap,
  Shield,
  Code2,
  Database,
} from "lucide-react";
import CallToAction from "../common/CallToAction";
import FuturisticBackground from "../effects/FuturisticBackground";
import { containerVariants, itemVariants, createCardVariants } from "../effects/FuturisticEffects";

export default function AIIntegration() {
  const [activeTab, setActiveTab] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(contentRef, { once: true, margin: "-100px" });

  const useCases = [
    {
      title: "Chatbot Intelligent",
      icon: <MessageSquare className="h-6 w-6" />,
      description: "Support client 24/7 avec réponses contextuelles",
      example:
        "Un assistant virtuel qui comprend vos clients, répond à leurs questions et les guide vers la conversion.",
      technologies: ["GPT-5", "Claude", "Langchain", "API REST"],
      benefits: [
        "Réduction de 70% du temps de support",
        "Satisfaction client améliorée",
        "Disponibilité 24/7",
      ],
    },
    {
      title: "Analyse Prédictive",
      icon: <TrendingUp className="h-6 w-6" />,
      description: "Anticipez les tendances et comportements clients",
      example:
        "Prédiction des ventes, détection de churn, recommandations personnalisées basées sur l'historique.",
      technologies: ["Python", "TensorFlow", "Scikit-learn", "Pandas"],
      benefits: [
        "Décisions data-driven",
        "+35% de conversions",
        "ROI optimisé",
      ],
    },
    {
      title: "Vision par Ordinateur",
      icon: <Eye className="h-6 w-6" />,
      description: "Traitement intelligent d'images et vidéos",
      example:
        "Détection de produits, contrôle qualité automatisé, reconnaissance faciale pour sécurité.",
      technologies: ["OpenCV", "YOLO", "PyTorch", "Cloud Vision API"],
      benefits: ["Automatisation complète", "Précision 99%", "Temps réel"],
    },
    {
      title: "Génération de Contenu",
      icon: <Sparkles className="h-6 w-6" />,
      description: "Création automatique de textes et visuels",
      example:
        "Articles SEO, descriptions produits, emails marketing personnalisés, images générées.",
      technologies: ["GPT-5", "Gemini", "Stable Diffusion", "Midjourney API"],
      benefits: [
        "Production x10 plus rapide",
        "Contenu personnalisé",
        "Coûts réduits",
      ],
    },
  ];

  const features = [
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Intégration Rapide",
      description: "APIs plug & play compatibles avec votre stack existante",
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Sécurité & RGPD",
      description:
        "Données chiffrées et conformité totale aux normes européennes",
    },
    {
      icon: <Code2 className="h-8 w-8" />,
      title: "Sur Mesure",
      description: "Solutions personnalisées selon vos besoins spécifiques",
    },
    {
      icon: <Database className="h-8 w-8" />,
      title: "Vos Données",
      description: "Exploitation intelligente de vos données existantes",
    },
  ];

  const stats = [
    { value: "85%", label: "Automatisation des tâches" },
    { value: "3x", label: "Productivité augmentée" },
    { value: "60%", label: "Réduction des coûts" },
    { value: "24/7", label: "Disponibilité totale" },
  ];

  const cardVariants = createCardVariants(0.2, 0.1);

  return (
    <FuturisticBackground
      id="ai-integration"
      orbs={[
        { size: 320, colorClass: "glowing-orb-purple", left: "5%", top: "15%", delay: 0 },
        { size: 280, colorClass: "glowing-orb-pink", left: "80%", top: "50%", delay: 1.5 },
        { size: 200, colorClass: "glowing-orb-cyan", left: "50%", top: "80%", delay: 3 },
      ]}
      shapes={[
        { delay: 0, duration: 11, size: 55, left: "3%", top: "30%", shape: "hexagon" },
        { delay: 1, duration: 13, size: 45, left: "92%", top: "20%", shape: "circle" },
        { delay: 2, duration: 15, size: 50, left: "88%", top: "75%", shape: "square" },
        { delay: 0.5, duration: 12, size: 40, left: "10%", top: "85%", shape: "circle" },
      ]}
      codeLines={[
        { delay: 0, width: "60%" },
        { delay: 1.5, width: "45%" },
        { delay: 3, width: "55%" },
      ]}
    >
      <div className="container mx-auto px-6 relative z-10" ref={contentRef}>
        {/* Header avec animation */}
        <motion.div
          className="text-center mb-16"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-purple-100/80 dark:bg-purple-900/30 backdrop-blur-sm rounded-full border border-purple-200/50 dark:border-purple-700/50"
          >
            <Brain className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            <span className="text-sm font-semibold text-purple-600 dark:text-purple-400">
              Intelligence Artificielle
            </span>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6"
          >
            Propulsez votre business dans{" "}
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              l'ère de l'IA
            </span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
          >
            Transformez vos processus avec des solutions IA sur mesure. De
            l'automatisation intelligente à l'analyse prédictive, je développe
            les outils qui feront la différence.
          </motion.p>
        </motion.div>

        {/* Stats rapides */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.3 }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center p-6 card-futuristic"
              whileHover={{ scale: 1.05, y: -4 }}
            >
              <div className="card-futuristic-glow" />
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent relative z-10">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-2 relative z-10">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Use Cases avec tabs */}
        <div className="mb-16">
          <motion.h3
            className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.4 }}
          >
            Solutions IA Concrètes pour Votre Business
          </motion.h3>

          {/* Tabs */}
          <motion.div
            className="flex flex-wrap justify-center gap-2 mb-8"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.5 }}
          >
            {useCases.map((useCase, index) => (
              <motion.button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  activeTab === index
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                    : "bg-white/70 dark:bg-gray-800/70 backdrop-blur-md text-gray-700 dark:text-gray-300 border border-gray-200/50 dark:border-gray-700/50 hover:border-purple-300 dark:hover:border-purple-600"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {useCase.icon}
                <span className="hidden sm:inline">{useCase.title}</span>
              </motion.button>
            ))}
          </motion.div>

          {/* Tab Content */}
          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="card-futuristic p-8">
              <div className="card-futuristic-glow" />
              <div className="relative z-10">
                <div className="flex items-start gap-4 mb-6">
                  <div className="p-3 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-lg">
                    {useCases[activeTab].icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      {useCases[activeTab].title}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      {useCases[activeTab].description}
                    </p>
                  </div>
                </div>

                <div className="mb-6 p-4 bg-purple-50/80 dark:bg-purple-900/20 backdrop-blur-sm rounded-lg border border-purple-200/50 dark:border-purple-700/50">
                  <p className="text-gray-700 dark:text-gray-300 italic">
                    <span className="font-semibold">Exemple concret :</span>{" "}
                    {useCases[activeTab].example}
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                      <Code2 className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                      Technologies utilisées
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {useCases[activeTab].technologies.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-gray-100/80 dark:bg-gray-700/80 backdrop-blur-sm text-gray-700 dark:text-gray-300 rounded-full text-sm border border-gray-200/50 dark:border-gray-600/50"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h5 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                      <BarChart3 className="h-5 w-5 text-green-600 dark:text-green-400" />
                      Bénéfices mesurables
                    </h5>
                    <ul className="space-y-1">
                      {useCases[activeTab].benefits.map((benefit, idx) => (
                        <li
                          key={idx}
                          className="text-sm text-gray-600 dark:text-gray-300 flex items-center gap-2"
                        >
                          <span className="text-green-500">✓</span>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Features Grid */}
        <div className="mb-16">
          <motion.h3
            className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.7 }}
          >
            Pourquoi Choisir Mes Solutions IA ?
          </motion.h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                whileHover={{ scale: 1.05, y: -8 }}
                className="text-center p-6 card-futuristic"
              >
                <div className="card-futuristic-glow" />
                <div className="inline-flex p-3 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-full mb-4 text-purple-600 dark:text-purple-400 relative z-10">
                  {feature.icon}
                </div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 relative z-10">
                  {feature.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm relative z-10">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Final */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.9 }}
        >
          <div className="inline-flex flex-col items-center gap-6 p-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl shadow-2xl">
            <h3 className="text-2xl md:text-3xl font-bold text-white">
              Prêt à Révolutionner Votre Business avec l'IA ?
            </h3>
            <p className="text-lg text-white/90 max-w-2xl">
              Ne restez pas à la traîne. Adoptez l'intelligence artificielle dès
              maintenant et prenez une longueur d'avance sur vos concurrents.
            </p>
            <CallToAction
              variant="white"
              text="Discutons de votre projet IA"
              subtext="Consultation gratuite"
              icon="bot"
              size="large"
              href="#contact"
              location="ai_integration"
              testId="ai_cta_primary"
            />
          </div>
        </motion.div>
      </div>
    </FuturisticBackground>
  );
}
