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
  User,
  Youtube,
} from "lucide-react";
import { useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { emailjsConfig, validateEmailjsConfig } from "../../config/emailjs";
import VideoEmbed from "../common/VideoEmbed";

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
      value: "Lun → Ven, 8h30 — 18h00",
      sub: "Réponse sous 24h en jours ouvrés",
      mono: false,
    },
  ];

  // Schema LocalBusiness conforme : vrai numéro, sans aggregateRating inventé
  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    mainEntity: {
      "@type": "LocalBusiness",
      name: "Christophe Mostefaoui — Développeur Web Freelance",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Pau",
        addressRegion: "Pyrénées-Atlantiques",
        addressCountry: "FR",
      },
      telephone: "+33679088845",
      email: "christophe.mostefaoui.dev@gmail.com",
      openingHours: "Mo-Fr 08:30-18:00",
    },
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(contactSchema)}
        </script>
      </Helmet>

      <section
        ref={containerRef}
        id="contact"
        className="relative w-full overflow-hidden bg-[#F4EFE6] dark:bg-[#13110F] py-20 sm:py-28 md:py-32"
        aria-label="Contact"
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

        <div className="container mx-auto px-5 sm:px-8 md:px-12 lg:px-16 relative z-10 max-w-6xl">
          {/* Header édito */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mb-12 sm:mb-16 max-w-4xl"
          >
            <p className="hero-handwritten text-[18px] sm:text-[20px] text-[#1A1715]/60 dark:text-[#F4EFE6]/60 mb-2">
              IX. — Contact
            </p>
            <h2 className="hero-display text-[#1A1715] dark:text-[#F4EFE6]">
              Parlons de votre projet.
            </h2>
            <p className="hero-body mt-6 max-w-2xl text-[16px] sm:text-[17px] leading-[1.7] text-[#1A1715]/80 dark:text-[#F4EFE6]/80">
              Premier échange gratuit, sans engagement. Je réponds personnellement
              à chaque message, sous 24h en jours ouvrés.
            </p>
          </motion.div>

          {/* Vidéo de présentation */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl mb-16 sm:mb-20"
          >
            <p className="hero-handwritten text-[15px] sm:text-[17px] text-[#1A1715]/55 dark:text-[#F4EFE6]/55 mb-3">
              ✏ avant de m'écrire, rencontrez-moi
            </p>
            <VideoEmbed
              youtubeId="tdjXblz4mr4"
              thumbnail="/assets/images/miniature-2.png"
              title="Présentation Expert — Christophe Mostefaoui"
              caption="— React, Node, TypeScript & solutions sur mesure"
              duration="1:40"
              channelUrl="https://www.youtube.com/@christophe-dev-freelance/videos"
              theme="light"
              ariaLabel="Lire la vidéo : Présentation Expert"
            />
          </motion.div>

          {/* Trait de séparation */}
          <div
            className="h-px w-full bg-[#1A1715]/15 dark:bg-[#F4EFE6]/15 mb-12 sm:mb-16"
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
            {/* Bloc infos contact */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5"
            >
              <p className="hero-handwritten text-[16px] sm:text-[18px] text-[#1A1715]/55 dark:text-[#F4EFE6]/55 mb-6">
                ↳ par téléphone ou email
              </p>
              <ul className="space-y-6">
                {contactInfos.map((info) => {
                  const Icon = info.icon;
                  const content = (
                    <div className="flex items-start gap-4">
                      <Icon
                        className="h-5 w-5 mt-1 flex-shrink-0 text-[#F4D35E]"
                        aria-hidden="true"
                        strokeWidth={1.5}
                      />
                      <div className="min-w-0 flex-1">
                        <p className="hero-body text-[12px] uppercase tracking-[0.18em] text-[#1A1715]/45 dark:text-[#F4EFE6]/45 mb-1">
                          {info.label}
                        </p>
                        <p
                          className={`text-[15px] sm:text-[16px] text-[#1A1715] dark:text-[#F4EFE6] ${
                            info.mono ? "font-mono tabular-nums" : "hero-body"
                          }`}
                        >
                          {info.value}
                        </p>
                        {info.sub && (
                          <p className="hero-body text-[13px] mt-1 text-[#1A1715]/55 dark:text-[#F4EFE6]/55">
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
                          className="group block transition-colors hover:text-[#F4D35E]"
                          aria-label={`${info.label} : ${info.value}`}
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

              {/* Trait séparateur + liens sociaux */}
              <div
                className="h-px w-12 bg-[#1A1715]/20 dark:bg-[#F4EFE6]/20 my-8"
                aria-hidden="true"
              />
              <p className="hero-handwritten text-[15px] sm:text-[17px] text-[#1A1715]/55 dark:text-[#F4EFE6]/55 mb-4">
                ↳ faisons connaissance ailleurs
              </p>
              <ul className="flex flex-wrap items-center gap-x-5 gap-y-3">
                <li>
                  <a
                    href="https://www.linkedin.com/in/christophemostefaoui/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Profil LinkedIn (nouvel onglet)"
                    className="hero-body group inline-flex items-center gap-1.5 text-[14px] text-[#1A1715]/80 dark:text-[#F4EFE6]/80 hover:text-[#F4D35E] transition-colors"
                  >
                    <Linkedin
                      className="h-4 w-4 flex-shrink-0"
                      aria-hidden="true"
                      strokeWidth={1.5}
                    />
                    <span className="border-b border-current/30 pb-0.5 group-hover:border-[#F4D35E]">
                      LinkedIn
                    </span>
                    <ArrowUpRight
                      className="h-3 w-3 opacity-60 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden="true"
                    />
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/krismos64"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Profil GitHub (nouvel onglet)"
                    className="hero-body group inline-flex items-center gap-1.5 text-[14px] text-[#1A1715]/80 dark:text-[#F4EFE6]/80 hover:text-[#F4D35E] transition-colors"
                  >
                    <Github
                      className="h-4 w-4 flex-shrink-0"
                      aria-hidden="true"
                      strokeWidth={1.5}
                    />
                    <span className="border-b border-current/30 pb-0.5 group-hover:border-[#F4D35E]">
                      GitHub
                    </span>
                    <ArrowUpRight
                      className="h-3 w-3 opacity-60 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden="true"
                    />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.youtube.com/@christophe-dev-freelance/videos"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Chaîne YouTube (nouvel onglet)"
                    className="hero-body group inline-flex items-center gap-1.5 text-[14px] text-[#1A1715]/80 dark:text-[#F4EFE6]/80 hover:text-[#F4D35E] transition-colors"
                  >
                    <Youtube
                      className="h-4 w-4 flex-shrink-0"
                      aria-hidden="true"
                      strokeWidth={1.5}
                    />
                    <span className="border-b border-current/30 pb-0.5 group-hover:border-[#F4D35E]">
                      YouTube
                    </span>
                    <ArrowUpRight
                      className="h-3 w-3 opacity-60 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden="true"
                    />
                  </a>
                </li>
              </ul>
            </motion.div>

            {/* Bloc formulaire */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-7"
            >
              <p className="hero-handwritten text-[16px] sm:text-[18px] text-[#1A1715]/55 dark:text-[#F4EFE6]/55 mb-6">
                ↳ par message
              </p>

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="border-l-2 border-[#F4D35E] pl-6 py-6"
                >
                  <CheckCircle2
                    className="h-8 w-8 text-[#F4D35E] mb-4"
                    strokeWidth={1.5}
                  />
                  <h3
                    style={{
                      fontFamily: '"Fraunces", "Times New Roman", serif',
                      fontStyle: "italic",
                      fontWeight: 500,
                    }}
                    className="text-[26px] sm:text-[30px] leading-tight text-[#1A1715] dark:text-[#F4EFE6] mb-3"
                  >
                    Message envoyé.
                  </h3>
                  <p className="hero-body text-[15px] sm:text-[16px] leading-[1.7] text-[#1A1715]/75 dark:text-[#F4EFE6]/75 mb-6 max-w-md">
                    Merci pour votre message. Je vous réponds personnellement
                    sous 24h en jours ouvrés.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setIsSubmitted(false);
                      setStatus("");
                    }}
                    className="hero-body group inline-flex items-center gap-2 text-[14px] text-[#1A1715]/80 dark:text-[#F4EFE6]/80 hover:text-[#F4D35E] transition-colors"
                  >
                    <span className="border-b border-current/40 pb-0.5 group-hover:border-[#F4D35E]">
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
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Votre nom"
                      icon={User}
                      autoComplete="name"
                      autoCapitalize="words"
                      required
                    />
                    <FieldInput
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Votre email"
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
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Téléphone (optionnel)"
                      icon={Phone}
                      autoComplete="tel"
                      inputMode="tel"
                    />
                    <FieldInput
                      name="city"
                      type="text"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="Votre ville"
                      icon={MapPin}
                      autoComplete="address-level2"
                      autoCapitalize="words"
                    />
                  </div>

                  <FieldSelect
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    required
                    aria-label="Type de projet"
                  >
                    <option value="">Type de projet…</option>
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
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Décrivez votre projet : besoins, objectifs, contexte, délais, budget approximatif…"
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
                  </div>

                  {status && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`hero-body text-[14px] py-2.5 px-4 border-l-2 ${
                        status.includes("succès")
                          ? "border-[#F4D35E] text-[#1A1715] dark:text-[#F4D35E]"
                          : "border-[#C9342D] text-[#C9342D]"
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
          </div>

          {/* Citation manuscrite signée */}
          <motion.figcaption
            initial={{ opacity: 0, y: 14 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.8, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mt-20 sm:mt-24 max-w-xl"
          >
            <p className="hero-handwritten text-[20px] sm:text-[24px] leading-snug text-[#1A1715]/90 dark:text-[#F4D35E]">
              « Le devis arrive sous 24h. Le projet, c'est plus long. »
            </p>
            <p className="hero-handwritten mt-1 text-[15px] text-[#1A1715]/50 dark:text-[#F4EFE6]/50">
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

interface FieldInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
}

const FieldInput = ({ icon: Icon, ...props }: FieldInputProps) => (
  <div className="relative">
    <Icon
      className="absolute left-0 top-1/2 -translate-y-1/2 h-4 w-4 text-[#1A1715]/40 dark:text-[#F4EFE6]/40 pointer-events-none"
      strokeWidth={1.5}
    />
    <input
      {...props}
      className="hero-body w-full pl-7 pr-2 py-2.5 bg-transparent border-b border-[#1A1715]/25 dark:border-[#F4EFE6]/25 text-[#1A1715] dark:text-[#F4EFE6] placeholder:text-[#1A1715]/40 dark:placeholder:text-[#F4EFE6]/40 text-[16px] focus:outline-none focus:border-[#F4D35E] transition-colors"
    />
  </div>
);

interface FieldSelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  children: React.ReactNode;
}

const FieldSelect = ({ children, ...props }: FieldSelectProps) => (
  <div className="relative">
    <select
      {...props}
      className="hero-body w-full pl-0 pr-2 py-2.5 bg-transparent border-b border-[#1A1715]/25 dark:border-[#F4EFE6]/25 text-[#1A1715] dark:text-[#F4EFE6] text-[16px] focus:outline-none focus:border-[#F4D35E] transition-colors appearance-none cursor-pointer"
    >
      {children}
    </select>
    <span
      className="absolute right-2 top-1/2 -translate-y-1/2 text-[#1A1715]/40 dark:text-[#F4EFE6]/40 pointer-events-none"
      aria-hidden="true"
    >
      ▾
    </span>
  </div>
);

interface FieldTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
}

const FieldTextarea = ({ icon: Icon, ...props }: FieldTextareaProps) => (
  <div className="relative">
    <Icon
      className="absolute left-0 top-3 h-4 w-4 text-[#1A1715]/40 dark:text-[#F4EFE6]/40 pointer-events-none"
      strokeWidth={1.5}
    />
    <textarea
      {...props}
      className="hero-body w-full pl-7 pr-2 py-2.5 bg-transparent border-b border-[#1A1715]/25 dark:border-[#F4EFE6]/25 text-[#1A1715] dark:text-[#F4EFE6] placeholder:text-[#1A1715]/40 dark:placeholder:text-[#F4EFE6]/40 text-[16px] focus:outline-none focus:border-[#F4D35E] transition-colors resize-none leading-[1.6]"
    />
  </div>
);

export default GMBOptimizedContact;
