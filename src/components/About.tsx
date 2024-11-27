import { Code, Cpu, Users, Zap } from "lucide-react";

export default function About() {
  const skills = [
    {
      icon: <Code className="h-6 w-6 text-blue-600" />,
      title: "Expertise Technique",
      description: "Maîtrise de React, Symfony, Node.js et des API REST",
    },
    {
      icon: <Users className="h-6 w-6 text-blue-600" />,
      title: "Communication",
      description: "Collaboration étroite et transparente avec les clients",
    },
    {
      icon: <Zap className="h-6 w-6 text-blue-600" />,
      title: "Solutions Innovantes",
      description: "Approche créative et orientée résultats",
    },
    {
      icon: <Cpu className="h-6 w-6 text-blue-600" />,
      title: "Veille Technologique",
      description: "Toujours à jour avec les dernières technologies",
    },
  ];

  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            À propos
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Passionné par le développement web et les nouvelles technologies
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <img
              src="https://images.unsplash.com/photo-1544725121-be3bf52e2dc8?auto=format&fit=crop&q=80"
              alt="Developer portrait"
              className="rounded-lg shadow-lg"
            />
          </div>
          <div>
            <p className="text-gray-600 leading-relaxed mb-6">
              Je mets aujourd'hui mes compétences au service de vos projets.
              Spécialisé dans les technologies modernes comme React, Symfony et
              Node.js, je crée des solutions web performantes et sur mesure. Je
              privilégie une approche personnalisée avec un contact direct et
              régulier, incluant des déplacements gratuits dans le secteur
              Pau-Orthez-Bayonne-Tarbes pour les entreprises locales. Chaque
              projet bénéficie d'une documentation détaillée, depuis le cahier
              des charges jusqu'aux spécifications techniques.
            </p>
            <div className="grid grid-cols-2 gap-6">
              {skills.map((skill) => (
                <div key={skill.title} className="flex items-start space-x-3">
                  {skill.icon}
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {skill.title}
                    </h3>
                    <p className="text-sm text-gray-600">{skill.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
