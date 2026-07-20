import React, { useRef, useCallback, useState, useEffect } from 'react'
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from 'framer-motion'
import { Button } from '../../atoms/Button'
import { CoconutTree } from '../../atoms/CoconutTree'
import { entranceTransition, staggerContainer, wordVariant } from '../../hooks/motionVariants'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import styles from './Hero.module.scss'

const ROLES = [
  'Frontend Developer',
  'React & TypeScript Architect',
  'UI/UX Engineering Craftsman',
  'Tech Explorer',
]

export const Hero: React.FC = React.memo(() => {
  const [roleIdx, setRoleIdx] = useState(0)
  const shouldReduce = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)

  /* Scroll parallax */
  const { scrollY } = useScroll()
  const yBg = useTransform(scrollY, [0, 1000], [0, shouldReduce ? 0 : 120])
  const yMid = useTransform(scrollY, [0, 1000], [0, shouldReduce ? 0 : 25])
  const yFg = useTransform(scrollY, [0, 1000], [0, shouldReduce ? 0 : -80])
  const opacityFade = useTransform(scrollY, [0, 450], [1, 0])
  const opacityBg = useTransform(scrollY, [0, 500], [0.55, 0])
  const opacityFg = useTransform(scrollY, [0, 400], [0.85, 0])

  /* Spring-physics mouse tracking for 3D portrait tilt */
  const rawMouseX = useMotionValue(0)
  const rawMouseY = useMotionValue(0)
  const springCfg = { stiffness: 110, damping: 26, mass: 0.8 }
  const rotateY = useSpring(useTransform(rawMouseX, [-0.5, 0.5], [-8, 8]), springCfg)
  const rotateX = useSpring(useTransform(rawMouseY, [-0.5, 0.5], [6, -6]), springCfg)
  const glowOp = useSpring(useTransform(rawMouseX, [-0.5, 0.5], [0.2, 0.6]), { stiffness: 80, damping: 24 })

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (shouldReduce) return
    const rect = sectionRef.current?.getBoundingClientRect()
    if (!rect) return
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    rawMouseX.set(x)
    rawMouseY.set(y)
  }, [rawMouseX, rawMouseY, shouldReduce])

  const handleMouseLeave = useCallback(() => {
    rawMouseX.set(0)
    rawMouseY.set(0)
  }, [rawMouseX, rawMouseY])

  /* Role cycling interval */
  useEffect(() => {
    const timer = setInterval(() => setRoleIdx(i => (i + 1) % ROLES.length), 3400)
    return () => clearInterval(timer)
  }, [])

  const scrollToProjects = () =>
    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section
      id="home"
      ref={sectionRef}
      className={styles.hero}
      aria-label="Hero section"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* ── Background Image & Overlay ── */}
      <motion.div className={styles.bgImage} style={{ y: yBg }} aria-hidden="true" />
      <div className={styles.bgOverlay} aria-hidden="true" />

      {/* ── Background Palm Trees Layer ── */}
      <motion.div className={styles.layerBg} style={{ y: yBg, opacity: opacityBg }} aria-hidden="true">
        <CoconutTree className={`${styles.tree} ${styles.treeBgLeft}`} />
        <CoconutTree className={`${styles.tree} ${styles.treeBgRight}`} />
      </motion.div>

      {/* ══════════════════════════════════════════════════════════
          MAIN HERO GRID (Asymmetric 2-column)
      ══════════════════════════════════════════════════════════ */}
      <motion.div className={styles.heroGrid} style={{ y: yMid, opacity: opacityFade }}>

        {/* ── Left Column: Personal Title & Bio ── */}
        <div className={styles.textCol}>

          {/* Clean executive full name typography */}
          <motion.h1
            className={styles.nameBlock}
            initial="hidden"
            animate="show"
            variants={staggerContainer}
            aria-label="Muhammad Wahyu Santoso"
          >
            <motion.span className={styles.greetingText} variants={wordVariant}>
              Hello, I'm
            </motion.span>
            <motion.span className={styles.fullName} variants={wordVariant}>
              Muhammad <span className={styles.accentName}>Wahyu</span> Santoso
            </motion.span>
          </motion.h1>

          {/* Glass Role Badge Pill */}
          <motion.div
            className={styles.rolePillWrapper}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...entranceTransition, delay: 0.3 }}
          >
            <div className={styles.rolePill} aria-live="polite">
              <span className={styles.roleBracket}>&lt;</span>
              <div className={styles.roleContent}>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={ROLES[roleIdx]}
                    className={styles.roleText}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  >
                    {ROLES[roleIdx]}
                  </motion.span>
                </AnimatePresence>
              </div>
              <span className={styles.roleBracket}>/&gt;</span>
            </div>
          </motion.div>

          <p className={styles.tagline}>
            Engineering ultra smooth, high-impact digital experiences with modern web technologies and 3D visual design systems.
          </p>

          {/* CTAs */}
          <motion.div
            className={styles.ctas}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...entranceTransition, delay: 0.5 }}
          >
            <Button variant="gold" onClick={scrollToProjects}>
              View Projects
            </Button>
            <Button variant="glass" href="https://www.linkedin.com/in/mwhyus/" target="_blank">
              Get Connected
            </Button>
          </motion.div>

        </div>

        {/* ── Right Column: Layered Portrait ── */}
        <div className={styles.portraitCol}>
          <div className={styles.portraitTiltOuter}>
            <motion.div
              className={styles.portraitInner}
              style={shouldReduce ? {} : { rotateX, rotateY }}
              initial={{ scale: 0.9, opacity: 0, y: 24 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ ...entranceTransition, delay: 0.2 }}
            >
              {/* Warm golden ambient glow */}
              <motion.div
                className={styles.timbulAmbientGlow}
                style={{ opacity: glowOp }}
                aria-hidden="true"
              />

              {/* 3D Rim light overlay */}
              <div className={styles.rimLight} aria-hidden="true" />

              {/* Profile Image in Glass Ambient Frame with Orbiting Particle Ring */}
              <div className={styles.profileFrame}>
                <div className={styles.particleRing} aria-hidden="true">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <span
                      key={i}
                      className={styles.orbParticle}
                      style={{ '--idx': i, '--total': 12 } as React.CSSProperties}
                    />
                  ))}
                </div>

                <div className={styles.imageWrapper}>
                  <img
                    src="/pic/wahyu2.jpeg"
                    alt="Muhammad Wahyu Santoso — Frontend Developer"
                    className={styles.timbulPic}
                  />
                  <div className={styles.amberOverlay} aria-hidden="true" />
                </div>
              </div>

              {/* Base Dissolve Fade */}
              <div className={styles.timbulBottomFade} aria-hidden="true" />
            </motion.div>
          </div>
        </div>

      </motion.div>

      {/* ── Foreground Palm Trees Layer ── */}
      <motion.div className={styles.layerFg} style={{ y: yFg, opacity: opacityFg }} aria-hidden="true">
        <CoconutTree className={`${styles.tree} ${styles.treeFgLeft}`} />
        <CoconutTree className={`${styles.tree} ${styles.treeFgRight}`} />
      </motion.div>

      {/* ── Scroll Hint ── */}
      <motion.div className={styles.scrollHintWrapper} style={{ opacity: opacityFade }}>
        <div className={styles.scrollPill} aria-label="Scroll to explore">
          <motion.div
            className={styles.scrollDot}
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          />
        </div>
        <span className={styles.scrollLabel}>SCROLL TO EXPLORE</span>
      </motion.div>

    </section>
  )
})

Hero.displayName = 'Hero'
