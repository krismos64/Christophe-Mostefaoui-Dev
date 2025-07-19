import Lottie from "lottie-react";
import { Code2 } from "lucide-react";
import { Link } from "react-router-dom";
import thinkingAnimation from "../../animations/thinking.json";
import { useNavigation } from "../../hooks/useNavigation";

export default function Footer() {
  const { handleNavigation, isHomePage } = useNavigation();

  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white py-12 transition-colors duration-300">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <Code2 className="h-8 w-8 text-blue-400" />
              <span className="text-xl font-bold">Développeur web</span>
            </div>
            <p className="text-gray-400">
              Solutions web sur mesure pour vos projets digitaux
            </p>
            <div className="mt-4 w-24">
              <Lottie animationData={thinkingAnimation} loop={true} />
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to={isHomePage ? "#home" : "/"}
                  className="text-gray-400 hover:text-white transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigation(isHomePage ? "#home" : "/");
                  }}
                >
                  Accueil
                </Link>
              </li>
              <li>
                <Link
                  to={isHomePage ? "#about" : "/#about"}
                  className="text-gray-400 hover:text-white transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigation(isHomePage ? "#about" : "/#about");
                  }}
                >
                  À propos
                </Link>
              </li>
              <li>
                <Link
                  to={isHomePage ? "#services" : "/#services"}
                  className="text-gray-400 hover:text-white transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigation(isHomePage ? "#services" : "/#services");
                  }}
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  to={isHomePage ? "#portfolio" : "/#portfolio"}
                  className="text-gray-400 hover:text-white transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigation(isHomePage ? "#portfolio" : "/#portfolio");
                  }}
                >
                  Portfolio
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to={isHomePage ? "#services" : "/#services"}
                  className="text-gray-400 hover:text-white transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigation(isHomePage ? "#services" : "/#services");
                  }}
                >
                  Sites Web
                </Link>
              </li>
              <li>
                <Link
                  to={isHomePage ? "#services" : "/#services"}
                  className="text-gray-400 hover:text-white transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigation(isHomePage ? "#services" : "/#services");
                  }}
                >
                  Applications
                </Link>
              </li>
              <li>
                <Link
                  to={isHomePage ? "#services" : "/#services"}
                  className="text-gray-400 hover:text-white transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigation(isHomePage ? "#services" : "/#services");
                  }}
                >
                  Maintenance
                </Link>
              </li>
              <li>
                <Link
                  to={isHomePage ? "#services" : "/#services"}
                  className="text-gray-400 hover:text-white transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigation(isHomePage ? "#services" : "/#services");
                  }}
                >
                  Conseil
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="mailto:christophe.mostefaoui.dev@gmail.com"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  christophe.mostefaoui.dev@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+33679088845"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  +33 6 79 08 88 45
                </a>
              </li>
              <li className="text-gray-400">Artix, France</li>
              <li className="text-gray-400">SIRET : 93771917700019</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>
            © {new Date().getFullYear()} Christophe Mostefaoui. Tous droits
            réservés.
          </p>
          <p className="mt-2 text-sm">
            <Link
              to="/mentions-legales"
              className="hover:text-white transition-colors"
            >
              Mentions légales
            </Link>{" "}
            &middot;{" "}
            <Link
              to="/politique-de-confidentialite"
              className="hover:text-white transition-colors"
            >
              Politique de confidentialité
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
