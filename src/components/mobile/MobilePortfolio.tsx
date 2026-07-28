import React, { useCallback, useRef, useState } from "react";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { PORTFOLIO_DATA } from "../../data/vmavixData";
import type { ProjectItem } from "../../types";
import { useReveal } from "../../hooks/useReveal";
import { soundManager } from "../../utils/audio";
import { SectionHeading } from "./SectionHeading";

interface MobilePortfolioProps {
  onOpenProject: (project: ProjectItem) => void;
}

/**
 * Full-bleed, snap-scrolling project cards.
 * Replaces the desktop grid entirely on mobile.
 */
export const MobilePortfolio: React.FC<MobilePortfolioProps> = ({ onOpenProject }) => {
  const [index, setIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const revealRef = useReveal<HTMLDivElement>({ variant: "slide-right" });

  const onScroll = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.clientWidth * 0.84 + 14;
    setIndex(Math.round(el.scrollLeft / card));
  }, []);

  const goTo = (i: number) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.clientWidth * 0.84 + 14;
    el.scrollTo({ left: i * card, behavior: "smooth" });
  };

  return (
    <section id="portfolio" className="relative overflow-hidden py-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[340px] w-[min(120vw,520px)] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(0,242,254,0.13),transparent_70%)] blur-[70px]"
      />

      <div className="px-5">
        <SectionHeading
          eyebrow="Selected work"
          title="Projects we've"
          highlight="shipped."
          copy="Swipe through recent builds. Tap any card for the full case study."
          variant="slide-left"
        />
      </div>

      <div
        ref={revealRef}
        className="scrollbar-none snap-x-mandatory flex gap-3.5 overflow-x-auto px-5 pb-2"
        onScroll={onScroll}
      >
        {PORTFOLIO_DATA.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => {
              soundManager.playClick();
              onOpenProject(p);
            }}
            aria-label={`Open case study: ${p.title}`}
            className="snap-item card-float group relative w-[84%] shrink-0 overflow-hidden p-0 text-left active:scale-[0.985]"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-[26px]">
              <img
                src={p.heroImage}
                alt={p.title}
                loading="lazy"
                decoding="async"
                width={640}
                height={800}
                className="h-full w-full object-cover transition-transform duration-700 group-active:scale-105"
              />

              {/* Cinematic scrim */}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-[linear-gradient(to_top,rgba(5,5,8,0.97)_2%,rgba(5,5,8,0.65)_32%,transparent_62%)]"
              />

              <span className="absolute left-4 top-4 rounded-full border border-white/18 bg-black/55 px-3 py-1.5 font-mono text-[10px] tracking-wide text-brand-cyan backdrop-blur-md">
                {p.category} · {p.year}
              </span>

              <div className="absolute inset-x-4 bottom-4">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/50">
                  {p.client}
                </span>
                <h3 className="mt-1.5 font-syne text-[19px] font-bold leading-tight text-white">
                  {p.title}
                </h3>

                <div className="mt-3 flex flex-wrap gap-1.5">
                  {p.metrics.slice(0, 2).map((m) => (
                    <span
                      key={m.label}
                      className="rounded-full border border-white/12 bg-white/[0.08] px-2.5 py-1 text-[10px] font-semibold text-white/85 backdrop-blur-sm"
                    >
                      <span className="text-emerald-400">{m.value}</span>{" "}
                      <span className="text-white/50">{m.label}</span>
                    </span>
                  ))}
                </div>

                <span className="mt-3.5 inline-flex items-center gap-1.5 text-[12px] font-bold text-white">
                  <Sparkles className="h-3.5 w-3.5 text-brand-orange" aria-hidden="true" />
                  View case study
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
              </div>
            </div>
          </button>
        ))}

        <div className="w-1 shrink-0" aria-hidden="true" />
      </div>

      {/* Progress dots */}
      <div className="mt-5 flex items-center justify-center gap-2">
        {PORTFOLIO_DATA.map((p, i) => (
          <button
            key={p.id}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Go to project ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-400 ${
              i === index
                ? "w-7 bg-[linear-gradient(90deg,#ff5e3a,#00f2fe)]"
                : "w-1.5 bg-white/22"
            }`}
          />
        ))}
      </div>
    </section>
  );
};
