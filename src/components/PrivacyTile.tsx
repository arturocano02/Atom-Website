import React, { useState } from 'react';
import { LucideIcon } from 'lucide-react';
import { motion } from 'motion/react';

type PrivacyTileProps = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export function PrivacyTile({ icon: Icon, title, description }: PrivacyTileProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="text-center space-y-4"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex justify-center mb-6">
        <motion.div 
          className="relative"
          animate={{ 
            scale: isHovered ? 1.05 : 1,
          }}
          transition={{ duration: 0.3 }}
        >
          {/* Gradient background circle */}
          <div className="absolute inset-0 bg-gradient-to-br from-[rgb(var(--accent),0.15)] to-[rgb(var(--accent),0.05)] rounded-full blur-xl scale-150" />
          
          {/* Icon container with border */}
          <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-white to-[rgb(var(--muted))] dark:from-[rgb(30,41,59)] dark:to-[rgb(15,23,42)] border border-[rgba(15,23,42,0.1)] dark:border-[rgba(250,245,240,0.1)] flex items-center justify-center shadow-lg">
            <Icon className="w-9 h-9 text-[rgb(var(--foreground))] stroke-[1.5]" />
            
            {/* Accent corner glow */}
            <motion.div 
              className="absolute top-0 right-0 w-6 h-6 bg-[rgb(var(--accent))] rounded-full blur-md opacity-0"
              animate={{ opacity: isHovered ? 0.3 : 0 }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </motion.div>
      </div>

      <h3 className="text-xl text-[rgb(var(--foreground))] relative inline-block">
        {title}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-[rgb(var(--accent))]"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          style={{ originX: 0 }}
        />
      </h3>

      <p className="text-[rgb(var(--foreground),0.7)] max-w-xs mx-auto">{description}</p>
    </div>
  );
}
