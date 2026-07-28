import React, { useState } from 'react';
import { X, Check, ArrowRight, CheckCircle2, Send } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundManager } from '../../utils/audio';

interface ProjectBuilderModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedService?: string;
  preselectedPlan?: string;
}

export const ProjectBuilderModal: React.FC<ProjectBuilderModalProps> = ({
  isOpen,
  onClose,
  preselectedService,
  preselectedPlan
}) => {
  const [step, setStep] = useState(1);
  const [submitted, setSubscribed] = useState(false);

  // Form State
  const [selectedGoals, setSelectedGoals] = useState<string[]>(
    preselectedService ? [preselectedService] : []
  );
  const [selectedBudget, setSelectedBudget] = useState<string>(
    preselectedPlan || '$15,000 - $30,000'
  );
  const [selectedTimeline, setSelectedTimeline] = useState<string>('ASAP (2-4 Weeks)');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [message, setMessage] = useState('');

  if (!isOpen) return null;

  const goalsList = [
    'Website Design & UI/UX',
    'Website Engineering (React/Next.js)',
    'E-Commerce Platform',
    'Brand Identity & Logo Design',
    'SEO & Organic Growth Sprint',
    'Digital Marketing & Paid Ads',
    'Custom AI & Automation'
  ];

  const budgetsList = [
    '$7,500 - $15,000',
    '$15,000 - $30,000',
    '$30,000 - $50,000',
    '$50,000+'
  ];

  const timelinesList = [
    'ASAP (2-3 Weeks)',
    '1 Month',
    '2-3 Months',
    'Flexible'
  ];

  const toggleGoal = (goal: string) => {
    soundManager.playClick();
    if (selectedGoals.includes(goal)) {
      setSelectedGoals(selectedGoals.filter((g) => g !== goal));
    } else {
      setSelectedGoals([...selectedGoals, goal]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundManager.playSuccess();
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 }
    });
    setSubscribed(true);
  };

  return (
    <div className="fixed inset-0 z-[99999] bg-black/85 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-300">
      <div className="glass-panel max-w-2xl w-full rounded-3xl p-6 sm:p-10 border border-white/20 shadow-2xl relative my-auto">
        {/* Close Button */}
        <button
          onClick={() => {
            soundManager.playClick();
            onClose();
          }}
          className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          /* Submission Confirmation Screen */
          <div className="text-center py-8 space-y-6">
            <div className="w-20 h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <h3 className="font-syne font-extrabold text-3xl sm:text-4xl text-white">
              Proposal Request Received!
            </h3>

            <p className="text-sm text-gray-300 max-w-md mx-auto leading-relaxed">
              Thank you, <span className="text-white font-bold">{name}</span>. Our lead digital architect is reviewing your project parameters and will reach out within <span className="text-orange-400 font-bold">2 business hours</span>.
            </p>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 max-w-md mx-auto text-xs text-left space-y-2 font-mono">
              <div className="text-gray-400">SUMMARY CONFIRMATION:</div>
              <div className="text-white"><span className="text-gray-400">Company:</span> {company || 'N/A'}</div>
              <div className="text-white"><span className="text-gray-400">Selected Scope:</span> {selectedGoals.join(', ') || 'Custom'}</div>
              <div className="text-white"><span className="text-gray-400">Budget Range:</span> {selectedBudget}</div>
            </div>

            <button
              onClick={onClose}
              className="px-8 py-3.5 rounded-full font-bold text-xs text-white bg-gradient-to-r from-orange-500 to-pink-500"
            >
              Return to Website
            </button>
          </div>
        ) : (
          /* Multi-Step Wizard */
          <div>
            {/* Step Indicators */}
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
              <div>
                <span className="font-mono text-xs text-orange-400 font-bold uppercase tracking-widest block">
                  PROJECT CONFIGURATOR • STEP 0{step} OF 3
                </span>
                <h3 className="font-syne font-extrabold text-xl sm:text-2xl text-white">
                  {step === 1 && 'What are your primary goals?'}
                  {step === 2 && 'Budget & Delivery Timeline'}
                  {step === 3 && 'Contact Information'}
                </h3>
              </div>

              {/* Progress dots */}
              <div className="flex items-center gap-1.5">
                {[1, 2, 3].map((s) => (
                  <div
                    key={s}
                    className={`h-2 rounded-full transition-all ${
                      step === s
                        ? 'w-6 bg-gradient-to-r from-orange-500 to-pink-500'
                        : step > s
                        ? 'w-2 bg-emerald-400'
                        : 'w-2 bg-white/20'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* STEP 1: Goal Selection */}
            {step === 1 && (
              <div className="space-y-6">
                <p className="text-xs text-gray-300">Select all capabilities that apply to your brand vision:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {goalsList.map((goal) => {
                    const isSelected = selectedGoals.includes(goal);
                    return (
                      <button
                        key={goal}
                        type="button"
                        onClick={() => toggleGoal(goal)}
                        className={`p-3.5 rounded-2xl border text-left text-xs font-semibold transition-all flex items-center justify-between ${
                          isSelected
                            ? 'bg-gradient-to-r from-orange-500/20 to-pink-500/20 border-orange-500 text-white'
                            : 'bg-white/5 border-white/10 text-gray-300 hover:text-white hover:border-white/20'
                        }`}
                      >
                        <span>{goal}</span>
                        {isSelected && <Check className="w-4 h-4 text-orange-400 shrink-0" />}
                      </button>
                    );
                  })}
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    type="button"
                    disabled={selectedGoals.length === 0}
                    onClick={() => {
                      soundManager.playClick();
                      setStep(2);
                    }}
                    className="px-8 py-3.5 rounded-full font-bold text-xs text-white bg-gradient-to-r from-orange-500 to-pink-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    <span>Next: Budget & Timeline</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: Budget & Timeline */}
            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <label className="font-mono text-xs text-gray-300 uppercase block mb-3 font-bold">
                    ESTIMATED BUDGET RANGE
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {budgetsList.map((b) => (
                      <button
                        key={b}
                        type="button"
                        onClick={() => {
                          soundManager.playClick();
                          setSelectedBudget(b);
                        }}
                        className={`p-3.5 rounded-2xl border text-center text-xs font-bold transition-all ${
                          selectedBudget === b
                            ? 'bg-gradient-to-r from-orange-500/20 to-pink-500/20 border-orange-500 text-white'
                            : 'bg-white/5 border-white/10 text-gray-300 hover:text-white'
                        }`}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="font-mono text-xs text-gray-300 uppercase block mb-3 font-bold">
                    DESIRED LAUNCH TIMELINE
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {timelinesList.map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => {
                          soundManager.playClick();
                          setSelectedTimeline(t);
                        }}
                        className={`p-3.5 rounded-2xl border text-center text-xs font-semibold transition-all ${
                          selectedTimeline === t
                            ? 'bg-gradient-to-r from-orange-500/20 to-pink-500/20 border-orange-500 text-white'
                            : 'bg-white/5 border-white/10 text-gray-300 hover:text-white'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => {
                      soundManager.playClick();
                      setStep(1);
                    }}
                    className="px-6 py-3 rounded-full text-xs font-semibold text-gray-400 hover:text-white"
                  >
                    Back
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      soundManager.playClick();
                      setStep(3);
                    }}
                    className="px-8 py-3.5 rounded-full font-bold text-xs text-white bg-gradient-to-r from-orange-500 to-pink-500 flex items-center gap-2"
                  >
                    <span>Next: Final Details</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Contact Details & Submit */}
            {step === 3 && (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-mono text-gray-300 block mb-1">YOUR NAME *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Alexander Vance"
                      className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-orange-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono text-gray-300 block mb-1">WORK EMAIL *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="alexander@company.com"
                      className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-orange-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-mono text-gray-300 block mb-1">COMPANY / BRAND NAME</label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="e.g. Aether Dynamics"
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono text-gray-300 block mb-1">PROJECT VISION BRIEF</label>
                  <textarea
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us about your product, targets, or specific technical requirements..."
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div className="pt-4 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => {
                      soundManager.playClick();
                      setStep(2);
                    }}
                    className="px-6 py-3 rounded-full text-xs font-semibold text-gray-400 hover:text-white"
                  >
                    Back
                  </button>

                  <button
                    type="submit"
                    className="px-10 py-4 rounded-full font-extrabold text-xs text-white bg-gradient-to-r from-orange-500 via-pink-500 to-cyan-500 hover:shadow-[0_0_30px_rgba(255,94,58,0.5)] transition-all flex items-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Project Scope</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
