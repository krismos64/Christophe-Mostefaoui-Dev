import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import About from "./components/sections/About";
import Contact from "./components/sections/Contact";
import Hero from "./components/sections/Hero";
import Portfolio from "./components/sections/Portfolio";
import Services from "./components/sections/Services";
import Testimonials from "./components/sections/Testimonials";
import { ThemeProvider } from "./context/ThemeContext";
import FAQ from "./pages/FAQ";
import LegalNotice from "./pages/LegalNotice";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import { SEOHead } from "./utils/seo";

const Home = () => (
  <>
    <SEOHead />
    <Hero />
    <About />
    <Services />
    <Portfolio />
    <Testimonials />
    <Contact />
  </>
);

function App() {
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
