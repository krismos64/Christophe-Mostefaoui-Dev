import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

export default function PrivacyPolicy() {
  const lien =
    "border-b border-current/40 pb-0.5 hover:text-foret-moyen hover:border-soleil transition-colors";
  const puces = "mt-3 space-y-1.5 hero-body text-[15px] pl-5 list-disc marker:text-foret-moyen";
  const fort = "font-medium text-foret";

  const sections = [
    {
      numeral: "I",
      title: "Qui traite vos données",
      body: (
        <p>
          Le responsable du traitement est{" "}
          <strong className={fort}>Christophe Mostefaoui</strong>, entrepreneur
          individuel, 4 avenue Edmond Rostand, 64170 Artix,{" "}
          <a href="mailto:christophe.mostefaoui.dev@gmail.com" className={lien}>
            christophe.mostefaoui.dev@gmail.com
          </a>
          . Je travaille seul : personne d'autre que moi ne lit vos demandes.
        </p>
      ),
    },
    {
      numeral: "II",
      title: "Le formulaire de contact",
      body: (
        <>
          <p>
            <strong className={fort}>Données collectées :</strong> nom, email,
            type de projet et description (obligatoires pour que je puisse vous
            répondre), téléphone et ville (facultatifs).
          </p>
          <p className="mt-3">
            <strong className={fort}>Pourquoi :</strong> répondre à votre
            demande et vous envoyer un devis. Base légale : les mesures
            précontractuelles prises à votre demande (article 6.1.b du RGPD).
          </p>
          <p className="mt-3">
            <strong className={fort}>Comment :</strong> votre message est envoyé
            par le service EmailJS dans ma messagerie Gmail. En parallèle, le
            serveur du site le transmet à Make (plateforme d'automatisation,
            région européenne) et à Mistral AI (société française), qui
            préparent un brouillon de réponse dans ma messagerie. Je relis et
            corrige chaque brouillon avant de l'envoyer moi-même : aucune
            réponse ne part automatiquement, et aucune décision n'est prise par
            une machine. Base légale de cette préparation : mon intérêt
            légitime à vous répondre vite et avec soin.
          </p>
        </>
      ),
    },
    {
      numeral: "III",
      title: "L'assistant conversationnel",
      body: (
        <>
          <p>
            Les messages que vous écrivez à l'assistant sont transmis, via le
            serveur du site, à{" "}
            <strong className={fort}>Mistral AI</strong> (société française),
            uniquement pour générer les réponses. Base légale : mon intérêt
            légitime à répondre aux questions des visiteurs.
          </p>
          <ul className={puces}>
            <li>
              Aucun compte n'est demandé. Votre navigateur garde la
              conversation le temps de votre visite et l'efface à la fermeture
              de l'onglet. Mistral AI conserve les échanges selon ses propres
              conditions, pour une durée limitée.
            </li>
            <li>
              Si vous cliquez sur « Transmettre ma demande », votre email, votre
              nom s'il est indiqué et la conversation me sont envoyés par
              EmailJS, pour que je vous recontacte (mesures précontractuelles à
              votre demande).
            </li>
            <li>
              Les réponses sont générées automatiquement et peuvent comporter
              des imprécisions. Ne confiez pas de données sensibles
              (santé, coordonnées bancaires) à l'assistant.
            </li>
          </ul>
        </>
      ),
    },
    {
      numeral: "IV",
      title: "Sécurité du site",
      body: (
        <p>
          Pour limiter les abus (envois en masse, robots), le serveur garde une
          empreinte chiffrée de votre adresse IP quand vous utilisez le
          formulaire ou l'assistant. Elle est effacée automatiquement au bout
          de 24 heures environ. Comme tout hébergeur, Hostinger tient aussi des
          journaux techniques de connexion, conservés selon ses propres règles.
          Base légale : mon intérêt légitime à protéger le site.
        </p>
      ),
    },
    {
      numeral: "V",
      title: "Qui reçoit vos données",
      body: (
        <>
          <p>
            <strong className={fort}>Vos données ne sont jamais vendues ni cédées.</strong>{" "}
            Seuls les prestataires techniques nécessaires au fonctionnement du
            site les reçoivent, pour mon compte :
          </p>
          <ul className={puces}>
            <li>Hostinger : hébergement du site (serveurs en France, sauvegardes en Lituanie)</li>
            <li>EmailJS : acheminement des messages du formulaire et de l'assistant</li>
            <li>Google (Gmail) : ma messagerie, où arrivent vos demandes</li>
            <li>Make : préparation des brouillons de réponse (région européenne)</li>
            <li>Mistral AI : rédaction des brouillons et réponses de l'assistant</li>
          </ul>
          <p className="mt-4">
            Google et EmailJS peuvent traiter des données en dehors de l'Union
            européenne, notamment aux États-Unis. Ces transferts doivent être
            encadrés par les garanties prévues par le RGPD (décision
            d'adéquation de la Commission européenne ou clauses contractuelles
            types) ; vous pouvez me demander le détail de celles qui
            s'appliquent.
          </p>
        </>
      ),
    },
    {
      numeral: "VI",
      title: "Combien de temps",
      body: (
        <ul className={puces}>
          <li>
            Demandes sans suite : 3 ans au plus après votre dernier message,
            puis je les supprime.
          </li>
          <li>
            Si vous devenez client : le temps de notre collaboration, puis les
            durées imposées par la loi pour les documents comptables (10 ans
            pour les factures).
          </li>
          <li>Conversation de l'assistant dans votre navigateur : jusqu'à la fermeture de l'onglet.</li>
          <li>Empreinte de l'adresse IP : 24 heures environ.</li>
        </ul>
      ),
    },
    {
      numeral: "VII",
      title: "Vos droits",
      body: (
        <>
          <p>
            Vous pouvez à tout moment accéder à vos données, les faire corriger
            ou effacer, limiter leur utilisation ou vous y opposer, et, pour
            celles que vous m'avez fournies, en recevoir une copie dans un
            format courant. Vous pouvez aussi me laisser des instructions sur
            le sort de vos données après votre décès.
          </p>
          <p className="mt-4">
            Écrivez-moi à{" "}
            <a href="mailto:christophe.mostefaoui.dev@gmail.com" className={lien}>
              christophe.mostefaoui.dev@gmail.com
            </a>{" "}
            : je réponds sous un mois au plus. Si ma réponse ne vous convient
            pas, vous pouvez adresser une réclamation à la{" "}
            <a
              href="https://www.cnil.fr/fr/plaintes"
              target="_blank"
              rel="noopener noreferrer"
              className={lien}
            >
              CNIL
            </a>
            .
          </p>
        </>
      ),
    },
    {
      numeral: "VIII",
      title: "Cookies et stockage",
      body: (
        <>
          <p>
            Ce site ne dépose aucun cookie et n'utilise aucun outil de mesure
            d'audience ni de publicité. Le seul stockage dans votre navigateur
            est la conversation de l'assistant, effacée à la fermeture de
            l'onglet : il sert uniquement au fonctionnement du service que vous
            utilisez, et n'appelle donc pas de consentement.
          </p>
          <p className="mt-3">
            Les vidéos ne sont pas chargées à l'ouverture de la page : aucune
            connexion à YouTube n'a lieu tant que vous ne cliquez pas sur
            lecture. En lançant une vidéo, vous chargez le lecteur de YouTube
            (Google), qui applique alors ses propres règles de
            confidentialité et peut utiliser ses traceurs.
          </p>
        </>
      ),
    },
  ];

  return (
    <>
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
        <title>
          Politique de confidentialité : Christophe Mostefaoui, développeur web freelance à Pau
        </title>
        <meta
          name="description"
          content="Politique de confidentialité du site christophe-dev-freelance.fr : données collectées, bases légales, prestataires, durées de conservation et droits des personnes."
        />
        <link
          rel="canonical"
          href="https://christophe-dev-freelance.fr/politique-de-confidentialite"
        />
      </Helmet>

      <main
        id="main"
        className="relative w-full overflow-hidden bg-creme pt-32 sm:pt-36 pb-20 sm:pb-28"
        aria-label="Politique de confidentialité"
      >

        <div className="mx-auto px-5 sm:px-8 relative z-10 max-w-4xl">
          {/* Header édito */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mb-12 sm:mb-16"
          >
            <p className="hero-handwritten text-[18px] sm:text-[20px] text-foret/75 mb-2">
              ↳ protection de vos données
            </p>
            <h1 className="hero-display text-foret">
              Politique de confidentialité.
            </h1>
            <p className="hero-body mt-6 max-w-2xl text-[16px] sm:text-[17px] leading-[1.7] text-foret/80">
              J'utilise vos données personnelles uniquement pour vous
              répondre. Cette page détaille ce que je collecte, pourquoi, qui
              le reçoit et combien de temps je le garde. Dernière mise à jour :
              6 novembre 2026.
            </p>
          </motion.div>

          {/* Sections */}
          <ul className="border-b border-foret/15">
            {sections.map((section, index) => (
              <motion.li
                key={section.numeral}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.1 + index * 0.07,
                  duration: 0.6,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group py-8 sm:py-10 border-t border-foret/15"
              >
                <div className="flex items-start gap-4 sm:gap-6">
                  <span
                    className="text-[12px] font-mono tabular-nums tracking-wider text-foret/70 w-8 flex-shrink-0 pt-1.5"
                    aria-hidden="true"
                  >
                    {section.numeral}.
                  </span>
                  <div className="flex-1 min-w-0">
                    <h2
                      className="text-[24px] sm:text-[28px] leading-tight text-foret mb-4"
                    >
                      {section.title}
                    </h2>
                    <div className="hero-body text-[15px] sm:text-[16px] leading-[1.7] text-foret/80 max-w-2xl">
                      {section.body}
                    </div>
                  </div>
                </div>
              </motion.li>
            ))}
          </ul>

          {/* Retour */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mt-14 sm:mt-16 flex flex-col items-start gap-5"
          >
            <p className="hero-handwritten text-[18px] sm:text-[20px] text-foret/75">
              ↳ besoin d'autre chose ?
            </p>
            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-7">
              <Link
                to="/"
                className="hero-body group inline-flex items-center gap-2 text-[14px] text-foret/80 hover:text-foret-moyen transition-colors"
              >
                <span className="border-b border-current/40 pb-0.5 group-hover:border-soleil">
                  retour à l'accueil
                </span>
                <ArrowUpRight
                  className="h-3.5 w-3.5 opacity-70 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </Link>
              <Link
                to="/mentions-legales"
                className="hero-body group inline-flex items-center gap-2 text-[14px] text-foret/80 hover:text-foret-moyen transition-colors"
              >
                <span className="border-b border-current/40 pb-0.5 group-hover:border-soleil">
                  mentions légales
                </span>
                <ArrowUpRight
                  className="h-3.5 w-3.5 opacity-70 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </Link>
            </div>
          </motion.div>
        </div>
      </main>
    </>
  );
}
