import { useState, useEffect } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { HelmetProvider, Helmet } from 'react-helmet-async';
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import About from "./components/sections/About";
import Contact from "./components/sections/Contact";
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
import { SEOHead, generateLocalBusinessStructuredData } from "./utils/seo";

const Home = () => (
  <>
    <SEOHead structuredData={generateLocalBusinessStructuredData()} />
    <Hero />
    <VideoPresentation 
      youtubeUrl="https://www.youtube.com/embed/tdjXblz4mr4"
      videoTitle="Christophe Mostefaoui - Développeur Web Full-Stack Expert à Pau | React.js Node.js TypeScript"
      videoDescription="Découvrez l'expertise de Christophe Mostefaoui, développeur web freelance spécialisé en React.js, Node.js et TypeScript. Création d'applications SaaS performantes, solutions e-commerce sur mesure et sites web modernes à Pau et dans les Pyrénées-Atlantiques. Services de développement web professionnel pour entreprises locales et nationales."
      videoDuration="PT2M30S"
      videoThumbnail="/assets/images/Christophe-freelance.png"
    />
    <About />
    <Services />
    <Portfolio />
    <Testimonials />
    <VideoServices />
    <Contact />
  </>
);

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
          <title>Christophe Mostefaoui - Développeur Web Full-Stack Expert | React.js Node.js</title>
          <meta name="description" content="Bienvenue sur le portfolio de Christophe Mostefaoui, développeur web full-stack expert à Pau. Spécialiste React.js, Node.js, TypeScript. Créateur d'applications SaaS et solutions digitales innovantes." />
          <meta name="keywords" content="Christophe Mostefaoui, développeur web Pau, React.js expert, Node.js développeur, full-stack developer, applications SaaS, développement web sur mesure, TypeScript, portfolio développeur" />
          <meta name="robots" content="index, follow" />
          <meta name="author" content="Christophe Mostefaoui" />
          
          {/* Open Graph pour les réseaux sociaux */}
          <meta property="og:title" content="Christophe Mostefaoui - Développeur Web Full-Stack Expert" />
          <meta property="og:description" content="Développeur web full-stack spécialisé React.js, Node.js, TypeScript. Créateur d'applications SaaS et solutions digitales sur mesure à Pau." />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://christophe-dev-freelance.fr/" />
          <meta property="og:image" content="https://christophe-dev-freelance.fr/assets/videos/animation-chris-dev.mp4" />
          
          {/* Twitter Card */}
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Christophe Mostefaoui - Développeur Web Expert" />
          <meta name="twitter:description" content="Portfolio développeur web full-stack React.js Node.js TypeScript" />
          
          {/* Données structurées JSON-LD pour le SEO */}
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Christophe Mostefaoui",
              "jobTitle": "Développeur Web Full-Stack",
              "description": "Développeur web expert spécialisé en React.js, Node.js et TypeScript",
              "url": "https://christophe-dev-freelance.fr",
              "image": "https://christophe-dev-freelance.fr/assets/videos/animation-chris-dev.mp4",
              "sameAs": [
                "https://www.linkedin.com/in/christophemostefaoui/",
                "https://github.com/krismos64"
              ],
              "knowsAbout": [
                "React.js",
                "Node.js",
                "TypeScript",
                "JavaScript",
                "Full-Stack Development",
                "SaaS Applications",
                "Web Development"
              ],
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Pau",
                "addressRegion": "Pyrénées-Atlantiques",
                "addressCountry": "France"
              },
              "hasOccupation": {
                "@type": "Occupation",
                "name": "Développeur Web Full-Stack",
                "occupationLocation": {
                  "@type": "City",
                  "name": "Pau"
                },
                "skills": "React.js, Node.js, TypeScript, JavaScript, MongoDB, MySQL, API REST"
              }
            })}
          </script>
          
          {/* Preload des ressources critiques */}
          <link rel="preload" href="/assets/videos/animation-chris-dev.mp4" as="video" type="video/mp4" />
          
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
