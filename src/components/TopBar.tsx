'use client';

import React from 'react';
import { content } from '@/content';

export default function TopBar() {
  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    const target = document.getElementById('start');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 py-4 sm:py-6 pointer-events-none">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 xl:px-16 flex items-center justify-between pointer-events-auto">
        {/* Wordmark & Location */}
        <div className="flex items-center gap-3">
          <a
            href="#hello"
            className="group flex items-center gap-2.5 pl-1 py-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-lg"
          >
            <span className="font-heading font-extrabold text-2xl sm:text-3xl tracking-normal text-ink select-none inline-block">
              {content.studio.name}
            </span>
            <span className="inline-block w-2 h-2 rounded-full bg-accent group-hover:scale-125 transition-transform" />
          </a>

          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cream-border text-[10px] font-mono tracking-micro text-ink/70 uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>JAIPUR, IN</span>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex items-center gap-3">
          <a
            href="#start"
            onClick={scrollToContact}
            className="inline-flex items-center justify-center px-5 sm:px-6 py-2.5 rounded-pill bg-[#0E1726] hover:bg-[#1A2536] text-white text-xs sm:text-sm font-medium tracking-wide shadow-card hover:shadow-cardHover transition-all transform active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <span>Get in touch</span>
            <svg
              className="ml-2 w-3.5 h-3.5 text-accent"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </div>
      </div>
    </header>
  );
}
