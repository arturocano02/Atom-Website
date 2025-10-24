import React, { useState } from 'react';
import { motion } from 'motion/react';

type PrimaryButtonProps = {
  children: React.ReactNode;
  variant?: 'coral' | 'navy';
  onClick?: () => void;
  className?: string;
};

export function PrimaryButton({
  children,
  variant = 'coral',
  onClick,
  className = '',
}: PrimaryButtonProps) {
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();

    setRipples([...ripples, { x, y, id }]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
    }, 600);

    onClick?.();
  };

  const baseClasses =
    'relative overflow-hidden px-8 py-4 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 backdrop-blur-xl';

  const variantClasses =
    variant === 'coral'
      ? 'bg-[rgba(255,107,107,0.85)] border border-[rgba(255,255,255,0.2)] shadow-[0_8px_32px_0_rgba(255,107,107,0.37)] text-white hover:bg-[rgba(255,107,107,0.95)] hover:shadow-[0_8px_40px_0_rgba(255,107,107,0.5)] focus:ring-[rgb(var(--accent))]'
      : 'bg-[rgba(15,23,42,0.85)] border border-[rgba(255,255,255,0.2)] shadow-[0_8px_32px_0_rgba(15,23,42,0.37)] text-[rgb(var(--background))] hover:bg-[rgba(15,23,42,0.95)] hover:shadow-[0_8px_40px_0_rgba(15,23,42,0.5)] focus:ring-[rgb(var(--foreground))]';

  return (
    <motion.button 
      className={`${baseClasses} ${variantClasses} ${className}`} 
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ 
        scale: 1.02,
        y: -2,
      }}
      whileTap={{ 
        scale: 0.98,
        y: 0,
      }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 17
      }}
    >
      {/* Glass reflection effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent rounded-lg pointer-events-none" />
      
      {/* Shimmer effect on hover */}
      <motion.div
        className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent"
        animate={{
          translateX: isHovered ? '200%' : '-100%',
        }}
        transition={{
          duration: 0.6,
          ease: "easeInOut"
        }}
      />
      
      {ripples.map((ripple) => (
        <motion.span
          key={ripple.id}
          className="absolute bg-white rounded-full opacity-50"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: 0,
            height: 0,
          }}
          initial={{ width: 0, height: 0, opacity: 0.5 }}
          animate={{ width: 100, height: 100, opacity: 0 }}
          transition={{ duration: 0.6 }}
        />
      ))}
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}