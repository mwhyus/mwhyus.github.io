// ============================================================
// Hero.tsx — Organism: Hero section
// DESIGN.md §A: Centered immersive tropical 3D parallax hero
// ============================================================
import React from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { RiArrowDownLine } from 'react-icons/ri'
import { Button } from '../../atoms/Button'
import { CoconutTree } from '../../atoms/CoconutTree'
import styles from './Hero.module.scss'

const TYPED_ROLES = ['Frontend Developer', 'React Enthusiast', 'UI/UX Craftsman', 'Tech Explorer']

export const Hero: React.FC = React.memo(() => {
  const [roleIndex, setRoleIndex] = React.useState(0)
  const [displayed, setDisplayed] = React.useState('')
  const [typing, setTyping] = React.useState(true)
  
  // Parallax scroll setup
  const { scrollY } = useScroll()
  
  // As we scroll down, layers move at different speeds (parallax)
  const yBg = useTransform(scrollY, [0, 1000], [0, 150])
  const yMid = useTransform(scrollY, [0, 1000], [0, 50])
  const yFg = useTransform(scrollY, [0, 1000], [0, -100])
  const opacityFade = useTransform(scrollY, [0, 400], [1, 0])

  // Typing animation effect
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

  const scrollToProjects = () => {
    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="home" className={styles.hero} aria-label="Hero section">
      {/* Background Image Layer */}
      <motion.div className={styles.bgImage} style={{ y: yBg }} aria-hidden="true" />
      <div className={styles.bgOverlay} aria-hidden="true" />

      {/* Layer 1: Background Trees (Small, Dark, Slow Sway) */}
      <motion.div className={styles.layerBg} style={{ y: yBg }} aria-hidden="true">
        <CoconutTree className={`${styles.tree} ${styles.treeBgLeft}`} />
        <CoconutTree className={`${styles.tree} ${styles.treeBgRight}`} />
      </motion.div>

      {/* Layer 2: Main Content (Profile Picture & Text) */}
      <motion.div className={styles.container} style={{ y: yMid, opacity: opacityFade }}>
        <div className={styles.content}>
          
          <motion.div
            className={styles.profileFrame}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          >
            <img src="/pic/wahyu2.jpeg" alt="Muhammad Wahyu Santoso" className={styles.profilePic} />
            <div className={styles.profileOverlay} />
          </motion.div>

          <motion.p 
            className={styles.greeting}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Hello, I'm
          </motion.p>

          <motion.h1 
            className={styles.name}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Muhammad <span className={styles.nameAccent}>Wahyu</span> Santoso
          </motion.h1>

          <motion.div 
            className={styles.roleWrapper}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <span className={styles.rolePrefix}>I'm a </span>
            <span className={styles.role} aria-live="polite">
              {displayed}
              <span className={styles.cursor} aria-hidden="true">|</span>
            </span>
          </motion.div>

          <motion.div 
            className={styles.ctas}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
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

      {/* Layer 3: Foreground Trees (Large, Blurred edges, Fast Sway) */}
      <motion.div className={styles.layerFg} style={{ y: yFg }} aria-hidden="true">
        <CoconutTree className={`${styles.tree} ${styles.treeFgLeft}`} />
        <CoconutTree className={`${styles.tree} ${styles.treeFgRight}`} />
      </motion.div>

      {/* Scroll Hint */}
      <motion.div
        className={styles.scrollHintWrapper}
        style={{ opacity: opacityFade }}
      >
        <motion.div
          className={styles.scrollHint}
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        >
          <RiArrowDownLine size={20} />
          <span>Scroll to explore</span>
        </motion.div>
      </motion.div>
    </section>
  )
})

Hero.displayName = 'Hero'
