import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  FileText,
  Layers,
  Rocket,
  Check,
  Video,
  Camera,
  CreditCard,
  RefreshCw,
  Phone,
  MapPin,
} from "lucide-react";
import CallToAction from "../common/CallToAction";
import FuturisticBackground from "../effects/FuturisticBackground";
import { containerVariants, itemVariants, createCardVariants } from "../effects/FuturisticEffects";

export default function Pricing() {
  const contentRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(contentRef, { once: true, margin: "-100px" });

  const plans = [
    {
      name: "Site One-Page",
      price: "800€ – 1 500€",
      description: "Idéal pour démarrer",
      features: [
        "Site vitrine une page",
        "Design responsive mobile",
        "Formulaire de contact",
        "Optimisation Google & IA",
      ],
      target: "Artisans, indépendants",
      icon: <FileText className="h-8 w-8" />,
      popular: false,
    },
    {
      name: "Site Multi-pages",
      price: "1 500€ – 3 000€",
      description: "Le plus complet",
      features: [
        "Plusieurs pages sur mesure",
        "Blog intégré",
        "Formulaires avancés",
        "SEO complet Google & IA",
        "Statistiques de visite",
        "Formation à l'utilisation",
      ],
      target: "Commerces, PME",
      icon: <Layers className="h-8 w-8" />,
      popular: true,
    },
    {
      name: "Site Sur-mesure",
      price: "À partir de 3 000€",
      description: "Pour vos projets ambitieux",
      features: [
        "Projet complexe personnalisé",
        "Fonctionnalités spécifiques",
        "Intégration chatbot IA",
        "Formation complète",
        "Maintenance incluse",
      ],
      target: "Entreprises, projets spécifiques",
      icon: <Rocket className="h-8 w-8" />,
      popular: false,
    },
  ];

  const reassuranceBadges = [
    {
      icon: <CreditCard className="h-5 w-5" />,
      text: "Paiement en 3x sans frais",
    },
    {
      icon: <RefreshCw className="h-5 w-5" />,
      text: "Modifications incluses",
    },
    {
      icon: <Phone className="h-5 w-5" />,
      text: "Accompagnement personnalisé",
    },
    {
      icon: <MapPin className="h-5 w-5" />,
      text: "Partout en France",
    },
  ];

  const cardVariants = createCardVariants(0.2, 0.15);

  return (
    <FuturisticBackground
      id="tarifs"
      orbs={[
        { size: 300, colorClass: "glowing-orb-cyan", left: "10%", top: "20%", delay: 0 },
        { size: 250, colorClass: "glowing-orb-purple", left: "80%", top: "60%", delay: 1.5 },
        { size: 200, colorClass: "glowing-orb-pink", left: "50%", top: "10%", delay: 3 },
      ]}
      shapes={[
        { delay: 0.5, duration: 12, size: 40, left: "8%", top: "35%", shape: "circle" },
        { delay: 1.5, duration: 14, size: 50, left: "88%", top: "25%", shape: "hexagon" },
        { delay: 2, duration: 10, size: 35, left: "92%", top: "80%", shape: "square" },
      ]}
      codeLines={[
        { delay: 0.5, width: "50%" },
        { delay: 2, width: "35%" },
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
          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
          >
            Tarifs indicatifs
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-600 dark:text-gray-300"
          >
            Une idée des prix pour préparer votre budget
          </motion.p>
        </motion.div>

        {/* Grille 3 cartes */}
        <div className="grid md:grid-cols-3 gap-8 mb-12 items-stretch">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              whileHover={{ scale: 1.03, y: -8 }}
              className={`group relative card-futuristic p-8 flex flex-col ${
                plan.popular
                  ? "ring-2 ring-blue-500 dark:ring-blue-400 md:scale-105 z-10"
                  : ""
              }`}
            >
              <div className="card-futuristic-glow" />

              {/* Badge populaire */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <span className="px-4 py-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-bold rounded-full whitespace-nowrap">
                    ⭐ Le plus demandé
                  </span>
                </div>
              )}

              {/* Icône */}
              <div className="mb-6">
                <div
                  className={`p-4 rounded-2xl inline-block transition-transform duration-300 group-hover:scale-110 ${
                    plan.popular
                      ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                  }`}
                >
                  {plan.icon}
                </div>
              </div>

              {/* Nom et description */}
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {plan.name}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                {plan.description}
              </p>

              {/* Prix */}
              <div className="mb-6">
                <span
                  className={`text-3xl font-bold ${
                    plan.popular
                      ? "text-blue-600 dark:text-blue-400"
                      : "text-gray-900 dark:text-white"
                  }`}
                >
                  {plan.price}
                </span>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-6 flex-grow">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Check
                      className={`h-5 w-5 mt-0.5 flex-shrink-0 ${
                        plan.popular
                          ? "text-blue-500 dark:text-blue-400"
                          : "text-green-500 dark:text-green-400"
                      }`}
                    />
                    <span className="text-gray-600 dark:text-gray-300">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Cible */}
              <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-700">
                <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full text-sm">
                  {plan.target}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mention indicative */}
        <motion.p
          className="text-center text-gray-500 dark:text-gray-400 italic mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.6 }}
        >
          Chaque projet est unique. Ces tarifs sont donnés à titre indicatif et
          dépendent de la complexité et du temps de développement. Demandez
          votre devis personnalisé gratuit.
        </motion.p>

        {/* Bloc Vidéo & Drone */}
        <motion.div
          className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 md:p-10 text-white mb-12 shadow-xl"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.7 }}
        >
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex gap-4">
              <div className="p-3 bg-white/20 rounded-xl">
                <Video className="h-8 w-8" />
              </div>
              <div className="p-3 bg-white/20 rounded-xl">
                <Camera className="h-8 w-8" />
              </div>
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl font-bold mb-2">
                🎬 Montage Vidéo & Prises de Vue Drone — Sur devis
              </h3>
              <p className="text-white/90">
                Je monte vos vidéos professionnelles (Final Cut Pro) et réalise
                des prises de vue aériennes avec drone DJI Mavic Air pour
                valoriser votre entreprise, vos biens immobiliers ou vos
                événements.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Badges réassurance */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.8 }}
        >
          {reassuranceBadges.map((badge, index) => (
            <motion.div
              key={index}
              className="badge-futuristic justify-center"
              whileHover={{ scale: 1.03, y: -2 }}
            >
              <span className="text-blue-600 dark:text-blue-400">
                {badge.icon}
              </span>
              <span>{badge.text}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.9 }}
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="cta-glow-wrapper group inline-block"
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
                location="pricing"
                testId="pricing_cta"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </FuturisticBackground>
  );
}
