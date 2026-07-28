import React, { useState } from "react";
import {
  Palette, Code2, ShoppingBag, Building2, Sparkles, Compass, Layers,
  Search, TrendingUp, Target, Share2, Zap, Cpu, ChevronRight, ArrowUpRight, Clock,
} from "lucide-react";
import { SERVICES_DATA, serviceToGoal } from "../../data/vmavixData";
import type { ServiceItem } from "../../types";
import { useReveal } from "../../hooks/useReveal";
import { soundManager } from "../../utils/audio";
import { SectionHeading } from "./SectionHeading";

interface MobileServicesProps {
  onOpenProjectModalWithService: (goal?: string) => void;
  onOpenService: (service: ServiceItem) => void;
}

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Palette, Code2, ShoppingBag, Building2, Sparkles, Compass, Layers,
  Search, TrendingUp, Target, Share2, Zap, Cpu,
};

const CATEGORIES = [
  { id: "all", label: "All" },
  { id: "web", label: "Web" },
  { id: "design", label: "Design" },
  { id: "growth", label: "Growth" },
  { id: "ai", label: "AI" },
] as const;

const ACCENTS: Record<string, { from: string; glow: string }> = {
  web: { from: "from-brand-cyan/22", glow: "rgba(0,242,254,0.34)" },
  design: { from: "from-brand-pink/22", glow: "rgba(255,42,133,0.34)" },
  growth: { from: "from-brand-orange/22", glow: "rgba(255,94,58,0.34)" },
  ai: { from: "from-brand-purple/22", glow: "rgba(157,78,221,0.34)" },
};

export const MobileServices: React.FC<MobileServicesProps> = ({
  onOpenProjectModalWithService,
  onOpenService,
}) => {
  const [cat, setCat] = useState<string>("all");
  const listRef = useReveal<HTMLDivElement>({ variant: "stagger" });

  const list = SERVICES_DATA.filter((s) => cat === "all" || s.category === cat);

  return (
    <section id="services" className="relative overflow-hidden px-5 py-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-30%] top-1/4 h-[380px] w-[min(110vw,440px)] rounded-full bg-[radial-gradient(circle,rgba(255,42,133,0.14),transparent_70%)] blur-[70px]"
      />

      <SectionHeading
        eyebrow="Capabilities"
        title="Everything you need,"
        highlight="under one roof."
        copy="Fourteen specialist services across design, engineering, growth and AI."
      />

      {/* Category rail */}
      <div className="scrollbar-none -mx-5 mb-6 flex gap-2 overflow-x-auto px-5 pb-1">
        {CATEGORIES.map((c) => {
          const active = cat === c.id;
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => {
                soundManager.playClick();
                setCat(c.id);
              }}
              className={`shrink-0 rounded-full px-4 py-2.5 text-[13px] font-semibold transition-all duration-300 active:scale-95 ${
                active
                  ? "bg-[linear-gradient(120deg,#ff5e3a,#ff2a85)] text-white shadow-[0_6px_20px_-6px_rgba(255,60,120,0.8)]"
                  : "border border-white/10 bg-white/[0.04] text-white/60"
              }`}
            >
              {c.label}
            </button>
          );
        })}
      </div>

      <div ref={listRef} className="flex flex-col gap-3.5">
        {list.map((s) => {
          const Icon = ICONS[s.icon] ?? Sparkles;
          const accent = ACCENTS[s.category] ?? ACCENTS.web;

          return (
            <button
              key={s.id}
              type="button"
              onClick={() => {
                soundManager.playClick();
                onOpenService(s);
              }}
              aria-label={`View ${s.title} details`}
              className="card-float group relative w-full overflow-hidden p-5 text-left active:scale-[0.985]"
            >
              {/* Accent wash */}
              <span
                aria-hidden="true"
                className={`pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-gradient-to-br ${accent.from} to-transparent blur-2xl`}
              />

              {s.popular && (
                <span className="absolute right-4 top-4 rounded-full bg-[linear-gradient(120deg,#ff5e3a,#ff2a85)] px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-white">
                  Popular
                </span>
              )}

              <div className="relative flex items-start gap-4">
                <span
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/12 bg-white/[0.06] transition-transform duration-500 group-active:scale-110"
                  style={{ boxShadow: `0 0 22px -8px ${accent.glow}` }}
                >
                  <Icon className="h-[22px] w-[22px] text-white" />
                </span>

                <div className="min-w-0 flex-1 pr-6">
                  <h3 className="font-syne text-[17px] font-bold leading-snug text-white">
                    {s.title}
                  </h3>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-white/55">
                    {s.shortDesc}
                  </p>

                  <div className="mt-3.5 flex flex-wrap items-center gap-x-4 gap-y-1.5">
                    <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wide text-white/40">
                      <Clock className="h-3 w-3" aria-hidden="true" />
                      {s.typicalTimeline}
                    </span>
                    <span className="font-mono text-[10px] font-semibold text-emerald-400/90">
                      {s.expectedRoi}
                    </span>
                  </div>
                </div>

                <ChevronRight
                  className="absolute right-0 top-1/2 h-5 w-5 -translate-y-1/2 text-white/25 transition-transform duration-300 group-active:translate-x-1"
                  aria-hidden="true"
                />
              </div>
            </button>
          );
        })}
      </div>

      <button
        type="button"
        onClick={() => {
          soundManager.playClick();
          onOpenProjectModalWithService(serviceToGoal(list[0]?.id ?? "website-design"));
        }}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl border border-white/12 bg-white/[0.04] py-4 text-sm font-bold text-white/80 active:scale-[0.97]"
      >
        Discuss your requirements
        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
      </button>
    </section>
  );
};
