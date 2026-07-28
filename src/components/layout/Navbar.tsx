import React, { useEffect, useState } from "react";
import { Logo } from "../common/Logo";
import { Volume2, VolumeX, Menu, X, Sparkles, ArrowUpRight } from "lucide-react";
import { soundManager } from "../../utils/audio";
import { NAV_LINKS } from "../../data/vmavixData";

interface NavbarProps {
  onOpenProjectModal: () => void;
  activeSection: string;
  isScrolled: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenProjectModal,
  activeSection,
  isScrolled,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  // Close the mobile menu on Escape, and when resizing up to desktop.
  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMobileMenuOpen(false);
    };
    const onResize = () => {
      if (window.innerWidth >= 1024) setIsMobileMenuOpen(false);
    };

    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [isMobileMenuOpen]);

  const toggleSound = () => {
    const muted = soundManager.toggleMute();
    setIsMuted(muted);
    if (!muted) soundManager.playClick();
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-3 sm:px-6 sm:pt-4 lg:px-12">
      <nav
        aria-label="Main navigation"
        className={`mx-auto max-w-7xl rounded-2xl transition-all duration-500 ${
          isScrolled
            ? "glass-panel border-white/15 px-4 py-2.5 shadow-[0_10px_40px_rgba(0,0,0,0.8)] sm:px-6"
            : "bg-transparent px-2 py-3"
        }`}
      >
        <div className="flex items-center justify-between gap-4">
          <a
            href="#hero"
            aria-label="VMAVIX home"
            onMouseEnter={() => soundManager.playHover()}
            className="flex shrink-0 items-center"
          >
            <Logo size="sm" priority />
          </a>

          {/* Desktop links */}
          <div className="hidden items-center gap-0.5 rounded-full border border-white/10 bg-white/[0.03] px-2 py-1.5 backdrop-blur-md lg:flex">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href.slice(1);
              return (
                <a
                  key={link.label}
                  href={link.href}
                  aria-current={isActive ? "true" : undefined}
                  onMouseEnter={() => soundManager.playHover()}
                  onClick={() => soundManager.playClick()}
                  className={`rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-300 ${
                    isActive
                      ? "border border-brand-orange/40 bg-gradient-to-r from-brand-orange/20 to-brand-pink/20 text-white"
                      : "border border-transparent text-gray-300 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </div>

          {/* Right cluster */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={toggleSound}
              aria-pressed={!isMuted}
              aria-label={isMuted ? "Enable interface sound effects" : "Mute interface sound effects"}
              title={isMuted ? "Enable sound" : "Mute sound"}
              className="hidden items-center justify-center rounded-full border border-white/10 bg-white/5 p-2.5 text-gray-300 transition-all duration-300 hover:border-white/30 hover:text-white sm:flex"
            >
              {isMuted ? (
                <VolumeX className="h-4 w-4" aria-hidden="true" />
              ) : (
                <Volume2 className="h-4 w-4 text-brand-cyan" aria-hidden="true" />
              )}
            </button>

            <button
              type="button"
              onClick={() => {
                soundManager.playClick();
                onOpenProjectModal();
              }}
              onMouseEnter={() => soundManager.playHover()}
              className="hidden items-center gap-2 rounded-full bg-gradient-to-r from-brand-orange via-brand-pink to-brand-cyan px-5 py-2.5 text-xs font-semibold text-white transition-all duration-300 hover:shadow-[0_0_25px_rgba(255,94,58,0.5)] sm:inline-flex"
            >
              <span>Start a project</span>
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((v) => !v)}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              className="rounded-full border border-white/10 bg-white/5 p-2.5 text-white lg:hidden"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Menu className="h-5 w-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div
          id="mobile-menu"
          className="glass-panel mx-auto mt-3 max-w-7xl rounded-2xl border border-white/15 p-5 shadow-2xl animate-slide-down lg:hidden"
        >
          <div className="grid grid-cols-2 gap-2">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href.slice(1);
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => {
                    soundManager.playClick();
                    setIsMobileMenuOpen(false);
                  }}
                  className={`rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-gradient-to-r from-brand-orange/20 to-brand-pink/20 text-white"
                      : "text-gray-300 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </div>

          <div className="mt-4 flex items-center gap-2 border-t border-white/10 pt-4">
            <button
              type="button"
              onClick={toggleSound}
              aria-label={isMuted ? "Enable sound effects" : "Mute sound effects"}
              className="rounded-xl border border-white/10 bg-white/5 p-3 text-gray-300"
            >
              {isMuted ? (
                <VolumeX className="h-4 w-4" aria-hidden="true" />
              ) : (
                <Volume2 className="h-4 w-4 text-brand-cyan" aria-hidden="true" />
              )}
            </button>

            <button
              type="button"
              onClick={() => {
                soundManager.playClick();
                setIsMobileMenuOpen(false);
                onOpenProjectModal();
              }}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-orange via-brand-pink to-brand-cyan py-3.5 text-sm font-bold text-white shadow-lg"
            >
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              Start a project
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
