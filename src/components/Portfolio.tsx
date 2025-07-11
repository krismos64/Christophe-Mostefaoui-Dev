import { ExternalLink } from "lucide-react";

export default function Portfolio() {
  const projects = [
    {
      title: "SmartPlanning",
      description: "Saas de gestion d'équipes et de plannings automatisés",
      image: "/assets/images/business-smartplanning.webp",
      alt: "Projet SmartPlanning, réalisé par un développeur web à Pau",
      tech: ["React", "Node JS", "IA", "MongoDB"],
      link: "https://smartplanning.fr/",
    },
    {
      title: "Poulp Fiction",
      description: "Site web vitrine pour un centre de plongée de St Cyprien",
      image: "/assets/images/poulpfiction.jpg",
      alt: "Projet Poulp Fiction, site vitrine pour centre de plongée",
      tech: ["HTML", "Javascript", "Lottie animations"],
      link: "https://poulpfiction.netlify.app/",
    },
    {
      title: "Garage Parrot",
      description:
        "Site de gestion pour un garage automobile avec système de rendez-vous en ligne",
      image: "/assets/images/garage.jpg",
      alt: "Projet Garage Parrot, site de gestion pour garage automobile",
      tech: ["Symfony", "Twig", "MySQL"],
      link: "https://garageparrot.space/",
    },
    {
      title: "Kocinaspeed",
      description:
        "Plateforme de recettes de cuisine rapide avec filtres intelligents et chatbot interractif",
      image: "/assets/images/kocina.jpg",
      alt: "Projet Kocinaspeed, plateforme de recettes de cuisine",
      tech: ["Symfony", "Twig", "MySQL"],
      link: "https://kocinaspeed.fr/",
    },
    {
      title: "Metal Gear",
      description:
        "Mini-site interactif pour les fans avec timeline interactive",
      image: "/assets/images/mgs.jpg",
      alt: "Projet Metal Gear, mini-site interactif pour fans",
      tech: ["HTML", "CSS", "JavaScript"],
      link: "https://mgs-quiz-krismos.netlify.app/",
    },
    {
      title: "JDS",
      description: "Plateforme d'un groupe de soirées jeux de société",
      image: "/assets/images/jds.jpg",
      alt: "Projet JDS, plateforme pour soirées jeux de société",
      tech: ["HTML", "CSS", "Javascript"],
      link: "https://embrouillejds.netlify.app/",
    },
    {
      title: "StacyMakeupCreations",
      description: "Plateforme d'une maquilleuse professionnelle",
      image: "/assets/images/stacy.jpg",
      alt: "Projet StacyMakeupCreations, plateforme pour maquilleuse",
      tech: ["Symfony", "Twig", "MySQL"],
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

  return (
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
      </div>
    </section>
  );
}
