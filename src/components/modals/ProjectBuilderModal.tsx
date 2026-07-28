import React, { useEffect, useState } from "react";
import { X, Check, ArrowRight, CheckCircle2, Send, Loader2, AlertCircle } from "lucide-react";
import confetti from "canvas-confetti";
import { soundManager } from "../../utils/audio";
import { useModalA11y } from "../../hooks/useModalA11y";
import {
  PROJECT_GOALS,
  BUDGET_RANGES,
  TIMELINE_OPTIONS,
  CONTACT,
  type ProjectGoal,
} from "../../data/vmavixData";

interface ProjectBuilderModalProps {
  isOpen: boolean;
  onClose: () => void;
  /** A value from PROJECT_GOALS, resolved by the caller via serviceToGoal(). */
  preselectedService?: string;
}

type Status = "idle" | "submitting" | "success" | "error";

/**
 * Endpoint for enquiries. Set VITE_CONTACT_ENDPOINT in .env to a real
 * form handler (Formspree, Web3Forms, your own API...).
 *
 * If it is not configured we fall back to opening the user's mail client
 * with the enquiry pre-filled, so a lead is never silently lost.
 */
const ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT as string | undefined;

export const ProjectBuilderModal: React.FC<ProjectBuilderModalProps> = ({
  isOpen,
  onClose,
  preselectedService,
}) => {
  const [step, setStep] = useState(1);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [selectedBudget, setSelectedBudget] = useState<string>(BUDGET_RANGES[1]);
  const [selectedTimeline, setSelectedTimeline] = useState<string>(TIMELINE_OPTIONS[0]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState(""); // spam trap

  const dialogRef = useModalA11y(isOpen, onClose);

  /**
   * Sync props -> state every time the modal opens.
   * The old build read these only in the useState initialiser, which never
   * re-ran, so preselection silently did nothing after the first mount.
   */
  useEffect(() => {
    if (!isOpen) return;
    setStep(1);
    setStatus("idle");
    setErrorMsg("");
    setSelectedGoals(
      preselectedService && (PROJECT_GOALS as readonly string[]).includes(preselectedService)
        ? [preselectedService]
        : []
    );
  }, [isOpen, preselectedService]);

  if (!isOpen) return null;

  const toggleGoal = (goal: ProjectGoal) => {
    soundManager.playClick();
    setSelectedGoals((prev) =>
      prev.includes(goal) ? prev.filter((g) => g !== goal) : [...prev, goal]
    );
  };

  const buildPayload = () => ({
    name,
    email,
    company: company || "Not provided",
    scope: selectedGoals.join(", ") || "Not specified",
    budget: selectedBudget,
    timeline: selectedTimeline,
    message: message || "No brief provided",
    submittedAt: new Date().toISOString(),
    source: "vmavix.com project configurator",
  });

  const mailtoFallback = () => {
    const p = buildPayload();
    const body = [
      `Name: ${p.name}`,
      `Email: ${p.email}`,
      `Company: ${p.company}`,
      "",
      `Scope: ${p.scope}`,
      `Budget: ${p.budget}`,
      `Timeline: ${p.timeline}`,
      "",
      "Brief:",
      p.message,
    ].join("\n");

    window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(
      `New project enquiry — ${p.company}`
    )}&body=${encodeURIComponent(body)}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) return; // bot

    setStatus("submitting");
    setErrorMsg("");

    try {
      if (ENDPOINT) {
        const res = await fetch(ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(buildPayload()),
        });
        if (!res.ok) throw new Error(`Request failed (${res.status})`);
      } else {
        // No endpoint configured — hand off to the user's mail client.
        mailtoFallback();
      }

      soundManager.playSuccess();
      if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        confetti({ particleCount: 110, spread: 80, origin: { y: 0.6 } });
      }
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        err instanceof Error
          ? `${err.message}. You can email us directly at ${CONTACT.email}.`
          : "Something went wrong."
      );
    }
  };

  const stepTitle =
    step === 1
      ? "What do you need help with?"
      : step === 2
        ? "Budget & timeline"
        : "Your contact details";

  return (
    <div
      className="fixed inset-0 z-[99999] flex items-center justify-center overflow-y-auto bg-black/85 p-4 backdrop-blur-2xl animate-fade-in sm:p-6"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        tabIndex={-1}
        className="glass-panel relative my-auto w-full max-w-2xl rounded-3xl border border-white/20 p-6 shadow-2xl animate-scale-in sm:p-10"
      >
        <button
          type="button"
          onClick={() => {
            soundManager.playClick();
            onClose();
          }}
          aria-label="Close enquiry form"
          className="absolute right-5 top-5 rounded-full bg-white/10 p-2 text-gray-300 transition-colors hover:bg-white/20 hover:text-white"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>

        {status === "success" ? (
          <div className="space-y-6 py-8 text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border-2 border-emerald-500 bg-emerald-500/20 text-emerald-400">
              <CheckCircle2 className="h-10 w-10" aria-hidden="true" />
            </div>

            <h3 id="project-modal-title" className="font-syne text-3xl font-extrabold text-white sm:text-4xl">
              Enquiry sent
            </h3>

            <p className="mx-auto max-w-md text-sm leading-relaxed text-gray-300">
              Thanks{name ? `, ${name.split(" ")[0]}` : ""}. We&apos;ve got your brief and will
              reply to <span className="font-semibold text-white">{email}</span> within one
              business day.
            </p>

            <div className="mx-auto max-w-md space-y-2 rounded-2xl border border-white/10 bg-white/5 p-4 text-left font-mono text-xs">
              <div className="text-gray-400">SUMMARY</div>
              <div className="text-white">
                <span className="text-gray-400">Company:</span> {company || "—"}
              </div>
              <div className="text-white">
                <span className="text-gray-400">Scope:</span> {selectedGoals.join(", ") || "Custom"}
              </div>
              <div className="text-white">
                <span className="text-gray-400">Budget:</span> {selectedBudget}
              </div>
              <div className="text-white">
                <span className="text-gray-400">Timeline:</span> {selectedTimeline}
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="rounded-full bg-gradient-to-r from-brand-orange to-brand-pink px-8 py-3.5 text-xs font-bold text-white"
            >
              Back to site
            </button>
          </div>
        ) : (
          <div>
            <div className="mb-8 flex items-center justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <span className="block font-mono text-xs font-bold uppercase tracking-widest text-brand-orange">
                  Step {step} of 3
                </span>
                <h3
                  id="project-modal-title"
                  className="font-syne text-xl font-extrabold text-white sm:text-2xl"
                >
                  {stepTitle}
                </h3>
              </div>

              <div className="flex items-center gap-1.5" aria-hidden="true">
                {[1, 2, 3].map((s) => (
                  <div
                    key={s}
                    className={`h-2 rounded-full transition-all ${
                      step === s
                        ? "w-6 bg-gradient-to-r from-brand-orange to-brand-pink"
                        : step > s
                          ? "w-2 bg-emerald-400"
                          : "w-2 bg-white/20"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* STEP 1 */}
            {step === 1 && (
              <div className="space-y-6">
                <p className="text-xs text-gray-300">Select everything that applies:</p>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {PROJECT_GOALS.map((goal) => {
                    const isSelected = selectedGoals.includes(goal);
                    return (
                      <button
                        key={goal}
                        type="button"
                        aria-pressed={isSelected}
                        onClick={() => toggleGoal(goal)}
                        className={`flex items-center justify-between rounded-2xl border p-3.5 text-left text-xs font-semibold transition-all ${
                          isSelected
                            ? "border-brand-orange bg-gradient-to-r from-brand-orange/20 to-brand-pink/20 text-white"
                            : "border-white/10 bg-white/5 text-gray-300 hover:border-white/25 hover:text-white"
                        }`}
                      >
                        <span>{goal}</span>
                        {isSelected && (
                          <Check className="h-4 w-4 shrink-0 text-brand-orange" aria-hidden="true" />
                        )}
                      </button>
                    );
                  })}
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="button"
                    disabled={selectedGoals.length === 0}
                    onClick={() => {
                      soundManager.playClick();
                      setStep(2);
                    }}
                    className="flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-orange to-brand-pink px-8 py-3.5 text-xs font-bold text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <span>Next: budget &amp; timeline</span>
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <div className="space-y-6">
                <fieldset>
                  <legend className="mb-3 block font-mono text-xs font-bold uppercase text-gray-300">
                    Estimated budget
                  </legend>
                  <div className="grid grid-cols-2 gap-3">
                    {BUDGET_RANGES.map((b) => (
                      <button
                        key={b}
                        type="button"
                        aria-pressed={selectedBudget === b}
                        onClick={() => {
                          soundManager.playClick();
                          setSelectedBudget(b);
                        }}
                        className={`rounded-2xl border p-3.5 text-center text-xs font-bold transition-all ${
                          selectedBudget === b
                            ? "border-brand-orange bg-gradient-to-r from-brand-orange/20 to-brand-pink/20 text-white"
                            : "border-white/10 bg-white/5 text-gray-300 hover:text-white"
                        }`}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </fieldset>

                <fieldset>
                  <legend className="mb-3 block font-mono text-xs font-bold uppercase text-gray-300">
                    Desired timeline
                  </legend>
                  <div className="grid grid-cols-2 gap-3">
                    {TIMELINE_OPTIONS.map((t) => (
                      <button
                        key={t}
                        type="button"
                        aria-pressed={selectedTimeline === t}
                        onClick={() => {
                          soundManager.playClick();
                          setSelectedTimeline(t);
                        }}
                        className={`rounded-2xl border p-3.5 text-center text-xs font-semibold transition-all ${
                          selectedTimeline === t
                            ? "border-brand-orange bg-gradient-to-r from-brand-orange/20 to-brand-pink/20 text-white"
                            : "border-white/10 bg-white/5 text-gray-300 hover:text-white"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </fieldset>

                <div className="flex items-center justify-between pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      soundManager.playClick();
                      setStep(1);
                    }}
                    className="rounded-full px-6 py-3 text-xs font-semibold text-gray-400 hover:text-white"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      soundManager.playClick();
                      setStep(3);
                    }}
                    className="flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-orange to-brand-pink px-8 py-3.5 text-xs font-bold text-white"
                  >
                    <span>Next: your details</span>
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3 */}
            {step === 3 && (
              <form onSubmit={handleSubmit} className="space-y-4" noValidate={false}>
                {/* honeypot */}
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

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="pb-name" className="mb-1 block font-mono text-xs text-gray-300">
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
                      className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-xs text-white placeholder-gray-500 focus:border-brand-orange focus:outline-none"
                    />
                  </div>

                  <div>
                    <label htmlFor="pb-email" className="mb-1 block font-mono text-xs text-gray-300">
                      Work email *
                    </label>
                    <input
                      id="pb-email"
                      type="email"
                      required
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="jane@company.com"
                      className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-xs text-white placeholder-gray-500 focus:border-brand-orange focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="pb-company" className="mb-1 block font-mono text-xs text-gray-300">
                    Company / brand
                  </label>
                  <input
                    id="pb-company"
                    type="text"
                    autoComplete="organization"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Acme Inc."
                    className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-xs text-white placeholder-gray-500 focus:border-brand-orange focus:outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="pb-brief" className="mb-1 block font-mono text-xs text-gray-300">
                    Project brief
                  </label>
                  <textarea
                    id="pb-brief"
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us about your product, goals or technical requirements..."
                    className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-xs text-white placeholder-gray-500 focus:border-brand-orange focus:outline-none"
                  />
                </div>

                {status === "error" && (
                  <div
                    role="alert"
                    className="flex items-start gap-2 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-300"
                  >
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <div className="flex items-center justify-between pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      soundManager.playClick();
                      setStep(2);
                    }}
                    className="rounded-full px-6 py-3 text-xs font-semibold text-gray-400 hover:text-white"
                  >
                    Back
                  </button>

                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-orange via-brand-pink to-brand-cyan px-10 py-4 text-xs font-extrabold text-white transition-all hover:shadow-[0_0_30px_rgba(255,94,58,0.5)] disabled:opacity-60"
                  >
                    {status === "submitting" ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" aria-hidden="true" />
                        <span>Send enquiry</span>
                      </>
                    )}
                  </button>
                </div>

                <p className="pt-1 text-center text-[11px] text-gray-500">
                  Prefer email? Write to{" "}
                  <a href={`mailto:${CONTACT.email}`} className="text-brand-orange hover:underline">
                    {CONTACT.email}
                  </a>
                </p>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
