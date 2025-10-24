import React, { useState } from 'react';
import { DarkModeProvider } from './components/DarkModeProvider';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { StatsBand } from './components/StatsBand';
import { PatentTiles } from './components/PatentTiles';
import { Timeline } from './components/Timeline';
import { LogosGrid } from './components/LogosGrid';
import { PrivacySection } from './components/PrivacySection';
import { TeamSection } from './components/TeamSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

export default function App() {
  const [heroAnimationDone, setHeroAnimationDone] = useState(false);

  return (
    <DarkModeProvider>
      <div className="min-h-screen" id="home">
        {heroAnimationDone && <Header />}
        <main>
          <Hero onAnimationComplete={() => setHeroAnimationDone(true)} />
          <StatsBand />
          <Timeline />
          <PatentTiles />
          <LogosGrid />
          <PrivacySection />
          <TeamSection />
          <TestimonialsSection />
          <ContactSection />
        </main>
        {heroAnimationDone && <Footer />}
      </div>
    </DarkModeProvider>
  );
}