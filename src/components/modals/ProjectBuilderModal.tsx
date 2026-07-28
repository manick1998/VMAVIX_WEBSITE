import React, { useEffect, useMemo, useState } from "react";
import {
  X, Check, ArrowRight, CheckCircle2, Loader2, AlertCircle, MessageCircle, Mail,
} from "lucide-react";
import confetti from "canvas-confetti";
import { soundManager } from "../../utils/audio";
import { useModalA11y } from "../../hooks/useModalA11y";
import { useIsMobile } from "../../hooks/useIsMobile";
import {
  PROJECT_GOALS, BUDGET_RANGES, TIMELINE_OPTIONS,
} from "../../data/vmavixData";
import {
  buildWhatsAppUrl, EMAIL, PHONE_DISPLAY, type EnquiryPayload,
} from "../../config/contact";

interface ProjectBuilderModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedService?: string;
}

type Status = "idle" | "submitting" | "success" | "error";

/** Optional analytics/CRM endpoint. WhatsApp delivery does not depend on it. */
const ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT as string | undefined;

export const ProjectBuilderModal: React.FC<ProjectBuilderModalProps> = ({
  isOpen,
  onClose,
  preselectedService,
}) => {
  const isMobile = useIsMobile();
  const [step, setStep] = useState(1);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const [goals, setGoals] = useState<string[]>([]);
  const [budget, setBudget] = useState<string>(BUDGET_RANGES[1]);
  const [timeline, setTimeline] = useState<string>(TIMELINE_OPTIONS[0]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");

  const dialogRef = useModalA11y(isOpen && !isMobile, onClose);
  const sheetRef = useModalA11y(isOpen && isMobile, onClose);

  useEffect(() => {
    if (!isOpen) return;
    setStep(1);
    setStatus("idle");
    setErrorMsg("");
    setGoals(
      preselectedService && (PROJECT_GOALS as readonly string[]).includes(preselectedService)
        ? [preselectedService]
        : []
    );
  }, [isOpen, preselectedService]);

  const payload: EnquiryPayload = useMemo(
    () => ({
      name,
      email,
      company,
      scope: goals.join(", ") || "Not specified",
      budget,
      timeline,
      message,
    }),
    [name, email, company, goals, budget, timeline, message]
  );

  if (!isOpen) return null;

  const toggleGoal = (g: string) => {
    soundManager.playClick();
    setGoals((p) => (p.includes(g) ? p.filter((x) => x !== g) : [...p, g]));
  };

  const celebrate = () => {
    soundManager.playSuccess();
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      confetti({ particleCount: 110, spread: 80, origin: { y: 0.6 } });
    }
  };

  /** Primary path: hand the enquiry to WhatsApp, pre-filled. */
  const submitViaWhatsApp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) return;

    setStatus("submitting");
    setErrorMsg("");

    // Fire-and-forget copy to the CRM endpoint if one is configured.
    if (ENDPOINT) {
      fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...payload, source: "vmavix.com", submittedAt: new Date().toISOString() }),
      }).catch(() => {
        /* WhatsApp is the delivery mechanism; never block on this. */
      });
    }

    try {
      const url = buildWhatsAppUrl(payload);
      const win = window.open(url, "_blank", "noopener,noreferrer");
      if (!win) window.location.href = url; // popup blocked
      celebrate();
      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMsg(`Couldn't open WhatsApp. Message us on ${PHONE_DISPLAY} or email ${EMAIL}.`);
    }
  };

  const stepTitle =
    step === 1 ? "What do you need?" : step === 2 ? "Budget & timeline" : "Your details";

  /* ---------------- shared body ---------------- */
  const Body = (
    <>
      {status === "success" ? (
        <div className="space-y-5 py-6 text-center">
          <div className="mx-auto flex h-[72px] w-[72px] items-center justify-center rounded-full border-2 border-[#25D366] bg-[#25D366]/15 text-[#25D366]">
            <CheckCircle2 className="h-9 w-9" aria-hidden="true" />
          </div>

          <h3 className="font-syne text-[1.6rem] font-extrabold text-white">
            WhatsApp opened
          </h3>

          <p className="mx-auto max-w-sm text-[13.5px] leading-relaxed text-white/60">
            Your enquiry is pre-filled and ready. Just hit send in WhatsApp and
            we&apos;ll reply shortly.
          </p>

          <div className="mx-auto max-w-sm space-y-1.5 rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-left font-mono text-[11px]">
            <div className="text-white/40">SUMMARY</div>
            <div className="text-white/85">
              <span className="text-white/40">Scope:</span> {payload.scope}
            </div>
            <div className="text-white/85">
              <span className="text-white/40">Budget:</span> {budget}
            </div>
            <div className="text-white/85">
              <span className="text-white/40">Timeline:</span> {timeline}
            </div>
          </div>

          <div className="flex flex-col gap-2.5 pt-1">
            <a
              href={buildWhatsAppUrl(payload)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full bg-[linear-gradient(135deg,#25D366,#128C7E)] px-7 text-sm font-bold text-white active:scale-[0.97]"
            >
              <MessageCircle className="h-[18px] w-[18px]" aria-hidden="true" />
              Re-open WhatsApp
            </a>
            <button
              type="button"
              onClick={onClose}
              className="min-h-[48px] rounded-full border border-white/12 text-sm font-semibold text-white/70 active:scale-[0.97]"
            >
              Back to site
            </button>
          </div>
        </div>
      ) : (
        <div className="pb-2">
          {/* Progress */}
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <span className="block font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-brand-orange">
                Step {step} of 3
              </span>
              <p className="mt-0.5 font-syne text-[17px] font-extrabold text-white">
                {stepTitle}
              </p>
            </div>
            <div className="flex items-center gap-1.5" aria-hidden="true">
              {[1, 2, 3].map((s) => (
                <span
                  key={s}
                  className={`h-1.5 rounded-full transition-all duration-400 ${
                    step === s
                      ? "w-6 bg-[linear-gradient(90deg,#ff5e3a,#ff2a85)]"
                      : step > s
                        ? "w-1.5 bg-emerald-400"
                        : "w-1.5 bg-white/18"
                  }`}
                />
              ))}
            </div>
          </div>

          {step === 1 && (
            <div className="space-y-5">
              <p className="text-[13px] text-white/55">Select everything that applies:</p>
              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {PROJECT_GOALS.map((g) => {
                  const on = goals.includes(g);
                  return (
                    <button
                      key={g}
                      type="button"
                      aria-pressed={on}
                      onClick={() => toggleGoal(g)}
                      className={`flex min-h-[52px] items-center justify-between gap-2 rounded-2xl border px-4 py-3 text-left text-[13px] font-semibold transition-all active:scale-[0.97] ${
                        on
                          ? "border-brand-orange bg-gradient-to-r from-brand-orange/22 to-brand-pink/18 text-white"
                          : "border-white/10 bg-white/[0.04] text-white/65"
                      }`}
                    >
                      <span>{g}</span>
                      {on && <Check className="h-4 w-4 shrink-0 text-brand-orange" aria-hidden="true" />}
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                disabled={goals.length === 0}
                onClick={() => {
                  soundManager.playClick();
                  setStep(2);
                }}
                className="flex min-h-[54px] w-full items-center justify-center gap-2 rounded-full bg-[linear-gradient(110deg,#ff5e3a,#ff2a85,#9d4edd)] text-sm font-bold text-white transition-all active:scale-[0.97] disabled:opacity-40"
              >
                Continue
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <fieldset>
                <legend className="mb-3 font-mono text-[10px] font-bold uppercase tracking-wider text-white/55">
                  Estimated budget
                </legend>
                <div className="grid grid-cols-2 gap-2.5">
                  {BUDGET_RANGES.map((b) => (
                    <button
                      key={b}
                      type="button"
                      aria-pressed={budget === b}
                      onClick={() => {
                        soundManager.playClick();
                        setBudget(b);
                      }}
                      className={`min-h-[52px] rounded-2xl border px-3 text-[13px] font-bold transition-all active:scale-[0.96] ${
                        budget === b
                          ? "border-brand-orange bg-gradient-to-r from-brand-orange/22 to-brand-pink/18 text-white"
                          : "border-white/10 bg-white/[0.04] text-white/65"
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </fieldset>

              <fieldset>
                <legend className="mb-3 font-mono text-[10px] font-bold uppercase tracking-wider text-white/55">
                  Timeline
                </legend>
                <div className="grid grid-cols-2 gap-2.5">
                  {TIMELINE_OPTIONS.map((t) => (
                    <button
                      key={t}
                      type="button"
                      aria-pressed={timeline === t}
                      onClick={() => {
                        soundManager.playClick();
                        setTimeline(t);
                      }}
                      className={`min-h-[52px] rounded-2xl border px-3 text-[13px] font-semibold transition-all active:scale-[0.96] ${
                        timeline === t
                          ? "border-brand-orange bg-gradient-to-r from-brand-orange/22 to-brand-pink/18 text-white"
                          : "border-white/10 bg-white/[0.04] text-white/65"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </fieldset>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    soundManager.playClick();
                    setStep(1);
                  }}
                  className="min-h-[54px] rounded-full border border-white/12 px-6 text-sm font-semibold text-white/60 active:scale-[0.97]"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => {
                    soundManager.playClick();
                    setStep(3);
                  }}
                  className="flex min-h-[54px] flex-1 items-center justify-center gap-2 rounded-full bg-[linear-gradient(110deg,#ff5e3a,#ff2a85,#9d4edd)] text-sm font-bold text-white active:scale-[0.97]"
                >
                  Continue
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <form onSubmit={submitViaWhatsApp} className="space-y-4">
              <input
                type="text"
                name="company_website"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="pointer-events-none absolute h-0 w-0 opacity-0"
              />

              <div>
                <label htmlFor="pb-name" className="mb-1.5 block font-mono text-[10px] uppercase tracking-wider text-white/55">
                  Your name *
                </label>
                <input
                  id="pb-name"
                  type="text"
                  required
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Jane Cooper"
                  className="min-h-[52px] w-full rounded-2xl border border-white/12 bg-white/[0.05] px-4 text-[15px] text-white placeholder-white/28 focus:border-brand-orange focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="pb-email" className="mb-1.5 block font-mono text-[10px] uppercase tracking-wider text-white/55">
                  Email *
                </label>
                <input
                  id="pb-email"
                  type="email"
                  required
                  autoComplete="email"
                  inputMode="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jane@company.com"
                  className="min-h-[52px] w-full rounded-2xl border border-white/12 bg-white/[0.05] px-4 text-[15px] text-white placeholder-white/28 focus:border-brand-orange focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="pb-company" className="mb-1.5 block font-mono text-[10px] uppercase tracking-wider text-white/55">
                  Company
                </label>
                <input
                  id="pb-company"
                  type="text"
                  autoComplete="organization"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Acme Inc."
                  className="min-h-[52px] w-full rounded-2xl border border-white/12 bg-white/[0.05] px-4 text-[15px] text-white placeholder-white/28 focus:border-brand-orange focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="pb-brief" className="mb-1.5 block font-mono text-[10px] uppercase tracking-wider text-white/55">
                  Brief
                </label>
                <textarea
                  id="pb-brief"
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us about your project..."
                  className="w-full rounded-2xl border border-white/12 bg-white/[0.05] px-4 py-3.5 text-[15px] text-white placeholder-white/28 focus:border-brand-orange focus:outline-none"
                />
              </div>

              {status === "error" && (
                <div role="alert" className="flex items-start gap-2 rounded-2xl border border-red-500/30 bg-red-500/10 p-3.5 text-[12px] text-red-300">
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div className="flex gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => {
                    soundManager.playClick();
                    setStep(2);
                  }}
                  className="min-h-[54px] rounded-full border border-white/12 px-6 text-sm font-semibold text-white/60 active:scale-[0.97]"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="flex min-h-[54px] flex-1 items-center justify-center gap-2 rounded-full bg-[linear-gradient(135deg,#25D366,#128C7E)] text-sm font-extrabold text-white shadow-[0_10px_30px_-10px_rgba(37,211,102,0.85)] active:scale-[0.97] disabled:opacity-60"
                >
                  {status === "submitting" ? (
                    <>
                      <Loader2 className="h-[18px] w-[18px] animate-spin" aria-hidden="true" />
                      Opening...
                    </>
                  ) : (
                    <>
                      <MessageCircle className="h-[18px] w-[18px]" aria-hidden="true" />
                      Send on WhatsApp
                    </>
                  )}
                </button>
              </div>

              <a
                href={`mailto:${EMAIL}`}
                className="flex items-center justify-center gap-1.5 pt-1 text-[11.5px] text-white/40 hover:text-white/70"
              >
                <Mail className="h-3.5 w-3.5" aria-hidden="true" />
                Prefer email? {EMAIL}
              </a>
            </form>
          )}
        </div>
      )}
    </>
  );

  /* ---------------- mobile: bottom sheet ---------------- */
  if (isMobile) {
    return (
      <div className="fixed inset-0 z-[99999] flex items-end">
        <div
          className="absolute inset-0 bg-black/78 backdrop-blur-md animate-fade-in"
          onClick={onClose}
          aria-hidden="true"
        />
        <div
          ref={sheetRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="pb-title"
          tabIndex={-1}
          className="glass-panel relative flex max-h-[93svh] w-full flex-col rounded-t-[30px] border-white/12 animate-sheet-up"
        >
          <div className="flex shrink-0 justify-center pb-1 pt-3" aria-hidden="true">
            <span className="h-1 w-10 rounded-full bg-white/22" />
          </div>
          <div className="flex shrink-0 items-center justify-between px-5 pb-2 pt-1">
            <h2 id="pb-title" className="font-syne text-[16px] font-extrabold text-white">
              Start a project
            </h2>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/[0.08] text-white/65 active:scale-90"
            >
              <X className="h-[18px] w-[18px]" aria-hidden="true" />
            </button>
          </div>
          <div
            className="scrollbar-none flex-1 overflow-y-auto overscroll-contain px-5"
            style={{ paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 1.5rem)" }}
          >
            {Body}
          </div>
        </div>
      </div>
    );
  }

  /* ---------------- desktop: centred dialog ---------------- */
  return (
    <div
      className="fixed inset-0 z-[99999] flex items-center justify-center overflow-y-auto bg-black/85 p-6 backdrop-blur-2xl animate-fade-in"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="pb-title-d"
        tabIndex={-1}
        className="glass-panel relative my-auto w-full max-w-2xl rounded-3xl border-white/20 p-10 shadow-2xl animate-scale-in"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-5 top-5 rounded-full bg-white/10 p-2 text-gray-300 hover:bg-white/20 hover:text-white"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>
        <h2 id="pb-title-d" className="sr-only">
          Start a project
        </h2>
        {Body}
      </div>
    </div>
  );
};
