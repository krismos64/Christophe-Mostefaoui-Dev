import { ExternalLink } from "lucide-react";

export default function Portfolio() {
  const projects = [
    {
      title: "Garage Parrot",
      description:
        "Site de gestion pour un garage automobile avec système de rendez-vous en ligne",
      image: "/assets/images/garage.jpg",
      alt: "site web garage Vincent Parrot",
      tech: ["Symfony", "Twig", "MySQL"],
      link: "https://parrotgarage.site/",
    },
    {
      title: "Kocinaspeed",
      description:
        "Plateforme de recettes de cuisine rapide avec filtres intelligents et chatbot interractif",
      image: "/assets/images/kocina.jpg",
      alt: "site web de recettes de cuisine Kocinaspeed",
      tech: ["Symfony", "Twig", "MySQL"],
      link: "https://kocinaspeed.fr/",
    },
    {
      title: "Metal Gear",
      description:
        "Mini-site interactif pour les fans avec timeline interactive",
      image: "/assets/images/mgs.jpg",
      alt: "site web Metal Gear Chronicles",
      tech: ["HTML", "CSS", "JavaScript"],
      link: "https://mgs-quiz-krismos.netlify.app/",
    },
    {
      title: "JDS",
      description: "Plateforme d'un groupe de soirées jeux de société",
      image: "/assets/images/jds.jpg",
      alt: "site web JDS soirées jeux de société",
      tech: ["HTML", "CSS", "Javascript"],
      link: "https://embrouillejds.netlify.app/",
    },
    {
      title: "StacyMakeupCreations",
      description: "Plateforme d'une maquilleuse professionnelle",
      image: "/assets/images/stacy.jpg",
      alt: "site web StacyMakeupCreations",
      tech: ["Symfony", "Twig", "MySQL"],
      link: "https://stacymakeupcreations.website/",
    },
    {
      title: "Portfolio",
      description: "Portfolio personnel pour présenter mes projets",
      image: "/assets/images/portfolio.jpg",
      alt: "Portfolio personnel",
      tech: ["HTML", "CSS", "JavaScript"],
      link: "https://krismos.fr/",
    },
  ];

  return (
    <section id="portfolio" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Portfolio
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Découvrez mes dernières réalisations
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.title}
              className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow group"
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
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src =
                      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80";
                  }}
                />
                <div className="absolute inset-0 bg-blue-600 bg-opacity-0 group-hover:bg-opacity-70 transition-all flex items-center justify-center">
                  <ExternalLink className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </a>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-600 transition-colors"
                  >
                    {project.title}
                  </a>
                </h3>
                <p className="text-gray-600 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm"
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
