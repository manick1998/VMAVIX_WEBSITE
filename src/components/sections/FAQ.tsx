import React, { useState } from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { FAQ_ITEMS } from '../../data/vmavixData';
import { ChevronDown, Search, HelpCircle } from 'lucide-react';
import { soundManager } from '../../utils/audio';

export const FAQ: React.FC = () => {
  const revealRef = useScrollReveal<HTMLDivElement>();
  const [openId, setOpenId] = useState<string | null>('faq-1');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const categories = ['All', 'General', 'Process & Timeline', 'Pricing', 'Technology & AI'];

  const filteredFaqs = FAQ_ITEMS.filter((faq) => {
    const matchesCategory = activeCategory === 'All' || faq.category === activeCategory;
    const matchesSearch =
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleFaq = (id: string) => {
    soundManager.playClick();
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-28 relative overflow-hidden bg-[#07070B]">
      {/* Background Lights */}
      <div className="absolute top-1/2 left-0 w-[min(95vw,500px)] h-[500px] bg-gradient-to-r from-brand-cyan/15 via-brand-purple/10 to-transparent rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-brand-orange font-mono text-xs uppercase tracking-widest mb-4">
            <HelpCircle className="w-4 h-4 text-brand-orange" />
            FREQUENTLY ASKED QUESTIONS
          </div>

          <h2 className="font-syne font-extrabold text-3xl sm:text-5xl text-white">
            Everything You Need <span className="text-gradient-aurora">To Know.</span>
          </h2>
        </div>

        {/* Search Bar & Category Filters */}
        <div className="space-y-4 mb-10">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search questions or keywords..."
              className="w-full bg-white/5 border border-white/15 rounded-full pl-11 pr-4 py-3 text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none focus:border-brand-orange transition-colors"
            />
          </div>

          <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  soundManager.playClick();
                  setActiveCategory(cat);
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

        {/* Accordion Stack */}
        <div ref={revealRef} className="reveal space-y-4">
          {filteredFaqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="glass-panel rounded-2xl border border-white/10 overflow-hidden transition-all duration-300"
              >
                <button
                  type="button"
                onClick={() => toggleFaq(faq.id)}
                aria-expanded={openId === faq.id}
                aria-controls={`faq-panel-${faq.id}`}
                id={`faq-button-${faq.id}`}
                  onMouseEnter={() => soundManager.playHover()}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 focus:outline-none"
                >
                  <span className="font-syne font-bold text-base sm:text-lg text-white">
                    {faq.question}
                  </span>
                  <div className={`p-2 rounded-full bg-white/5 text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180 bg-brand-orange text-white' : ''}`}>
                    <ChevronDown className="h-4 w-4" aria-hidden="true" />
                  </div>
                </button>

                {isOpen && (
                  <div
                    id={`faq-panel-${faq.id}`}
                    role="region"
                    aria-labelledby={`faq-button-${faq.id}`}
                    className="animate-fade-in border-t border-white/5 px-6 pb-6 pt-0 text-xs font-light leading-relaxed text-gray-300 sm:text-sm"
                  >
                    <p className="mt-4">{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
