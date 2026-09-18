import { useCallback, useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Preloader } from "./components/Preloader";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Experience } from "./components/Experience";
import { Projects } from "./components/Projects";
import { Skills } from "./components/Skills";
import { Achievements } from "./components/Achievements";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";

export default function App() {
  const [booting, setBooting] = useState(true);
  const onComplete = useCallback(() => setBooting(false), []);

  useEffect(() => {
    document.body.style.overflow = booting ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [booting]);

  return (
    <div className="min-h-screen bg-canvas">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <AnimatePresence>{booting && <Preloader onComplete={onComplete} />}</AnimatePresence>
      <Navbar />
      <main id="main">
        <Hero ready={!booting} />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Achievements />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
