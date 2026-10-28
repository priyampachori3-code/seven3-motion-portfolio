'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export type RobotMaterialType = 'glaze' | 'clay' | 'darkGlaze';
export type ActiveSectionType = 'hello' | 'services' | 'who' | 'plans' | 'start';

interface ProceduralRobotProps {
  currentSection: ActiveSectionType;
  activeServiceIndex: number; // 0, 1, 2
  workflowMode: 'manual' | 'agent';
  cursorPos: { x: number; y: number };
  onTurntableAngleChange?: (angle: number) => void;
}

export default function ProceduralRobot({
  currentSection,
  activeServiceIndex,
  workflowMode,
  cursorPos,
  onTurntableAngleChange,
}: ProceduralRobotProps) {
  const robotGroupRef = useRef<THREE.Group>(null);
  const headGroupRef = useRef<THREE.Group>(null);
  const eyesGroupRef = useRef<THREE.Group>(null);
  const leftArmRef = useRef<THREE.Group>(null);
  const rightArmRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const spheresGroupRef = useRef<THREE.Group>(null);

  // Service props refs
  const consultingPropRef = useRef<THREE.Group>(null);
  const systemsPropRef = useRef<THREE.Group>(null);
  const workflowsPropRef = useRef<THREE.Group>(null);
  const workflowPropsRef = useRef<THREE.Group>(null);

  // Blinking state
  const blinkStateRef = useRef({
    nextBlink: 2.5,
    isBlinking: false,
    blinkProgress: 0,
  });

  // Materials definition
  const materials = useMemo(() => {
    // 1. GLAZE: glossy orange
    const glaze = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#F26B21'),
      emissive: new THREE.Color('#3A1204'),
      roughness: 0.22,
      metalness: 0.05,
      clearcoat: 1.0,
      clearcoatRoughness: 0.15,
      reflectivity: 0.8,
    });

    // 2. CLAY: matte warm grey
    const clay = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#9E9085'),
      roughness: 0.85,
      metalness: 0.0,
    });

    // 3. DARK GLAZE: obsidian gloss
    const darkGlaze = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#1F1612'),
      emissive: new THREE.Color('#120B08'),
      roughness: 0.15,
      metalness: 0.2,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
    });

    // Dark Visor Glass
    const visor = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#0A0605'),
      roughness: 0.1,
      metalness: 0.9,
      clearcoat: 1.0,
    });

    // Glowing Eyes & Chest Core
    const eye = new THREE.MeshBasicMaterial({
      color: new THREE.Color('#FF7A28'),
    });

    // Cream Orbit Ring (delicate & thin)
    const creamRing = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#F0E4D6'),
      roughness: 0.4,
      metalness: 0.1,
      transparent: true,
      opacity: 0.85,
    });

    // Floating Pearl Spheres
    const pearl = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#F7EFE6'),
      roughness: 0.2,
      clearcoat: 0.8,
    });

    // Dark Accent / Joints
    const darkJoint = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#2A1D17'),
      roughness: 0.5,
    });

    // Glowing Node / Laser
    const glowCyan = new THREE.MeshBasicMaterial({
      color: new THREE.Color('#38BDF8'),
    });

    const glowOrange = new THREE.MeshBasicMaterial({
      color: new THREE.Color('#F26B21'),
    });

    const paperMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#E2D5C7'),
      roughness: 0.9,
      side: THREE.DoubleSide,
    });

    const tidyCardMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#FFFFFF'),
      roughness: 0.15,
      clearcoat: 0.8,
      side: THREE.DoubleSide,
    });

    return {
      glaze,
      clay,
      darkGlaze,
      visor,
      eye,
      creamRing,
      pearl,
      darkJoint,
      glowCyan,
      glowOrange,
      paperMat,
      tidyCardMat,
    };
  }, []);

  // Determine active primary robot material based on section & toggle
  const currentBodyMaterial = useMemo(() => {
    if (currentSection === 'start') {
      return materials.darkGlaze;
    }
    if (currentSection === 'who') {
      return workflowMode === 'manual' ? materials.clay : materials.glaze;
    }
    return materials.glaze;
  }, [currentSection, workflowMode, materials]);

  // Soft Elliptical Floor Shadow Texture (clean radial gradient, zero hard edges)
  const shadowTexture = useMemo(() => {
    if (typeof document === 'undefined') return new THREE.Texture();
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const gradient = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
      gradient.addColorStop(0, 'rgba(15, 10, 7, 0.45)');
      gradient.addColorStop(0.35, 'rgba(15, 10, 7, 0.28)');
      gradient.addColorStop(0.7, 'rgba(15, 10, 7, 0.08)');
      gradient.addColorStop(1, 'rgba(15, 10, 7, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 128, 128);
    }
    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }, []);

  // Texture creation for mini ERP / CRM cubes
  const { erpTexture, crmTexture } = useMemo(() => {
    const makeCanvasTexture = (text: string, bgColor: string, textColor: string) => {
      if (typeof document === 'undefined') return new THREE.Texture();
      const canvas = document.createElement('canvas');
      canvas.width = 128;
      canvas.height = 128;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, 128, 128);
        ctx.strokeStyle = '#F26B21';
        ctx.lineWidth = 6;
        ctx.strokeRect(4, 4, 120, 120);
        ctx.fillStyle = textColor;
        ctx.font = 'bold 36px monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(text, 64, 64);
      }
      const texture = new THREE.CanvasTexture(canvas);
      texture.needsUpdate = true;
      return texture;
    };

    return {
      erpTexture: makeCanvasTexture('ERP', '#1B120D', '#F0E4D6'),
      crmTexture: makeCanvasTexture('CRM', '#1B120D', '#F26B21'),
    };
  }, []);

  // Frame update loop
  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    const isMobile =
      state.viewport.width < 5.2 ||
      (typeof window !== 'undefined' && window.innerWidth < 1024);

    // 1. Idle breathing and floating bob (gentle mini amplitude)
    if (robotGroupRef.current) {
      const bobY = Math.sin(t * 1.8) * 0.04;
      const bobRotZ = Math.sin(t * 1.2) * 0.015;

      // Section-based position, rotation, and pose blending
      let targetPosX = 0.05;
      let targetPosY = -0.16 + bobY;
      let targetPosZ = 0;
      let targetRotY = -0.15;
      let targetRotX = 0;
      let targetRotZ = bobRotZ;
      let targetScale = isMobile ? 0.72 : 0.88;

      if (isMobile) {
        // Mobile: Centered above hero headline, ~180-220px tall
        targetPosX = 0;
        targetPosY = currentSection === 'hello' ? 0.75 + bobY : 0.68 + bobY;
      } else {
        // Desktop: Right third beside headline, strictly below top bar
        if (currentSection === 'hello') {
          targetPosX = 0.05;
          targetPosY = -0.16 + bobY;
          targetRotY = -0.15;
        } else if (currentSection === 'services') {
          targetPosX = 0.12;
          targetPosY = -0.06 + bobY;
          targetRotY = -0.22;
        } else if (currentSection === 'who') {
          // Continuous turntable rotation
          const turntableSpeed = 0.55;
          const currentAngle = (t * turntableSpeed) % (Math.PI * 2);
          targetRotY = currentAngle;

          // Export live angle to parent for "TURNTABLE 358°" readout
          if (onTurntableAngleChange) {
            const degrees = Math.round((currentAngle * 180) / Math.PI);
            onTurntableAngleChange(degrees);
          }

          if (workflowMode === 'manual') {
            targetPosY = -0.20 + bobY;
            targetRotX = 0.12; // droop forward
          } else {
            targetPosY = -0.06 + bobY;
            targetRotX = -0.03; // confident upright
          }
        } else if (currentSection === 'plans') {
          // Presenting pose: facing slightly towards left content
          targetPosX = 0.14;
          targetPosY = -0.10 + bobY;
          targetRotY = -0.45;
        } else if (currentSection === 'start') {
          // Dark variant: centered & focused
          targetPosX = 0.06;
          targetPosY = -0.10 + bobY;
          targetRotY = -0.08;
        }
      }

      // Smooth interpolation of group transforms
      if (currentSection !== 'who' || isMobile) {
        robotGroupRef.current.position.x = THREE.MathUtils.lerp(
          robotGroupRef.current.position.x,
          targetPosX,
          delta * 4
        );
        robotGroupRef.current.position.z = THREE.MathUtils.lerp(
          robotGroupRef.current.position.z,
          targetPosZ,
          delta * 4
        );
        robotGroupRef.current.rotation.y = THREE.MathUtils.lerp(
          robotGroupRef.current.rotation.y,
          targetRotY,
          delta * 4
        );
      } else {
        robotGroupRef.current.rotation.y = targetRotY;
      }

      robotGroupRef.current.position.y = THREE.MathUtils.lerp(
        robotGroupRef.current.position.y,
        targetPosY,
        delta * 4
      );
      robotGroupRef.current.rotation.x = THREE.MathUtils.lerp(
        robotGroupRef.current.rotation.x,
        targetRotX,
        delta * 4
      );
      robotGroupRef.current.rotation.z = THREE.MathUtils.lerp(
        robotGroupRef.current.rotation.z,
        targetRotZ,
        delta * 4
      );

      // Smooth scale interpolation
      robotGroupRef.current.scale.setScalar(
        THREE.MathUtils.lerp(robotGroupRef.current.scale.x, targetScale, delta * 4)
      );
    }

    // 2. Cursor tracking for Head Tilt (subtle and cute)
    if (headGroupRef.current) {
      const headTargetX = -cursorPos.y * 0.22;
      const headTargetY = cursorPos.x * 0.30;

      headGroupRef.current.rotation.x = THREE.MathUtils.lerp(
        headGroupRef.current.rotation.x,
        headTargetX,
        delta * 4
      );
      headGroupRef.current.rotation.y = THREE.MathUtils.lerp(
        headGroupRef.current.rotation.y,
        headTargetY,
        delta * 4
      );
    }

    // 3. Eye Blinking Logic
    blinkStateRef.current.nextBlink -= delta;
    if (blinkStateRef.current.nextBlink <= 0 && !blinkStateRef.current.isBlinking) {
      blinkStateRef.current.isBlinking = true;
      blinkStateRef.current.blinkProgress = 0;
      blinkStateRef.current.nextBlink = 2.8 + Math.random() * 2.5;
    }

    if (blinkStateRef.current.isBlinking && eyesGroupRef.current) {
      blinkStateRef.current.blinkProgress += delta * 12;
      const scaleY = Math.max(
        0.08,
        Math.abs(Math.cos(blinkStateRef.current.blinkProgress * Math.PI))
      );
      eyesGroupRef.current.scale.y = scaleY;

      if (blinkStateRef.current.blinkProgress >= 1) {
        blinkStateRef.current.isBlinking = false;
        eyesGroupRef.current.scale.y = 1;
      }
    }

    // 4. Arm poses per section & service
    if (leftArmRef.current && rightArmRef.current) {
      let lRotZ = 0.18;
      let rRotZ = -0.18;
      let lRotX = 0;
      let rRotX = 0;

      if (currentSection === 'plans') {
        // Presenting pose: right arm extended forward and up
        rRotZ = -0.85;
        rRotX = -0.75;
        lRotZ = 0.28;
      } else if (currentSection === 'who' && workflowMode === 'manual') {
        // Tired slump
        lRotZ = 0.05;
        rRotZ = -0.05;
        lRotX = 0.35;
        rRotX = 0.35;
      } else if (currentSection === 'services') {
        // Active gestures based on service
        if (activeServiceIndex === 0) {
          // Consulting: holding magnifier
          rRotZ = -0.55;
          rRotX = -0.45;
        } else if (activeServiceIndex === 1) {
          // Systems: both arms out pointing to cubes
          lRotZ = 0.65;
          rRotZ = -0.65;
        } else {
          // Workflows: hands conducting
          lRotZ = 0.35 + Math.sin(t * 3) * 0.12;
          rRotZ = -0.35 - Math.cos(t * 3) * 0.12;
        }
      } else {
        // Natural idle sway
        lRotZ = 0.18 + Math.sin(t * 1.5) * 0.04;
        rRotZ = -0.18 - Math.sin(t * 1.5) * 0.04;
      }

      leftArmRef.current.rotation.z = THREE.MathUtils.lerp(
        leftArmRef.current.rotation.z,
        lRotZ,
        delta * 4
      );
      leftArmRef.current.rotation.x = THREE.MathUtils.lerp(
        leftArmRef.current.rotation.x,
        lRotX,
        delta * 4
      );
      rightArmRef.current.rotation.z = THREE.MathUtils.lerp(
        rightArmRef.current.rotation.z,
        rRotZ,
        delta * 4
      );
      rightArmRef.current.rotation.x = THREE.MathUtils.lerp(
        rightArmRef.current.rotation.x,
        rRotX,
        delta * 4
      );
    }

    // 5. Orbiting Thin Cream Ring & Floating Spheres
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.25;
      ringRef.current.rotation.x = 0.35 + Math.sin(t * 0.5) * 0.06;
    }

    if (spheresGroupRef.current) {
      spheresGroupRef.current.rotation.y += delta * 0.35;
    }

    // 6. Section 2 Props animation
    if (consultingPropRef.current) {
      consultingPropRef.current.rotation.y = t * 0.8;
    }
    if (systemsPropRef.current) {
      const dashScale = 0.85 + Math.sin(t * 5) * 0.15;
      systemsPropRef.current.scale.set(dashScale, dashScale, dashScale);
    }
    if (workflowsPropRef.current) {
      workflowsPropRef.current.rotation.z = Math.sin(t * 1.5) * 0.08;
    }

    // 7. Section 3 Manual vs Agent papers
    if (workflowPropsRef.current) {
      workflowPropsRef.current.rotation.y += delta * 0.28;
    }
  });

  return (
    <group ref={robotGroupRef} position={[0, 0, 0]}>
      {/* ================= MAIN ROBOT BODY (CUTE & MINI) ================= */}
      {/* ROUNDED COMPACT TORSO */}
      <mesh material={currentBodyMaterial} position={[0, 0, 0]} castShadow>
        <sphereGeometry args={[0.34, 32, 28]} />
      </mesh>

      {/* FRIENDLY GLOWING CHEST LIGHT (NO FROWN LINE) */}
      <mesh material={materials.eye} position={[0, 0.02, 0.32]}>
        <circleGeometry args={[0.045, 32]} />
      </mesh>

      {/* ================= ROBOT HEAD (SLIGHTLY LARGER FOR CUTE PROPORTIONS) ================= */}
      <group ref={headGroupRef} position={[0, 0.50, 0]}>
        {/* Head Shell */}
        <mesh material={currentBodyMaterial} castShadow>
          <sphereGeometry args={[0.38, 32, 28]} />
        </mesh>

        {/* Dark Visor */}
        <mesh material={materials.visor} position={[0, 0.02, 0.27]}>
          <boxGeometry args={[0.48, 0.20, 0.18]} />
        </mesh>

        {/* Glowing Orange Eyes inside Visor */}
        <group ref={eyesGroupRef} position={[0, 0.02, 0.37]}>
          {/* Left Eye */}
          <mesh material={materials.eye} position={[-0.11, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <capsuleGeometry args={[0.024, 0.045, 8, 16]} />
          </mesh>
          {/* Right Eye */}
          <mesh material={materials.eye} position={[0.11, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <capsuleGeometry args={[0.024, 0.045, 8, 16]} />
          </mesh>
        </group>

        {/* Small Cute Antenna */}
        <group position={[0, 0.38, 0]}>
          <mesh material={materials.darkJoint} position={[0, 0.08, 0]}>
            <cylinderGeometry args={[0.012, 0.014, 0.16, 16]} />
          </mesh>
          <mesh material={materials.eye} position={[0, 0.18, 0]}>
            <sphereGeometry args={[0.04, 16, 16]} />
          </mesh>
        </group>
      </group>

      {/* ================= SHORT STUBBY ARMS ================= */}
      {/* Left Arm */}
      <group ref={leftArmRef} position={[-0.36, 0.12, 0]}>
        <mesh material={materials.darkJoint}>
          <sphereGeometry args={[0.065, 16, 16]} />
        </mesh>
        <mesh material={currentBodyMaterial} position={[-0.08, -0.14, 0]} castShadow>
          <capsuleGeometry args={[0.055, 0.18, 12, 16]} />
        </mesh>
        <mesh material={materials.darkJoint} position={[-0.08, -0.28, 0]}>
          <sphereGeometry args={[0.055, 16, 16]} />
        </mesh>
      </group>

      {/* Right Arm */}
      <group ref={rightArmRef} position={[0.36, 0.12, 0]}>
        <mesh material={materials.darkJoint}>
          <sphereGeometry args={[0.065, 16, 16]} />
        </mesh>
        <mesh material={currentBodyMaterial} position={[0.08, -0.14, 0]} castShadow>
          <capsuleGeometry args={[0.055, 0.18, 12, 16]} />
        </mesh>
        <mesh material={materials.darkJoint} position={[0.08, -0.28, 0]}>
          <sphereGeometry args={[0.055, 16, 16]} />
        </mesh>
      </group>

      {/* ================= SHORT STUBBY FEET ================= */}
      <group position={[0, -0.36, 0]}>
        <mesh material={materials.darkJoint} position={[-0.16, -0.06, 0.02]} rotation={[Math.PI / 4, 0, 0]} castShadow>
          <capsuleGeometry args={[0.07, 0.08, 12, 16]} />
        </mesh>
        <mesh material={materials.darkJoint} position={[0.16, -0.06, 0.02]} rotation={[Math.PI / 4, 0, 0]} castShadow>
          <capsuleGeometry args={[0.07, 0.08, 12, 16]} />
        </mesh>
      </group>

      {/* ================= THIN CREAM RING (~1.3x ROBOT WIDTH) ================= */}
      <mesh ref={ringRef} material={materials.creamRing} position={[0, 0.12, 0]} rotation={[0.4, 0, 0]}>
        <torusGeometry args={[0.50, 0.009, 16, 64]} />
      </mesh>

      {/* ================= FLOATING PEARL SPHERES (MINI & PROPORTIONAL) ================= */}
      <group ref={spheresGroupRef}>
        <mesh material={materials.pearl} position={[0.68, 0.36, 0.28]}>
          <sphereGeometry args={[0.035, 20, 20]} />
        </mesh>
        <mesh material={materials.pearl} position={[-0.62, -0.24, 0.35]}>
          <sphereGeometry args={[0.026, 16, 16]} />
        </mesh>
        <mesh material={materials.pearl} position={[0.30, -0.48, -0.42]}>
          <sphereGeometry args={[0.030, 16, 16]} />
        </mesh>
      </group>

      {/* ================= SECTION 2 PROPS: SCALED FOR MINI ROBOT ================= */}
      {currentSection === 'services' && (
        <group position={[0, 0.1, 0]}>
          {/* SERVICE 1: AI Consulting (Mini chart bars & magnifier) */}
          {activeServiceIndex === 0 && (
            <group ref={consultingPropRef} position={[0.48, 0.10, 0.22]}>
              <mesh material={materials.glaze} position={[0, 0.18, 0]}>
                <torusGeometry args={[0.13, 0.016, 16, 32]} />
              </mesh>
              <mesh material={materials.visor} position={[0, 0.18, 0]}>
                <circleGeometry args={[0.12, 32]} />
              </mesh>
              <mesh material={materials.glowOrange} position={[-0.07, 0.08, 0]}>
                <boxGeometry args={[0.03, 0.11, 0.03]} />
              </mesh>
              <mesh material={materials.glowCyan} position={[0, 0.13, 0]}>
                <boxGeometry args={[0.03, 0.21, 0.03]} />
              </mesh>
              <mesh material={materials.eye} position={[0.07, 0.18, 0]}>
                <boxGeometry args={[0.03, 0.31, 0.03]} />
              </mesh>
            </group>
          )}

          {/* SERVICE 2: Connect Systems (Mini ERP & CRM cubes with dash link) */}
          {activeServiceIndex === 1 && (
            <group position={[0, 0, 0]}>
              <mesh position={[-0.64, 0.15, 0.1]}>
                <boxGeometry args={[0.20, 0.20, 0.20]} />
                <meshStandardMaterial map={erpTexture} roughness={0.3} />
              </mesh>
              <mesh position={[0.64, 0.15, 0.1]}>
                <boxGeometry args={[0.20, 0.20, 0.20]} />
                <meshStandardMaterial map={crmTexture} roughness={0.3} />
              </mesh>
              <group ref={systemsPropRef} position={[0, 0.15, 0.1]}>
                <mesh material={materials.eye} position={[-0.30, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
                  <cylinderGeometry args={[0.010, 0.010, 0.11, 8]} />
                </mesh>
                <mesh material={materials.glowCyan} position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
                  <cylinderGeometry args={[0.012, 0.012, 0.13, 8]} />
                </mesh>
                <mesh material={materials.eye} position={[0.30, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
                  <cylinderGeometry args={[0.010, 0.010, 0.11, 8]} />
                </mesh>
              </group>
            </group>
          )}

          {/* SERVICE 3: Custom Workflows (Chain of 4 mini glowing nodes) */}
          {activeServiceIndex === 2 && (
            <group ref={workflowsPropRef} position={[0, 0.05, 0.42]}>
              {[-0.24, -0.08, 0.08, 0.24].map((x, i) => (
                <mesh
                  key={i}
                  material={i % 2 === 0 ? materials.eye : materials.glowCyan}
                  position={[x, Math.sin(i * 1.5) * 0.06, 0]}
                >
                  <sphereGeometry args={[0.038, 16, 16]} />
                </mesh>
              ))}
              <mesh material={materials.creamRing} position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[0.008, 0.008, 0.52, 8]} />
              </mesh>
            </group>
          )}
        </group>
      )}

      {/* ================= SECTION 3 PROPS: WHO IT'S FOR ================= */}
      {currentSection === 'who' && (
        <group ref={workflowPropsRef} position={[0, 0.1, 0]}>
          {workflowMode === 'manual' ? (
            <group>
              <mesh material={materials.paperMat} position={[-0.42, 0.30, 0.25]} rotation={[0.4, 0.8, 0.2]}>
                <planeGeometry args={[0.16, 0.22]} />
              </mesh>
              <mesh material={materials.paperMat} position={[0.46, -0.20, 0.20]} rotation={[-0.6, 0.3, -0.5]}>
                <planeGeometry args={[0.15, 0.20]} />
              </mesh>
              <mesh material={materials.paperMat} position={[-0.32, -0.26, 0.35]} rotation={[0.2, -0.4, 0.9]}>
                <planeGeometry args={[0.16, 0.21]} />
              </mesh>
              <mesh material={materials.paperMat} position={[0.36, 0.34, -0.20]} rotation={[0.5, 0.5, 0.1]}>
                <planeGeometry args={[0.14, 0.19]} />
              </mesh>
            </group>
          ) : (
            <group>
              <mesh material={materials.tidyCardMat} position={[-0.38, 0.20, 0.26]} rotation={[0.1, -0.3, 0.1]}>
                <planeGeometry args={[0.16, 0.22]} />
              </mesh>
              <mesh material={materials.tidyCardMat} position={[0, 0.28, 0.34]} rotation={[0.05, 0, 0]}>
                <planeGeometry args={[0.16, 0.22]} />
              </mesh>
              <mesh material={materials.tidyCardMat} position={[0.38, 0.20, 0.26]} rotation={[0.1, 0.3, -0.1]}>
                <planeGeometry args={[0.16, 0.22]} />
              </mesh>
            </group>
          )}
        </group>
      )}

      {/* ================= SOFT ELLIPTICAL CONTACT SHADOW DIRECTLY UNDER FEET ================= */}
      <mesh position={[0, -0.44, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.70, 0.70]} />
        <meshBasicMaterial
          map={shadowTexture}
          transparent
          opacity={0.75}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}
