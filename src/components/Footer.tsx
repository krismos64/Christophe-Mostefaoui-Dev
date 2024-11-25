import { Code2 } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <Code2 className="h-8 w-8 text-blue-400" />
              <span className="text-xl font-bold">Christophe mostefaoui</span>
            </div>
            <p className="text-gray-400">
              Solutions web sur mesure pour vos projets digitaux
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#home"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Accueil
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  À propos
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#portfolio"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Portfolio
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#services"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Sites Web
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Applications
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Maintenance
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Conseil
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="text-gray-400">
                <a
                  href="mailto:christophe.mostefaoui.dev@gmail.com"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  christophe.mostefaoui.dev@gmail.com
                </a>
              </li>
              <li className="text-gray-400">
                <a
                  href="tel:+33679088845"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  +33 6 79 08 88 45
                </a>
              </li>
              <li className="text-gray-400">Artix, France</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>
            © {new Date().getFullYear()} Christophe Mostefaoui DevFreelance.
            Tous droits réservés.
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
