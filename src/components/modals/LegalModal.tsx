import React from 'react';
import { X, ShieldCheck } from 'lucide-react';
import { soundManager } from '../../utils/audio';

interface LegalModalProps {
  title: string | null;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ title, onClose }) => {
  if (!title) return null;

  return (
    <div className="fixed inset-0 z-[99999] bg-black/85 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-300">
      <div className="glass-panel max-w-2xl w-full rounded-3xl p-6 sm:p-8 border border-white/20 shadow-2xl relative my-auto">
        <button
          onClick={() => {
            soundManager.playClick();
            onClose();
          }}
          className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <ShieldCheck className="w-6 h-6 text-cyan-400" />
          <h3 className="font-syne font-extrabold text-2xl text-white">{title}</h3>
        </div>

        <div className="space-y-4 text-xs sm:text-sm text-gray-300 leading-relaxed font-light max-h-[60vh] overflow-y-auto pr-2 scrollbar-none">
          <p className="font-bold text-white">VMAVIX Governance & Security Standards</p>
          <p>
            VMAVIX LLC operates under strict ISO-27001 and SOC-2 Type II compliant security protocols. All client IP, source code, design systems, and proprietary assets remain 100% exclusive property of the client upon project completion.
          </p>
          <p>
            Non-Disclosure Agreements (NDAs) are executed prior to deep architecture reviews. We never sell, share, or monetize client data.
          </p>
          <p>
            For legal inquiries or security compliance verifications, contact legal@vmavix.com.
          </p>
        </div>

        <div className="pt-6 border-t border-white/10 flex justify-end">
          <button
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="px-6 py-2.5 rounded-full font-bold text-xs text-white bg-white/10 hover:bg-white/20 border border-white/15"
          >
            Close Document
          </button>
        </div>
      </div>
    </div>
  );
};
