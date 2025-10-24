import React from 'react';
import { motion } from 'motion/react';
import { Linkedin, Mail } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

type TeamMemberProps = {
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
  linkedin?: string;
  email?: string;
  index: number;
};

function TeamMember({ name, role, bio, imageUrl, linkedin, email, index }: TeamMemberProps) {
  return (
    <motion.div
      className="bg-[rgb(var(--background))] border border-[rgb(var(--border))] rounded-2xl overflow-hidden group hover:border-[rgb(var(--accent),0.3)] transition-all duration-300"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
    >
      <div className="aspect-square overflow-hidden bg-[rgb(var(--muted))]">
        <ImageWithFallback
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
        />
      </div>
      <div className="p-8">
        <h3 className="text-2xl text-[rgb(var(--foreground))] mb-2">{name}</h3>
        <p className="text-[rgb(var(--accent))] mb-4">{role}</p>
        <p className="text-[rgb(var(--foreground),0.7)] mb-6">{bio}</p>
        <div className="flex gap-4">
          {linkedin && (
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg hover:bg-[rgb(var(--muted))] transition-colors duration-200"
              aria-label={`${name} on LinkedIn`}
            >
              <Linkedin className="w-5 h-5 text-[rgb(var(--foreground))]" />
            </a>
          )}
          {email && (
            <a
              href={`mailto:${email}`}
              className="p-2 rounded-lg hover:bg-[rgb(var(--muted))] transition-colors duration-200"
              aria-label={`Email ${name}`}
            >
              <Mail className="w-5 h-5 text-[rgb(var(--foreground))]" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export function TeamSection() {
  const team = [
    {
      name: 'Dr. Sarah Chen',
      role: 'Founder & CEO',
      bio: 'Former director of technology transfer at MIT with 15 years of experience in IP commercialization and AI-driven patent analytics.',
      imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600',
      linkedin: '#',
      email: 'sarah@atom-ip.com',
    },
    {
      name: 'Michael Torres',
      role: 'Chief Technology Officer',
      bio: 'Led machine learning initiatives at Google Patents. Expert in natural language processing and patent classification algorithms.',
      imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600',
      linkedin: '#',
      email: 'michael@atom-ip.com',
    },
    {
      name: 'Dr. Emily Watson',
      role: 'Head of IP Strategy',
      bio: 'Patent attorney and former researcher at Stanford. Specializes in technology licensing and university-industry partnerships.',
      imageUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600',
      linkedin: '#',
      email: 'emily@atom-ip.com',
    },
    {
      name: 'James Kumar',
      role: 'VP of Business Development',
      bio: 'Built strategic partnerships at leading tech companies. Connects breakthrough innovations with Fortune 500 companies.',
      imageUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600',
      linkedin: '#',
      email: 'james@atom-ip.com',
    },
  ];

  return (
    <section id="team" className="py-32 bg-[rgb(var(--background))] scroll-mt-20">
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
            Our Team & Network
          </motion.h2>
          <motion.p
            className="text-xl text-[rgb(var(--foreground),0.7)] max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            World-class experts in IP commercialization, machine learning, and technology transfer. 
            We're building the future of innovation discovery.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {team.map((member, index) => (
            <TeamMember key={member.name} {...member} index={index} />
          ))}
        </div>

        {/* Partner Network */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl text-[rgb(var(--foreground))] mb-8">
            Supported by
          </h3>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-60">
            <div className="text-[rgb(var(--foreground))] text-lg">Y Combinator</div>
            <div className="text-[rgb(var(--foreground))] text-lg">Sequoia Capital</div>
            <div className="text-[rgb(var(--foreground))] text-lg">Techstars</div>
            <div className="text-[rgb(var(--foreground))] text-lg">500 Startups</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}