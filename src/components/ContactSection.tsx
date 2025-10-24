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
      icon: MapPin,
      title: 'Address',
      content: 'Innovation Quarter, Cambridge, CB2 1TN, United Kingdom',
      href: undefined,
    },
    {
      icon: Mail,
      title: 'Email',
      content: 'hello@atom.io',
      href: 'mailto:hello@atom.io',
    },
    {
      icon: Phone,
      title: 'Phone',
      content: '+44 1223 000 000',
      href: 'tel:+441223000000',
    },
  ];

  return (
    <section id="contact" className="py-32 bg-[rgb(var(--muted))] scroll-mt-20">
      <div className="max-w-[1440px] mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left: Form */}
          <motion.div
            className="lg:col-span-2 bg-[rgb(var(--background))] border border-[rgb(var(--border))] rounded-2xl p-6 md:p-8 shadow-sm"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
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
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-[rgb(var(--foreground))] mb-4">Send us a message</h3>
                  <div className="grid grid-cols-1 gap-6">
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
                        autoComplete="name"
                        className="w-full px-4 py-3 rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--muted))] text-[rgb(var(--foreground))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--accent))] transition-all duration-200"
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
                        autoComplete="email"
                        className="w-full px-4 py-3 rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--muted))] text-[rgb(var(--foreground))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--accent))] transition-all duration-200"
                        placeholder="you@example.com"
                      />
                    </div>

                    <div>
                      <label htmlFor="company" className="block text-sm text-[rgb(var(--foreground))] mb-2">
                        Company / Institution
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        autoComplete="organization"
                        className="w-full px-4 py-3 rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--muted))] text-[rgb(var(--foreground))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--accent))] transition-all duration-200"
                        placeholder="Your organization"
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
                        autoComplete="off"
                        className="w-full px-4 py-3 rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--muted))] text-[rgb(var(--foreground))] focus:outline-none focus:ring-2 focus:ring-[rgb(var(--accent))] transition-all duration-200 resize-none"
                        placeholder="Tell us about your needs..."
                      />
                    </div>
                  </div>
                </div>

                <PrimaryButton variant="coral" className="w-full md:w-auto inline-flex items-center justify-center gap-2">
                  <span>Send message</span>
                  <Send className="w-4 h-4" />
                </PrimaryButton>
              </form>
            )}
          </motion.div>

          {/* Right: Contact information */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="text-xl font-semibold text-[rgb(var(--foreground))]">Contact information</h3>

            <div className="space-y-4">
              {contactInfo.map((item, index) => (
                <ContactCard
                  key={item.title}
                  icon={item.icon}
                  title={item.title}
                  content={item.content}
                  href={item.href}
                  index={index}
                />
              ))}
            </div>

            {/* Office hours */}
            <div className="bg-[rgb(var(--background))] border border-[rgb(var(--border))] rounded-2xl p-6">
              <h4 className="text-[rgb(var(--foreground))] font-medium mb-4">Office hours</h4>
              <div className="divide-y divide-[rgb(var(--border))]">
                <div className="flex items-center justify-between py-3">
                  <span className="text-[rgb(var(--foreground),0.8)]">Monday - Friday</span>
                  <span className="text-[rgb(var(--foreground))]">9:00 AM – 6:00 PM GMT</span>
                </div>
                <div className="flex items-center justify-between py-3">
                  <span className="text-[rgb(var(--foreground),0.8)]">Saturday - Sunday</span>
                  <span className="text-[rgb(var(--foreground),0.6)]">Closed</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}