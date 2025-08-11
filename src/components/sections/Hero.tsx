import { ArrowRight } from "lucide-react";
import Lottie from "lottie-react";
import companyAnimation from "../../animations/company.json";

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
              Développeur Web Full-Stack Expert - Je transforme vos idées en succès digitaux
            </h1>
            <p className="mt-6 text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              Spécialiste React.js, Node.js, TypeScript. Création d'applications SaaS, 
              plateformes e-commerce et sites vitrines performants à Pau. 
              Ensemble, construisons des solutions digitales sur mesure pour votre entreprise.
            </p>
            <div className="mt-8">
              <a
                href="#contact"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                Contactez-moi
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
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
