'use client';

import React, { useState, useEffect } from 'react';
import { content } from '@/content';

export default function HelloSection() {
  const [demoActive, setDemoActive] = useState<boolean>(false);
  const [demoSecondsLeft, setDemoSecondsLeft] = useState<number>(10);
  const [statCounts, setStatCounts] = useState<{ [key: string]: number }>({
    services: 0,
    industries: 0,
    studios: 0,
  });

  // Count up stats animation
  useEffect(() => {
    const duration = 1200;
    const start = performance.now();

    const animateStats = (currentTime: number) => {
      const elapsed = currentTime - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);

      setStatCounts({
        services: Math.round(eased * 3),
        industries: Math.round(eased * 5),
        studios: Math.round(eased * 1),
      });

      if (progress < 1) {
        requestAnimationFrame(animateStats);
      }
    };

    requestAnimationFrame(animateStats);
  }, []);

  // 10-second interactive demo countdown timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (demoActive) {
      interval = setInterval(() => {
        setDemoSecondsLeft((prev) => {
          if (prev <= 1) {
            setDemoActive(false);
            return 10;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      setDemoSecondsLeft(10);
    }
    return () => clearInterval(interval);
  }, [demoActive]);

  return (
    <section
      id="hello"
      className="relative min-h-[92vh] sm:min-h-screen flex flex-col justify-between p-6 sm:p-12 lg:p-16 rounded-panel bg-cream text-ink border border-cream-border shadow-panel overflow-hidden transition-all"
    >
      {/* Top Meta Label */}
      <div className="flex items-center justify-between mb-4 sm:mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cream-border text-ink/70 font-mono text-[10px] sm:text-[11px] uppercase tracking-micro">
          <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
          <span>{content.hello.microLabel}</span>
        </div>

        <div className="hidden md:flex items-center gap-2 font-mono text-[10px] uppercase tracking-micro text-ink/40">
          <span>COORDINATES 26.9124° N, 75.7873° E</span>
        </div>
      </div>

      {/* Mobile robot spacer to place 3D mini robot centered above headline */}
      <div className="lg:hidden w-full h-44 sm:h-52 my-1 pointer-events-none" aria-hidden="true" />

      {/* Main Headline & Subtext */}
      <div className="relative z-10 max-w-xl lg:max-w-xl xl:max-w-2xl my-auto">
        <h1 className="font-heading font-extrabold text-ink tracking-tightest leading-hero text-[clamp(2.4rem,5.2vw,5.6rem)] select-none">
          <span className="headline-mask">
            <span className="headline-line">{content.hello.headline[0]}</span>
          </span>
          <span className="headline-mask text-ink/80">
            <span className="headline-line">{content.hello.headline[1]}</span>
          </span>
          <span className="headline-mask text-accent">
            <span className="headline-line">{content.hello.headline[2]}</span>
          </span>
        </h1>

        <p className="mt-5 sm:mt-7 text-base sm:text-lg lg:text-xl text-ink/70 font-sans max-w-lg leading-relaxed">
          {content.hello.subtext}
        </p>

        {/* Quick Trigger Chips */}
        <div className="mt-8 flex flex-wrap gap-2.5">
          <a
            href="#services"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-pill bg-ink text-cream text-xs font-mono tracking-wider hover:bg-ink/90 transition-all shadow-sm"
          >
            <span>Explore Services</span>
            <span className="text-accent">↓</span>
          </a>
          <a
            href="#who"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-pill bg-cream-border text-ink text-xs font-mono tracking-wider hover:bg-cream-border/80 transition-all"
          >
            <span>Industries We Serve</span>
            <span>→</span>
          </a>
        </div>
      </div>

      {/* Bottom Row: Stats & 10s Demo Button */}
      <div className="relative z-10 mt-12 pt-8 border-t border-ink/10 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        {/* Count-Up Stats */}
        <div className="flex items-center gap-8 sm:gap-12">
          <div className="flex flex-col">
            <div className="font-heading font-extrabold text-3xl sm:text-4xl text-ink tracking-tight flex items-baseline">
              <span>{statCounts.services}</span>
              <span className="text-accent text-xl ml-1">/</span>
            </div>
            <span className="font-mono text-[10px] uppercase tracking-micro text-ink/60 mt-0.5">
              services
            </span>
          </div>

          <div className="flex flex-col">
            <div className="font-heading font-extrabold text-3xl sm:text-4xl text-ink tracking-tight flex items-baseline">
              <span>{statCounts.industries}</span>
              <span className="text-accent text-2xl font-bold">+</span>
            </div>
            <span className="font-mono text-[10px] uppercase tracking-micro text-ink/60 mt-0.5">
              industries
            </span>
          </div>

          <div className="flex flex-col">
            <div className="font-heading font-extrabold text-3xl sm:text-4xl text-ink tracking-tight flex items-baseline">
              <span>{statCounts.studios}</span>
              <span className="text-accent text-xl ml-1">/</span>
            </div>
            <span className="font-mono text-[10px] uppercase tracking-micro text-ink/60 mt-0.5">
              studio, Jaipur
            </span>
          </div>
        </div>

        {/* 10-Second Demo Trigger Pill */}
        <div className="flex items-center">
          <button
            onClick={() => setDemoActive(!demoActive)}
            className="group relative inline-flex items-center gap-3 px-5 sm:px-6 py-3 rounded-pill bg-ink text-white text-xs sm:text-sm font-medium tracking-wide shadow-card hover:shadow-cardHover transition-all transform active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
            <span className="font-mono text-xs uppercase tracking-micro">
              {demoActive ? `Playing 00:${demoSecondsLeft.toString().padStart(2, '0')}` : content.hello.demoCta}
            </span>
            <span className="w-5 h-5 rounded-full bg-accent/20 text-accent flex items-center justify-center text-[10px] font-bold group-hover:bg-accent group-hover:text-white transition-colors">
              ▶
            </span>
          </button>
        </div>
      </div>

      {/* 10-SECOND INTERACTIVE DEMO VISUALISATION MODAL / OVERLAY */}
      {demoActive && (
        <div className="absolute inset-0 z-30 bg-frame/95 backdrop-blur-md p-6 sm:p-10 flex flex-col justify-between text-cream animate-fadeIn">
          {/* Header of Demo */}
          <div className="flex items-center justify-between border-b border-cream/10 pb-4">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse" />
              <span className="font-mono text-xs uppercase tracking-micro text-accent font-semibold">
                {content.hello.demoNote}
              </span>
            </div>

            <div className="flex items-center gap-4">
              <span className="font-mono text-sm tracking-wider text-cream/70 bg-white/5 px-3 py-1 rounded-full border border-white/10">
                00:{demoSecondsLeft.toString().padStart(2, '0')}
              </span>
              <button
                onClick={() => setDemoActive(false)}
                className="text-xs font-mono uppercase tracking-micro text-cream/50 hover:text-cream px-2.5 py-1 rounded border border-white/10 hover:border-white/30 transition-colors"
              >
                Close ✕
              </button>
            </div>
          </div>

          {/* Visual Simulation Grid: Raw Inputs -> Robot Sorting -> Clean Structured Outputs */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-auto items-center py-6">
            {/* 1. Messy Input Stream */}
            <div className="space-y-3">
              <span className="font-mono text-[10px] uppercase tracking-micro text-rose-400 block mb-2">
                01 Unstructured Chaos (Input)
              </span>
              {content.hello.demoItems.input.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-lg bg-red-950/40 border border-red-500/20 text-xs font-mono text-rose-200 flex items-center justify-between shadow-sm transform -rotate-1 hover:rotate-0 transition-transform"
                >
                  <span>{item}</span>
                  <span className="text-red-400 text-[10px]">RAW</span>
                </div>
              ))}
            </div>

            {/* 2. Procedural Agent Core */}
            <div className="text-center p-6 rounded-card bg-accent/10 border border-accent/30 relative overflow-hidden">
              <div className="w-12 h-12 mx-auto rounded-full bg-accent text-white flex items-center justify-center font-bold text-lg mb-3 shadow-glow animate-spin">
                ⚙
              </div>
              <span className="font-mono text-xs uppercase tracking-micro text-accent font-semibold block">
                Seven3 Engine
              </span>
              <p className="text-xs text-cream/80 mt-2 font-mono">
                Extracting entities, checking inventory, drafting responses...
              </p>
              <div className="mt-4 w-full bg-white/10 h-1 rounded-full overflow-hidden">
                <div
                  className="bg-accent h-full transition-all duration-1000 ease-linear"
                  style={{ width: `${(10 - demoSecondsLeft) * 10}%` }}
                />
              </div>
            </div>

            {/* 3. Clean Structured Output Stream */}
            <div className="space-y-3">
              <span className="font-mono text-[10px] uppercase tracking-micro text-emerald-400 block mb-2">
                02 Autonomous Output (Zero Touch)
              </span>
              {content.hello.demoItems.output.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-xs font-mono text-emerald-200 flex items-center justify-between shadow-sm transform rotate-1 hover:rotate-0 transition-transform"
                >
                  <span>{item}</span>
                  <span className="text-emerald-400 text-[10px]">✓ SYNCD</span>
                </div>
              ))}
            </div>
          </div>

          {/* Footer of Demo */}
          <div className="text-center font-mono text-[11px] text-cream/50 pt-2 border-t border-cream/10">
            Simulated 10-second automation cycle · No manual human intervention required
          </div>
        </div>
      )}
    </section>
  );
}
