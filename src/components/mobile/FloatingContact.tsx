import React, { useEffect, useState } from "react";
import { MessageCircle, Phone, X, Plus, Sparkles } from "lucide-react";
import { soundManager } from "../../utils/audio";
import { quickWhatsAppUrl, PHONE_E164, PHONE_DISPLAY } from "../../config/contact";

interface FloatingContactProps {
  onOpenProjectModal: () => void;
}

/**
 * Floating contact cluster.
 *
 * On mobile it sits above the dock; on desktop it's a bottom-right FAB.
 * Collapsed it's a single WhatsApp button; expanding fans out Call and
 * Get-a-quote actions.
 */
export const FloatingContact: React.FC<FloatingContactProps> = ({ onOpenProjectModal }) => {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  // Appear after the visitor has engaged a little.
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setVisible(window.scrollY > 420);
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div
      className={`fixed right-4 z-[76] flex flex-col items-end gap-2.5 transition-all duration-500 sm:right-6 ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-8 opacity-0"
      }`}
      style={{
        bottom: "calc(env(safe-area-inset-bottom, 0px) + 6rem)",
      }}
    >
      {/* Fanned actions */}
      <div
        className={`flex flex-col items-end gap-2.5 transition-all duration-350 ${
          open ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <button
          type="button"
          onClick={() => {
            soundManager.playClick();
            setOpen(false);
            onOpenProjectModal();
          }}
          className={`flex items-center gap-2.5 rounded-full border border-white/15 bg-ink-panel/90 py-3 pl-4 pr-5 text-xs font-bold text-white shadow-[0_10px_28px_-8px_rgba(0,0,0,0.9)] backdrop-blur-xl transition-all duration-300 active:scale-95 ${
            open ? "translate-y-0 scale-100 opacity-100" : "translate-y-4 scale-90 opacity-0"
          }`}
          style={{ transitionDelay: open ? "80ms" : "0ms" }}
        >
          <Sparkles className="h-4 w-4 text-brand-orange" aria-hidden="true" />
          Get a quote
        </button>

        <a
          href={`tel:${PHONE_E164}`}
          onClick={() => {
            soundManager.playClick();
            setOpen(false);
          }}
          aria-label={`Call ${PHONE_DISPLAY}`}
          className={`flex items-center gap-2.5 rounded-full border border-white/15 bg-ink-panel/90 py-3 pl-4 pr-5 text-xs font-bold text-white shadow-[0_10px_28px_-8px_rgba(0,0,0,0.9)] backdrop-blur-xl transition-all duration-300 active:scale-95 ${
            open ? "translate-y-0 scale-100 opacity-100" : "translate-y-4 scale-90 opacity-0"
          }`}
          style={{ transitionDelay: open ? "40ms" : "0ms" }}
        >
          <Phone className="h-4 w-4 text-brand-cyan" aria-hidden="true" />
          Call us
        </a>
      </div>

      <div className="flex items-center gap-2.5">
        {/* Expand toggle */}
        <button
          type="button"
          onClick={() => {
            soundManager.playClick();
            setOpen((v) => !v);
          }}
          aria-expanded={open}
          aria-label={open ? "Close contact options" : "More contact options"}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-ink-panel/90 text-white/70 shadow-[0_8px_22px_-8px_rgba(0,0,0,0.9)] backdrop-blur-xl transition-transform duration-300 active:scale-90"
        >
          {open ? (
            <X className="h-[18px] w-[18px]" aria-hidden="true" />
          ) : (
            <Plus className="h-[18px] w-[18px]" aria-hidden="true" />
          )}
        </button>

        {/* Primary WhatsApp CTA */}
        <a
          href={quickWhatsAppUrl()}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => soundManager.playClick()}
          aria-label="Chat with VMAVIX on WhatsApp"
          className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[linear-gradient(135deg,#25D366,#128C7E)] shadow-[0_12px_32px_-8px_rgba(37,211,102,0.85)] transition-transform duration-300 active:scale-90"
        >
          <span
            aria-hidden="true"
            className="absolute inset-0 animate-ping rounded-full bg-[#25D366]/35"
            style={{ animationDuration: "2.8s" }}
          />
          <MessageCircle className="relative h-7 w-7 text-white" aria-hidden="true" />
        </a>
      </div>
    </div>
  );
};
