import React from "react";
import { CheckCircle2, ArrowUpRight } from "lucide-react";
import type { ProjectItem } from "../../types";
import { MobileSheet } from "./MobileSheet";
import { TouchButton } from "../ui/TouchButton";

interface MobileProjectSheetProps {
  project: ProjectItem | null;
  onClose: () => void;
  onRequest: () => void;
}

export const MobileProjectSheet: React.FC<MobileProjectSheetProps> = ({
  project,
  onClose,
  onRequest,
}) => {
  if (!project) return null;

  return (
    <MobileSheet
      open
      onClose={onClose}
      title={project.title}
      labelledById="proj-sheet-title"
    >
      <div className="overflow-hidden rounded-[22px] border border-white/10">
        <img
          src={project.heroImage}
          alt={project.title}
          loading="lazy"
          decoding="async"
          width={720}
          height={450}
          className="aspect-[16/10] w-full object-cover"
        />
      </div>

      <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-brand-orange">
        {project.client} · {project.year}
      </p>

      <p className="mt-3 text-[13.5px] font-light leading-relaxed text-white/62">
        {project.summary}
      </p>

      <div className="mt-5 grid grid-cols-3 gap-2">
        {project.metrics.map((m) => (
          <div key={m.label} className="card-float p-3 text-center">
            <span className="block font-syne text-[15px] font-extrabold text-gradient-aurora">
              {m.value}
            </span>
            <span className="mt-0.5 block text-[9px] leading-tight text-white/45">
              {m.label}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-6 space-y-3">
        <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
          <h3 className="mb-1.5 font-syne text-[13px] font-bold text-brand-orange">
            The challenge
          </h3>
          <p className="text-[12.5px] font-light leading-relaxed text-white/62">
            {project.challenge}
          </p>
        </div>
        <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
          <h3 className="mb-1.5 font-syne text-[13px] font-bold text-brand-cyan">
            Our solution
          </h3>
          <p className="text-[12.5px] font-light leading-relaxed text-white/62">
            {project.solution}
          </p>
        </div>
      </div>

      <h3 className="mb-3 mt-6 font-mono text-[10px] font-bold uppercase tracking-wider text-white/55">
        Delivered
      </h3>
      <div className="flex flex-col gap-2">
        {project.deliverables.map((d) => (
          <div
            key={d}
            className="flex items-center gap-2.5 rounded-2xl border border-white/8 bg-white/[0.03] p-3 text-[12.5px] text-white/75"
          >
            <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" aria-hidden="true" />
            {d}
          </div>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap gap-1.5">
        {project.tags.map((t) => (
          <span
            key={t}
            className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 font-mono text-[10px] text-white/50"
          >
            {t}
          </span>
        ))}
      </div>

      <div className="mt-7">
        <TouchButton variant="primary" fullWidth onClick={onRequest}>
          Start a project like this
          <ArrowUpRight className="h-[18px] w-[18px]" aria-hidden="true" />
        </TouchButton>
      </div>
    </MobileSheet>
  );
};
