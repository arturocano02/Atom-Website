import React, { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import {
  Search,
  Gauge,
  Building2,
  HandCoins,
  Shield,
  Globe2,
  Clock,
  Handshake,
  Lightbulb,
  PenSquare,
} from 'lucide-react';
import { PrimaryButton } from './PrimaryButton';
import { Slider as UISlider } from './ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

type Jurisdiction = 'single' | 'multi' | 'global';
type Industry =
  | 'Biotech'
  | 'MedTech'
  | 'AI/Software'
  | 'Energy'
  | 'Materials'
  | 'Electronics'
  | 'Automotive'
  | 'Consumer';

function SectionHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
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
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          className="text-xl text-[rgb(var(--foreground),0.7)] max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}

function StatCard({
  icon: Icon,
  title,
  description,
  index,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  index: number;
}) {
  return (
    <motion.div
      className="bg-[rgb(var(--background))] border border-[rgb(var(--border))] rounded-2xl p-8 hover:border-[rgb(var(--accent),0.3)] transition-all duration-300"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, delay: index * 0.05 }}
      whileHover={{ y: -2 }}
    >
      <div className="flex items-start gap-4">
        <div className="p-3 rounded-lg bg-[rgb(var(--accent),0.1)]">
          <Icon className="w-6 h-6 text-[rgb(var(--accent))]" />
        </div>
        <div>
          <h3 className="text-lg text-[rgb(var(--foreground))] mb-2">{title}</h3>
          <p className="text-[rgb(var(--foreground),0.7)]">{description}</p>
        </div>
      </div>
    </motion.div>
  );
}

