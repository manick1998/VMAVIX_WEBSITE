import React from "react";
import { X } from "lucide-react";
import { useModalA11y } from "../../hooks/useModalA11y";
import { soundManager } from "../../utils/audio";

interface MobileSheetProps {
  open: boolean;
  onClose: () => void;
  title: string;
  labelledById: string;
  children: React.ReactNode;
}

/**
 * iOS-style bottom sheet with a grab handle.
 * Used for every mobile modal so the interaction model stays consistent.
 */
export const MobileSheet: React.FC<MobileSheetProps> = ({
  open,
  onClose,
  title,
  labelledById,
  children,
}) => {
  const dialogRef = useModalA11y(open, onClose);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[99999] flex items-end lg:hidden">
      <div
        className="absolute inset-0 bg-black/75 backdrop-blur-md animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledById}
        tabIndex={-1}
        className="glass-panel relative flex max-h-[92svh] w-full flex-col rounded-t-[30px] border-white/12 animate-sheet-up"
      >
        {/* Grab handle */}
        <div className="flex shrink-0 justify-center pb-1 pt-3" aria-hidden="true">
          <span className="h-1 w-10 rounded-full bg-white/22" />
        </div>

        <div className="flex shrink-0 items-center justify-between gap-3 px-5 pb-3 pt-1">
          <h2 id={labelledById} className="font-syne text-[17px] font-extrabold text-white">
            {title}
          </h2>
          <button
            type="button"
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            aria-label="Close"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/[0.08] text-white/65 active:scale-90"
          >
            <X className="h-[18px] w-[18px]" aria-hidden="true" />
          </button>
        </div>

        <div
          className="scrollbar-none flex-1 overflow-y-auto overscroll-contain px-5"
          style={{ paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 1.5rem)" }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};
