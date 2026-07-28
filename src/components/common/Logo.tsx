import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  animated?: boolean;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  showTagline = false,
  animated = true,
  className = ''
}) => {
  const sizeMap = {
    sm: { icon: 'w-6 h-6', text: 'text-lg', tagline: 'text-[9px]' },
    md: { icon: 'w-8 h-8', text: 'text-2xl', tagline: 'text-[10px]' },
    lg: { icon: 'w-12 h-12', text: 'text-4xl', tagline: 'text-[12px]' },
    xl: { icon: 'w-16 h-16', text: 'text-5xl', tagline: 'text-[14px]' }
  };

  const currentSize = sizeMap[size];

  return (
    <div className={`inline-flex items-center gap-3 select-none group cursor-pointer ${className}`}>
      {/* Dynamic Geometric VMAVIX Emblem */}
      <div className={`relative ${currentSize.icon} flex items-center justify-center`}>
        {/* Glow backdrop */}
        <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-orange-500 via-pink-500 to-cyan-400 opacity-60 blur-md group-hover:opacity-100 group-hover:blur-lg transition-all duration-500" />
        
        <svg
          viewBox="0 0 100 100"
          className="relative w-full h-full text-white overflow-visible"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="vmavix-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF5E3A" />
              <stop offset="50%" stopColor="#FF2A85" />
              <stop offset="100%" stopColor="#00F2FE" />
            </linearGradient>
            <linearGradient id="vmavix-grad-2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#00F2FE" />
              <stop offset="50%" stopColor="#9D4EDD" />
              <stop offset="100%" stopColor="#FF5E3A" />
            </linearGradient>
          </defs>

          {/* Outer futuristic diamond frame */}
          <rect
            x="8"
            y="8"
            width="84"
            height="84"
            rx="18"
            fill="#0A0A0E"
            stroke="url(#vmavix-grad-1)"
            strokeWidth="3.5"
            className={animated ? "transition-all duration-500 group-hover:stroke-cyan-400" : ""}
          />

          {/* VMAVIX Custom Intersecting Monogram 'V' & 'X' */}
          <path
            d="M 26 28 L 50 72 L 74 28"
            stroke="url(#vmavix-grad-1)"
            strokeWidth="7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M 36 34 L 64 66"
            stroke="url(#vmavix-grad-2)"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <circle cx="50" cy="50" r="4.5" fill="#FFFFFF" className={animated ? "animate-pulse" : ""} />
        </svg>
      </div>

      {/* Brand Text */}
      <div className="flex flex-col">
        <span className={`font-syne font-extrabold tracking-wider ${currentSize.text} leading-none text-white flex items-center gap-1`}>
          VMAVIX
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-orange-500 animate-ping" />
        </span>
        {showTagline && (
          <span className={`font-mono text-gray-400 ${currentSize.tagline} tracking-[0.2em] uppercase mt-1`}>
            Design • Develop • Grow
          </span>
        )}
      </div>
    </div>
  );
};
