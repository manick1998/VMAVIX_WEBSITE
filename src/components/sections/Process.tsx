import React, { useState } from 'react';
import { PROCESS_STEPS } from '../../data/vmavixData';
import { Search, Compass, Palette, Code2, CheckCircle2, Rocket, TrendingUp, Clock } from 'lucide-react';
import { soundManager } from '../../utils/audio';

export const Process: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  const getStepIcon = (iconName: string) => {
    switch (iconName) {
      case 'Search': return <Search className="w-5 h-5" />;
      case 'Compass': return <Compass className="w-5 h-5" />;
      case 'Palette': return <Palette className="w-5 h-5" />;
      case 'Code2': return <Code2 className="w-5 h-5" />;
      case 'CheckCircle2': return <CheckCircle2 className="w-5 h-5" />;
      case 'Rocket': return <Rocket className="w-5 h-5" />;
      case 'TrendingUp': return <TrendingUp className="w-5 h-5" />;
      default: return <Search className="w-5 h-5" />;
    }
  };

  return (
    <section id="process" className="py-28 relative overflow-hidden bg-[#07070B]">
      {/* Background Lights */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-gradient-to-r from-orange-600/15 via-pink-600/10 to-transparent rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-[2px] bg-gradient-to-r from-orange-500 to-pink-500" />
              <span className="font-mono text-xs uppercase tracking-widest text-orange-400 font-semibold">
                THE DOMINANCE BLUEPRINT
              </span>
            </div>
            <h2 className="font-syne font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white">
              Our 7-Step <span className="text-gradient-aurora">Precision Process.</span>
            </h2>
          </div>

          <p className="text-sm sm:text-base text-gray-400 max-w-md font-light leading-relaxed">
            Zero fluff, zero guesswork. A battle-tested methodology engineered to deliver high-ticket digital products with precision.
          </p>
        </div>

        {/* 7-Step Interactive Process Roadmap Timeline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Step Roadmap Nodes */}
          <div className="lg:col-span-5 space-y-3">
            {PROCESS_STEPS.map((step, idx) => {
              const isActive = activeStep === idx;
              return (
                <div
                  key={step.stepNumber}
                  onClick={() => {
                    soundManager.playClick();
                    setActiveStep(idx);
                  }}
                  onMouseEnter={() => soundManager.playHover()}
                  className={`p-4 rounded-2xl border transition-all duration-300 cursor-pointer flex items-center justify-between ${
                    isActive
                      ? 'glass-panel border-orange-500/50 bg-gradient-to-r from-orange-500/20 to-pink-500/10 shadow-[0_0_20px_rgba(255,94,58,0.2)] scale-[1.02]'
                      : 'bg-white/[0.02] border-white/10 hover:border-white/20 hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className={`font-mono font-extrabold text-base ${isActive ? 'text-orange-400' : 'text-gray-500'}`}>
                      {step.stepNumber}
                    </span>
                    <div>
                      <h4 className={`font-syne font-bold text-sm sm:text-base ${isActive ? 'text-white' : 'text-gray-300'}`}>
                        {step.title}
                      </h4>
                      <p className="text-[11px] font-mono text-gray-400">
                        {step.tagline}
                      </p>
                    </div>
                  </div>

                  <div className={`p-2 rounded-xl border ${isActive ? 'bg-orange-500 text-white border-orange-400' : 'bg-white/5 text-gray-400 border-white/10'}`}>
                    {getStepIcon(step.icon)}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Active Step Showcase Deep-Dive */}
          <div className="lg:col-span-7">
            <div className="glass-panel rounded-3xl p-8 border border-white/20 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none font-syne font-extrabold text-9xl text-white">
                {PROCESS_STEPS[activeStep].stepNumber}
              </div>

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 rounded-full bg-orange-500/20 border border-orange-500/40 font-mono text-xs text-orange-400 uppercase font-bold">
                    STEP {PROCESS_STEPS[activeStep].stepNumber}
                  </span>
                  <span className="flex items-center gap-1.5 font-mono text-xs text-cyan-400">
                    <Clock className="w-3.5 h-3.5" />
                    {PROCESS_STEPS[activeStep].duration}
                  </span>
                </div>

                <h3 className="font-syne font-extrabold text-3xl sm:text-4xl text-white mb-4">
                  {PROCESS_STEPS[activeStep].title}
                </h3>

                <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-light mb-8">
                  {PROCESS_STEPS[activeStep].description}
                </p>

                {/* Deliverables List */}
                <div className="space-y-3 pt-6 border-t border-white/10">
                  <span className="font-mono text-xs uppercase tracking-widest text-gray-400 font-bold block mb-3">
                    STEP DELIVERABLES
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {PROCESS_STEPS[activeStep].deliverables.map((item, i) => (
                      <div key={i} className="flex items-center gap-2.5 p-3 rounded-xl bg-white/[0.03] border border-white/10 text-xs font-medium text-white">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
