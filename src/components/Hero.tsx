import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { PrimaryButton } from './PrimaryButton';
import { PatentConstellationHero } from './PatentConstellationHero';

export function Hero() {
  const [firstLineComplete, setFirstLineComplete] = useState(false);
  const [displayedFirstLine, setDisplayedFirstLine] = useState('');
  const [displayedSecondLine, setDisplayedSecondLine] = useState('');
  const [showSubheader, setShowSubheader] = useState(false);
  const [showCTA, setShowCTA] = useState(false);
  const [showConstellation, setShowConstellation] = useState(false);
  const [showNavbar, setShowNavbar] = useState(false);
  
  const firstLine = "In business, you want to be a front runner.";
  const secondLine = "Not a latecomer.";
  
  useEffect(() => {
    // Type first line
    let currentIndex = 0;
    const firstLineInterval = setInterval(() => {
      if (currentIndex <= firstLine.length) {
        setDisplayedFirstLine(firstLine.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(firstLineInterval);
        setFirstLineComplete(true);
        
        // Longer pause before typing second line
        setTimeout(() => {
          let secondIndex = 0;
          const secondLineInterval = setInterval(() => {
            if (secondIndex <= secondLine.length) {
              setDisplayedSecondLine(secondLine.slice(0, secondIndex));
              secondIndex++;
            } else {
              clearInterval(secondLineInterval);
              
              // Show subheader after second line completes
              setTimeout(() => {
                setShowSubheader(true);
                
                // Show CTA after subheader
                setTimeout(() => {
                  setShowCTA(true);
                  
                  // Show constellation after CTA
                  setTimeout(() => {
                    setShowConstellation(true);
                    
                    // Show navbar last
                    setTimeout(() => {
                      setShowNavbar(true);
                      // Dispatch event to trigger navbar animation
                      window.dispatchEvent(new CustomEvent('show-navbar'));
                    }, 400);
                  }, 400);
                }, 300);
              }, 300);
            }
          }, 40);
        }, 1200); // Longer pause before second line (was 600ms, now 1200ms)
      }
    }, 40);
    
    return () => clearInterval(firstLineInterval);
  }, []);

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center pt-24 pb-16 bg-[rgb(var(--background))] relative overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Text content */}
          <div className="space-y-6 relative z-20">
            {/* Typewriter headline - BOLD and BIGGER */}
            <div className="min-h-[220px]">
              <h1 className="text-5xl lg:text-7xl text-[rgb(var(--foreground))]" style={{ fontWeight: 700, lineHeight: 1.1 }}>
                {displayedFirstLine}
                {!firstLineComplete && <span className="animate-pulse">|</span>}
                <br />
                <span className="text-[rgb(var(--accent))]" style={{ fontStyle: 'italic' }}>
                  {displayedSecondLine}
                  {firstLineComplete && displayedSecondLine.length < secondLine.length && (
                    <span className="animate-pulse">|</span>
                  )}
                </span>
              </h1>
            </div>

            {/* Subheader */}
            <motion.p
              className="text-lg lg:text-xl text-[rgb(var(--foreground),0.8)] max-w-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: showSubheader ? 1 : 0, y: showSubheader ? 0 : 20 }}
              transition={{ duration: 0.6 }}
            >
              We help connect companies with breakthrough innovations through our AI-powered patent discovery system.
            </motion.p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: showCTA ? 1 : 0, scale: showCTA ? 1 : 0.9 }}
              transition={{ duration: 0.5 }}
            >
              <PrimaryButton variant="coral" onClick={scrollToContact}>
                Contact Us
              </PrimaryButton>
            </motion.div>
          </div>

          {/* Right: Constellation - Desktop only */}
          <div className="hidden lg:block relative" style={{ height: '600px' }}>
            <motion.div 
              className="absolute inset-0 -inset-x-12 -inset-y-12"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: showConstellation ? 1 : 0, scale: showConstellation ? 1 : 0.95 }}
              transition={{ duration: 0.8 }}
            >
              {showConstellation && <PatentConstellationHero />}
            </motion.div>
          </div>
        </div>
        
        {/* Mobile constellation - below the fold */}
        <div className="lg:hidden mt-16 relative" style={{ height: '500px' }}>
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: showConstellation ? 1 : 0 }}
            transition={{ duration: 0.8 }}
          >
            {showConstellation && <PatentConstellationHero />}
          </motion.div>
        </div>
      </div>
    </section>
  );
}