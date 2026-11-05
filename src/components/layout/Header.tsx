import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Github, Linkedin, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigation } from "../../hooks/useNavigation";

type Lien = { nom: string; ancre?: string; page?: string };

// Ordre de lecture d'un prospect : qui, quoi, preuves, puis contact
const liens: Lien[] = [
  { nom: "Services", ancre: "services" },
  { nom: "Réalisations", ancre: "portfolio" },
  { nom: "À propos", ancre: "about" },
  { nom: "Blog", page: "/blog" },
  { nom: "Questions fréquentes", ancre: "faq" },
];

const focus =
  "focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-soleil";

export default function Header() {
  const [menuOuvert, setMenuOuvert] = useState(false);
  const [defile, setDefile] = useState(false);
  const { handleNavigation, isActive, isHomePage } = useNavigation();

  // Fond opaque dès qu'on quitte le haut de la home
  useEffect(() => {
    const onScroll = () => setDefile(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Menu mobile : bloque le défilement de la page, Échap pour fermer
  useEffect(() => {
    if (!menuOuvert) return;
    document.body.classList.add("menu-open");
    const echap = (e: KeyboardEvent) => e.key === "Escape" && setMenuOuvert(false);
    window.addEventListener("keydown", echap);
    return () => {
      document.body.classList.remove("menu-open");
      window.removeEventListener("keydown", echap);
    };
  }, [menuOuvert]);

  const href = (l: Lien) =>
    l.page ?? (isHomePage ? `#${l.ancre}` : `/#${l.ancre}`);

  const aller = (cible: string) => {
    setMenuOuvert(false);
    handleNavigation(cible);
  };

  const opaque = defile || !isHomePage;
  const contact = isHomePage ? "#contact" : "/#contact";

  return (
    <>
      <header
        className={`fixed z-50 w-full font-display text-creme transition-[background-color,border-color] duration-500 ${
          opaque
            ? "border-b border-creme/10 bg-foret/95 backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <nav
          aria-label="Navigation principale"
          className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3 sm:px-8 sm:py-4"
        >
          <Link
            to="/"
            className={`flex min-w-0 items-center gap-3 rounded-full ${focus}`}
            onClick={(e) => {
              if (isHomePage) {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
          >
            <img
              src="/assets/images/header-avatar-mobile.webp"
              alt=""
              width={96}
              height={96}
              decoding="async"
              className="h-10 w-10 flex-shrink-0 rounded-full object-cover ring-1 ring-soleil/40 sm:h-11 sm:w-11"
            />
            <span className="flex min-w-0 flex-col leading-tight">
              <span className="truncate text-[16px] font-extrabold tracking-[-0.01em] sm:text-[17px]">
                Christophe Mostefaoui
              </span>
              <span className="hidden text-[13px] text-foret-brume sm:block">
                Développeur web à Pau
              </span>
            </span>
          </Link>

          <div className="hidden items-center gap-7 lg:flex">
            <ul className="flex items-center gap-6">
              {liens.map((l) => (
                <li key={l.nom}>
                  <a
                    href={href(l)}
                    aria-current={isActive(href(l)) ? "page" : undefined}
                    onClick={(e) => {
                      e.preventDefault();
                      aller(href(l));
                    }}
                    className={`whitespace-nowrap text-[15px] underline-offset-[6px] hover:text-soleil hover:underline ${focus} ${
                      isActive(href(l)) ? "text-soleil" : "text-creme/90"
                    }`}
                  >
                    {l.nom}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href={contact}
              onClick={(e) => {
                e.preventDefault();
                aller(contact);
              }}
              className={`group inline-flex min-h-[44px] items-center gap-1.5 rounded-full bg-soleil px-5 text-[15px] font-extrabold text-foret hover:bg-soleil-clair ${focus}`}
            >
              Devis gratuit
              <ArrowUpRight
                className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </a>
          </div>

          <button
            type="button"
            onClick={() => setMenuOuvert(true)}
            className={`inline-flex h-11 w-11 items-center justify-center rounded-full hover:text-soleil lg:hidden ${focus}`}
            aria-label="Ouvrir le menu"
            aria-expanded={menuOuvert}
            aria-controls="menu-mobile"
          >
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {menuOuvert && (
          <motion.div
            id="menu-mobile"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed inset-0 z-[100] flex flex-col overflow-y-auto bg-foret px-6 pb-10 pt-6 font-display text-creme sm:px-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="flex justify-end">
              <button
                type="button"
                autoFocus
                onClick={() => setMenuOuvert(false)}
                className={`inline-flex h-11 w-11 items-center justify-center rounded-full hover:text-soleil ${focus}`}
                aria-label="Fermer le menu"
              >
                <X className="h-7 w-7" aria-hidden="true" />
              </button>
            </div>

            <nav aria-label="Menu mobile" className="flex flex-1 flex-col justify-center">
              <ul className="flex flex-col gap-1">
                {liens.map((l, i) => (
                  <motion.li
                    key={l.nom}
                    initial={{ y: 16, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.05 + i * 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <a
                      href={href(l)}
                      onClick={(e) => {
                        e.preventDefault();
                        aller(href(l));
                      }}
                      className={`block py-2 text-[34px] font-extrabold leading-tight tracking-[-0.02em] hover:text-soleil sm:text-[42px] ${focus} ${
                        isActive(href(l)) ? "text-soleil" : ""
                      }`}
                    >
                      {l.nom}
                    </a>
                  </motion.li>
                ))}
              </ul>

              <a
                href={contact}
                onClick={(e) => {
                  e.preventDefault();
                  aller(contact);
                }}
                className={`mt-8 inline-flex min-h-[54px] w-max items-center gap-2 rounded-full bg-soleil px-7 text-base font-extrabold text-foret ${focus}`}
              >
                Demander un devis gratuit
                <ArrowUpRight className="h-[18px] w-[18px]" aria-hidden="true" />
              </a>
            </nav>

            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-creme/15 pt-6 text-[15px] text-creme/80">
              <a href="tel:+33679088845" className={`hover:text-soleil ${focus}`}>
                06 79 08 88 45
              </a>
              <a
                href="https://www.linkedin.com/in/christophemostefaoui/"
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-1.5 hover:text-soleil ${focus}`}
              >
                <Linkedin className="h-4 w-4" aria-hidden="true" />
                LinkedIn
              </a>
              <a
                href="https://github.com/krismos64"
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-1.5 hover:text-soleil ${focus}`}
              >
                <Github className="h-4 w-4" aria-hidden="true" />
                GitHub
              </a>
              <a
                href="https://krismos.fr/"
                target="_blank"
                rel="noopener noreferrer"
                className={`hover:text-soleil ${focus}`}
              >
                krismos.fr (portfolio technique)
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
