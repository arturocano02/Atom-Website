import React from 'react';
import { DarkModeProvider } from './components/DarkModeProvider';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { StatsBand } from './components/StatsBand';
import { Timeline } from './components/Timeline';
import { LogosGrid } from './components/LogosGrid';
import { PrivacySection } from './components/PrivacySection';
import { TeamSection } from './components/TeamSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <DarkModeProvider>
      <div className="min-h-screen" id="home">
        <Header />
        <main>
          <Hero />
          <StatsBand />
          <Timeline />
          <LogosGrid />
          <PrivacySection />
          <TeamSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </DarkModeProvider>
  );
}