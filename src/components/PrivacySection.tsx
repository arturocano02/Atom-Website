import React from 'react';
import { PrivacyTile } from './PrivacyTile';
import { EyeOff, Lock, Shield } from 'lucide-react';

export function PrivacySection() {
  return (
    <section className="py-24 bg-[rgb(var(--background))]">
      <div className="max-w-[1440px] mx-auto px-8">
        <h2 className="text-3xl text-center text-[rgb(var(--foreground))] mb-16">
          Privacy & Security
        </h2>
        <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
          <PrivacyTile
            icon={EyeOff}
            title="Anonymous search"
            description="Search our entire patent database without revealing your identity or strategic interests."
          />
          <PrivacyTile
            icon={Lock}
            title="Encrypted communication"
            description="All communications and data transfers are protected with bank-level encryption."
          />
          <PrivacyTile
            icon={Shield}
            title="No storage without consent"
            description="We never store your data or search history without explicit permission."
          />
        </div>
      </div>
    </section>
  );
}