'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import TopBar from '@/components/TopBar';
import ScrollRail from '@/components/ScrollRail';
import LenisProvider from '@/components/LenisProvider';
import HelloSection from '@/components/sections/HelloSection';
import ServicesSection from '@/components/sections/ServicesSection';
import WhoSection from '@/components/sections/WhoSection';
import PlansSection from '@/components/sections/PlansSection';
import StartSection from '@/components/sections/StartSection';
import { ActiveSectionType } from '@/components/robot/ProceduralRobot';

// Dynamically load the 3D Robot canvas with SSR disabled
const RobotCanvas = dynamic(
  () => import('@/components/robot/RobotCanvas'),
  {
    ssr: false,
    loading: () => null,
  }
);

export default function HomePage() {
  const [currentSection, setCurrentSection] = useState<ActiveSectionType>('hello');
  const [activeServiceIndex, setActiveServiceIndex] = useState<number>(0);
  const [workflowMode, setWorkflowMode] = useState<'manual' | 'agent'>('agent');
  const [turntableAngle, setTurntableAngle] = useState<number>(0);

  // IntersectionObserver to sync active section with 3D Robot transforms
  useEffect(() => {
    const sectionIds: ActiveSectionType[] = ['hello', 'services', 'who', 'plans', 'start'];
    const handleScroll = () => {
      const viewportCenter = window.scrollY + window.innerHeight * 0.45;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY;
          if (viewportCenter >= top) {
            setCurrentSection(sectionIds[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <LenisProvider>
      {/* Outer Page Frame: #140E0B Dark Brown */}
      <div className="min-h-screen bg-frame p-2 sm:p-4 md:p-6 lg:p-8 text-ink selection:bg-accent selection:text-white relative">
        {/* Pinned Top Bar Navigation */}
        <TopBar />

        {/* Right-Edge Vertical Scroll Rail & Frame Counter */}
        <ScrollRail />

        {/* Fixed 3D Robot Canvas (desktop right half, mobile background) */}
        <RobotCanvas
          currentSection={currentSection}
          activeServiceIndex={activeServiceIndex}
          workflowMode={workflowMode}
          onTurntableAngleChange={setTurntableAngle}
        />

        {/* Main Content Panels Container */}
        <main className="max-w-7xl mx-auto space-y-4 sm:space-y-6 lg:space-y-8 relative z-10">
          {/* SECTION 1: HELLO */}
          <HelloSection />

          {/* SECTION 2: SERVICES */}
          <ServicesSection
            activeServiceIndex={activeServiceIndex}
            onServiceSelect={setActiveServiceIndex}
          />

          {/* SECTION 3: WHO IT'S FOR */}
          <WhoSection
            workflowMode={workflowMode}
            onWorkflowModeChange={setWorkflowMode}
            turntableAngle={turntableAngle}
          />

          {/* SECTION 4: PLANS */}
          <PlansSection />

          {/* SECTION 5: START */}
          <StartSection />
        </main>
      </div>
    </LenisProvider>
  );
}
