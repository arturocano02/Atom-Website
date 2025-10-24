import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight, Video, Brain, Send, RefreshCcw, Lightbulb, Shield, Handshake } from 'lucide-react';

interface TimelineStep {
  title: string;
  description: string;
  detail?: string;
  icon: React.ComponentType<{ className?: string }>;
}

const steps: TimelineStep[] = [
  {
    title: 'Intro Call',
    description: 'We start with a call to understand your needs and what kind of IP you’re looking for.',
    detail: 'A short conversation to align on goals, timelines, and success criteria so we can tailor the search to you.',
    icon: Video,
  },
  {
    title: 'AI-Powered Search',
    description: 'We use our AI, trained on the world’s largest patent database, to scout options tailored to you.',
    detail: 'Our AI analyzes 150M+ patents to surface highly relevant, high-potential candidates.',
    icon: Brain,
  },
  {
    title: 'Options Sent',
    description: 'We send you the best patents we find, with clear reports.',
    detail: 'You receive concise reports highlighting novelty, relevance, and potential fit.',
    icon: Send,
  },
  {
    title: 'Feedback & Iteration',
    description: 'You give us feedback, we refine and iterate until we find the golden patent.',
    detail: 'We quickly loop with you to sharpen direction and converge on the highest-value options.',
    icon: RefreshCcw,
  },
  {
    title: 'Inventor Call',
    description: 'We connect you with inventors to explore synergies and fit.',
    detail: 'Technical and commercial deep-dive with the inventors to validate feasibility and alignment.',
    icon: Lightbulb,
  },
  {
    title: 'NDA & Pilot',
    description: 'Once there’s interest, you sign an NDA, share details, and explore pilots.',
    detail: 'Deeper data and prototypes under NDA to evaluate integration and performance.',
    icon: Shield,
  },
  {
    title: 'Deal Closed',
    description: 'If it works, you close the deal. The company pays nothing — we take a small success fee from the inventors.',
    detail: 'We help finalize licensing terms. Companies pay zero; inventors pay a small success fee.',
    icon: Handshake,
  },
];

type TimelineProps = {
  loop?: boolean;
};

