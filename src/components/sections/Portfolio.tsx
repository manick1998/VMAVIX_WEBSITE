import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../../data/vmavixData';
import { ProjectItem } from '../../types';
import { ArrowUpRight, Sparkles, X, ChevronRight, ChevronLeft, CheckCircle2 } from 'lucide-react';
import { soundManager } from '../../utils/audio';

export const Portfolio: React.FC = () => {
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
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-to-tr from-orange-600/10 via-pink-600/10 to-cyan-500/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-[2px] bg-gradient-to-r from-orange-500 to-pink-500" />
              <span className="font-mono text-xs uppercase tracking-widest text-orange-400 font-semibold">
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
                    ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-lg'
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
              onClick={prevSlide}
              className="p-3 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-white transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              className="p-3 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-white transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Portfolio Featured Cards Carousel Showcase */}
        {filteredProjects.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
            {/* Project Cover Image */}
            <div
              onClick={() => {
                soundManager.playClick();
                setSelectedProject(filteredProjects[sliderIndex]);
              }}
              onMouseEnter={() => soundManager.playHover()}
              className="lg:col-span-7 glass-panel rounded-3xl overflow-hidden relative group cursor-pointer border border-white/15 aspect-[16/10] shadow-2xl"
            >
              <img
                src={filteredProjects[sliderIndex].heroImage}
                alt={filteredProjects[sliderIndex].title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

              {/* Top Category Tag */}
              <div className="absolute top-6 left-6 px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-xs font-mono text-cyan-300">
                {filteredProjects[sliderIndex].category} • {filteredProjects[sliderIndex].year}
              </div>

              {/* Hover Trigger Overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-sm">
                <div className="px-6 py-3 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 text-white font-bold text-xs flex items-center gap-2 shadow-2xl transform translate-y-4 group-hover:translate-y-0 transition-transform">
                  <Sparkles className="w-4 h-4" /> Deep Dive Case Study
                </div>
              </div>
            </div>

            {/* Project Details Panel */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="font-mono text-xs text-orange-400 uppercase tracking-widest block mb-1">
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
                    <span className="font-syne font-extrabold text-lg sm:text-xl text-gradient-primary block">
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
                className="inline-flex items-center gap-2 text-xs font-bold text-orange-400 hover:text-white transition-colors group"
              >
                <span>Read Full Case Study Details</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </div>
          </div>
        )}

        {/* Portfolio Secondary Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => {
                soundManager.playClick();
                setSelectedProject(project);
              }}
              onMouseEnter={() => soundManager.playHover()}
              className="glass-panel-interactive rounded-3xl overflow-hidden border border-white/10 group cursor-pointer flex flex-col justify-between"
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                <img
                  src={project.heroImage}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-mono text-cyan-300 border border-white/15">
                  {project.category}
                </span>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-syne font-bold text-lg text-white mb-2 group-hover:text-cyan-300 transition-colors flex items-center justify-between">
                    <span>{project.title}</span>
                    <ArrowUpRight className="w-4 h-4 text-gray-500 group-hover:text-cyan-300" />
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
            </div>
          ))}
        </div>
      </div>

      {/* Case Study Full Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-[9999] bg-black/85 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-300">
          <div className="glass-panel max-w-4xl w-full rounded-3xl p-6 sm:p-10 border border-white/20 shadow-2xl relative my-auto">
            {/* Close Button */}
            <button
              onClick={() => {
                soundManager.playClick();
                setSelectedProject(null);
              }}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="font-mono text-xs text-orange-400 uppercase tracking-widest block mb-2">
              CASE STUDY: {selectedProject.client} ({selectedProject.year})
            </span>

            <h2 className="font-syne font-extrabold text-2xl sm:text-4xl text-white mb-6">
              {selectedProject.title}
            </h2>

            {/* Gallery / Hero Image */}
            <div className="rounded-2xl overflow-hidden aspect-[16/9] mb-8 border border-white/15">
              <img
                src={selectedProject.heroImage}
                alt={selectedProject.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Metrics Ribbon */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              {selectedProject.metrics.map((m, idx) => (
                <div key={idx} className="glass-card p-4 rounded-2xl border border-white/10 text-center">
                  <span className="font-syne font-extrabold text-2xl text-gradient-primary block">
                    {m.value}
                  </span>
                  <span className="text-xs font-mono text-gray-400 uppercase block mt-1">
                    {m.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Challenge & Solution */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 text-xs sm:text-sm">
              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10">
                <h4 className="font-syne font-bold text-white mb-2 text-base text-orange-400">The Challenge</h4>
                <p className="text-gray-300 leading-relaxed font-light">{selectedProject.challenge}</p>
              </div>

              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10">
                <h4 className="font-syne font-bold text-white mb-2 text-base text-cyan-400">The VMAVIX Solution</h4>
                <p className="text-gray-300 leading-relaxed font-light">{selectedProject.solution}</p>
              </div>
            </div>

            {/* Deliverables */}
            <div className="mb-8">
              <h4 className="font-syne font-bold text-xs uppercase tracking-wider text-gray-400 mb-3">
                DELIVERED ASSETS
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedProject.deliverables.map((item, i) => (
                  <span key={i} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-white">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setSelectedProject(null)}
                className="px-8 py-3 rounded-full font-bold text-xs text-white bg-gradient-to-r from-orange-500 to-pink-500"
              >
                Close Case Study
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
