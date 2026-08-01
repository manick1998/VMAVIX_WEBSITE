import React, { useState } from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { TESTIMONIALS } from '../../data/vmavixData';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { soundManager } from '../../utils/audio';

export const Testimonials: React.FC = () => {
  const revealRef = useScrollReveal<HTMLDivElement>();
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    soundManager.playClick();
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const prevTestimonial = () => {
    soundManager.playClick();
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const current = TESTIMONIALS[currentIndex];

  return (
    <section id="testimonials" className="py-28 relative overflow-hidden bg-[#07070B]">
      {/* Glow Mesh */}
      <div className="absolute top-1/2 left-1/3 w-[min(95vw,500px)] h-[500px] bg-gradient-to-tr from-brand-pink/15 via-brand-purple/10 to-transparent rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-brand-orange font-mono text-xs uppercase tracking-widest mb-4">
            CLIENT ENDORSEMENTS
          </div>

          <h2 className="font-syne font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white">
            Trusted By <span className="text-gradient-aurora">Visionary Founders.</span>
          </h2>
        </div>

        {/* Featured Main Testimonial Card */}
        <div ref={revealRef} className="reveal mx-auto max-w-4xl">
          <div className="glass-panel rounded-3xl p-8 sm:p-12 border border-white/20 shadow-2xl relative overflow-hidden">
            <Quote className="absolute top-6 right-8 w-24 h-24 text-white/5 pointer-events-none" />

            <div className="flex items-center gap-1 mb-6">
              {[...Array(current.rating ?? 5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              ))}
            </div>

            <p className="font-syne font-bold text-xl sm:text-2xl md:text-3xl text-white leading-relaxed mb-8">
              "{current.quote}"
            </p>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-6 border-t border-white/10">
              <div className="flex items-center gap-4">
                <img
                  src={current.avatar}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  width={56}
                  height={56}
                  className="h-14 w-14 rounded-full border-2 border-brand-orange/50 object-cover"
                />
                <div>
                  <h4 className="font-syne font-bold text-lg text-white">{current.author}</h4>
                  <p className="text-xs text-gray-400">{current.role} • <span className="text-gray-200">{current.company}</span></p>
                </div>
              </div>

              {/* Metric Tag */}
              <div className="px-4 py-2 rounded-xl bg-gradient-to-r from-brand-orange/10 to-brand-pink/10 border border-brand-orange/30 text-brand-orange font-mono text-xs font-bold">
                {current.highlight}
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between mt-8">
            <div className="flex items-center gap-2">
              {TESTIMONIALS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    soundManager.playClick();
                    setCurrentIndex(idx);
                  }}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentIndex === idx ? 'w-8 bg-gradient-to-r from-brand-orange to-brand-pink' : 'w-2 bg-white/20'
                  }`}
                />
              ))}
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
              onClick={prevTestimonial}
              aria-label="Previous testimonial"
                className="p-3 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-white transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
              onClick={nextTestimonial}
              aria-label="Next testimonial"
                className="p-3 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-white transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
