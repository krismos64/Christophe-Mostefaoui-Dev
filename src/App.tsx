import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Portfolio from "./components/Portfolio";
import Services from "./components/Services";
import Testimonials from "./components/Testimonials";
import { ThemeProvider } from "./context/ThemeContext";
import FAQ from "./pages/FAQ";
import LegalNotice from "./pages/LegalNotice";
import PrivacyPolicy from "./pages/PrivacyPolicy";

const Home = () => (
  <>
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
    <ThemeProvider>
      <Router basename="/">
        <div className="App min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
          <Header />
          <main>
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
  );
}

export default App;
