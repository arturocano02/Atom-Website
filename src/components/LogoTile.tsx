import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';

type LogoTileProps = {
  name: string;
  logoUrl: string;
};

export function LogoTile({ name, logoUrl }: LogoTileProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="flex items-center justify-center p-8 bg-[rgb(var(--background))] border border-[rgb(var(--border))] rounded-lg transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -1 }}
      transition={{ duration: 0.2 }}
    >
      <ImageWithFallback
        src={logoUrl}
        alt={name}
        className={`h-12 object-contain transition-all duration-300 ${
          isHovered ? 'grayscale-0' : 'grayscale opacity-60'
        }`}
      />
    </motion.div>
  );
}
