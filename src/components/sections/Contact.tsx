import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import {
  AtSign,
  CheckCircle2,
  Github,
  Linkedin,
  LinkIcon,
  Mail,
  MessageSquare,
  Phone,
  Send,
  Tag,
  User,
} from "lucide-react";
import React, { useState } from "react";
import contactAnimation from "../../animations/contact.json";
import { emailjsConfig, validateEmailjsConfig } from "../../config/emailjs";
import { useFormValidation } from "../../hooks/useFormValidation";
import { FormData } from "../../types/common";
import AnimatedButton from "../common/AnimatedButton";
import FormField from "../common/FormField";

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
    consent: false,
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  // Form validation
  const {
    errors,
    touched,
    validateSingleField,
    isFormValid,
    markFieldAsTouched,
    clearErrors,
  } = useFormValidation({
    name: { required: true, minLength: 2, maxLength: 50 },
    email: {
      required: true,
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      maxLength: 100,
    },
    subject: { required: true, minLength: 3, maxLength: 100 },
    message: { required: true, minLength: 10, maxLength: 1000 },
    consent: { required: true },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const newValue =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));

    // Validate field on change
    validateSingleField(name as keyof FormData, newValue);
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name } = e.target;
    markFieldAsTouched(name as keyof FormData);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (!isFormValid(formData)) {
      setStatus("Veuillez corriger les erreurs dans le formulaire.");
      return;
    }

    // Validate EmailJS configuration
    if (!validateEmailjsConfig()) {
      setStatus(
        "Configuration EmailJS manquante. Veuillez contacter l'administrateur."
      );
      return;
    }

    setLoading(true);
    setStatus("");

    try {
      const { serviceId, templateId, userId } = emailjsConfig;

      await emailjs.send(
        serviceId,
        templateId,
        {
          to_name: "Christophe Mostefaoui",
          from_name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        },
        userId
      );

      setSubmitted(true);
      setStatus("Message envoyé avec succès !");
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
        consent: false,
      });
      clearErrors();
    } catch (error) {
      setStatus("Erreur lors de l'envoi du message. Veuillez réessayer.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setSubmitted(false);
    setStatus("");
    clearErrors();
  };

  return (
    <section
      id="contact"
      className="py-20 transition-colors duration-300 dark:bg-gray-900 relative overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Travaillons ensemble
          </motion.h2>
          <motion.p
            className="text-xl text-gray-600 dark:text-gray-300 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Discutons de votre projet et donnons vie à vos idées
          </motion.p>
          <motion.div
            className="max-w-xs mx-auto"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Lottie animationData={contactAnimation} loop={true} />
          </motion.div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                Restons en contact
              </h3>
              <div className="space-y-6">
                <motion.div
                  className="group flex items-center space-x-4 p-4 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg group-hover:bg-blue-200 dark:group-hover:bg-blue-900/50 transition-colors">
                    <Mail className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <a
                    href="mailto:christophe.mostefaoui.dev@gmail.com"
                    className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
                  >
                    christophe.mostefaoui.dev@gmail.com
                  </a>
                </motion.div>

                <motion.div
                  className="group flex items-center space-x-4 p-4 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg group-hover:bg-green-200 dark:group-hover:bg-green-900/50 transition-colors">
                    <Phone className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <a
                    href="tel:+33679088845"
                    className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors font-medium"
                  >
                    +33 6 79 08 88 45
                  </a>
                </motion.div>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Suivez-moi
              </h4>
              <div className="flex space-x-4">
                {[
                  {
                    href: "https://www.linkedin.com/in/christophemostefaoui/",
                    icon: Linkedin,
                    label: "LinkedIn",
                    color: "blue",
                  },
                  {
                    href: "https://github.com/krismos64",
                    icon: Github,
                    label: "GitHub",
                    color: "gray",
                  },
                  {
                    href: "https://krismos.fr/",
                    icon: LinkIcon,
                    label: "Portfolio",
                    color: "purple",
                  },
                ].map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${social.label} de Christophe Mostefaoui`}
                    className={`p-3 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 hover:border-${social.color}-300 dark:hover:border-${social.color}-600 transition-all duration-300 group`}
                    whileHover={{ scale: 1.1, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                  >
                    <social.icon
                      className={`h-6 w-6 text-gray-600 dark:text-gray-400 group-hover:text-${social.color}-600 dark:group-hover:text-${social.color}-400 transition-colors`}
                    />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="relative"
          >
            {submitted ? (
              <motion.div
                className="relative p-8 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800 backdrop-blur-sm"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <div className="text-center">
                  <motion.div
                    className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
                  >
                    <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-green-800 dark:text-green-400 mb-3">
                    Message envoyé avec succès !
                  </h3>
                  <p className="text-green-700 dark:text-green-300 mb-6">
                    Merci pour votre message. Je vous répondrai dans les plus
                    brefs délais.
                  </p>
                  <AnimatedButton
                    onClick={resetForm}
                    variant="success"
                    size="sm"
                  >
                    Envoyer un autre message
                  </AnimatedButton>
                </div>
              </motion.div>
            ) : (
              <motion.div
                className="relative p-8 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-xl"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                {/* Glassmorphism overlay */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 to-white/5 dark:from-gray-700/20 dark:to-gray-900/5" />

                <form
                  onSubmit={handleSubmit}
                  className="space-y-6 relative z-10"
                >
                  <FormField
                    label=""
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.name}
                    touched={touched.name}
                    required
                    placeholder="Quel est votre nom ?"
                    icon={<User className="h-5 w-5" />}
                  />

                  <FormField
                    label=""
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.email}
                    touched={touched.email}
                    required
                    placeholder="Votre email ?"
                    icon={<AtSign className="h-5 w-5" />}
                  />

                  <FormField
                    label=""
                    name="subject"
                    type="text"
                    value={formData.subject}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.subject}
                    touched={touched.subject}
                    required
                    placeholder="De quoi souhaitez-vous parler ?"
                    icon={<Tag className="h-5 w-5" />}
                  />

                  <FormField
                    label=""
                    name="message"
                    type="textarea"
                    value={formData.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.message}
                    touched={touched.message}
                    required
                    placeholder="Décrivez votre projet, vos besoins ou vos questions..."
                    rows={5}
                    icon={<MessageSquare className="h-5 w-5" />}
                  />

                  {/* Custom Checkbox */}
                  <motion.div
                    className="flex items-start space-x-3"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                  >
                    <motion.label
                      className="relative flex items-center cursor-pointer"
                      whileTap={{ scale: 0.95 }}
                    >
                      <input
                        type="checkbox"
                        name="consent"
                        checked={formData.consent}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      <motion.div
                        className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-300 ${
                          formData.consent
                            ? "bg-blue-600 border-blue-600"
                            : "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
                        }`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        {formData.consent && (
                          <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            <CheckCircle2 className="h-3 w-3 text-white" />
                          </motion.div>
                        )}
                      </motion.div>
                    </motion.label>
                    <span className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                      J'accepte que mes données soient utilisées pour me
                      recontacter concernant ma demande
                      {errors.consent && touched.consent && (
                        <span className="block text-red-500 text-xs mt-1">
                          {errors.consent}
                        </span>
                      )}
                    </span>
                  </motion.div>

                  <AnimatedButton
                    type="submit"
                    loading={loading}
                    disabled={loading}
                    fullWidth
                    variant="primary"
                    size="lg"
                    icon={!loading && <Send className="h-5 w-5" />}
                    className="mt-8"
                  >
                    {loading ? "Envoi en cours..." : "Envoyer le message"}
                  </AnimatedButton>

                  {status && (
                    <motion.div
                      className={`text-center p-3 rounded-lg ${
                        status.includes("succès")
                          ? "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400"
                          : "bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400"
                      }`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {status}
                    </motion.div>
                  )}
                </form>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
