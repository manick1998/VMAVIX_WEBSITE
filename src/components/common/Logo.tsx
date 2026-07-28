import React from "react";

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  showTagline?: boolean;
  className?: string;
  priority?: boolean;
}

const SIZES = {
  sm: { w: 118, h: 63, tag: "text-[8px]" },
  md: { w: 150, h: 80, tag: "text-[9px]" },
  lg: { w: 210, h: 111, tag: "text-[10px]" },
  xl: { w: 300, h: 159, tag: "text-[12px]" },
} as const;

const LOGO_WEBP = `${import.meta.env.BASE_URL}brand/mavixlogo.webp`;
const LOGO_PNG = `${import.meta.env.BASE_URL}brand/mavixlogo.png`;

/**
 * Brand logo — renders the real mavixlogo artwork.
 * WebP with a PNG fallback, explicit dimensions to avoid layout shift.
 */
export const Logo: React.FC<LogoProps> = ({
  size = "md",
  showTagline = false,
  className = "",
  priority = false,
}) => {
  const s = SIZES[size];

  return (
    <span className={`inline-flex flex-col ${className}`}>
      <picture>
        <source srcSet={LOGO_WEBP} type="image/webp" />
        <img
          src={LOGO_PNG}
          alt="VMAVIX"
          width={s.w}
          height={s.h}
          loading={priority ? "eager" : "lazy"}
          decoding={priority ? "sync" : "async"}
          fetchPriority={priority ? "high" : "auto"}
          style={{ width: s.w, height: "auto" }}
          className="block select-none drop-shadow-[0_0_18px_rgba(255,94,58,0.22)]"
        />
      </picture>

      {showTagline && (
        <span
          className={`mt-1.5 font-mono ${s.tag} uppercase tracking-[0.28em] text-white/50`}
        >
          Design • Develop • Grow
        </span>
      )}
    </span>
  );
};
