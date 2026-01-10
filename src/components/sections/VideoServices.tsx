import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Lottie from "lottie-react";
import { Video, Camera, Sparkles, PlayCircle } from "lucide-react";
import droneAnimation from "../../animations/Drone Camera.json";
import videoAnimation from "../../animations/Cut Video.json";
import FuturisticBackground from "../effects/FuturisticBackground";
import { containerVariants, itemVariants, lottieVariants, lottieVariantsLeft } from "../effects/FuturisticEffects";
import CallToAction from "../common/CallToAction";

export default function VideoServices() {
  const contentRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(contentRef, { once: true, margin: "-100px" });

  const services = [
    {
      icon: <Video className="h-8 w-8 text-blue-600 dark:text-blue-400" />,
      title: "Montage Vidéo Professionnel",
      description: "Montage créatif avec Final Cut Pro X sur Mac",
      features: [
        "Étalonnage colorimétrique",
        "Effets visuels et transitions",
        "Optimisation pour web et réseaux sociaux",
        "Export 4K et formats multiples"
      ],
      animation: videoAnimation,
      lottieVariant: lottieVariantsLeft
    },
    {
      icon: <Camera className="h-8 w-8 text-blue-600 dark:text-blue-400" />,
      title: "Prises de Vue Aériennes",
      description: "Captation drone DJI Mavic Air haute définition",
      features: [
        "Photos et vidéos aériennes HD pour entreprises",
        "Vues immobilières spectaculaires",
        "Captation de sites industriels et commerciaux",
        "Inspections techniques et suivis de chantier"
      ],
      animation: droneAnimation,
      lottieVariant: lottieVariants
    }
  ];

  const useCases = [
    {
      icon: <Sparkles className="h-6 w-6" />,
      title: "Publicités d'Entreprise",
      description: "Créez des vidéos promotionnelles qui captent l'attention et convertissent vos prospects en clients."
    },
    {
      icon: <PlayCircle className="h-6 w-6" />,
      title: "Communication Associative",
      description: "Donnez de la visibilité à vos actions avec des vidéos impactantes pour vos campagnes et événements."
    }
  ];

  const stats = [
    { value: "4K", label: "Résolution Ultra HD" },
    { value: "360°", label: "Vues panoramiques" },
    { value: "FCPX", label: "Montage Pro Mac" },
    { value: "DJI", label: "Technologie Drone" }
  ];

  return (
    <FuturisticBackground
      id="video-services"
      orbs={[
        { size: 260, colorClass: "glowing-orb-cyan", left: "10%", top: "25%", delay: 0 },
        { size: 220, colorClass: "glowing-orb-purple", left: "85%", top: "55%", delay: 1.5 },
        { size: 180, colorClass: "glowing-orb-pink", left: "45%", top: "80%", delay: 3 },
      ]}
      shapes={[
        { delay: 0, duration: 11, size: 45, left: "5%", top: "40%", shape: "hexagon" },
        { delay: 1.5, duration: 13, size: 50, left: "92%", top: "30%", shape: "circle" },
        { delay: 2.5, duration: 10, size: 40, left: "88%", top: "75%", shape: "square" },
      ]}
      codeLines={[
        { delay: 0.5, width: "50%" },
        { delay: 2, width: "40%" },
      ]}
    >
      <div className="container mx-auto px-6 relative z-10" ref={contentRef}>
        {/* Titre principal */}
        <motion.div
          className="text-center mb-16"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div variants={itemVariants} className="flex items-center justify-center gap-4 mb-4">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Production Vidéo & Drone
            </h2>
            <motion.img
              src="/assets/images/badge-drone.png"
              alt="Télépilote Drone Certifié DGAC AlphaTango"
              className="w-20 h-20 object-contain"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
          </motion.div>
          <motion.p variants={itemVariants} className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            🎬 Sublimez votre communication avec des contenus visuels professionnels
          </motion.p>
        </motion.div>

        {/* Services principaux avec animations */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              className="group card-futuristic p-6"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: 0.2 + index * 0.2 }}
              whileHover={{ scale: 1.02, y: -4 }}
            >
              <div className="card-futuristic-glow" />
              <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
                {/* Animation Lottie */}
                <motion.div
                  className="w-full md:w-1/3 h-48 md:h-64"
                  variants={service.lottieVariant}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                >
                  <Lottie
                    animationData={service.animation}
                    loop={true}
                    className="w-full h-full"
                  />
                </motion.div>

                {/* Contenu */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-full">
                      {service.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {service.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {service.description}
                  </p>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-blue-600 dark:text-blue-400 mt-1">✓</span>
                        <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Cas d'usage */}
        <motion.div
          className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 md:p-12 text-white mb-12 shadow-xl"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.6 }}
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-8 text-center">
            Des Solutions Visuelles Pour Tous Vos Besoins
          </h3>

          <div className="grid md:grid-cols-2 gap-8">
            {useCases.map((useCase, index) => (
              <motion.div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-all duration-300 border border-white/20"
                whileHover={{ scale: 1.03, y: -4 }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-white/20 rounded-lg">
                    {useCase.icon}
                  </div>
                  <h4 className="text-xl font-semibold">
                    {useCase.title}
                  </h4>
                </div>
                <p className="text-white/90">
                  {useCase.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.7 }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center p-6 card-futuristic"
              whileHover={{ scale: 1.05, y: -4 }}
            >
              <div className="card-futuristic-glow" />
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent relative z-10">
                {stat.value}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 relative z-10">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.8 }}
        >
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            Démarquez-vous avec des contenus visuels professionnels qui racontent votre histoire
          </p>
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="cta-glow-wrapper group inline-block"
          >
            <div className="cta-glow" />
            <div className="relative">
              <CallToAction
                variant="gradient"
                text="Discutons de votre projet vidéo"
                subtext="Devis gratuit"
                icon="send"
                size="large"
                href="#contact"
                location="video-services"
                testId="video_services_cta"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </FuturisticBackground>
  );
}
