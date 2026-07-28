import React from 'react';
import { STATS_DATA } from '../../data/vmavixData';
import { soundManager } from '../../utils/audio';

export const Statistics: React.FC = () => {
  return (
    <section className="py-20 relative overflow-hidden bg-[#050508] border-y border-white/10">
      {/* Glow Backdrop */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[300px] bg-gradient-to-r from-orange-600/10 via-pink-600/10 to-cyan-500/10 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
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
