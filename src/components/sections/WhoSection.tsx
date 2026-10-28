'use client';

import React, { useState } from 'react';
import { content } from '@/content';

interface WhoSectionProps {
  workflowMode: 'manual' | 'agent';
  onWorkflowModeChange: (mode: 'manual' | 'agent') => void;
  turntableAngle: number;
}

export default function WhoSection({
  workflowMode,
  onWorkflowModeChange,
  turntableAngle,
}: WhoSectionProps) {
  const [activeCardId, setActiveCardId] = useState<string>('manufacturing');

  const formattedAngle = `${turntableAngle.toString().padStart(3, '0')}°`;

  return (
    <section
      id="who"
      className="relative min-h-[92vh] sm:min-h-screen flex flex-col justify-between p-6 sm:p-12 lg:p-16 rounded-panel bg-gradient-to-br from-dark-panel to-dark-panelEnd text-cream border border-cream/10 shadow-panel my-8 sm:my-12 overflow-hidden transition-all"
    >
      {/* Top Header Row with Turntable Readout & Workflow Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-cream/70 font-mono text-[10px] sm:text-[11px] uppercase tracking-micro">
          <span className="w-2 h-2 rounded-full bg-accent" />
          <span>{content.who.microLabel}</span>
        </div>

        {/* Live Turntable Angle & Mode Toggle */}
        <div className="flex flex-wrap items-center gap-4">
          {/* Turntable Readout */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 border border-white/10 font-mono text-[11px] uppercase tracking-micro text-cream/80">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>TURNTABLE</span>
            <span className="text-accent font-bold">{formattedAngle}</span>
          </div>

          {/* Manual vs Agent Interactive Toggle */}
          <div className="flex items-center gap-1.5 p-1 rounded-pill bg-black/50 border border-white/15">
            <button
              onClick={() => onWorkflowModeChange('manual')}
              className={`px-3 sm:px-4 py-1.5 rounded-pill text-xs font-mono tracking-wider transition-all ${
                workflowMode === 'manual'
                  ? 'bg-[#8C827A] text-white font-bold shadow-sm'
                  : 'text-cream/50 hover:text-cream'
              }`}
            >
              Manual (Friction)
            </button>
            <button
              onClick={() => onWorkflowModeChange('agent')}
              className={`px-3 sm:px-4 py-1.5 rounded-pill text-xs font-mono tracking-wider transition-all flex items-center gap-1.5 ${
                workflowMode === 'agent'
                  ? 'bg-accent text-white font-bold shadow-glow'
                  : 'text-cream/50 hover:text-cream'
              }`}
            >
              <span>With agent</span>
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Section Headline */}
      <div className="max-w-2xl mb-8 sm:mb-12">
        <h2 className="font-heading font-extrabold text-white tracking-tightest leading-tight text-3xl sm:text-5xl lg:text-6xl">
          {content.who.headline}
        </h2>
        <p className="mt-4 text-base sm:text-lg text-cream/70 font-sans leading-relaxed">
          {content.who.subtext}
        </p>
      </div>

      {/* Five Industry Cards with Thin Progress Bars */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 my-auto">
        {content.who.items.map((item, idx) => {
          const isSelected = activeCardId === item.id;
          return (
            <div
              key={item.id}
              onClick={() => setActiveCardId(item.id)}
              className={`group relative p-6 sm:p-7 rounded-card border transition-all duration-300 cursor-pointer ${
                isSelected
                  ? 'bg-white/10 border-accent/60 shadow-card ring-1 ring-accent/30'
                  : 'bg-white/5 hover:bg-white/8 border-white/10 hover:border-white/20'
              }`}
            >
              {/* Tag & Metric */}
              <div className="flex items-center justify-between mb-4">
                <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-[9px] font-mono tracking-micro text-accent uppercase font-semibold">
                  {item.tag}
                </span>
                <span className="text-[10px] font-mono text-cream/50">
                  0{idx + 1}
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="font-heading font-bold text-lg sm:text-xl text-white tracking-tight">
                {item.title}
              </h3>
              <p className="text-xs font-mono text-accent/90 mt-1 uppercase tracking-wider">
                {item.subtitle}
              </p>
              <p className="mt-3 text-xs sm:text-sm text-cream/70 leading-relaxed font-sans">
                {item.description}
              </p>

              {/* Thin Progress Bar Underneath */}
              <div className="mt-6 pt-4 border-t border-white/10">
                <div className="flex items-center justify-between text-[10px] font-mono text-cream/50 mb-1.5 uppercase tracking-micro">
                  <span>Impact Profile</span>
                  <span className="text-cream/80">{item.metric}</span>
                </div>
                <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 ${
                      isSelected ? 'bg-accent w-full' : 'bg-white/30 w-3/4 group-hover:w-full'
                    }`}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Mode State Indicator Footer */}
      <div className="mt-8 pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono text-cream/50">
        <div className="flex items-center gap-2">
          <span>Active Visual Mode:</span>
          <span className="text-accent font-semibold uppercase">
            {workflowMode === 'manual' ? 'CLAY (Tired + Scattered Papers)' : 'GLAZE (Tidy Autonomous Stream)'}
          </span>
        </div>
        <span>5 Core Segments Supported in Rajasthan & Pan-India</span>
      </div>
    </section>
  );
}
