import React from "react";
import { X, ShieldCheck } from "lucide-react";
import { soundManager } from "../../utils/audio";
import { useModalA11y } from "../../hooks/useModalA11y";
import { LEGAL_EMAIL } from "../../config/contact";

interface LegalModalProps {
  title: string | null;
  onClose: () => void;
}

const CONTENT: Record<string, { intro: string; points: string[] }> = {
  "Privacy Policy": {
    intro:
      "We collect only what we need to reply to your enquiry and improve the site. Your details are never sold or shared with third parties for marketing.",
    points: [
      "Enquiry data (name, email, company, brief) is used solely to respond to your request.",
      "We do not run advertising trackers or sell personal data.",
      "You can request deletion of your data at any time by emailing us.",
      "Fonts are served by Google Fonts and imagery by Unsplash; both may log request metadata.",
    ],
  },
  "Terms of Service": {
    intro:
      "These terms cover use of this website. Project work is governed by a separate written agreement signed before any engagement begins.",
    points: [
      "Site content is provided for information only and is not a binding offer.",
      "Pricing and timelines shown are indicative and confirmed in a written proposal.",
      "On final payment, ownership of delivered work transfers to the client.",
      "We may showcase completed work in our portfolio unless an NDA says otherwise.",
    ],
  },
  Security: {
    intro:
      "Security is built into how we work. We follow current industry best practice across development, deployment and data handling.",
    points: [
      "HTTPS/TLS everywhere, with sensible security headers on all deployments.",
      "Secrets are kept in environment variables and never committed to source control.",
      "Dependencies are kept current and audited for known vulnerabilities.",
      "NDAs are signed on request before any architecture or code review.",
    ],
  },
};

export const LegalModal: React.FC<LegalModalProps> = ({ title, onClose }) => {
  const dialogRef = useModalA11y(Boolean(title), onClose);

  if (!title) return null;

  const body = CONTENT[title] ?? CONTENT["Privacy Policy"];

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
        aria-labelledby="legal-modal-title"
        tabIndex={-1}
        className="glass-panel relative my-auto w-full max-w-2xl rounded-3xl border border-white/20 p-6 shadow-2xl animate-scale-in sm:p-8"
      >
        <button
          type="button"
          onClick={() => {
            soundManager.playClick();
            onClose();
          }}
          aria-label="Close document"
          className="absolute right-5 top-5 rounded-full bg-white/10 p-2 text-gray-300 transition-colors hover:bg-white/20 hover:text-white"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>

        <div className="mb-6 flex items-center gap-3">
          <ShieldCheck className="h-6 w-6 text-brand-cyan" aria-hidden="true" />
          <h3 id="legal-modal-title" className="font-syne text-2xl font-extrabold text-white">
            {title}
          </h3>
        </div>

        <div className="scrollbar-none max-h-[60vh] space-y-4 overflow-y-auto pr-2 text-xs font-light leading-relaxed text-gray-300 sm:text-sm">
          <p>{body.intro}</p>
          <ul className="space-y-2">
            {body.points.map((p) => (
              <li key={p} className="flex gap-2.5">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-orange" />
                <span>{p}</span>
              </li>
            ))}
          </ul>
          <p className="pt-2">
            Questions? Email{" "}
            <a href={`mailto:${LEGAL_EMAIL}`} className="text-brand-orange hover:underline">
              {LEGAL_EMAIL}
            </a>
            .
          </p>
        </div>

        <div className="flex justify-end border-t border-white/10 pt-6">
          <button
            type="button"
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="rounded-full border border-white/15 bg-white/10 px-6 py-2.5 text-xs font-bold text-white hover:bg-white/20"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
