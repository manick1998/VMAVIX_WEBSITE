import React from 'react';
import { Award, Shield, Sparkles, Target, Zap, CheckCircle2 } from 'lucide-react';
import { soundManager } from '../../utils/audio';

export const About: React.FC = () => {
  const brandPillars = [
    { title: 'Luxury & Elegance', icon: Sparkles, color: 'from-orange-500 to-pink-500', desc: 'Bespoke design language that conveys instant enterprise prestige.' },
    { title: 'Futuristic Innovation', icon: Zap, color: 'from-pink-500 to-purple-500', desc: 'AI-native integrations and 60 FPS WebGL motion mechanics.' },
    { title: 'Uncompromising Trust', icon: Shield, color: 'from-purple-500 to-cyan-500', desc: 'SOC-2 compliant architecture with 99.99% uptime guarantee.' },
    { title: 'Conversion Focus', icon: Target, color: 'from-cyan-500 to-blue-500', desc: 'Data-driven UI engineered to convert cold visitors into high-value clients.' }
  ];

  const brandTraits = [
    'Luxury', 'Modern', 'Minimal', 'Bold', 'Premium', 'Innovative',
    'Elegant', 'Futuristic', 'Trustworthy', 'Creative', 'High-End', 'Confident'
  ];

  return (
    <section id="about" className="py-28 relative overflow-hidden">
      {/* Subtle Aurora Glow Backdrop */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-orange-600/15 to-purple-600/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        {/* Section Header Tag */}
        <div className="flex items-center gap-3 mb-6">
          <span className="w-8 h-[2px] bg-gradient-to-r from-orange-500 to-pink-500" />
          <span className="font-mono text-xs uppercase tracking-widest text-orange-400 font-semibold">
            ABOUT VMAVIX
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
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
                <span className="font-bold text-orange-400">Our Mission:</span> Helping businesses build unforgettable digital brands through technology, creativity and innovation.
              </p>

              <p>
                Founded on the belief that template websites and derivative design kill potential, VMAVIX combines multi-million-dollar aesthetic craftsmanship with high-octane engineering.
              </p>

              <p>
                Every brand we touch undergoes an evolution: transformed into an influential, high-converting digital product that dominates its sector.
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
                    className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white/[0.04] border border-white/10 text-gray-200 hover:text-white hover:border-orange-500/50 hover:bg-orange-500/10 transition-all duration-300 cursor-default"
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
                      <h3 className="font-syne font-bold text-lg text-white mb-1 group-hover:text-cyan-300 transition-colors">
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
            <div className="p-6 rounded-2xl bg-gradient-to-r from-orange-500/10 via-pink-500/10 to-cyan-500/10 border border-white/15 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Award className="w-8 h-8 text-yellow-400" />
                <div>
                  <h4 className="font-syne font-bold text-sm text-white">Award-Winning Standard</h4>
                  <p className="text-[11px] text-gray-400">Awwwards & FWA Recognized Studio</p>
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
