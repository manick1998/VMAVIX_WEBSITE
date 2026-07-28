import React, { useState, useEffect } from 'react';
import { Logo } from '../common/Logo';
import { Volume2, VolumeX, Menu, X, ArrowUpRight, Sparkles } from 'lucide-react';
import { soundManager } from '../../utils/audio';

interface NavbarProps {
  onOpenProjectModal: () => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenProjectModal, activeSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSound = () => {
    const muted = soundManager.toggleMute();
    setIsMuted(muted);
    if (!muted) {
      soundManager.playClick();
    }
  };

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Why Us', href: '#why-us' },
    { label: 'Work', href: '#portfolio' },
    { label: 'Process', href: '#process' },
    { label: 'Stack', href: '#tech-stack' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'FAQ', href: '#faq' }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-12 pt-4 transition-all duration-300">
      <nav
        className={`max-w-7xl mx-auto rounded-2xl transition-all duration-500 ${
          isScrolled
            ? 'glass-panel py-3 px-5 sm:px-8 border-white/15 shadow-[0_10px_40px_rgba(0,0,0,0.8)]'
            : 'bg-transparent py-4 px-2'
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            onClick={() => soundManager.playHover()}
            className="flex items-center group"
          >
            <Logo size="md" showTagline={false} />
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-1 bg-white/[0.03] border border-white/10 rounded-full px-4 py-1.5 backdrop-blur-md">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onMouseEnter={() => soundManager.playHover()}
                  onClick={() => soundManager.playClick()}
                  className={`px-3.5 py-1.5 text-xs font-medium rounded-full transition-all duration-300 ${
                    isActive
                      ? 'bg-gradient-to-r from-orange-500/20 to-pink-500/20 text-white border border-orange-500/40 shadow-[0_0_10px_rgba(255,94,58,0.2)]'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </div>

          {/* Right Action Cluster */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Status Pill */}
            <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              STATUS: OPERATIONAL
            </div>

            {/* Audio Toggle */}
            <button
              onClick={toggleSound}
              className="p-2.5 rounded-full bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:border-white/30 transition-all duration-300 flex items-center justify-center relative group"
              title={isMuted ? 'Enable Web Audio Effects' : 'Mute Sound Effects'}
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4 text-gray-400 group-hover:text-white" />
              ) : (
                <div className="flex items-center gap-1">
                  <Volume2 className="w-4 h-4 text-cyan-400" />
                  <span className="w-1 h-3 bg-cyan-400 rounded-full animate-pulse" />
                </div>
              )}
            </button>

            {/* Primary Action Button */}
            <button
              onClick={() => {
                soundManager.playClick();
                onOpenProjectModal();
              }}
              className="relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-xs text-white bg-gradient-to-r from-orange-500 via-pink-500 to-cyan-500 hover:opacity-95 shadow-[0_0_20px_rgba(255,94,58,0.3)] hover:shadow-[0_0_30px_rgba(0,242,254,0.5)] transition-all duration-300 transform hover:-translate-y-0.5 group overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-yellow-200 animate-spin" style={{ animationDuration: '4s' }} />
                Start Your Project
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={toggleSound}
              className="p-2 rounded-full bg-white/5 border border-white/10 text-gray-300"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
            </button>
            <button
              onClick={() => {
                soundManager.playClick();
                setIsMobileMenuOpen(!isMobileMenuOpen);
              }}
              className="p-2.5 rounded-xl bg-white/10 border border-white/15 text-white"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-4 top-20 z-50 glass-panel rounded-2xl p-6 border border-white/15 shadow-2xl backdrop-blur-2xl animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => {
                  soundManager.playClick();
                  setIsMobileMenuOpen(false);
                }}
                className="px-4 py-3 rounded-xl text-base font-medium text-gray-200 hover:text-white hover:bg-white/10 flex items-center justify-between transition-colors border border-transparent hover:border-white/10"
              >
                <span>{link.label}</span>
                <ArrowUpRight className="w-4 h-4 text-gray-500" />
              </a>
            ))}

            <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
              <button
                onClick={() => {
                  soundManager.playClick();
                  setIsMobileMenuOpen(false);
                  onOpenProjectModal();
                }}
                className="w-full py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-orange-500 via-pink-500 to-cyan-500 shadow-lg flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                Start Your Project
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
