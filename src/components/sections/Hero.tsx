import Lottie from "lottie-react";
import { ArrowRight, Calendar } from "lucide-react";
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
              Je transforme vos idées en{" "}
              <span className="rgb-text">succès digitaux</span>
            </h1>
            <p className="mt-6 text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              Spécialiste React.js, Node.js, TypeScript. Création d'applications
              SaaS, plateformes e-commerce et sites vitrines performants à Pau.
              Ensemble, construisons des solutions digitales sur mesure pour
              vous ou votre entreprise.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <CallToAction
                variant="gradient"
                text="Obtenez un devis gratuit"
                subtext="Réponse sous 24h"
                icon="send"
                size="large"
                href="#contact"
                location="hero"
                testId="hero_cta_primary"
              />
              <CallToAction
                variant="secondary"
                text="Discutons de votre projet"
                icon="calendar"
                size="large"
                href="#contact"
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
