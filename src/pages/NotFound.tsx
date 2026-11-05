import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

export default function NotFound() {
  const links = [
    { label: "Accueil", to: "/" },
    { label: "À propos", to: "/#about" },
    { label: "Services", to: "/#services" },
    { label: "Portfolio", to: "/#portfolio" },
    { label: "Contact", to: "/#contact" },
  ];

  return (
    <>
      <Helmet>
        <title>Page introuvable : Christophe Mostefaoui, développeur web freelance</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta
          name="description"
          content="La page que vous cherchez n'existe pas ou a été déplacée. Retournez à l'accueil ou explorez le site."
        />
      </Helmet>

      <main
        id="main"
        className="relative w-full overflow-hidden bg-creme min-h-screen flex items-center"
        aria-label="Page introuvable"
      >

        <div className="container mx-auto px-5 sm:px-8 md:px-12 lg:px-16 relative z-10 max-w-4xl py-32">
          {/* Code erreur en gros chiffres romains */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mb-8"
          >
            <p className="hero-handwritten text-[18px] sm:text-[20px] text-foret/75 mb-3">
              ↳ erreur 404
            </p>
            <p
              className="font-mono tabular-nums text-foret-moyen text-[64px] sm:text-[80px] md:text-[96px] leading-none tracking-tight"
              aria-hidden="true"
            >
              CDIV
            </p>
            <p className="hero-handwritten mt-1 text-[14px] text-foret/70">
              — soit 404 en chiffres romains
            </p>
          </motion.div>

          {/* Titre */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.15,
              duration: 0.7,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="hero-display text-foret mb-6"
          >
            Cette page s'est égarée.
          </motion.h1>

          {/* Texte */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.25,
              duration: 0.7,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="hero-body max-w-2xl text-[16px] sm:text-[17px] leading-[1.7] text-foret/80 mb-12"
          >
            L'URL que vous cherchez n'existe pas, plus, ou a été déplacée.
            Aucune panique, voici quelques pistes pour retrouver votre chemin.
          </motion.p>

          {/* Liens de navigation */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.35,
              duration: 0.7,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="mb-12"
          >
            <p className="hero-handwritten text-[16px] sm:text-[18px] text-foret/70 mb-5">
              ↳ retrouvez votre chemin
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
              {links.map((link, i) => (
                <motion.li
                  key={link.label}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: 0.45 + i * 0.06,
                    duration: 0.5,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <Link
                    to={link.to}
                    className="hero-body group inline-flex items-center gap-2 text-[15px] sm:text-[16px] text-foret/85 hover:text-foret-moyen transition-colors"
                  >
                    <span
                      className="border-b border-current/40 pb-0.5 group-hover:border-soleil"
                    >
                      {link.label}
                    </span>
                    <ArrowUpRight
                      className="h-3.5 w-3.5 opacity-70 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden="true"
                    />
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Citation manuscrite */}
          <motion.figcaption
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.85,
              duration: 0.7,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="mt-16 max-w-xl"
          >
            <p className="hero-handwritten text-[20px] sm:text-[24px] leading-snug text-foret/90">
              « Se perdre, c'est parfois la meilleure façon de découvrir une
              nouvelle route. »
            </p>
            <p className="hero-handwritten mt-1 text-[15px] text-foret/70">
              — C.M.
            </p>
          </motion.figcaption>
        </div>
      </main>
    </>
  );
}
