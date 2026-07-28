import React from "react";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { soundManager } from "../../utils/audio";
import { quickWhatsAppUrl } from "../../config/contact";
import { HeroAtmosphere } from "./HeroAtmosphere";

interface MobileHeroProps {
  onOpenProjectModal: () => void;
}

const LOGO_WEBP = `${import.meta.env.BASE_URL}brand/mavixlogo.webp`;
const LOGO_PNG = `${import.meta.env.BASE_URL}brand/mavixlogo.png`;

/** The headline is the hero. Each line lands on its own beat. */
const HEADLINE = [
  { text: "WE BUILD", accent: false },
  { text: "DIGITAL", accent: false },
  { text: "BRANDS", accent: true },
  { text: "PEOPLE", accent: false },
  { text: "REMEMBER.", accent: true },
];

const CHIPS = [
  { label: "Websites", glyph: "✦", tint: "255,94,58" },
  { label: "Branding", glyph: "◈", tint: "255,42,133" },
  { label: "SEO", glyph: "↗", tint: "0,242,254" },
  { label: "Marketing", glyph: "◉", tint: "157,78,221" },
  { label: "AI", glyph: "✳", tint: "78,168,222" },
];

/**
 * Mobile hero.
 *
 * Typography leads; the logo sits underneath as a signature rather than
 * dominating the fold.
 *
 * Sizing notes — the whole composition has to clear the floating dock on
 * everything from a 667px SE to a 932px Pro Max:
 *  - type scales on min(vw, svh) so a short screen shrinks it too, not
 *    just a narrow one. "REMEMBER." is the widest line and sets the cap.
 *  - every vertical gap is an svh clamp, so the rhythm compresses on
 *    short devices instead of pushing the buttons under the dock.
 *  - chips are a single non-wrapping row; wrapping to two cost ~33px
 *    that short screens don't have.
 */
