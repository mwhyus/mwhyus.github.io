/**
 * WaveShader.tsx
 *
 * Full-screen GLSL shader plane that renders flowing wave and wind patterns
 * inspired by ocean currents at sunset. Runs entirely on the GPU (1 draw call).
 *
 * Color System: Precisely aligned with the Hero section's "Warm Sunset Meets
 * Deep Twilight" palette. Every color value is derived from the Hero's CSS
 * overlay layers (bgOverlay radial/linear gradients) and design token variables.
 */
import React, { useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

// ─── GLSL Shaders ────────────────────────────────────────────────────────────

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`

const fragmentShader = `
  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec2 uMouse;
  uniform float uMouseInfluence;
  uniform int uOctaves;
  varying vec2 vUv;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i + vec2(0.0,0.0)), hash(i + vec2(1.0,0.0)), u.x),
               mix(hash(i + vec2(0.0,1.0)), hash(i + vec2(1.0,1.0)), u.x), u.y);
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    vec2 shift = vec2(100.0);
    mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
    for (int i = 0; i < 4; i++) {
      if (i >= uOctaves) break;
      v += a * noise(p);
      p = rot * p * 2.0 + shift;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 uv = vUv;

    // ── 1. Cursor Wind Distortion ──────────────────────────────────────────
    vec2 mouseUV = uMouse + vec2(0.5);
    float dist = distance(uv, mouseUV);
    vec2 mouseDir = uv - mouseUV;
    float influence = smoothstep(0.42, 0.0, dist) * uMouseInfluence;
    if (dist > 0.0001) {
      uv += normalize(mouseDir) * influence * 0.07;
    }

    // ── 2. Wave Geometry ───────────────────────────────────────────────────
    vec2 waveUv = uv * vec2(1.3, 3.2);

    // ── 3. Domain Warping ──────────────────────────────────────────────────
    vec2 q;
    q.x = fbm(waveUv + vec2(0.0, 0.0) - uTime * 0.04);
    q.y = fbm(waveUv + vec2(5.2, 1.3) - uTime * 0.02);

    vec2 r;
    r.x = fbm(waveUv + 3.0 * q + vec2(1.7, 9.2) - uTime * 0.015);
    r.y = fbm(waveUv + 3.0 * q + vec2(8.3, 2.8) - uTime * 0.025);

    float f = fbm(waveUv + 3.0 * r);

    // ── 4. Hero-Aligned Color System ──────────────────────────────────────
    //
    // Sources (Hero bgOverlay, design tokens):
    //   linear-gradient  rgba(10,13,20)                = #0A0D14 Dark Fog veil
    //   radial @62% Y    rgba(180,80,0, 0.22)          = sunset-orange horizon
    //   radial @100% Y   rgba(40,15,60, 0.32)          = twilight-plum base
    //   --color-bg-deep  #0A0A0B                       = Midnight Slate
    //   --color-accent-amber  #DAA520                  = Amber
    //   --color-accent-gold   #D4AF37                  = Soft Gold

    // A. Sky base gradient — Midnight Slate fading to Dark Fog (top -> bottom)
    vec3 skyTop  = vec3(0.039, 0.039, 0.043); // #0A0A0B Midnight Slate
    vec3 fogBase = vec3(0.039, 0.051, 0.078); // #0A0D14 Dark Fog
    vec3 baseSky = mix(skyTop, fogBase, uv.y);

    // B. Twilight Plum — cool, dark depth-layer derived from rgba(40,15,60)
    //    Significantly desaturated/darkened; conveys depth, not distraction
    vec3 plum = vec3(0.098, 0.055, 0.137); // ~#191023

    // C. Warm Deep Navy — flowing current body
    //    Desaturated and slightly warm; NOT electric blue.
    //    Derived from #1A2A6C shifted toward warmth and reduced saturation
    vec3 navy = vec3(0.071, 0.082, 0.176); // ~#12152D

    // D. Wave current blending driven by FBM noise value
    vec3 color = mix(baseSky, navy,  clamp(f * 1.1,         0.0, 1.0));
    color      = mix(color,   plum,  clamp((f - 0.3) * 0.9, 0.0, 1.0));

    // E. Sunset Orange Horizon Glow — rgba(180,80,0) Hero radial at 62% Y
    //    Bleeds in at the lower portion of the canvas.
    //    This is the critical connective tissue that fuses the canvas horizon
    //    with the Hero photo's warm orange beach glow below the text.
    float horizonFactor = smoothstep(0.55, 1.0, uv.y) * 0.18;
    vec3 sunsetOrange   = vec3(0.706, 0.314, 0.0); // rgb(180,80,0)
    color = mix(color, sunsetOrange, horizonFactor * (0.5 + f * 0.5));

    // F. Wave Crest Highlights — amber/gold, dust-attenuated through haze
    //    The 0.22 mix toward plum replicates light scattering through humid
    //    sunset air, eliminating the neon-edge effect of raw amber
    float crest         = smoothstep(0.46, 0.74, f);
    vec3 amber          = vec3(0.855, 0.647, 0.125); // #DAA520
    vec3 softGold       = vec3(0.831, 0.686, 0.216); // #D4AF37
    vec3 highlight      = mix(amber, softGold, r.x);
    highlight           = mix(highlight, plum * 2.0, 0.22); // atmospheric scattering
    color               = mix(color, highlight, crest * 0.22);

    // G. Cursor Warm Shimmer — golden light catching slow waves at the cursor
    float cursorGlow = smoothstep(0.30, 0.0, dist) * uMouseInfluence;
    color += softGold * cursorGlow * 0.15;

    gl_FragColor = vec4(color, 1.0);
  }
`

// ─── React Component ─────────────────────────────────────────────────────────

interface WaveShaderProps {
  isMobile: boolean
  mouse: React.RefObject<{ x: number; y: number }>
  reducedMotion: boolean
}

export const WaveShader: React.FC<WaveShaderProps> = ({ isMobile, mouse, reducedMotion }) => {
  const meshRef = useRef<THREE.Mesh>(null)
  const materialRef = useRef<THREE.ShaderMaterial>(null)
  const { size } = useThree()

  const uniforms = useMemo(() => ({
    uTime:           { value: 0 },
    uResolution:     { value: new THREE.Vector2(size.width, size.height) },
    uMouse:          { value: new THREE.Vector2(0, 0) },
    uMouseInfluence: { value: reducedMotion ? 0.0 : 1.0 },
    uOctaves:        { value: isMobile ? 2 : 4 },
  }), [isMobile, reducedMotion, size.width, size.height])

  useFrame((state) => {
    if (!materialRef.current) return

    const timeDelta = reducedMotion
      ? state.clock.getElapsedTime() * 0.03
      : state.clock.getElapsedTime()

    materialRef.current.uniforms.uTime.value = timeDelta

    const target = mouse.current ?? { x: 0, y: 0 }
    const current = materialRef.current.uniforms.uMouse.value as THREE.Vector2
    current.x = THREE.MathUtils.lerp(current.x, target.x, 0.05)
    current.y = THREE.MathUtils.lerp(current.y, target.y, 0.05)
  })

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        depthWrite={false}
        depthTest={false}
      />
    </mesh>
  )
}
