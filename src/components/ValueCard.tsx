import React, { useState } from 'react';
import { ChevronRight, LucideIcon } from 'lucide-react';
import { motion } from 'motion/react';

type ValueCardProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  benefits: string[];
  href: string;
};

export function ValueCard({ icon: Icon, title, description, benefits, href }: ValueCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.a
      href={href}
      className="block bg-[rgb(var(--background))] border border-[rgb(var(--border))] rounded-2xl p-12 transition-all duration-300 hover:shadow-2xl hover:border-[rgb(var(--accent),0.3)] group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mb-8">
        <Icon className="w-12 h-12 text-[rgb(var(--accent))] stroke-[1.5]" />
      </div>

      <h2 className="text-3xl text-[rgb(var(--foreground))] mb-4">{title}</h2>

      <p className="text-lg text-[rgb(var(--foreground),0.7)] mb-8">{description}</p>

      <ul className="space-y-4 mb-8">
        {benefits.map((benefit, index) => (
          <li key={index} className="flex items-start gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-[rgb(var(--accent))] mt-2.5 flex-shrink-0" />
            <span className="text-[rgb(var(--foreground),0.8)]">{benefit}</span>
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-2 text-[rgb(var(--accent))]">
        <span>Learn more</span>
        <motion.div
          animate={{ x: isHovered ? 4 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronRight className="w-5 h-5" />
        </motion.div>
      </div>
    </motion.a>
  );
}