export const MobileHero: React.FC<MobileHeroProps> = ({ onOpenProjectModal }) => {
  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] flex-col overflow-hidden"
      style={{
        paddingTop: "calc(env(safe-area-inset-top, 0px) + 2.75rem)",
        paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 6.25rem)",
      }}
    >
      <HeroAtmosphere />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_78%_50%_at_50%_34%,rgba(90,42,130,0.2),transparent_72%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_42%,rgba(4,4,9,0.72)_100%)]"
      />

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6">
        {/* Status pill */}
        <div className="hero-in hero-d1 inline-flex items-center gap-2.5 rounded-full border border-white/[0.14] bg-white/[0.055] px-4 py-[7px] shadow-[inset_0_1px_0_rgba(255,255,255,0.14),0_8px_26px_-14px_rgba(0,0,0,0.9)] backdrop-blur-xl">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_7px_#34d399]" />
          </span>
          <span className="text-[11px] font-medium tracking-[0.02em] text-white/72">
            Available for new projects
          </span>
        </div>

        {/* THE HEADLINE */}
        <h1
          className="mt-[clamp(0.85rem,3svh,2rem)] text-center font-syne font-extrabold uppercase leading-[0.96] tracking-[-0.03em]"
          style={{ fontSize: "clamp(1.6rem, min(8.1vw, 4.5svh), 2.5rem)" }}
        >
          {HEADLINE.map((line, i) => (
            <span
              key={line.text}
              className="hero-word block"
              style={{ animationDelay: `${0.28 + i * 0.13}s` }}
            >
              <span className={line.accent ? "text-gradient-aurora" : "text-white"}>
                {line.text}
              </span>
            </span>
          ))}
        </h1>

        {/* Signature logo — deliberately small */}
        <div className="hero-in hero-d7 mt-[clamp(0.85rem,2.8svh,1.9rem)] flex flex-col items-center">
          <span
            aria-hidden="true"
            className="mb-[clamp(0.5rem,1.4svh,0.9rem)] h-px w-12 bg-gradient-to-r from-transparent via-white/28 to-transparent"
          />
          <div className="relative">
            <img
              src={LOGO_WEBP}
              alt=""
              aria-hidden="true"
              className="sig-bloom pointer-events-none absolute inset-0 h-full w-full"
            />
            <picture>
              <source srcSet={LOGO_WEBP} type="image/webp" />
              <img
                src={LOGO_PNG}
                alt="VMAVIX"
                width={1200}
                height={611}
                fetchPriority="high"
                decoding="sync"
                className="sig-logo relative block"
                style={{ width: "clamp(108px, min(31vw, 17svh), 150px)" }}
              />
            </picture>
            <span
              aria-hidden="true"
              className="sig-shine pointer-events-none absolute inset-0"
              style={{
                WebkitMaskImage: `url(${LOGO_WEBP})`,
                maskImage: `url(${LOGO_WEBP})`,
              }}
            />
          </div>
        </div>

        {/* Description */}
        <p
          className="hero-in hero-d8 mt-[clamp(0.65rem,2svh,1.35rem)] max-w-[20.5rem] text-center font-light leading-[1.58] text-white/55"
          style={{ fontSize: "clamp(0.76rem, 3.3vw, 0.88rem)" }}
        >
          Luxury websites, unforgettable brands and AI-powered experiences.
        </p>

        {/*
          Floating chips. On tall screens all five wrap to two centred rows.
          Short screens (<=700px) can't spare the ~30px a second row costs,
          so the last two hide there and the rest stay on one line.
        */}
        <div className="hero-in hero-d9 mt-[clamp(0.7rem,2.2svh,1.4rem)] flex max-w-[21rem] flex-wrap justify-center gap-[7px]">
          {CHIPS.map((c, i) => (
            <span
              key={c.label}
              className={`chip-float inline-flex items-center gap-1.5 rounded-full border border-white/[0.11] bg-white/[0.045] px-[11px] py-[6px] backdrop-blur-md ${
                i >= 3 ? "chip-tall-only" : ""
              }`}
              style={{
                animationDelay: `${i * 0.55}s`,
                boxShadow: `inset 0 1px 0 rgba(255,255,255,0.1), 0 0 18px -10px rgba(${c.tint},0.85)`,
              }}
            >
              <span
                aria-hidden="true"
                className="text-[9px] leading-none"
                style={{ color: `rgb(${c.tint})` }}
              >
                {c.glyph}
              </span>
              <span className="text-[10.5px] font-medium tracking-wide text-white/72">
                {c.label}
              </span>
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="hero-in hero-d10 mt-[clamp(1rem,3.2svh,2.1rem)] flex w-full max-w-[21rem] flex-col gap-2.5">
          <button
            type="button"
            onClick={() => {
              soundManager.playClick();
              onOpenProjectModal();
            }}
            className="btn-lux btn-lux--primary group"
          >
            <span className="relative z-10 flex items-center justify-center gap-2.5">
              Start your project
              <ArrowUpRight
                className="h-[18px] w-[18px] transition-transform duration-500 group-active:-translate-y-0.5 group-active:translate-x-0.5"
                aria-hidden="true"
              />
            </span>
          </button>

          <a
            href={quickWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => soundManager.playClick()}
            className="btn-lux btn-lux--wa"
          >
            <span className="relative z-10 flex items-center justify-center gap-2.5">
              <MessageCircle className="h-[18px] w-[18px]" aria-hidden="true" />
              Chat on WhatsApp
            </span>
          </a>
        </div>

        {/* Scroll orb — only where there's genuinely room */}
        <button
          type="button"
          onClick={() => {
            soundManager.playClick();
            document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
          }}
          aria-label="Scroll to next section"
          className="hero-in hero-d11 relative mt-[clamp(0.75rem,2.4svh,1.5rem)] hidden h-8 w-8 items-center justify-center min-[820px]:flex"
        >
          <span aria-hidden="true" className="scroll-orb" />
          <span aria-hidden="true" className="scroll-orb-halo" />
        </button>
      </div>
    </section>
  );
};
