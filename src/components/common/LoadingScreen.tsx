import React, { useEffect, useState } from 'react';
import { Logo } from './Logo';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsFading(true);
            setTimeout(onComplete, 800);
          }, 300);
          return 100;
        }
        const increment = Math.floor(Math.random() * 12) + 3;
        return Math.min(prev + increment, 100);
      });
    }, 60);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[99999] bg-[#050505] flex flex-col items-center justify-center transition-all duration-700 ease-in-out ${
        isFading ? 'opacity-0 pointer-events-none scale-105 blur-md' : 'opacity-100'
      }`}
    >
      {/* Background Aurora Glow */}
      <div className="absolute w-[500px] h-[500px] bg-gradient-to-tr from-orange-600/30 via-pink-600/20 to-cyan-500/20 rounded-full blur-[120px] animate-pulse-glow pointer-events-none" />

      {/* Main Loader Content */}
      <div className="relative z-10 flex flex-col items-center max-w-md w-full px-6 text-center">
        <Logo size="xl" showTagline={false} animated={true} className="mb-8 scale-110" />

        <p className="font-syne text-xl text-gray-300 font-medium mb-8 tracking-wide">
          Crafting Digital Excellence
        </p>

        {/* Progress Bar Container */}
        <div className="w-full bg-white/5 border border-white/10 rounded-full p-1 backdrop-blur-md mb-4 relative overflow-hidden shadow-[0_0_20px_rgba(255,94,58,0.2)]">
          <div
            className="h-2 rounded-full bg-gradient-to-r from-orange-500 via-pink-500 to-cyan-400 transition-all duration-200 ease-out shadow-[0_0_12px_#00F2FE]"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Percentage Counter & Status */}
        <div className="w-full flex items-center justify-between font-mono text-xs tracking-widest text-gray-400 uppercase">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            INITIALIZING
          </span>
          <span className="text-white font-bold text-sm tracking-normal font-mono">
            {progress}%
          </span>
        </div>
      </div>
    </div>
  );
};
