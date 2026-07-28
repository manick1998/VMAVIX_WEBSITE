import React, { useState } from 'react';
import { TECH_STACK } from '../../data/vmavixData';
import { Cpu, Zap, Code, Layers, Server, Terminal, PenTool, Atom, Globe, Layout, Box, Cloud, FileCode, Palette } from 'lucide-react';
import { soundManager } from '../../utils/audio';

export const TechStack: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'frontend' | 'backend' | 'design' | 'cloud-ai'>('all');

  const getTechIcon = (iconName: string) => {
    switch (iconName) {
      case 'FileCode': return <FileCode className="w-6 h-6" />;
      case 'Palette': return <Palette className="w-6 h-6" />;
      case 'Code': return <Code className="w-6 h-6" />;
      case 'Atom': return <Atom className="w-6 h-6" />;
      case 'Globe': return <Globe className="w-6 h-6" />;
      case 'Server': return <Server className="w-6 h-6" />;
      case 'Terminal': return <Terminal className="w-6 h-6" />;
      case 'Layers': return <Layers className="w-6 h-6" />;
      case 'Box': return <Box className="w-6 h-6" />;
      case 'Layout': return <Layout className="w-6 h-6" />;
      case 'Figma': return <PenTool className="w-6 h-6" />;
      case 'Cloud': return <Cloud className="w-6 h-6" />;
      case 'Zap': return <Zap className="w-6 h-6" />;
      case 'Cpu': return <Cpu className="w-6 h-6" />;
      default: return <Cpu className="w-6 h-6" />;
    }
  };

  const filteredTech = TECH_STACK.filter((tech) => {
    if (activeCategory === 'all') return true;
    return tech.category === activeCategory;
  });

  return (
    <section id="tech-stack" className="py-28 relative overflow-hidden bg-[#050508]">
      {/* Aurora Ambient Mesh */}
      <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-gradient-to-l from-cyan-600/15 via-purple-600/10 to-transparent rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-[2px] bg-gradient-to-r from-orange-500 to-pink-500" />
              <span className="font-mono text-xs uppercase tracking-widest text-orange-400 font-semibold">
                TECHNOLOGY ECOSYSTEM
              </span>
            </div>
            <h2 className="font-syne font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white">
              Built On <span className="text-gradient-aurora">Cutting-Edge Tech.</span>
            </h2>
          </div>

          <p className="text-sm sm:text-base text-gray-400 max-w-md font-light leading-relaxed">
            We leverage modern frameworks, cloud edge computing, and artificial intelligence to build applications that load instantly and scale infinitely.
          </p>
        </div>

        {/* Filter Categories */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-12 scrollbar-none">
          {[
            { id: 'all', label: 'All Stack Tools' },
            { id: 'frontend', label: 'Frontend & UI' },
            { id: 'backend', label: 'Backend & APIs' },
            { id: 'design', label: 'Design Systems' },
            { id: 'cloud-ai', label: 'Cloud Infrastructure & AI' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                soundManager.playClick();
                setActiveCategory(cat.id as any);
              }}
              onMouseEnter={() => soundManager.playHover()}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-300 ${
                activeCategory === cat.id
                  ? 'bg-gradient-to-r from-orange-500 via-pink-500 to-cyan-500 text-white shadow-lg'
                  : 'bg-white/5 border border-white/10 text-gray-300 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Floating Stack Nodes Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {filteredTech.map((tech) => (
            <div
              key={tech.id}
              onMouseEnter={() => soundManager.playHover()}
              className="glass-panel-interactive rounded-2xl p-5 border border-white/10 text-center flex flex-col items-center justify-between group cursor-pointer relative"
            >
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 text-orange-400 flex items-center justify-center mb-3 group-hover:scale-110 group-hover:bg-gradient-to-tr group-hover:from-orange-500 group-hover:to-pink-500 group-hover:text-white transition-all duration-300">
                {getTechIcon(tech.iconName)}
              </div>

              <h4 className="font-syne font-bold text-sm text-white mb-1 group-hover:text-cyan-300 transition-colors">
                {tech.name}
              </h4>

              <span className="font-mono text-[10px] text-gray-400 block mb-2">
                {tech.experienceYears} Mastery
              </span>

              {/* Performance Score Bar */}
              <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden mt-auto">
                <div
                  className="h-full bg-gradient-to-r from-orange-500 to-cyan-400"
                  style={{ width: `${tech.perfScore}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
