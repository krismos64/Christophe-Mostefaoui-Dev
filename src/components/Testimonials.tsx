import { Star } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  company: string;
  role: string;
  rating: number;
  review: string;
  date: string;
}

export default function Testimonials() {
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Maria Alvarez",
      company: "TechStart Solutions",
      role: "Assistante Marketing",
      rating: 5,
      review:
        "Christophe a développé notre plateforme e-commerce avec un professionnalisme remarquable. Délais respectés, code de qualité et excellent suivi. Je recommande vivement ses services !",
      date: "2025-03-15",
    },
    {
      id: 2,
      name: "Vincent Parrot",
      company: "Garage Vincent Parrot",
      role: "Dirigeant du Garage Vincent Parrot",
      rating: 5,
      review:
        "Site web moderne et responsive créé pour notre garage. Christophe a su comprendre nos besoins et nous a livré un travail impeccable. Communication fluide et expertise technique au top.",
      date: "2025-02-28",
    },
    {
      id: 3,
      name: "Stacy Menendez",
      company: "StacyMakeupCreations",
      role: "Maquilleuse professionnelle",
      rating: 5,
      review:
        "Refonte complète de mon site vitrine avec un espace administrateur. Très satisfaite du résultat final. Christophe est à l'écoute et de bon conseil pour optimiser ma présence digitale.",
      date: "2025-01-20",
    },
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-5 w-5 ${
          index < rating
            ? "text-yellow-400 fill-current"
            : "text-gray-300 dark:text-gray-600"
        }`}
      />
    ));
  };

  const averageRating =
    testimonials.reduce((sum, testimonial) => sum + testimonial.rating, 0) /
    testimonials.length;

  // Données structurées JSON-LD pour le SEO
  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Christophe Mostefaoui - Développeur Web Freelance",
    url: "https://christophe-mostefaoui.dev",
    description:
      "Développeur web freelance spécialisé en React, TypeScript et Symfony. Création de sites web modernes et applications sur mesure.",
    address: {
      "@type": "PostalAddress",
      addressRegion: "Nouvelle-Aquitaine",
      addressCountry: "FR",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: averageRating.toFixed(1),
      reviewCount: testimonials.length,
      bestRating: "5",
      worstRating: "1",
    },
    review: testimonials.map((testimonial) => ({
      "@type": "Review",
      author: {
        "@type": "Person",
        name: testimonial.name,
      },
      reviewRating: {
        "@type": "Rating",
        ratingValue: testimonial.rating,
        bestRating: "5",
        worstRating: "1",
      },
      reviewBody: testimonial.review,
      datePublished: testimonial.date,
      publisher: {
        "@type": "Organization",
        name: testimonial.company,
      },
    })),
  };

  return (
    <>
      {/* Balisage JSON-LD pour le SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLdData),
        }}
      />

      <section
        id="testimonials"
        className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-300"
      >
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Témoignages Clients
            </h2>
            <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
              Ce que disent mes clients de notre collaboration
            </p>
            <div className="flex items-center justify-center mt-6 space-x-2">
              <div className="flex space-x-1">
                {renderStars(Math.round(averageRating))}
              </div>
              <span className="text-lg font-semibold text-gray-900 dark:text-white ml-2">
                {averageRating.toFixed(1)}/5
              </span>
              <span className="text-gray-600 dark:text-gray-400">
                ({testimonials.length} avis)
              </span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className="group card-hover p-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 animate-slideIn"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Rating */}
                <div className="flex items-center mb-4">
                  <div className="flex space-x-1">
                    {renderStars(testimonial.rating)}
                  </div>
                  <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                    {testimonial.rating}/5
                  </span>
                </div>

                {/* Review */}
                <blockquote className="text-gray-700 dark:text-gray-300 mb-6 italic">
                  "{testimonial.review}"
                </blockquote>

                {/* Client Info */}
                <div className="border-t pt-4 border-gray-200 dark:border-gray-700">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="h-12 w-12 bg-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-lg">
                          {testimonial.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {testimonial.name}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {testimonial.role}
                      </p>
                      <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                        {testimonial.company}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
