import { motion, useInView } from "framer-motion";
import LienContact from "../common/LienContact";
import { ArrowUpRight, Mail, Minus, Plus } from "lucide-react";
import { Fragment, useRef } from "react";
import { faq } from "../../data/faq";

/**
 * Découpe la réponse en ajoutant des sauts de ligne avant les puces (•)
 * et les listes numérotées (ex: "1.", "2.") — sans utiliser dangerouslySetInnerHTML.
 */
const renderAnswer = (answer: string) => {
  // Insère un retour ligne explicite avant chaque puce/numéro qui suit un \n
  const normalized = answer
    .replace(/\n•/g, "\n\n•")
    .replace(/\n(\d+\.)/g, "\n\n$1");
  const blocks = normalized.split("\n\n");
  return blocks.map((block, i) => (
    <Fragment key={i}>
      {block.split("\n").map((line, li) => (
        <Fragment key={li}>
          {line}
          {li < block.split("\n").length - 1 && <br />}
        </Fragment>
      ))}
      {i < blocks.length - 1 && <br />}
    </Fragment>
  ));
};

const FeaturedSnippetsFAQ = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-80px" });

  const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <section
      ref={containerRef}
      id="faq"
      className="relative w-full overflow-hidden bg-creme py-20 sm:py-28 md:py-32"
      aria-label="Questions fréquentes"
    >

      <div className="mx-auto px-5 sm:px-8 relative z-10 max-w-5xl">
        {/* Header édito */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 sm:mb-16 md:mb-20 max-w-4xl"
        >
          <p className="hero-handwritten text-[18px] sm:text-[20px] text-foret/75 mb-2">
            Questions fréquentes
          </p>
          <h2 className="hero-display text-foret">
            Tout ce qu'on me demande souvent.
          </h2>
          <p className="hero-body mt-6 max-w-2xl text-[16px] sm:text-[17px] leading-[1.7] text-foret/80">
            Développement web freelance à Pau, tarifs, méthodes, technos : les
            réponses aux questions les plus posées.
          </p>
        </motion.div>

        {/* Liste FAQ */}
        <motion.ul
          variants={stagger}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="border-b border-foret/15"
        >
          {faq.map((q, index) => {
            const number = String(index + 1).padStart(2, "0");
            return (
              <motion.li
                key={q.question}
                variants={item}
                className="group border-t border-foret/15 transition-colors duration-300 hover:border-soleil/70"
              >
                {/* <details> natif : les réponses fermées restent dans le HTML,
                    donc lisibles par Google et les IA sans JavaScript */}
                <details className="faq-item group/faq">
                  <summary className="cursor-pointer list-none py-5 focus:outline-none focus-visible:ring-2 focus-visible:ring-soleil focus-visible:ring-offset-2 sm:py-6 [&::-webkit-details-marker]:hidden">
                    <h3 className="flex items-start gap-4 text-left text-[19px] leading-tight text-foret sm:gap-6 sm:text-[22px] md:text-[24px]">
                      <span
                        className="w-10 flex-shrink-0 pt-1.5 font-mono text-[13px] tabular-nums tracking-wider text-foret/70 transition-colors group-hover:text-foret-moyen sm:text-[14px]"
                        aria-hidden="true"
                      >
                        {number}
                      </span>
                      <span className="flex-1 pr-2">{q.question}</span>
                      <span
                        className="mt-1.5 flex-shrink-0 text-foret/70 transition-colors group-hover:text-foret-moyen"
                        aria-hidden="true"
                      >
                        <Plus className="h-5 w-5 group-open/faq:hidden" strokeWidth={1.75} />
                        <Minus className="hidden h-5 w-5 group-open/faq:block" strokeWidth={1.75} />
                      </span>
                    </h3>
                  </summary>
                  <div className="faq-reponse pb-6 pl-[3.5rem] pr-2 sm:pb-7 sm:pl-[4rem]">
                    <div className="hero-body max-w-3xl text-[15px] leading-[1.7] text-foret/80 sm:text-[16px]">
                      {renderAnswer(q.reponse)}
                    </div>
                  </div>
                </details>
              </motion.li>
            );
          })}
        </motion.ul>

        {/* CTA + contact direct */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mt-14 sm:mt-16 flex flex-col items-start gap-5"
        >
          <p className="hero-handwritten text-[18px] sm:text-[20px] text-foret/75">
            ↳ une question spécifique sur votre projet ?
          </p>
          <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-7">
            <LienContact
              className="hero-cta-primary group"
              data-testid="faq_cta"
            >
              <span>Demander un devis</span>
              <span className="hero-cta-sub">gratuit · sous 24h</span>
              <ArrowUpRight
                className="ml-1 h-5 w-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </LienContact>

            <a
              href="mailto:christophe.mostefaoui.dev@gmail.com"
              className="hero-body group inline-flex items-center gap-2 text-[14px] text-foret/80 hover:text-foret-moyen transition-colors"
            >
              <Mail className="h-4 w-4" aria-hidden="true" strokeWidth={1.5} />
              <span className="border-b border-current/40 pb-0.5 group-hover:border-soleil">
                christophe.mostefaoui.dev@gmail.com
              </span>
            </a>
          </div>
        </motion.div>

        {/* Citation manuscrite signée */}
        <motion.figcaption
          initial={{ opacity: 0, y: 14 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16 sm:mt-20 max-w-xl"
        >
          <p className="hero-handwritten text-[20px] sm:text-[24px] leading-snug text-foret/90">
            « La meilleure FAQ, c'est celle qu'on n'a pas besoin de lire. »
          </p>
          <p className="hero-handwritten mt-1 text-[15px] text-foret/70">
            — C.M.
          </p>
        </motion.figcaption>
      </div>
    </section>
  );
};

export default FeaturedSnippetsFAQ;
