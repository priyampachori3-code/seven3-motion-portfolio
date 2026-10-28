'use client';

import React, { useEffect, useState } from 'react';
import { content, ServiceItem } from '@/content';

interface ServicesSectionProps {
  activeServiceIndex: number;
  onServiceSelect: (index: number) => void;
}

export default function ServicesSection({
  activeServiceIndex,
  onServiceSelect,
}: ServicesSectionProps) {
  const [autoCycle, setAutoCycle] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(0);

  const activeService: ServiceItem = content.services.items[activeServiceIndex];

  // Auto-cycle services unless user interacts
  useEffect(() => {
    if (!autoCycle) return;

    const cycleDuration = 7000; // 7 seconds per service
    const intervalTime = 50;
    const step = (intervalTime / cycleDuration) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          onServiceSelect((activeServiceIndex + 1) % content.services.items.length);
          return 0;
        }
        return prev + step;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [autoCycle, activeServiceIndex, onServiceSelect]);

  const handleManualSelect = (idx: number) => {
    setAutoCycle(false);
    setProgress(100);
    onServiceSelect(idx);
  };

  return (
    <section
      id="services"
      className="relative min-h-[90vh] sm:min-h-screen flex flex-col justify-between p-6 sm:p-12 lg:p-16 rounded-panel bg-cream text-ink border border-cream-border shadow-panel my-8 sm:my-12 overflow-hidden transition-all"
    >
      {/* Top Meta Label */}
      <div className="flex items-center justify-between mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cream-border text-ink/70 font-mono text-[10px] sm:text-[11px] uppercase tracking-micro">
          <span className="w-2 h-2 rounded-full bg-accent" />
          <span>{content.services.microLabel}</span>
        </div>

        <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-micro text-ink/40">
          <span>03 CAPABILITY VECTORS</span>
        </div>
      </div>

      {/* Headline & Subtext */}
      <div className="max-w-2xl mb-8 sm:mb-12">
        <h2 className="font-heading font-extrabold text-ink tracking-tightest leading-tight text-3xl sm:text-5xl lg:text-6xl">
          {content.services.headline}
        </h2>
        <p className="mt-4 text-base sm:text-lg text-ink/70 font-sans leading-relaxed">
          {content.services.subtext}
        </p>
      </div>

      {/* Main Grid: Interactive Rows on Left + Floating Glass Card on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start my-auto">
        {/* Services Row List */}
        <div className="lg:col-span-7 space-y-3">
          {content.services.items.map((service, idx) => {
            const isActive = activeServiceIndex === idx;
            return (
              <div
                key={service.id}
                onMouseEnter={() => handleManualSelect(idx)}
                onClick={() => handleManualSelect(idx)}
                className={`group relative p-6 sm:p-8 rounded-card border transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'bg-cream-light border-accent shadow-card ring-1 ring-accent/30'
                    : 'bg-cream/40 hover:bg-cream-light/60 border-ink/8 hover:border-ink/20'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  {/* Number & Details */}
                  <div className="flex items-start gap-4 sm:gap-6">
                    <span
                      className={`font-mono text-sm sm:text-base font-bold tracking-tight transition-colors ${
                        isActive ? 'text-accent' : 'text-ink/40 group-hover:text-ink/70'
                      }`}
                    >
                      {service.number}
                    </span>

                    <div>
                      <h3 className="font-heading font-bold text-xl sm:text-2xl text-ink tracking-tight">
                        {service.title}
                      </h3>
                      <p className="mt-2 text-sm sm:text-base text-ink/70 leading-relaxed font-sans">
                        {service.description}
                      </p>

                      {/* Chips */}
                      <div className="mt-4 flex flex-wrap gap-2">
                        {service.chips.map((chip, chipIdx) => (
                          <span
                            key={chipIdx}
                            className={`px-2.5 py-1 rounded-full text-[10px] font-mono tracking-wider uppercase transition-colors ${
                              isActive
                                ? 'bg-accent/10 text-accent font-semibold border border-accent/20'
                                : 'bg-cream-border text-ink/60'
                            }`}
                          >
                            {chip}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Round Arrow Button */}
                  <div
                    className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                      isActive
                        ? 'bg-accent text-white shadow-glow rotate-45'
                        : 'bg-cream-border text-ink/50 group-hover:bg-ink group-hover:text-cream'
                    }`}
                  >
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 17L17 7M17 7H7M17 7V17"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Floating "Now showing" Glass Card */}
        <div className="lg:col-span-5 relative">
          <div className="glass-panel p-6 sm:p-8 rounded-card border border-ink/10 shadow-card">
            <div className="flex items-center justify-between border-b border-ink/10 pb-4 mb-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <span className="font-mono text-[10px] uppercase tracking-micro text-accent font-semibold">
                  Now Showing
                </span>
              </div>
              <span className="font-mono text-xs font-bold text-ink/80">
                0{activeServiceIndex + 1} / 03
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-micro text-ink/50 block">
                  Active Prop in 3D
                </span>
                <h4 className="font-heading font-extrabold text-xl text-ink mt-1">
                  {activeService.title}
                </h4>
                <p className="text-xs text-ink/70 font-sans mt-1">
                  {activeService.tagline}
                </p>
              </div>

              {/* 3D Visualiser Prompt Tag */}
              <div className="p-3.5 rounded-lg bg-cream-border/60 border border-ink/5 font-mono text-[11px] text-ink/80 flex items-center gap-2.5">
                <span className="text-accent">◈</span>
                <span>
                  {activeServiceIndex === 0 && 'Orbiting chart bars & inspection ring active'}
                  {activeServiceIndex === 1 && 'Bridges between ERP and CRM cubes active'}
                  {activeServiceIndex === 2 && '4-node sequential autonomous mesh active'}
                </span>
              </div>

              {/* Cycle Progress Bar */}
              <div className="pt-2">
                <div className="flex items-center justify-between text-[10px] font-mono text-ink/40 mb-1.5 uppercase tracking-micro">
                  <span>Cycle timer</span>
                  <span>{autoCycle ? 'Auto-cycling' : 'Manual focus'}</span>
                </div>
                <div className="w-full bg-ink/10 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-accent h-full transition-all duration-100 ease-linear"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer note */}
      <div className="mt-8 pt-4 border-t border-ink/10 flex items-center justify-between text-xs font-mono text-ink/50">
        <span>Zero API keys required from client · Runs on hardened local gateways</span>
        <a href="#who" className="text-accent hover:underline hidden sm:inline">
          View industries who use this ↓
        </a>
      </div>
    </section>
  );
}
