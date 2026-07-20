import React, { useRef, useMemo, useState, useCallback } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, PerformanceMonitor } from '@react-three/drei'
import * as THREE from 'three'

interface Hero3DCanvasProps {
  isMobile: boolean
  mouseX: number
  mouseY: number
}

interface GlassRingProps {
  position: [number, number, number]
  scale?: number
  color?: string
  rotationSpeed?: number
  mouseX: number
  mouseY: number
}

const InteractiveGlassRing: React.FC<GlassRingProps> = React.memo(({
  position,
  scale = 1,
  color = '#DAA520',
  rotationSpeed = 0.2,
  mouseX,
  mouseY,
}) => {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((_state, delta) => {
    if (!meshRef.current) return
    meshRef.current.rotation.x += delta * rotationSpeed * 0.4 + mouseY * 0.01
    meshRef.current.rotation.y += delta * rotationSpeed + mouseX * 0.01
  })

  return (
    <Float
      speed={1.5}
      rotationIntensity={0.5}
      floatIntensity={1.2}
      floatingRange={[-0.2, 0.2]}
    >
      <mesh ref={meshRef} position={position} scale={scale}>
        <torusGeometry args={[1, 0.3, 32, 64]} />
        <meshPhysicalMaterial
          color={color}
          transmission={0.88}
          roughness={0.08}
          metalness={0.15}
          ior={1.52}
          thickness={0.6}
          envMapIntensity={1.6}
          transparent
          opacity={0.8}
          side={THREE.DoubleSide}
        />
      </mesh>
    </Float>
  )
})

InteractiveGlassRing.displayName = 'InteractiveGlassRing'

interface FloatingParticleOrbProps {
  position: [number, number, number]
  scale?: number
  color?: string
}

const FloatingParticleOrb: React.FC<FloatingParticleOrbProps> = React.memo(({
  position,
  scale = 0.5,
  color = '#D4AF37',
}) => {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!meshRef.current) return
    meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 1.5 + position[0]) * 0.15
  })

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <icosahedronGeometry args={[1, 1]} />
      <meshPhysicalMaterial
        color={color}
        transmission={0.92}
        roughness={0.05}
        metalness={0.2}
        ior={1.5}
        transparent
        opacity={0.7}
      />
    </mesh>
  )
})

FloatingParticleOrb.displayName = 'FloatingParticleOrb'

export const Hero3DCanvas: React.FC<Hero3DCanvasProps> = React.memo(({ isMobile, mouseX, mouseY }) => {
  const [dpr, setDpr] = useState<[number, number]>([1, 2])

  const onDecline = useCallback(() => setDpr([0.75, 1]), [])
  const onIncline = useCallback(() => setDpr([1, 2]), [])

  const shapes = useMemo(() => {
    if (isMobile) return []
    return [
      { position: [2.2, 0.8, -1] as [number, number, number], scale: 0.95, color: '#DAA520', rotationSpeed: 0.25 },
      { position: [-2.0, -1.2, -1.8] as [number, number, number], scale: 0.7, color: '#D4AF37', rotationSpeed: 0.18 },
      { position: [1.8, -1.4, -0.5] as [number, number, number], scale: 0.45, color: '#FFE074', rotationSpeed: 0.35 },
    ]
  }, [isMobile])

  if (isMobile) return null

  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 2 }}>
      <Canvas
        dpr={dpr}
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <PerformanceMonitor onDecline={onDecline} onIncline={onIncline} />

        <ambientLight intensity={0.6} color="#FFF0B3" />
        <directionalLight position={[5, 5, 4]} intensity={1.5} color="#DAA520" />
        <pointLight position={[-4, -3, 2]} intensity={0.8} color="#FF8C00" />

        {shapes.map((s, i) => (
          <InteractiveGlassRing
            key={i}
            position={s.position}
            scale={s.scale}
            color={s.color}
            rotationSpeed={s.rotationSpeed}
            mouseX={mouseX}
            mouseY={mouseY}
          />
        ))}

        <FloatingParticleOrb position={[2.6, -0.2, 0.5]} scale={0.25} color="#FFE074" />
        <FloatingParticleOrb position={[-2.4, 1.4, -0.8]} scale={0.35} color="#DAA520" />
      </Canvas>
    </div>
  )
})

Hero3DCanvas.displayName = 'Hero3DCanvas'
