import React from "react";
import { useReveal, type RevealVariant } from "../../hooks/useReveal";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  highlight?: string;
  copy?: string;
  align?: "left" | "center";
  variant?: RevealVariant;
}

/**
 * Shared mobile section header. Keeps vertical rhythm consistent
 * while each section still gets its own reveal animation.
 */
export const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  title,
  highlight,
  copy,
  align = "left",
  variant = "fade-up",
}) => {
  const ref = useReveal<HTMLDivElement>({ variant });
  const centered = align === "center";

  return (
    <div ref={ref} className={`mb-7 ${centered ? "text-center" : ""}`}>
      <div
        className={`mb-3.5 flex items-center gap-2.5 ${centered ? "justify-center" : ""}`}
      >
        <span className="h-px w-7 bg-gradient-to-r from-brand-orange to-brand-pink" />
        <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.24em] text-brand-orange">
          {eyebrow}
        </span>
      </div>

      <h2 className="font-syne text-[1.75rem] font-extrabold leading-[1.14] tracking-tight text-white">
        {title}
        {highlight && (
          <>
            {" "}
            <span className="text-gradient-aurora">{highlight}</span>
          </>
        )}
      </h2>

      {copy && (
        <p
          className={`mt-3.5 text-[13.5px] font-light leading-relaxed text-white/55 ${
            centered ? "mx-auto max-w-[22rem]" : "max-w-[23rem]"
          }`}
        >
          {copy}
        </p>
      )}
    </div>
  );
};
