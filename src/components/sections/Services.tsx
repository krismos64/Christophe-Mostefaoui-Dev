import {
  Globe,
  Layers,
  RefreshCw,
  Search,
  Bot,
  Video,
  Sparkles,
} from "lucide-react";
import CallToAction from "../common/CallToAction";

export default function Services() {
  const services = [
    {
      icon: <Bot className="h-8 w-8 text-purple-600 dark:text-purple-400" />,
      title: "Intégration IA sur mesure",
      description:
        "Ajoutez un assistant virtuel intelligent à votre site pour répondre aux questions de vos clients 24h/24, 7j/7",
      highlight: true,
    },
    {
      icon: <Globe className="h-8 w-8 text-blue-600 dark:text-blue-400" />,
      title: "Site Vitrine Moderne",
      description:
        "Un site professionnel qui vous représente, visible sur Google et référencé par les assistants IA comme ChatGPT ou Claude",
    },
    {
      icon: <Layers className="h-8 w-8 text-blue-600 dark:text-blue-400" />,
      title: "Site Multi-pages",
      description:
        "Un site complet avec plusieurs pages, un blog pour votre actualité et un formulaire de contact pour vos prospects",
    },
    {
      icon: <RefreshCw className="h-8 w-8 text-blue-600 dark:text-blue-400" />,
      title: "Refonte de Site",
      description:
        "Modernisez votre site existant pour une image professionnelle et une meilleure visibilité en ligne",
    },
    {
      icon: <Search className="h-8 w-8 text-blue-600 dark:text-blue-400" />,
      title: "Référencement Google & IA",
      description:
        "Soyez trouvé sur Google ET recommandé par les intelligences artificielles comme ChatGPT, Claude ou Perplexity",
    },
    {
      icon: <Video className="h-8 w-8 text-blue-600 dark:text-blue-400" />,
      title: "Vidéo & Drone",
      description:
        "Valorisez votre entreprise avec des vidéos professionnelles et des prises de vue aériennes spectaculaires",
      badge: "/assets/images/badge-drone.png",
    },
  ];

  return (
    <section
      id="services"
      className="py-20 transition-colors duration-300 dark:bg-gray-900"
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-4">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Mes Services
            </h2>
            <img
              src="/assets/images/badge-dev.png"
              alt="Certification Développeur"
              className="w-20 h-20 object-contain"
            />
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Des sites web optimisés pour Google et les assistants IA.
            <br className="hidden sm:block" />
            Clients partout en France – déplacement offert dans le 64.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={service.title}
              className={`group card-hover p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 animate-slideIn relative ${
                service.highlight
                  ? "ring-2 ring-purple-500 dark:ring-purple-400 transform scale-105"
                  : ""
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {service.highlight && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="px-3 py-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-bold rounded-full flex items-center gap-1">
                    <Sparkles className="h-4 w-4" />
                    NOUVEAU
                  </span>
                </div>
              )}
              {service.badge && (
                <img
                  src={service.badge}
                  alt="Badge certification DGAC"
                  className="absolute top-4 right-4 w-16 h-16 object-contain"
                />
              )}
              <div className="mb-4 transform transition-transform duration-300 group-hover:scale-110">
                <div
                  className={`p-3 ${
                    service.highlight
                      ? "bg-purple-50 dark:bg-purple-900/30"
                      : "bg-blue-50 dark:bg-blue-900/30"
                  } rounded-full inline-block`}
                >
                  {service.icon}
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {service.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex flex-col items-center gap-6">
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Un projet en tête ? Parlons-en !
            </p>
            <CallToAction
              variant="gradient"
              text="Demander un devis gratuit"
              subtext="Réponse sous 24h"
              icon="send"
              size="large"
              href="#contact"
              location="services"
              testId="services_cta"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
