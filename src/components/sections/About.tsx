import React from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { Award, Shield, Sparkles, Target, Zap, CheckCircle2 } from 'lucide-react';
import { soundManager } from '../../utils/audio';

export const About: React.FC = () => {
  const revealRef = useScrollReveal<HTMLDivElement>();
  const brandPillars = [
    { title: 'Luxury & Elegance', icon: Sparkles, color: 'from-brand-orange to-brand-pink', desc: 'Bespoke design language that conveys instant enterprise prestige.' },
    { title: 'Futuristic Innovation', icon: Zap, color: 'from-brand-pink to-brand-purple', desc: 'AI-native integrations and 60 FPS WebGL motion mechanics.' },
    { title: 'Built On Trust', icon: Shield, color: 'from-brand-purple to-brand-cyan', desc: 'Secure, well-documented code and transparent weekly progress.' },
    { title: 'Conversion Focus', icon: Target, color: 'from-brand-cyan to-blue-500', desc: 'Data-driven UI engineered to convert cold visitors into high-value clients.' }
  ];

  const brandTraits = [
    'Luxury', 'Modern', 'Minimal', 'Bold', 'Premium', 'Innovative',
    'Elegant', 'Futuristic', 'Trustworthy', 'Creative', 'High-End', 'Confident'
  ];

  return (
    <section id="about" className="py-28 relative overflow-hidden">
      {/* Subtle Aurora Glow Backdrop */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[min(95vw,500px)] h-[500px] bg-gradient-to-r from-brand-orange/15 to-brand-purple/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        {/* Section Header Tag */}
        <div className="flex items-center gap-3 mb-6">
          <span className="w-8 h-[2px] bg-gradient-to-r from-brand-orange to-brand-pink" />
          <span className="font-mono text-xs uppercase tracking-widest text-brand-orange font-semibold">
            ABOUT VMAVIX
          </span>
        </div>

        <div ref={revealRef} className="reveal grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-16">
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-8">
            <h2 className="font-syne font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white leading-tight">
              We Don't Follow Trends.{' '}
              <span className="text-gradient-aurora block">
                We Architect Digital Dominance.
              </span>
            </h2>

            <div className="space-y-4 text-base sm:text-lg text-gray-300 font-light leading-relaxed">
              <p className="glass-panel p-6 rounded-2xl border-l-4 border-l-orange-500 border-white/10 text-white font-normal shadow-lg">
                <span className="font-bold text-brand-orange">Our Mission:</span> Helping businesses build unforgettable digital brands through technology, creativity and innovation.
              </p>

              <p>
                Founded on the belief that template websites and derivative design kill potential, VMAVIX combines multi-million-dollar aesthetic craftsmanship with high-octane engineering.
              </p>

              <p>
                Every brand we work with gets the same treatment: a considered, high-converting digital product built to compete in its sector.
              </p>
            </div>

            {/* Brand Traits Pills Cloud */}
            <div>
              <span className="font-mono text-xs text-gray-400 uppercase tracking-widest block mb-3">
                THE VMAVIX PERSONALITY
              </span>
              <div className="flex flex-wrap gap-2">
                {brandTraits.map((trait) => (
                  <span
                    key={trait}
                    onMouseEnter={() => soundManager.playHover()}
                    className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white/[0.04] border border-white/10 text-gray-200 hover:text-white hover:border-brand-orange/50 hover:bg-brand-orange/10 transition-all duration-300 cursor-default"
                  >
                    #{trait}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Brand Pillars Stack */}
          <div className="lg:col-span-5 space-y-4">
            {brandPillars.map((pillar, idx) => {
              const IconComp = pillar.icon;
              return (
                <div
                  key={idx}
                  onMouseEnter={() => soundManager.playHover()}
                  className="glass-panel-interactive rounded-2xl p-6 relative overflow-hidden group cursor-pointer"
                >
                  {/* Subtle hover gradient indicator */}
                  <div className={`absolute top-0 left-0 bottom-0 w-1 bg-gradient-to-b ${pillar.color} opacity-0 group-hover:opacity-100 transition-opacity`} />

                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${pillar.color} text-white shadow-lg`}>
                      <IconComp className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-syne font-bold text-lg text-white mb-1 group-hover:text-brand-cyan transition-colors">
                        {pillar.title}
                      </h3>
                      <p className="text-xs text-gray-400 leading-relaxed">
                        {pillar.desc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Mini Trust Stamp Card */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-brand-orange/10 via-brand-pink/10 to-brand-cyan/10 border border-white/15 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Award className="w-8 h-8 text-yellow-400" />
                <div>
                  <h4 className="font-syne text-sm font-bold text-white">Craft-First Standard</h4>
                  <p className="text-[11px] text-gray-400">Bespoke builds, never templates</p>
                </div>
              </div>
              <CheckCircle2 className="w-6 h-6 text-emerald-400" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
