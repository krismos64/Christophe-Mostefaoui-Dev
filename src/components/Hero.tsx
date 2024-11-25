import React from "react";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section id="home" className="pt-24 pb-12 md:pt-32 md:pb-20">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Développeur web freelance à votre service
            </h1>
            <p className="mt-6 text-xl text-gray-600 leading-relaxed">
              Transformez vos idées en solutions digitales innovantes.
              Spécialisé en React, Symfony, et Node.js, je vous accompagne dans
              la réalisation de vos projets web.
            </p>
            <div className="mt-8">
              <a
                href="#contact"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                Contactez-moi
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </div>
          </div>
          <div className="flex-1">
            <img
              src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80"
              alt="Developer workspace"
              className="rounded-lg shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
