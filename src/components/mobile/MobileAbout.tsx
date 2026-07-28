import React from "react";
import { Sparkles, Zap, Shield, Target } from "lucide-react";
import { useReveal } from "../../hooks/useReveal";
import { STATS_DATA } from "../../data/vmavixData";
import { SectionHeading } from "./SectionHeading";

const PILLARS = [
  { icon: Sparkles, title: "Considered design", copy: "A visual system built for your brand, not a template.", tint: "rgba(255,94,58,0.3)" },
  { icon: Zap, title: "Engineered speed", copy: "Fast on real devices and real networks, not just on a demo.", tint: "rgba(255,42,133,0.3)" },
  { icon: Shield, title: "Built on trust", copy: "Clear scope, weekly progress, and code you fully own.", tint: "rgba(157,78,221,0.3)" },
  { icon: Target, title: "Conversion focus", copy: "Every layout decision traced back to a business goal.", tint: "rgba(0,242,254,0.3)" },
];

export const MobileAbout: React.FC = () => {
  const pillarsRef = useReveal<HTMLDivElement>({ variant: "stagger" });
  const statsRef = useReveal<HTMLDivElement>({ variant: "curtain" });

  return (
    <section id="about" className="relative overflow-hidden px-5 py-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-[-30%] top-10 h-[320px] w-[min(110vw,400px)] rounded-full bg-[radial-gradient(circle,rgba(255,94,58,0.15),transparent_70%)] blur-[70px]"
      />

      <SectionHeading
        eyebrow="Who we are"
        title="A studio that treats"
        highlight="craft seriously."
        copy="VMAVIX is a compact team of designers and engineers. You work directly with the people building your product — no account managers in between."
        variant="rotate-in"
      />

      <div ref={pillarsRef} className="flex flex-col gap-3">
        {PILLARS.map(({ icon: Icon, title, copy, tint }) => (
          <div key={title} className="card-float flex items-start gap-4 p-5">
            <span
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/12 bg-white/[0.06]"
              style={{ boxShadow: `0 0 20px -8px ${tint}` }}
            >
              <Icon className="h-5 w-5 text-white" aria-hidden="true" />
            </span>
            <div>
              <h3 className="font-syne text-[15px] font-bold text-white">{title}</h3>
              <p className="mt-1 text-[13px] leading-relaxed text-white/55">{copy}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Stats band */}
      <div
        ref={statsRef}
        className="card-float mt-5 grid grid-cols-2 gap-y-6 border-glow p-6"
      >
        {STATS_DATA.map((s) => (
          <div key={s.label} className="text-center">
            <span className="block font-syne text-[1.65rem] font-extrabold text-gradient-aurora">
              {s.value}
            </span>
            <span className="mt-1 block text-[11px] font-semibold leading-tight text-white/75">
              {s.label}
            </span>
            <span className="mt-0.5 block font-mono text-[9px] leading-tight text-white/35">
              {s.subtext}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};
