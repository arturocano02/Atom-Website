import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';

type StatsCardProps = {
  value: string;
  label: string;
};

export function StatsCard({ value, label }: StatsCardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [displayValue, setDisplayValue] = useState('0');

  useEffect(() => {
    if (!isInView) return;

    // Check if it's #1 - don't animate
    if (value === '#1') {
      setDisplayValue(value);
      return;
    }

    const numericValue = value.match(/\d+/)?.[0];
    if (!numericValue) {
      setDisplayValue(value);
      return;
    }

    const target = parseInt(numericValue);
    const duration = 1200; // Faster animation (was 2000)
    const steps = 60;
    const increment = target / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        const formatted = Math.floor(current).toLocaleString();
        const suffix = value.replace(/[\d,\s]/g, '');
        setDisplayValue(formatted + suffix);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <motion.div
      ref={ref}
      className="text-center"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
    >
      <div className="text-5xl lg:text-6xl text-[rgb(var(--accent))] mb-2">
        {displayValue}
      </div>
      <div className="text-sm text-[rgb(var(--background))] opacity-80">
        {label}
      </div>
    </motion.div>
  );
}
