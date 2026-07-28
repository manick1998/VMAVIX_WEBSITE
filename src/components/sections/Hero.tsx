import React, { useState } from 'react';
import { ArrowUpRight, Play, CheckCircle2, ShieldCheck, Zap, Globe, ChevronRight } from 'lucide-react';
import { soundManager } from '../../utils/audio';

interface HeroProps {
  onOpenProjectModal: () => void;
  onOpenVideoModal?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenProjectModal }) => {
  const [activeTab, setActiveTab] = useState<'ui' | 'code' | 'growth'>('ui');

  return (
    <section id="hero" className="relative min-h-screen pt-32 pb-20 flex flex-col justify-between overflow-hidden">
      {/* Background Animated Aurora Glow Mesh */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[1000px] h-[500px] bg-gradient-to-tr from-orange-600/25 via-pink-600/20 to-cyan-500/25 rounded-full blur-[140px] pointer-events-none animate-aurora-1" />
      <div className="absolute top-1/3 right-10 w-[500px] h-[400px] bg-gradient-to-bl from-cyan-500/20 via-purple-600/20 to-pink-500/15 rounded-full blur-[130px] pointer-events-none animate-aurora-2" />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10 w-full my-auto">
        {/* Top Floating Badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] border border-white/15 backdrop-blur-xl shadow-[0_0_25px_rgba(255,94,58,0.25)] hover:border-orange-500/50 transition-all duration-300 group cursor-pointer">
            <span className="w-2 h-2 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 animate-ping" />
            <span className="text-xs sm:text-sm font-medium text-gray-200 tracking-wide">
              AWARD-WINNING DIGITAL BRAND ARCHITECTS
            </span>
            <ChevronRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Massive Headline */}
        <div className="text-center max-w-5xl mx-auto">
          <h1 className="font-syne font-extrabold text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-[1.02] mb-8">
            Building Digital Brands{' '}
            <span className="text-gradient-aurora block sm:inline">
              That Dominate.
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-base sm:text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto font-light leading-relaxed mb-10">
            We create <span className="text-white font-normal">premium websites</span>, powerful brands, modern digital experiences, <span className="text-white font-normal">SEO strategies</span> and high-performing marketing systems that help businesses grow.
          </p>

          {/* Call To Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <button
              onClick={() => {
                soundManager.playClick();
                onOpenProjectModal();
              }}
              onMouseEnter={() => soundManager.playHover()}
              className="w-full sm:w-auto px-8 py-4 rounded-full font-bold text-sm sm:text-base text-white bg-gradient-to-r from-orange-500 via-pink-500 to-cyan-500 hover:shadow-[0_0_40px_rgba(255,94,58,0.6)] transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3 group"
            >
              <span>Start Your Project</span>
              <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </button>

            <a
              href="#portfolio"
              onClick={() => soundManager.playClick()}
              onMouseEnter={() => soundManager.playHover()}
              className="w-full sm:w-auto px-8 py-4 rounded-full font-semibold text-sm sm:text-base text-gray-200 hover:text-white bg-white/5 hover:bg-white/10 border border-white/15 hover:border-white/30 backdrop-blur-xl transition-all duration-300 flex items-center justify-center gap-2 group"
            >
              <Play className="w-4 h-4 text-cyan-400 fill-cyan-400/20 group-hover:scale-110 transition-transform" />
              <span>View Our Work</span>
            </a>
          </div>
        </div>

        {/* 3D Interactive Floating UI Showcase Widget */}
        <div className="relative max-w-5xl mx-auto">
          {/* Decorative Glowing Accent Lines */}
          <div className="absolute -top-6 left-10 w-24 h-[1px] bg-gradient-to-r from-transparent via-orange-500 to-transparent" />
          <div className="absolute -bottom-6 right-10 w-24 h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />

          {/* Main Floating Glass Frame */}
          <div className="glass-panel rounded-3xl p-4 sm:p-6 border border-white/15 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] backdrop-blur-2xl relative overflow-hidden group">
            {/* Top Widget Bar */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500/80" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <span className="w-3 h-3 rounded-full bg-green-500/80" />
                <span className="ml-3 font-mono text-xs text-gray-400 hidden sm:inline-block">
                  vmavix.design/engine-v4.0
                </span>
              </div>

              {/* Interactive Preview Tabs */}
              <div className="flex items-center gap-1 bg-white/5 rounded-xl p-1 border border-white/10">
                <button
                  onClick={() => {
                    soundManager.playClick();
                    setActiveTab('ui');
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                    activeTab === 'ui'
                      ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white font-bold'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  01. LUXURY UI
                </button>
                <button
                  onClick={() => {
                    soundManager.playClick();
                    setActiveTab('code');
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                    activeTab === 'code'
                      ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white font-bold'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  02. TECH STACK
                </button>
                <button
                  onClick={() => {
                    soundManager.playClick();
                    setActiveTab('growth');
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                    activeTab === 'growth'
                      ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white font-bold'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  03. GROWTH & SEO
                </button>
              </div>
            </div>

            {/* Widget Interactive Content Area */}
            {activeTab === 'ui' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-in fade-in duration-300">
                <div className="glass-card rounded-2xl p-5 border border-white/10 relative overflow-hidden group/card hover:border-orange-500/40 transition-colors">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono text-orange-400 uppercase tracking-wider">Aesthetics</span>
                    <Zap className="w-4 h-4 text-orange-400" />
                  </div>
                  <h3 className="font-syne font-bold text-lg text-white mb-2">Dark Luxury Design</h3>
                  <p className="text-xs text-gray-400 mb-4 leading-relaxed">
                    Custom motion curves, aurora glow mesh, and glassmorphic micro-components.
                  </p>
                  <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-orange-500 to-pink-500 w-[96%]" />
                  </div>
                </div>

                <div className="glass-card rounded-2xl p-5 border border-white/10 relative overflow-hidden group/card hover:border-pink-500/40 transition-colors">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono text-pink-400 uppercase tracking-wider">Engineering</span>
                    <Globe className="w-4 h-4 text-pink-400" />
                  </div>
                  <h3 className="font-syne font-bold text-lg text-white mb-2">60 FPS Motion</h3>
                  <p className="text-xs text-gray-400 mb-4 leading-relaxed">
                    GPU-accelerated animations, zero layout shifts, sub-100ms response times.
                  </p>
                  <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-pink-500 to-cyan-400 w-[99%]" />
                  </div>
                </div>

                <div className="glass-card rounded-2xl p-5 border border-white/10 relative overflow-hidden group/card hover:border-cyan-400/40 transition-colors">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider">Conversion</span>
                    <ShieldCheck className="w-4 h-4 text-cyan-400" />
                  </div>
                  <h3 className="font-syne font-bold text-lg text-white mb-2">Conversion Architecture</h3>
                  <p className="text-xs text-gray-400 mb-4 leading-relaxed">
                    Cognitive psychological triggers designed to maximize high-ticket lead submission.
                  </p>
                  <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 w-[94%]" />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'code' && (
              <div className="bg-[#08080C] rounded-2xl p-6 font-mono text-xs sm:text-sm text-gray-300 border border-white/10 overflow-x-auto leading-relaxed">
                <div className="flex items-center justify-between mb-3 text-gray-500 pb-2 border-b border-white/5">
                  <span>src/vmavix/engine.config.ts</span>
                  <span className="text-emerald-400">STATUS: 100% LIGHTHOUSE</span>
                </div>
                <p><span className="text-purple-400">import</span> &#123; LuxuryDesignSystem, ModernAI &#125; <span className="text-purple-400">from</span> <span className="text-emerald-300">'@vmavix/core'</span>;</p>
                <p className="mt-2"><span className="text-orange-400">export const</span> <span className="text-yellow-300">BrandEngine</span> = <span className="text-purple-400">async</span> () =&#210; &#123;</p>
                <p className="ml-4 text-gray-400">// World-Class Architecture Setup</p>
                <p className="ml-4"><span className="text-cyan-300">const</span> website = <span className="text-purple-400">new</span> <span className="text-yellow-300">LuxuryDesignSystem</span>(&#123;</p>
                <p className="ml-8 text-pink-300">mode: <span className="text-emerald-300">'DARK_LUXURY'</span>,</p>
                <p className="ml-8 text-pink-300">fps: <span className="text-orange-300">60</span>,</p>
                <p className="ml-8 text-pink-300">conversionRate: <span className="text-emerald-300">'+340%'</span>,</p>
                <p className="ml-8 text-pink-300">aiPowered: <span className="text-purple-300">true</span></p>
                <p className="ml-4">&#125;);</p>
                <p className="ml-4"><span className="text-purple-400">return</span> <span className="text-purple-400">await</span> website.<span className="text-yellow-300">dominateMarket</span>();</p>
                <p>&#125;;</p>
              </div>
            )}

            {activeTab === 'growth' && (
              <div className="p-6 bg-white/[0.02] rounded-2xl border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="space-y-3">
                  <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase">
                    <CheckCircle2 className="w-4 h-4" /> Organic Growth & Revenue Engineering
                  </div>
                  <h4 className="font-syne text-xl font-bold text-white">Compound Search Authority</h4>
                  <p className="text-xs text-gray-300 max-w-lg leading-relaxed">
                    Our SEO strategies and high-performing marketing systems ensure your brand ranks #1 for high-value keywords and converts cold visitors into lifetime clients.
                  </p>
                </div>
                <div className="flex gap-4">
                  <div className="glass-panel p-4 rounded-xl text-center min-w-[120px]">
                    <span className="font-syne font-extrabold text-2xl text-gradient-primary">4.2x</span>
                    <p className="text-[10px] font-mono text-gray-400 mt-1 uppercase">Avg ROAS</p>
                  </div>
                  <div className="glass-panel p-4 rounded-xl text-center min-w-[120px]">
                    <span className="font-syne font-extrabold text-2xl text-gradient-primary">99.8%</span>
                    <p className="text-[10px] font-mono text-gray-400 mt-1 uppercase">Client Retention</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Ticker / Client Banner Marquee */}
      <div className="mt-20 border-y border-white/10 bg-white/[0.02] backdrop-blur-md py-4 overflow-hidden">
        <div className="animate-marquee flex items-center gap-12 sm:gap-16 whitespace-nowrap">
          {['AETHER DYNAMICS', 'CHRONOS SWISS', 'NEXUS AI LABS', 'HYPERION CAPITAL', 'SOLARIS EV', 'VERCEL ENTERPRISE', 'FINTECH PRIME', 'AURA GENOMICS', 'AETHER DYNAMICS', 'CHRONOS SWISS'].map((brand, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-orange-500/80" />
              <span className="font-syne font-bold text-sm tracking-widest text-gray-400 hover:text-white transition-colors cursor-pointer">
                {brand}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
