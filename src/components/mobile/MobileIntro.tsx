import React, { useCallback, useEffect, useRef, useState } from "react";

interface MobileIntroProps {
  onComplete: () => void;
}

const LOGO_WEBP = `${import.meta.env.BASE_URL}brand/mavixlogo.webp`;
const LOGO_PNG = `${import.meta.env.BASE_URL}brand/mavixlogo.png`;

/** Total runtime before the automatic hand-off to the homepage. */
const RUNTIME = 5200;
const FADE = 750;

/**
 * Portrait-native cinematic intro.
 *
 * The desktop build plays a 16:9 film. Letterboxing that into a ~9:19.5
 * phone leaves dead black bands top and bottom, so mobile gets this
 * instead: an edge-to-edge composition rendered live in canvas + CSS,
 * authored for a tall frame.
 *
 * Layers, back to front:
 *   1. canvas — aurora blooms, volumetric rays, drifting particle field
 *   2. circuit traces that draw themselves in
 *   3. logo bloom (blurred duplicate, breathing)
 *   4. logo
 *   5. specular sweep, masked to the logo so the crystals catch light
 *
 * Canvas and logo scale on separate curves, which parallaxes them apart
 * and gives the "start close, pull back, ease in" camera real depth.
 */
export const MobileIntro: React.FC<MobileIntroProps> = ({ onComplete }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [logoReady, setLogoReady] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const done = useRef(false);

  const finish = useCallback(() => {
    if (done.current) return;
    done.current = true;
    setLeaving(true);
    window.setTimeout(onComplete, FADE);
  }, [onComplete]);

  /* ---------------- auto-advance ---------------- */
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t = window.setTimeout(finish, reduced ? 900 : RUNTIME);
    return () => window.clearTimeout(t);
  }, [finish]);

  /* ---------------- living background ---------------- */
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let w = 0;
    let h = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    const rand = (a: number, b: number) => a + Math.random() * (b - a);

    /* Aurora blooms — placed for a tall frame, not a wide one. */
    const blooms = [
      { x: 0.5, y: 0.2, r: 0.85, hue: "255,94,58", drift: 0.00021, amp: 0.1, phase: 0 },
      { x: 0.2, y: 0.52, r: 0.72, hue: "157,78,221", drift: 0.00017, amp: 0.13, phase: 2.1 },
      { x: 0.82, y: 0.44, r: 0.68, hue: "0,242,254", drift: 0.00023, amp: 0.11, phase: 4.2 },
      { x: 0.5, y: 0.84, r: 0.8, hue: "255,42,133", drift: 0.00015, amp: 0.09, phase: 1.1 },
    ];

    /* Fine dust — the continuous float. */
    const dust = Array.from({ length: 54 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: rand(0.5, 1.7),
      vy: rand(-0.00016, -0.00005),
      vx: rand(-0.00004, 0.00004),
      a: rand(0.18, 0.7),
      tw: rand(0.0012, 0.0035),
      ph: rand(0, 6.28),
    }));

    /* Bokeh orbs — larger, slower, sit further back. */
    const bokeh = Array.from({ length: 7 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: rand(9, 26),
      vy: rand(-0.00009, -0.00003),
      a: rand(0.05, 0.13),
      hue: ["255,94,58", "0,242,254", "157,78,221", "255,42,133"][
        Math.floor(Math.random() * 4)
      ],
    }));

    /* Volumetric shafts falling through the frame. */
    const rays = [
      { x: 0.26, wide: 0.15, tilt: -0.2, a: 0.05, sp: 0.00035 },
      { x: 0.54, wide: 0.2, tilt: 0.12, a: 0.065, sp: 0.00026 },
      { x: 0.8, wide: 0.13, tilt: -0.09, a: 0.045, sp: 0.00042 },
    ];

    const t0 = performance.now();

    const frame = (now: number) => {
      const t = now - t0;
      ctx.clearRect(0, 0, w, h);

      ctx.globalCompositeOperation = "lighter";

      // Aurora
      for (const b of blooms) {
        const cx = (b.x + Math.sin(t * b.drift + b.phase) * b.amp) * w;
        const cy = (b.y + Math.cos(t * b.drift * 0.8 + b.phase) * b.amp * 0.6) * h;
        const rad = b.r * Math.max(w, h) * 0.62;
        const pulse = 0.55 + Math.sin(t * 0.0006 + b.phase) * 0.2;

        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, rad);
        g.addColorStop(0, `rgba(${b.hue},${0.2 * pulse})`);
        g.addColorStop(0.45, `rgba(${b.hue},${0.07 * pulse})`);
        g.addColorStop(1, `rgba(${b.hue},0)`);
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, w, h);
      }

      // Light shafts
      for (const r of rays) {
        const sway = Math.sin(t * r.sp) * 0.05;
        const x = (r.x + sway) * w;
        const halfW = r.wide * w * 0.5;
        const g = ctx.createLinearGradient(x, 0, x + r.tilt * w, h);
        g.addColorStop(0, `rgba(255,255,255,${r.a})`);
        g.addColorStop(0.45, `rgba(200,225,255,${r.a * 0.35})`);
        g.addColorStop(1, "rgba(255,255,255,0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.moveTo(x - halfW, 0);
        ctx.lineTo(x + halfW, 0);
        ctx.lineTo(x + halfW * 2.4 + r.tilt * w, h);
        ctx.lineTo(x - halfW * 2.4 + r.tilt * w, h);
        ctx.closePath();
        ctx.fill();
      }

      // Bokeh
      for (const o of bokeh) {
        o.y += o.vy;
        if (o.y < -0.1) o.y = 1.1;
        const cx = o.x * w;
        const cy = o.y * h;
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, o.r);
        g.addColorStop(0, `rgba(${o.hue},${o.a})`);
        g.addColorStop(1, `rgba(${o.hue},0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(cx, cy, o.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Dust
      for (const p of dust) {
        p.y += p.vy;
        p.x += p.vx;
        if (p.y < -0.02) p.y = 1.02;
        if (p.x < -0.02) p.x = 1.02;
        if (p.x > 1.02) p.x = -0.02;

        const tw = 0.55 + Math.sin(t * p.tw + p.ph) * 0.45;
        ctx.fillStyle = `rgba(255,255,255,${p.a * tw})`;
        ctx.beginPath();
        ctx.arc(p.x * w, p.y * h, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalCompositeOperation = "source-over";
      raf = requestAnimationFrame(frame);
    };

    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="VMAVIX intro"
      className="fixed inset-0 z-[99999] overflow-hidden bg-[#04040a] transition-opacity duration-[750ms] ease-out"
      style={{ opacity: leaving ? 0 : 1, pointerEvents: leaving ? "none" : "auto" }}
    >
      {/* 1 — living background, on its own camera curve */}
      <div className="absolute inset-0 intro-cam-bg">
        <canvas ref={canvasRef} className="h-full w-full" />
      </div>

      {/* base wash so the frame is never flat black */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_45%_at_50%_42%,rgba(90,40,120,0.24),transparent_70%)]"
      />

      {/* 2 — logo stage, closer camera curve for parallax */}
      <div className="absolute inset-0 flex items-center justify-center intro-cam-fg">
        {/*
          68vw base. The foreground camera dips to 0.98x mid-move and settles
          at 1.08x, so on-screen width travels ~67% -> ~73% — the whole range
          sits inside the 65–75% target. Capped in px so it never oversizes.
        */}
        <div
          className="relative"
          style={{ width: "min(68vw, 390px)", opacity: logoReady ? 1 : 0 }}
        >
          {/* circuit traces */}
          <svg
            aria-hidden="true"
            viewBox="0 0 400 260"
            className="pointer-events-none absolute left-1/2 top-1/2 w-[190%] -translate-x-1/2 -translate-y-1/2"
            fill="none"
          >
            <g
              className="intro-circuit"
              stroke="url(#introTrace)"
              strokeWidth="1"
              strokeLinecap="round"
            >
              <path d="M20 130 H88 L104 114 H150" />
              <path d="M380 130 H312 L296 146 H250" />
              <path d="M60 60 H120 L136 76" />
              <path d="M340 200 H280 L264 184" />
              <path d="M40 196 H96 L112 180 H146" />
              <path d="M360 64 H304 L288 80 H254" />
            </g>
            <g className="intro-node" fill="#00f2fe">
              <circle cx="20" cy="130" r="2.5" />
              <circle cx="380" cy="130" r="2.5" />
              <circle cx="60" cy="60" r="2" />
              <circle cx="340" cy="200" r="2" />
              <circle cx="40" cy="196" r="2" />
              <circle cx="360" cy="64" r="2" />
            </g>
            <defs>
              <linearGradient id="introTrace" x1="0" y1="0" x2="400" y2="260">
                <stop offset="0%" stopColor="#ff5e3a" stopOpacity="0.9" />
                <stop offset="50%" stopColor="#ff2a85" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#00f2fe" stopOpacity="0.9" />
              </linearGradient>
            </defs>
          </svg>

          {/* 3 — bloom behind the mark */}
          <img
            src={LOGO_WEBP}
            alt=""
            aria-hidden="true"
            className="intro-bloom pointer-events-none absolute inset-0 h-full w-full"
          />

          {/* 4 — the mark */}
          <picture>
            <source srcSet={LOGO_WEBP} type="image/webp" />
            <img
              src={LOGO_PNG}
              alt="VMAVIX — Design, Develop, Grow"
              width={1200}
              height={611}
              fetchPriority="high"
              decoding="sync"
              onLoad={() => setLogoReady(true)}
              onError={() => setLogoReady(true)}
              className="intro-logo relative block w-full"
            />
          </picture>

          {/* 5 — specular sweep, masked to the artwork */}
          <span
            aria-hidden="true"
            className="intro-shine pointer-events-none absolute inset-0"
            style={{
              WebkitMaskImage: `url(${LOGO_WEBP})`,
              maskImage: `url(${LOGO_WEBP})`,
            }}
          />

          {/* travelling lens flare */}
          <span aria-hidden="true" className="intro-flare pointer-events-none absolute" />
        </div>
      </div>

      {/* cinematic vignette */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_38%,rgba(4,4,10,0.82)_100%)]"
      />

      {/* premium skip */}
      <button
        type="button"
        onClick={finish}
        className="absolute left-1/2 z-20 flex min-h-[48px] -translate-x-1/2 items-center justify-center rounded-full border border-white/18 bg-white/[0.07] px-8 py-3.5 font-mono text-[10px] uppercase tracking-[0.3em] text-white/75 shadow-[0_8px_28px_-10px_rgba(0,0,0,0.9),inset_0_1px_0_rgba(255,255,255,0.16)] backdrop-blur-xl transition-transform duration-300 active:scale-95"
        style={{ bottom: "calc(env(safe-area-inset-bottom, 0px) + 2.25rem)" }}
      >
        Skip
      </button>

      {/* progress hairline */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-[2px] bg-white/[0.06]"
      >
        <div
          className="intro-progress h-full bg-[linear-gradient(90deg,#ff5e3a,#ff2a85,#9d4edd,#00f2fe)]"
          style={{ animationDuration: `${RUNTIME}ms` }}
        />
      </div>
    </div>
  );
};
