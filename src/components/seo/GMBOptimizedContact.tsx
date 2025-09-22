import { PhoneIcon, MapPinIcon, ClockIcon, StarIcon } from "@heroicons/react/24/solid";

const GMBOptimizedContact = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-blue-900 to-indigo-900 text-white">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header GMB optimisé */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Contact - Développeur Web Expert Pau
            <span className="block text-xl text-blue-300 mt-2">
              Pyrénées-Atlantiques • France entière à distance
            </span>
          </h2>
          <div className="flex items-center justify-center gap-2 text-yellow-400 mb-4">
            {[...Array(5)].map((_, i) => (
              <StarIcon key={i} className="h-6 w-6" />
            ))}
            <span className="text-white ml-2 font-semibold">5.0/5 • 47 avis clients</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Informations de contact GMB */}
          <div className="space-y-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h3 className="text-2xl font-bold mb-6 text-center">
                Christophe Mostefaoui
                <span className="block text-lg text-blue-300">Développeur Web Freelance Expert</span>
              </h3>

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <PhoneIcon className="h-6 w-6 text-blue-400 flex-shrink-0" />
                  <div>
                    <div className="font-semibold">Téléphone</div>
                    <div className="text-blue-200">+33 6 XX XX XX XX</div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <svg className="h-6 w-6 text-blue-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  <div>
                    <div className="font-semibold">Email</div>
                    <div className="text-blue-200">christophe.mostefaoui.dev@gmail.com</div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <MapPinIcon className="h-6 w-6 text-blue-400 flex-shrink-0" />
                  <div>
                    <div className="font-semibold">Localisation</div>
                    <div className="text-blue-200">Pau, Pyrénées-Atlantiques (64)</div>
                    <div className="text-sm text-blue-300">Disponible France entière à distance</div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <ClockIcon className="h-6 w-6 text-blue-400 flex-shrink-0" />
                  <div>
                    <div className="font-semibold">Horaires</div>
                    <div className="text-blue-200">Lun-Ven : 9h00 - 18h00</div>
                    <div className="text-sm text-blue-300">Urgences acceptées</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Services locaux */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h4 className="text-xl font-bold mb-4">Services Pau & Région</h4>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="bg-blue-600/30 rounded p-2">✅ Pau centre</div>
                <div className="bg-blue-600/30 rounded p-2">✅ Artix</div>
                <div className="bg-blue-600/30 rounded p-2">✅ Lescar</div>
                <div className="bg-blue-600/30 rounded p-2">✅ Billère</div>
                <div className="bg-blue-600/30 rounded p-2">✅ Jurançon</div>
                <div className="bg-blue-600/30 rounded p-2">✅ Bayonne</div>
                <div className="bg-blue-600/30 rounded p-2">✅ Biarritz</div>
                <div className="bg-blue-600/30 rounded p-2">✅ France entière</div>
              </div>
            </div>
          </div>

          {/* Formulaire contact optimisé */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <h3 className="text-2xl font-bold mb-6">Devis Gratuit 24h</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Nom *</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-blue-200 focus:outline-none focus:border-blue-400"
                  placeholder="Votre nom"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Email *</label>
                <input
                  type="email"
                  className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-blue-200 focus:outline-none focus:border-blue-400"
                  placeholder="votre@email.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Ville</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-blue-200 focus:outline-none focus:border-blue-400"
                  placeholder="Pau, Paris, Lyon..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Type de projet *</label>
                <select className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white focus:outline-none focus:border-blue-400">
                  <option value="">Sélectionnez...</option>
                  <option value="site-vitrine">Site vitrine</option>
                  <option value="ecommerce">E-commerce</option>
                  <option value="saas">Application SaaS</option>
                  <option value="ia">Intégration IA</option>
                  <option value="api">API / Backend</option>
                  <option value="maintenance">Maintenance</option>
                  <option value="consultation">Consultation</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Description du projet</label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-blue-200 focus:outline-none focus:border-blue-400 resize-none"
                  placeholder="Décrivez votre projet, technologies souhaitées, délais..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-bold py-4 px-6 rounded-lg hover:from-blue-600 hover:to-indigo-600 transition-all transform hover:scale-105"
              >
                Envoyer ma demande
                <span className="block text-sm font-normal">Réponse garantie sous 24h</span>
              </button>
            </form>
          </div>
        </div>

        {/* Badges confiance */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 text-center">
          <div className="bg-white/10 rounded-lg p-4">
            <div className="text-2xl font-bold text-yellow-400">5.0★</div>
            <div className="text-sm">Note clients</div>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <div className="text-2xl font-bold text-green-400">47</div>
            <div className="text-sm">Avis positifs</div>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <div className="text-2xl font-bold text-blue-400">3 ans</div>
            <div className="text-sm">Expérience</div>
          </div>
          <div className="bg-white/10 rounded-lg p-4">
            <div className="text-2xl font-bold text-purple-400">24h</div>
            <div className="text-sm">Délai réponse</div>
          </div>
        </div>

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
              "telephone": "+33-6-XX-XX-XX-XX",
              "email": "christophe.mostefaoui.dev@gmail.com",
              "openingHours": "Mo-Fr 09:00-18:00",
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