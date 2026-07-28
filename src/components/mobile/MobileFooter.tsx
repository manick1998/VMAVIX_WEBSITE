import React from "react";
import { MessageCircle, Phone, Mail, ArrowUp } from "lucide-react";
import { NAV_LINKS } from "../../data/vmavixData";
import { quickWhatsAppUrl, PHONE_E164, EMAIL, PHONE_DISPLAY } from "../../config/contact";
import { soundManager } from "../../utils/audio";

interface MobileFooterProps {
  onOpenLegalModal: (title: string) => void;
}

const LOGO_WEBP = `${import.meta.env.BASE_URL}brand/mavixlogo.webp`;
const LOGO_PNG = `${import.meta.env.BASE_URL}brand/mavixlogo.png`;

export const MobileFooter: React.FC<MobileFooterProps> = ({ onOpenLegalModal }) => {
  return (
    <footer className="relative overflow-hidden border-t border-white/8 bg-[#030305] px-5 pt-14">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-1/2 h-[260px] w-[min(120vw,460px)] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(157,78,221,0.15),transparent_70%)] blur-[70px]"
      />

      <div className="relative flex flex-col items-center text-center">
        <picture>
          <source srcSet={LOGO_WEBP} type="image/webp" />
          <img
            src={LOGO_PNG}
            alt="VMAVIX"
            width={190}
            height={97}
            loading="lazy"
            decoding="async"
            className="w-[190px] drop-shadow-[0_0_28px_rgba(255,94,58,0.24)]"
          />
        </picture>

        <p className="mt-4 max-w-[19rem] text-[12.5px] font-light leading-relaxed text-white/50">
          A digital design, engineering and growth studio building websites and
          products that perform.
        </p>

        {/* Contact rail */}
        <div className="mt-6 flex items-center gap-3">
          <a
            href={quickWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => soundManager.playClick()}
            aria-label="WhatsApp"
            className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#25D366]/25 bg-[#25D366]/12 text-[#25D366] transition-transform active:scale-90"
          >
            <MessageCircle className="h-5 w-5" aria-hidden="true" />
          </a>
          <a
            href={`tel:${PHONE_E164}`}
            onClick={() => soundManager.playClick()}
            aria-label={`Call ${PHONE_DISPLAY}`}
            className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] text-brand-cyan transition-transform active:scale-90"
          >
            <Phone className="h-5 w-5" aria-hidden="true" />
          </a>
          <a
            href={`mailto:${EMAIL}`}
            onClick={() => soundManager.playClick()}
            aria-label="Email us"
            className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] text-brand-orange transition-transform active:scale-90"
          >
            <Mail className="h-5 w-5" aria-hidden="true" />
          </a>
        </div>

        <a
          href={`tel:${PHONE_E164}`}
          className="mt-4 font-mono text-[12px] text-white/45 hover:text-white"
        >
          {PHONE_DISPLAY}
        </a>
      </div>

      <div className="divider-glow my-8" />

      {/* Nav */}
      <nav aria-label="Footer navigation" className="grid grid-cols-2 gap-x-4 gap-y-1">
        {NAV_LINKS.map((l) => (
          <a
            key={l.href}
            href={l.href}
            onClick={() => soundManager.playClick()}
            className="rounded-lg py-2.5 text-[13px] text-white/55 transition-colors active:text-white"
          >
            {l.label}
          </a>
        ))}
      </nav>

      <div className="divider-glow my-8" />

      <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
        {["Privacy Policy", "Terms of Service", "Security"].map((doc) => (
          <button
            key={doc}
            type="button"
            onClick={() => onOpenLegalModal(doc)}
            className="text-[11px] text-white/40 transition-colors active:text-white"
          >
            {doc}
          </button>
        ))}
      </div>

      <p className="mt-5 text-center font-mono text-[10px] text-white/28">
        © {new Date().getFullYear()} VMAVIX · Design • Develop • Grow
      </p>

      <button
        type="button"
        onClick={() => {
          soundManager.playClick();
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        aria-label="Back to top"
        className="mx-auto mt-6 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-white/50 transition-transform active:scale-90"
      >
        <ArrowUp className="h-4 w-4" aria-hidden="true" />
      </button>

      {/* Clearance for the floating dock */}
      <div
        aria-hidden="true"
        style={{ height: "calc(env(safe-area-inset-bottom, 0px) + 6.5rem)" }}
      />
    </footer>
  );
};
