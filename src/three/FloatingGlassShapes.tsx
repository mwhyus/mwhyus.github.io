// ============================================================
// FloatingGlassShapes.tsx — Apple-style 3D floating glass objects
// DESIGN.md §3D Style Guide:
//   - MeshPhysicalMaterial (roughness + transmission)
//   - drei Float for organic motion
//   - Warm ambient lighting (amber/gold)
//   - PerformanceMonitor for adaptive quality
// ============================================================
import React, { useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

interface ShapeProps {
  position: [number, number, number]
  scale?: number
  rotationSpeed?: number
  floatIntensity?: number
  color?: string
  transmission?: number
  roughness?: number
  metalness?: number
  shape?: 'sphere' | 'torus' | 'dodecahedron' | 'icosahedron' | 'octahedron'
}

const GlassShape: React.FC<ShapeProps> = React.memo(({
  position,
  scale = 1,
  rotationSpeed = 0.3,
  floatIntensity = 1,
  color = '#DAA520',
  transmission = 0.85,
  roughness = 0.05,
  metalness = 0.1,
  shape = 'sphere',
}) => {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((_state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * rotationSpeed * 0.3
      meshRef.current.rotation.y += delta * rotationSpeed
    }
  })

  const geometry = useMemo(() => {
    switch (shape) {
      case 'torus':         return <torusGeometry args={[1, 0.38, 32, 64]} />
      case 'dodecahedron':  return <dodecahedronGeometry args={[1, 0]} />
      case 'icosahedron':   return <icosahedronGeometry args={[1, 1]} />
      case 'octahedron':    return <octahedronGeometry args={[1, 0]} />
      default:              return <sphereGeometry args={[1, 64, 64]} />
    }
  }, [shape])

  return (
    <Float
      speed={1.2}
      rotationIntensity={0.4}
      floatIntensity={floatIntensity}
      floatingRange={[-0.15, 0.15]}
    >
      <mesh ref={meshRef} position={position} scale={scale} castShadow>
        {geometry}
        <meshPhysicalMaterial
          color={color}
          transmission={transmission}
          roughness={roughness}
          metalness={metalness}
          ior={1.5}
          thickness={0.5}
          envMapIntensity={1.5}
          transparent
          opacity={0.75}
          side={THREE.FrontSide}
        />
      </mesh>
    </Float>
  )
})

GlassShape.displayName = 'GlassShape'

interface FloatingGlassShapesProps {
  isMobile: boolean
}

export const FloatingGlassShapes: React.FC<FloatingGlassShapesProps> = ({ isMobile }) => {
  const { viewport } = useThree()
  const vw = viewport.width
  const vh = viewport.height

  // Desktop shapes — rich scene
  const desktopShapes: ShapeProps[] = [
    { position: [vw * 0.35, vh * 0.1, -3],  scale: 1.4, shape: 'sphere',       color: '#DAA520', transmission: 0.9,  floatIntensity: 1.2, rotationSpeed: 0.2 },
    { position: [-vw * 0.35, -vh * 0.05, -4], scale: 1.1, shape: 'torus',       color: '#D4AF37', transmission: 0.8,  floatIntensity: 0.8, rotationSpeed: 0.3 },
    { position: [vw * 0.1, -vh * 0.3, -5],   scale: 0.8, shape: 'dodecahedron', color: '#B8860B', transmission: 0.7,  floatIntensity: 1.0, rotationSpeed: 0.15 },
    { position: [-vw * 0.2, vh * 0.3, -6],   scale: 1.6, shape: 'icosahedron',  color: '#C9A227', transmission: 0.85, floatIntensity: 0.6, rotationSpeed: 0.25 },
    { position: [vw * 0.45, -vh * 0.4, -4],  scale: 0.6, shape: 'octahedron',   color: '#E8C96A', transmission: 0.75, floatIntensity: 1.4, rotationSpeed: 0.4  },
    { position: [-vw * 0.45, vh * 0.15, -7], scale: 2.0, shape: 'sphere',       color: '#8B6914', transmission: 0.6,  floatIntensity: 0.4, rotationSpeed: 0.1  },
  ]

  // Mobile shapes — simplified for performance
  const mobileShapes: ShapeProps[] = [
    { position: [vw * 0.3, vh * 0.1, -3],  scale: 0.8, shape: 'sphere',  color: '#DAA520', transmission: 0.9, floatIntensity: 1.0, rotationSpeed: 0.2 },
    { position: [-vw * 0.3, -vh * 0.1, -4], scale: 0.6, shape: 'torus',  color: '#D4AF37', transmission: 0.8, floatIntensity: 0.8, rotationSpeed: 0.3 },
  ]

  const shapes = isMobile ? mobileShapes : desktopShapes

  return (
    <>
      {shapes.map((props, i) => (
        <GlassShape key={i} {...props} />
      ))}
    </>
  )
}
