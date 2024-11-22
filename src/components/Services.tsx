import React from 'react';
import { Globe, Server, Shield, Wrench, Brain, MessageSquare } from 'lucide-react';

export default function Services() {
  const services = [
    {
      icon: <Globe className="h-8 w-8 text-blue-600" />,
      title: 'Sites Web Sur Mesure',
      description: 'Développement de sites web modernes et responsifs avec React et Symfony',
    },
    {
      icon: <Server className="h-8 w-8 text-blue-600" />,
      title: 'Applications Web',
      description: "Création d'applications web sécurisées et performantes",
    },
    {
      icon: <Brain className="h-8 w-8 text-blue-600" />,
      title: 'Intelligence Artificielle',
      description: 'Intégration de solutions IA pour optimiser vos processus',
    },
    {
      icon: <Wrench className="h-8 w-8 text-blue-600" />,
      title: 'Maintenance',
      description: 'Support technique et mises à jour de vos plateformes existantes',
    },
    {
      icon: <Shield className="h-8 w-8 text-blue-600" />,
      title: 'Sécurité',
      description: 'Implémentation des meilleures pratiques de sécurité web',
    },
    {
      icon: <MessageSquare className="h-8 w-8 text-blue-600" />,
      title: 'Conseil',
      description: 'Accompagnement technique et stratégique pour vos projets',
    },
  ];

  return (
    <section id="services" className="py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Mes Services</h2>
          <p className="mt-4 text-xl text-gray-600">
            Des solutions adaptées à vos besoins
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.title}
              className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {service.title}
              </h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}