import Lottie from "lottie-react";
import { Code, Cpu, Users, Zap } from "lucide-react";
import chatbotAnimation from "../../animations/chatbot.json";

export default function About() {
  const skills = [
    {
      icon: <Code className="h-6 w-6 text-blue-600 dark:text-blue-400" />,
      title: "Expertise Technique",
      description:
        "Maîtrise de React, Next JS, Express, Node.js et des API REST",
    },
    {
      icon: <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />,
      title: "Communication",
      description: "Collaboration étroite et transparente avec les clients",
    },
    {
      icon: <Zap className="h-6 w-6 text-blue-600 dark:text-blue-400" />,
      title: "Solutions Innovantes",
      description: "Approche créative et orientée résultats",
    },
    {
      icon: <Cpu className="h-6 w-6 text-blue-600 dark:text-blue-400" />,
      title: "Veille Technologique",
      description: "Toujours à jour avec les dernières technologies",
    },
  ];

  return (
    <section
      id="about"
      className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-300 relative overflow-hidden"
    >
      {/* Animation en arrière-plan pour les écrans mobiles */}
      <div className="absolute inset-0 opacity-5 md:hidden pointer-events-none">
        <Lottie animationData={chatbotAnimation} loop={true} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            À propos
          </h2>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
            🚀 Passionné par le développement web et les nouvelles technologies
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Animation visible uniquement sur les écrans moyens et grands */}
          <div className="hidden md:block">
            <Lottie animationData={chatbotAnimation} loop={true} />
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              ✨ Ce que je vous propose :
            </h3>
            <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 leading-relaxed space-y-4">
              <li>
                💻 <strong>Développement de solutions web performantes</strong>{" "}
                : utilisation des technologies modernes comme{" "}
                <strong>React</strong>, <strong>Next JS</strong>,{" "}
                <strong>Express</strong> et <strong>Node.js</strong> pour des
                résultats <strong>sur mesure</strong>.
              </li>
              <li>
                🤝 <strong>Approche personnalisée</strong> : collaboration
                directe et régulière avec des{" "}
                <strong>déplacements gratuits</strong> dans la région{" "}
                <strong>Pau-Orthez-Tarbes-Béarn et allentours</strong>.
              </li>
              <li>
                📋 <strong>Documentation détaillée</strong> : livrables clairs
                et complets, depuis le <strong>cahier des charges</strong>{" "}
                jusqu'aux <strong>spécifications techniques</strong>.
              </li>
              <li>
                ✅ <strong>Engagement qualité</strong> : respect des{" "}
                <strong>délais</strong>, solutions optimisées, et souci constant
                de l'<strong>expérience utilisateur</strong>.
              </li>
              <li>
                🎓 <strong>Formation et accompagnement</strong> : possibilité de{" "}
                <strong>former vos équipes</strong> à l'utilisation des outils
                développés.
              </li>
            </ul>

            <div className="grid grid-cols-2 gap-6 mt-6">
              {skills.map((skill) => (
                <div key={skill.title} className="flex items-start space-x-3">
                  {skill.icon}
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {skill.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {skill.description}
                    </p>
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
