import React from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { ShieldCheck, Zap, TrendingUp, Cpu, Lock, Sparkles, Check, X, Award } from 'lucide-react';
import { soundManager } from '../../utils/audio';

export const WhyUs: React.FC = () => {
  const revealRef = useScrollReveal<HTMLDivElement>();
  const highlights = [
    { title: 'Modern, Considered Design', desc: 'Custom motion, layered glass surfaces and a coherent visual system.', icon: Sparkles },
    { title: 'Rapid 3-6 Week Delivery', desc: 'Streamlined agile sprints with weekly live production previews.', icon: Zap },
    { title: 'SEO Optimized (95+ Lighthouse)', desc: 'Built for Google Page #1 rankings and core web vitals compliance.', icon: TrendingUp },
    { title: 'Premium UI / UX Architecture', desc: 'Deep psychological user flows designed to maximize revenue and signups.', icon: Award },
    { title: 'Security Best Practice', desc: 'TLS everywhere, hardened headers, audited dependencies.', icon: Lock },
    { title: 'Sub-Second Cloud Scalability', desc: 'Serverless Edge network architecture built to handle millions of requests.', icon: Cpu },
    { title: 'Mobile-First Perfection', desc: 'Designed mobile-first with liquid touch responsiveness.', icon: ShieldCheck },
    { title: 'Business ROI Focused', desc: 'Every design choice directly backed by conversion data and profit targets.', icon: TrendingUp }
  ];

  const comparisonRows = [
    { feature: 'Bespoke Non-Template Engineering', vmavix: true, traditional: false, template: false },
    { feature: '60 FPS Motion & WebGL Graphics', vmavix: true, traditional: false, template: false },
    { feature: 'Lighthouse Performance Score 95+', vmavix: true, traditional: 'Varies', template: false },
    { feature: 'Custom AI & LLM Integrations', vmavix: true, traditional: false, template: false },
    { feature: 'Launch Timeline', vmavix: '2-4 Weeks', traditional: '3-6 Months', template: 'Instant (Generic)' },
    { feature: 'Direct Access to Senior Lead Architects', vmavix: true, traditional: false, template: false },
    { feature: 'Conversion-Focused Build Process', vmavix: true, traditional: false, template: false }
  ];

  return (
    <section id="why-us" className="py-28 relative overflow-hidden">
      {/* Background Lights */}
      <div className="absolute top-1/2 right-1/4 w-[min(95vw,500px)] h-[500px] bg-gradient-to-br from-brand-cyan/15 via-brand-orange/10 to-transparent rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-brand-orange font-mono text-xs uppercase tracking-widest mb-4">
            <Award className="w-4 h-4 text-brand-orange" />
            THE VMAVIX DIFFERENCE
          </div>

          <h2 className="font-syne font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white leading-tight">
            Why Visionaries Choose{' '}
            <span className="text-gradient-aurora block sm:inline">VMAVIX.</span>
          </h2>

          <p className="text-sm sm:text-base text-gray-300 font-light mt-4 leading-relaxed">
            While traditional agencies sell bloated timelines and template shops sell generic themes, VMAVIX delivers world-class digital assets built to conquer markets.
          </p>
        </div>

        {/* 8 Signature Highlights Grid */}
        <div ref={revealRef} className="reveal mb-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 sm:gap-6 lg:mb-20">
          {highlights.map((item, idx) => {
            const IconComp = item.icon;
            return (
              <div
                key={idx}
                onMouseEnter={() => soundManager.playHover()}
                className="glass-panel-interactive rounded-3xl p-6 border border-white/10 relative group"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-brand-orange/20 to-brand-pink/20 border border-brand-orange/30 text-brand-orange flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <IconComp className="w-5 h-5" />
                </div>
                <h3 className="font-syne font-bold text-base text-white mb-2 group-hover:text-brand-cyan transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed font-light">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Comparison Table Section */}
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="font-syne font-bold text-2xl sm:text-3xl text-white">
              The Uncompromising Comparison
            </h3>
            <p className="text-xs font-mono text-gray-400 uppercase tracking-widest mt-1">
              VMAVIX VS TRADITIONAL AGENCIES VS TEMPLATES
            </p>
          </div>

          <div className="glass-panel rounded-3xl p-4 sm:p-8 border border-white/15 overflow-x-auto shadow-2xl">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="border-b border-white/10 text-xs font-mono uppercase tracking-wider text-gray-400">
                  <th className="py-4 px-4">Feature & Quality Standard</th>
                  <th className="py-4 px-4 text-center bg-gradient-to-r from-brand-orange/10 to-brand-pink/10 text-brand-orange font-bold rounded-t-xl border-t border-x border-brand-orange/30">
                    VMAVIX
                  </th>
                  <th className="py-4 px-4 text-center">Traditional Agency</th>
                  <th className="py-4 px-4 text-center">Theme Templates</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-xs sm:text-sm">
                {comparisonRows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-4 px-4 font-medium text-white">{row.feature}</td>

                    {/* VMAVIX Column */}
                    <td className="py-4 px-4 text-center font-bold text-white bg-gradient-to-r from-brand-orange/5 to-brand-pink/5 border-x border-brand-orange/20">
                      {typeof row.vmavix === 'boolean' ? (
                        row.vmavix ? (
                          <div className="inline-flex p-1 rounded-full bg-emerald-500/20 text-emerald-400">
                            <Check className="w-4 h-4" />
                          </div>
                        ) : (
                          <X className="w-4 h-4 text-red-400 mx-auto" />
                        )
                      ) : (
                        <span className="text-brand-orange font-mono font-bold">{row.vmavix}</span>
                      )}
                    </td>

                    {/* Traditional Agency Column */}
                    <td className="py-4 px-4 text-center text-gray-400">
                      {typeof row.traditional === 'boolean' ? (
                        row.traditional ? (
                          <Check className="w-4 h-4 text-gray-400 mx-auto" />
                        ) : (
                          <X className="w-4 h-4 text-gray-600 mx-auto" />
                        )
                      ) : (
                        <span>{row.traditional}</span>
                      )}
                    </td>

                    {/* Template Column */}
                    <td className="py-4 px-4 text-center text-gray-500">
                      {typeof row.template === 'boolean' ? (
                        row.template ? (
                          <Check className="w-4 h-4 text-gray-500 mx-auto" />
                        ) : (
                          <X className="w-4 h-4 text-red-500/60 mx-auto" />
                        )
                      ) : (
                        <span>{row.template}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};
