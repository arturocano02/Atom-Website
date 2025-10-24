import React from 'react';
import { motion } from 'motion/react';
import { Quote } from 'lucide-react';

type TestimonialCardProps = {
  quote: string;
  author: string;
  role: string;
  company: string;
  index: number;
};

function TestimonialCard({ quote, author, role, company, index }: TestimonialCardProps) {
  return (
    <motion.div
      className="bg-[rgba(var(--background),0.6)] backdrop-blur-xl border border-[rgba(var(--foreground),0.1)] rounded-2xl p-8 hover:border-[rgb(var(--accent),0.3)] transition-all duration-300 relative overflow-hidden group"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ 
        y: -4,
        scale: 1.02,
      }}
    >
      {/* Glass reflection effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent rounded-2xl pointer-events-none" />
      
      {/* Hover glow effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-[rgb(var(--accent),0.05)] to-transparent rounded-2xl opacity-0"
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />

      <div className="relative z-10">
        <Quote className="w-8 h-8 text-[rgb(var(--accent))] mb-4" />
        <blockquote className="text-[rgb(var(--foreground))] text-lg leading-relaxed mb-6">
          "{quote}"
        </blockquote>
        <div className="border-t border-[rgba(var(--foreground),0.1)] pt-4">
          <div className="font-semibold text-[rgb(var(--foreground))]">{author}</div>
          <div className="text-[rgb(var(--accent))] text-sm">{role}</div>
          <div className="text-[rgb(var(--foreground),0.7)] text-sm">{company}</div>
        </div>
      </div>
    </motion.div>
  );
}

export function TestimonialsSection() {
  const testimonials = [
    {
      quote: "Atom helped us discover a breakthrough battery technology that's now powering our next-generation electric vehicles. The AI-powered search was incredibly precise.",
      author: "Dr. Sarah Mitchell",
      role: "CTO",
      company: "ElectroDrive Technologies",
    },
    {
      quote: "We found the perfect AI patent through Atom's platform. The process was seamless, and the inventor connection was invaluable for our R&D team.",
      author: "Michael Chen",
      role: "Head of Innovation",
      company: "TechCorp Solutions",
    },
    {
      quote: "Atom's platform saved us months of research time. The patent discovery process was efficient, and the quality of matches exceeded our expectations.",
      author: "Dr. Emily Rodriguez",
      role: "Research Director",
      company: "BioInnovate Labs",
    },
  ];

  return (
    <section className="py-32 bg-[rgb(var(--background))]">
      <div className="max-w-[1440px] mx-auto px-8">
        <div className="text-center mb-16">
          <motion.div
            className="w-16 h-0.5 bg-[rgb(var(--accent))] mx-auto mb-8"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          />
          <motion.h2
            className="text-5xl text-[rgb(var(--foreground))] mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Success Stories
          </motion.h2>
          <motion.p
            className="text-xl text-[rgb(var(--foreground),0.7)] max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            See how leading companies are discovering breakthrough innovations through our platform
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
