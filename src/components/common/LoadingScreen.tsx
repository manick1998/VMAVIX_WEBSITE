import React, { useCallback, useEffect, useRef, useState } from "react";

interface LoadingScreenProps {
  onComplete: () => void;
}

const INTRO_SRC = `${import.meta.env.BASE_URL}media/vmavix-intro.mp4`;
const LOGO_SRC = `${import.meta.env.BASE_URL}brand/mavixlogo.webp`;

/**
 * Cinematic intro: plays the VMAVIX animated logo video, then fades into the site.
 *
 * Safeguards, because autoplay is not guaranteed:
 *  - muted + playsInline so mobile browsers allow autoplay
 *  - falls back to a static logo if the video errors or can't play
 *  - a hard 11s watchdog guarantees the site always appears
 *  - honours prefers-reduced-motion by skipping straight through
 *  - Skip button, always available
 */
export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isFading, setIsFading] = useState(false);
  const [useFallback, setUseFallback] = useState(false);
  const finished = useRef(false);

  const finish = useCallback(() => {
    if (finished.current) return;
    finished.current = true;
    setIsFading(true);
    window.setTimeout(onComplete, 700);
  }, [onComplete]);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      const t = window.setTimeout(finish, 600);
      return () => window.clearTimeout(t);
    }

    const video = videoRef.current;
    if (video) {
      const attempt = video.play();
      if (attempt && typeof attempt.catch === "function") {
        attempt.catch(() => setUseFallback(true));
      }
    }

    // Watchdog: never trap the user on the splash.
    const watchdog = window.setTimeout(finish, 11000);
    return () => window.clearTimeout(watchdog);
  }, [finish]);

  // Fallback path auto-advances after a short beat.
  useEffect(() => {
    if (!useFallback) return;
    const t = window.setTimeout(finish, 2200);
    return () => window.clearTimeout(t);
  }, [useFallback, finish]);

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="VMAVIX intro loading"
      className={`fixed inset-0 z-[99999] bg-ink flex flex-col items-center justify-center overflow-hidden transition-opacity duration-700 ease-out ${
        isFading ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {!useFallback ? (
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          src={INTRO_SRC}
          muted
          autoPlay
          playsInline
          preload="auto"
          onEnded={finish}
          onError={() => setUseFallback(true)}
          onStalled={() => setUseFallback(true)}
        />
      ) : (
        <div className="relative z-10 flex flex-col items-center px-6 text-center animate-fade-in">
          <div className="absolute h-[420px] w-[420px] rounded-full bg-gradient-to-tr from-brand-orange/25 via-brand-pink/20 to-brand-cyan/20 blur-[120px]" />
          <img
            src={LOGO_SRC}
            alt="VMAVIX"
            width={420}
            height={223}
            className="relative w-[min(78vw,420px)] drop-shadow-[0_0_45px_rgba(255,94,58,0.35)]"
          />
          <p className="relative mt-6 font-mono text-[11px] uppercase tracking-[0.35em] text-white/60">
            Design • Develop • Grow
          </p>
        </div>
      )}

      {/* Cinematic letterbox + vignette */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink/60 via-transparent to-ink/80" />

      <button
        type="button"
        onClick={finish}
        className="absolute bottom-8 right-6 z-20 rounded-full border border-white/20 bg-black/40 px-5 py-2.5 font-mono text-[11px] uppercase tracking-widest text-white/70 backdrop-blur-md transition-colors hover:border-white/50 hover:text-white sm:bottom-10 sm:right-10"
      >
        Skip intro
      </button>
    </div>
  );
};
