import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  Brain,
  MessageSquare,
  Zap,
  Shield,
  Code2,
  Sparkles,
  Clock,
  Users,
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
      title: "Chatbot pour votre site",
      icon: <MessageSquare className="h-6 w-6" />,
      description:
        "Un assistant qui répond à vos visiteurs, même quand vous dormez",
      example:
        "Idéal pour artisans, commerces, professions libérales : le chatbot répond aux questions fréquentes (horaires, services, tarifs), oriente vers le bon contact et collecte les demandes de devis pendant que vous travaillez.",
      benefits: [
        "Répond à vos clients 24h/24, 7j/7",
        "Capte les demandes le soir et le week-end",
        "Allège votre charge mentale",
        "Forme l'IA avec vos propres réponses",
      ],
    },
    {
      title: "Automatiser vos tâches répétitives",
      icon: <Zap className="h-6 w-6" />,
      description:
        "Gagnez des heures chaque semaine sur les tâches qui vous prennent du temps",
      example:
        "Génération de devis et factures, tri et résumé d'emails clients, rédaction d'articles ou de fiches produits, traduction multilingue, organisation de documents : tout ce qui se répète peut être automatisé.",
      benefits: [
        "Plusieurs heures gagnées chaque semaine",
        "Moins d'erreurs de saisie",
        "Process documentés et reproductibles",
        "Vous vous concentrez sur l'essentiel",
      ],
    },
  ];

  const features = [
    {
      icon: <Clock className="h-8 w-8" />,
      title: "Concret et rapide",
      description:
        "Pas de promesses floues : on identifie une tâche, on l'automatise, on mesure le gain de temps.",
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Vos données protégées",
      description:
        "Conformité RGPD, hébergement européen si besoin, vos données restent les vôtres.",
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Adapté à votre métier",
      description:
        "Artisan, commerce, profession libérale, PME : la solution s'adapte à votre activité, pas l'inverse.",
    },
    {
      icon: <Code2 className="h-8 w-8" />,
      title: "Vous gardez la main",
      description:
        "Formation incluse pour utiliser la solution en autonomie, sans dépendance.",
    },
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
        {/* Header */}
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
            Mettez{" "}
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              l'IA au service
            </span>{" "}
            de votre activité
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
          >
            Pas de jargon, pas de promesses floues. Juste deux usages concrets
            qui font gagner du temps aux artisans, commerces et indépendants.
          </motion.p>
        </motion.div>

        {/* Use Cases avec tabs */}
        <div className="mb-16">
          <motion.h3
            className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.4 }}
          >
            Deux usages simples, des bénéfices concrets
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
            {(() => {
              const activeUseCase = useCases[activeTab] ?? useCases[0]!;
              return (
                <div className="card-futuristic p-8">
                  <div className="card-futuristic-glow" />
                  <div className="relative z-10">
                    <div className="flex items-start gap-4 mb-6">
                      <div className="p-3 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-lg">
                        {activeUseCase.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                          {activeUseCase.title}
                        </h4>
                        <p className="text-gray-600 dark:text-gray-300">
                          {activeUseCase.description}
                        </p>
                      </div>
                    </div>

                    <div className="mb-6 p-4 bg-purple-50/80 dark:bg-purple-900/20 backdrop-blur-sm rounded-lg border border-purple-200/50 dark:border-purple-700/50">
                      <p className="text-gray-700 dark:text-gray-300 italic">
                        <span className="font-semibold not-italic">
                          Concrètement :
                        </span>{" "}
                        {activeUseCase.example}
                      </p>
                    </div>

                    <div>
                      <h5 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                        <Sparkles className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                        Ce que vous y gagnez
                      </h5>
                      <ul className="grid sm:grid-cols-2 gap-2">
                        {activeUseCase.benefits.map((benefit, idx) => (
                          <li
                            key={idx}
                            className="text-sm text-gray-700 dark:text-gray-300 flex items-start gap-2"
                          >
                            <span className="text-green-500 mt-0.5">✓</span>
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })()}
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
            Ma méthode pour intégrer l'IA chez vous
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
              Une idée d'usage IA pour votre activité ?
            </h3>
            <p className="text-lg text-white/90 max-w-2xl">
              Échangeons 30 minutes pour voir si l'IA peut vous faire gagner du
              temps. Sans engagement, sans jargon.
            </p>
            <CallToAction
              variant="white"
              text="En parler avec Christophe"
              subtext="Échange gratuit, sans engagement"
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
