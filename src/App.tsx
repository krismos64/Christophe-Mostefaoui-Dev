import { lazy, Suspense, useEffect } from "react";
import { MotionConfig } from "framer-motion";
import { HelmetProvider } from "react-helmet-async";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import FeaturedSnippetsFAQ from "./components/sections/FeaturedSnippetsFAQ";
import Hero from "./components/sections/Hero";
import { ApercuAPropos, ApercuRealisations, ApercuServices } from "./components/home/Apercus";
import ServiceArea from "./components/sections/ServiceArea";
import AIChatbot from "./components/AIChatbot";
import { useStructuredData } from "./hooks/useStructuredData";
import LLMOptimizedHead from "./components/seo/LLMOptimizedHead";
import ErrorBoundary from "./components/common/ErrorBoundary";
import RemiseEnHaut from "./components/common/RemiseEnHaut";

// Lazy loading des pages pour optimiser le code-splitting
const LegalNotice = lazy(() => import("./pages/LegalNotice"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const LocalLanding = lazy(() => import("./pages/LocalLanding"));
const NotFound = lazy(() => import("./pages/NotFound"));
const ServicesPage = lazy(() => import("./pages/ServicesPage"));
const ServiceDetail = lazy(() => import("./pages/ServiceDetail"));
const Realisations = lazy(() => import("./pages/Realisations"));
const APropos = lazy(() => import("./pages/APropos"));
const Contact = lazy(() => import("./pages/Contact"));
const Avis = lazy(() => import("./pages/Avis"));

const Home = () => {
  const structuredData = useStructuredData();
  const navigate = useNavigate();
  const { hash } = useLocation();

  // Le formulaire a quitté la home (05/11/2026) : les anciens liens
  // /#contact (favoris, posts, messages) ouvrent désormais la page contact
  useEffect(() => {
    if (hash === "#contact") navigate("/contact", { replace: true });
  }, [hash, navigate]);

  return (
    <>
      <LLMOptimizedHead />

      {/* Données structurées JSON-LD - Source unique sans doublons */}
      {structuredData.map((data, index) => (
        <script
          key={`structured-data-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
      ))}

      {/* Home = aperçus qui renvoient vers les pages intérieures (refonte 11/2026) */}
      <Hero />
      <ApercuServices />
      <ApercuRealisations />
      <ApercuAPropos />
      <FeaturedSnippetsFAQ />
      <ServiceArea />
    </>
  );
};

function App() {
  return (
    <ErrorBoundary>
      <HelmetProvider>          {/* reducedMotion="user" : respecte le réglage système « Réduire
              les animations » sur toutes les animations Framer Motion du site,
              sans avoir à le gérer composant par composant. */}
          <MotionConfig reducedMotion="user">
            <Router basename="/">
            <div className="App min-h-screen bg-creme overflow-x-hidden max-w-[100vw]">
              <a href="#contenu" className="skip-link">
                Aller au contenu principal
              </a>
              <Header />
              <main
                id="contenu"
                role="main"
                className="overflow-x-hidden max-w-[100vw]"
              >
                <Suspense
                  fallback={
                    <div className="flex items-center justify-center min-h-screen">
                      <div className="text-xl text-gray-600">
                        Chargement...
                      </div>
                    </div>
                  }
                >
                  <RemiseEnHaut />
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/faq" element={<Navigate to="/#faq" replace />} />
                    <Route path="/services" element={<ServicesPage />} />
                    {/* Pages dédiées par service (src/data/servicePages.ts) */}
                    <Route path="/creation-site-vitrine" element={<ServiceDetail />} />
                    <Route path="/creation-boutique-en-ligne" element={<ServiceDetail />} />
                    <Route path="/refonte-site-internet" element={<ServiceDetail />} />
                    <Route path="/referencement-local" element={<ServiceDetail />} />
                    <Route path="/realisations" element={<Realisations />} />
                    <Route path="/a-propos" element={<APropos />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/avis" element={<Avis />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/blog/:slug" element={<BlogPost />} />
                    <Route path="/mentions-legales" element={<LegalNotice />} />
                    <Route
                      path="/politique-de-confidentialite"
                      element={<PrivacyPolicy />}
                    />
                    {/* Pages locales SEO (contenu : src/data/localPages.ts) */}
                    <Route
                      path="/creation-site-internet-pau"
                      element={<LocalLanding />}
                    />
                    <Route
                      path="/creation-site-internet-bayonne"
                      element={<LocalLanding />}
                    />
                    <Route
                      path="/creation-site-internet-biarritz"
                      element={<LocalLanding />}
                    />
                    <Route
                      path="/creation-site-internet-orthez-bearn"
                      element={<LocalLanding />}
                    />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Suspense>
              </main>
              <Footer />
              <AIChatbot />
            </div>
            </Router>
          </MotionConfig>
      </HelmetProvider>
    </ErrorBoundary>
  );
}

export default App;
