import { useCallback, useRef } from "react";

/**
 * 3D tilt + lift for cards.
 *
 * Works with both pointer (desktop hover) and touch (press). Everything is
 * written to CSS custom properties and applied with a single transform, so
 * it stays on the compositor and holds 60 FPS.
 */
export function useTilt<T extends HTMLElement = HTMLDivElement>(max = 8) {
  const ref = useRef<T | null>(null);
  const frame = useRef<number | null>(null);

  const apply = useCallback(
    (rx: number, ry: number, lift: number, scale: number) => {
      if (frame.current) cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(() => {
        const el = ref.current;
        if (!el) return;
        el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(${lift}px) scale(${scale})`;
      });
    },
    []
  );

  const reset = useCallback(() => {
    if (frame.current) cancelAnimationFrame(frame.current);
    const el = ref.current;
    if (!el) return;
    el.style.transform = "";
  }, []);

  const onPointerMove = useCallback(
    (e: React.PointerEvent<T>) => {
      if (e.pointerType === "touch") return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const el = ref.current;
      if (!el) return;

      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;

      apply(-py * max, px * max, -6, 1.015);
    },
    [apply, max]
  );

  const onTouchStart = useCallback(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    apply(0, 0, -3, 0.985);
  }, [apply]);

  return {
    ref,
    tiltProps: {
      onPointerMove,
      onPointerLeave: reset,
      onTouchStart,
      onTouchEnd: reset,
      onTouchCancel: reset,
    },
  };
}
