import React, { useCallback, useEffect, useRef, useState } from "react";

interface LoadingScreenProps {
  onComplete: () => void;
}

const INTRO_SRC = `${import.meta.env.BASE_URL}media/vmavix-intro.mp4`;
const LOGO_WEBP = `${import.meta.env.BASE_URL}brand/mavixlogo.webp`;
const LOGO_PNG = `${import.meta.env.BASE_URL}brand/mavixlogo.png`;

/**
 * Cinematic intro.
 *
 * Mobile-critical detail: the video is 16:9 but phones are ~9:19.5, so
 * `object-cover` would crop the logo out of frame. Instead the video is
 * `object-contain` inside a centred stage on portrait screens, with the
 * aurora field filling the space around it. On landscape/desktop it covers.
 */
export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isFading, setIsFading] = useState(false);
  const [useFallback, setUseFallback] = useState(false);
  const [progress, setProgress] = useState(0);
  const finished = useRef(false);

  const finish = useCallback(() => {
    if (finished.current) return;
    finished.current = true;
    setIsFading(true);
    window.setTimeout(onComplete, 650);
  }, [onComplete]);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      const t = window.setTimeout(finish, 500);
      return () => window.clearTimeout(t);
    }

    const video = videoRef.current;
    if (video) {
      const attempt = video.play();
      if (attempt && typeof attempt.catch === "function") {
        attempt.catch(() => setUseFallback(true));
      }
    }

    const watchdog = window.setTimeout(finish, 11000);
    return () => window.clearTimeout(watchdog);
  }, [finish]);

  useEffect(() => {
    if (!useFallback) return;
    const t = window.setTimeout(finish, 2000);
    return () => window.clearTimeout(t);
  }, [useFallback, finish]);

  const onTimeUpdate = () => {
    const v = videoRef.current;
    if (!v?.duration) return;
    setProgress(Math.min(100, (v.currentTime / v.duration) * 100));
  };

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="VMAVIX intro"
      className={`fixed inset-0 z-[99999] overflow-hidden bg-ink transition-opacity duration-650 ease-out ${
        isFading ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      {/* Ambient field behind the video — fills the tall areas on phones */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[18%] h-[380px] w-[min(130vw,560px)] -translate-x-1/2 animate-aurora-1 rounded-full bg-[radial-gradient(circle,rgba(255,94,58,0.28),transparent_70%)] blur-[70px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[14%] left-1/2 h-[340px] w-[min(120vw,480px)] -translate-x-1/2 animate-aurora-2 rounded-full bg-[radial-gradient(circle,rgba(0,242,254,0.22),transparent_70%)] blur-[70px]"
      />

      <div className="relative flex h-full w-full items-center justify-center">
        {!useFallback ? (
          <video
            ref={videoRef}
            /* contain on portrait so the logo is never cropped; cover on wide screens */
            className="h-full w-full object-contain landscape:object-cover lg:object-cover"
            src={INTRO_SRC}
            muted
            autoPlay
            playsInline
            preload="auto"
            onEnded={finish}
            onTimeUpdate={onTimeUpdate}
            onError={() => setUseFallback(true)}
            onStalled={() => setUseFallback(true)}
          />
        ) : (
          <div className="flex animate-logo-reveal flex-col items-center px-6 text-center">
            <picture>
              <source srcSet={LOGO_WEBP} type="image/webp" />
              <img
                src={LOGO_PNG}
                alt="VMAVIX"
                width={420}
                height={214}
                className="w-[min(76vw,400px)] drop-shadow-[0_0_48px_rgba(255,94,58,0.38)]"
              />
            </picture>
            <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.34em] text-white/55">
              Design • Develop • Grow
            </p>
          </div>
        )}
      </div>

      {/* Vignette */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(5,5,8,0.75)_100%)]"
      />

      {/* Progress hairline */}
      {!useFallback && (
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-[2px] bg-white/8"
        >
          <div
            className="h-full bg-[linear-gradient(90deg,#ff5e3a,#ff2a85,#00f2fe)] transition-[width] duration-200 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      <button
        type="button"
        onClick={finish}
        className="absolute right-5 z-20 rounded-full border border-white/18 bg-black/45 px-5 py-2.5 font-mono text-[10px] uppercase tracking-[0.2em] text-white/70 backdrop-blur-md transition-colors active:scale-95"
        style={{ bottom: "calc(env(safe-area-inset-bottom, 0px) + 1.5rem)" }}
      >
        Skip
      </button>
    </div>
  );
};
