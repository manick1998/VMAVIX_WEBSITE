import React from "react";
import {
  Cpu, Zap, Code, Layers, Server, Terminal, PenTool, Atom,
  Globe, Layout, Box, Cloud, FileCode, Palette,
} from "lucide-react";
import { TECH_STACK, INDUSTRIES_DATA } from "../../data/vmavixData";
import { useReveal } from "../../hooks/useReveal";
import { SectionHeading } from "./SectionHeading";

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  FileCode, Palette, Code, Atom, Globe, Server, Terminal,
  Layers, Box, Layout, Figma: PenTool, Cloud, Zap, Cpu,
};

const IND_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Landmark: Box, Gem: Palette, Cpu, Rocket: Zap, Activity: Layers, Building: Layout,
};

/** Tech stack marquee + industries — combined for a tighter mobile flow. */
export const MobileStack: React.FC = () => {
  const gridRef = useReveal<HTMLDivElement>({ variant: "stagger" });
  const indRef = useReveal<HTMLDivElement>({ variant: "slide-left" });

  const half = TECH_STACK.slice(0, 7);
  const rest = TECH_STACK.slice(7);

  return (
    <>
      <section id="tech-stack" className="relative overflow-hidden py-20">
        <div className="px-5">
          <SectionHeading
            eyebrow="Technology"
            title="Tools we build"
            highlight="with."
            copy="Chosen for longevity and performance, not novelty."
            variant="blur-in"
          />
        </div>

        {/* Two counter-scrolling marquees */}
        <div className="space-y-3 overflow-hidden">
          {[half, rest].map((row, r) => (
            <div
              key={r}
              className="flex w-max gap-3 animate-marquee"
              style={{
                animationDirection: r === 1 ? "reverse" : "normal",
                animationDuration: r === 1 ? "34s" : "28s",
              }}
            >
              {[...row, ...row].map((t, i) => {
                const Icon = ICONS[t.iconName] ?? Cpu;
                return (
                  <div
                    key={`${t.id}-${i}`}
                    className="card-float flex w-[164px] shrink-0 items-center gap-3 p-3.5"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05]">
                      <Icon className="h-[18px] w-[18px] text-brand-cyan" />
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-[12px] font-bold text-white">{t.name}</p>
                      <p className="font-mono text-[9px] text-white/40">{t.experienceYears} yrs</p>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        <div ref={gridRef} className="mt-6 grid grid-cols-3 gap-2.5 px-5">
          {[
            { label: "Frontend", value: "React · Next" },
            { label: "Backend", value: "Node · Python" },
            { label: "Cloud", value: "AWS · Vercel" },
          ].map((c) => (
            <div key={c.label} className="card-float p-3 text-center">
              <p className="font-mono text-[9px] uppercase tracking-wide text-white/35">
                {c.label}
              </p>
              <p className="mt-1 text-[11px] font-bold leading-tight text-white">{c.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Industries */}
      <section id="industries" className="relative overflow-hidden px-5 py-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-0 h-[300px] w-[min(120vw,460px)] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,94,58,0.12),transparent_70%)] blur-[70px]"
        />

        <SectionHeading
          eyebrow="Sectors"
          title="Industries we"
          highlight="know well."
          variant="rotate-in"
        />

        <div ref={indRef} className="flex flex-col gap-2.5">
          {INDUSTRIES_DATA.map((ind) => {
            const Icon = IND_ICONS[ind.icon] ?? Cpu;
            return (
              <div key={ind.id} className="card-float flex items-center gap-4 p-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.09] to-transparent">
                  <Icon className="h-5 w-5 text-brand-pink" />
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="font-syne text-[14px] font-bold text-white">{ind.name}</h3>
                  <p className="mt-0.5 truncate text-[11.5px] text-white/50">{ind.tagline}</p>
                </div>
                <span className="shrink-0 rounded-full bg-white/[0.05] px-2.5 py-1 font-mono text-[9px] font-semibold text-brand-cyan">
                  {ind.impactMetric.split(" ")[0]}
                </span>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};
