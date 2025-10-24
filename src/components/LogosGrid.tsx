import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import oxfordLogo from 'figma:asset/94b16f000a808455faa1158035f17b6aa0cf3aa1.png';
import imperialLogo from 'figma:asset/f4f183cf69ca8df99cb7d78dbe294d7626cfe248.png';
import cambridgeLogo from 'figma:asset/3c48d529deab9a334fbe348e89cdafc9b728f211.png';
import mitLogo from 'figma:asset/d5be4c2b5036e2ab856ffae6a87b01b09343d46b.png';
import harvardLogo from 'figma:asset/7009bf5e6332f04c54459968af194fcfe28ff237.png';
import stanfordLogo from 'figma:asset/c4eb21a291332f661ecd10659ef39943f9c52441.png';
import ethLogo from 'figma:asset/9781af1848083ec062d734b92b32bb7f981fda51.png';
import tuMunichLogo from 'figma:asset/faf5a60e8dfa2a1d85a319888a493362b78ab846.png';
import kuLeuvenLogo from 'figma:asset/476a9e486997e9dc9e2b32a0c7b222fdc2c6680d.png';

const logos = [
  { name: 'University of Oxford', url: oxfordLogo },
  { name: 'Imperial College London', url: imperialLogo },
  { name: 'University of Cambridge', url: cambridgeLogo },
  { name: 'MIT', url: mitLogo },
  { name: 'Harvard University', url: harvardLogo },
  { name: 'Stanford University', url: stanfordLogo },
  { name: 'ETH Zurich', url: ethLogo },
  { name: 'TU Munich', url: tuMunichLogo },
  { name: 'KU Leuven', url: kuLeuvenLogo },
];

// Triple logos for seamless infinite scroll
const tripleLogos = [...logos, ...logos, ...logos];

export function LogosGrid() {
  return (
    <section className="py-24 bg-[rgb(var(--muted))] overflow-hidden" id="universities">
      <div className="max-w-[1440px] mx-auto px-8">
        <motion.h2
          className="text-3xl text-center text-[rgb(var(--foreground))] mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Trusted by leading innovators
        </motion.h2>
        
        {/* Horizontal auto-scrolling carousel - no gradient overlays */}
        <div className="relative">
          <div className="overflow-hidden">
            <motion.div
              className="flex gap-20 items-center"
              animate={{
                x: [0, -100 / 3 + '%'], // Move by one third (one set of logos)
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 40,
                  ease: "linear",
                },
              }}
            >
              {tripleLogos.map((logo, index) => (
                <motion.div
                  key={`${logo.name}-${index}`}
                  className="flex-shrink-0 w-56 h-24 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -4 }}
                >
                  <img
                    src={logo.url}
                    alt={logo.name}
                    className="max-h-16 max-w-full object-contain opacity-60 hover:opacity-100 transition-opacity duration-300"
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}