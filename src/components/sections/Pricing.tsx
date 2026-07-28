import React from 'react';
import { PRICING_PLANS } from '../../data/vmavixData';
import { Check, Sparkles, ArrowUpRight, Zap } from 'lucide-react';
import { soundManager } from '../../utils/audio';

interface PricingProps {
  onOpenProjectModalWithPlan: (planName: string) => void;
}

export const Pricing: React.FC<PricingProps> = ({ onOpenProjectModalWithPlan }) => {
  return (
    <section id="pricing" className="py-28 relative overflow-hidden bg-[#050508]">
      {/* Glow Mesh */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-orange-600/15 via-pink-600/10 to-cyan-500/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-orange-400 font-mono text-xs uppercase tracking-widest mb-4">
            TRANSPARENT ENGAGEMENT MODELS
          </div>

          <h2 className="font-syne font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white">
            Investment In <span className="text-gradient-aurora">Market Dominance.</span>
          </h2>

          <p className="text-sm sm:text-base text-gray-300 font-light mt-4 leading-relaxed">
            Transparent investment tiers designed to deliver maximum return on brand equity and direct conversion growth.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch mb-16">
          {PRICING_PLANS.map((plan) => (
            <div
              key={plan.id}
              onMouseEnter={() => soundManager.playHover()}
              className={`rounded-3xl p-8 flex flex-col justify-between relative transition-all duration-300 ${
                plan.popular
                  ? 'glass-panel border-2 border-orange-500/60 bg-gradient-to-b from-orange-500/15 via-pink-500/10 to-transparent shadow-[0_0_40px_rgba(255,94,58,0.25)] scale-[1.03] z-10'
                  : 'glass-panel border border-white/10 hover:border-white/25'
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 text-white font-mono text-[10px] font-bold uppercase tracking-wider shadow-lg flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> MOST POPULAR FOR SCALE
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-syne font-extrabold text-2xl text-white">{plan.name}</h3>
                  <span className="font-mono text-[11px] text-gray-400 bg-white/5 px-2.5 py-1 rounded-full border border-white/10">
                    {plan.deliveryTime}
                  </span>
                </div>

                <p className="text-xs text-gray-300 leading-relaxed mb-6 font-light min-h-[36px]">
                  {plan.tagline}
                </p>

                <div className="mb-6">
                  <span className="font-syne font-extrabold text-4xl sm:text-5xl text-white">{plan.price}</span>
                  <span className="font-mono text-xs text-gray-400 ml-2">/ {plan.period}</span>
                </div>

                {/* Features List */}
                <div className="space-y-3 mb-8 pt-6 border-t border-white/10">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-gray-400 block mb-2 font-bold">
                    INCLUDED DELIVERABLES
                  </span>
                  {plan.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-xs text-gray-200">
                      <div className="w-4 h-4 rounded-full bg-orange-500/20 text-orange-400 flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3" />
                      </div>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action CTA Button */}
              <button
                onClick={() => {
                  soundManager.playClick();
                  onOpenProjectModalWithPlan(plan.name);
                }}
                className={`w-full py-4 rounded-full font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 group ${
                  plan.popular
                    ? 'bg-gradient-to-r from-orange-500 via-pink-500 to-cyan-500 text-white shadow-lg hover:shadow-orange-500/50'
                    : 'bg-white/10 hover:bg-white/20 border border-white/15 text-white'
                }`}
              >
                <span>Select {plan.name}</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </div>
          ))}
        </div>

        {/* Custom Project Estimator Banner */}
        <div className="glass-panel rounded-3xl p-8 border border-white/20 text-center max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-left space-y-1">
            <div className="inline-flex items-center gap-1.5 text-xs font-mono text-orange-400 uppercase font-bold">
              <Zap className="w-4 h-4" /> Need a Custom Bespoke Scope?
            </div>
            <h4 className="font-syne font-bold text-xl text-white">Use Our Interactive Project Configurator</h4>
            <p className="text-xs text-gray-400">Select custom deliverables, timeline goals, and calculate your instant scope estimate.</p>
          </div>

          <button
            onClick={() => {
              soundManager.playClick();
              onOpenProjectModalWithPlan('Custom Configurator');
            }}
            className="px-8 py-3.5 rounded-full font-bold text-xs text-white bg-gradient-to-r from-orange-500 to-pink-500 hover:shadow-lg whitespace-nowrap"
          >
            Launch Project Configurator
          </button>
        </div>
      </div>
    </section>
  );
};