function formatCurrencyEUR(value: number): string {
  return new Intl.NumberFormat('en-IE', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(value);
}

export function InventorsSection() {
  const [trl, setTrl] = useState<number>(5);
  const [jurisdiction, setJurisdiction] = useState<Jurisdiction>('single');
  const [industry, setIndustry] = useState<Industry>('AI/Software');
  const [familySize, setFamilySize] = useState<number>(2);

  const industries: Industry[] = [
    'Biotech',
    'MedTech',
    'AI/Software',
    'Energy',
    'Materials',
    'Electronics',
    'Automotive',
    'Consumer',
  ];

  const calculator = useMemo(() => {
    const baseCentral = 150_000; // €150k center
    const trlFactor = 0.6 + ((trl - 1) * 0.8) / 8; // 0.6 .. 1.4
    const jurisdictionFactor: Record<Jurisdiction, number> = {
      single: 1.0,
      multi: 1.2,
      global: 1.5,
    };
    const industryFactor: Record<Industry, number> = {
      Biotech: 1.4,
      MedTech: 1.3,
      'AI/Software': 1.1,
      Energy: 1.2,
      Materials: 1.15,
      Electronics: 1.2,
      Automotive: 1.15,
      Consumer: 1.0,
    };
    const familyFactor = Math.min(1.0 + (familySize - 1) * 0.03, 1.75);

    const central = baseCentral * trlFactor * jurisdictionFactor[jurisdiction] * industryFactor[industry] * familyFactor;
    const min = Math.max(10_000, central * 0.8);
    const max = Math.min(750_000, central * 1.2);

    const normalized = Math.max(0, Math.min(1, (central - 10_000) / (750_000 - 10_000)));

    return { min: Math.round(min), max: Math.round(max), central: Math.round(central), normalized };
  }, [trl, jurisdiction, industry, familySize]);

  const scrollToCalculator = () => {
    const el = document.getElementById('ip-calculator');
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section id="inventors" className="py-32 bg-[rgb(var(--background))] scroll-mt-20">
      <div className="max-w-[1440px] mx-auto px-8">
        {/* Hero */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-24">
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[rgb(var(--foreground))]">
              Turn your ideas into income.
            </h2>
            <p className="text-xl text-[rgb(var(--foreground),0.75)] max-w-2xl">
              We connect inventors with companies ready to license and commercialize breakthrough technologies.
            </p>
            <PrimaryButton variant="coral" onClick={scrollToCalculator}>
              Check Your IP Value
            </PrimaryButton>
          </div>
          <div className="relative">
            <motion.div
              className="bg-[rgb(var(--muted))] border border-[rgb(var(--border))] rounded-2xl p-8 lg:p-12 overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="grid grid-cols-3 gap-6 items-center">
                <div className="col-span-1 flex flex-col items-center gap-4">
                  <div className="p-4 rounded-xl bg-white/60">
                    <PenSquare className="w-10 h-10 text-[rgb(var(--foreground))]" />
                  </div>
                  <span className="text-sm text-[rgb(var(--foreground),0.7)]">Inventor sketching</span>
                </div>
                <div className="col-span-1 flex flex-col items-center gap-4">
                  <motion.div
                    className="p-4 rounded-full bg-white/60"
                    initial={{ rotate: -10 }}
                    animate={{ rotate: 10 }}
                    transition={{ repeat: Infinity, repeatType: 'reverse', duration: 3 }}
                  >
                    <Lightbulb className="w-10 h-10 text:[rgb(var(--accent))]" />
                  </motion.div>
                  <span className="text-sm text-[rgb(var(--foreground),0.7)]">Idea</span>
                </div>
                <div className="col-span-1 flex flex-col items-center gap-4">
                  <div className="p-4 rounded-xl bg-white/60">
                    <Handshake className="w-10 h-10 text-[rgb(var(--foreground))]" />
                  </div>
                  <span className="text-sm text-[rgb(var(--foreground),0.7)]">Deal</span>
                </div>
              </div>
              <motion.div
                className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[rgb(var(--background))] to-transparent"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              />
            </motion.div>
          </div>
        </div>

        {/* How it works */}
        <SectionHeader title="How it works for inventors" />
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          <StatCard
            icon={Search}
            title="We scout your patents"
            description="Our AI-powered system continuously searches global databases for new IP like yours."
            index={0}
          />
          <StatCard
            icon={Gauge}
            title="We qualify the strongest ones"
            description="Radar scoring shows novelty, maturity, and market demand."
            index={1}
          />
          <StatCard
            icon={Building2}
            title="We match you with companies"
            description="Corporate partners looking for your exact solution."
            index={2}
          />
          <StatCard
            icon={HandCoins}
            title="You get paid"
            description="Once the deal closes, you keep the payout. We only take a small success fee."
            index={3}
          />
        </div>

        {/* Why work with us */}
        <SectionHeader title="Why work with us" />
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          <StatCard
            icon={Shield}
            title="Zero cost upfront"
            description="No fees until a deal closes."
            index={0}
          />
          <StatCard
            icon={Clock}
            title="No effort for you"
            description="We find, qualify, and pitch your patents."
            index={1}
          />
          <StatCard
            icon={Globe2}
            title="Global reach"
            description="Buyers in Europe, US, and Asia."
            index={2}
          />
          <StatCard
            icon={Handshake}
            title="Trusted process"
            description="NDA-protected. You stay in control."
            index={3}
          />
        </div>

        {/* IP Value Calculator */}
        <SectionHeader title="How much could your patent be worth?" />
        <motion.div
          id="ip-calculator"
          className="grid lg:grid-cols-2 gap-8 mb-24 backdrop-blur-xl bg-[rgba(var(--background),0.6)] border border-[rgba(var(--foreground),0.1)] rounded-2xl p-6 md:p-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="space-y-8">
            {/* TRL */}
            <div>
              <label className="block text-sm text-[rgb(var(--foreground))] mb-2">Technology readiness (TRL)</label>
              <div className="flex items-center gap-4">
                <span className="text-xs text-[rgb(var(--foreground),0.6)]">1</span>
                <div className="flex-1 px-2">
                  <UISlider
                    min={1}
                    max={9}
                    value={[trl]}
                    onValueChange={(vals) => setTrl(vals[0] ?? 1)}
                  />
                </div>
                <span className="text-xs text-[rgb(var(--foreground),0.6)]">9</span>
                <span className="ml-2 text-sm font-medium">TRL {trl}</span>
              </div>
            </div>

            {/* Jurisdiction */}
            <div>
              <label className="block text-sm text-[rgb(var(--foreground))] mb-2">Jurisdiction coverage</label>
              <Select value={jurisdiction} onValueChange={(v) => setJurisdiction(v as Jurisdiction)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select coverage" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="single">Single country</SelectItem>
                  <SelectItem value="multi">Multi-country (2–5)</SelectItem>
                  <SelectItem value="global">Global (6+)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Industry */}
            <div>
              <label className="block text-sm text-[rgb(var(--foreground))] mb-2">Industry</label>
              <Select value={industry} onValueChange={(v) => setIndustry(v as Industry)}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose sector" />
                </SelectTrigger>
                <SelectContent>
                  {industries.map((ind) => (
                    <SelectItem key={ind} value={ind}>
                      {ind}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Family size */}
            <div>
              <label className="block text-sm text-[rgb(var(--foreground))] mb-2">Family size (related filings)</label>
              <div className="flex items-center gap-4">
                <span className="text-xs text-[rgb(var(--foreground),0.6)]">1</span>
                <div className="flex-1 px-2">
                  <UISlider
                    min={1}
                    max={20}
                    value={[familySize]}
                    onValueChange={(vals) => setFamilySize(vals[0] ?? 1)}
                  />
                </div>
                <span className="text-xs text-[rgb(var(--foreground),0.6)]">20</span>
                <span className="ml-2 text-sm font-medium">{familySize}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-between gap-8">
            {/* Result */}
            <div>
              <p className="text-sm text-[rgb(var(--foreground),0.7)] mb-2">Potential value</p>
              <h3 className="text-3xl md:text-4xl font-semibold text-[rgb(var(--foreground))]">
                {formatCurrencyEUR(calculator.min)} – {formatCurrencyEUR(calculator.max)}
              </h3>

              {/* Gauge bar */}
              <div className="mt-6">
                <div className="h-4 w-full bg-[rgb(var(--muted))] rounded-full overflow-hidden border border-[rgb(var(--border))]">
                  <motion.div
                    className="h-full bg-gradient-to-r from-[rgb(var(--accent))] via-rose-400 to-pink-500"
                    initial={{ width: '0%' }}
                    animate={{ width: `${Math.max(10, Math.round(calculator.normalized * 100))}%` }}
                    transition={{ duration: 0.8 }}
                  />
                </div>
                <div className="flex justify-between text-xs text-[rgb(var(--foreground),0.6)] mt-2">
                  <span>€10k</span>
                  <span>€750k</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-[rgb(var(--foreground),0.75)]">
                Want us to scout your patents? Get in touch.
              </p>
              <div>
                <a href="#contact">
                  <PrimaryButton variant="coral">Contact Us</PrimaryButton>
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Success stories */}
        <SectionHeader title="Success stories" />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          {[
            'A university team licensed their biotech patent to a top pharma within 6 months.',
            'An independent inventor matched with a European electronics firm for a cross-license deal.',
            'A medtech prototype secured a paid pilot with a Fortune 500 healthcare company.',
          ].map((story, idx) => (
            <motion.div
              key={idx}
              className="bg-[rgb(var(--background))] border border-[rgb(var(--border))] rounded-2xl p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.05 }}
            >
              <p className="text-[rgb(var(--foreground),0.85)]">“{story}”</p>
            </motion.div>
          ))}
        </div>

        {/* Final CTA */}
        <motion.div
          className="rounded-2xl bg-gradient-to-r from-[rgba(15,23,42,0.9)] to-[rgba(15,23,42,0.8)] text-[rgb(var(--background))] p-10 md:p-14 flex flex-col md:flex-row items-center justify-between gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <h3 className="text-3xl md:text-4xl font-semibold mb-2">Invent, we’ll do the rest.</h3>
            <p className="text-[rgb(var(--background),0.8)] max-w-2xl">
              No effort required — we handle the heavy lifting.
            </p>
          </div>
          <a href="#contact">
            <PrimaryButton variant="coral">Contact Us</PrimaryButton>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
