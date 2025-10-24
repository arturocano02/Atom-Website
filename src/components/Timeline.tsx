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
    title: 'Initial Call',
    description: 'We understand your needs and the kind of IP you\'re looking for.',
    detail: 'Our team schedules a consultation to deeply understand your business challenges and innovation requirements.'
  },
  {
    title: 'AI Search',
    description: 'We use the largest patent database and our AI engine trained on patents to scan for breakthroughs.',
    detail: 'Our proprietary AI analyzes millions of patents to identify the most relevant innovations for your needs.'
  },
  {
    title: 'Results Sent',
    description: 'We deliver the best options. You give feedback. We refine and iterate.',
    detail: 'Receive curated patent matches with detailed analysis. Your feedback helps us refine the search.'
  },
  {
    title: 'Golden Patent',
    description: 'Together we identify the innovation that can give you a competitive edge.',
    detail: 'Collaborative review process to identify the perfect IP that aligns with your strategic goals.'
  },
  {
    title: 'Inventor Call',
    description: 'We set up a high-level call with the inventors to explore potential fit.',
    detail: 'Direct connection with inventors and researchers to discuss technical details and applications.'
  },
  {
    title: 'NDA & Pilot',
    description: 'If aligned, you sign an NDA, share details, and begin pilot testing.',
    detail: 'Secure confidential agreements and initiate pilot programs to validate the technology fit.'
  },
  {
    title: 'Deal Signed',
    description: 'If the pilot succeeds, you finalize the deal. Atom charges inventors a small percentage. For companies, it\'s zero cost.',
    detail: 'Complete the licensing agreement with full legal support. No fees for companies.'
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
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, [isHovered]);

  // Scroll to center the active step
  useEffect(() => {
    if (containerRef.current) {
      const stepWidth = 296; // 280px width + 16px gap
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
            <div className="flex items-start gap-8 min-w-max px-16 lg:px-20">
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
                    className={`w-16 h-16 rounded-full flex items-center justify-center text-xl transition-all duration-300 relative z-10 ${
                      activeStep === index
                        ? 'bg-[rgb(var(--accent))] text-white shadow-[0_0_30px_rgba(255,107,107,0.6)]'
                        : 'bg-[rgb(var(--muted))] text-[rgb(var(--foreground))] border-2 border-[rgb(var(--border))]'
                    }`}
                    whileHover={{ scale: 1.1 }}
                  >
                    {index + 1}
                  </motion.div>

                  {/* Connecting Line */}
                  {index < steps.length - 1 && (
                    <div className="absolute left-16 top-8 w-[200px] h-0.5 bg-[rgb(var(--border))]">
                      <motion.div
                        className="h-full bg-[rgb(var(--accent))]"
                        initial={{ width: '0%' }}
                        whileInView={{ width: '100%' }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: index * 0.2 }}
                      />
                    </div>
                  )}

                  {/* Content Card */}
                  <div className="w-[280px] mt-6">
                    <h3 className="text-lg mb-2 text-[rgb(var(--foreground))]">
                      {step.title}
                    </h3>
                    <p className="text-sm text-[rgb(var(--foreground),0.7)] mb-3">
                      {step.description}
                    </p>
                    
                    {/* Expanded detail on hover */}
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{
                        height: activeStep === index ? 'auto' : 0,
                        opacity: activeStep === index ? 1 : 0
                      }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-3 border-t border-[rgb(var(--accent))]">
                        <p className="text-sm text-[rgb(var(--foreground),0.6)]">
                          {step.detail}
                        </p>
                      </div>
                    </motion.div>
                  </div>
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