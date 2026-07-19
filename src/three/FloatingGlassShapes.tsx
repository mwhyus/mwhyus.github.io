import React, { useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Float, useScroll } from '@react-three/drei'
import * as THREE from 'three'

interface ShapeProps {
  position:       [number, number, number]
  scale?:         number
  rotationSpeed?: number
  floatIntensity?: number
  color?:         string
  transmission?:  number
  roughness?:     number
  metalness?:     number
  shape?:         'sphere' | 'torus' | 'dodecahedron' | 'icosahedron' | 'octahedron'
}

const GlassShape: React.FC<ShapeProps> = React.memo(({
  position,
  scale         = 1,
  rotationSpeed = 0.3,
  floatIntensity = 1,
  color         = '#DAA520',
  transmission  = 0.85,
  roughness     = 0.05,
  metalness     = 0.1,
  shape         = 'sphere',
}) => {
  const meshRef = useRef<THREE.Mesh>(null)
  const scroll  = useScroll()

  useFrame((_state, delta) => {
    if (!meshRef.current) return
    meshRef.current.rotation.x += delta * rotationSpeed * 0.3
    meshRef.current.rotation.y += delta * rotationSpeed

    if (scroll) {
      meshRef.current.position.y = position[1] + scroll.offset * -0.8
    }
  })

  const geometry = useMemo(() => {
    switch (shape) {
      case 'torus':        return <torusGeometry args={[1, 0.38, 32, 64]} />
      case 'dodecahedron': return <dodecahedronGeometry args={[1, 0]} />
      case 'icosahedron':  return <icosahedronGeometry args={[1, 1]} />
      case 'octahedron':   return <octahedronGeometry args={[1, 0]} />
      default:             return <sphereGeometry args={[1, 64, 64]} />
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

interface ParticleFieldProps {
  count: number
}

const ParticleField: React.FC<ParticleFieldProps> = React.memo(({ count }) => {
  const meshRef = useRef<THREE.Points>(null)

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)
    const amberColor = new THREE.Color('#DAA520')
    const goldColor  = new THREE.Color('#FFF0B3')

    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 20
      pos[i * 3 + 1] = (Math.random() - 0.5) * 12
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8 - 4

      const t = Math.random()
      const c = amberColor.clone().lerp(goldColor, t)
      col[i * 3]     = c.r
      col[i * 3 + 1] = c.g
      col[i * 3 + 2] = c.b
    }
    return [pos, col]
  }, [count])

  useFrame((state) => {
    if (!meshRef.current) return
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.02
    meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.01) * 0.05
  })

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color"    args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
})

ParticleField.displayName = 'ParticleField'

interface FloatingGlassShapesProps {
  isMobile: boolean
}

export const FloatingGlassShapes: React.FC<FloatingGlassShapesProps> = ({ isMobile }) => {
  const { viewport } = useThree()
  const vw = viewport.width
  const vh = viewport.height

  const desktopShapes: ShapeProps[] = [

    { position: [vw * 0.36, vh * 0.12, -2.5],  scale: 1.4,  shape: 'sphere',       color: '#DAA520', transmission: 0.9,  floatIntensity: 1.2, rotationSpeed: 0.2 },
    { position: [-vw * 0.34, -vh * 0.08, -3.5], scale: 1.1,  shape: 'torus',        color: '#D4AF37', transmission: 0.8,  floatIntensity: 0.8, rotationSpeed: 0.3 },

    { position: [vw * 0.1,  -vh * 0.3,  -5],    scale: 0.8,  shape: 'dodecahedron', color: '#B8860B', transmission: 0.7,  floatIntensity: 1.0, rotationSpeed: 0.15 },
    { position: [-vw * 0.2,  vh * 0.32, -5.5],  scale: 1.6,  shape: 'icosahedron',  color: '#C9A227', transmission: 0.85, floatIntensity: 0.6, rotationSpeed: 0.25 },
    { position: [vw * 0.46, -vh * 0.42, -4.5],  scale: 0.6,  shape: 'octahedron',   color: '#E8C96A', transmission: 0.75, floatIntensity: 1.4, rotationSpeed: 0.4  },

    { position: [-vw * 0.44,  vh * 0.18, -7],   scale: 2.2,  shape: 'sphere',       color: '#8B6914', transmission: 0.55, floatIntensity: 0.4, rotationSpeed: 0.08 },
    { position: [vw * 0.2,   -vh * 0.1,  -8],   scale: 1.8,  shape: 'icosahedron',  color: '#C9A227', transmission: 0.5,  floatIntensity: 0.3, rotationSpeed: 0.06 },
    { position: [-vw * 0.1,   vh * 0.4,  -9],   scale: 1.4,  shape: 'dodecahedron', color: '#DAA520', transmission: 0.45, floatIntensity: 0.2, rotationSpeed: 0.05 },
  ]

  const mobileShapes: ShapeProps[] = [
    { position: [vw * 0.3,   vh * 0.12,  -3],  scale: 0.8, shape: 'sphere', color: '#DAA520', transmission: 0.9, floatIntensity: 1.0, rotationSpeed: 0.2 },
    { position: [-vw * 0.3, -vh * 0.12,  -4],  scale: 0.6, shape: 'torus',  color: '#D4AF37', transmission: 0.8, floatIntensity: 0.8, rotationSpeed: 0.3 },
  ]

  const shapes        = isMobile ? mobileShapes : desktopShapes
  const particleCount = isMobile ? 0 : 120

  return (
    <>
      {particleCount > 0 && <ParticleField count={particleCount} />}
      {shapes.map((props, i) => (
        <GlassShape key={i} {...props} />
      ))}
    </>
  )
}
