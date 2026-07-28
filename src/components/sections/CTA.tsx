import React from 'react';
import { ArrowUpRight, Sparkles, ShieldCheck, Zap, MessageCircle, Phone } from 'lucide-react';
import { quickWhatsAppUrl, PHONE_E164, PHONE_DISPLAY } from '../../config/contact';
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

          <div className="mb-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button
              type="button"
              onClick={() => {
                soundManager.playClick();
                onOpenProjectModal();
              }}
              onMouseEnter={() => soundManager.playHover()}
              className="group flex w-full items-center justify-center gap-3 rounded-full bg-gradient-to-r from-brand-orange via-brand-pink to-brand-cyan px-10 py-5 text-base font-extrabold text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_50px_rgba(255,94,58,0.7)] sm:w-auto"
            >
              <span>Start your project</span>
              <ArrowUpRight className="h-5 w-5 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" aria-hidden="true" />
            </button>

            <a
              href={quickWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundManager.playClick()}
              onMouseEnter={() => soundManager.playHover()}
              className="flex w-full items-center justify-center gap-3 rounded-full bg-[linear-gradient(135deg,#25D366,#128C7E)] px-10 py-5 text-base font-extrabold text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_50px_rgba(37,211,102,0.65)] sm:w-auto"
            >
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
              <span>WhatsApp us</span>
            </a>
          </div>

          <a
            href={`tel:${PHONE_E164}`}
            className="mb-12 inline-flex items-center gap-2 font-mono text-sm text-gray-400 transition-colors hover:text-white"
          >
            <Phone className="h-4 w-4 text-brand-cyan" aria-hidden="true" />
            {PHONE_DISPLAY}
          </a>

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
