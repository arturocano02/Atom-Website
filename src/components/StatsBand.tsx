import React from 'react';
import { StatsCard } from './StatsCard';

export function StatsBand() {
  const stats = [
    { value: '150 million', label: 'searchable patent documents' },
    { value: '33k', label: 'industry connections' },
    { value: '#1', label: 'IP marketplace' },
  ];

  return (
    <section className="bg-[rgb(var(--foreground))] dark:bg-black py-20">
      <div className="max-w-[1440px] mx-auto px-8">
        <div className="grid md:grid-cols-3 gap-12">
          {stats.map((stat, index) => (
            <StatsCard key={index} value={stat.value} label={stat.label} />
          ))}
        </div>
      </div>
    </section>
  );
}
