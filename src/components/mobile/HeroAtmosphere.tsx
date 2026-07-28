import React, { useEffect, useRef } from "react";

/**
 * The living backdrop behind the mobile hero.
 *
 * Everything is drawn on a single canvas at capped DPR so the whole
 * atmosphere costs one compositor layer instead of a dozen blurred DOM
 * nodes — that's what keeps it at 60fps on mid-range Android.
 *
 * Layers: aurora blooms -> light beams -> bokeh -> particles -> grain.
 */
export const HeroAtmosphere: React.FC = () => {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let raf = 0;
    let w = 0;
    let h = 0;
    let dpr = 1;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    let resizeTimer = 0;
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(resize, 140);
    };
    window.addEventListener("resize", onResize, { passive: true });

    const rnd = (a: number, b: number) => a + Math.random() * (b - a);

    /* Aurora blooms — tuned for a tall frame. */
    const blooms = [
      { x: 0.5, y: 0.12, r: 0.95, c: "255,94,58", d: 0.00019, a: 0.11, p: 0.0 },
      { x: 0.14, y: 0.42, r: 0.8, c: "157,78,221", d: 0.00015, a: 0.14, p: 2.3 },
      { x: 0.88, y: 0.34, r: 0.75, c: "0,242,254", d: 0.00021, a: 0.12, p: 4.1 },
      { x: 0.52, y: 0.78, r: 0.9, c: "255,42,133", d: 0.00013, a: 0.1, p: 1.4 },
    ];

    /* Volumetric beams falling through the frame. */
    const beams = [
      { x: 0.22, w: 0.16, tilt: -0.18, a: 0.04, s: 0.00031 },
      { x: 0.56, w: 0.22, tilt: 0.1, a: 0.052, s: 0.00023 },
      { x: 0.84, w: 0.14, tilt: -0.08, a: 0.036, s: 0.00038 },
    ];

    const HUES = ["255,94,58", "0,242,254", "157,78,221", "255,42,133"];

    /* Soft out-of-focus orbs, sitting well back. */
    const bokeh = Array.from({ length: 6 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: rnd(14, 40),
      vy: rnd(-0.00008, -0.000025),
      a: rnd(0.04, 0.1),
      c: HUES[Math.floor(Math.random() * HUES.length)],
    }));

    /* Fine drifting particles — the continuous life. */
    const dust = Array.from({ length: 46 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: rnd(0.5, 1.6),
      vy: rnd(-0.00015, -0.00004),
      vx: rnd(-0.00004, 0.00004),
      a: rnd(0.16, 0.62),
      tw: rnd(0.0011, 0.0031),
      p: rnd(0, Math.PI * 2),
    }));

    /* Pre-render grain once; re-tiling a cached pattern is far cheaper
       than generating noise every frame. */
    const grain = document.createElement("canvas");
    grain.width = grain.height = 88;
    const gctx = grain.getContext("2d");
    if (gctx) {
      const img = gctx.createImageData(88, 88);
      for (let i = 0; i < img.data.length; i += 4) {
        const v = 120 + Math.random() * 135;
        img.data[i] = img.data[i + 1] = img.data[i + 2] = v;
        img.data[i + 3] = 9;
      }
      gctx.putImageData(img, 0, 0);
    }
    const grainPattern = ctx.createPattern(grain, "repeat");

    const t0 = performance.now();

    const draw = (now: number) => {
      const t = reduced ? 0 : now - t0;
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";

      for (const b of blooms) {
        const cx = (b.x + Math.sin(t * b.d + b.p) * b.a) * w;
        const cy = (b.y + Math.cos(t * b.d * 0.75 + b.p) * b.a * 0.5) * h;
        const rad = b.r * Math.max(w, h) * 0.6;
        const pulse = 0.6 + Math.sin(t * 0.00055 + b.p) * 0.22;
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, rad);
        g.addColorStop(0, `rgba(${b.c},${0.17 * pulse})`);
        g.addColorStop(0.45, `rgba(${b.c},${0.06 * pulse})`);
        g.addColorStop(1, `rgba(${b.c},0)`);
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, w, h);
      }

      for (const bm of beams) {
        const sway = Math.sin(t * bm.s) * 0.045;
        const x = (bm.x + sway) * w;
        const half = bm.w * w * 0.5;
        const g = ctx.createLinearGradient(x, 0, x + bm.tilt * w, h);
        g.addColorStop(0, `rgba(255,255,255,${bm.a})`);
        g.addColorStop(0.45, `rgba(198,224,255,${bm.a * 0.32})`);
        g.addColorStop(1, "rgba(255,255,255,0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.moveTo(x - half, 0);
        ctx.lineTo(x + half, 0);
        ctx.lineTo(x + half * 2.3 + bm.tilt * w, h);
        ctx.lineTo(x - half * 2.3 + bm.tilt * w, h);
        ctx.closePath();
        ctx.fill();
      }

      for (const o of bokeh) {
        if (!reduced) {
          o.y += o.vy;
          if (o.y < -0.12) o.y = 1.12;
        }
        const cx = o.x * w;
        const cy = o.y * h;
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, o.r);
        g.addColorStop(0, `rgba(${o.c},${o.a})`);
        g.addColorStop(1, `rgba(${o.c},0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(cx, cy, o.r, 0, Math.PI * 2);
        ctx.fill();
      }

      for (const p of dust) {
        if (!reduced) {
          p.y += p.vy;
          p.x += p.vx;
          if (p.y < -0.02) p.y = 1.02;
          if (p.x < -0.02) p.x = 1.02;
          if (p.x > 1.02) p.x = -0.02;
        }
        const tw = 0.55 + Math.sin(t * p.tw + p.p) * 0.45;
        ctx.fillStyle = `rgba(255,255,255,${p.a * tw})`;
        ctx.beginPath();
        ctx.arc(p.x * w, p.y * h, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalCompositeOperation = "source-over";
      if (grainPattern) {
        ctx.fillStyle = grainPattern;
        ctx.fillRect(0, 0, w, h);
      }

      if (!reduced) raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);

    /* Pause when the hero scrolls away — no point burning frames offscreen. */
    let visible = true;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !visible) {
          visible = true;
          if (!reduced) raf = requestAnimationFrame(draw);
        } else if (!e.isIntersecting && visible) {
          visible = false;
          cancelAnimationFrame(raf);
        }
      },
      { threshold: 0 }
    );
    io.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", onResize);
      window.clearTimeout(resizeTimer);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
};
