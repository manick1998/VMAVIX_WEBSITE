import React from "react";
import { ArrowUpRight, Play, Sparkles, Zap, Gauge, Code2 } from "lucide-react";
import { soundManager } from "../../utils/audio";

interface HeroProps {
  onOpenProjectModal: () => void;
}

const LOGO_WEBP = `${import.meta.env.BASE_URL}brand/mavixlogo.webp`;
const LOGO_PNG = `${import.meta.env.BASE_URL}brand/mavixlogo.png`;

const CAPABILITIES = [
  { icon: Sparkles, label: "Design", copy: "Brand identity & interface design" },
  { icon: Code2, label: "Develop", copy: "React, Next.js & headless commerce" },
  { icon: Gauge, label: "Grow", copy: "SEO, paid growth & conversion work" },
];

export const Hero: React.FC<HeroProps> = ({ onOpenProjectModal }) => {
  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden pb-16 pt-28 sm:pt-32"
    >
      {/* Aurora mesh */}
      <div className="pointer-events-none absolute left-1/2 top-1/4 h-[420px] w-[min(94vw,1000px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-brand-orange/25 via-brand-pink/20 to-brand-cyan/25 blur-[140px] animate-aurora-1" />
      <div className="pointer-events-none absolute right-4 top-1/3 h-[360px] w-[min(80vw,500px)] rounded-full bg-gradient-to-bl from-brand-cyan/20 via-brand-purple/20 to-brand-pink/15 blur-[130px] animate-aurora-2" />
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-30" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-12">
        {/* Brand lockup */}
        <div className="mb-8 flex justify-center sm:mb-10">
          <picture>
            <source srcSet={LOGO_WEBP} type="image/webp" />
            <img
              src={LOGO_PNG}
              alt="VMAVIX — Design, Develop, Grow"
              width={560}
              height={297}
              fetchPriority="high"
              decoding="sync"
              className="w-[min(86vw,560px)] drop-shadow-[0_0_60px_rgba(255,94,58,0.28)]"
            />
          </picture>
        </div>

        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 flex justify-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 text-xs font-medium tracking-wide text-gray-200 backdrop-blur-xl sm:text-sm">
              <span className="h-2 w-2 rounded-full bg-gradient-to-r from-brand-orange to-brand-pink" />
              Digital design, engineering &amp; growth studio
            </span>
          </div>

          <h1 className="mb-6 font-syne text-[2rem] font-extrabold leading-[1.06] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            Websites and brands
            <span className="mt-1 block text-gradient-aurora">built to perform.</span>
          </h1>

          <p className="mx-auto mb-9 max-w-2xl text-sm font-light leading-relaxed text-gray-300 sm:text-lg lg:text-xl">
            We design and build premium websites, e-commerce platforms, brand identities and
            AI-powered products — engineered for speed, search visibility and conversion.
          </p>

          <div className="mb-14 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <button
              type="button"
              onClick={() => {
                soundManager.playClick();
                onOpenProjectModal();
              }}
              onMouseEnter={() => soundManager.playHover()}
              className="group flex w-full items-center justify-center gap-3 rounded-full bg-gradient-to-r from-brand-orange via-brand-pink to-brand-cyan px-8 py-4 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_40px_rgba(255,94,58,0.55)] sm:w-auto sm:text-base"
            >
              <span>Start your project</span>
              <ArrowUpRight
                className="h-5 w-5 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </button>

            <a
              href="#portfolio"
              onClick={() => soundManager.playClick()}
              onMouseEnter={() => soundManager.playHover()}
              className="group flex w-full items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-8 py-4 text-sm font-semibold text-gray-200 backdrop-blur-xl transition-all duration-300 hover:border-white/30 hover:bg-white/10 hover:text-white sm:w-auto sm:text-base"
            >
              <Play className="h-4 w-4 text-brand-cyan" aria-hidden="true" />
              <span>See our work</span>
            </a>
          </div>
        </div>

        {/* Capability cards */}
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-3">
          {CAPABILITIES.map(({ icon: Icon, label, copy }) => (
            <div
              key={label}
              className="glass-card rounded-2xl border border-white/10 p-5 text-left transition-colors hover:border-brand-orange/40"
            >
              <div className="mb-3 flex items-center gap-2">
                <Icon className="h-4 w-4 text-brand-orange" aria-hidden="true" />
                <span className="font-mono text-[11px] uppercase tracking-widest text-brand-orange">
                  {label}
                </span>
              </div>
              <p className="text-xs leading-relaxed text-gray-300">{copy}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Capability marquee */}
      <div className="mt-14 overflow-hidden border-y border-white/10 bg-white/[0.02] py-4 backdrop-blur-md sm:mt-20">
        <div className="flex w-max animate-marquee items-center gap-10 whitespace-nowrap sm:gap-14">
          {[
            "WEB DESIGN",
            "WEB DEVELOPMENT",
            "E-COMMERCE",
            "BRAND IDENTITY",
            "LOGO DESIGN",
            "SEO",
            "DIGITAL MARKETING",
            "AI SOLUTIONS",
            "WEB DESIGN",
            "WEB DEVELOPMENT",
            "E-COMMERCE",
            "BRAND IDENTITY",
            "LOGO DESIGN",
            "SEO",
            "DIGITAL MARKETING",
            "AI SOLUTIONS",
          ].map((item, idx) => (
            <span key={idx} className="flex items-center gap-3" aria-hidden={idx > 7}>
              <Zap className="h-3 w-3 text-brand-orange/80" aria-hidden="true" />
              <span className="font-syne text-xs font-bold tracking-widest text-gray-400 sm:text-sm">
                {item}
              </span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};
