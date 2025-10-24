import React from 'react';
import { motion } from 'motion/react';

type Patent = {
  id: number;
  title: string;
  domain: string;
};

const PATENTS: Patent[] = [
  { id: 1, title: 'Method to produce an additively manufactured graded composite transition joint', domain: 'Advanced Manufacturing' },
  { id: 2, title: 'Advanced neural network architecture for real-time processing', domain: 'AI Systems' },
  { id: 3, title: 'Sustainable energy storage system with enhanced efficiency', domain: 'Energy' },
  { id: 4, title: 'Quantum computing error correction methodology', domain: 'Quantum' },
  { id: 5, title: 'Biodegradable polymer composite with enhanced durability', domain: 'Materials' },
  { id: 6, title: 'CRISPR-based gene editing precision tool', domain: 'BioTech' },
  { id: 7, title: 'Carbon capture and utilization process', domain: 'Climate' },
  { id: 8, title: 'Optical sensor array for autonomous systems', domain: 'Autonomy' },
];

export function PatentTiles() {
  return (
    <section id="patents" className="py-24 bg-[rgb(var(--background))]">
      <div className="max-w-[1440px] mx-auto px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl text-[rgb(var(--foreground))] mb-4">Featured patents</h2>
          <p className="text-xl text-[rgb(var(--foreground),0.7)]">A glimpse of the innovations our network surfaces.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PATENTS.map((p, i) => (
            <motion.article
              key={p.id}
              className="group bg-[rgb(var(--background))] border border-[rgb(var(--border))] rounded-2xl p-6 shadow-sm hover:border-[rgb(var(--accent),0.3)] transition-all duration-300 relative overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent rounded-2xl pointer-events-none" />
              <span className="inline-block text-xs text-white bg-[rgb(var(--accent))]/90 px-3 py-1 rounded-full">
                {p.domain}
              </span>
              <h3 className="text-lg text-[rgb(var(--foreground))] mt-4 font-semibold leading-relaxed">
                {p.title}
              </h3>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
