/**
 * BackgroundCanvas.tsx
 *
 * Renders the flowing wave and wind energy background shader.
 * Acts as an immersive, slow-breathing sunset environment behind the website content.
 *
 * Implements "Warm Sunset Meets Deep Twilight" design system.
 * Spec: implementation_plan.md
 */
import React, { useState, useCallback } from 'react'
import { Canvas } from '@react-three/fiber'
import { PerformanceMonitor } from '@react-three/drei'
import { WaveShader } from './WaveShader'
import { useMouseParallax } from '../hooks/useMouseParallax'
import { useReducedMotion } from '../hooks/useReducedMotion'
import styles from './BackgroundCanvas.module.scss'

interface BackgroundCanvasProps {
  isMobile: boolean
}

export const BackgroundCanvas: React.FC<BackgroundCanvasProps> = ({ isMobile }) => {
  const [dpr, setDpr] = useState<[number, number]>([1, 2])
  const mouse = useMouseParallax()
  const reducedMotion = useReducedMotion()

  const onDecline = useCallback(() => setDpr([0.75, 1]), [])
  const onIncline  = useCallback(() => setDpr([1, 2]),   [])

  return (
    <div className={styles.canvasWrapper} aria-hidden="true">
      <Canvas
        dpr={dpr}
        gl={{ antialias: true, alpha: false, depth: false, stencil: false }}
        camera={{ position: [0, 0, 1] }}
        style={{ background: '#0a0d14' }}
      >
        <PerformanceMonitor onDecline={onDecline} onIncline={onIncline} />

        {/* ── Wave and Wind Custom Shader ── */}
        <WaveShader
          isMobile={isMobile}
          mouse={mouse}
          reducedMotion={reducedMotion}
        />
      </Canvas>
    </div>
  )
}
