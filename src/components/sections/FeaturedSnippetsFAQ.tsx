import { AnimatePresence, motion, useInView } from "framer-motion";
import { ArrowUpRight, Mail, Minus, Plus } from "lucide-react";
import { Fragment, useRef, useState } from "react";
import { featuredSnippetsContent } from "../../utils/featured-snippets-content";

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
  const [openItems, setOpenItems] = useState<number[]>([0]);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-80px" });

  const toggleItem = (index: number) => {
    setOpenItems((prev) =>
      prev.includes(index)
        ? prev.filter((item) => item !== index)
        : [...prev, index]
    );
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const { questions } = featuredSnippetsContent;

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
      className="relative w-full overflow-hidden bg-[#F4EFE6] dark:bg-[#13110F] py-20 sm:py-28 md:py-32"
      aria-label="Questions fréquentes"
    >
      {/* Texture grain papier */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-multiply dark:mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        }}
        aria-hidden="true"
      />

      <div className="container mx-auto px-5 sm:px-8 md:px-12 lg:px-16 relative z-10 max-w-5xl">
        {/* Header édito */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 sm:mb-16 md:mb-20 max-w-4xl"
        >
          <p className="hero-handwritten text-[18px] sm:text-[20px] text-[#1A1715]/60 dark:text-[#F4EFE6]/60 mb-2">
            VI. — Questions fréquentes
          </p>
          <h2 className="hero-display text-[#1A1715] dark:text-[#F4EFE6]">
            Tout ce qu'on me demande souvent.
          </h2>
          <p className="hero-body mt-6 max-w-2xl text-[16px] sm:text-[17px] leading-[1.7] text-[#1A1715]/80 dark:text-[#F4EFE6]/80">
            Développement web freelance à Pau, tarifs, méthodes, technos : les
            réponses aux questions les plus posées.
          </p>
        </motion.div>

        {/* Liste FAQ */}
        <motion.ul
          variants={stagger}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="border-b border-[#1A1715]/15 dark:border-[#F4EFE6]/15"
        >
          {questions.map((q, index) => {
            const isOpen = openItems.includes(index);
            const number = String(index + 1).padStart(2, "0");
            return (
              <motion.li
                key={index}
                variants={item}
                className="group border-t border-[#1A1715]/15 dark:border-[#F4EFE6]/15 transition-colors duration-300 hover:border-[#F4D35E]/70"
                itemScope
                itemProp="mainEntity"
                itemType="https://schema.org/Question"
              >
                <button
                  type="button"
                  onClick={() => toggleItem(index)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                  className="w-full py-5 sm:py-6 flex items-start gap-4 sm:gap-6 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F4D35E] focus-visible:ring-offset-2"
                >
                  <span
                    className="font-mono tabular-nums text-[13px] sm:text-[14px] tracking-wider text-[#1A1715]/40 dark:text-[#F4EFE6]/40 group-hover:text-[#F4D35E] transition-colors w-10 flex-shrink-0 pt-1.5"
                    aria-hidden="true"
                  >
                    {number}
                  </span>
                  <h3
                    style={{
                      fontFamily: '"Fraunces", "Times New Roman", serif',
                      fontStyle: "italic",
                      fontWeight: 500,
                    }}
                    className="flex-1 text-[19px] sm:text-[22px] md:text-[24px] leading-tight text-[#1A1715] dark:text-[#F4EFE6] pr-2"
                    itemProp="name"
                  >
                    {q.query}
                  </h3>
                  <span
                    className="flex-shrink-0 mt-1.5 text-[#1A1715]/50 dark:text-[#F4EFE6]/50 group-hover:text-[#F4D35E] transition-colors"
                    aria-hidden="true"
                  >
                    {isOpen ? (
                      <Minus className="h-5 w-5" strokeWidth={1.75} />
                    ) : (
                      <Plus className="h-5 w-5" strokeWidth={1.75} />
                    )}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-answer-${index}`}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{
                        duration: 0.35,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="overflow-hidden"
                      itemScope
                      itemProp="acceptedAnswer"
                      itemType="https://schema.org/Answer"
                    >
                      <div className="pb-6 sm:pb-7 pl-[3.5rem] sm:pl-[4rem] pr-2">
                        <div
                          className="hero-body text-[15px] sm:text-[16px] leading-[1.7] text-[#1A1715]/80 dark:text-[#F4EFE6]/80 max-w-3xl"
                          itemProp="text"
                        >
                          {renderAnswer(q.answer)}
                        </div>

                        {/* Mots-clés SEO masqués visuellement, conservés pour Google */}
                        <ul className="sr-only" aria-hidden="true">
                          {q.keywords.map((kw, ki) => (
                            <li key={ki}>{kw}</li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
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
          <p className="hero-handwritten text-[18px] sm:text-[20px] text-[#1A1715]/60 dark:text-[#F4EFE6]/60">
            ↳ une question spécifique sur votre projet ?
          </p>
          <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-7">
            <button
              onClick={() => scrollTo("contact")}
              className="hero-cta-primary group"
              aria-label="Demander un devis gratuit"
              data-testid="faq_cta"
            >
              <span>Demander un devis</span>
              <span className="hero-cta-sub">gratuit · sous 24h</span>
              <ArrowUpRight
                className="ml-1 h-5 w-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </button>

            <a
              href="mailto:christophe.mostefaoui.dev@gmail.com"
              className="hero-body group inline-flex items-center gap-2 text-[14px] text-[#1A1715]/80 dark:text-[#F4EFE6]/80 hover:text-[#F4D35E] transition-colors"
              aria-label="Envoyer un email à Christophe Mostefaoui"
            >
              <Mail className="h-4 w-4" aria-hidden="true" strokeWidth={1.5} />
              <span className="border-b border-current/40 pb-0.5 group-hover:border-[#F4D35E]">
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
          <p className="hero-handwritten text-[20px] sm:text-[24px] leading-snug text-[#1A1715]/90 dark:text-[#F4D35E]">
            « La meilleure FAQ, c'est celle qu'on n'a pas besoin de lire. »
          </p>
          <p className="hero-handwritten mt-1 text-[15px] text-[#1A1715]/50 dark:text-[#F4EFE6]/50">
            — C.M.
          </p>
        </motion.figcaption>
      </div>
    </section>
  );
};

export default FeaturedSnippetsFAQ;
