import { Code2, Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const menuItems = [
    { name: "Accueil", to: isHomePage ? "#home" : "/" },
    { name: "À propos", to: isHomePage ? "#about" : "/#about" },
    { name: "Services", to: isHomePage ? "#services" : "/#services" },
    { name: "Portfolio", to: isHomePage ? "#portfolio" : "/#portfolio" },
    { name: "Contact", to: isHomePage ? "#contact" : "/#contact" },
  ];

  const handleNavigation = (to: string) => {
    setIsMenuOpen(false);
    if (to.startsWith("#") && isHomePage) {
      const element = document.querySelector(to);
      element?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="fixed w-full bg-white/90 backdrop-blur-sm z-50 shadow-sm">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Code2 className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">
              Christophe, développeur web freelance
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                to={item.to}
                className="text-gray-600 hover:text-blue-600 transition-colors"
                onClick={() => handleNavigation(item.to)}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-gray-600" />
            ) : (
              <Menu className="h-6 w-6 text-gray-600" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 space-y-4">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                to={item.to}
                className="block text-gray-600 hover:text-blue-600 transition-colors"
                onClick={() => handleNavigation(item.to)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
}
