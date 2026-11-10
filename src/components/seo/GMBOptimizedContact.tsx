import type { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
import emailjs from "@emailjs/browser";
import { motion, useInView } from "framer-motion";
import {
  ArrowUpRight,
  CheckCircle2,
  Clock,
  Github,
  Linkedin,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Send,
  Star,
  User,
  Youtube,
} from "lucide-react";
import { useRef, useState } from "react";
import { emailjsConfig, validateEmailjsConfig } from "../../config/emailjs";
import VideoEmbed from "../common/VideoEmbed";
import PlateauVideo from "../sections/PlateauVideo";
import { avisGoogle, noteMoyenne } from "../../data/avisGoogle";

const GMBOptimizedContact = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-80px" });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    projectType: "",
    description: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [status, setStatus] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.projectType) {
      setStatus("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    if (!validateEmailjsConfig()) {
      setStatus("Configuration EmailJS manquante. Veuillez contacter l'administrateur.");
      return;
    }

    setIsSubmitting(true);
    setStatus("");

    try {
      const { serviceId, templateId, userId } = emailjsConfig;

      const fullMessage = `
NOUVEAU CONTACT - Devis Gratuit 24h

👤 INFORMATIONS CLIENT:
Nom: ${formData.name}
Email: ${formData.email}
Téléphone: ${formData.phone || "Non renseigné"}
Ville: ${formData.city || "Non spécifiée"}

🎯 PROJET:
Type: ${formData.projectType}

📝 DESCRIPTION:
${formData.description || "Aucune description fournie"}

---
Message envoyé depuis le formulaire de contact du site christophe-dev-freelance.fr
      `.trim();

      await emailjs.send(
        serviceId,
        templateId,
        {
          to_name: "Christophe Mostefaoui",
          from_name: formData.name,
          email: formData.email,
          subject: `Nouveau projet ${formData.projectType} - ${formData.name}`,
          message: fullMessage,
        },
        userId
      );

      // Brouillon de réponse préparé par Make (public/api/contact-hook.php).
      // Complément sans effet sur le formulaire : le mail EmailJS est déjà
      // parti, un échec ici est ignoré (et normal en dev, où le PHP ne tourne pas).
      fetch("/api/contact-hook.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        keepalive: true,
      }).catch(() => {});

      setIsSubmitted(true);
      setStatus("Message envoyé avec succès !");
      setFormData({
        name: "",
        email: "",
        phone: "",
        city: "",
        projectType: "",
        description: "",
      });
    } catch (error) {
      setStatus("Erreur lors de l'envoi du message. Veuillez réessayer.");
      console.error("Erreur EmailJS:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfos = [
    {
      icon: Phone,
      label: "Téléphone",
      value: "06 79 08 88 45",
      href: "tel:+33679088845",
      mono: true,
    },
    {
      icon: Mail,
      label: "Email",
      value: "christophe.mostefaoui.dev@gmail.com",
      href: "mailto:christophe.mostefaoui.dev@gmail.com",
      mono: false,
    },
    {
      icon: MapPin,
      label: "Localisation",
      value: "Artix / Pau (64)",
      sub: "Pyrénées-Atlantiques · France entière en distanciel",
      mono: false,
    },
    {
      icon: Clock,
      label: "Horaires",
      value: "Lun → Ven, 8h30 à 18h00",
      sub: "Réponse sous 24h en jours ouvrés",
      mono: false,
    },
  ];

  // Pas de JSON-LD ici : l'identité de l'activité est déclarée une seule fois
  // dans index.html (ProfessionalService #business), inlinée statiquement donc
  // lisible sans JS. Redéclarer un LocalBusiness ici créait une entité
  // concurrente sans @id, que Google devait départager

  return (
    <>
      <section
        ref={containerRef}
        id="contact"
        className="relative w-full overflow-hidden bg-creme pt-10 pb-20 sm:pt-14 sm:pb-28 md:pb-32"
        aria-label="Contact"
      >

        <div className="mx-auto px-5 sm:px-8 relative z-10 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
            {/* Bloc formulaire */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="relative isolate overflow-hidden rounded-[28px] bg-foret p-6 text-creme shadow-[0_40px_80px_-40px_rgba(18,49,43,0.55)] sm:p-10 lg:col-span-7"
            >
              <DecorCarte />
              <h2 className="pr-14 sm:pr-20 text-[26px] font-extrabold leading-tight tracking-[-0.02em] text-creme sm:text-[30px]">
                Votre demande de devis
              </h2>
              <p className="mt-2 mb-8 pr-10 sm:pr-20 text-[15px] text-foret-brume">
                Gratuit, sans engagement. Je vous réponds sous 24h en jours ouvrés.
                <span className="mt-1 block text-[13px]">Les champs marqués <span className="text-soleil">*</span> sont obligatoires.</span>
              </p>

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="border-l-2 border-soleil py-6 pl-6"
                >
                  <CheckCircle2
                    className="h-8 w-8 text-soleil mb-4"
                    strokeWidth={1.5}
                  />
                  <p className="mb-3 text-[24px] font-extrabold leading-tight text-creme sm:text-[28px]">
                    Message envoyé.
                  </p>
                  <p className="hero-body mb-6 max-w-md text-[15px] leading-[1.7] text-creme/85 sm:text-[16px]">
                    Merci pour votre message. Je vous réponds personnellement
                    sous 24h en jours ouvrés.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setIsSubmitted(false);
                      setStatus("");
                    }}
                    className="hero-body group inline-flex items-center gap-2 text-[14px] text-creme/85 hover:text-soleil transition-colors"
                  >
                    <span className="border-b border-current/40 pb-0.5 group-hover:border-soleil">
                      envoyer un autre message
                    </span>
                    <ArrowUpRight
                      className="h-3.5 w-3.5 opacity-70 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden="true"
                    />
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <FieldInput
                      label="Nom"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Marie Dupont"
                      icon={User}
                      autoComplete="name"
                      autoCapitalize="words"
                      required
                    />
                    <FieldInput
                      label="E-mail"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="marie@exemple.fr"
                      icon={Mail}
                      autoComplete="email"
                      autoCapitalize="off"
                      inputMode="email"
                      spellCheck={false}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <FieldInput
                      label="Téléphone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Facultatif"
                      icon={Phone}
                      autoComplete="tel"
                      inputMode="tel"
                    />
                    <FieldInput
                      label="Ville"
                      name="city"
                      type="text"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="Pau, Orthez, Bayonne…"
                      icon={MapPin}
                      autoComplete="address-level2"
                      autoCapitalize="words"
                    />
                  </div>

                  <FieldSelect
                    label="Type de projet"
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Choisissez…</option>
                    <option value="Site Vitrine Moderne">
                      I. Site vitrine moderne
                    </option>
                    <option value="Site Multi-pages">
                      II. Site multi-pages avec blog
                    </option>
                    <option value="Refonte de Site">
                      III. Refonte de site existant
                    </option>
                    <option value="Chatbot intelligent">
                      IV. Chatbot intelligent (IA)
                    </option>
                    <option value="Référencement Google & IA">
                      V. Référencement Google & IA
                    </option>
                    <option value="Vidéo & Drone">
                      VI. Vidéo & Drone (DGAC)
                    </option>
                    <option value="Autre demande">Autre demande</option>
                  </FieldSelect>

                  <FieldTextarea
                    label="Votre projet"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Votre activité, ce que vous attendez du site, vos délais…"
                    icon={MessageSquare}
                    rows={5}
                  />

                  <div className="pt-3">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="hero-cta-primary group disabled:opacity-60 disabled:cursor-not-allowed"
                      data-testid="contact_submit"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="inline-block h-4 w-4 rounded-full border-2 border-current border-t-transparent animate-spin" />
                          <span>Envoi en cours…</span>
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4" aria-hidden="true" />
                          <span>Envoyer ma demande</span>
                          <span className="hero-cta-sub">
                            réponse sous 24h
                          </span>
                        </>
                      )}
                    </button>
                    <p className="mt-4 max-w-xl text-[13px] leading-relaxed text-creme/75">
                      Vos informations servent uniquement à répondre à votre demande et à
                      préparer votre devis. Elles sont conservées 3 ans au plus sans suite
                      de votre part.{" "}
                      <Link
                        to="/politique-de-confidentialite"
                        className="underline underline-offset-2 hover:text-soleil"
                      >
                        Utilisation de vos données et vos droits
                      </Link>
                    </p>
                  </div>

                  {status && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`hero-body text-[14px] py-2.5 px-4 border-l-2 ${
                        status.includes("succès")
                          ? "border-soleil text-creme"
                          : "border-[#FFB4A8] text-[#FFB4A8]"
                      }`}
                      role="status"
                      aria-live="polite"
                    >
                      {status}
                    </motion.div>
                  )}
                </form>
              )}
            </motion.div>
            {/* Bloc infos contact */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5"
            >
              <p className="hero-handwritten text-[16px] sm:text-[18px] text-foret/70 mb-6">
                ↳ par téléphone ou email
              </p>
              <ul className="space-y-6">
                {contactInfos.map((info) => {
                  const Icon = info.icon;
                  const content = (
                    <div className="flex items-start gap-4">
                      <Icon
                        className="h-5 w-5 mt-1 flex-shrink-0 text-soleil"
                        aria-hidden="true"
                        strokeWidth={1.5}
                      />
                      <div className="min-w-0 flex-1">
                        <p className="hero-body text-[12px] uppercase tracking-[0.18em] text-foret/70 mb-1">
                          {info.label}
                        </p>
                        <p
                          className={`text-[15px] sm:text-[16px] text-foret ${
                            info.mono ? "font-mono tabular-nums" : "hero-body"
                          }`}
                        >
                          {info.value}
                        </p>
                        {info.sub && (
                          <p className="hero-body text-[13px] mt-1 text-foret/70">
                            {info.sub}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                  return (
                    <li key={info.label}>
                      {info.href ? (
                        <a
                          href={info.href}
                          className="group block transition-colors hover:text-soleil"
                        >
                          {content}
                        </a>
                      ) : (
                        content
                      )}
                    </li>
                  );
                })}
              </ul>

              {/* Renvoi vers la page des avis (sortis de la page Contact le 10/11/2026) */}
              <div
                className="h-px w-12 bg-foret/20 my-8"
                aria-hidden="true"
              />
              <p className="hero-handwritten text-[15px] sm:text-[17px] text-foret/70 mb-4">
                ↳ ce qu'en disent mes clients
              </p>
              <Link
                to="/avis"
                className="hero-body group inline-flex items-center gap-2 text-[15px] text-foret hover:text-soleil transition-colors"
              >
                <Star className="h-4 w-4 fill-soleil text-soleil" aria-hidden="true" strokeWidth={1.5} />
                <span className="border-b border-current/30 pb-0.5 group-hover:border-soleil">
                  Lire les avis Google ({noteMoyenne.toLocaleString("fr-FR", { minimumFractionDigits: 1, maximumFractionDigits: 1 })} sur 5, {avisGoogle.length} avis)
                </span>
              </Link>

              {/* Trait séparateur + liens sociaux */}
              <div
                className="h-px w-12 bg-foret/20 my-8"
                aria-hidden="true"
              />
              <p className="hero-handwritten text-[15px] sm:text-[17px] text-foret/70 mb-4">
                ↳ faisons connaissance ailleurs
              </p>
              <ul className="flex flex-wrap items-center gap-x-5 gap-y-3">
                <li>
                  <a
                    href="https://www.linkedin.com/in/christophemostefaoui/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hero-body group inline-flex items-center gap-1.5 text-[14px] text-foret/80 hover:text-soleil transition-colors"
                  >
                    <Linkedin
                      className="h-4 w-4 flex-shrink-0"
                      aria-hidden="true"
                      strokeWidth={1.5}
                    />
                    <span className="border-b border-current/30 pb-0.5 group-hover:border-soleil">
                      LinkedIn
                    </span>
                    <ArrowUpRight
                      className="h-3 w-3 opacity-60 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden="true"
                    />
<span className="sr-only"> (nouvel onglet)</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/krismos64"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hero-body group inline-flex items-center gap-1.5 text-[14px] text-foret/80 hover:text-soleil transition-colors"
                  >
                    <Github
                      className="h-4 w-4 flex-shrink-0"
                      aria-hidden="true"
                      strokeWidth={1.5}
                    />
                    <span className="border-b border-current/30 pb-0.5 group-hover:border-soleil">
                      GitHub
                    </span>
                    <ArrowUpRight
                      className="h-3 w-3 opacity-60 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden="true"
                    />
<span className="sr-only"> (nouvel onglet)</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.youtube.com/@christophe-dev-freelance/videos"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hero-body group inline-flex items-center gap-1.5 text-[14px] text-foret/80 hover:text-soleil transition-colors"
                  >
                    <Youtube
                      className="h-4 w-4 flex-shrink-0"
                      aria-hidden="true"
                      strokeWidth={1.5}
                    />
                    <span className="border-b border-current/30 pb-0.5 group-hover:border-soleil">
                      YouTube
                    </span>
                    <ArrowUpRight
                      className="h-3 w-3 opacity-60 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden="true"
                    />
<span className="sr-only"> (nouvel onglet)</span>
                  </a>
                </li>
              </ul>
            </motion.div>
          </div>

          {/* Trait de séparation */}
          <div
            className="h-px w-full bg-foret/15 my-16 sm:my-20"
            aria-hidden="true"
          />

          {/* Header édito, centré au-dessus de la vidéo */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto mb-10 max-w-3xl text-center sm:mb-12"
          >
            <p className="hero-handwritten text-[18px] sm:text-[20px] text-foret/75 mb-2">
              Faisons connaissance
            </p>
            <h2 className="hero-display text-foret">
              Voyez qui vous répondra.
            </h2>
            <p className="hero-handwritten mt-4 text-[15px] sm:text-[17px] text-foret/70">
              ✏ une minute quarante pour se rencontrer
            </p>
          </motion.div>

          {/* Vidéo de présentation dans son décor animé */}
          <div className="mb-20 sm:mb-24">
            <PlateauVideo>
              <VideoEmbed
                youtubeId="tdjXblz4mr4"
                thumbnail="/assets/images/miniature-2.png"
                title="Présentation : Christophe Mostefaoui"
                caption="— React, Node, TypeScript & solutions sur mesure"
                duration="1:40"
                channelUrl="https://www.youtube.com/@christophe-dev-freelance/videos"
                theme="light"
                ariaLabel="Lire la vidéo : Présentation"
                halo
                cadreClassName="rounded-[22px] shadow-[0_30px_60px_-30px_rgba(18,49,43,0.6)]"
              />
            </PlateauVideo>
          </div>

          {/* Citation manuscrite signée */}
          <motion.figcaption
            initial={{ opacity: 0, y: 14 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.8, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mt-20 sm:mt-24 max-w-xl"
          >
            <p className="hero-handwritten text-[20px] sm:text-[24px] leading-snug text-foret/90">
              « Le devis arrive sous 24h. Le projet, c'est plus long. »
            </p>
            <p className="hero-handwritten mt-1 text-[15px] text-foret/70">
              — C.M.
            </p>
          </motion.figcaption>
        </div>
      </section>
    </>
  );
};

/* -------------------------------------------------------------------------- */
/* Sous-composants champs                                                      */
/* -------------------------------------------------------------------------- */

type IconeChamp = LucideIcon;

const champ =
  "hero-body w-full rounded-xl border border-transparent bg-creme py-3 text-[16px] text-foret placeholder:text-foret/55 shadow-[inset_0_1px_2px_rgba(18,49,43,0.12)] transition focus:border-soleil focus:outline-none focus:ring-2 focus:ring-soleil";

const Libelle = ({ htmlFor, children, requis }: { htmlFor: string; children: string; requis?: boolean | undefined }) => (
  <label htmlFor={htmlFor} className="mb-1.5 block text-[14px] font-semibold text-creme">
    {children}
    {requis && <span className="text-soleil" aria-hidden="true"> *</span>}
  </label>
);

interface FieldInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon: IconeChamp;
  label: string;
}

const FieldInput = ({ icon: Icon, label, ...props }: FieldInputProps) => {
  const id = `contact-${props.name}`;
  return (
    <div>
      <Libelle htmlFor={id} requis={props.required}>{label}</Libelle>
      <div className="relative">
        <Icon
          className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-foret-moyen"
          strokeWidth={1.75}
        />
        <input {...props} id={id} className={`${champ} pl-11 pr-4`} />
      </div>
    </div>
  );
};

interface FieldSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  children: React.ReactNode;
  label: string;
}

const FieldSelect = ({ children, label, ...props }: FieldSelectProps) => {
  const id = `contact-${props.name}`;
  return (
    <div>
      <Libelle htmlFor={id} requis={props.required}>{label}</Libelle>
      <div className="relative">
        <select {...props} id={id} className={`${champ} cursor-pointer appearance-none pl-4 pr-10`}>
          {children}
        </select>
        <span
          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-foret-moyen"
          aria-hidden="true"
        >
          ▾
        </span>
      </div>
    </div>
  );
};

interface FieldTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  icon: IconeChamp;
  label: string;
}

const FieldTextarea = ({ icon: Icon, label, ...props }: FieldTextareaProps) => {
  const id = `contact-${props.name}`;
  return (
    <div>
      <Libelle htmlFor={id} requis={props.required}>{label}</Libelle>
      <div className="relative">
        <Icon
          className="pointer-events-none absolute left-4 top-4 h-4 w-4 text-foret-moyen"
          strokeWidth={1.75}
        />
        <textarea {...props} id={id} className={`${champ} resize-none pl-11 pr-4 leading-[1.6]`} />
      </div>
    </div>
  );
};

/** Décor de la carte : soleil et crête, dans l'esprit du hero. */
const DecorCarte = () => (
  <svg
    aria-hidden="true"
    viewBox="0 0 200 200"
    className="pointer-events-none absolute right-0 top-0 -z-10 h-40 w-40 sm:h-56 sm:w-56"
  >
    <circle cx="200" cy="0" r="150" fill="#24594C" opacity="0.55" />
    <circle cx="200" cy="0" r="58" fill="#F2A25C" opacity="0.9" />
  </svg>
);

export default GMBOptimizedContact;
