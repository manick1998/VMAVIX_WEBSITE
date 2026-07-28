import React from 'react';
import { ArrowUpRight, Sparkles, ShieldCheck, Zap } from 'lucide-react';
import { soundManager } from '../../utils/audio';

interface CTAProps {
  onOpenProjectModal: () => void;
}

export const CTA: React.FC<CTAProps> = ({ onOpenProjectModal }) => {
  return (
    <section className="py-28 relative overflow-hidden bg-[#050508]">
      {/* Intense Aurora Lighting Mesh */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(95vw,900px)] h-[500px] bg-gradient-to-r from-brand-orange/30 via-brand-pink/25 to-brand-cyan/25 rounded-full blur-[160px] pointer-events-none animate-pulse-glow" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        <div className="glass-panel rounded-3xl p-8 sm:p-16 border border-white/25 shadow-2xl relative overflow-hidden text-center backdrop-blur-3xl">
          {/* Top Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-xs font-mono text-brand-cyan mb-8 uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-yellow-300 animate-spin" style={{ animationDuration: '4s' }} />
            READY WHEN YOU ARE
          </div>

          <h2 className="font-syne font-extrabold text-3xl sm:text-5xl lg:text-7xl text-white mb-8 max-w-4xl mx-auto leading-tight">
            Let's build something <span className="text-gradient-aurora">Unforgettable.</span>
          </h2>

          <p className="text-base sm:text-xl text-gray-200 max-w-2xl mx-auto font-light leading-relaxed mb-10">
            Tell us what you're building. We take on a limited number of projects at a time so every client gets senior attention.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <button
              onClick={() => {
                soundManager.playClick();
                onOpenProjectModal();
              }}
              onMouseEnter={() => soundManager.playHover()}
              className="w-full sm:w-auto px-10 py-5 rounded-full font-extrabold text-base text-white bg-gradient-to-r from-brand-orange via-brand-pink to-brand-cyan hover:shadow-[0_0_50px_rgba(255,94,58,0.7)] transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3 group"
            >
              <span>Start your project</span>
              <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>

          {/* Key commitments */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto pt-8 border-t border-white/10 text-xs font-mono text-gray-300">
            <div className="flex items-center justify-center gap-2">
              <Zap className="w-4 h-4 text-brand-orange" />
              <span>Reply within 1 business day</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>NDA on request</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4 text-brand-cyan" />
              <span>Bespoke, never templated</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
