import React, { useCallback, useEffect, useState } from "react";
import { Home, LayoutGrid, Briefcase, Sparkles, X, Phone } from "lucide-react";
import { WhatsAppIcon } from "../ui/WhatsAppIcon";
import { soundManager } from "../../utils/audio";
import { NAV_LINKS } from "../../data/vmavixData";
import { quickWhatsAppUrl, PHONE_E164, PHONE_DISPLAY } from "../../config/contact";

interface MobileDockProps {
  activeSection: string;
  onOpenProjectModal: () => void;
}

const PRIMARY = [
  { id: "hero", label: "Home", icon: Home },
  { id: "services", label: "Services", icon: LayoutGrid },
  { id: "portfolio", label: "Work", icon: Briefcase },
] as const;

/**
 * Floating glass bottom dock — the mobile navigation.
 *
 * Deliberately not a hamburger: three thumb-reachable tabs, a raised
 * primary action, and a radial sheet for everything else.
 */
export const MobileDock: React.FC<MobileDockProps> = ({
  activeSection,
  onOpenProjectModal,
}) => {
  const [sheetOpen, setSheetOpen] = useState(false);
  const [hidden, setHidden] = useState(false);

  // Hide the dock while scrolling down, reveal on scroll up — like a native app.
  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        if (y > lastY + 12 && y > 320) setHidden(true);
        else if (y < lastY - 8) setHidden(false);
        lastY = y;
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!sheetOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setSheetOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [sheetOpen]);

  const go = useCallback((href: string) => {
    soundManager.playClick();
    setSheetOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <>
      {/* Expanded sheet */}
      {sheetOpen && (
        <div
          className="fixed inset-0 z-[70] bg-black/70 backdrop-blur-md animate-fade-in lg:hidden"
          onClick={() => setSheetOpen(false)}
          aria-hidden="true"
        />
      )}

      <div
        id="mobile-nav-sheet"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={`fixed inset-x-3 z-[80] lg:hidden ${
          sheetOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
        style={{ bottom: "calc(env(safe-area-inset-bottom, 0px) + 6.25rem)" }}
      >
        <div
          className={`glass-panel rounded-[28px] border-white/12 p-4 transition-all duration-400 ${
            sheetOpen
              ? "translate-y-0 scale-100 opacity-100"
              : "pointer-events-none translate-y-6 scale-95 opacity-0"
          }`}
        >
          <div className="mb-3 flex items-center justify-between px-1">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/45">
              Explore
            </span>
            <button
              type="button"
              onClick={() => setSheetOpen(false)}
              aria-label="Close menu"
              className="rounded-full bg-white/8 p-1.5 text-white/60 active:scale-90"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {NAV_LINKS.map((link) => {
              const active = activeSection === link.href.slice(1);
              return (
                <button
                  key={link.href}
                  type="button"
                  onClick={() => go(link.href)}
                  className={`rounded-2xl px-4 py-3.5 text-left text-sm font-semibold transition-all active:scale-[0.96] ${
                    active
                      ? "bg-gradient-to-r from-brand-orange/25 to-brand-pink/20 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]"
                      : "bg-white/[0.05] text-white/70"
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </div>

          <div className="mt-3 grid grid-cols-2 gap-2 border-t border-white/8 pt-3">
            <a
              href={quickWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundManager.playClick()}
              className="flex items-center justify-center gap-2 rounded-2xl bg-[#25D366]/15 px-4 py-3.5 text-sm font-bold text-[#25D366] active:scale-[0.96]"
            >
              <WhatsAppIcon className="h-4 w-4" aria-hidden="true" />
              WhatsApp
            </a>
            <a
              href={`tel:${PHONE_E164}`}
              onClick={() => soundManager.playClick()}
              aria-label={`Call ${PHONE_DISPLAY}`}
              className="flex items-center justify-center gap-2 rounded-2xl bg-white/[0.06] px-4 py-3.5 text-sm font-bold text-white/80 active:scale-[0.96]"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              Call
            </a>
          </div>
        </div>
      </div>

      {/* The dock */}
      <nav
        aria-label="Mobile navigation"
        className={`fixed inset-x-0 z-[75] flex justify-center px-4 transition-transform duration-500 lg:hidden ${
          hidden && !sheetOpen ? "translate-y-[160%]" : "translate-y-0"
        }`}
        style={{ bottom: "calc(env(safe-area-inset-bottom, 0px) + 0.7rem)" }}
      >
        <div className="glass-panel flex w-full max-w-md items-center justify-around rounded-[26px] border-white/12 px-2 py-2 shadow-[0_18px_50px_-12px_rgba(0,0,0,0.95)]">
          {PRIMARY.map(({ id, label, icon: Icon }) => {
            const active = activeSection === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => go(`#${id}`)}
                aria-label={label}
                aria-current={active ? "page" : undefined}
                className="relative flex min-w-[62px] flex-col items-center gap-1 rounded-2xl px-2 py-2 transition-transform active:scale-90"
              >
                {active && (
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/12 to-transparent"
                  />
                )}
                <Icon
                  className={`relative h-[19px] w-[19px] transition-colors ${
                    active ? "text-brand-cyan" : "text-white/55"
                  }`}
                  aria-hidden="true"
                />
                <span
                  className={`relative text-[10px] font-semibold tracking-wide transition-colors ${
                    active ? "text-white" : "text-white/50"
                  }`}
                >
                  {label}
                </span>
                {active && (
                  <span
                    aria-hidden="true"
                    className="absolute -bottom-0.5 h-1 w-1 rounded-full bg-brand-cyan shadow-[0_0_8px_#00f2fe]"
                  />
                )}
              </button>
            );
          })}

          {/* Raised primary action */}
          <button
            type="button"
            onClick={() => {
              soundManager.playClick();
              onOpenProjectModal();
            }}
            aria-label="Start a project"
            className="relative -mt-6 flex h-[58px] w-[58px] shrink-0 items-center justify-center rounded-full bg-[linear-gradient(135deg,#ff5e3a,#ff2a85,#9d4edd)] shadow-[0_10px_30px_-6px_rgba(255,60,120,0.85)] transition-transform active:scale-90"
          >
            <span
              aria-hidden="true"
              className="absolute inset-0 animate-breathe rounded-full bg-[linear-gradient(135deg,#ff5e3a,#00f2fe)] opacity-45 blur-md"
            />
            <Sparkles className="relative h-6 w-6 text-white" aria-hidden="true" />
          </button>

          <button
            type="button"
            onClick={() => {
              soundManager.playClick();
              setSheetOpen((v) => !v);
            }}
            aria-label={sheetOpen ? "Close menu" : "Open menu"}
            aria-expanded={sheetOpen}
            aria-controls="mobile-nav-sheet"
            className="relative flex min-w-[62px] flex-col items-center gap-1 rounded-2xl px-2 py-2 transition-transform active:scale-90"
          >
            <span className="relative flex h-[19px] w-[19px] flex-col items-center justify-center gap-[3px]">
              <span
                className={`block h-[2px] w-4 rounded-full bg-white/70 transition-all duration-300 ${
                  sheetOpen ? "translate-y-[5px] rotate-45" : ""
                }`}
              />
              <span
                className={`block h-[2px] w-4 rounded-full bg-white/70 transition-all duration-300 ${
                  sheetOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block h-[2px] w-4 rounded-full bg-white/70 transition-all duration-300 ${
                  sheetOpen ? "-translate-y-[5px] -rotate-45" : ""
                }`}
              />
            </span>
            <span className="text-[10px] font-semibold tracking-wide text-white/50">More</span>
          </button>
        </div>
      </nav>
    </>
  );
};
