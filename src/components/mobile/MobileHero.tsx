import React from "react";
import { ArrowUpRight, ChevronDown, MessageCircle, Star } from "lucide-react";
import { soundManager } from "../../utils/audio";
import { TouchButton } from "../ui/TouchButton";
import { quickWhatsAppUrl } from "../../config/contact";

interface MobileHeroProps {
  onOpenProjectModal: () => void;
}

const LOGO_WEBP = `${import.meta.env.BASE_URL}brand/mavixlogo.webp`;
const LOGO_PNG = `${import.meta.env.BASE_URL}brand/mavixlogo.png`;

const PILLS = ["Web Design", "Development", "Branding", "SEO", "AI"];

const ORBS = [
  { top: "14%", left: "9%", size: 5, delay: "0s", color: "#ff5e3a" },
  { top: "24%", right: "12%", size: 4, delay: "1.1s", color: "#00f2fe" },
  { top: "54%", left: "6%", size: 3, delay: "2.2s", color: "#ff2a85" },
  { top: "64%", right: "8%", size: 5, delay: "0.6s", color: "#9d4edd" },
  { top: "40%", left: "86%", size: 3, delay: "1.7s", color: "#4ea8de" },
];

/**
 * Mobile hero — full-viewport, cinematic, thumb-first.
 *
 * Sizing is viewport-relative (clamp + svh) so it fits a 667px-tall iPhone SE
 * and a 915px Pixel without the content ever running under the floating dock.
 */
export const MobileHero: React.FC<MobileHeroProps> = ({ onOpenProjectModal }) => {
  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] flex-col overflow-hidden px-5"
      style={{
        paddingTop: "calc(env(safe-area-inset-top, 0px) + 4rem)",
        // Clear the floating dock (≈72px) plus safe area and breathing room.
        paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 7.5rem)",
      }}
    >
      {/* Aurora field */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 h-[420px] w-[min(120vw,560px)] -translate-x-1/2 animate-aurora-1 rounded-full bg-[radial-gradient(circle,rgba(255,94,58,0.32),transparent_68%)] blur-[64px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-22%] top-[24%] h-[360px] w-[min(96vw,420px)] animate-aurora-2 rounded-full bg-[radial-gradient(circle,rgba(0,242,254,0.26),transparent_68%)] blur-[64px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[6%] left-[-20%] h-[320px] w-[min(92vw,400px)] animate-aurora-3 rounded-full bg-[radial-gradient(circle,rgba(157,78,221,0.3),transparent_68%)] blur-[64px]"
      />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 grid-bg-fade" />

      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        {ORBS.map((o, i) => (
          <span
            key={i}
            className="absolute animate-float rounded-full"
            style={{
              top: o.top,
              left: o.left,
              right: o.right,
              width: o.size,
              height: o.size,
              background: o.color,
              boxShadow: `0 0 ${o.size * 3}px ${o.color}`,
              animationDelay: o.delay,
              opacity: 0.75,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center text-center">
        {/* Availability chip */}
        <div
          className="mb-[clamp(1rem,3.2svh,1.75rem)] inline-flex animate-scale-in items-center gap-2 rounded-full border border-white/12 bg-white/[0.05] px-3.5 py-1.5 backdrop-blur-xl"
          style={{ animationDelay: "0.9s" }}
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
          </span>
          <span className="text-[11px] font-medium tracking-wide text-white/70">
            Available for new projects
          </span>
        </div>

        {/* Animated logo reveal */}
        <div className="animate-logo-reveal" style={{ animationDelay: "0.15s" }}>
          <picture>
            <source srcSet={LOGO_WEBP} type="image/webp" />
            <img
              src={LOGO_PNG}
              alt="VMAVIX — Design, Develop, Grow"
              width={430}
              height={219}
              fetchPriority="high"
              decoding="sync"
              className="w-[clamp(200px,58vw,300px)] drop-shadow-[0_0_46px_rgba(255,94,58,0.34)]"
            />
          </picture>
        </div>

        <h1
          className="mt-[clamp(1.1rem,3.4svh,2rem)] animate-scale-in font-syne text-[clamp(1.75rem,7.2vw,2.35rem)] font-extrabold leading-[1.1] tracking-tight text-white"
          style={{ animationDelay: "0.55s" }}
        >
          Websites &amp; brands
          <span className="mt-1 block text-gradient-aurora">built to perform.</span>
        </h1>

        <p
          className="mt-[clamp(0.75rem,2svh,1.15rem)] max-w-[19rem] animate-scale-in text-[clamp(0.8rem,3.5vw,0.95rem)] font-light leading-relaxed text-white/62"
          style={{ animationDelay: "0.7s" }}
        >
          Premium websites, e-commerce, brand identity and AI products —
          engineered for speed and conversion.
        </p>

        {/* Capability pills — hidden on very short screens to protect the CTAs */}
        <div
          className="mt-[clamp(0.9rem,2.2svh,1.4rem)] hidden animate-scale-in flex-wrap justify-center gap-1.5 min-[380px]:flex"
          style={{ animationDelay: "0.82s" }}
        >
          {PILLS.map((p) => (
            <span
              key={p}
              className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[10.5px] font-medium text-white/60"
            >
              {p}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div
          className="mt-[clamp(1.3rem,3.6svh,2.2rem)] flex w-full max-w-[20rem] animate-scale-in flex-col gap-2.5"
          style={{ animationDelay: "0.95s" }}
        >
          <TouchButton variant="primary" fullWidth onClick={onOpenProjectModal}>
            Start your project
            <ArrowUpRight className="h-[18px] w-[18px]" aria-hidden="true" />
          </TouchButton>

          <TouchButton variant="whatsapp" fullWidth href={quickWhatsAppUrl()} external>
            <MessageCircle className="h-[18px] w-[18px]" aria-hidden="true" />
            Chat on WhatsApp
          </TouchButton>
        </div>

        {/* Trust strip — first thing to go on short screens */}
        <div
          className="mt-[clamp(0.9rem,2.4svh,1.5rem)] hidden animate-scale-in items-center gap-2 text-[11px] text-white/45 min-[400px]:flex"
          style={{ animationDelay: "1.05s" }}
        >
          <span className="flex gap-0.5" aria-hidden="true">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-3 w-3 fill-brand-orange text-brand-orange" />
            ))}
          </span>
          <span>Replies within 1 business day</span>
        </div>
      </div>

      {/* Scroll cue — only where there's genuinely room */}
      <button
        type="button"
        onClick={() => {
          soundManager.playClick();
          document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
        }}
        aria-label="Scroll to next section"
        className="relative z-10 mx-auto hidden animate-float flex-col items-center gap-1 text-white/32 min-[740px]:flex"
      >
        <span className="font-mono text-[9px] uppercase tracking-[0.3em]">Scroll</span>
        <ChevronDown className="h-4 w-4" aria-hidden="true" />
      </button>
    </section>
  );
};
