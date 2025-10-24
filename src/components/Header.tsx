import React, { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { useDarkMode } from './DarkModeProvider';
import atomLogo from 'figma:asset/e18042df5537cba0b4ef97cb84b1473577218359.png';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(false);
  const { isDark, toggleDarkMode } = useDarkMode();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    const handleShowNavbar = () => {
      setVisible(true);
    };
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('show-navbar', handleShowNavbar);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('show-navbar', handleShowNavbar);
    };
  }, []);

  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Partners', href: '#universities' },
    { label: 'Team', href: '#team' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[rgba(var(--background),0.8)] backdrop-blur-lg border-b border-[rgb(var(--border))]'
          : 'bg-transparent'
      }`}
      style={{
        transform: visible ? 'translateY(0)' : 'translateY(-100%)',
        transition: 'transform 0.6s ease-out'
      }}
    >
      <div className="max-w-[1440px] mx-auto px-8 py-4 flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <a href="#home" className="flex items-center transition-opacity duration-200 hover:opacity-80">
            <img src={atomLogo} alt="Atom" className="h-8" />
          </a>
          {/* Tagline right below logo */}
          <p className="text-xs text-[rgb(var(--foreground),0.6)]">
            Pick the world's best brains.
          </p>
        </div>

        <nav className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-[rgb(var(--foreground))] hover:text-[rgb(var(--accent))] transition-colors duration-200 text-sm"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-lg backdrop-blur-xl bg-[rgba(var(--muted),0.5)] border border-[rgba(var(--foreground),0.1)] hover:bg-[rgba(var(--muted),0.8)] hover:shadow-[0_4px_24px_0_rgba(var(--accent),0.2)] transition-all duration-200 relative overflow-hidden group"
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
    </header>
  );
}