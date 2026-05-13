import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Rocket,
  Brain,
  Cpu,
  Users,
  Server,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import FuturisticBackground from "../effects/FuturisticBackground";
import { containerVariants, itemVariants } from "../effects/FuturisticEffects";

export default function SmartPlanningShowcase() {
  const contentRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(contentRef, { once: true, margin: "-100px" });

  const pillars = [
    {
      icon: <Brain className="h-6 w-6" />,
      title: "Conception produit",
      description:
        "De l'idée au cahier des charges, en passant par les wireframes et le parcours utilisateur.",
    },
    {
      icon: <Cpu className="h-6 w-6" />,
      title: "Architecture & développement",
      description:
        "Stack moderne, base de données scalable, sécurité, performances : pensé pour durer.",
    },
    {
      icon: <Sparkles className="h-6 w-6" />,
      title: "Intégration IA en production",
      description:
        "Assistant intelligent intégré au cœur du produit, pas un gadget — vraiment utilisé par les clients.",
    },
    {
      icon: <Server className="h-6 w-6" />,
      title: "Déploiement & exploitation",
      description:
        "Hébergement, monitoring, sauvegardes, mises à jour : je gère le run au quotidien.",
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Support client direct",
      description:
        "Je réponds moi-même aux utilisateurs : j'apprends ce qui marche et ce qui doit évoluer.",
    },
    {
      icon: <Rocket className="h-6 w-6" />,
      title: "Modèle freemium lancé",
      description:
        "Stratégie commerciale, pricing, onboarding : un vrai produit en service, pas une démo.",
    },
  ];

  return (
    <FuturisticBackground
      id="smartplanning"
      orbs={[
        { size: 320, colorClass: "glowing-orb-purple", left: "5%", top: "20%", delay: 0 },
        { size: 280, colorClass: "glowing-orb-cyan", left: "85%", top: "55%", delay: 1.5 },
        { size: 200, colorClass: "glowing-orb-pink", left: "45%", top: "85%", delay: 3 },
      ]}
      shapes={[
        { delay: 0.5, duration: 12, size: 45, left: "8%", top: "30%", shape: "hexagon" },
        { delay: 1.5, duration: 14, size: 55, left: "88%", top: "25%", shape: "circle" },
        { delay: 2, duration: 11, size: 40, left: "10%", top: "75%", shape: "square" },
      ]}
      codeLines={[
        { delay: 0.5, width: "55%" },
        { delay: 2, width: "40%" },
      ]}
    >
      <div className="container mx-auto px-6 relative z-10" ref={contentRef}>
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-indigo-100/80 dark:bg-indigo-900/30 backdrop-blur-sm rounded-full border border-indigo-200/50 dark:border-indigo-700/50"
          >
            <Rocket className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
            <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
              Mon projet entrepreneurial
            </span>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6"
          >
            J'ai fondé{" "}
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              SmartPlanning
            </span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
          >
            Un SaaS de gestion de plannings d'équipe avec assistant IA intégré.
            Conçu, développé et lancé seul en 2026, modèle freemium.{" "}
            <strong className="text-gray-900 dark:text-white">
              La preuve que je sais piloter un produit, pas juste écrire du code.
            </strong>
          </motion.p>
        </motion.div>

        {/* Screenshot + storytelling */}
        <motion.div
          className="grid lg:grid-cols-2 gap-10 items-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {/* Image */}
          <motion.a
            href="https://smartplanning.fr/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02, y: -4 }}
            className="block relative rounded-2xl overflow-hidden shadow-2xl group"
            aria-label="Visiter SmartPlanning.fr (nouvel onglet)"
            data-testid="smartplanning_showcase_image"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20 z-10 group-hover:opacity-0 transition-opacity duration-300" />
            <img
              src="/assets/images/business-smartplanning.webp"
              alt="Aperçu de SmartPlanning, SaaS de gestion de plannings fondé par Christophe Mostefaoui"
              loading="lazy"
              className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 flex items-end justify-center pb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
              <span className="inline-flex items-center gap-2 px-6 py-3 bg-white text-indigo-700 rounded-full font-semibold shadow-lg">
                Visiter smartplanning.fr
                <ExternalLink className="w-4 h-4" />
              </span>
            </div>
          </motion.a>

          {/* Storytelling */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Pourquoi c'est important pour vous ?
            </h3>
            <div className="space-y-4 text-gray-600 dark:text-gray-300">
              <p>
                Confier son projet à un développeur freelance, c'est faire
                confiance à quelqu'un sur sa capacité à <strong>livrer un produit
                qui marche, pas juste du code qui compile</strong>.
              </p>
              <p>
                En lançant SmartPlanning, j'ai dû gérer chaque étape qu'un
                client peut me confier : pensée produit, choix techniques,
                sécurité, performances, intégration IA, déploiement,
                facturation, support utilisateurs, évolutions.
              </p>
              <p className="font-medium text-gray-900 dark:text-white">
                Quand vous me confiez votre site ou votre application, vous
                bénéficiez de cette expérience entrepreneuriale réelle —
                pas seulement de compétences techniques sur papier.
              </p>
            </div>

            <motion.a
              href="https://smartplanning.fr/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 mt-6 px-6 py-3 rounded-full font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg hover:shadow-xl transition-shadow"
              aria-label="Découvrir SmartPlanning.fr (nouvel onglet)"
              data-testid="smartplanning_showcase_cta"
            >
              <Rocket className="h-5 w-5" aria-hidden="true" />
              <span>Découvrir SmartPlanning</span>
              <ExternalLink className="h-4 w-4 opacity-80" aria-hidden="true" />
            </motion.a>
          </div>
        </motion.div>

        {/* Piliers de compétences entrepreneuriales */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Ce que SmartPlanning prouve concrètement
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {pillars.map((pillar, index) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{ delay: 0.7 + index * 0.08, duration: 0.4 }}
                whileHover={{ y: -4 }}
                className="card-futuristic p-5 group"
              >
                <div className="card-futuristic-glow" />
                <div className="relative z-10">
                  <div className="inline-flex p-2.5 rounded-lg bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 text-indigo-600 dark:text-indigo-400 mb-3">
                    {pillar.icon}
                  </div>
                  <h4 className="font-bold text-gray-900 dark:text-white mb-1">
                    {pillar.title}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {pillar.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </FuturisticBackground>
  );
}
