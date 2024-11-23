import React, { useState } from "react";
import { Mail, Phone, Linkedin, Github, LinkIcon } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    consent: false,
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Contact
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Discutons de votre projet
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">
              Restons en contact
            </h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="h-6 w-6 text-blue-600" />
                <a
                  href="mailto:christophe.mostefaoui.dev@gmail.com"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  christophe.mostefaoui.dev@gmail.com
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-6 w-6 text-blue-600" />
                <a
                  href="tel:+33679088845"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  +33 6 79 08 88 45
                </a>
              </div>
              <div className="flex space-x-4 mt-6">
                <a
                  href="https://www.linkedin.com/in/christophemostefaoui/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <Linkedin className="h-6 w-6" />
                </a>
                <a
                  href="https://github.com/krismos64"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <Github className="h-6 w-6" />
                </a>
                <a
                  href="https://krismos.fr/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <LinkIcon className="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>

          <div>
            {submitted ? (
              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-green-800 mb-2">
                  Message envoyé !
                </h3>
                <p className="text-green-700">
                  Merci pour votre message. Je vous répondrai dans les plus
                  brefs délais.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Nom
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Sujet
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.subject}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.message}
                    onChange={handleChange}
                  ></textarea>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="consent"
                    name="consent"
                    required
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    checked={formData.consent}
                    onChange={handleChange}
                  />
                  <label htmlFor="consent" className="text-sm text-gray-600">
                    J'accepte les conditions générales
                  </label>
                </div>
                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Envoyer
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
