'use client';

import React, { useState } from 'react';
import { content } from '@/content';

export default function StartSection() {
  const [selectedIndustry, setSelectedIndustry] = useState<string>('Manufacturing');
  const [bottleneck, setBottleneck] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleSendWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setError('Please provide your name or business name.');
      return;
    }

    const cleanPhone = phone.replace(/[^0-9]/g, '');
    if (cleanPhone.length < 10) {
      setError('Please provide a valid 10-digit WhatsApp number.');
      return;
    }

    setError('');

    const message = [
      `Hi Seven3 (Priyam), I would like to automate workflows for my business.`,
      ``,
      `• Industry: ${selectedIndustry}`,
      bottleneck.trim() ? `• Workflow Bottleneck: ${bottleneck.trim()}` : null,
      `• Contact Name: ${name.trim()}`,
      `• Phone: ${phone.trim()}`,
      ``,
      `Looking forward to hearing feasibility and next steps!`,
    ]
      .filter(Boolean)
      .join('\n');

    const encoded = encodeURIComponent(message);
    const waUrl = `https://wa.me/${content.studio.whatsappNumber}?text=${encoded}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section
      id="start"
      className="relative min-h-[92vh] sm:min-h-screen flex flex-col justify-between p-6 sm:p-12 lg:p-16 rounded-panel bg-cream text-ink border border-cream-border shadow-panel my-8 sm:my-12 overflow-hidden transition-all"
    >
      {/* Top Meta Label */}
      <div className="flex items-center justify-between mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cream-border text-ink/70 font-mono text-[10px] sm:text-[11px] uppercase tracking-micro">
          <span className="w-2 h-2 rounded-full bg-accent" />
          <span>{content.start.microLabel}</span>
        </div>

        <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-micro text-ink/40">
          <span>DARK GLAZE VARIANT</span>
        </div>
      </div>

      {/* Main Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start my-auto">
        {/* Left Column: Headline & Studio Direct Contacts */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <h2 className="font-heading font-extrabold text-ink tracking-tightest leading-tight text-3xl sm:text-5xl lg:text-6xl">
              {content.start.headline}
            </h2>
            <p className="mt-4 text-base sm:text-lg text-ink/70 font-sans leading-relaxed max-w-md">
              {content.start.subtext}
            </p>
          </div>

          {/* Large Phone Number Display */}
          <div className="pt-4 border-t border-ink/10">
            <span className="font-mono text-[10px] uppercase tracking-micro text-ink/50 block mb-1">
              Direct Founder Line
            </span>
            <a
              href={`tel:${content.studio.phoneRaw}`}
              className="font-mono font-bold text-3xl sm:text-4xl text-ink hover:text-accent tracking-tight transition-colors inline-block"
            >
              {content.studio.phoneRaw}
            </a>
          </div>

          {/* Quick Action Buttons: Call Now & WhatsApp */}
          <div className="flex flex-wrap gap-3 pt-2">
            <a
              href={`tel:${content.studio.phoneRaw}`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-pill bg-ink text-cream hover:bg-ink/90 text-xs sm:text-sm font-semibold tracking-wide transition-all active:scale-95 shadow-sm"
            >
              <span>Call now</span>
              <span>📞</span>
            </a>
            <a
              href={`https://wa.me/${content.studio.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-pill bg-[#25D366] hover:bg-[#20BD5A] text-white text-xs sm:text-sm font-semibold tracking-wide transition-all active:scale-95 shadow-sm"
            >
              <span>WhatsApp</span>
              <span>💬</span>
            </a>
          </div>

          {/* Studio Location Badge */}
          <div className="p-4 rounded-card bg-cream-light border border-ink/10 font-mono text-xs text-ink/70 space-y-1">
            <p className="font-bold text-ink">{content.studio.name} · {content.studio.founder}</p>
            <p>Jaipur, Rajasthan, India</p>
          </div>
        </div>

        {/* Right Column: Interactive Form Card */}
        <div className="lg:col-span-6">
          <form
            onSubmit={handleSendWhatsApp}
            className="p-6 sm:p-8 rounded-card bg-cream-light border border-ink/15 shadow-card space-y-5"
          >
            {/* Industry Selector Chips */}
            <div>
              <label className="font-mono text-[10px] uppercase tracking-micro text-ink/60 block mb-2.5">
                Select Your Industry
              </label>
              <div className="flex flex-wrap gap-2">
                {content.start.industries.map((ind) => {
                  const isSelected = selectedIndustry === ind;
                  return (
                    <button
                      type="button"
                      key={ind}
                      onClick={() => setSelectedIndustry(ind)}
                      className={`px-3.5 py-1.5 rounded-pill text-xs font-mono tracking-wider transition-all ${
                        isSelected
                          ? 'bg-accent text-white font-bold shadow-sm'
                          : 'bg-cream-border text-ink/70 hover:bg-cream-border/80'
                      }`}
                    >
                      {ind}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bottleneck description */}
            <div>
              <label
                htmlFor="bottleneck"
                className="font-mono text-[10px] uppercase tracking-micro text-ink/60 block mb-1.5"
              >
                What takes up your time?
              </label>
              <textarea
                id="bottleneck"
                rows={3}
                value={bottleneck}
                onChange={(e) => setBottleneck(e.target.value)}
                placeholder={content.start.placeholders.automationGoal}
                className="w-full px-4 py-3 rounded-card bg-cream text-ink text-xs sm:text-sm border border-ink/15 focus:outline-none focus:ring-2 focus:ring-accent font-sans placeholder:text-ink/40 resize-none"
              />
            </div>

            {/* Name & Phone Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="name"
                  className="font-mono text-[10px] uppercase tracking-micro text-ink/60 block mb-1.5"
                >
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={content.start.placeholders.name}
                  className="w-full px-4 py-2.5 rounded-pill bg-cream text-ink text-xs sm:text-sm border border-ink/15 focus:outline-none focus:ring-2 focus:ring-accent font-sans placeholder:text-ink/40"
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="font-mono text-[10px] uppercase tracking-micro text-ink/60 block mb-1.5"
                >
                  WhatsApp Phone
                </label>
                <input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder={content.start.placeholders.phone}
                  className="w-full px-4 py-2.5 rounded-pill bg-cream text-ink text-xs sm:text-sm border border-ink/15 focus:outline-none focus:ring-2 focus:ring-accent font-mono placeholder:text-ink/40"
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <p className="text-xs font-mono text-rose-600 bg-rose-50 p-2.5 rounded-lg border border-rose-200">
                {error}
              </p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-pill bg-accent hover:bg-accent-hover text-white text-sm font-semibold tracking-wide shadow-glow transition-all active:scale-95"
            >
              <span>{content.start.ctaWhatsApp}</span>
              <span>💬</span>
            </button>

            {/* Disclaimer */}
            <p className="text-[11px] font-mono text-ink/50 text-center">
              {content.start.disclaimer}
            </p>
          </form>
        </div>
      </div>

      {/* Studio Footer */}
      <footer className="mt-12 pt-6 border-t border-ink/10 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-ink/50">
        <p>{content.start.footerCredit}</p>
        <p>Built for businesses that run on repeat</p>
      </footer>
    </section>
  );
}
