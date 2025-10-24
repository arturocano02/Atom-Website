import React, { useEffect, useState } from 'react';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { useDarkMode } from './DarkModeProvider';
import { PrimaryButton } from './PrimaryButton';
import atomLogo from 'figma:asset/e18042df5537cba0b4ef97cb84b1473577218359.png';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isOverDarkSection, setIsOverDarkSection] = useState(false);
  const { isDark, toggleDarkMode } = useDarkMode();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      
      // Check if header is over dark sections
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Check if we're over the stats band (dark section)
      const statsSection = document.getElementById('stats');
      if (statsSection) {
        const statsRect = statsSection.getBoundingClientRect();
        const isOverStats = statsRect.top < 100 && statsRect.bottom > 0;
        setIsOverDarkSection(isOverStats);
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('keydown', handleEscape);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleEscape);
    };
  }, [mobileMenuOpen]);

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'Companies', href: '#companies' },
    { label: 'Inventors', href: '#inventors' },
    { label: 'Team & Network', href: '#team' },
  ];

  return (
            <header
              className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
                scrolled
                  ? 'bg-[rgba(var(--background),0.95)] backdrop-blur-xl border-b border-[rgb(var(--border))] shadow-lg'
                  : isOverDarkSection
                  ? 'bg-[rgba(0,0,0,0.8)] backdrop-blur-xl'
                  : 'bg-transparent'
              }`}
            >
      <div className="max-w-[1440px] mx-auto px-8 py-4 flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <a href="#home" className="flex items-center transition-opacity duration-200 hover:opacity-80">
            <img src={atomLogo} alt="Atom" className="h-8" />
          </a>
          {/* Tagline right below logo */}
          <p className={`text-xs transition-colors duration-300 ${
            isOverDarkSection ? 'text-white/80' : 'text-[rgb(var(--foreground),0.6)]'
          }`}>
            Pick the world's best brains.
          </p>
        </div>

                <nav className="hidden lg:flex items-center gap-8" role="navigation" aria-label="Main navigation">
                  {navItems.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      className={`transition-colors duration-300 text-sm focus:outline-none focus:ring-2 focus:ring-[rgb(var(--accent))] focus:ring-offset-2 rounded-sm ${
                        isOverDarkSection 
                          ? 'text-white hover:text-[rgb(var(--accent))]' 
                          : 'text-[rgb(var(--foreground))] hover:text-[rgb(var(--accent))]'
                      }`}
                      aria-label={`Navigate to ${item.label} section`}
                    >
                      {item.label}
                    </a>
                  ))}
                </nav>

        <div className="flex items-center gap-4">
          {/* Desktop Contact CTA on the far right */}
          <div className="hidden lg:block">
            <PrimaryButton variant="coral" onClick={scrollToContact}>
              Contact Us
            </PrimaryButton>
          </div>
          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-full backdrop-blur-xl bg-[rgba(var(--muted),0.5)] border border-[rgba(var(--foreground),0.1)] hover:bg-[rgba(var(--muted),0.8)] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[rgb(var(--accent))] focus:ring-offset-2"
            aria-label="Toggle mobile menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5 text-[rgb(var(--foreground))]" />
            ) : (
              <Menu className="w-5 h-5 text-[rgb(var(--foreground))]" />
            )}
          </button>

          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full backdrop-blur-xl bg-[rgba(var(--muted),0.5)] border border-[rgba(var(--foreground),0.1)] hover:bg-[rgba(var(--muted),0.8)] hover:shadow-[0_4px_24px_0_rgba(var(--accent),0.2)] transition-all duration-200 relative overflow-hidden group focus:outline-none focus:ring-2 focus:ring-[rgb(var(--accent))] focus:ring-offset-2"
            aria-label="Toggle dark mode"
          >
            {/* Glass reflection */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent rounded-lg pointer-events-none" />
            
            {isDark ? (
              <Sun className="w-5 h-5 text-[rgb(var(--foreground))] relative z-10" />
            ) : (
              <Moon className="w-5 h-5 text-[rgb(var(--foreground))] relative z-10" />
            )}
          </button>
        </div>
      </div>

              {/* Mobile Menu */}
              {mobileMenuOpen && (
                <div className={`lg:hidden absolute top-full left-0 right-0 backdrop-blur-xl border-t border-[rgb(var(--border))] shadow-lg transition-colors duration-300 ${
                  isOverDarkSection 
                    ? 'bg-[rgba(0,0,0,0.95)]' 
                    : 'bg-[rgba(var(--background),0.95)]'
                }`}>
                  <nav className="px-8 py-6 space-y-4" role="navigation" aria-label="Mobile navigation">
                    {navItems.map((item) => (
                      <a
                        key={item.label}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`block transition-colors duration-300 text-lg py-2 focus:outline-none focus:ring-2 focus:ring-[rgb(var(--accent))] focus:ring-offset-2 rounded-sm ${
                          isOverDarkSection 
                            ? 'text-white hover:text-[rgb(var(--accent))]' 
                            : 'text-[rgb(var(--foreground))] hover:text-[rgb(var(--accent))]'
                        }`}
                        aria-label={`Navigate to ${item.label} section`}
                      >
                        {item.label}
                      </a>
                    ))}
                    {/* Enhanced Mobile Contact CTA */}
                    <a
                      href="#contact"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block bg-gradient-to-r from-[rgb(var(--accent))] to-[rgb(255,107,107,0.8)] text-white px-6 py-4 rounded-full text-lg font-semibold hover:from-[rgb(255,107,107,0.9)] hover:to-[rgb(var(--accent))] hover:shadow-lg hover:shadow-[rgb(var(--accent),0.3)] hover:scale-105 transition-all duration-300 text-center mt-4 focus:outline-none focus:ring-2 focus:ring-[rgb(var(--accent))] focus:ring-offset-2 relative overflow-hidden group"
                    >
                      <span className="relative z-10">Contact Us</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                    </a>
                  </nav>
                </div>
              )}
    </header>
  );
}