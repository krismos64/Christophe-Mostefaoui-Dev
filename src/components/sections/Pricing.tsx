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

export default function Pricing() {
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

  return (
    <section
      id="tarifs"
      className="py-20 bg-gray-50 dark:bg-gray-900/50 transition-colors duration-300"
    >
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Tarifs indicatifs
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Une idée des prix pour préparer votre budget
          </p>
        </div>

        {/* Grille 3 cartes */}
        <div className="grid md:grid-cols-3 gap-8 mb-12 items-stretch">
          {plans.map((plan, index) => (
            <div
              key={plan.name}
              className={`group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1 animate-slideIn ${
                plan.popular
                  ? "ring-2 ring-blue-500 dark:ring-blue-400 md:scale-105 z-10"
                  : ""
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Badge populaire */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
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
            </div>
          ))}
        </div>

        {/* Mention indicative */}
        <p className="text-center text-gray-500 dark:text-gray-400 italic mb-12 max-w-2xl mx-auto">
          Chaque projet est unique. Ces tarifs sont donnés à titre indicatif et
          dépendent de la complexité et du temps de développement. Demandez
          votre devis personnalisé gratuit.
        </p>

        {/* Bloc Vidéo & Drone */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 md:p-10 text-white mb-12 shadow-xl">
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
        </div>

        {/* Badges réassurance */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {reassuranceBadges.map((badge, index) => (
            <div
              key={index}
              className="flex items-center justify-center gap-2 px-4 py-3 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-xl text-gray-700 dark:text-gray-200 text-sm font-medium shadow-sm"
            >
              <span className="text-blue-600 dark:text-blue-400">
                {badge.icon}
              </span>
              <span>{badge.text}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
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
      </div>
    </section>
  );
}
