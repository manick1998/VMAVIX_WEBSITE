import React from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { STATS_DATA } from '../../data/vmavixData';
import { soundManager } from '../../utils/audio';

export const Statistics: React.FC = () => {
  const revealRef = useScrollReveal<HTMLDivElement>();
  return (
    <section className="py-20 relative overflow-hidden bg-[#050508] border-y border-white/10">
      {/* Glow Backdrop */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[300px] bg-gradient-to-r from-brand-orange/10 via-brand-pink/10 to-brand-cyan/10 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        <div ref={revealRef} className="reveal grid grid-cols-2 gap-6 sm:gap-10 lg:grid-cols-4">
          {STATS_DATA.map((stat, idx) => (
            <div
              key={idx}
              onMouseEnter={() => soundManager.playHover()}
              className="text-center space-y-2 group cursor-default"
            >
              <span className="font-syne font-extrabold text-4xl sm:text-6xl text-gradient-aurora block group-hover:scale-105 transition-transform duration-300">
                {stat.value}
              </span>
              <h4 className="font-syne font-bold text-sm sm:text-base text-white tracking-wide">
                {stat.label}
              </h4>
              <p className="text-[11px] font-mono text-gray-400">
                {stat.subtext}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
