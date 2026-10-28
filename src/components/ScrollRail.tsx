'use client';

import React, { useEffect, useState } from 'react';
import { content } from '@/content';

export default function ScrollRail() {
  const [activeSection, setActiveSection] = useState<string>('hello');
  const [frameNumber, setFrameNumber] = useState<number>(1);
  const totalFrames = 360;

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? Math.min(Math.max(scrollY / maxScroll, 0), 1) : 0;
      const currentFrame = Math.max(1, Math.min(Math.floor(progress * totalFrames), totalFrames));
      setFrameNumber(currentFrame);

      // Section detection
      const sections = content.navigation.map((item) => item.targetId);
      const viewportCenter = window.scrollY + window.innerHeight * 0.4;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          const top = rect.top + window.scrollY;
          if (viewportCenter >= top) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const formattedFrame = `FR ${frameNumber.toString().padStart(4, '0')} / 0360`;

  return (
    <aside
      aria-label="Navigation rail"
      className="hidden lg:flex fixed right-6 top-1/2 -translate-y-1/2 z-40 flex-col items-end gap-6 pointer-events-none"
    >
      {/* Frame Counter Readout */}
      <div className="font-mono text-[10px] uppercase tracking-micro text-ink/60 bg-cream-light/90 px-2 py-1 rounded border border-ink/10 shadow-sm pointer-events-auto backdrop-blur-sm">
        <span className="text-accent font-semibold">{formattedFrame}</span>
      </div>

      {/* Rail Navigation Dots */}
      <nav className="flex flex-col items-end gap-4 pointer-events-auto py-2">
        {content.navigation.map((item) => {
          const isActive = activeSection === item.targetId;
          return (
            <button
              key={item.targetId}
              onClick={() => scrollTo(item.targetId)}
              className="group flex items-center gap-3 text-right focus:outline-none"
              aria-label={`Scroll to ${item.label}`}
            >
              {/* Label */}
              <span
                className={`font-mono text-[10px] tracking-micro uppercase transition-colors duration-200 ${
                  isActive
                    ? 'text-accent font-semibold'
                    : 'text-ink/40 group-hover:text-ink/80'
                }`}
              >
                {item.label}
              </span>

              {/* Dot */}
              <div
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 flex items-center justify-center ${
                  isActive
                    ? 'bg-accent ring-4 ring-accent/20 scale-125'
                    : 'bg-ink/20 group-hover:bg-ink/50 group-hover:scale-110'
                }`}
              >
                {isActive && (
                  <span className="w-1 h-1 rounded-full bg-white" />
                )}
              </div>
            </button>
          );
        })}
      </nav>

      {/* Scroll Down Hint */}
      <div className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-micro text-ink/40 pt-2 pointer-events-auto">
        <span>SCROLL</span>
        <span className="text-accent animate-bounce">↓</span>
      </div>
    </aside>
  );
}
