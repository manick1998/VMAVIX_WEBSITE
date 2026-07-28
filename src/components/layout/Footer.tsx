import React, { useState, useEffect } from 'react';
import { Logo } from '../common/Logo';
import { ArrowUpRight, CheckCircle2, Send } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundManager } from '../../utils/audio';

interface FooterProps {
  onOpenProjectModal: () => void;
  onOpenLegalModal: (title: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenProjectModal, onOpenLegalModal }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [times, setTimes] = useState({
    sf: '',
    london: '',
    dubai: '',
    tokyo: ''
  });

  useEffect(() => {
    const updateClocks = () => {
      const now = new Date();
      setTimes({
        sf: now.toLocaleTimeString('en-US', { timeZone: 'America/Los_Angeles', hour: '2-digit', minute: '2-digit' }),
        london: now.toLocaleTimeString('en-GB', { timeZone: 'Europe/London', hour: '2-digit', minute: '2-digit' }),
        dubai: now.toLocaleTimeString('en-US', { timeZone: 'Asia/Dubai', hour: '2-digit', minute: '2-digit' }),
        tokyo: now.toLocaleTimeString('ja-JP', { timeZone: 'Asia/Tokyo', hour: '2-digit', minute: '2-digit' })
      });
    };

    updateClocks();
    const interval = setInterval(updateClocks, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    soundManager.playSuccess();
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.8 }
    });
    setSubscribed(true);
    setNewsletterEmail('');
  };

  return (
    <footer className="bg-[#030305] pt-20 pb-12 border-t border-white/10 relative overflow-hidden text-gray-400 font-light text-xs sm:text-sm">
      {/* Glow Mesh */}
      <div className="absolute bottom-0 right-0 w-[600px] h-[400px] bg-gradient-to-tl from-orange-600/10 via-pink-600/10 to-transparent blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-6">
            <Logo size="lg" showTagline={true} />

            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              VMAVIX is an award-winning digital technology and brand engineering studio building luxury web experiences, software products, and performance growth engines.
            </p>

            {/* Newsletter Form */}
            <div className="pt-2">
              <span className="font-mono text-[11px] text-gray-300 font-bold uppercase tracking-wider block mb-2">
                JOIN THE VMAVIX INTELLIGENCE DISPATCH
              </span>
              {subscribed ? (
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" /> You're subscribed to elite digital insights.
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter your work email..."
                    className="bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 flex-1"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-pink-500 text-white font-bold hover:shadow-lg transition-all"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="lg:col-span-2 space-y-3">
            <span className="font-mono text-xs font-bold text-white uppercase tracking-wider block mb-4">
              NAVIGATION
            </span>
            {[
              { label: 'About VMAVIX', href: '#about' },
              { label: 'Capabilities', href: '#services' },
              { label: 'Why VMAVIX', href: '#why-us' },
              { label: 'Portfolio', href: '#portfolio' },
              { label: 'Process', href: '#process' },
              { label: 'Tech Stack', href: '#tech-stack' },
              { label: 'Pricing', href: '#pricing' },
              { label: 'FAQ', href: '#faq' }
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => soundManager.playClick()}
                className="block text-gray-400 hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Services Column */}
          <div className="lg:col-span-3 space-y-3">
            <span className="font-mono text-xs font-bold text-white uppercase tracking-wider block mb-4">
              SERVICES
            </span>
            {[
              'Website Design & UI/UX',
              'Website Engineering',
              'E-Commerce Platforms',
              'Business & Enterprise Web',
              'Logo & Graphic Design',
              'Master Brand Identity',
              'Search Engine Optimization',
              'AI Solutions & Automation'
            ].map((service) => (
              <a
                key={service}
                href="#services"
                onClick={() => soundManager.playClick()}
                className="block text-gray-400 hover:text-white transition-colors text-xs"
              >
                {service}
              </a>
            ))}
          </div>

          {/* Global Offices & Live Time Column */}
          <div className="lg:col-span-3 space-y-4">
            <span className="font-mono text-xs font-bold text-white uppercase tracking-wider block mb-4">
              GLOBAL PRESENCE
            </span>

            <div className="space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.02] border border-white/5">
                <span className="text-gray-300">San Francisco, USA</span>
                <span className="text-cyan-400">{times.sf || '09:00 AM'}</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.02] border border-white/5">
                <span className="text-gray-300">London, UK</span>
                <span className="text-cyan-400">{times.london || '17:00 PM'}</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.02] border border-white/5">
                <span className="text-gray-300">Dubai, UAE</span>
                <span className="text-cyan-400">{times.dubai || '20:00 PM'}</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.02] border border-white/5">
                <span className="text-gray-300">Tokyo, Japan</span>
                <span className="text-cyan-400">{times.tokyo || '02:00 AM'}</span>
              </div>
            </div>

            <button
              onClick={() => {
                soundManager.playClick();
                onOpenProjectModal();
              }}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-orange-500/20 to-pink-500/20 border border-orange-500/40 text-orange-400 font-bold text-xs flex items-center justify-center gap-2 hover:bg-orange-500 hover:text-white transition-all"
            >
              <span>Schedule Direct Consultation</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500 font-mono">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} VMAVIX LLC. All Rights Reserved.</span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline text-gray-400">Design • Develop • Grow</span>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => onOpenLegalModal('Privacy Policy')}
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => onOpenLegalModal('Terms of Service')}
              className="hover:text-white transition-colors"
            >
              Terms of Service
            </button>
            <button
              onClick={() => onOpenLegalModal('Security & SOC-2')}
              className="hover:text-white transition-colors"
            >
              Security
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
