import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Capabilities from './components/Capabilities';
import WorkScroll from './components/WorkScroll';
import Process from './components/Process';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Preloader from './components/Preloader';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  useEffect(() => {
    // Prevent scrolling while loading
    if (isLoading) {
      document.body.style.overflow = 'hidden';
      window.scrollTo(0, 0);
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isLoading]);

  return (
    <main className="bg-black min-h-screen w-full relative selection:bg-indigo selection:text-white">
      <AnimatePresence mode="wait">
        {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      {/* Main Content - Only visible after load starts fading to prevent flash */}
      <div className={`${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-1000`}>
          {/* Global Elements */}
          <div className="hidden md:block">
            <CustomCursor />
          </div>
          <Navbar />

          {/* Sections Reordered: Work (Archive) First, then Methodology (Protocol/Process), then Offer (Tiers) */}
          <Hero />
          <WorkScroll />
          <Capabilities />
          <Process />
          <Services onSelectPlan={(planName) => setSelectedPlan(planName)} />
          <Contact selectedPlan={selectedPlan} />
          <Footer />
      </div>
    </main>
  );
};

export default App;