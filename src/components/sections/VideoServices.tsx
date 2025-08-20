import Lottie from "lottie-react";
import { Video, Camera, Sparkles, PlayCircle } from "lucide-react";
import droneAnimation from "../../animations/Drone Camera.json";
import videoAnimation from "../../animations/Cut Video.json";

export default function VideoServices() {
  const services = [
    {
      icon: <Video className="h-8 w-8 text-blue-600 dark:text-blue-400" />,
      title: "Montage Vidéo Professionnel",
      description: "Montage créatif avec Final Cut Pro X sur Mac",
      features: [
        "Étalonnage colorimétrique",
        "Effets visuels et transitions",
        "Optimisation pour web et réseaux sociaux",
        "Export 4K et formats multiples"
      ]
    },
    {
      icon: <Camera className="h-8 w-8 text-blue-600 dark:text-blue-400" />,
      title: "Prises de Vue Aériennes",
      description: "Captation drone DJI Mavic Air haute définition",
      features: [
        "Photos et vidéos aériennes HD pour entreprises",
        "Vues immobilières spectaculaires",
        "Captation de sites industriels et commerciaux",
        "Inspections techniques et suivis de chantier"
      ]
    }
  ];

  const useCases = [
    {
      icon: <Sparkles className="h-6 w-6" />,
      title: "Publicités d'Entreprise",
      description: "Créez des vidéos promotionnelles qui captent l'attention et convertissent vos prospects en clients."
    },
    {
      icon: <PlayCircle className="h-6 w-6" />,
      title: "Communication Associative",
      description: "Donnez de la visibilité à vos actions avec des vidéos impactantes pour vos campagnes et événements."
    }
  ];

  return (
    <section
      id="video-services"
      className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300 relative overflow-hidden"
    >
      {/* Fond décoratif */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 opacity-50"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Titre principal */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-4">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Production Vidéo & Drone
            </h2>
            <img
              src="/assets/images/badge-drone.png"
              alt="Télépilote Drone Certifié DGAC AlphaTango"
              className="w-20 h-20 object-contain"
            />
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            🎬 Sublimez votre communication avec des contenus visuels professionnels
          </p>
        </div>

        {/* Services principaux avec animations */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Service Montage Vidéo */}
          <div className="group relative">
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Animation Lottie */}
              <div className="w-full md:w-1/3 h-48 md:h-64">
                <Lottie 
                  animationData={videoAnimation} 
                  loop={true}
                  className="w-full h-full"
                />
              </div>
              
              {/* Contenu */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  {services[0].icon}
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {services[0].title}
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {services[0].description}
                </p>
                <ul className="space-y-2">
                  {services[0].features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-blue-600 dark:text-blue-400 mt-1">✓</span>
                      <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Service Drone */}
          <div className="group relative">
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Animation Lottie */}
              <div className="w-full md:w-1/3 h-48 md:h-64">
                <Lottie 
                  animationData={droneAnimation} 
                  loop={true}
                  className="w-full h-full"
                />
              </div>
              
              {/* Contenu */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  {services[1].icon}
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {services[1].title}
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {services[1].description}
                </p>
                <ul className="space-y-2">
                  {services[1].features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-blue-600 dark:text-blue-400 mt-1">✓</span>
                      <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Cas d'usage */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 md:p-12 text-white">
          <h3 className="text-2xl md:text-3xl font-bold mb-8 text-center">
            Des Solutions Visuelles Pour Tous Vos Besoins
          </h3>
          
          <div className="grid md:grid-cols-2 gap-8">
            {useCases.map((useCase, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-all duration-300">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-white/20 rounded-lg">
                    {useCase.icon}
                  </div>
                  <h4 className="text-xl font-semibold">
                    {useCase.title}
                  </h4>
                </div>
                <p className="text-white/90">
                  {useCase.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            Démarquez-vous avec des contenus visuels professionnels qui racontent votre histoire
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <PlayCircle className="h-5 w-5" />
            Discutons de votre projet vidéo
          </a>
        </div>

        {/* Avantages compétitifs */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="p-4">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">4K</div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Résolution Ultra HD</p>
          </div>
          <div className="p-4">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">360°</div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Vues panoramiques</p>
          </div>
          <div className="p-4">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">FCPX</div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Montage Pro Mac</p>
          </div>
          <div className="p-4">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">DJI</div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Technologie Drone</p>
          </div>
        </div>
      </div>
    </section>
  );
}