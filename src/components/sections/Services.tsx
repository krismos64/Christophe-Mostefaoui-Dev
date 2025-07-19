import {
  Car,
  FileText,
  Globe,
  MessageSquare,
  Palette,
  Search,
  Server,
  Shield,
  Wrench,
} from "lucide-react";

export default function Services() {
  const services = [
    {
      icon: <Globe className="h-8 w-8 text-blue-600 dark:text-blue-400" />,
      title: "Sites Web Sur Mesure",
      description:
        "Développement de sites web modernes et responsifs avec React et Node JS. Devis personnalisés adaptés à vos besoins.",
    },
    {
      icon: <Server className="h-8 w-8 text-blue-600 dark:text-blue-400" />,
      title: "Applications Web",
      description:
        "Création d'applications web sécurisées et performantes avec documentation détaillée du projet.",
    },
    {
      icon: <Wrench className="h-8 w-8 text-blue-600 dark:text-blue-400" />,
      title: "Refonte de Sites",
      description:
        "Modernisation et optimisation de sites web existants pour améliorer leurs performances et leur design.",
    },
    {
      icon: <FileText className="h-8 w-8 text-blue-600 dark:text-blue-400" />,
      title: "Documentation Complète",
      description:
        "Rédaction détaillée des spécifications, cahier des charges et documentation technique de votre projet.",
    },
    {
      icon: <Palette className="h-8 w-8 text-blue-600 dark:text-blue-400" />,
      title: "Design & Maquettes",
      description:
        "Création de maquettes personnalisées, rédaction de contenus et retouches graphiques pour votre site.",
    },
    {
      icon: <Search className="h-8 w-8 text-blue-600 dark:text-blue-400" />,
      title: "Référencement",
      description:
        "Optimisation SEO pour améliorer la visibilité de votre site sur les moteurs de recherche.",
    },
    {
      icon: <Shield className="h-8 w-8 text-blue-600 dark:text-blue-400" />,
      title: "Sécurité",
      description:
        "Implémentation des meilleures pratiques de sécurité web et maintenance régulière.",
    },
    {
      icon: <Car className="h-8 w-8 text-blue-600 dark:text-blue-400" />,
      title: "Déplacement Gratuit",
      description:
        "Consultation gratuite sur site pour les entreprises locales (Pau, Orthez, Bayonne, Tarbes).",
    },
    {
      icon: (
        <MessageSquare className="h-8 w-8 text-blue-600 dark:text-blue-400" />
      ),
      title: "Suivi Personnalisé",
      description:
        "Contact direct et régulier tout au long du projet pour garantir votre satisfaction.",
    },
  ];

  return (
    <section
      id="services"
      className="py-20 transition-colors duration-300 dark:bg-gray-900"
    >
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            Mes Services
          </h2>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
            Des solutions complètes et adaptées à vos besoins
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="group card-hover p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 animate-slideIn"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="mb-4 transform transition-transform duration-300 group-hover:scale-110">
                <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-full inline-block">
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
      </div>
    </section>
  );
}
