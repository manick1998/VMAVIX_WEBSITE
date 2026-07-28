import React, { useState } from 'react';
import { useModalA11y } from '../../hooks/useModalA11y';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { PORTFOLIO_DATA } from '../../data/vmavixData';
import { ProjectItem } from '../../types';
import { ArrowUpRight, Sparkles, X, ChevronRight, ChevronLeft, CheckCircle2 } from 'lucide-react';
import { soundManager } from '../../utils/audio';

export const Portfolio: React.FC = () => {
  const revealRef = useScrollReveal<HTMLDivElement>();
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [sliderIndex, setSliderIndex] = useState(0);

  const categories = ['All', 'Web App', 'E-Commerce', 'AI Platform', 'Branding'];

  const filteredProjects = PORTFOLIO_DATA.filter((p) => {
    if (activeCategory === 'All') return true;
    return p.category === activeCategory;
  });

  const nextSlide = () => {
    soundManager.playClick();
    setSliderIndex((prev) => (prev + 1) % filteredProjects.length);
  };

  const prevSlide = () => {
    soundManager.playClick();
    setSliderIndex((prev) => (prev - 1 + filteredProjects.length) % filteredProjects.length);
  };

  return (
    <section id="portfolio" className="py-28 relative overflow-hidden bg-[#050508]">
      {/* Glow Mesh */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(95vw,800px)] h-[500px] bg-gradient-to-tr from-brand-orange/10 via-brand-pink/10 to-brand-cyan/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-[2px] bg-gradient-to-r from-brand-orange to-brand-pink" />
              <span className="font-mono text-xs uppercase tracking-widest text-brand-orange font-semibold">
                FEATURED WORK & CASE STUDIES
              </span>
            </div>
            <h2 className="font-syne font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white">
              Flagship <span className="text-gradient-aurora">Creations.</span>
            </h2>
          </div>

          {/* Category Filters */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  soundManager.playClick();
                  setActiveCategory(cat);
                  setSliderIndex(0);
                }}
                onMouseEnter={() => soundManager.playHover()}
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-gradient-to-r from-brand-orange to-brand-pink text-white shadow-lg'
                    : 'bg-white/5 text-gray-400 hover:text-white border border-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Slider Controls */}
        <div className="flex items-center justify-between mb-6">
          <span className="font-mono text-xs text-gray-400">
            SHOWING {sliderIndex + 1} OF {filteredProjects.length} CASE STUDIES
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={prevSlide}
              aria-label="Previous case study"
              className="rounded-full border border-white/10 bg-white/5 p-3 text-white transition-all hover:bg-white/15"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={nextSlide}
              aria-label="Next case study"
              className="rounded-full border border-white/10 bg-white/5 p-3 text-white transition-all hover:bg-white/15"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Portfolio Featured Cards Carousel Showcase */}
        {filteredProjects.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
            {/* Project Cover Image */}
            <button
              type="button"
              onClick={() => {
                soundManager.playClick();
                setSelectedProject(filteredProjects[sliderIndex]);
              }}
              onMouseEnter={() => soundManager.playHover()}
              aria-label={`Open case study: ${filteredProjects[sliderIndex].title}`}
              className="glass-panel group relative aspect-[16/10] overflow-hidden rounded-3xl border border-white/15 shadow-2xl lg:col-span-7"
            >
              <img
                src={filteredProjects[sliderIndex].heroImage}
                alt={filteredProjects[sliderIndex].title}
                loading="lazy"
                decoding="async"
                width={1200}
                height={750}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

              {/* Top Category Tag */}
              <div className="absolute top-6 left-6 px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-xs font-mono text-brand-cyan">
                {filteredProjects[sliderIndex].category} • {filteredProjects[sliderIndex].year}
              </div>

              {/* Hover Trigger Overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-sm">
                <div className="px-6 py-3 rounded-full bg-gradient-to-r from-brand-orange to-brand-pink text-white font-bold text-xs flex items-center gap-2 shadow-2xl transform translate-y-4 group-hover:translate-y-0 transition-transform">
                  <Sparkles className="h-4 w-4" aria-hidden="true" /> View case study
                </div>
              </div>
            </button>

            {/* Project Details Panel */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="font-mono text-xs text-brand-orange uppercase tracking-widest block mb-1">
                  CLIENT: {filteredProjects[sliderIndex].client}
                </span>
                <h3 className="font-syne font-extrabold text-2xl sm:text-4xl text-white mb-3">
                  {filteredProjects[sliderIndex].title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-light mb-6">
                  {filteredProjects[sliderIndex].summary}
                </p>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-3 gap-3">
                {filteredProjects[sliderIndex].metrics.map((m, idx) => (
                  <div key={idx} className="glass-card p-3 rounded-2xl border border-white/10 text-center">
                    <span className="font-syne font-extrabold text-lg sm:text-xl text-gradient-aurora block">
                      {m.value}
                    </span>
                    <span className="text-[10px] font-mono text-gray-400 uppercase block mt-1 leading-tight">
                      {m.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Tech Stack Pills */}
              <div className="flex flex-wrap gap-2">
                {filteredProjects[sliderIndex].tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 rounded-full text-[11px] font-mono bg-white/5 border border-white/10 text-gray-300">
                    {tag}
                  </span>
                ))}
              </div>

              <button
                onClick={() => {
                  soundManager.playClick();
                  setSelectedProject(filteredProjects[sliderIndex]);
                }}
                className="inline-flex items-center gap-2 text-xs font-bold text-brand-orange hover:text-white transition-colors group"
              >
                <span>Read Full Case Study Details</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </div>
          </div>
        )}

        {/* Portfolio Secondary Grid Cards */}
        <div ref={revealRef} className="reveal grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <button
              key={project.id}
              type="button"
              onClick={() => {
                soundManager.playClick();
                setSelectedProject(project);
              }}
              onMouseEnter={() => soundManager.playHover()}
              aria-label={`Open case study: ${project.title}`}
              className="glass-panel-interactive group flex flex-col justify-between overflow-hidden rounded-3xl border border-white/10 text-left"
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                <img
                  src={project.heroImage}
                  alt={project.title}
                  loading="lazy"
                  decoding="async"
                  width={800}
                  height={500}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-mono text-brand-cyan border border-white/15">
                  {project.category}
                </span>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-syne font-bold text-lg text-white mb-2 group-hover:text-brand-cyan transition-colors flex items-center justify-between">
                    <span>{project.title}</span>
                    <ArrowUpRight className="w-4 h-4 text-gray-500 group-hover:text-brand-cyan" />
                  </h4>
                  <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed mb-4">
                    {project.summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-emerald-400">
                  <span>{project.metrics[0].label}: {project.metrics[0].value}</span>
                  <span className="text-gray-400">{project.year}</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Case Study Full Modal */}
      {selectedProject && (
        <CaseStudyModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </section>
  );
};

interface CaseStudyModalProps {
  project: ProjectItem;
  onClose: () => void;
}

const CaseStudyModal: React.FC<CaseStudyModalProps> = ({ project, onClose }) => {
  const dialogRef = useModalA11y(true, onClose);

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-y-auto bg-black/85 p-4 backdrop-blur-2xl animate-fade-in sm:p-6"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="case-study-title"
        tabIndex={-1}
        className="glass-panel relative my-auto w-full max-w-4xl rounded-3xl border border-white/20 p-6 shadow-2xl animate-scale-in sm:p-10"
      >
        <button
          type="button"
          onClick={() => {
            soundManager.playClick();
            onClose();
          }}
          aria-label="Close case study"
          className="absolute right-5 top-5 rounded-full bg-white/10 p-2 text-gray-300 transition-colors hover:bg-white/20 hover:text-white"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>

        <span className="mb-2 block pr-10 font-mono text-xs uppercase tracking-widest text-brand-orange">
          Case study: {project.client} ({project.year})
        </span>

        <h2 id="case-study-title" className="mb-6 font-syne text-2xl font-extrabold text-white sm:text-4xl">
          {project.title}
        </h2>

        <div className="mb-8 aspect-[16/9] overflow-hidden rounded-2xl border border-white/15">
          <img
            src={project.heroImage}
            alt={project.title}
            loading="lazy"
            decoding="async"
            width={1200}
            height={675}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {project.metrics.map((m) => (
            <div key={m.label} className="glass-card rounded-2xl border border-white/10 p-4 text-center">
              <span className="block font-syne text-2xl font-extrabold text-gradient-aurora">
                {m.value}
              </span>
              <span className="mt-1 block font-mono text-xs uppercase text-gray-400">{m.label}</span>
            </div>
          ))}
        </div>

        <div className="mb-8 grid grid-cols-1 gap-6 text-xs sm:text-sm md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
            <h3 className="mb-2 font-syne text-base font-bold text-brand-orange">The challenge</h3>
            <p className="font-light leading-relaxed text-gray-300">{project.challenge}</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
            <h3 className="mb-2 font-syne text-base font-bold text-brand-cyan">Our solution</h3>
            <p className="font-light leading-relaxed text-gray-300">{project.solution}</p>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="mb-3 font-syne text-xs font-bold uppercase tracking-wider text-gray-400">
            Delivered
          </h3>
          <div className="flex flex-wrap gap-2">
            {project.deliverables.map((item) => (
              <span
                key={item}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white"
              >
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" aria-hidden="true" />
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="mb-6 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 font-mono text-[11px] text-gray-400"
            >
              {tag}
            </span>
          ))}
        </div>

        <button
          type="button"
          onClick={onClose}
          className="w-full rounded-full border border-white/15 bg-white/10 py-3.5 text-sm font-bold text-white hover:bg-white/20"
        >
          Close case study
        </button>
      </div>
    </div>
  );
};
