// ============================================================
// BackgroundCanvas.tsx — R3F Canvas with performance monitoring
// DESIGN.md §3D Style Guide:
//   - PerformanceMonitor for adaptive DPR
//   - Mobile fov adjustment (no scroll-jacking)
//   - Warm golden lighting
// ============================================================
import React, { useState, useCallback } from 'react'
import { Canvas } from '@react-three/fiber'
import { PerformanceMonitor, Environment } from '@react-three/drei'
import { FloatingGlassShapes } from './FloatingGlassShapes'
import styles from './BackgroundCanvas.module.scss'

interface BackgroundCanvasProps {
  isMobile: boolean
}

export const BackgroundCanvas: React.FC<BackgroundCanvasProps> = ({ isMobile }) => {
  const [dpr, setDpr] = useState<[number, number]>([1, 2])

  // Adaptive DPR: degrade on low-end devices
  const onDecline = useCallback(() => setDpr([0.75, 1]), [])
  const onIncline = useCallback(() => setDpr([1, 2]), [])

  const fov = isMobile ? 55 : 50 // Tighter FOV on mobile to keep shapes centralized

  return (
    <div className={styles.canvasWrapper} aria-hidden="true">
      <Canvas
        dpr={dpr}
        camera={{ position: [0, 0, 6], fov }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <PerformanceMonitor onDecline={onDecline} onIncline={onIncline} />

        {/* Warm ambient — Golden Hour feel */}
        <ambientLight intensity={0.6} color="#FFF0B3" />

        {/* Warm key light from top-right */}
        <directionalLight
          position={[5, 5, 3]}
          intensity={1.2}
          color="#DAA520"
        />

        {/* Cool fill light for depth contrast */}
        <pointLight position={[-4, -3, -2]} intensity={0.5} color="#1a2a6c" />

        {/* Rim light — subtle amber glow */}
        <pointLight position={[0, 4, -4]} intensity={0.8} color="#D4AF37" />

        {/* HDR environment for realistic glass reflections */}
        <Environment preset="sunset" />

        <FloatingGlassShapes isMobile={isMobile} />
      </Canvas>
    </div>
  )
}
