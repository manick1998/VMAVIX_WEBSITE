import React, { useState } from 'react';
import { SERVICES_DATA, serviceToGoal } from '../../data/vmavixData';
import type { ServiceItem } from '../../types';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { useModalA11y } from '../../hooks/useModalA11y';

type Category = 'all' | 'web' | 'design' | 'growth' | 'ai';
import { 
  Palette, Code2, ShoppingBag, Building2, Sparkles, Compass, 
  Layers, Search, TrendingUp, Target, Share2, Zap, Cpu, ArrowUpRight,
  CheckCircle2, Clock, BarChart3, X, ChevronRight, Check
} from 'lucide-react';
import { soundManager } from '../../utils/audio';

interface ServicesProps {
  onOpenProjectModalWithService: (goal?: string) => void;
}

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

export const Services: React.FC<ServicesProps> = ({ onOpenProjectModalWithService }) => {
  const revealRef = useScrollReveal<HTMLDivElement>();
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);


  const filteredServices = SERVICES_DATA.filter((s) => {
    if (activeCategory === 'all') return true;
    return s.category === activeCategory;
  });

  return (
    <section id="services" className="py-28 relative overflow-hidden bg-[#07070A]">
      {/* Aurora Ambient Mesh */}
      <div className="absolute top-1/3 right-0 w-[min(95vw,600px)] h-[600px] bg-gradient-to-l from-brand-pink/15 via-brand-purple/10 to-transparent rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-[2px] bg-gradient-to-r from-brand-orange to-brand-pink" />
              <span className="font-mono text-xs uppercase tracking-widest text-brand-orange font-semibold">
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
            { id: 'all' as const, label: `All ${SERVICES_DATA.length} Services` },
            { id: 'web' as const, label: 'Web & Development' },
            { id: 'design' as const, label: 'Design & Identity' },
            { id: 'growth' as const, label: 'Growth, SEO & Marketing' },
            { id: 'ai' as const, label: 'AI & Future Tech' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                soundManager.playClick();
                setActiveCategory(tab.id);
              }}
              onMouseEnter={() => soundManager.playHover()}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-300 ${
                activeCategory === tab.id
                  ? 'bg-gradient-to-r from-brand-orange via-brand-pink to-brand-cyan text-white shadow-[0_0_20px_rgba(255,94,58,0.3)]'
                  : 'bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div ref={revealRef} className="reveal grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredServices.map((service) => (
            <button
              key={service.id}
              type="button"
              onClick={() => {
                soundManager.playClick();
                setSelectedService(service);
              }}
              onMouseEnter={() => soundManager.playHover()}
              aria-label={`View details for ${service.title}`}
              className="glass-panel-interactive group relative flex flex-col justify-between rounded-3xl border border-white/10 p-7 text-left hover:border-white/25"
            >
              {/* Popular Badge */}
              {service.popular && (
                <div className="absolute top-6 right-6 px-3 py-1 rounded-full bg-gradient-to-r from-brand-orange to-brand-pink text-[10px] font-bold text-white uppercase tracking-wider shadow-lg">
                  Popular Choice
                </div>
              )}

              <div>
                {/* Icon */}
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 text-brand-orange flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-gradient-to-tr group-hover:from-brand-orange group-hover:to-brand-pink group-hover:text-white transition-all duration-300">
                  {getIcon(service.icon)}
                </div>

                <h3 className="font-syne font-bold text-xl text-white mb-3 group-hover:text-brand-cyan transition-colors flex items-center gap-2">
                  {service.title}
                </h3>

                <p className="text-xs text-gray-400 leading-relaxed mb-6">
                  {service.shortDesc}
                </p>

                {/* Core Features List */}
                <div className="space-y-2 mb-6">
                  {service.features.slice(0, 3).map((feat, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-gray-300">
                      <Check className="w-3.5 h-3.5 text-brand-cyan shrink-0" />
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
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-white group-hover:text-brand-orange transition-colors">
                  Explore scope <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Expandable Service Detail Modal / Drawer */}
      {selectedService && (
        <ServiceDetailModal
          service={selectedService}
          onClose={() => setSelectedService(null)}
          onRequest={(goal) => {
            setSelectedService(null);
            onOpenProjectModalWithService(goal);
          }}
        />
      )}
    </section>
  );
};

interface ServiceDetailModalProps {
  service: ServiceItem;
  onClose: () => void;
  onRequest: (goal?: string) => void;
}

const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({ service, onClose, onRequest }) => {
  const dialogRef = useModalA11y(true, onClose);

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-y-auto bg-black/85 p-4 backdrop-blur-xl animate-fade-in sm:p-6"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="service-modal-title"
        tabIndex={-1}
        className="glass-panel relative my-auto w-full max-w-2xl rounded-3xl border border-white/20 p-6 shadow-2xl animate-scale-in sm:p-8"
      >
            <button
          type="button"
          onClick={() => {
            soundManager.playClick();
            onClose();
          }}
          aria-label="Close service details"
          className="absolute right-5 top-5 rounded-full bg-white/10 p-2 text-gray-300 transition-colors hover:bg-white/20 hover:text-white"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>

        <div className="mb-6 flex items-center gap-4 pr-10">
          <div className="h-14 w-14 shrink-0 rounded-2xl bg-gradient-to-tr from-brand-orange via-brand-pink to-brand-cyan p-0.5">
            <div className="flex h-full w-full items-center justify-center rounded-[14px] bg-ink-panel text-brand-orange">
              {getIcon(service.icon)}
            </div>
          </div>
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-brand-orange">
              Service
            </span>
            <h3
              id="service-modal-title"
              className="font-syne text-2xl font-extrabold text-white sm:text-3xl"
            >
              {service.title}
            </h3>
          </div>
        </div>

        <p className="mb-6 text-sm font-light leading-relaxed text-gray-300">{service.fullDesc}</p>

        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="glass-card rounded-2xl border border-white/10 p-4">
            <div className="mb-1 flex items-center gap-2 font-mono text-xs text-gray-400">
              <Clock className="h-4 w-4 text-brand-cyan" aria-hidden="true" />
              TYPICAL TIMELINE
            </div>
            <p className="font-syne text-base font-bold text-white">{service.typicalTimeline}</p>
          </div>

          <div className="glass-card rounded-2xl border border-white/10 p-4">
            <div className="mb-1 flex items-center gap-2 font-mono text-xs text-gray-400">
              <BarChart3 className="h-4 w-4 text-emerald-400" aria-hidden="true" />
              TYPICAL OUTCOME
            </div>
            <p className="font-syne text-base font-bold text-emerald-400">{service.expectedRoi}</p>
          </div>
        </div>

        <div className="mb-8">
          <h4 className="mb-3 font-syne text-sm font-bold uppercase tracking-wider text-white">
            What you get
          </h4>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {service.deliverables.map((item) => (
              <div
                key={item}
                className="flex items-center gap-2.5 rounded-xl border border-white/5 bg-white/[0.03] p-2.5 text-xs text-gray-200"
              >
                <CheckCircle2 className="h-4 w-4 shrink-0 text-brand-orange" aria-hidden="true" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => {
              soundManager.playClick();
              onRequest(serviceToGoal(service.id));
            }}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-brand-orange via-brand-pink to-brand-cyan py-3.5 text-sm font-bold text-white transition-all hover:shadow-lg sm:flex-1"
          >
            <span>Request a proposal</span>
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-full border border-white/10 bg-white/5 px-6 py-3.5 text-sm font-medium text-gray-300 hover:bg-white/10 hover:text-white sm:w-auto"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
