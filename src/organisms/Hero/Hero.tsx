import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Button } from '../../atoms/Button'
import { CoconutTree } from '../../atoms/CoconutTree'
import {
  entranceTransition,
  staggerContainer,
  fadeInUp,
  wordVariant,
} from '../../hooks/motionVariants'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import styles from './Hero.module.scss'

const TYPED_ROLES = [
  'Frontend Developer',
  'React Enthusiast',
  'UI/UX Craftsman',
  'Tech Explorer',
]

const Sparkles: React.FC = React.memo(() => (
  <div className={styles.sparkles} aria-hidden="true">
    {Array.from({ length: 6 }).map((_, i) => (
      <span key={i} className={styles.sparkle} style={{ '--i': i } as React.CSSProperties} />
    ))}
  </div>
))
Sparkles.displayName = 'Sparkles'

export const Hero: React.FC = React.memo(() => {
  const [roleIndex, setRoleIndex] = React.useState(0)
  const [displayed, setDisplayed] = React.useState('')
  const [typing, setTyping] = React.useState(true)
  const shouldReduce = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)

  const { scrollY } = useScroll()
  const yBg = useTransform(scrollY, [0, 1000], [0, shouldReduce ? 0 : 150])
  const yMid = useTransform(scrollY, [0, 1000], [0, shouldReduce ? 0 : 50])
  const yFg = useTransform(scrollY, [0, 1000], [0, shouldReduce ? 0 : -100])
  const opacityFade = useTransform(scrollY, [0, 400], [1, 0])

  const scaleProfile = useTransform(scrollY, [0, 500], [1, shouldReduce ? 1 : 1.22])
  const rotateProfile = useTransform(scrollY, [0, 500], [0, shouldReduce ? 0 : 6])

  const opacityBg = useTransform(scrollY, [0, 500], [0.55, 0])
  const opacityFg = useTransform(scrollY, [0, 400], [0.85, 0])

  React.useEffect(() => {
    const role = TYPED_ROLES[roleIndex]
    let timeout: ReturnType<typeof setTimeout>

    if (typing) {
      if (displayed.length < role.length) {
        timeout = setTimeout(() => setDisplayed(role.slice(0, displayed.length + 1)), 80)
      } else {
        timeout = setTimeout(() => setTyping(false), 2000)
      }
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40)
      } else {
        setRoleIndex(i => (i + 1) % TYPED_ROLES.length)
        setTyping(true)
      }
    }
    return () => clearTimeout(timeout)
  }, [displayed, typing, roleIndex])

  const scrollToProjects = () =>
    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section
      id="home"
      ref={sectionRef}
      className={styles.hero}
      aria-label="Hero section"
    >
      <motion.div className={styles.bgImage} style={{ y: yBg }} aria-hidden="true" />
      <div className={styles.bgOverlay} aria-hidden="true" />

      <motion.div className={styles.layerBg} style={{ y: yBg, opacity: opacityBg }} aria-hidden="true">
        <CoconutTree className={`${styles.tree} ${styles.treeBgLeft}`} />
        <CoconutTree className={`${styles.tree} ${styles.treeBgRight}`} />
      </motion.div>

      <motion.div className={styles.container} style={{ y: yMid, opacity: opacityFade }}>
        <div className={styles.content}>
          <motion.div
            style={{
              scale: scaleProfile,
              rotate: rotateProfile,
              transformStyle: 'preserve-3d',
            }}
          >
            <motion.div
              className={styles.profileFrame}
              initial={{ scale: shouldReduce ? 1 : 0.75, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ ...entranceTransition, delay: 0.1 }}
            >
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
                  alt="Muhammad Wahyu Santoso"
                  className={styles.profilePic}
                />
                <div className={styles.amberOverlay} aria-hidden="true" />
              </div>
            </motion.div>
          </motion.div>

          <motion.p
            className={styles.greeting}
            initial={{ y: shouldReduce ? 0 : 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ ...entranceTransition, delay: 0.25 }}
          >
            Hello, I'm
          </motion.p>

          <motion.h1
            className={styles.name}
            initial="hidden"
            animate="show"
            variants={staggerContainer}
            transition={{ delayChildren: 0.35 }}
            aria-label="Muhammad Wahyu Santoso"
          >
            {['Muhammad', 'Wahyu', 'Santoso'].map((word, i) => (
              <motion.span
                key={word}
                variants={wordVariant}
                className={i === 1 ? styles.nameAccent : undefined}
                style={{ display: 'inline-block', marginRight: '0.28em' }}
              >
                {word}
              </motion.span>
            ))}
            <Sparkles />
          </motion.h1>

          <motion.div
            className={styles.roleWrapper}
            initial={{ y: shouldReduce ? 0 : 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ ...entranceTransition, delay: 0.6 }}
          >
            <span className={styles.rolePrefix}>I'm a </span>
            <span className={styles.role} aria-live="polite">
              {displayed}
              <span className={styles.cursor} aria-hidden="true">|</span>
            </span>
          </motion.div>

          <motion.div
            className={styles.ctas}
            variants={fadeInUp}
            initial="hidden"
            animate="show"
            transition={{ ...entranceTransition, delay: 0.75 }}
          >
            <Button variant="gold" onClick={scrollToProjects}>
              View Projects
            </Button>
            <Button variant="glass" href="https://www.linkedin.com/in/mwhyus/" target="_blank">
              Get Connected
            </Button>
          </motion.div>
        </div>
      </motion.div>

      <motion.div className={styles.layerFg} style={{ y: yFg, opacity: opacityFg }} aria-hidden="true">
        <CoconutTree className={`${styles.tree} ${styles.treeFgLeft}`} />
        <CoconutTree className={`${styles.tree} ${styles.treeFgRight}`} />
      </motion.div>

      <motion.div
        className={styles.scrollHintWrapper}
        style={{ opacity: opacityFade }}
      >
        <div className={styles.scrollPill} aria-label="Scroll to explore">
          <motion.div
            className={styles.scrollDot}
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          />
        </div>
        <span className={styles.scrollLabel}>Scroll to explore</span>
      </motion.div>
    </section>
  )
})

Hero.displayName = 'Hero'
