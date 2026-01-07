import Lottie from "lottie-react";
import companyAnimation from "../../animations/company.json";
import CallToAction from "../common/CallToAction";

export default function Hero() {
  return (
    <section
      id="home"
      className="pt-24 pb-12 md:pt-32 md:pb-20 transition-colors duration-300 relative overflow-hidden"
    >
      {/* Animation en arrière-plan pour les écrans mobiles */}
      <div className="absolute inset-0 opacity-10 md:hidden pointer-events-none">
        <Lottie animationData={companyAnimation} loop={true} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
              Création de Sites Internet à{" "}
              <span className="rgb-text">Pau</span>
            </h1>
            <p className="mt-6 text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              Des sites web modernes qui attirent vos clients et valorisent
              votre activité
            </p>

            {/* Badges de réassurance - style glassmorphism */}
            <div className="mt-6 flex flex-wrap justify-center md:justify-start gap-3">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 text-gray-700 dark:text-gray-200 rounded-full text-sm font-medium shadow-sm">
                📍 Déplacement gratuit dans le 64
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 text-gray-700 dark:text-gray-200 rounded-full text-sm font-medium shadow-sm">
                ⚡ Devis sous 24h
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 text-gray-700 dark:text-gray-200 rounded-full text-sm font-medium shadow-sm">
                💳 Paiement en 3x sans frais
              </span>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <CallToAction
                variant="gradient"
                text="Demander un devis gratuit"
                subtext="Réponse sous 24h"
                icon="send"
                size="large"
                href="#contact"
                location="hero"
                testId="hero_cta_primary"
              />
              <CallToAction
                variant="secondary"
                text="Voir mes réalisations"
                icon="briefcase"
                size="large"
                href="#portfolio"
                location="hero"
                testId="hero_cta_secondary"
              />
            </div>
          </div>

          {/* Animation visible uniquement sur les écrans moyens et grands */}
          <div className="flex-1 hidden md:block">
            <Lottie animationData={companyAnimation} loop={true} />
          </div>
        </div>
      </div>
    </section>
  );
}
