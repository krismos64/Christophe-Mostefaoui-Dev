import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Sparkles,
  Video,
  Camera,
  CreditCard,
  RefreshCw,
  Phone,
  MapPin,
  Target,
  Lightbulb,
  HeartHandshake,
} from "lucide-react";
import CallToAction from "../common/CallToAction";
import FuturisticBackground from "../effects/FuturisticBackground";
import { containerVariants, itemVariants } from "../effects/FuturisticEffects";

export default function Pricing() {
  const contentRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(contentRef, { once: true, margin: "-100px" });

  const valueProps = [
    {
      icon: <Target className="h-6 w-6" />,
      title: "Analyse de vos besoins",
      description:
        "Échange en visio ou téléphone pour comprendre votre projet, vos objectifs et votre cible.",
    },
    {
      icon: <Lightbulb className="h-6 w-6" />,
      title: "Proposition sur mesure",
      description:
        "Devis détaillé avec périmètre clair, technologies adaptées et planning réaliste.",
    },
    {
      icon: <HeartHandshake className="h-6 w-6" />,
      title: "Accompagnement complet",
      description:
        "Suivi de A à Z, formation à l'utilisation, maintenance et support après livraison.",
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
            Un devis sur mesure pour votre projet
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
          >
            Chaque projet est unique. Parlons de vos besoins et construisons
            ensemble la solution qui vous correspond.
          </motion.p>
        </motion.div>

        {/* Bloc principal "Devis sur mesure" */}
        <motion.div
          className="card-futuristic p-8 md:p-12 mb-12 relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="card-futuristic-glow" />

          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center p-4 bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-2xl mb-4">
              <Sparkles className="h-8 w-8" />
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3">
              Une approche personnalisée, sans surprise
            </h3>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Site vitrine, application SaaS, e-commerce, intégration IA ou
              chatbot : je conçois des solutions adaptées à vos objectifs et à
              votre budget.
            </p>
          </div>

          {/* 3 étapes valeur */}
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {valueProps.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isInView
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 20 }
                }
                transition={{ delay: 0.3 + index * 0.15, duration: 0.5 }}
                className="flex flex-col items-center text-center p-6 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700/50"
              >
                <div className="p-3 rounded-xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 mb-4">
                  {item.icon}
                </div>
                <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                  {item.title}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

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
                🎬 Montage Vidéo & Prises de Vue Drone
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
                text="Demander mon devis gratuit"
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
