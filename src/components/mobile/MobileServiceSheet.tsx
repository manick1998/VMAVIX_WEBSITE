import React from "react";
import { CheckCircle2, Clock, BarChart3, ArrowUpRight, MessageCircle } from "lucide-react";
import type { ServiceItem } from "../../types";
import { serviceToGoal } from "../../data/vmavixData";
import { MobileSheet } from "./MobileSheet";
import { TouchButton } from "../ui/TouchButton";
import { quickWhatsAppUrl } from "../../config/contact";

interface MobileServiceSheetProps {
  service: ServiceItem | null;
  onClose: () => void;
  onRequest: (goal?: string) => void;
}

export const MobileServiceSheet: React.FC<MobileServiceSheetProps> = ({
  service,
  onClose,
  onRequest,
}) => {
  if (!service) return null;

  return (
    <MobileSheet
      open
      onClose={onClose}
      title={service.title}
      labelledById="svc-sheet-title"
    >
      <p className="text-[13.5px] font-light leading-relaxed text-white/62">
        {service.fullDesc}
      </p>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <div className="card-float p-4">
          <div className="mb-1 flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-wider text-white/40">
            <Clock className="h-3 w-3 text-brand-cyan" aria-hidden="true" />
            Timeline
          </div>
          <p className="font-syne text-[14px] font-bold text-white">
            {service.typicalTimeline}
          </p>
        </div>
        <div className="card-float p-4">
          <div className="mb-1 flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-wider text-white/40">
            <BarChart3 className="h-3 w-3 text-emerald-400" aria-hidden="true" />
            Outcome
          </div>
          <p className="font-syne text-[14px] font-bold text-emerald-400">
            {service.expectedRoi}
          </p>
        </div>
      </div>

      <h3 className="mb-3 mt-6 font-mono text-[10px] font-bold uppercase tracking-wider text-white/55">
        What&apos;s included
      </h3>
      <div className="flex flex-col gap-2">
        {service.features.map((f) => (
          <div
            key={f}
            className="flex items-start gap-2.5 rounded-2xl border border-white/8 bg-white/[0.03] p-3.5 text-[12.5px] text-white/75"
          >
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-cyan" aria-hidden="true" />
            <span>{f}</span>
          </div>
        ))}
      </div>

      <h3 className="mb-3 mt-6 font-mono text-[10px] font-bold uppercase tracking-wider text-white/55">
        Deliverables
      </h3>
      <div className="flex flex-wrap gap-2">
        {service.deliverables.map((d) => (
          <span
            key={d}
            className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 text-[11px] text-white/70"
          >
            {d}
          </span>
        ))}
      </div>

      <div className="mt-7 flex flex-col gap-2.5">
        <TouchButton
          variant="primary"
          fullWidth
          onClick={() => onRequest(serviceToGoal(service.id))}
        >
          Request a proposal
          <ArrowUpRight className="h-[18px] w-[18px]" aria-hidden="true" />
        </TouchButton>

        <TouchButton
          variant="whatsapp"
          fullWidth
          href={quickWhatsAppUrl(`Hi VMAVIX, I'm interested in ${service.title}.`)}
          external
        >
          <MessageCircle className="h-[18px] w-[18px]" aria-hidden="true" />
          Ask on WhatsApp
        </TouchButton>
      </div>
    </MobileSheet>
  );
};
