import { ExternalLink } from "lucide-react";

export default function Portfolio() {
  const projects = [
    {
      title: "Garage Parrot",
      description:
        "Site de gestion pour un garage automobile avec système de rendez-vous en ligne",
      image: "/assets/images/garage.jpg",
      alt: "site web garage Vincent Parrot",
      tech: ["Symfony", "React", "MySQL"],
    },

    {
      title: "Kocinaspeed",
      description:
        "Plateforme de recettes de cuisine rapide avec filtres intelligents et chatbot interractif",
      image: "/assets/images/kocina.jpg",
      tech: ["React", "Node.js", "MongoDB"],
    },
    {
      title: "Metal Gear Chronicles",
      description:
        "Mini-site interactif pour les fans avec timeline interactive",
      image: "/assets/images/mgs.jpg",
      tech: ["React", "Three.js", "Firebase"],
    },
    {
      title: "JDS",
      description: "Plateforme d'un groupe de soirées jeux de société",
      image: "/assets/images/jds.jpg",
      tech: ["React", "Node.js", "MongoDB"],
    },
    {
      title: "StacyMakeupCreations",
      description: "Plateforme d'une maquilleuse professionnelle",
      image: "/assets/images/stacy.jpg",
      tech: ["React", "Node.js", "MongoDB"],
    },
    {
      title: "Portfolio",
      description: "Portfolio personnel pour présenter mes projets",
      image: "/assets/images/portfolio.jpg",
      tech: ["React", "Node.js", "MongoDB"],
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
              className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="relative group">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-blue-600 bg-opacity-0 group-hover:bg-opacity-70 transition-all flex items-center justify-center">
                  <ExternalLink className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {project.title}
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
