import Lottie from "lottie-react";
import chatbotAnimation from "../../animations/chatbot.json";
import CallToAction from "../common/CallToAction";

export default function About() {
  const differentiators = [
    {
      emoji: "💬",
      title: "Je parle votre langue",
      description: "Pas de jargon technique, des explications claires",
    },
    {
      emoji: "⚡",
      title: "Disponible et réactif",
      description: "Réponse sous 24h, suivi personnalisé",
    },
    {
      emoji: "🤝",
      title: "Présent après livraison",
      description: "Accompagnement et modifications incluses",
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
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Animation Lottie - Desktop uniquement */}
          <div className="hidden md:block flex-1">
            <Lottie animationData={chatbotAnimation} loop={true} />
          </div>

          {/* Contenu */}
          <div className="flex-1 text-center md:text-left">
            {/* Header avec badge discret */}
            <div className="flex items-center justify-center md:justify-start gap-3 mb-6 animate-slideIn">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                Qui suis-je ?
              </h2>
              <img
                src="/assets/images/badge-dev.png"
                alt="Certification Développeur"
                className="w-12 h-12 object-contain"
              />
            </div>

            {/* Paragraphes présentation */}
            <div
              className="space-y-4 text-gray-600 dark:text-gray-300 mb-8 animate-slideIn"
              style={{ animationDelay: "0.1s" }}
            >
              <p className="text-lg">
                Je m'appelle <strong className="text-gray-900 dark:text-white">Christophe</strong>,
                développeur web freelance basé à{" "}
                <strong className="text-gray-900 dark:text-white">Artix</strong>, près de Pau.
              </p>
              <p>
                Après 12 ans dans le conseil client en multimédia, j'ai choisi
                de mettre mon expertise au service des entrepreneurs et des PME.
                Je comprends vos contraintes : budget à respecter, besoin de
                résultats concrets, pas de temps à perdre.
              </p>
              <p className="font-medium text-gray-900 dark:text-white">
                Mon approche : vous écouter, vous conseiller, et créer un site
                qui travaille pour vous — même quand vous dormez.
              </p>
            </div>

            {/* 3 points différenciants */}
            <div
              className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 animate-slideIn"
              style={{ animationDelay: "0.2s" }}
            >
              {differentiators.map((item, index) => (
                <div
                  key={index}
                  className="bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 rounded-xl p-4 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <span className="text-3xl mb-2 block">{item.emoji}</span>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA unique */}
            <div
              className="flex justify-center md:justify-start animate-slideIn"
              style={{ animationDelay: "0.3s" }}
            >
              <CallToAction
                variant="gradient"
                text="Discutons de votre projet"
                subtext="Premier échange gratuit"
                icon="message"
                size="large"
                href="#contact"
                location="about"
                testId="about_cta"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
