'use client';

import React, { useState } from 'react';
import { content, PlanItem } from '@/content';

export default function PlansSection() {
  const [selectedServiceId, setSelectedServiceId] = useState<string>('consulting');

  const selectedServiceLabel =
    content.plans.serviceFilters.find((f) => f.id === selectedServiceId)?.label || 'Selected Service';

  const plansList: PlanItem[] = content.plans.tiersByService[selectedServiceId] || [];

  return (
    <section
      id="plans"
      className="relative min-h-[92vh] sm:min-h-screen flex flex-col justify-between p-6 sm:p-12 lg:p-16 rounded-panel bg-cream text-ink border border-cream-border shadow-panel my-8 sm:my-12 overflow-hidden transition-all"
    >
      {/* Top Meta Label */}
      <div className="flex items-center justify-between mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cream-border text-ink/70 font-mono text-[10px] sm:text-[11px] uppercase tracking-micro">
          <span className="w-2 h-2 rounded-full bg-accent" />
          <span>{content.plans.microLabel}</span>
        </div>

        <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-micro text-ink/40">
          <span>TRANSPARENT ENGAGEMENT</span>
        </div>
      </div>

      {/* Headline & Subtext */}
      <div className="max-w-2xl mb-8">
        <h2 className="font-heading font-extrabold text-ink tracking-tightest leading-tight text-3xl sm:text-5xl lg:text-6xl">
          {content.plans.headline}
        </h2>
        <p className="mt-4 text-base sm:text-lg text-ink/70 font-sans leading-relaxed">
          {content.plans.subtext}
        </p>
      </div>

      {/* Chip Row to Choose Service */}
      <div className="flex flex-wrap items-center gap-2.5 mb-8">
        <span className="text-xs font-mono uppercase tracking-micro text-ink/40 mr-1 hidden sm:inline">
          Filter by:
        </span>
        {content.plans.serviceFilters.map((filter) => {
          const isSelected = selectedServiceId === filter.id;
          return (
            <button
              key={filter.id}
              onClick={() => setSelectedServiceId(filter.id)}
              className={`px-4 sm:px-5 py-2 rounded-pill text-xs font-mono tracking-wider transition-all duration-200 ${
                isSelected
                  ? 'bg-ink text-cream shadow-card scale-105'
                  : 'bg-cream-border text-ink/70 hover:bg-cream-border/80'
              }`}
            >
              {filter.label}
            </button>
          );
        })}
      </div>

      {/* 3 Plan Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 my-auto">
        {plansList.map((plan) => {
          // Construct specific WhatsApp prefill link for PRO tier
          const proPrefillMessage = encodeURIComponent(
            `Hi Seven3, please share the Pro plan price for ${selectedServiceLabel}.`
          );
          const maxPrefillMessage = encodeURIComponent(
            `Hi Seven3, I'd like to discuss the Max plan for ${selectedServiceLabel}.`
          );
          const freePrefillMessage = encodeURIComponent(
            `Hi Seven3, I'd like to schedule an intro call and audit for ${selectedServiceLabel}.`
          );

          let waLink = `https://wa.me/${content.studio.whatsappNumber}?text=${proPrefillMessage}`;
          if (plan.tier === 'FREE') {
            waLink = `https://wa.me/${content.studio.whatsappNumber}?text=${freePrefillMessage}`;
          } else if (plan.tier === 'MAX') {
            waLink = `https://wa.me/${content.studio.whatsappNumber}?text=${maxPrefillMessage}`;
          }

          if (plan.highlight) {
            // PRO CARD: Highlighted dark card with orange accents
            return (
              <div
                key={plan.tier}
                className="relative p-7 sm:p-9 rounded-card bg-[#140E0B] text-white border-2 border-accent shadow-panel flex flex-col justify-between transform md:-translate-y-2 transition-all hover:shadow-glow"
              >
                {/* Popular Pill */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-accent text-white font-mono text-[9px] uppercase tracking-micro font-bold shadow-sm">
                  Recommended
                </div>

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs uppercase tracking-micro text-accent font-bold">
                      {plan.tier}
                    </span>
                    <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
                  </div>

                  <h3 className="font-heading font-extrabold text-2xl text-white tracking-tight">
                    {plan.name}
                  </h3>

                  {/* PRICE DISPLAY (PRICE SHARED ON CONTACT) */}
                  <div className="mt-4 pb-4 border-b border-white/10">
                    <span className="font-heading font-bold text-xl sm:text-2xl text-accent">
                      {plan.priceLabel}
                    </span>
                    <span className="block text-[11px] font-mono text-white/50 mt-1 uppercase tracking-wider">
                      Shared directly on WhatsApp
                    </span>
                  </div>

                  <p className="mt-4 text-xs sm:text-sm text-white/70 font-sans leading-relaxed">
                    {plan.description}
                  </p>

                  {/* Feature Checklist */}
                  <ul className="mt-6 space-y-2.5">
                    {plan.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2.5 text-xs text-white/80 font-sans">
                        <span className="text-accent font-bold mt-0.5">✓</span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* WhatsApp Link Button */}
                <div className="mt-8 pt-6 border-t border-white/10">
                  <a
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-pill bg-accent hover:bg-accent-hover text-white text-xs sm:text-sm font-semibold tracking-wide shadow-glow transition-all active:scale-95"
                  >
                    <span>{plan.ctaLabel}</span>
                    <span>→</span>
                  </a>
                </div>
              </div>
            );
          }

          // STANDARD CARDS (FREE / MAX)
          return (
            <div
              key={plan.tier}
              className="relative p-7 sm:p-8 rounded-card bg-cream-light border border-ink/10 shadow-card flex flex-col justify-between transition-all hover:border-ink/25 hover:shadow-cardHover"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs uppercase tracking-micro text-ink/50 font-bold">
                    {plan.tier}
                  </span>
                  <span className="text-[10px] font-mono text-ink/40">
                    {selectedServiceLabel}
                  </span>
                </div>

                <h3 className="font-heading font-extrabold text-2xl text-ink tracking-tight">
                  {plan.name}
                </h3>

                {/* PRICE DISPLAY (PRICE SHARED ON CONTACT) */}
                <div className="mt-4 pb-4 border-b border-ink/10">
                  <span className="font-heading font-bold text-xl sm:text-2xl text-ink">
                    {plan.priceLabel}
                  </span>
                  <span className="block text-[11px] font-mono text-ink/50 mt-1 uppercase tracking-wider">
                    {plan.tier === 'FREE' ? 'Zero commitment' : 'Custom studio scope'}
                  </span>
                </div>

                <p className="mt-4 text-xs sm:text-sm text-ink/70 font-sans leading-relaxed">
                  {plan.description}
                </p>

                {/* Feature Checklist */}
                <ul className="mt-6 space-y-2.5">
                  {plan.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2.5 text-xs text-ink/80 font-sans">
                      <span className="text-ink/40 font-bold mt-0.5">•</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* WhatsApp / Action Button */}
              <div className="mt-8 pt-6 border-t border-ink/10">
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-pill bg-cream-border hover:bg-ink hover:text-cream text-ink text-xs sm:text-sm font-semibold tracking-wide transition-all active:scale-95"
                >
                  <span>{plan.ctaLabel}</span>
                  <span>→</span>
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {/* Note footer */}
      <div className="mt-8 pt-4 border-t border-ink/10 flex items-center justify-between text-xs font-mono text-ink/50">
        <span>No long-term lock-in · Scaled to your exact automation bottlenecks</span>
        <a href="#start" className="text-accent hover:underline hidden sm:inline">
          Prefer a custom brief? Jump to form ↓
        </a>
      </div>
    </section>
  );
}
