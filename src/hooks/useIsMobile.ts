import { useEffect, useState } from "react";

/**
 * True when the viewport is phone-sized.
 *
 * Deliberately reads on mount (not during render) so SSR/hydration stays
 * consistent, and listens to the media query rather than resize events.
 */
export function useIsMobile(breakpoint = 1024): boolean {
  /**
   * Resolved synchronously on first render. This app is client-rendered
   * only, so there is no hydration mismatch to worry about — and reading
   * it up front matters: deferring to an effect made phones paint one
   * frame of the desktop layout (and the desktop intro) before switching.
   */
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia(`(max-width: ${breakpoint - 1}px)`).matches;
  });

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const update = () => setIsMobile(mq.matches);

    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [breakpoint]);

  return isMobile;
}

/** True when the OS asks for reduced motion. */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);

    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return reduced;
}
