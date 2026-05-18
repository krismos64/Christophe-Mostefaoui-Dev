import Lottie from "lottie-react";
import { ArrowUpRight, Github, Linkedin, Youtube } from "lucide-react";
import { Link } from "react-router-dom";
import thinkingAnimation from "../../animations/thinking.json";
import { useNavigation } from "../../hooks/useNavigation";

export default function Footer() {
  const { handleNavigation, isHomePage } = useNavigation();
  const currentYear = new Date().getFullYear();

  const navLinks = [
    { name: "À propos", to: isHomePage ? "#about" : "/#about" },
    { name: "Services", to: isHomePage ? "#services" : "/#services" },
    { name: "Portfolio", to: isHomePage ? "#portfolio" : "/#portfolio" },
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
  ];

  return (
    <footer
      className="relative w-full overflow-hidden bg-[#0B0805] text-[#F4EFE6] pt-16 sm:pt-20 pb-10"
      aria-label="Pied de page"
    >
      {/* Texture grain papier */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        }}
        aria-hidden="true"
      />

      <div className="container mx-auto px-5 sm:px-8 md:px-12 lg:px-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 lg:gap-16">
          {/* Bloc identité */}
          <div className="md:col-span-5 lg:col-span-4">
            <p
              style={{
                fontFamily: '"Fraunces", "Times New Roman", serif',
                fontStyle: "italic",
                fontWeight: 500,
              }}
              className="text-[26px] sm:text-[30px] leading-tight text-[#F4EFE6] mb-4"
            >
              Christophe,{" "}
              <span className="text-[#F4D35E]">développeur web</span>
            </p>

            <p className="hero-body text-[14px] sm:text-[15px] leading-[1.7] text-[#F4EFE6]/70 mb-6 max-w-sm">
              Freelance basé à Artix et Pau (64). Plus de dix ans dans le
              conseil et le code, au service des PME et indépendants.
            </p>

            {/* Lottie thinking — touche personnelle */}
            <div className="w-20 sm:w-24 opacity-80">
              <Lottie animationData={thinkingAnimation} loop={true} />
            </div>
          </div>

          {/* Bloc Navigation */}
          <nav
            className="md:col-span-3 lg:col-span-2"
            aria-label="Navigation du site"
          >
            <p className="hero-body text-[12px] uppercase tracking-[0.18em] text-[#F4EFE6]/45 mb-5">
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
                    className="hero-body inline-block text-[14px] text-[#F4EFE6]/75 hover:text-[#F4D35E] transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Bloc Ailleurs */}
          <div className="md:col-span-4 lg:col-span-3">
            <p className="hero-body text-[12px] uppercase tracking-[0.18em] text-[#F4EFE6]/45 mb-5">
              Ailleurs
            </p>
            <ul className="space-y-3.5">
              {externalLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-baseline gap-1.5 text-[14px] text-[#F4EFE6]/85 hover:text-[#F4D35E] transition-colors"
                  >
                    <span className="hero-body border-b border-[#F4EFE6]/30 pb-0.5 group-hover:border-[#F4D35E]">
                      {link.name}
                    </span>
                    <ArrowUpRight
                      className="h-3.5 w-3.5 opacity-70 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden="true"
                    />
                    <span className="hero-body block text-[12px] text-[#F4EFE6]/50 group-hover:text-[#F4D35E]/70 ml-0">
                      {link.sub}
                    </span>
                  </a>
                </li>
              ))}
              {/* Trait séparateur */}
              <li
                aria-hidden="true"
                className="h-px w-12 bg-[#F4EFE6]/20 my-3"
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
                      className="hero-body group inline-flex items-center gap-2 text-[14px] text-[#F4EFE6]/75 hover:text-[#F4D35E] transition-colors"
                    >
                      <Icon
                        className="h-4 w-4 flex-shrink-0"
                        aria-hidden="true"
                        strokeWidth={1.5}
                      />
                      <span className="border-b border-current/30 pb-0.5 group-hover:border-[#F4D35E]">
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

          {/* Bloc Contact */}
          <div className="md:col-span-12 lg:col-span-3">
            <p className="hero-body text-[12px] uppercase tracking-[0.18em] text-[#F4EFE6]/45 mb-5">
              Contact
            </p>
            <ul className="space-y-3">
              <li>
                <a
                  href="tel:+33679088845"
                  className="hero-body group inline-flex items-center gap-1.5 text-[14px] text-[#F4EFE6]/85 hover:text-[#F4D35E] transition-colors"
                  aria-label="Appeler Christophe au 06 79 08 88 45"
                >
                  <span className="font-mono tabular-nums border-b border-current/30 pb-0.5 group-hover:border-[#F4D35E]">
                    06 79 08 88 45
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:christophe.mostefaoui.dev@gmail.com"
                  className="hero-body group inline-flex items-baseline gap-1.5 text-[14px] text-[#F4EFE6]/85 hover:text-[#F4D35E] transition-colors break-all"
                  aria-label="Envoyer un email à Christophe Mostefaoui"
                >
                  <span className="border-b border-current/30 pb-0.5 group-hover:border-[#F4D35E]">
                    christophe.mostefaoui.dev@gmail.com
                  </span>
                </a>
              </li>
              <li className="hero-body text-[14px] text-[#F4EFE6]/65">
                Artix / Pau (64)
                <span className="block text-[12px] mt-0.5 text-[#F4EFE6]/45">
                  Pyrénées-Atlantiques · France entière en distanciel
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Trait pleine largeur */}
        <div
          className="h-px w-full bg-[#F4EFE6]/15 my-10 sm:my-12"
          aria-hidden="true"
        />

        {/* Bottom strip : copyright + mentions */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-[13px] text-[#F4EFE6]/55">
          <p className="hero-body">
            © Christophe Mostefaoui
            <span className="mx-2 text-[#F4EFE6]/30" aria-hidden="true">
              ·
            </span>
            <span className="font-mono tabular-nums">
              SIRET 937 719 177 00019
            </span>
          </p>
          <p className="hero-body flex flex-wrap items-center gap-x-2 gap-y-1">
            <Link
              to="/mentions-legales"
              className="hover:text-[#F4D35E] transition-colors"
            >
              Mentions légales
            </Link>
            <span className="text-[#F4EFE6]/30" aria-hidden="true">
              ·
            </span>
            <Link
              to="/politique-de-confidentialite"
              className="hover:text-[#F4D35E] transition-colors"
            >
              Politique de confidentialité
            </Link>
          </p>
        </div>

        {/* Citation manuscrite signée — colophon */}
        <p className="hero-handwritten text-[18px] sm:text-[20px] text-[#F4D35E]/80 mt-10 sm:mt-12">
          « Fait à Artix, sous les Pyrénées. »
        </p>
        <p className="hero-handwritten text-[14px] text-[#F4EFE6]/40 mt-1">
          — {currentYear}
        </p>
      </div>
    </footer>
  );
}
