import React from "react";
import { ArrowUpRight, Phone, Mail, Clock, ShieldCheck } from "lucide-react";
import { WhatsAppIcon } from "../ui/WhatsAppIcon";
import { useReveal } from "../../hooks/useReveal";
import { TouchButton } from "../ui/TouchButton";
import { quickWhatsAppUrl, PHONE_E164, PHONE_DISPLAY, EMAIL } from "../../config/contact";

interface MobileCTAProps {
  onOpenProjectModal: () => void;
}

export const MobileCTA: React.FC<MobileCTAProps> = ({ onOpenProjectModal }) => {
  const ref = useReveal<HTMLDivElement>({ variant: "scale-in" });

  return (
    <section className="relative overflow-hidden px-5 py-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[min(130vw,540px)] -translate-x-1/2 -translate-y-1/2 animate-pulse-glow rounded-full bg-[radial-gradient(circle,rgba(255,60,120,0.24),transparent_68%)] blur-[70px]"
      />

      <div ref={ref} className="card-float border-glow relative overflow-hidden p-7 text-center">
        <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-brand-cyan">
          Ready when you are
        </span>

        <h2 className="mt-4 font-syne text-[1.85rem] font-extrabold leading-[1.12] text-white">
          Let&apos;s build something
          <span className="mt-1 block text-gradient-aurora">worth sharing.</span>
        </h2>

        <p className="mx-auto mt-4 max-w-[19rem] text-[13.5px] font-light leading-relaxed text-white/58">
          Message us on WhatsApp for the fastest reply, or send a brief and
          we&apos;ll come back within one business day.
        </p>

        <div className="mt-7 flex flex-col gap-3">
          <TouchButton variant="whatsapp" fullWidth href={quickWhatsAppUrl()} external>
            <WhatsAppIcon className="h-[18px] w-[18px]" aria-hidden="true" />
            WhatsApp us now
          </TouchButton>

          <TouchButton variant="primary" fullWidth onClick={onOpenProjectModal}>
            Send a project brief
            <ArrowUpRight className="h-[18px] w-[18px]" aria-hidden="true" />
          </TouchButton>

          <div className="grid grid-cols-2 gap-3">
            <TouchButton variant="glass" href={`tel:${PHONE_E164}`}>
              <Phone className="h-4 w-4 text-brand-cyan" aria-hidden="true" />
              Call
            </TouchButton>
            <TouchButton variant="glass" href={`mailto:${EMAIL}`}>
              <Mail className="h-4 w-4 text-brand-orange" aria-hidden="true" />
              Email
            </TouchButton>
          </div>
        </div>

        <p className="mt-5 font-mono text-[11px] text-white/40">{PHONE_DISPLAY}</p>

        <div className="mt-6 flex items-center justify-center gap-5 border-t border-white/8 pt-5 text-[10px] text-white/45">
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-3 w-3 text-brand-orange" aria-hidden="true" />
            1-day reply
          </span>
          <span className="inline-flex items-center gap-1.5">
            <ShieldCheck className="h-3 w-3 text-emerald-400" aria-hidden="true" />
            NDA on request
          </span>
        </div>
      </div>
    </section>
  );
};
