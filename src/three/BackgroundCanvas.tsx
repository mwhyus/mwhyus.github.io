import React, { useState, useCallback } from 'react'
import { Canvas } from '@react-three/fiber'
import { PerformanceMonitor, Environment, ScrollControls } from '@react-three/drei'
import { FloatingGlassShapes } from './FloatingGlassShapes'
import styles from './BackgroundCanvas.module.scss'

interface BackgroundCanvasProps {
  isMobile: boolean
}

export const BackgroundCanvas: React.FC<BackgroundCanvasProps> = ({ isMobile }) => {
  const [dpr, setDpr] = useState<[number, number]>([1, 2])

  const onDecline = useCallback(() => setDpr([0.75, 1]), [])
  const onIncline = useCallback(() => setDpr([1, 2]),   [])

  const fov = isMobile ? 55 : 50

  return (
    <div className={styles.canvasWrapper} aria-hidden="true">
      <Canvas
        dpr={dpr}
        camera={{ position: [0, 0, 6], fov }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <PerformanceMonitor onDecline={onDecline} onIncline={onIncline} />

        {}
        <fog attach="fog" args={['#0a0d14', 8, 22]} />

        {}
        <ambientLight intensity={0.5} color="#FFF0B3" />

        {}
        <directionalLight
          position={[6, 6, 3]}
          intensity={1.4}
          color="#DAA520"
        />

        {}
        <pointLight position={[-5, -4, -3]} intensity={0.6} color="#1a2a6c" />

        {}
        <pointLight position={[0, 5, -5]} intensity={1.0} color="#D4AF37" />

        {}
        <pointLight position={[2, -4, 2]} intensity={0.3} color="#FF8C00" />

        {}
        <Environment preset="sunset" />

        {}
        <ScrollControls pages={0} damping={0.3}>
          <FloatingGlassShapes isMobile={isMobile} />
        </ScrollControls>
      </Canvas>
    </div>
  )
}
