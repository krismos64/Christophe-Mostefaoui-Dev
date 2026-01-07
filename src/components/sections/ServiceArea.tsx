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

export default function ServiceArea() {
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

      <section
        id="zone-intervention"
        className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300"
      >
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Zone d'intervention
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Proche de vous ou à distance, je m'adapte à vos besoins
            </p>
          </div>

          {/* 2 blocs côte à côte */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {/* Bloc Local (64) */}
            <div
              className="group relative bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-slideIn"
              style={{ animationDelay: "0.1s" }}
            >
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

            {/* Bloc France */}
            <div
              className="group relative bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-slideIn"
              style={{ animationDelay: "0.2s" }}
            >
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
          </div>

          {/* Timeline "Comment ça se passe" */}
          <div
            className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-8 md:p-10 mb-12 animate-slideIn"
            style={{ animationDelay: "0.3s" }}
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">
              Un projet ? Voici comment on travaille ensemble
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {processSteps.map((step, index) => (
                <div
                  key={step.step}
                  className="relative flex flex-col items-center text-center animate-slideIn"
                  style={{ animationDelay: `${0.4 + index * 0.1}s` }}
                >
                  {/* Ligne de connexion (sauf dernier élément) */}
                  {index < processSteps.length - 1 && (
                    <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-gradient-to-r from-blue-300 to-indigo-300 dark:from-blue-700 dark:to-indigo-700" />
                  )}

                  {/* Numéro avec icône */}
                  <div className="relative z-10 w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white mb-4 shadow-lg">
                    {step.icon}
                  </div>

                  {/* Texte */}
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                    {step.title}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
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
        </div>
      </section>
    </>
  );
}
