import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, MapPin, Phone, Send } from 'lucide-react';
import { PrimaryButton } from './PrimaryButton';

type ContactCardProps = {
  icon: React.ElementType;
  title: string;
  content: string;
  href?: string;
  index: number;
};

function ContactCard({ icon: Icon, title, content, href, index }: ContactCardProps) {
  return (
    <motion.div
      className="bg-[rgb(var(--background))] border border-[rgb(var(--border))] rounded-2xl p-8 hover:border-[rgb(var(--accent),0.3)] transition-all duration-300"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -2 }}
    >
      <div className="flex items-start gap-4">
        <div className="p-3 rounded-lg bg-[rgb(var(--accent),0.1)]">
          <Icon className="w-6 h-6 text-[rgb(var(--accent))]" />
        </div>
        <div>
          <h3 className="text-lg text-[rgb(var(--foreground))] mb-2">{title}</h3>
          {href ? (
            <a
              href={href}
              className="text-[rgb(var(--foreground),0.7)] hover:text-[rgb(var(--accent))] transition-colors duration-200"
            >
              {content}
            </a>
          ) : (
            <p className="text-[rgb(var(--foreground),0.7)]">{content}</p>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      content: 'info@atomgroup.ai',
      href: 'mailto:info@atomgroup.ai',
    },
    {
      icon: Phone,
      title: 'Phone',
      content: '+1 (555) 123-4567',
      href: 'tel:+15551234567',
    },
    {
      icon: MapPin,
      title: 'Address',
      content: '54 Baker Street, London, W1U 7BU',
      href: undefined,
    },
  ];

  return (
    <section id="contact" className="py-32 bg-[rgb(var(--muted))] scroll-mt-20">
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
            Contact Us
          </motion.h2>
          <motion.p
            className="text-xl text-[rgb(var(--foreground),0.7)] max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Ready to discover breakthrough innovations? Get in touch with our team.
          </motion.p>
        </div>

        <motion.div
          className="max-w-2xl mx-auto backdrop-blur-xl bg-[rgba(var(--background),0.6)] border border-[rgba(var(--foreground),0.1)] rounded-2xl p-12 shadow-[0_8px_32px_0_rgba(0,0,0,0.1)]"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Glass reflection effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent rounded-2xl pointer-events-none" />
          
          {submitted ? (
            <motion.div
              className="text-center py-12"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl text-[rgb(var(--foreground))] mb-2">Thank you!</h3>
              <p className="text-[rgb(var(--foreground),0.7)]">We'll get back to you soon.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              <div>
                <label htmlFor="name" className="block text-sm text-[rgb(var(--foreground))] mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-[rgb(var(--border))] bg-[rgba(var(--background),0.5)] text-[rgb(var(--foreground))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--accent))] transition-all duration-200 backdrop-blur-sm"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm text-[rgb(var(--foreground))] mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-[rgb(var(--border))] bg-[rgba(var(--background),0.5)] text-[rgb(var(--foreground))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--accent))] transition-all duration-200 backdrop-blur-sm"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label htmlFor="company" className="block text-sm text-[rgb(var(--foreground))] mb-2">
                  Company
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-[rgb(var(--border))] bg-[rgba(var(--background),0.5)] text-[rgb(var(--foreground))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--accent))] transition-all duration-200 backdrop-blur-sm"
                  placeholder="Your company"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm text-[rgb(var(--foreground))] mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg border border-[rgb(var(--border))] bg-[rgba(var(--background),0.5)] text-[rgb(var(--foreground))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--accent))] transition-all duration-200 resize-none backdrop-blur-sm"
                  placeholder="Tell us about your needs..."
                />
              </div>

              <PrimaryButton variant="coral">
                Contact Us
              </PrimaryButton>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}