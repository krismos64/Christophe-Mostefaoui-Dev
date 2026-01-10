import emailjs from "@emailjs/browser";
import { motion, useInView } from "framer-motion";
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
import React, { useState, useRef } from "react";
import contactAnimation from "../../animations/contact.json";
import { emailjsConfig, validateEmailjsConfig } from "../../config/emailjs";
import { useFormValidation } from "../../hooks/useFormValidation";
import { FormData } from "../../types/common";
import AnimatedButton from "../common/AnimatedButton";
import FormField from "../common/FormField";
import FuturisticBackground from "../effects/FuturisticBackground";
import { containerVariants, itemVariants, lottieVariants } from "../effects/FuturisticEffects";

export default function Contact() {
  const contentRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(contentRef, { once: true, margin: "-100px" });

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

  const socialLinks = [
    {
      href: "https://www.linkedin.com/in/christophemostefaoui/",
      icon: Linkedin,
      label: "LinkedIn",
      hoverColor: "hover:border-blue-400 hover:text-blue-500",
    },
    {
      href: "https://github.com/krismos64",
      icon: Github,
      label: "GitHub",
      hoverColor: "hover:border-gray-400 hover:text-gray-500",
    },
    {
      href: "https://krismos.fr/",
      icon: LinkIcon,
      label: "Portfolio",
      hoverColor: "hover:border-purple-400 hover:text-purple-500",
    },
  ];

  return (
    <FuturisticBackground
      id="contact"
      orbs={[
        { size: 300, colorClass: "glowing-orb-cyan", left: "5%", top: "15%", delay: 0 },
        { size: 260, colorClass: "glowing-orb-purple", left: "85%", top: "50%", delay: 1.5 },
        { size: 200, colorClass: "glowing-orb-pink", left: "40%", top: "80%", delay: 3 },
      ]}
      shapes={[
        { delay: 0, duration: 11, size: 50, left: "3%", top: "30%", shape: "hexagon" },
        { delay: 1.5, duration: 13, size: 45, left: "92%", top: "20%", shape: "circle" },
        { delay: 2.5, duration: 10, size: 40, left: "88%", top: "75%", shape: "square" },
      ]}
      codeLines={[
        { delay: 0.5, width: "55%" },
        { delay: 2, width: "45%" },
      ]}
    >
      <div className="container mx-auto px-6 relative z-10" ref={contentRef}>
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
          >
            Travaillons ensemble
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-600 dark:text-gray-300 mb-8"
          >
            Discutons de votre projet et donnons vie à vos idées
          </motion.p>
          <motion.div
            className="max-w-xs mx-auto"
            variants={lottieVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <Lottie animationData={contactAnimation} loop={true} />
          </motion.div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                Restons en contact
              </h3>
              <div className="space-y-6">
                {/* Email */}
                <motion.div
                  className="group card-futuristic p-4 flex items-center space-x-4"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="card-futuristic-glow" />
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg group-hover:bg-blue-200 dark:group-hover:bg-blue-900/50 transition-colors relative z-10">
                    <Mail className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <a
                    href="mailto:christophe.mostefaoui.dev@gmail.com"
                    className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium relative z-10"
                  >
                    christophe.mostefaoui.dev@gmail.com
                  </a>
                </motion.div>

                {/* Phone */}
                <motion.div
                  className="group card-futuristic p-4 flex items-center space-x-4"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="card-futuristic-glow" />
                  <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg group-hover:bg-green-200 dark:group-hover:bg-green-900/50 transition-colors relative z-10">
                    <Phone className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <a
                    href="tel:+33679088845"
                    className="text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors font-medium relative z-10"
                  >
                    +33 6 79 08 88 45
                  </a>
                </motion.div>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Suivez-moi
              </h4>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${social.label} de Christophe Mostefaoui`}
                    className={`p-3 card-futuristic group ${social.hoverColor}`}
                    whileHover={{ scale: 1.1, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                  >
                    <div className="card-futuristic-glow" />
                    <social.icon className="h-6 w-6 text-gray-600 dark:text-gray-400 group-hover:text-current transition-colors relative z-10" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Badges Certifications */}
            <motion.div
              className="mt-8 flex items-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <motion.img
                src="/assets/images/badge-drone.png"
                alt="Télépilote Drone Certifié DGAC AlphaTango"
                className="w-24 h-24 object-contain"
                whileHover={{ scale: 1.1, rotate: 5 }}
              />
              <motion.img
                src="/assets/images/badge-dev.png"
                alt="Certification Développeur"
                className="w-24 h-24 object-contain"
                whileHover={{ scale: 1.1, rotate: -5 }}
              />
            </motion.div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="relative"
          >
            {submitted ? (
              <motion.div
                className="card-futuristic p-8 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <div className="card-futuristic-glow" />
                <div className="text-center relative z-10">
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
                className="card-futuristic p-8"
                initial={{ y: 20, opacity: 0 }}
                animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <div className="card-futuristic-glow" />

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
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
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
    </FuturisticBackground>
  );
}
