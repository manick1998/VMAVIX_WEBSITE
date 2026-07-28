import React, { useState } from 'react';
import { INDUSTRIES_DATA } from '../../data/vmavixData';
import { Landmark, Gem, Cpu, Rocket, Activity, Building, ArrowUpRight } from 'lucide-react';
import { soundManager } from '../../utils/audio';

export const Industries: React.FC = () => {
  const [activeIndustry, setActiveIndustry] = useState(0);

  const getIndustryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Landmark': return <Landmark className="w-6 h-6" />;
      case 'Gem': return <Gem className="w-6 h-6" />;
      case 'Cpu': return <Cpu className="w-6 h-6" />;
      case 'Rocket': return <Rocket className="w-6 h-6" />;
      case 'Activity': return <Activity className="w-6 h-6" />;
      case 'Building': return <Building className="w-6 h-6" />;
      default: return <Landmark className="w-6 h-6" />;
    }
  };

  return (
    <section id="industries" className="py-28 relative overflow-hidden bg-[#07070B]">
      {/* Background Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-orange-600/10 via-pink-600/10 to-cyan-500/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-orange-400 font-mono text-xs uppercase tracking-widest mb-4">
            INDUSTRIES WE TRANSFORM
          </div>

          <h2 className="font-syne font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white">
            Engineered For <span className="text-gradient-aurora">Market Leaders.</span>
          </h2>
        </div>

        {/* Industry Tabs Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-12">
          {INDUSTRIES_DATA.map((ind, idx) => {
            const isActive = activeIndustry === idx;
            return (
              <button
                key={ind.id}
                onClick={() => {
                  soundManager.playClick();
                  setActiveIndustry(idx);
                }}
                onMouseEnter={() => soundManager.playHover()}
                className={`p-4 rounded-2xl border text-left transition-all duration-300 flex flex-col justify-between h-32 ${
                  isActive
                    ? 'glass-panel border-orange-500/50 bg-gradient-to-br from-orange-500/20 via-pink-500/10 to-cyan-500/10 shadow-[0_0_20px_rgba(255,94,58,0.25)]'
                    : 'bg-white/[0.02] border-white/10 hover:border-white/20 hover:bg-white/5 text-gray-400'
                }`}
              >
                <div className={`${isActive ? 'text-orange-400' : 'text-gray-400'}`}>
                  {getIndustryIcon(ind.icon)}
                </div>
                <span className={`font-syne font-bold text-xs sm:text-sm ${isActive ? 'text-white' : 'text-gray-300'}`}>
                  {ind.name}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Industry Showcase Panel */}
        <div className="glass-panel rounded-3xl p-8 sm:p-12 border border-white/20 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-6">
              <span className="font-mono text-xs text-orange-400 uppercase tracking-widest block">
                {INDUSTRIES_DATA[activeIndustry].tagline}
              </span>

              <h3 className="font-syne font-extrabold text-3xl sm:text-5xl text-white">
                {INDUSTRIES_DATA[activeIndustry].name}
              </h3>

              <p className="text-base sm:text-lg text-gray-300 font-light leading-relaxed">
                {INDUSTRIES_DATA[activeIndustry].description}
              </p>

              <div className="pt-4 flex items-center gap-6">
                <div>
                  <span className="text-xs font-mono text-gray-400 block uppercase">MEASURABLE IMPACT</span>
                  <span className="font-syne font-extrabold text-2xl sm:text-3xl text-gradient-primary">
                    {INDUSTRIES_DATA[activeIndustry].impactMetric}
                  </span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 glass-card p-6 rounded-2xl border border-white/10 flex flex-col justify-between h-full">
              <span className="font-mono text-xs text-gray-400 uppercase block mb-2">FEATURED INDUSTRY FLAGSHIP</span>
              <h4 className="font-syne font-bold text-xl text-white mb-4">
                {INDUSTRIES_DATA[activeIndustry].featuredProjectTitle}
              </h4>
              <a
                href="#portfolio"
                onClick={() => soundManager.playClick()}
                className="inline-flex items-center gap-2 text-xs font-bold text-cyan-400 hover:text-white transition-colors"
              >
                <span>View Portfolio Showcase</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
