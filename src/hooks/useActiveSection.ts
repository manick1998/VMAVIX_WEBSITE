import { useEffect, useState } from "react";

/**
 * Tracks which section is currently in view, plus whether the page has
 * scrolled past a threshold (used to condense the navbar).
 *
 * Uses a single rAF-throttled passive scroll listener, so scrolling stays
 * smooth instead of forcing a layout read on every scroll event.
 */
export function useActiveSection(
  sectionIds: readonly string[],
  scrolledThreshold = 40
) {
  const [activeSection, setActiveSection] = useState(sectionIds[0] ?? "");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;

    const measure = () => {
      ticking = false;
      const y = window.scrollY;
      setIsScrolled(y > scrolledThreshold);

      const probe = y + window.innerHeight * 0.32;
      let current = sectionIds[0] ?? "";

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (probe >= el.offsetTop) current = id;
      }

      // Pin the last section once we hit the bottom of the page.
      if (window.innerHeight + y >= document.body.offsetHeight - 80) {
        current = sectionIds[sectionIds.length - 1] ?? current;
      }

      setActiveSection(current);
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [sectionIds, scrolledThreshold]);

  return { activeSection, isScrolled };
}
