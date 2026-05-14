import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { PhoneIcon, MapPinIcon, ClockIcon, StarIcon } from "@heroicons/react/24/outline";
import { Mail, Send, User, MessageSquare, CheckCircle2, ArrowRight } from "lucide-react";
import emailjs from "@emailjs/browser";
import { emailjsConfig, validateEmailjsConfig } from "../../config/emailjs";
import VideoEmbed from "../common/VideoEmbed";
import FuturisticBackground from "../effects/FuturisticBackground";
import { containerVariants, itemVariants, createCardVariants } from "../effects/FuturisticEffects";

const GMBOptimizedContact = () => {
  const contentRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(contentRef, { once: true, margin: "-100px" });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    projectType: "",
    description: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [status, setStatus] = useState("");

  const cardVariants = createCardVariants(0.2, 0.15);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
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
Téléphone: ${formData.phone || 'Non renseigné'}
Ville: ${formData.city || 'Non spécifiée'}

🎯 PROJET:
Type: ${formData.projectType}

📝 DESCRIPTION:
${formData.description || 'Aucune description fournie'}

---
Message envoyé depuis le formulaire de contact GMB du site christophe-dev-freelance.fr
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
        description: ""
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
      icon: <PhoneIcon className="h-6 w-6" />,
      label: "Téléphone",
      value: "+33 6 79 08 88 45",
      href: "tel:+33679088845",
      colorClass: "bg-green-500/20 group-hover:bg-green-500/30",
      iconColor: "text-green-600 dark:text-green-400"
    },
    {
      icon: <Mail className="h-6 w-6" />,
      label: "Email",
      value: "christophe.mostefaoui.dev@gmail.com",
      href: "mailto:christophe.mostefaoui.dev@gmail.com",
      colorClass: "bg-blue-500/20 group-hover:bg-blue-500/30",
      iconColor: "text-blue-600 dark:text-blue-400"
    },
    {
      icon: <MapPinIcon className="h-6 w-6" />,
      label: "Localisation",
      value: "Pau, Pyrénées-Atlantiques (64)",
      subValue: "Disponible France entière à distance",
      colorClass: "bg-purple-500/20 group-hover:bg-purple-500/30",
      iconColor: "text-purple-600 dark:text-purple-400"
    },
    {
      icon: <ClockIcon className="h-6 w-6" />,
      label: "Horaires",
      value: "Lun-Ven : 8h30 - 18h00",
      subValue: "Urgences acceptées",
      colorClass: "bg-yellow-500/20 group-hover:bg-yellow-500/30",
      iconColor: "text-yellow-600 dark:text-yellow-400"
    }
  ];

  const cities = ["Pau centre", "Artix", "Lescar", "Billère", "Jurançon", "Bayonne", "Biarritz", "France entière"];

  return (
    <FuturisticBackground
      id="contact"
      orbs={[
        { size: 320, colorClass: "glowing-orb-cyan", left: "5%", top: "10%", delay: 0 },
        { size: 280, colorClass: "glowing-orb-purple", left: "85%", top: "45%", delay: 1.5 },
        { size: 220, colorClass: "glowing-orb-pink", left: "40%", top: "80%", delay: 3 },
      ]}
      shapes={[
        { delay: 0, duration: 11, size: 55, left: "3%", top: "25%", shape: "hexagon" },
        { delay: 1.5, duration: 13, size: 50, left: "92%", top: "15%", shape: "circle" },
        { delay: 2.5, duration: 10, size: 45, left: "88%", top: "70%", shape: "square" },
        { delay: 0.5, duration: 12, size: 40, left: "10%", top: "85%", shape: "circle" },
      ]}
      codeLines={[
        { delay: 0.5, width: "60%" },
        { delay: 2, width: "45%" },
        { delay: 3.5, width: "55%" },
      ]}
    >
      <div className="max-w-6xl mx-auto px-4 relative z-10" ref={contentRef}>
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white"
          >
            Contact - Développeur Web Expert Pau
            <motion.span
              className="block text-xl text-blue-600 dark:text-blue-400 mt-3 font-normal"
              variants={itemVariants}
            >
              Pyrénées-Atlantiques • France entière à distance
            </motion.span>
          </motion.h2>

          <motion.div
            className="flex items-center justify-center gap-2 text-yellow-400 mb-6"
            variants={itemVariants}
          >
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, rotate: -180 }}
                animate={isInView ? { opacity: 1, rotate: 0 } : { opacity: 0, rotate: -180 }}
                transition={{ duration: 0.5, delay: 0.7 + i * 0.1 }}
              >
                <StarIcon className="h-7 w-7 drop-shadow-lg" />
              </motion.div>
            ))}
            <motion.span
              className="text-gray-700 dark:text-gray-300 ml-3 font-semibold text-lg"
              variants={itemVariants}
            >
              5.0/5 • 47 avis clients
            </motion.span>
          </motion.div>

          {/* Vidéo de présentation : Présentation Expert */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl mx-auto mt-8 mb-4 text-left"
          >
            <p className="hero-handwritten text-[15px] sm:text-[17px] text-gray-500 dark:text-gray-400 mb-3">
              ✏ avant de m'écrire, rencontrez-moi
            </p>
            <VideoEmbed
              youtubeId="tdjXblz4mr4"
              thumbnail="/assets/images/Christophe-freelance.png"
              title="Présentation Expert — Christophe Mostefaoui"
              caption="— React, Node, TypeScript & solutions sur mesure"
              duration="2:30"
              channelUrl="https://www.youtube.com/@christophe-dev-freelance/videos"
              theme="light"
              ariaLabel="Lire la vidéo : Présentation Expert"
            />
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Informations de contact */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {/* Card 1: Infos contact */}
            <motion.div
              custom={0}
              variants={cardVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="card-futuristic p-8"
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <div className="card-futuristic-glow" />
              <div className="relative z-10">
                <motion.h3
                  className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white"
                  variants={itemVariants}
                >
                  Christophe Mostefaoui
                  <span className="block text-lg text-blue-600 dark:text-blue-400 mt-2 font-normal">
                    Développeur Web Freelance Expert
                  </span>
                </motion.h3>

                <div className="space-y-4">
                  {contactInfos.map((info, index) => (
                    <motion.div
                      key={info.label}
                      className="flex items-center gap-4 p-4 rounded-xl bg-gray-50/50 dark:bg-white/5 hover:bg-gray-100/70 dark:hover:bg-white/10 transition-all duration-300 group cursor-pointer"
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                      transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                      whileHover={{ x: 5 }}
                    >
                      <div className={`p-3 rounded-xl transition-colors ${info.colorClass}`}>
                        <span className={info.iconColor}>{info.icon}</span>
                      </div>
                      <div>
                        <div className="font-semibold text-lg text-gray-900 dark:text-white">{info.label}</div>
                        {info.href ? (
                          <a
                            href={info.href}
                            className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors text-lg font-medium break-all"
                          >
                            {info.value}
                          </a>
                        ) : (
                          <div className="text-blue-600 dark:text-blue-400 text-lg font-medium">{info.value}</div>
                        )}
                        {info.subValue && (
                          <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">{info.subValue}</div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Card 2: Services locaux */}
            <motion.div
              custom={1}
              variants={cardVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="card-futuristic p-8"
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <div className="card-futuristic-glow" />
              <div className="relative z-10">
                <h4 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Services Pau & Région
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  {cities.map((city, index) => (
                    <motion.div
                      key={city}
                      className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-xl p-3 text-center font-medium text-gray-800 dark:text-gray-200 hover:from-blue-600/30 hover:to-purple-600/30 transition-all duration-300 cursor-pointer border border-blue-200/30 dark:border-white/10"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.3, delay: 0.8 + index * 0.05 }}
                      whileHover={{ scale: 1.05, y: -2 }}
                    >
                      ✅ {city}
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Card 3: Formulaire */}
          <motion.div
            custom={2}
            variants={cardVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="card-futuristic p-8"
          >
            <div className="card-futuristic-glow" />
            <div className="relative z-10">
              {isSubmitted ? (
                <motion.div
                  className="text-center py-8"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <motion.div
                    className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
                  >
                    <CheckCircle2 className="h-10 w-10 text-green-500 dark:text-green-400" />
                  </motion.div>
                  <h3 className="text-3xl font-bold mb-4 text-green-600 dark:text-green-400">Message envoyé !</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg">
                    Merci pour votre message. Je vous répondrai dans les plus brefs délais.
                  </p>
                  <motion.button
                    onClick={() => {
                      setIsSubmitted(false);
                      setStatus("");
                      setFormData({ name: "", email: "", phone: "", city: "", projectType: "", description: "" });
                    }}
                    className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold py-3 px-6 rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all flex items-center gap-2 mx-auto"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Envoyer un autre message
                    <ArrowRight className="h-4 w-4" />
                  </motion.button>
                </motion.div>
              ) : (
                <>
                  <motion.h3
                    className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                    variants={itemVariants}
                  >
                    Devis Gratuit 24h
                    <span className="block text-lg text-blue-600 dark:text-blue-400 mt-2 font-normal">
                      Réponse garantie sous 24h
                    </span>
                  </motion.h3>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Nom */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ duration: 0.5, delay: 0.8 }}
                    >
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-blue-500 dark:text-blue-400 z-10" />
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/80 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 text-lg"
                          placeholder="Quel est votre nom ?"
                          required
                        />
                      </div>
                    </motion.div>

                    {/* Email */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ duration: 0.5, delay: 0.9 }}
                    >
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-blue-500 dark:text-blue-400 z-10" />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/80 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 text-lg"
                          placeholder="Votre email ?"
                          required
                        />
                      </div>
                    </motion.div>

                    {/* Téléphone */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ duration: 0.5, delay: 1.0 }}
                    >
                      <div className="relative">
                        <PhoneIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-blue-500 dark:text-blue-400 z-10" />
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/80 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 text-lg"
                          placeholder="Votre téléphone (optionnel)"
                        />
                      </div>
                    </motion.div>

                    {/* Ville */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ duration: 0.5, delay: 1.1 }}
                    >
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className="w-full px-4 py-4 rounded-xl bg-white/80 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 text-lg"
                        placeholder="Votre ville (Pau, Paris, Lyon...)"
                      />
                    </motion.div>

                    {/* Type de projet */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ duration: 0.5, delay: 1.2 }}
                    >
                      <select
                        name="projectType"
                        value={formData.projectType}
                        onChange={handleChange}
                        className="w-full px-4 py-4 rounded-xl bg-white/80 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 text-lg"
                        required
                      >
                        <option value="">Type de projet souhaité ?</option>
                        <option value="site-vitrine">Site vitrine moderne</option>
                        <option value="ecommerce">E-commerce / Boutique en ligne</option>
                        <option value="saas">Application SaaS</option>
                        <option value="ia">Intégration IA / Chatbot</option>
                        <option value="api">API / Backend</option>
                        <option value="maintenance">Maintenance / Refonte</option>
                        <option value="consultation">Consultation technique</option>
                        <option value="renseignements">Demande de renseignements</option>
                        <option value="autre">Autre</option>
                      </select>
                    </motion.div>

                    {/* Description */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ duration: 0.5, delay: 1.3 }}
                    >
                      <div className="relative">
                        <MessageSquare className="absolute left-3 top-4 h-5 w-5 text-blue-500 dark:text-blue-400 z-10" />
                        <textarea
                          name="description"
                          value={formData.description}
                          onChange={handleChange}
                          rows={5}
                          className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/80 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 resize-none text-lg"
                          placeholder="Décrivez votre projet, vos besoins, technologies souhaitées, délais, budget approximatif..."
                        />
                      </div>
                    </motion.div>

                    {/* Submit Button */}
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 text-white font-bold py-5 px-6 rounded-xl hover:from-blue-600 hover:via-purple-600 hover:to-indigo-600 transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-xl relative overflow-hidden group"
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ duration: 0.5, delay: 1.4 }}
                    >
                      {/* Effet de brillance */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />

                      <div className="relative z-10 flex items-center justify-center gap-3">
                        {isSubmitting ? (
                          <>
                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white" />
                            <span className="text-lg">Envoi en cours...</span>
                          </>
                        ) : (
                          <>
                            <Send className="h-6 w-6" />
                            <div>
                              <div className="text-lg">Envoyer ma demande</div>
                              <div className="text-sm font-normal opacity-90">Réponse garantie sous 24h</div>
                            </div>
                          </>
                        )}
                      </div>
                    </motion.button>

                    {status && (
                      <motion.div
                        className={`text-center p-3 rounded-lg mt-4 ${
                          status.includes("succès")
                            ? "bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400"
                            : "bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400"
                        }`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        {status}
                      </motion.div>
                    )}
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </div>

        {/* Schema markup pour GMB */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            mainEntity: {
              "@type": "LocalBusiness",
              name: "Christophe Mostefaoui - Développeur Web Freelance Expert",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Pau",
                addressRegion: "Pyrénées-Atlantiques",
                addressCountry: "FR"
              },
              telephone: "+33-6-79-08-88-45",
              email: "christophe.mostefaoui.dev@gmail.com",
              openingHours: "Mo-Fr 08:30-18:00",
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "5.0",
                reviewCount: "47"
              }
            }
          })}
        </script>
      </div>
    </FuturisticBackground>
  );
};

export default GMBOptimizedContact;
