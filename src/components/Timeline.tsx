import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface TimelineStep {
  title: string;
  description: string;
  detail: string;
}

const steps: TimelineStep[] = [
  {
    title: 'Discovery Call',
    description: 'We understand your innovation needs and strategic goals.',
    detail: 'Quick consultation to identify your specific IP requirements and business challenges.'
  },
  {
    title: 'AI Search',
    description: 'Our AI scans 150M+ patents to find breakthrough innovations.',
    detail: 'Proprietary algorithms analyze millions of patents to identify the most relevant matches for your needs.'
  },
  {
    title: 'Curated Results',
    description: 'We deliver the best options with detailed analysis and feedback.',
    detail: 'Receive hand-picked patent matches with comprehensive analysis and iterative refinement.'
  },
  {
    title: 'Inventor Connection',
    description: 'Direct introduction to inventors and researchers for technical discussions.',
    detail: 'We facilitate high-level calls with inventors to explore technical fit and potential applications.'
  },
  {
    title: 'Deal Execution',
    description: 'Secure pilot testing and final licensing agreement. Zero cost for companies.',
    detail: 'Complete the licensing process with full legal support. Atom charges inventors, not companies.'
  }
];

export function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    if (isHovered) return; // Pause auto-scroll on hover
    
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 3000); // Change every 3 seconds for faster pace

    return () => clearInterval(interval);
  }, [isHovered]);

  // Scroll to center the active step with smoother animation
  useEffect(() => {
    if (containerRef.current) {
      const stepWidth = 240; // Updated for smaller cards
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
            How It Works
          </h2>
          <p className="text-xl text-[rgb(var(--foreground),0.7)]">
            From discovery to deal: Your journey to breakthrough innovation
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
            className="overflow-x-auto pb-8 hide-scrollbar"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            <div className="flex items-start gap-4 md:gap-8 min-w-max px-4 md:px-16 lg:px-20">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  className="flex flex-col items-center relative"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onHoverStart={() => setIsHovered(true)}
                  onHoverEnd={() => setIsHovered(false)}
                >
                  {/* Node */}
                  <motion.div
                    className={`w-16 h-16 rounded-full flex items-center justify-center text-xl transition-all duration-500 relative z-10 ${
                      activeStep === index
                        ? 'bg-[rgb(var(--accent))] text-white shadow-[0_0_30px_rgba(255,107,107,0.6)]'
                        : 'bg-[rgb(var(--muted))] text-[rgb(var(--foreground))] border-2 border-[rgb(var(--border))]'
                    }`}
                    whileHover={{ scale: 1.15, y: -2 }}
                    animate={{
                      scale: activeStep === index ? 1.1 : 1,
                      y: activeStep === index ? -4 : 0,
                    }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 300, 
                      damping: 20,
                      duration: 0.3 
                    }}
                  >
                    {index + 1}
                  </motion.div>

                  {/* Connecting Line */}
                  {index < steps.length - 1 && (
                    <div className="absolute left-16 top-8 w-[160px] h-0.5 bg-[rgb(var(--border))]">
                      <motion.div
                        className="h-full bg-[rgb(var(--accent))]"
                        initial={{ width: '0%' }}
                        whileInView={{ width: '100%' }}
                        viewport={{ once: true }}
                        transition={{ 
                          duration: 0.6, 
                          delay: index * 0.15,
                          ease: "easeOut"
                        }}
                      />
                    </div>
                  )}

                  {/* Content Card */}
                  <motion.div 
                    className="w-[240px] md:w-[280px] mt-6"
                    animate={{
                      y: activeStep === index ? -8 : 0,
                      scale: activeStep === index ? 1.02 : 1,
                    }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 300, 
                      damping: 20,
                      duration: 0.4 
                    }}
                  >
                    <motion.h3 
                      className="text-lg mb-2"
                      animate={{
                        color: activeStep === index ? '#ff6b6b' : '#0f172a'
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {step.title}
                    </motion.h3>
                    <p className="text-sm text-[rgb(var(--foreground),0.7)] mb-3">
                      {step.description}
                    </p>
                    
                    {/* Expanded detail on active step */}
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{
                        height: activeStep === index ? 'auto' : 0,
                        opacity: activeStep === index ? 1 : 0
                      }}
                      transition={{ 
                        duration: 0.4,
                        ease: "easeInOut"
                      }}
                      className="overflow-hidden"
                    >
                      <div className="pt-3 border-t border-[rgb(var(--accent))]">
                        <p className="text-sm text-[rgb(var(--foreground),0.6)]">
                          {step.detail}
                        </p>
                      </div>
                    </motion.div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Progress Indicator */}
          <div className="mt-8 flex justify-center">
            <div className="w-64 h-1 bg-[rgb(var(--muted))] rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-[rgb(var(--accent))]"
                style={{ width: `${(scrollProgress * 100)}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
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