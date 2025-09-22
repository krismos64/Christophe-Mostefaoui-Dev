import { PhoneIcon, MapPinIcon, ClockIcon, StarIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import { Mail, Send, User, MessageSquare, CheckCircle2, ArrowRight } from "lucide-react";
import { useState } from "react";
import emailjs from "@emailjs/browser";
import contactAnimation from "../../animations/contact.json";
import { emailjsConfig, validateEmailjsConfig } from "../../config/emailjs";

const GMBOptimizedContact = () => {
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation simple des champs requis
    if (!formData.name || !formData.email || !formData.projectType) {
      setStatus("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    // Validate EmailJS configuration
    if (!validateEmailjsConfig()) {
      setStatus("Configuration EmailJS manquante. Veuillez contacter l'administrateur.");
      return;
    }

    setIsSubmitting(true);
    setStatus("");

    try {
      const { serviceId, templateId, userId } = emailjsConfig;

      // Créer le message complet avec toutes les informations
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

      // Reset form
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

  return (
    <section id="contact" className="py-20 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300 relative overflow-hidden">
      {/* Effets de fond animés */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 dark:bg-blue-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-purple-500/10 dark:bg-purple-400/15 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-indigo-500/15 dark:bg-indigo-400/25 rounded-full blur-2xl animate-bounce" />
      </div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        {/* Header GMB optimisé avec animations */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-blue-600 to-purple-600 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Contact - Développeur Web Expert Pau
            <motion.span
              className="block text-xl text-blue-600 dark:text-blue-300 mt-3 font-normal"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Pyrénées-Atlantiques • France entière à distance
            </motion.span>
          </motion.h2>

          <motion.div
            className="flex items-center justify-center gap-2 text-yellow-400 mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, rotate: -180 }}
                animate={{ opacity: 1, rotate: 0 }}
                transition={{ duration: 0.5, delay: 0.7 + i * 0.1 }}
              >
                <StarIcon className="h-7 w-7 drop-shadow-lg" />
              </motion.div>
            ))}
            <motion.span
              className="text-gray-700 dark:text-white ml-3 font-semibold text-lg"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              5.0/5 • 47 avis clients
            </motion.span>
          </motion.div>

          {/* Animation Lottie */}
          <motion.div
            className="max-w-xs mx-auto mb-4"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Lottie animationData={contactAnimation} loop={true} />
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Informations de contact GMB avec animations */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <motion.div
              className="bg-white/70 dark:bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-gray-200 dark:border-white/20 hover:bg-white/80 dark:hover:bg-white/15 transition-all duration-300 shadow-2xl"
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.h3
                className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                Christophe Mostefaoui
                <motion.span
                  className="block text-lg text-blue-600 dark:text-blue-300 mt-2 font-normal"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                >
                  Développeur Web Freelance Expert
                </motion.span>
              </motion.h3>

              <div className="space-y-6">
                <motion.div
                  className="flex items-center gap-4 p-4 rounded-xl bg-gray-100/50 dark:bg-white/5 hover:bg-gray-200/70 dark:hover:bg-white/10 transition-all duration-300 group cursor-pointer"
                  whileHover={{ x: 5 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                >
                  <div className="p-3 bg-green-500/20 rounded-xl group-hover:bg-green-500/30 transition-colors">
                    <PhoneIcon className="h-6 w-6 text-green-600 dark:text-green-400 flex-shrink-0" />
                  </div>
                  <div>
                    <div className="font-semibold text-lg text-gray-900 dark:text-white">Téléphone</div>
                    <a href="tel:+33679088845" className="text-blue-600 dark:text-blue-200 hover:text-blue-800 dark:hover:text-white transition-colors text-lg font-medium">+33 6 79 08 88 45</a>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-center gap-4 p-4 rounded-xl bg-gray-100/50 dark:bg-white/5 hover:bg-gray-200/70 dark:hover:bg-white/10 transition-all duration-300 group cursor-pointer"
                  whileHover={{ x: 5 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.9 }}
                >
                  <div className="p-3 bg-blue-500/20 rounded-xl group-hover:bg-blue-500/30 transition-colors">
                    <Mail className="h-6 w-6 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                  </div>
                  <div>
                    <div className="font-semibold text-lg text-gray-900 dark:text-white">Email</div>
                    <a href="mailto:christophe.mostefaoui.dev@gmail.com" className="text-blue-600 dark:text-blue-200 hover:text-blue-800 dark:hover:text-white transition-colors text-lg font-medium break-all">christophe.mostefaoui.dev@gmail.com</a>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-center gap-4 p-4 rounded-xl bg-gray-100/50 dark:bg-white/5 hover:bg-gray-200/70 dark:hover:bg-white/10 transition-all duration-300 group"
                  whileHover={{ x: 5 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 1.0 }}
                >
                  <div className="p-3 bg-purple-500/20 rounded-xl group-hover:bg-purple-500/30 transition-colors">
                    <MapPinIcon className="h-6 w-6 text-purple-600 dark:text-purple-400 flex-shrink-0" />
                  </div>
                  <div>
                    <div className="font-semibold text-lg text-gray-900 dark:text-white">Localisation</div>
                    <div className="text-blue-600 dark:text-blue-200 text-lg font-medium">Pau, Pyrénées-Atlantiques (64)</div>
                    <div className="text-sm text-blue-500 dark:text-blue-300 mt-1">Disponible France entière à distance</div>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-center gap-4 p-4 rounded-xl bg-gray-100/50 dark:bg-white/5 hover:bg-gray-200/70 dark:hover:bg-white/10 transition-all duration-300 group"
                  whileHover={{ x: 5 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 1.1 }}
                >
                  <div className="p-3 bg-yellow-500/20 rounded-xl group-hover:bg-yellow-500/30 transition-colors">
                    <ClockIcon className="h-6 w-6 text-yellow-600 dark:text-yellow-400 flex-shrink-0" />
                  </div>
                  <div>
                    <div className="font-semibold text-lg text-gray-900 dark:text-white">Horaires</div>
                    <div className="text-blue-600 dark:text-blue-200 text-lg font-medium">Lun-Ven : 8h30 - 18h00</div>
                    <div className="text-sm text-blue-500 dark:text-blue-300 mt-1">Urgences acceptées</div>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Services locaux avec animations */}
            <motion.div
              className="bg-white/70 dark:bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-gray-200 dark:border-white/20 hover:bg-white/80 dark:hover:bg-white/15 transition-all duration-300 shadow-2xl"
              whileHover={{ scale: 1.02, y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <h4 className="text-2xl font-bold mb-6 text-center bg-gradient-to-r from-gray-900 to-blue-600 dark:from-white dark:to-blue-200 bg-clip-text text-transparent">Services Pau & Région</h4>
              <div className="grid grid-cols-2 gap-4">
                {[
                  "Pau centre", "Artix", "Lescar", "Billère",
                  "Jurançon", "Bayonne", "Biarritz", "France entière"
                ].map((city, index) => (
                  <motion.div
                    key={city}
                    className="bg-gradient-to-r from-blue-600/30 to-purple-600/30 rounded-xl p-3 text-center font-medium hover:from-blue-600/40 hover:to-purple-600/40 transition-all duration-300 cursor-pointer border border-white/10"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 1.0 + index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                  >
                    ✅ {city}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Formulaire contact optimisé avec animations */}
          <motion.div
            className="bg-white/70 dark:bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-gray-200 dark:border-white/20 shadow-2xl relative overflow-hidden"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {/* Effet glassmorphism */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 dark:from-white/5 to-transparent" />

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
                  <CheckCircle2 className="h-10 w-10 text-green-400" />
                </motion.div>
                <h3 className="text-3xl font-bold mb-4 text-green-600 dark:text-green-400">Message envoyé !</h3>
                <p className="text-gray-600 dark:text-blue-200 mb-6 text-lg">Merci pour votre message. Je vous répondrai dans les plus brefs délais.</p>
                <motion.button
                  onClick={() => {
                    setIsSubmitted(false);
                    setStatus("");
                    setFormData({name: "", email: "", phone: "", city: "", projectType: "", description: ""});
                  }}
                  className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold py-3 px-6 rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all transform hover:scale-105 flex items-center gap-2 mx-auto"
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
                  className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-gray-900 via-blue-600 to-purple-600 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                >
                  Devis Gratuit 24h
                  <motion.span
                    className="block text-lg text-blue-600 dark:text-blue-300 mt-2 font-normal"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 1.0 }}
                  >
                    Réponse garantie sous 24h
                  </motion.span>
                </motion.h3>

                <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.0 }}
                  >
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-blue-500 dark:text-blue-300 z-10" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/80 dark:bg-white/20 border border-gray-300 dark:border-white/30 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-blue-200 focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 focus:bg-white dark:focus:bg-white/25 transition-all duration-300 text-lg backdrop-blur-sm"
                        placeholder="Quel est votre nom ?"
                        required
                      />
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.1 }}
                  >
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-blue-500 dark:text-blue-300 z-10" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/80 dark:bg-white/20 border border-gray-300 dark:border-white/30 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-blue-200 focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 focus:bg-white dark:focus:bg-white/25 transition-all duration-300 text-lg backdrop-blur-sm"
                        placeholder="Votre email ?"
                        required
                      />
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.2 }}
                  >
                    <div className="relative">
                      <PhoneIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-blue-500 dark:text-blue-300 z-10" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/80 dark:bg-white/20 border border-gray-300 dark:border-white/30 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-blue-200 focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 focus:bg-white dark:focus:bg-white/25 transition-all duration-300 text-lg backdrop-blur-sm"
                        placeholder="Votre téléphone (optionnel)"
                      />
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.3 }}
                  >
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full px-4 py-4 rounded-xl bg-white/80 dark:bg-white/20 border border-gray-300 dark:border-white/30 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-blue-200 focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 focus:bg-white dark:focus:bg-white/25 transition-all duration-300 text-lg backdrop-blur-sm"
                      placeholder="Votre ville (Pau, Paris, Lyon...)"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.4 }}
                  >
                    <select
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleChange}
                      className="w-full px-4 py-4 rounded-xl bg-white/80 dark:bg-white/20 border border-gray-300 dark:border-white/30 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 focus:bg-white dark:focus:bg-white/25 transition-all duration-300 text-lg backdrop-blur-sm"
                      required
                    >
                      <option value="" className="bg-gray-800">Type de projet souhaité ?</option>
                      <option value="site-vitrine" className="bg-gray-800">Site vitrine moderne</option>
                      <option value="ecommerce" className="bg-gray-800">E-commerce / Boutique en ligne</option>
                      <option value="saas" className="bg-gray-800">Application SaaS</option>
                      <option value="ia" className="bg-gray-800">Intégration IA / Chatbot</option>
                      <option value="api" className="bg-gray-800">API / Backend</option>
                      <option value="maintenance" className="bg-gray-800">Maintenance / Refonte</option>
                      <option value="consultation" className="bg-gray-800">Consultation technique</option>
                      <option value="renseignements" className="bg-gray-800">Demande de renseignements</option>
                      <option value="autre" className="bg-gray-800">Autre</option>
                    </select>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.5 }}
                  >
                    <div className="relative">
                      <MessageSquare className="absolute left-3 top-4 h-5 w-5 text-blue-500 dark:text-blue-300 z-10" />
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={5}
                        className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/80 dark:bg-white/20 border border-gray-300 dark:border-white/30 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-blue-200 focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 focus:bg-white dark:focus:bg-white/25 transition-all duration-300 resize-none text-lg backdrop-blur-sm"
                        placeholder="Décrivez votre projet, vos besoins, technologies souhaitées, délais, budget approximatif..."
                      ></textarea>
                    </div>
                  </motion.div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 text-white font-bold py-5 px-6 rounded-xl hover:from-blue-600 hover:via-purple-600 hover:to-indigo-600 transition-all transform hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed shadow-2xl border border-white/20 relative overflow-hidden group"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.6 }}
                  >
                    {/* Effet de brillance */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />

                    <div className="relative z-10 flex items-center justify-center gap-3">
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
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
          </motion.div>
        </div>

        {/* Badges confiance avec animations */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          {[
            { value: "5.0⭐", label: "Note clients", color: "yellow", icon: "⭐" },
            { value: "47", label: "Avis positifs", color: "green", icon: "👥" },
            { value: "3 ans", label: "Expérience", color: "blue", icon: "🎯" },
            { value: "24h", label: "Délai réponse", color: "purple", icon: "⚡" }
          ].map((badge, index) => (
            <motion.div
              key={badge.label}
              className="bg-white/70 dark:bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-gray-200 dark:border-white/20 hover:bg-white/80 dark:hover:bg-white/15 transition-all duration-300 group cursor-pointer"
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <motion.div
                className="text-4xl mb-2"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.4 + index * 0.1, type: "spring", stiffness: 300 }}
              >
                {badge.icon}
              </motion.div>
              <div className={`text-3xl font-bold text-${badge.color}-400 mb-2 group-hover:scale-110 transition-transform`}>
                {badge.value}
              </div>
              <div className="text-sm text-gray-600 dark:text-blue-200 font-medium">{badge.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Schema markup caché pour GMB */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            "mainEntity": {
              "@type": "LocalBusiness",
              "name": "Christophe Mostefaoui - Développeur Web Freelance Expert",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Pau",
                "addressRegion": "Pyrénées-Atlantiques",
                "addressCountry": "FR"
              },
              "telephone": "+33-6-79-08-88-45",
              "email": "christophe.mostefaoui.dev@gmail.com",
              "openingHours": "Mo-Fr 08:30-18:00",
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "5.0",
                "reviewCount": "47"
              }
            }
          })}
        </script>
      </div>
    </section>
  );
};

export default GMBOptimizedContact;