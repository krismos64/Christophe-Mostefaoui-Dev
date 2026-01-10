import { useCallback, useEffect, useState, useRef } from "react";
import { ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, useInView } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import CallToAction from "../common/CallToAction";
import { Helmet } from "react-helmet-async";
import FuturisticBackground from "../effects/FuturisticBackground";
import { containerVariants, itemVariants } from "../effects/FuturisticEffects";

export default function Portfolio() {
  const contentRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(contentRef, { once: true, margin: "-100px" });

  const projects = [
    {
      title: "LivresStaka.fr",
      description:
        "Une plateforme complète pour accompagner les auteurs dans la correction et l'édition de leurs manuscrits. Espace client sécurisé, paiement en ligne et messagerie intégrée pour échanger facilement avec l'équipe éditoriale.",
      image: "/assets/images/livrestaka.jpg",
      alt: "LivresStaka - Plateforme d'édition et correction de manuscrits",
      tags: ["Plateforme sur mesure", "Paiement en ligne", "Espace client"],
      link: "https://livrestaka.fr/",
    },
    {
      title: "SmartPlanning.fr",
      description:
        "Application de gestion des plannings d'équipe avec assistant intelligent intégré. Optimisez automatiquement les emplois du temps de vos collaborateurs et gagnez des heures de travail chaque semaine.",
      image: "/assets/images/business-smartplanning.webp",
      alt: "SmartPlanning - Application SaaS de gestion des plannings",
      tags: ["Application SaaS", "Assistant IA", "Gain de temps"],
      link: "https://smartplanning.fr/",
    },
    {
      title: "Cabinet Infirmier Graslin",
      description:
        "Site vitrine élégant pour un cabinet infirmier à Nantes. Présentation des services, prise de rendez-vous facilitée et informations pratiques pour les patients du quartier Graslin.",
      image: "/assets/images/graslin.jpg",
      alt: "Cabinet Infirmier Graslin Nantes - Site vitrine professionnel",
      tags: ["Site vitrine", "Santé", "Référencement local"],
      link: "https://cabinet-infirmier-graslin.fr/",
    },
    {
      title: "Poulp Fiction",
      description:
        "Site web dynamique et immersif pour un centre de plongée à Saint-Cyprien. Animations fluides, présentation des formations et réservation simplifiée pour attirer de nouveaux plongeurs.",
      image: "/assets/images/poulpfiction.jpg",
      alt: "Poulp Fiction - Site web centre de plongée Saint-Cyprien",
      tags: ["Site vitrine", "Animations", "Tourisme"],
      link: "https://poulpfiction.netlify.app/",
    },
    {
      title: "methodea.fr",
      description:
        "Refonte complète d'un site vitrine pour une meilleure visibilité en ligne. Design moderne, responsive et formulaire de contact connecté pour ne manquer aucune opportunité commerciale.",
      image: "/assets/images/methodea.png",
      alt: "Methodea - Refonte site vitrine professionnel",
      tags: ["Refonte", "Design moderne", "Formulaire contact"],
      link: "https://methodea.netlify.app/",
    },
    {
      title: "coachtfe.fr",
      description:
        "Site professionnel pour un coach sportif avec une présentation claire des prestations. Interface moderne qui inspire confiance et incite les visiteurs à prendre contact.",
      image: "/assets/images/coachtfe.png",
      alt: "CoachTFE - Site professionnel coach sportif",
      tags: ["Site vitrine", "Sport & Bien-être", "Conversion"],
      link: "https://coachtfe.fr/",
    },
    {
      title: "Garage Parrot",
      description:
        "Site complet pour un garage automobile avec système de rendez-vous en ligne et catalogue de véhicules d'occasion. Gestion simplifiée pour le gérant et ses employés via un espace administration dédié.",
      image: "/assets/images/garage.jpg",
      alt: "Garage Parrot - Site gestion garage automobile",
      tags: ["Site complet", "Réservation en ligne", "Espace admin"],
      link: "https://garageparrot.space/",
    },
  ];

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    skipSnaps: false,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  const generatePortfolioStructuredData = () => {
    return projects.map((project) => ({
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      name: project.title,
      description: project.description,
      image: `https://christophe-dev-freelance.fr${project.image}`,
      url: project.link,
      creator: {
        "@type": "Person",
        name: "Christophe Mostefaoui",
        url: "https://christophe-dev-freelance.fr",
      },
      keywords: project.tags.join(", "),
      dateCreated: "2024",
    }));
  };

  return (
    <>
      <Helmet>
        {generatePortfolioStructuredData().map((data, index) => (
          <script key={`portfolio-product-${index}`} type="application/ld+json">
            {JSON.stringify(data)}
          </script>
        ))}
      </Helmet>

      <FuturisticBackground
        id="portfolio"
        className="py-20 overflow-hidden"
        orbs={[
          { size: 280, colorClass: "glowing-orb-cyan", left: "5%", top: "20%", delay: 0 },
          { size: 240, colorClass: "glowing-orb-purple", left: "85%", top: "60%", delay: 1.5 },
          { size: 180, colorClass: "glowing-orb-pink", left: "40%", top: "85%", delay: 3 },
        ]}
        shapes={[
          { delay: 0, duration: 12, size: 45, left: "8%", top: "35%", shape: "hexagon" },
          { delay: 1.5, duration: 14, size: 50, left: "90%", top: "25%", shape: "circle" },
          { delay: 2.5, duration: 10, size: 40, left: "95%", top: "80%", shape: "square" },
        ]}
        codeLines={[
          { delay: 0.5, width: "45%" },
          { delay: 2, width: "60%" },
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
            <motion.h2
              variants={itemVariants}
              className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
            >
              Mes Réalisations
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-xl text-gray-600 dark:text-gray-300"
            >
              Des projets concrets pour des clients satisfaits
            </motion.p>
          </motion.div>

          {/* Carousel Container */}
          <div className="relative max-w-6xl mx-auto">
            {/* Navigation Buttons */}
            <motion.button
              onClick={scrollPrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-full shadow-lg hover:shadow-xl transition-all duration-300 -translate-x-4 md:-translate-x-6 border border-gray-200/50 dark:border-gray-700/50"
              aria-label="Projet précédent"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft className="w-6 h-6 text-gray-700 dark:text-gray-300" />
            </motion.button>

            <motion.button
              onClick={scrollNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-full shadow-lg hover:shadow-xl transition-all duration-300 translate-x-4 md:translate-x-6 border border-gray-200/50 dark:border-gray-700/50"
              aria-label="Projet suivant"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronRight className="w-6 h-6 text-gray-700 dark:text-gray-300" />
            </motion.button>

            {/* Embla Carousel */}
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex">
                {projects.map((project, index) => (
                  <div
                    key={project.title}
                    className="flex-[0_0_100%] min-w-0 md:flex-[0_0_80%] lg:flex-[0_0_70%] px-4"
                  >
                    <motion.div
                      initial={{ opacity: 0.5, scale: 0.95 }}
                      animate={{
                        opacity: selectedIndex === index ? 1 : 0.5,
                        scale: selectedIndex === index ? 1 : 0.95,
                      }}
                      transition={{ duration: 0.3 }}
                      className="card-futuristic overflow-hidden"
                    >
                      <div className="card-futuristic-glow" />
                      {/* Image Container */}
                      <div className="relative aspect-video overflow-hidden">
                        <img
                          src={project.image}
                          alt={project.alt}
                          loading="lazy"
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src =
                              "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80";
                          }}
                        />
                        {/* Overlay avec lien */}
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end justify-center pb-6 opacity-0 hover:opacity-100 transition-opacity duration-300"
                        >
                          <span className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-900 rounded-full font-semibold shadow-lg hover:shadow-xl transition-shadow">
                            Voir le site
                            <ExternalLink className="w-4 h-4" />
                          </span>
                        </a>
                      </div>

                      {/* Content */}
                      <div className="p-6 md:p-8 relative z-10">
                        <div className="flex items-start justify-between gap-4 mb-4">
                          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                            {project.title}
                          </h3>
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-shrink-0 p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
                            aria-label={`Visiter ${project.title}`}
                          >
                            <ExternalLink className="w-5 h-5" />
                          </a>
                        </div>

                        <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                          {project.description}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2">
                          {project.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-4 py-1.5 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium border border-blue-100 dark:border-blue-800"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </div>
                ))}
              </div>
            </div>

            {/* Dots Navigation */}
            <div className="flex justify-center gap-2 mt-8">
              {projects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => scrollTo(index)}
                  className={`h-3 rounded-full transition-all duration-300 ${
                    selectedIndex === index
                      ? "bg-blue-600 dark:bg-blue-400 w-8"
                      : "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500 w-3"
                  }`}
                  aria-label={`Aller au projet ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <motion.div
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 0.8 }}
          >
            <div className="inline-flex flex-col items-center gap-6">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                Vous avez un projet en tête ?
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl">
                Discutons de votre projet et voyons comment je peux vous aider
              </p>
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
                    location="portfolio"
                    testId="portfolio_cta"
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </FuturisticBackground>
    </>
  );
}
