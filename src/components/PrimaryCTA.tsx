import React from 'react';
import { PrimaryButton } from './PrimaryButton';

export function PrimaryCTA() {
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-32 bg-[rgb(var(--muted))] relative">
      <div className="max-w-[1440px] mx-auto px-8 text-center">
        <div className="w-16 h-0.5 bg-[rgb(var(--accent))] mx-auto mb-8" />
        <h2 className="text-4xl text-[rgb(var(--foreground))] mb-8">
          Ready to discover breakthrough innovations?
        </h2>
        <div onClick={scrollToContact}>
          <PrimaryButton variant="coral">Contact us</PrimaryButton>
        </div>
      </div>
    </section>
  );
}
