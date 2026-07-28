import React, { useCallback, useRef } from "react";
import { soundManager } from "../../utils/audio";

type Variant = "primary" | "glass" | "outline" | "whatsapp";

interface TouchButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> {
  variant?: Variant;
  fullWidth?: boolean;
  href?: string;
  external?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}

const BASE =
  "relative overflow-hidden inline-flex items-center justify-center gap-2.5 rounded-full font-bold " +
  "px-7 py-4 text-sm min-h-[52px] select-none " +
  "transition-[transform,box-shadow,background-color] duration-300 " +
  "active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-brand-cyan " +
  "touch-manipulation";

const VARIANTS: Record<Variant, string> = {
  primary:
    "text-white bg-[linear-gradient(110deg,#ff5e3a,#ff2a85,#9d4edd,#00f2fe)] bg-[length:200%_100%] " +
    "shadow-[0_10px_34px_-10px_rgba(255,60,120,0.75)] hover:bg-[position:100%_0] hover:shadow-[0_14px_44px_-8px_rgba(255,60,120,0.9)]",
  glass:
    "text-white bg-white/[0.07] border border-white/15 backdrop-blur-xl " +
    "shadow-[inset_0_1px_0_rgba(255,255,255,0.14)] hover:bg-white/[0.12] hover:border-white/30",
  outline:
    "text-white/85 border border-white/20 hover:text-white hover:border-white/45 hover:bg-white/[0.06]",
  whatsapp:
    "text-white bg-[linear-gradient(135deg,#25D366,#128C7E)] " +
    "shadow-[0_10px_30px_-10px_rgba(37,211,102,0.8)] hover:shadow-[0_14px_38px_-8px_rgba(37,211,102,0.95)]",
};

/**
 * Premium touch button: gradient sheen, luxury ripple, tactile press.
 * Renders as <a> when `href` is given, otherwise <button>.
 */
export const TouchButton: React.FC<TouchButtonProps> = ({
  variant = "primary",
  fullWidth = false,
  href,
  external,
  onClick,
  children,
  className = "",
  ...rest
}) => {
  const rippleHost = useRef<HTMLSpanElement | null>(null);

  const spawnRipple = useCallback((clientX: number, clientY: number) => {
    const host = rippleHost.current;
    if (!host) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const r = host.getBoundingClientRect();
    const size = Math.max(r.width, r.height) * 2.2;

    const dot = document.createElement("span");
    dot.className = "vx-ripple";
    dot.style.width = dot.style.height = `${size}px`;
    dot.style.left = `${clientX - r.left - size / 2}px`;
    dot.style.top = `${clientY - r.top - size / 2}px`;

    host.appendChild(dot);
    window.setTimeout(() => dot.remove(), 620);
  }, []);

  const handle = useCallback(
    (e: React.MouseEvent) => {
      spawnRipple(e.clientX, e.clientY);
      soundManager.playClick();
      onClick?.();
    },
    [onClick, spawnRipple]
  );

  const cls = `${BASE} ${VARIANTS[variant]} ${fullWidth ? "w-full" : ""} ${className}`;

  const inner = (
    <>
      <span
        ref={rippleHost}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden rounded-full"
      />
      <span className="relative z-10 inline-flex items-center gap-2.5">{children}</span>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        onClick={handle}
        onMouseEnter={() => soundManager.playHover()}
        className={cls}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {inner}
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={handle}
      onMouseEnter={() => soundManager.playHover()}
      className={cls}
      {...rest}
    >
      {inner}
    </button>
  );
};
