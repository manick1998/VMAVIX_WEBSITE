import React, { useCallback, useRef, useState } from "react";
import { Star, Quote } from "lucide-react";
import { TESTIMONIALS } from "../../data/vmavixData";
import { useReveal } from "../../hooks/useReveal";
import { SectionHeading } from "./SectionHeading";

/** Swipeable glass testimonial cards with animated ratings. */
export const MobileTestimonials: React.FC = () => {
  const [index, setIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const revealRef = useReveal<HTMLDivElement>({ variant: "scale-in" });

  const onScroll = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.clientWidth * 0.88 + 14;
    setIndex(Math.round(el.scrollLeft / card));
  }, []);

  return (
    <section id="testimonials" className="relative overflow-hidden py-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[-25%] top-1/3 h-[340px] w-[min(110vw,420px)] rounded-full bg-[radial-gradient(circle,rgba(157,78,221,0.16),transparent_70%)] blur-[70px]"
      />

      <div className="px-5">
        <SectionHeading
          eyebrow="Client feedback"
          title="What partners"
          highlight="say."
          align="center"
          variant="blur-in"
        />
      </div>

      <div
        ref={(node) => {
          trackRef.current = node;
          revealRef.current = node;
        }}
        onScroll={onScroll}
        className="scrollbar-none snap-x-mandatory flex gap-3.5 overflow-x-auto px-5 pb-2"
      >
        {TESTIMONIALS.map((t) => (
          <article
            key={t.id}
            className="snap-item card-float relative w-[88%] shrink-0 p-6"
          >
            <Quote
              className="absolute right-5 top-5 h-8 w-8 text-white/[0.07]"
              aria-hidden="true"
            />

            <div className="mb-4 flex gap-1" aria-label={`Rated ${t.rating} out of 5`}>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-3.5 w-3.5 transition-all duration-500 ${
                    i < t.rating
                      ? "fill-brand-orange text-brand-orange"
                      : "text-white/15"
                  }`}
                  style={{ transitionDelay: `${i * 70}ms` }}
                  aria-hidden="true"
                />
              ))}
            </div>

            <p className="text-[14px] font-light leading-relaxed text-white/78">
              &ldquo;{t.quote}&rdquo;
            </p>

            <div className="mt-5 inline-flex rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3 py-1.5">
              <span className="font-mono text-[10px] font-semibold text-emerald-400">
                {t.metrics}
              </span>
            </div>

            <div className="mt-5 flex items-center gap-3 border-t border-white/8 pt-4">
              <img
                src={t.avatar}
                alt=""
                loading="lazy"
                decoding="async"
                width={44}
                height={44}
                className="h-11 w-11 rounded-full border-2 border-brand-orange/40 object-cover"
              />
              <div className="min-w-0">
                <p className="truncate text-[13px] font-bold text-white">{t.author}</p>
                <p className="truncate text-[11px] text-white/45">
                  {t.role} · {t.company}
                </p>
              </div>
            </div>
          </article>
        ))}
        <div className="w-1 shrink-0" aria-hidden="true" />
      </div>

      <div className="mt-5 flex items-center justify-center gap-2">
        {TESTIMONIALS.map((t, i) => (
          <span
            key={t.id}
            aria-hidden="true"
            className={`h-1.5 rounded-full transition-all duration-400 ${
              i === index ? "w-7 bg-[linear-gradient(90deg,#ff5e3a,#00f2fe)]" : "w-1.5 bg-white/22"
            }`}
          />
        ))}
      </div>
    </section>
  );
};
