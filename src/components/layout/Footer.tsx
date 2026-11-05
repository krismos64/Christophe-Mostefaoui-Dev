import LazyLottie from "../common/LazyLottie";
import { ArrowUpRight, Github, Linkedin, MapPin, Youtube } from "lucide-react";
import { Link } from "react-router-dom";
import { useNavigation } from "../../hooks/useNavigation";

export default function Footer() {
  const { handleNavigation, isHomePage } = useNavigation();
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { name: "À propos", to: isHomePage ? "#about" : "/#about" },
    { name: "Services", to: isHomePage ? "#services" : "/#services" },
    { name: "Portfolio", to: isHomePage ? "#portfolio" : "/#portfolio" },
    { name: "Blog", to: "/blog" },
    { name: "Tarifs", to: isHomePage ? "#tarifs" : "/#tarifs" },
    { name: "FAQ", to: isHomePage ? "#faq" : "/#faq" },
    { name: "Contact", to: isHomePage ? "#contact" : "/#contact" },
  ];

  const externalLinks = [
    {
      name: "SmartPlanning",
      href: "https://smartplanning.fr/",
      sub: "mon SaaS de gestion de plannings",
    },
    {
      name: "krismos.fr",
      href: "https://krismos.fr/",
      sub: "portfolio technique",
    },
  ];

  const socials = [
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/christophemostefaoui/",
      icon: Linkedin,
    },
    {
      name: "GitHub",
      href: "https://github.com/krismos64",
      icon: Github,
    },
    {
      name: "YouTube",
      href: "https://www.youtube.com/@christophe-dev-freelance/videos",
      icon: Youtube,
    },
    {
      name: "Fiche Google",
      href: "https://www.google.com/maps/place/?q=place_id:ChIJlTa-96dvUigRyeCBbLb8qkw",
      icon: MapPin,
    },
  ];

  return (
    <footer
      className="relative w-full overflow-hidden bg-foret-profond text-creme pt-16 sm:pt-20 pb-10"
      aria-label="Pied de page"
    >

      <div className="container mx-auto px-5 sm:px-8 md:px-12 lg:px-16 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-x-6 gap-y-10 md:gap-12 lg:gap-16">
          {/* Bloc identité — pleine largeur sur mobile */}
          <div className="col-span-2 md:col-span-5 lg:col-span-4">
            <p
              className="text-[26px] sm:text-[30px] leading-tight text-creme mb-4"
            >
              Christophe,{" "}
              <span className="text-soleil">développeur web</span>
            </p>

            <p className="hero-body text-[14px] sm:text-[15px] leading-[1.7] text-creme/70 mb-6 max-w-sm">
              Freelance basé à Artix et Pau (64). Plus de dix ans dans le
              conseil et le code, au service des PME et indépendants.
            </p>

            {/* Lottie thinking — touche personnelle, chargée à l'approche */}
            <LazyLottie
              load={() => import("../../animations/thinking.json")}
              className="w-20 h-20 sm:w-24 sm:h-24 opacity-80"
            />
          </div>

          {/* Bloc Navigation */}
          <nav
            className="md:col-span-3 lg:col-span-2"
            aria-label="Navigation du site"
          >
            <p className="hero-body text-[12px] uppercase tracking-[0.18em] text-creme/70 mb-5">
              Navigation
            </p>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.to}
                    onClick={(e) => {
                      if (link.to.startsWith("#") || link.to.startsWith("/#")) {
                        e.preventDefault();
                        handleNavigation(link.to);
                      }
                    }}
                    className="hero-body inline-block text-[14px] text-creme/75 hover:text-soleil transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Bloc Ailleurs */}
          <div className="md:col-span-4 lg:col-span-3">
            <p className="hero-body text-[12px] uppercase tracking-[0.18em] text-creme/70 mb-5">
              Ailleurs
            </p>
            <ul className="space-y-3.5">
              {externalLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-baseline gap-1.5 text-[14px] text-creme/85 hover:text-soleil transition-colors"
                  >
                    <span className="hero-body border-b border-creme/30 pb-0.5 group-hover:border-soleil">
                      {link.name}
                    </span>
                    <ArrowUpRight
                      className="h-3.5 w-3.5 opacity-70 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden="true"
                    />
                    <span className="hero-body block text-[12px] text-creme/70 group-hover:text-soleil/70 ml-0">
                      {link.sub}
                    </span>
                  </a>
                </li>
              ))}
              {/* Trait séparateur */}
              <li
                aria-hidden="true"
                className="h-px w-12 bg-creme/20 my-3"
              />
              {/* Liens sociaux */}
              {socials.map((s) => {
                const Icon = s.icon;
                return (
                  <li key={s.name}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${s.name} (nouvel onglet)`}
                      className="hero-body group inline-flex items-center gap-2 text-[14px] text-creme/75 hover:text-soleil transition-colors"
                    >
                      <Icon
                        className="h-4 w-4 flex-shrink-0"
                        aria-hidden="true"
                        strokeWidth={1.5}
                      />
                      <span className="border-b border-current/30 pb-0.5 group-hover:border-soleil">
                        {s.name}
                      </span>
                      <ArrowUpRight
                        className="h-3 w-3 opacity-60 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        aria-hidden="true"
                      />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Bloc Contact — pleine largeur sur mobile */}
          <div className="col-span-2 md:col-span-12 lg:col-span-3">
            <p className="hero-body text-[12px] uppercase tracking-[0.18em] text-creme/70 mb-5">
              Contact
            </p>
            <ul className="space-y-3">
              <li>
                <a
                  href="tel:+33679088845"
                  className="hero-body group inline-flex items-center gap-1.5 text-[14px] text-creme/85 hover:text-soleil transition-colors"
                  aria-label="Appeler Christophe au 06 79 08 88 45"
                >
                  <span className="font-mono tabular-nums border-b border-current/30 pb-0.5 group-hover:border-soleil">
                    06 79 08 88 45
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:christophe.mostefaoui.dev@gmail.com"
                  className="hero-body group inline-flex items-baseline gap-1.5 text-[14px] text-creme/85 hover:text-soleil transition-colors break-all"
                >
                  <span className="border-b border-current/30 pb-0.5 group-hover:border-soleil">
                    christophe.mostefaoui.dev@gmail.com
                  </span>
                </a>
              </li>
              <li className="hero-body text-[14px] text-creme/65">
                Artix / Pau (64)
                <span className="block text-[12px] mt-0.5 text-creme/70">
                  Pyrénées-Atlantiques · France entière en distanciel
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Pages locales — maillage SEO */}
        <p className="hero-body text-[13px] text-creme/70 mt-12 sm:mt-14">
          Création de site internet :{" "}
          {[
            { label: "Pau", to: "/creation-site-internet-pau" },
            { label: "Bayonne", to: "/creation-site-internet-bayonne" },
            { label: "Biarritz", to: "/creation-site-internet-biarritz" },
            {
              label: "Orthez & Béarn",
              to: "/creation-site-internet-orthez-bearn",
            },
          ].map((z, i, arr) => (
            <span key={z.to}>
              <Link
                to={z.to}
                className="hover:text-soleil transition-colors border-b border-creme/20 hover:border-soleil pb-px"
              >
                {z.label}
              </Link>
              {i < arr.length - 1 && (
                <span className="mx-2 text-creme/70" aria-hidden="true">
                  ·
                </span>
              )}
            </span>
          ))}
        </p>

        {/* Trait pleine largeur */}
        <div
          className="h-px w-full bg-creme/15 my-10 sm:my-12"
          aria-hidden="true"
        />

        {/* Bottom strip : copyright + mentions */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-[13px] text-creme/70">
          <p className="hero-body">
            © Christophe Mostefaoui
            <span className="mx-2 text-creme/70" aria-hidden="true">
              ·
            </span>
            <span className="font-mono tabular-nums">
              SIRET 937 719 177 00019
            </span>
          </p>
          <p className="hero-body flex flex-wrap items-center gap-x-2 gap-y-1">
            <Link
              to="/mentions-legales"
              className="hover:text-soleil transition-colors"
            >
              Mentions légales
            </Link>
            <span className="text-creme/70" aria-hidden="true">
              ·
            </span>
            <Link
              to="/politique-de-confidentialite"
              className="hover:text-soleil transition-colors"
            >
              Politique de confidentialité
            </Link>
          </p>
        </div>

        {/* Citation manuscrite signée — colophon */}
        <p className="hero-handwritten text-[18px] sm:text-[20px] text-soleil/80 mt-10 sm:mt-12">
          « Fait à Artix, sous les Pyrénées. »
        </p>
        <p className="hero-handwritten text-[14px] text-creme/70 mt-1">
          — {currentYear}
        </p>
      </div>
    </footer>
  );
}
