import React from 'react';

export function Footer() {
  return (
    <footer className="border-t border-[rgb(var(--border))] bg-[rgb(var(--background))] relative z-10">
      <div className="max-w-[1440px] mx-auto px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex flex-col gap-2">
            <p className="text-sm text-[rgb(var(--foreground))]">
              Atom IP Marketplace
            </p>
            <p className="text-sm text-[rgb(var(--foreground),0.7)]">
              info@atomgroup.ai
            </p>
            <p className="text-sm text-[rgb(var(--foreground),0.7)]">
              54 Baker Street, London, W1U 7BU
            </p>
          </div>

          <div className="flex gap-6 text-sm">
            <a
              href="#privacy"
              className="text-[rgb(var(--foreground),0.7)] hover:text-[rgb(var(--accent))] transition-colors duration-200"
            >
              Privacy
            </a>
            <a
              href="#terms"
              className="text-[rgb(var(--foreground),0.7)] hover:text-[rgb(var(--accent))] transition-colors duration-200"
            >
              Terms
            </a>
            <a
              href="#security"
              className="text-[rgb(var(--foreground),0.7)] hover:text-[rgb(var(--accent))] transition-colors duration-200"
            >
              Security
            </a>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-[rgb(var(--border))]">
          <p className="text-xs text-center text-[rgb(var(--foreground),0.5)]">
            © {new Date().getFullYear()} Atom IP Marketplace. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
