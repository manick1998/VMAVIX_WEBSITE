import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trailPos, setTrailPos] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable custom cursor on non-touch screens
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    setIsVisible(true);

    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });

      // Check hover interactive elements
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'BUTTON' ||
          target.tagName === 'A' ||
          target.closest('button') ||
          target.closest('a') ||
          target.classList.contains('cursor-pointer') ||
          target.getAttribute('role') === 'button')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseDown = () => setIsMouseDown(true);
    const handleMouseUp = () => setIsMouseDown(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  // Smooth trail effect
  useEffect(() => {
    if (!isVisible) return;
    let animationFrameId: number;

    const followCursor = () => {
      setTrailPos((prev) => {
        const dx = pos.x - prev.x;
        const dy = pos.y - prev.y;
        return {
          x: prev.x + dx * 0.18,
          y: prev.y + dy * 0.18
        };
      });
      animationFrameId = requestAnimationFrame(followCursor);
    };

    animationFrameId = requestAnimationFrame(followCursor);
    return () => cancelAnimationFrame(animationFrameId);
  }, [pos, isVisible]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {/* Precision Core Cursor Dot */}
      <div
        className={`fixed top-0 left-0 w-2.5 h-2.5 bg-white rounded-full transition-transform duration-75 ease-out shadow-[0_0_10px_#00F2FE] ${
          isMouseDown ? 'scale-150 bg-orange-500' : isHovering ? 'scale-125 bg-cyan-400' : ''
        }`}
        style={{
          transform: `translate3d(${pos.x - 5}px, ${pos.y - 5}px, 0)`
        }}
      />

      {/* Trailing Luxury Aurora Ring */}
      <div
        className={`fixed top-0 left-0 rounded-full border border-white/30 transition-all duration-300 ease-out flex items-center justify-center ${
          isHovering
            ? 'w-14 h-14 border-orange-500/80 bg-orange-500/10 backdrop-blur-[1px] shadow-[0_0_20px_rgba(255,94,58,0.4)]'
            : isMouseDown
            ? 'w-8 h-8 border-cyan-400 bg-cyan-400/20'
            : 'w-10 h-10 border-white/20'
        }`}
        style={{
          transform: `translate3d(${trailPos.x - (isHovering ? 28 : isMouseDown ? 16 : 20)}px, ${
            trailPos.y - (isHovering ? 28 : isMouseDown ? 16 : 20)
          }px, 0)`
        }}
      >
        {isHovering && (
          <div className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-ping" />
        )}
      </div>
    </div>
  );
};
