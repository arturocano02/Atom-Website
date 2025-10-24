import React from 'react';
import { ValueCard } from './ValueCard';
import { Building2, GraduationCap } from 'lucide-react';

export function ValueBlocks() {
  return (
    <section className="py-32 bg-[rgb(var(--background))]">
      <div className="max-w-[1440px] mx-auto px-8">
        <div className="grid lg:grid-cols-2 gap-8">
          <ValueCard
            icon={Building2}
            title="Innovation is the beating heart of progress"
            description="Companies need breakthrough technologies to stay competitive. Our platform connects you directly with the world's most valuable intellectual property."
            benefits={[
              'Discover patent-protected innovations matched to your exact needs',
              'Connect directly with researchers and institutions',
              'Fast-track licensing and collaboration agreements',
              'Access our expert team for IP strategy and due diligence',
            ]}
            href="#companies"
          />

          <ValueCard
            icon={GraduationCap}
            title="Turn research into real-world impact"
            description="Universities and startups create tomorrow's technologies. We help you showcase innovations, connect with industry partners, and accelerate commercialization."
            benefits={[
              'List your patents and technologies in our global marketplace',
              'AI-powered matching connects you with the right companies',
              'Secure licensing agreements with transparent terms',
              'Maintain control of your IP throughout the process',
            ]}
            href="#universities"
          />
        </div>
      </div>
    </section>
  );
}
