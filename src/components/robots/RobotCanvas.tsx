'use client';

import React, { useEffect, useState, useRef, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import ProceduralRobot, { ActiveSectionType } from './ProceduralRobot';

interface RobotCanvasProps {
  currentSection: ActiveSectionType;
  activeServiceIndex: number;
  workflowMode: 'manual' | 'agent';
  onTurntableAngleChange?: (angle: number) => void;
}

export default function RobotCanvas({
  currentSection,
  activeServiceIndex,
  workflowMode,
  onTurntableAngleChange,
}: RobotCanvasProps) {
  const [cursorPos, setCursorPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isTabVisible, setIsTabVisible] = useState<boolean>(true);
  const [hasWebGL, setHasWebGL] = useState<boolean>(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false);

  // WebGL support check & Tab visibility handling
  useEffect(() => {
    // 1. WebGL test
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setHasWebGL(false);
      }
    } catch {
      setHasWebGL(false);
    }

    // 2. Reduced motion check
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mql.matches);
    const handleMqlChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mql.addEventListener('change', handleMqlChange);

    // 3. Tab visibility check (pause rendering when tab hidden)
    const handleVisibilityChange = () => {
      setIsTabVisible(!document.hidden);
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // 4. Mouse movement tracker for head tilt
    const handlePointerMove = (e: MouseEvent) => {
      // Normalize cursor between -1 and 1
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setCursorPos({ x, y });
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    return () => {
      mql.removeEventListener('change', handleMqlChange);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('pointermove', handlePointerMove);
    };
  }, []);

  // Static fallback if WebGL is disabled or unsupported
  if (!hasWebGL) {
    return (
      <div className="fixed right-0 top-0 w-full lg:w-1/2 h-screen z-10 flex items-center justify-center p-8 pointer-events-none">
        <div className="p-8 rounded-panel bg-cream-light/80 border border-ink/10 text-center shadow-card backdrop-blur-sm pointer-events-auto">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent/20 flex items-center justify-center text-accent text-2xl font-bold">
            73
          </div>
          <span className="font-mono text-xs uppercase tracking-micro text-accent block mb-1">
            Studio Mascot
          </span>
          <p className="font-heading font-bold text-lg text-ink">
            Seven3 Procedural Agent
          </p>
          <p className="text-xs text-ink/60 mt-1 max-w-xs">
            WebGL is disabled on your device. Interactive 3D graphics rendered as static preview.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      aria-hidden="true"
      className="fixed right-0 top-0 w-full lg:w-1/2 h-screen z-20 pointer-events-none transition-opacity duration-500 overflow-hidden"
    >
      <Canvas
        frameloop={isTabVisible ? 'always' : 'never'}
        dpr={prefersReducedMotion ? 1 : [1, 1.5]}
        camera={{ position: [0, 0, 5.4], fov: 32 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        className="w-full h-full pointer-events-none"
      >
        {/* Soft procedural lighting setup (no external HDR downloads) */}
        <ambientLight intensity={0.7} color="#FFF5EB" />

        {/* Warm Key Light */}
        <directionalLight
          position={[4, 5, 4]}
          intensity={1.8}
          color="#FFE9D6"
          castShadow
          shadow-mapSize={[512, 512]}
        />

        {/* Cool Rim / Back Light */}
        <directionalLight
          position={[-4, 3, -3]}
          intensity={0.9}
          color="#C7E2FE"
        />

        {/* Soft Under Bounce */}
        <directionalLight
          position={[0, -4, 2]}
          intensity={0.4}
          color="#F0E4D6"
        />

        {/* Orange Accent Fill Light */}
        <pointLight
          position={[0, 0.5, 2]}
          intensity={0.8}
          color="#F26B21"
          distance={4}
        />

        <Suspense fallback={null}>
          <ProceduralRobot
            currentSection={currentSection}
            activeServiceIndex={activeServiceIndex}
            workflowMode={workflowMode}
            cursorPos={prefersReducedMotion ? { x: 0, y: 0 } : cursorPos}
            onTurntableAngleChange={onTurntableAngleChange}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
