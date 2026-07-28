import React, { useState } from "react";
import { Logo } from "../common/Logo";
import { ArrowUpRight, CheckCircle2, Send, Mail, MessageCircle, Phone } from "lucide-react";
import confetti from "canvas-confetti";
import { soundManager } from "../../utils/audio";
import { NAV_LINKS, SERVICES_DATA } from "../../data/vmavixData";
import { quickWhatsAppUrl, PHONE_E164, PHONE_DISPLAY, EMAIL } from "../../config/contact";

interface FooterProps {
  onOpenProjectModal: () => void;
  onOpenLegalModal: (title: string) => void;
}

const NEWSLETTER_ENDPOINT = import.meta.env.VITE_NEWSLETTER_ENDPOINT as string | undefined;

export const Footer: React.FC<FooterProps> = ({ onOpenProjectModal, onOpenLegalModal }) => {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setState("sending");
    try {
      if (NEWSLETTER_ENDPOINT) {
        const res = await fetch(NEWSLETTER_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({ email, source: "vmavix.com footer" }),
        });
        if (!res.ok) throw new Error("failed");
      } else {
        window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(
          "Newsletter signup"
        )}&body=${encodeURIComponent(`Please add ${email} to the VMAVIX mailing list.`)}`;
      }

      soundManager.playSuccess();
      if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        confetti({ particleCount: 70, spread: 70, origin: { y: 0.85 } });
      }
      setState("done");
      setEmail("");
    } catch {
      setState("error");
    }
  };

  const topServices = SERVICES_DATA.slice(0, 8);

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#030305] pb-10 pt-20 text-xs font-light text-gray-400 sm:text-sm">
      <div className="pointer-events-none absolute bottom-0 right-0 h-[400px] w-[min(95vw,600px)] bg-gradient-to-tl from-brand-orange/10 via-brand-pink/10 to-transparent blur-[140px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 gap-10 border-b border-white/10 pb-14 sm:grid-cols-2 lg:grid-cols-12 lg:gap-12">
          {/* Brand */}
          <div className="space-y-6 sm:col-span-2 lg:col-span-4">
            <Logo size="lg" showTagline />

            <p className="max-w-sm text-xs leading-relaxed text-gray-400 sm:text-sm">
              VMAVIX is a digital design, engineering and brand studio. We build fast,
              high-converting websites, e-commerce platforms, brand identities and AI-powered
              products.
            </p>

            <a
              href={`mailto:${EMAIL}`}
              className="inline-flex items-center gap-2 text-xs font-semibold text-white transition-colors hover:text-brand-orange"
            >
              <Mail className="h-4 w-4 text-brand-orange" aria-hidden="true" />
              {EMAIL}
            </a>

            <div className="pt-2">
              <span className="mb-2 block font-mono text-[11px] font-bold uppercase tracking-wider text-gray-300">
                Get occasional build notes
              </span>

              {state === "done" ? (
                <div
                  role="status"
                  className="flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-xs text-emerald-400"
                >
                  <CheckCircle2 className="h-4 w-4" aria-hidden="true" /> You&apos;re on the list.
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <label htmlFor="footer-email" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="footer-email"
                    type="email"
                    required
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    className="flex-1 rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-xs text-white placeholder-gray-500 focus:border-brand-orange focus:outline-none"
                  />
                  <button
                    type="submit"
                    disabled={state === "sending"}
                    aria-label="Subscribe"
                    className="rounded-xl bg-gradient-to-r from-brand-orange to-brand-pink px-4 py-2.5 font-bold text-white transition-all hover:shadow-lg disabled:opacity-60"
                  >
                    <Send className="h-4 w-4" aria-hidden="true" />
                  </button>
                </form>
              )}

              {state === "error" && (
                <p role="alert" className="mt-2 text-[11px] text-red-400">
                  Couldn&apos;t subscribe. Email {EMAIL} instead.
                </p>
              )}
            </div>
          </div>

          {/* Navigation */}
          <nav aria-label="Footer navigation" className="space-y-3 lg:col-span-2">
            <h2 className="mb-4 block font-mono text-xs font-bold uppercase tracking-wider text-white">
              Navigate
            </h2>
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => soundManager.playClick()}
                className="block text-gray-400 transition-colors hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Services */}
          <div className="space-y-3 lg:col-span-3">
            <h2 className="mb-4 block font-mono text-xs font-bold uppercase tracking-wider text-white">
              Services
            </h2>
            {topServices.map((s) => (
              <a
                key={s.id}
                href="#services"
                onClick={() => soundManager.playClick()}
                className="block text-xs text-gray-400 transition-colors hover:text-white"
              >
                {s.title}
              </a>
            ))}
          </div>

          {/* Contact */}
          <div className="space-y-4 lg:col-span-3">
            <h2 className="mb-4 block font-mono text-xs font-bold uppercase tracking-wider text-white">
              Start here
            </h2>

            <p className="text-xs leading-relaxed text-gray-400">
              Tell us what you&apos;re building and we&apos;ll come back within one business day
              with next steps.
            </p>

            <a
              href={quickWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundManager.playClick()}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[linear-gradient(135deg,#25D366,#128C7E)] py-3 text-xs font-bold text-white transition-all hover:shadow-[0_8px_24px_-8px_rgba(37,211,102,0.8)]"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              <span>WhatsApp us</span>
            </a>

            <a
              href={`tel:${PHONE_E164}`}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/12 bg-white/[0.04] py-3 text-xs font-bold text-white/80 transition-colors hover:text-white"
            >
              <Phone className="h-4 w-4 text-brand-cyan" aria-hidden="true" />
              {PHONE_DISPLAY}
            </a>

            <button
              type="button"
              onClick={() => {
                soundManager.playClick();
                onOpenProjectModal();
              }}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-brand-orange/40 bg-gradient-to-r from-brand-orange/20 to-brand-pink/20 py-3 text-xs font-bold text-brand-orange transition-all hover:bg-brand-orange hover:text-white"
            >
              <span>Request a proposal</span>
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 pt-8 font-mono text-xs text-gray-500 md:flex-row">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span>© {new Date().getFullYear()} VMAVIX. All rights reserved.</span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden text-gray-400 sm:inline">{'Design • Develop • Grow'}</span>
          </div>

          <div className="flex items-center gap-5">
            {["Privacy Policy", "Terms of Service", "Security"].map((doc) => (
              <button
                key={doc}
                type="button"
                onClick={() => onOpenLegalModal(doc)}
                className="transition-colors hover:text-white"
              >
                {doc}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
