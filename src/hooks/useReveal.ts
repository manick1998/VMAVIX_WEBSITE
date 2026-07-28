import { useEffect, useRef } from "react";

export type RevealVariant =
  | "fade-up"
  | "blur-in"
  | "scale-in"
  | "slide-left"
  | "slide-right"
  | "rotate-in"
  | "curtain"
  | "stagger";

interface RevealOptions {
  variant?: RevealVariant;
  /** Delay in ms before the reveal runs. */
  delay?: number;
  /**
   * Intentionally 0 by default.
   *
   * A ratio-based threshold breaks on tall elements: a 3000px list in an
   * 844px viewport can never exceed a ratio of ~0.28, so anything above
   * that would simply never fire. Triggering on first contact with a
   * slightly inset viewport is reliable at any height.
   */
  threshold?: number;
  /** Re-trigger every time it enters the viewport. */
  repeat?: boolean;
}

/**
 * Cinematic scroll reveal.
 *
 * Each section can pick a different `variant` so no two sections enter the
 * same way. The element starts with `data-reveal="<variant>"`; once it
 * intersects we add `data-revealed="true"` and CSS does the rest.
 *
 * Unobserves after firing (unless `repeat`) so there's zero ongoing cost.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>({
  variant = "fade-up",
  delay = 0,
  threshold = 0,
  repeat = false,
}: RevealOptions = {}) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.dataset.reveal = variant;
    if (delay) el.style.setProperty("--reveal-delay", `${delay}ms`);

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || typeof IntersectionObserver === "undefined") {
      el.dataset.revealed = "true";
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).dataset.revealed = "true";
            if (!repeat) io.unobserve(entry.target);
          } else if (repeat) {
            (entry.target as HTMLElement).dataset.revealed = "false";
          }
        });
      },
      { threshold, rootMargin: "0px 0px -12% 0px" }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [variant, delay, threshold, repeat]);

  return ref;
}
