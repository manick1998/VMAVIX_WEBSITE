import React, { useState } from "react";
import { Plus } from "lucide-react";
import { FAQ_ITEMS } from "../../data/vmavixData";
import { useReveal } from "../../hooks/useReveal";
import { soundManager } from "../../utils/audio";
import { SectionHeading } from "./SectionHeading";

export const MobileFAQ: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(FAQ_ITEMS[0]?.id ?? null);
  const listRef = useReveal<HTMLDivElement>({ variant: "stagger" });

  return (
    <section id="faq" className="relative overflow-hidden px-5 py-20">
      <SectionHeading
        eyebrow="Questions"
        title="Good to"
        highlight="know."
        align="center"
        variant="fade-up"
      />

      <div ref={listRef} className="flex flex-col gap-2.5">
        {FAQ_ITEMS.map((faq) => {
          const open = openId === faq.id;
          return (
            <div key={faq.id} className="card-float overflow-hidden">
              <button
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  setOpenId(open ? null : faq.id);
                }}
                aria-expanded={open}
                aria-controls={`m-faq-${faq.id}`}
                className="flex w-full items-center gap-3 p-4 text-left active:scale-[0.99]"
              >
                <span className="flex-1 font-syne text-[14px] font-bold leading-snug text-white">
                  {faq.question}
                </span>
                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-all duration-400 ${
                    open
                      ? "rotate-45 bg-[linear-gradient(120deg,#ff5e3a,#ff2a85)]"
                      : "bg-white/[0.07]"
                  }`}
                >
                  <Plus
                    className={`h-3.5 w-3.5 ${open ? "text-white" : "text-white/50"}`}
                    aria-hidden="true"
                  />
                </span>
              </button>

              <div
                id={`m-faq-${faq.id}`}
                className="grid transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
              >
                <div className="overflow-hidden">
                  <p className="border-t border-white/8 px-4 pb-4 pt-3.5 text-[13px] font-light leading-relaxed text-white/58">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
