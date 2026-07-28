import React, { useState } from 'react';
import { SERVICES_DATA } from '../../data/vmavixData';
import { ServiceItem } from '../../types';
import { 
  Palette, Code2, ShoppingBag, Building2, Sparkles, Compass, 
  Layers, Search, TrendingUp, Target, Share2, Zap, Cpu, ArrowUpRight,
  CheckCircle2, Clock, BarChart3, X, ChevronRight, Check
} from 'lucide-react';
import { soundManager } from '../../utils/audio';

interface ServicesProps {
  onOpenProjectModalWithService: (serviceName: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onOpenProjectModalWithService }) => {
  const [activeCategory, setActiveTab] = useState<'all' | 'web' | 'design' | 'growth' | 'ai'>('all');
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Palette': return <Palette className="w-6 h-6" />;
      case 'Code2': return <Code2 className="w-6 h-6" />;
      case 'ShoppingBag': return <ShoppingBag className="w-6 h-6" />;
      case 'Building2': return <Building2 className="w-6 h-6" />;
      case 'Sparkles': return <Sparkles className="w-6 h-6" />;
      case 'Compass': return <Compass className="w-6 h-6" />;
      case 'Layers': return <Layers className="w-6 h-6" />;
      case 'Search': return <Search className="w-6 h-6" />;
      case 'TrendingUp': return <TrendingUp className="w-6 h-6" />;
      case 'Target': return <Target className="w-6 h-6" />;
      case 'Share2': return <Share2 className="w-6 h-6" />;
      case 'Zap': return <Zap className="w-6 h-6" />;
      case 'Cpu': return <Cpu className="w-6 h-6" />;
      default: return <Sparkles className="w-6 h-6" />;
    }
  };

  const filteredServices = SERVICES_DATA.filter((s) => {
    if (activeCategory === 'all') return true;
    return s.category === activeCategory;
  });

  return (
    <section id="services" className="py-28 relative overflow-hidden bg-[#07070A]">
      {/* Aurora Ambient Mesh */}
      <div className="absolute top-1/3 right-0 w-[600px] h-[600px] bg-gradient-to-l from-pink-600/15 via-purple-600/10 to-transparent rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-[2px] bg-gradient-to-r from-orange-500 to-pink-500" />
              <span className="font-mono text-xs uppercase tracking-widest text-orange-400 font-semibold">
                OUR CAPABILITIES
              </span>
            </div>
            <h2 className="font-syne font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white">
              Full-Spectrum <span className="text-gradient-aurora">Digital Mastery.</span>
            </h2>
          </div>

          <p className="text-sm sm:text-base text-gray-400 max-w-md font-light leading-relaxed">
            From bespoke luxury engineering to high-converting performance marketing and custom AI agents, we deliver end-to-end category dominance.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-12 scrollbar-none">
          {[
            { id: 'all', label: 'All 14 Services' },
            { id: 'web', label: 'Web & Development' },
            { id: 'design', label: 'Design & Identity' },
            { id: 'growth', label: 'Growth, SEO & Marketing' },
            { id: 'ai', label: 'AI & Future Tech' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                soundManager.playClick();
                setActiveTab(tab.id as any);
              }}
              onMouseEnter={() => soundManager.playHover()}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-300 ${
                activeCategory === tab.id
                  ? 'bg-gradient-to-r from-orange-500 via-pink-500 to-cyan-500 text-white shadow-[0_0_20px_rgba(255,94,58,0.3)]'
                  : 'bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              onClick={() => {
                soundManager.playClick();
                setSelectedService(service);
              }}
              onMouseEnter={() => soundManager.playHover()}
              className="glass-panel-interactive rounded-3xl p-7 flex flex-col justify-between relative group cursor-pointer border border-white/10 hover:border-white/25"
            >
              {/* Popular Badge */}
              {service.popular && (
                <div className="absolute top-6 right-6 px-3 py-1 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 text-[10px] font-bold text-white uppercase tracking-wider shadow-lg">
                  Popular Choice
                </div>
              )}

              <div>
                {/* Icon */}
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 text-orange-400 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-gradient-to-tr group-hover:from-orange-500 group-hover:to-pink-500 group-hover:text-white transition-all duration-300">
                  {getIcon(service.icon)}
                </div>

                <h3 className="font-syne font-bold text-xl text-white mb-3 group-hover:text-cyan-300 transition-colors flex items-center gap-2">
                  {service.title}
                </h3>

                <p className="text-xs text-gray-400 leading-relaxed mb-6">
                  {service.shortDesc}
                </p>

                {/* Core Features List */}
                <div className="space-y-2 mb-6">
                  {service.features.slice(0, 3).map((feat, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-gray-300">
                      <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span className="truncate">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Metrics Bar */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="font-mono text-[11px] text-emerald-400 font-medium">
                  ROI: {service.expectedRoi}
                </span>
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-white group-hover:text-orange-400 transition-colors">
                  Explore Scope <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Expandable Service Detail Modal / Drawer */}
      {selectedService && (
        <div className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-300">
          <div className="glass-panel max-w-2xl w-full rounded-3xl p-6 sm:p-8 border border-white/20 shadow-2xl relative my-auto">
            {/* Close Button */}
            <button
              onClick={() => {
                soundManager.playClick();
                setSelectedService(null);
              }}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-orange-500 via-pink-500 to-cyan-500 p-0.5 text-white">
                <div className="w-full h-full bg-[#0D0D12] rounded-[14px] flex items-center justify-center text-orange-400">
                  {getIcon(selectedService.icon)}
                </div>
              </div>
              <div>
                <span className="font-mono text-xs text-orange-400 uppercase tracking-widest">
                  SERVICE SPECIFICATION
                </span>
                <h3 className="font-syne font-extrabold text-2xl sm:text-3xl text-white">
                  {selectedService.title}
                </h3>
              </div>
            </div>

            <p className="text-sm text-gray-300 leading-relaxed mb-6 font-light">
              {selectedService.fullDesc}
            </p>

            {/* Info Grid */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="glass-card p-4 rounded-2xl border border-white/10">
                <div className="flex items-center gap-2 text-xs font-mono text-gray-400 mb-1">
                  <Clock className="w-4 h-4 text-cyan-400" />
                  TYPICAL TIMELINE
                </div>
                <p className="font-syne font-bold text-white text-base">
                  {selectedService.typicalTimeline}
                </p>
              </div>

              <div className="glass-card p-4 rounded-2xl border border-white/10">
                <div className="flex items-center gap-2 text-xs font-mono text-gray-400 mb-1">
                  <BarChart3 className="w-4 h-4 text-emerald-400" />
                  EXPECTED IMPACT
                </div>
                <p className="font-syne font-bold text-emerald-400 text-base">
                  {selectedService.expectedRoi}
                </p>
              </div>
            </div>

            {/* Deliverables Checklist */}
            <div className="mb-8">
              <h4 className="font-syne font-bold text-sm text-white mb-3 uppercase tracking-wider">
                Key Deliverables & Specifications
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {selectedService.deliverables.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/[0.03] border border-white/5 text-xs text-gray-200">
                    <CheckCircle2 className="w-4 h-4 text-orange-400 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={() => {
                  soundManager.playClick();
                  const serviceName = selectedService.title;
                  setSelectedService(null);
                  onOpenProjectModalWithService(serviceName);
                }}
                className="w-full sm:flex-1 py-3.5 rounded-full font-bold text-sm text-white bg-gradient-to-r from-orange-500 via-pink-500 to-cyan-500 hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <span>Request {selectedService.title} Proposal</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setSelectedService(null)}
                className="w-full sm:w-auto px-6 py-3.5 rounded-full font-medium text-sm text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
