import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  FileText,
  Globe,
  MapPin,
  Phone,
  RefreshCw,
  Rocket,
} from "lucide-react";
import { Helmet } from "react-helmet-async";
import CallToAction from "../common/CallToAction";
import FuturisticBackground from "../effects/FuturisticBackground";
import { containerVariants, itemVariants, createCardVariants } from "../effects/FuturisticEffects";

export default function ServiceArea() {
  const contentRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(contentRef, { once: true, margin: "-100px" });

  const localCities = [
    "Pau",
    "Bayonne",
    "Biarritz",
    "Anglet",
    "Orthez",
    "Oloron-Sainte-Marie",
    "Mourenx",
    "Lescar",
    "Billère",
    "Jurançon",
    "Lons",
    "Artix",
    "Hasparren",
    "Saint-Jean-de-Luz",
    "Hendaye",
  ];

  const nationalCities = [
    "Paris",
    "Lyon",
    "Marseille",
    "Toulouse",
    "Bordeaux",
    "Nantes",
    "Lille",
    "Strasbourg",
    "Nice",
    "Montpellier",
  ];

  const processSteps = [
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Premier échange",
      description: "Téléphone, mail ou visio (gratuit)",
      step: 1,
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: "Devis détaillé",
      description: "Sous 24/48h",
      step: 2,
    },
    {
      icon: <Rocket className="h-6 w-6" />,
      title: "Lancement",
      description: "Après validation",
      step: 3,
    },
    {
      icon: <RefreshCw className="h-6 w-6" />,
      title: "Suivi régulier",
      description: "Jusqu'à la livraison",
      step: 4,
    },
  ];

  const cardVariants = createCardVariants(0.2, 0.15);

  // Schema.org pour SEO local
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Christophe Mostefaoui - Développeur Web Freelance",
    description:
      "Développeur web freelance spécialisé en création de sites internet, applications web et intégration IA. Déplacement gratuit dans les Pyrénées-Atlantiques (64), disponible partout en France en distanciel.",
    url: "https://christophe-dev-freelance.fr",
    telephone: "+33-6-XX-XX-XX-XX",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Pau",
      addressRegion: "Pyrénées-Atlantiques",
      postalCode: "64000",
      addressCountry: "FR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 43.2951,
      longitude: -0.3708,
    },
    areaServed: [
      {
        "@type": "AdministrativeArea",
        name: "Pyrénées-Atlantiques",
        sameAs: "https://fr.wikipedia.org/wiki/Pyr%C3%A9n%C3%A9es-Atlantiques",
      },
      {
        "@type": "Country",
        name: "France",
      },
    ],
    serviceArea: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: 46.603354,
        longitude: 1.888334,
      },
      geoRadius: "1000 km",
    },
    priceRange: "€€",
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(localBusinessSchema)}
        </script>
      </Helmet>

      <FuturisticBackground
        id="zone-intervention"
        orbs={[
          { size: 280, colorClass: "glowing-orb-cyan", left: "8%", top: "20%", delay: 0 },
          { size: 240, colorClass: "glowing-orb-purple", left: "88%", top: "60%", delay: 1.5 },
          { size: 180, colorClass: "glowing-orb-pink", left: "50%", top: "85%", delay: 3 },
        ]}
        shapes={[
          { delay: 0, duration: 12, size: 45, left: "5%", top: "35%", shape: "hexagon" },
          { delay: 1.5, duration: 14, size: 50, left: "93%", top: "25%", shape: "circle" },
          { delay: 2.5, duration: 10, size: 40, left: "90%", top: "80%", shape: "square" },
        ]}
        codeLines={[
          { delay: 0.5, width: "45%" },
          { delay: 2, width: "55%" },
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
              Zone d'intervention
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-xl text-gray-600 dark:text-gray-300"
            >
              Proche de vous ou à distance, je m'adapte à vos besoins
            </motion.p>
          </motion.div>

          {/* 2 blocs côte à côte */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {/* Bloc Local (64) */}
            <motion.div
              custom={0}
              variants={cardVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              whileHover={{ scale: 1.02, y: -4 }}
              className="group card-futuristic p-8"
            >
              <div className="card-futuristic-glow" />
              <div className="relative z-10">
                {/* Icône */}
                <div className="mb-6">
                  <div className="p-4 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl inline-block text-white transition-transform duration-300 group-hover:scale-110">
                    <MapPin className="h-8 w-8" />
                  </div>
                </div>

                {/* Titre */}
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  Déplacement gratuit dans le 64
                </h3>

                {/* Description */}
                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  Je me déplace gratuitement pour un premier rendez-vous dans tout
                  le département des Pyrénées-Atlantiques :
                </p>

                {/* Villes en pills */}
                <div className="flex flex-wrap gap-2">
                  {localCities.map((city) => (
                    <span
                      key={city}
                      className="px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium border border-blue-100 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors"
                    >
                      {city}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Bloc France */}
            <motion.div
              custom={1}
              variants={cardVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              whileHover={{ scale: 1.02, y: -4 }}
              className="group card-futuristic p-8"
            >
              <div className="card-futuristic-glow" />
              <div className="relative z-10">
                {/* Icône */}
                <div className="mb-6">
                  <div className="p-4 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl inline-block text-white transition-transform duration-300 group-hover:scale-110">
                    <Globe className="h-8 w-8" />
                  </div>
                </div>

                {/* Titre */}
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  Partout en France en distanciel
                </h3>

                {/* Description */}
                <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                  Je travaille avec des clients dans toute la France grâce aux
                  outils modernes : visioconférence, partage d'écran, messagerie
                  instantanée.
                </p>
                <p className="text-gray-600 dark:text-gray-300 mb-6 font-medium">
                  La distance n'est pas un obstacle !
                </p>

                {/* Grandes villes pour SEO */}
                <div className="flex flex-wrap gap-2">
                  {nationalCities.map((city) => (
                    <span
                      key={city}
                      className="px-3 py-1.5 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 rounded-full text-sm font-medium border border-emerald-100 dark:border-emerald-800 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 transition-colors"
                    >
                      {city}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Timeline "Comment ça se passe" */}
          <motion.div
            className="card-futuristic p-8 md:p-10 mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 0.4 }}
          >
            <div className="card-futuristic-glow" />
            <div className="relative z-10">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">
                Un projet ? Voici comment on travaille ensemble
              </h3>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {processSteps.map((step, index) => (
                  <motion.div
                    key={step.step}
                    className="relative flex flex-col items-center text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    {/* Ligne de connexion (sauf dernier élément) */}
                    {index < processSteps.length - 1 && (
                      <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-gradient-to-r from-blue-300 to-indigo-300 dark:from-blue-700 dark:to-indigo-700" />
                    )}

                    {/* Numéro avec icône */}
                    <motion.div
                      className="relative z-10 w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white mb-4 shadow-lg"
                      whileHover={{ scale: 1.1 }}
                    >
                      {step.icon}
                    </motion.div>

                    {/* Texte */}
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                      {step.title}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {step.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.8 }}
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
                  text="Discutons de votre projet"
                  subtext="Premier échange gratuit"
                  icon="message"
                  size="large"
                  href="#contact"
                  location="service-area"
                  testId="service_area_cta"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </FuturisticBackground>
    </>
  );
}