export function Timeline({ loop = true }: TimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [expandedStep, setExpandedStep] = useState<number | null>(null);

  useEffect(() => {
    if (isHovered) return; // Pause auto-scroll on hover

    const interval = setInterval(() => {
      setActiveStep((prev) => {
        if (loop) return (prev + 1) % steps.length;
        return prev + 1 < steps.length ? prev + 1 : prev;
      });
    }, 3200);

    return () => clearInterval(interval);
  }, [isHovered, loop]);

  // Scroll to center the active step with smoother animation
  useEffect(() => {
    if (containerRef.current) {
      const stepWidth = 280; // approximate card width incl. gap
      const containerWidth = containerRef.current.clientWidth;
      const scrollPosition = (activeStep * stepWidth) - (containerWidth / 2) + (stepWidth / 2);
      
      containerRef.current.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
    }
  }, [activeStep]);

  const handleScroll = () => {
    if (containerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
      const progress = scrollLeft / (scrollWidth - clientWidth);
      setScrollProgress(progress);
    }
  };

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-32 bg-[rgb(var(--background))] relative overflow-hidden" id="how-it-works">
      <div className="max-w-[1440px] mx-auto px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl text-[rgb(var(--foreground))] mb-4">
            How We Work
          </h2>
          <p className="text-xl text-[rgb(var(--foreground),0.7)]">
            Dynamic timeline: from intro call to deal closed
          </p>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Scroll Buttons */}
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-[rgb(var(--background))] border border-[rgb(var(--border))] shadow-lg hover:bg-[rgb(var(--muted))] transition-colors duration-200 hidden lg:block"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-6 h-6 text-[rgb(var(--foreground))]" />
          </button>
          
          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-[rgb(var(--background))] border border-[rgb(var(--border))] shadow-lg hover:bg-[rgb(var(--muted))] transition-colors duration-200 hidden lg:block"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-6 h-6 text-[rgb(var(--foreground))]" />
          </button>

          {/* Scrollable Timeline */}
          <div
            ref={containerRef}
            onScroll={handleScroll}
            className="overflow-x-auto pb-10 hide-scrollbar"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            <div className="flex items-start gap-6 md:gap-10 min-w-max px-4 md:px-16 lg:px-20">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  className="flex flex-col items-center relative cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onHoverStart={() => setIsHovered(true)}
                  onHoverEnd={() => setIsHovered(false)}
                  onClick={() => setExpandedStep((prev) => (prev === index ? null : index))}
                >
                  {/* Node with icon */}
                  <motion.div
                    className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-500 relative z-10 ${
                      activeStep === index
                        ? 'bg-[rgb(var(--accent))] text-white shadow-[0_12px_40px_rgba(255,107,107,0.45)]'
                        : 'bg-[rgb(var(--muted))] text-[rgb(var(--foreground))] border-2 border-[rgb(var(--border))]'
                    }`}
                    whileHover={{ scale: 1.08, y: -2 }}
                    animate={{
                      scale: activeStep === index ? 1.08 : 1,
                      y: activeStep === index ? -4 : 0,
                    }}
                    transition={{ 
                      type: 'spring', 
                      stiffness: 300, 
                      damping: 22,
                      duration: 0.3 
                    }}
                    aria-label={step.title}
                  >
                    <step.icon className="w-9 h-9" />
                  </motion.div>

                  {/* Title + Copy */}
                  <motion.div 
                    className="w-[260px] md:w-[300px] mt-6 text-center"
                    animate={{
                      y: activeStep === index ? -6 : 0,
                      scale: activeStep === index ? 1.02 : 1,
                    }}
                    transition={{ 
                      type: 'spring', 
                      stiffness: 300, 
                      damping: 20,
                      duration: 0.35 
                    }}
                  >
                    <motion.h3 
                      className="text-lg font-semibold mb-2"
                      animate={{
                        color: activeStep === index ? '#ff6b6b' : '#0f172a',
                        opacity: activeStep === index ? 1 : 0.9,
                      }}
                      transition={{ duration: 0.25 }}
                    >
                      {step.title}
                    </motion.h3>
                    <motion.p 
                      className="text-sm text-[rgb(var(--foreground),0.75)]"
                      initial={false}
                      animate={{ opacity: activeStep === index ? 1 : 0.85 }}
                      transition={{ duration: 0.3 }}
                    >
                      {step.description}
                    </motion.p>

                    {/* Progressive disclosure on click */}
                    <motion.div
                      initial={false}
                      animate={{
                        height: expandedStep === index ? 'auto' : 0,
                        opacity: expandedStep === index ? 1 : 0,
                        marginTop: expandedStep === index ? 12 : 0,
                      }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      {step.detail && (
                        <div className="pt-3 border-t border-[rgb(var(--accent))]">
                          <p className="text-sm text-[rgb(var(--foreground),0.7)]">
                            {step.detail}
                          </p>
                        </div>
                      )}
                    </motion.div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Step Progress Bar */}
          <div className="mt-10 max-w-2xl mx-auto px-6">
            <div className="flex items-center">
              {steps.map((_, idx) => (
                <div key={idx} className="flex items-center flex-1 last:flex-initial">
                  <motion.div
                    className="w-2.5 h-2.5 rounded-full"
                    animate={{
                      backgroundColor: idx <= activeStep ? 'rgb(255, 107, 107)' : 'rgba(15,23,42,0.15)'
                    }}
                    transition={{ duration: 0.25 }}
                  />
                  {idx < steps.length - 1 && (
                    <motion.div
                      className="h-0.5 mx-2 rounded-full flex-1"
                      animate={{
                        backgroundColor: idx < activeStep ? 'rgb(255, 107, 107)' : 'rgba(15,23,42,0.15)'
                      }}
                      transition={{ duration: 0.25 }}
                    />
                  )}
                </div>
              ))}
            </div>
            {!loop && activeStep === steps.length - 1 && (
              <div className="text-center mt-4">
                <button
                  onClick={() => setActiveStep(0)}
                  className="text-sm text-[rgb(var(--foreground))] underline hover:text-[rgb(var(--accent))]"
                >
                  Restart timeline
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}