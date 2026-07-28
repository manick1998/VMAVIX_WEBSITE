import React from "react";
import { Check, X, Sparkles, Zap, TrendingUp, Lock, Cpu, Award } from "lucide-react";
import { useReveal } from "../../hooks/useReveal";
import { SectionHeading } from "./SectionHeading";

const HIGHLIGHTS = [
  { icon: Sparkles, label: "Bespoke design", copy: "No themes, no page builders." },
  { icon: Zap, label: "2–6 week sprints", copy: "Weekly live staging previews." },
  { icon: TrendingUp, label: "Built for search", copy: "Core Web Vitals from day one." },
  { icon: Award, label: "Senior team only", copy: "Direct line to your engineer." },
  { icon: Lock, label: "Security first", copy: "TLS, hardened headers, audits." },
  { icon: Cpu, label: "AI where it helps", copy: "Practical automation, not hype." },
];

const COMPARISON = [
  { feature: "Bespoke build", us: true, agency: false, template: false },
  { feature: "Senior engineers", us: true, agency: false, template: false },
  { feature: "95+ Lighthouse target", us: true, agency: "Varies", template: false },
  { feature: "Launch timeline", us: "2–6 wks", agency: "3–6 mo", template: "Instant" },
  { feature: "You own the code", us: true, agency: "Sometimes", template: false },
];

const Cell: React.FC<{ value: boolean | string; strong?: boolean }> = ({ value, strong }) => {
  if (value === true)
    return (
      <span className="mx-auto flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/18">
        <Check className="h-3 w-3 text-emerald-400" aria-hidden="true" />
        <span className="sr-only">Yes</span>
      </span>
    );
  if (value === false)
    return (
      <span className="mx-auto flex h-5 w-5 items-center justify-center rounded-full bg-white/[0.05]">
        <X className="h-3 w-3 text-white/25" aria-hidden="true" />
        <span className="sr-only">No</span>
      </span>
    );
  return (
    <span className={`text-[10px] font-semibold ${strong ? "text-white" : "text-white/45"}`}>
      {value}
    </span>
  );
};

export const MobileWhyUs: React.FC = () => {
  const gridRef = useReveal<HTMLDivElement>({ variant: "stagger" });
  const tableRef = useReveal<HTMLDivElement>({ variant: "fade-up" });

  return (
    <section id="why-us" className="relative overflow-hidden px-5 py-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-28%] top-1/4 h-[340px] w-[min(110vw,420px)] rounded-full bg-[radial-gradient(circle,rgba(0,242,254,0.14),transparent_70%)] blur-[70px]"
      />

      <SectionHeading
        eyebrow="Why VMAVIX"
        title="The difference is"
        highlight="in the detail."
        variant="slide-right"
      />

      <div ref={gridRef} className="grid grid-cols-2 gap-3">
        {HIGHLIGHTS.map(({ icon: Icon, label, copy }) => (
          <div key={label} className="card-float p-4">
            <Icon className="mb-3 h-5 w-5 text-brand-orange" aria-hidden="true" />
            <h3 className="font-syne text-[13px] font-bold leading-snug text-white">{label}</h3>
            <p className="mt-1 text-[11.5px] leading-relaxed text-white/50">{copy}</p>
          </div>
        ))}
      </div>

      {/* Comparison */}
      <div ref={tableRef} className="card-float mt-5 overflow-hidden p-5">
        <div className="mb-4 grid grid-cols-[1fr_auto_auto_auto] items-center gap-x-3 border-b border-white/8 pb-3">
          <span className="font-mono text-[9px] uppercase tracking-wider text-white/35">
            Compare
          </span>
          <span className="w-12 text-center font-syne text-[10px] font-extrabold text-gradient-aurora">
            VMAVIX
          </span>
          <span className="w-12 text-center font-mono text-[9px] uppercase text-white/35">
            Agency
          </span>
          <span className="w-12 text-center font-mono text-[9px] uppercase text-white/35">
            Template
          </span>
        </div>

        <div className="flex flex-col gap-3">
          {COMPARISON.map((row) => (
            <div
              key={row.feature}
              className="grid grid-cols-[1fr_auto_auto_auto] items-center gap-x-3"
            >
              <span className="text-[12px] font-medium leading-snug text-white/72">
                {row.feature}
              </span>
              <span className="w-12 text-center">
                <Cell value={row.us} strong />
              </span>
              <span className="w-12 text-center">
                <Cell value={row.agency} />
              </span>
              <span className="w-12 text-center">
                <Cell value={row.template} />
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
