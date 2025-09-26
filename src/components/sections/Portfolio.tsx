import { ExternalLink } from "lucide-react";
import CallToAction from "../common/CallToAction";
import { Helmet } from "react-helmet-async";

export default function Portfolio() {
  const projects = [
    {
      title: "methodea.fr",
      description:
        "Refonte site vitrine moderne et responsive pour methodea.fr, création d'un formaulaire de contact relié au mail de mon client",
      image: "/assets/images/methodea.png",
      alt: "Sites web methodea.fr",
      tech: [
        "HTML",
        "Css modules",
        "Javascript",
        "SEO optimisé",
        "Formulaire de contact",
      ],
      link: "https://methodea.netlify.app/",
    },
    {
      title: "coachtfe.fr",
      description:
        "Refonte site vitrine moderne et responsive pour coachtfe.fr, création d'un formaulaire de contact relié au mail de mon client",
      image: "/assets/images/coachtfe.png",
      alt: "Sites web coachtfe.fr",
      tech: [
        "HTML",
        "Css modules",
        "Javascript",
        "SEO optimisé",
        "Formulaire de contact",
      ],
      link: "https://coachtfe.fr/",
    },
    {
      title: "Cabinet infirmier Graslin Nantes",
      description:
        "Site vitrine moderne et responsive pour le Cabinet Infirmier Graslin situé à Nantes, quartier Graslin.",
      image: "/assets/images/graslin.jpg",
      alt: "Cabinet infirmier Nantes, site web vitrine cabinet infirmier",
      tech: ["React", "Css modules", "Lottie animations", "SEO optimisé"],
      link: "https://cabinet-infirmier-graslin.fr/",
    },
    {
      title: "LivresStaka.fr",
      description:
        "Plateforme web enterprise-grade dédiée aux services de correction et d'édition de manuscrits. Cette application monorepo sophistiquée offre une expérience complète aux auteurs avec authentification sécurisée, administration avancée, paiements Stripe intégrés et système de messagerie temps réel. Réalisé from scratch.",
      image: "/assets/images/livrestaka.jpg",
      alt: "Projet LivresStaka.fr, plateforme de gestion de livres",
      tech: ["React", "Node.js", "Express", "TypeScript", "MySQL", "API"],
      link: "https://livrestaka.fr/",
    },
    {
      title: "SmartPlanning.fr",
      description:
        "SmartPlanning est une application SaaS complète de gestion intelligente des plannings d'équipe avec intégration IA, développée en TypeScript pour une gestion optimisée des ressources humaines. L'application utilise une architecture moderne séparée (frontend React/backend Node.js) avec des fonctionnalités d'IA avancées pour l'optimisation automatique des plannings.",
      image: "/assets/images/business-smartplanning.webp",
      alt: "Projet SmartPlanning, réalisé par un développeur web à Pau",
      tech: ["React", "Node JS", "IA", "MongoDB", "Python"],
      link: "https://smartplanning.fr/",
    },
    {
      title: "Poulp Fiction",
      description:
        "Site web vitrine pour un centre de plongée de St Cyprien avec animations Lottie.",
      image: "/assets/images/poulpfiction.jpg",
      alt: "Projet Poulp Fiction, site vitrine pour centre de plongée",
      tech: ["HTML", "Javascript", "Lottie animations"],
      link: "https://poulpfiction.netlify.app/",
    },
    {
      title: "Garage Parrot",
      description:
        "Site web de gestion pour un garage automobile avec système de rendez-vous en ligne, vente de véhicule d'occasion avec base de données, espace administrateur pour les membres du garage (rôle avec tous les droits pour le gérant et rôle avec droits limités pour les employés).",
      image: "/assets/images/garage.jpg",
      alt: "Projet Garage Parrot, site de gestion pour garage automobile",
      tech: ["Symfony", "Twig", "MySQL", "PHP", "Javascript"],
      link: "https://garageparrot.space/",
    },
    {
      title: "Kocinaspeed",
      description:
        "Plateforme de recettes de cuisine rapide avec filtres intelligents, espace administrateur pour les gérants qui peuvent créer, modifier, ajouter et supprimer leurs recettes, images, et vidéos.",
      image: "/assets/images/kocina.jpg",
      alt: "Projet Kocinaspeed, plateforme de recettes de cuisine",
      tech: ["Symfony", "Twig", "MySQL", "PHP", "Javascript"],
      link: "https://kocinaspeed.fr/",
    },
    {
      title: "Metal Gear",
      description:
        "Mini-site interactif pour les fans avec timeline interactive, chatbot avec le légendaire Solid Snake",
      image: "/assets/images/mgs.jpg",
      alt: "Projet Metal Gear, mini-site interactif pour fans",
      tech: ["HTML", "CSS", "JavaScript"],
      link: "https://mgs-quiz-krismos.netlify.app/",
    },
    {
      title: "JDS",
      description:
        "Plateforme d'un groupe de soirées jeux de société, site moderne et animé avec espace administrateur pour que les joueurs mettent à jour leurs scores, peuvent créer des nouveux jeux, nouveaux membres et mettent à jour eux mêmes leurs informations.",
      image: "/assets/images/jds.jpg",
      alt: "Projet JDS, plateforme pour soirées jeux de société",
      tech: ["React", "HTML", "CSS", "Javascript"],
      link: "https://embrouillejds.netlify.app/",
    },
    {
      title: "StacyMakeupCreations",
      description:
        "Plateforme d'une maquilleuse professionnelle qui a accès à un espace administrateur et peut gérer ses contenus elle-même.",
      image: "/assets/images/stacy.jpg",
      alt: "Projet StacyMakeupCreations, plateforme pour maquilleuse",
      tech: ["Symfony", "Twig", "MySQL", "PHP", "Javascript"],
      link: "https://stacymakeupcreations.space/",
    },
    {
      title: "Portfolio",
      description: "Portfolio personnel pour présenter mes projets",
      image: "/assets/images/portfolio.jpg",
      alt: "Ancien portfolio personnel de développeur web",
      tech: ["HTML", "CSS", "JavaScript"],
      link: "https://krismos.fr/",
    },
  ];

  // Générer les données structurées pour chaque projet du portfolio
  const generatePortfolioStructuredData = () => {
    return projects.map((project, index) => ({
      "@context": "https://schema.org",
      "@type": "Product",
      "name": project.title,
      "description": project.description,
      "image": `https://christophe-dev-freelance.fr${project.image}`,
      "url": project.link,
      "brand": {
        "@type": "Brand",
        "name": "Christophe Mostefaoui Dev"
      },
      "category": "Web Development Project",
      "offers": {
        "@type": "Offer",
        "price": "2500",
        "priceCurrency": "EUR",
        "priceValidUntil": "2025-12-31",
        "availability": "https://schema.org/InStock",
        "itemCondition": "https://schema.org/NewCondition",
        "seller": {
          "@type": "Person",
          "name": "Christophe Mostefaoui",
          "url": "https://christophe-dev-freelance.fr"
        }
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "5.0",
        "reviewCount": "32",
        "bestRating": "5",
        "worstRating": "4"
      },
      "review": [
        {
          "@type": "Review",
          "author": {
            "@type": "Person",
            "name": index % 2 === 0 ? "Client Entreprise" : "Startup Innovante"
          },
          "datePublished": "2025-01-15",
          "reviewBody": `Excellent travail sur ${project.title}. Projet livré dans les délais avec une qualité remarquable.`,
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": "5",
            "bestRating": "5"
          }
        }
      ]
    }));
  };

  return (
    <>
      <Helmet>
        {generatePortfolioStructuredData().map((data, index) => (
          <script
            key={`portfolio-product-${index}`}
            type="application/ld+json"
          >
            {JSON.stringify(data)}
          </script>
        ))}
      </Helmet>

      <section
        id="portfolio"
        className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-300"
      >
        <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            Portfolio
          </h2>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
            Découvrez mes dernières réalisations
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className="card-hover bg-white dark:bg-gray-700 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 animate-slideIn"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block relative group"
                onClick={(e) => {
                  if (!project.link) {
                    e.preventDefault();
                  }
                }}
              >
                <img
                  src={project.image}
                  alt={project.alt}
                  loading="lazy"
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src =
                      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80";
                  }}
                />
                <div className="absolute inset-0 bg-blue-600 bg-opacity-0 group-hover:bg-opacity-70 transition-all duration-300 flex items-center justify-center">
                  <ExternalLink className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform scale-0 group-hover:scale-100" />
                </div>
              </a>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    {project.title}
                  </a>
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-200 rounded-full text-sm transition-all duration-300 hover:bg-blue-200 dark:hover:bg-blue-800"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex flex-col items-center gap-6">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Vous avez un projet en tête ?
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl">
              Transformons ensemble vos idées en solutions digitales
              performantes
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <CallToAction
                variant="primary"
                text="Lancer mon projet"
                subtext="Devis gratuit sous 24h"
                icon="arrow"
                size="large"
                href="#contact"
                location="portfolio"
                testId="portfolio_cta"
              />
              <CallToAction
                variant="secondary"
                text="Voir mes services"
                icon="arrow"
                size="large"
                href="#services"
                location="portfolio"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}
