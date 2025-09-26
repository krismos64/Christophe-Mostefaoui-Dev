import { useEffect, useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import About from "./components/sections/About";
import AIIntegration from "./components/sections/AIIntegration";
import SimpleBlogCTA from "./components/sections/SimpleBlogCTA";
import Contact from "./components/sections/Contact";
import FeaturedSnippetsFAQ from "./components/sections/FeaturedSnippetsFAQ";
import Hero from "./components/sections/Hero";
import Portfolio from "./components/sections/Portfolio";
import Services from "./components/sections/Services";
import Testimonials from "./components/sections/Testimonials";
import VideoPresentation from "./components/sections/VideoPresentation";
import VideoServices from "./components/sections/VideoServices";
import WelcomeScreen from "./components/welcome/WelcomeScreen";
import { ThemeProvider } from "./context/ThemeContext";
import FAQ from "./pages/FAQ";
import LegalNotice from "./pages/LegalNotice";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Avis from "./pages/Avis";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import { generateFinalStructuredData } from "./utils/structured-data-final";
import { generateVideoStructuredData } from "./utils/video-seo-optimization";
import { generateLocationStructuredData } from "./utils/seo-location-data";
import { generateGoogleStarsSchema } from "./utils/google-stars-optimization";
import { generateLocalSEOSchema } from "./utils/local-seo-schema";
import LLMOptimizedHead from "./components/seo/LLMOptimizedHead";
import VideoSEOHead from "./components/seo/VideoSEOHead";
import HiddenReviews from "./components/seo/HiddenReviews";
import GMBOptimizedContact from "./components/seo/GMBOptimizedContact";

const Home = () => {
  const finalStructuredData = generateFinalStructuredData();
  const videoStructuredData = generateVideoStructuredData();
  const locationStructuredData = generateLocationStructuredData();
  const googleStarsData = generateGoogleStarsSchema();
  const localSEOData = generateLocalSEOSchema();

  return (
  <>
    <LLMOptimizedHead />
    <VideoSEOHead />

    {/* Données structurées consolidées FINALES - Sans doublons */}
    {finalStructuredData.map((data, index) => (
      <script
        key={`final-structured-data-${index}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
      />
    ))}

    {/* Données structurées vidéo pour indexation Google Video */}
    {videoStructuredData.map((videoData, index) => (
      <script
        key={`video-data-${index}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoData) }}
      />
    ))}

    {/* Données structurées de localisation pour SEO national */}
    {locationStructuredData.map((locationData, index) => (
      <script
        key={`location-data-${index}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(locationData) }}
      />
    ))}

    {/* Données optimisées pour affichage étoiles Google */}
    {googleStarsData.map((starsData, index) => (
      <script
        key={`stars-data-${index}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(starsData) }}
      />
    ))}

    {/* Données SEO local pour GMB */}
    {localSEOData.map((localData, index) => (
      <script
        key={`local-seo-${index}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localData) }}
      />
    ))}

    {/* Témoignages cachés pour SEO */}
    <HiddenReviews />

    <Hero />
    <VideoPresentation
      youtubeUrl="https://www.youtube.com/embed/tdjXblz4mr4"
      videoTitle="Christophe Mostefaoui - Développeur Web Full-Stack Expert à Pau | React.js Node.js TypeScript"
      videoDescription="Découvrez mon expertise, concepteur développeur d'applications freelance spécialisé en React.js, Node.js et TypeScript. Création d'applications SaaS performantes, solutions e-commerce sur mesure et sites web modernes à Pau et dans les Pyrénées-Atlantiques. Services de développement web professionnel pour entreprises, associations et particuliers."
      videoDuration="PT2M30S"
      videoThumbnail="/assets/images/Christophe-freelance.png"
    />
    <About />
    <Services />
    <SimpleBlogCTA />
    <FeaturedSnippetsFAQ />
    <AIIntegration />
    <SimpleBlogCTA />
    <Portfolio />
    <Testimonials />
    <VideoServices />
    <GMBOptimizedContact />
  </>
  );
};

function App() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [isFirstVisit, setIsFirstVisit] = useState(true);

  useEffect(() => {
    // Afficher le welcome screen à chaque accès/rechargement
    setIsFirstVisit(true);
    setShowWelcome(true);
  }, []);

  const handleWelcomeComplete = () => {
    setShowWelcome(false);
  };

  if (isFirstVisit && showWelcome) {
    return (
      <HelmetProvider>
        <Helmet>
          <title>
            Christophe - Développeur Web Freelance Expert France | React.js Node.js TypeScript
          </title>
          <meta
            name="description"
            content="Christophe, développeur web freelance expert ⭐⭐⭐⭐⭐ (47 avis). Spécialiste React.js, Node.js, TypeScript. Disponible France entière. Devis gratuit 24h. Solutions web modernes et performantes."
          />
          <meta
            name="keywords"
            content="développeur web freelance France, expert React.js, Node.js développeur, TypeScript expert, Christophe Mostefaoui, Christophe, développeur freelance Paris, Lyon, Marseille, Toulouse, Bordeaux, développeur Pau, Artix, applications SaaS, e-commerce, intégration IA, chatbot GPT Claude, développement moderne"
          />
          <meta name="robots" content="index, follow" />
          <meta name="author" content="Christophe Mostefaoui" />

          {/* Open Graph pour les réseaux sociaux */}
          <meta
            property="og:title"
            content="Christophe - Développeur Web & Expert IA"
          />
          <meta
            property="og:description"
            content="Développeur full-stack et expert en intégration IA. Chatbots, machine learning, analyse prédictive. React.js, Node.js, Python. Solutions digitales innovantes à Pau."
          />
          <meta property="og:type" content="website" />
          <meta
            property="og:url"
            content="https://christophe-dev-freelance.fr/"
          />
          <meta
            property="og:image"
            content="https://christophe-dev-freelance.fr/assets/images/chris-web.png"
          />
          <meta property="og:image:width" content="1024" />
          <meta property="og:image:height" content="1024" />
          <meta property="og:image:type" content="image/png" />
          <meta property="og:image:alt" content="Christophe Mostefaoui - Développeur Web & Expert IA" />

          {/* Twitter Card */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta
            name="twitter:title"
            content="Christophe - Développeur Web & IA Expert"
          />
          <meta
            name="twitter:description"
            content="Expert intégration IA & développeur full-stack. Chatbots, ML, React.js, Node.js, Python"
          />

          {/* Données structurées JSON-LD pour le SEO */}
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Christophe Mostefaoui",
              jobTitle: "Développeur Web Full-Stack & Expert IA",
              description:
                "Développeur web expert spécialisé en intégration IA, React.js, Node.js, TypeScript et Python",
              url: "https://christophe-dev-freelance.fr",
              image:
                "https://christophe-dev-freelance.fr/assets/videos/animation-chris-dev.mp4",
              sameAs: [
                "https://www.linkedin.com/in/christophemostefaoui/",
                "https://github.com/krismos64",
              ],
              knowsAbout: [
                "Intelligence Artificielle",
                "Machine Learning",
                "Chatbots GPT/Claude",
                "Python",
                "React.js",
                "Node.js",
                "TypeScript",
                "JavaScript",
                "Full-Stack Development",
                "SaaS Applications",
                "Analyse Prédictive",
                "Vision par Ordinateur",
              ],
              address: {
                "@type": "PostalAddress",
                addressLocality: "Pau",
                addressRegion: "Pyrénées-Atlantiques",
                addressCountry: "France",
              },
              hasOccupation: {
                "@type": "Occupation",
                name: "Développeur Web Full-Stack & Expert IA",
                occupationLocation: {
                  "@type": "City",
                  name: "Pau",
                },
                skills:
                  "IA/ML, Python, ChatGPT/Claude, React.js, Node.js, TypeScript, JavaScript, MongoDB, MySQL, API REST, TensorFlow, Scikit-learn",
              },
            })}
          </script>

          {/* Preload des ressources critiques */}
          <link
            rel="preload"
            href="/assets/videos/animation-chris-dev.mp4"
            as="video"
            type="video/mp4"
          />

          {/* Canonical URL */}
          <link rel="canonical" href="https://christophe-dev-freelance.fr/" />
        </Helmet>
        <WelcomeScreen onComplete={handleWelcomeComplete} />
      </HelmetProvider>
    );
  }

  return (
    <HelmetProvider>
      <ThemeProvider>
        <Router basename="/">
          <div className="App min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
            <Header />
            <main role="main">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:slug" element={<BlogPost />} />
                <Route path="/avis" element={<Avis />} />
                <Route path="/mentions-legales" element={<LegalNotice />} />
                <Route
                  path="/politique-de-confidentialite"
                  element={<PrivacyPolicy />}
                />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
