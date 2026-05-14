import { lazy, Suspense } from "react";
import { HelmetProvider } from "react-helmet-async";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import About from "./components/sections/About";
import Contact from "./components/sections/Contact";
import FeaturedSnippetsFAQ from "./components/sections/FeaturedSnippetsFAQ";
import Hero from "./components/sections/Hero";
import Portfolio from "./components/sections/Portfolio";
import Services from "./components/sections/Services";
import Pricing from "./components/sections/Pricing";
import VideoServices from "./components/sections/VideoServices";
import ServiceArea from "./components/sections/ServiceArea";
import SmartPlanningShowcase from "./components/sections/SmartPlanningShowcase";
import AIChatbot from "./components/AIChatbot";
import { ThemeProvider } from "./context/ThemeContext";
import { useStructuredData } from "./hooks/useStructuredData";
import LLMOptimizedHead from "./components/seo/LLMOptimizedHead";
import GMBOptimizedContact from "./components/seo/GMBOptimizedContact";
import ErrorBoundary from "./components/common/ErrorBoundary";

// Lazy loading des pages pour optimiser le code-splitting
const FAQ = lazy(() => import("./pages/FAQ"));
const LegalNotice = lazy(() => import("./pages/LegalNotice"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));

const Home = () => {
  const structuredData = useStructuredData();

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

      <Hero />
      <About />
      <SmartPlanningShowcase />
      <Services />
      <Pricing />
      <FeaturedSnippetsFAQ />
      <Portfolio />
      <VideoServices />
      <ServiceArea />
      <GMBOptimizedContact />
    </>
  );
};

function App() {
  return (
    <ErrorBoundary>
      <HelmetProvider>
        <ThemeProvider>
          <Router basename="/">
            <div className="App min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300 overflow-x-hidden max-w-[100vw]">
              <Header />
              <main role="main" className="overflow-x-hidden max-w-[100vw]">
                <Suspense
                  fallback={
                    <div className="flex items-center justify-center min-h-screen">
                      <div className="text-xl text-gray-600 dark:text-gray-300">
                        Chargement...
                      </div>
                    </div>
                  }
                >
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/faq" element={<FAQ />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/blog/:slug" element={<BlogPost />} />
                    <Route path="/mentions-legales" element={<LegalNotice />} />
                    <Route
                      path="/politique-de-confidentialite"
                      element={<PrivacyPolicy />}
                    />
                  </Routes>
                </Suspense>
              </main>
              <Footer />
              <AIChatbot />
            </div>
          </Router>
        </ThemeProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
}

export default App;
