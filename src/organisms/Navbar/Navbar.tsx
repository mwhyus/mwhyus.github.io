import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import { RiMenuLine, RiCloseLine } from 'react-icons/ri'
import { entranceTransition, snappyTransition } from '../../hooks/motionVariants'
import styles from './Navbar.module.scss'

const NAV_LINKS = [
  { label: 'Home',        href: '#home' },
  { label: 'About',       href: '#about' },
  { label: 'Stack',       href: '#stack' },
  { label: 'Experiences', href: '#experiences' },
  { label: 'Projects',    href: '#projects' },
  { label: 'Teammates',   href: '#teammates' },
  { label: 'Contact',     href: '#contact' },
] as const

export const Navbar: React.FC = React.memo(() => {
  const [scrolled, setScrolled]       = useState(false)
  const [mobileOpen, setMobileOpen]   = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  const isNavClickRef = React.useRef(false)
  const navClickTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 60)
    if (!isNavClickRef.current && latest < 100) {
      setActiveSection('home')
    }
  })

  useEffect(() => {
    const sections = NAV_LINKS.map(l => l.href.slice(1))
    const observer = new IntersectionObserver(
      entries => {
        if (isNavClickRef.current) return
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.35, rootMargin: '-10% 0px -30% 0px' }
    )
    sections.forEach(id => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  const handleNavClick = useCallback((href: string) => {
    const targetId = href.slice(1)
    
    // Lock scroll tracking so intermediate sections don't override activeSection during smooth scroll
    isNavClickRef.current = true
    if (navClickTimerRef.current) clearTimeout(navClickTimerRef.current)

    setActiveSection(targetId)
    setMobileOpen(false)

    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }

    // Unlock scroll tracking after smooth scroll completes (~850ms)
    navClickTimerRef.current = setTimeout(() => {
      isNavClickRef.current = false
    }, 850)
  }, [])

  return (
    <motion.nav
      className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ ...entranceTransition, delay: 0.1 }}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className={styles.inner}>
        {/* Logo */}
        <a
          href="#home"
          className={styles.logo}
          onClick={e => { e.preventDefault(); handleNavClick('#home') }}
          aria-label="Back to top"
        >
          mwhyus<span className={styles.dot}>.</span>
        </a>

        {/* Desktop Links */}
        <ul className={styles.links} role="list">
          {NAV_LINKS.map(({ label, href }) => {
            const isActive = activeSection === href.slice(1)
            return (
              <li key={href} style={{ position: 'relative' }}>
                <a
                  href={href}
                  className={`${styles.link} ${isActive ? styles.active : ''}`}
                  onClick={e => { e.preventDefault(); handleNavClick(href) }}
                >
                  {/* Moving active glass pill */}
                  {isActive && (
                    <motion.span
                      layoutId="navPill"
                      className={styles.navPill}
                      transition={snappyTransition}
                    />
                  )}
                  <span className={styles.linkLabel}>{label}</span>
                </a>
              </li>
            )
          })}
        </ul>

        {}
        <button
          className={styles.hamburger}
          onClick={() => setMobileOpen(o => !o)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <RiCloseLine size={22} /> : <RiMenuLine size={22} />}
        </button>
      </div>

      {}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className={styles.mobileMenu}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
          >
            <ul role="list">
              {NAV_LINKS.map(({ label, href }, i) => (
                <motion.li
                  key={href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ ...entranceTransition, delay: i * 0.05 }}
                >
                  <a
                    href={href}
                    className={`${styles.mobileLink} ${activeSection === href.slice(1) ? styles.active : ''}`}
                    onClick={e => { e.preventDefault(); handleNavClick(href) }}
                  >
                    {label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
})
Navbar.displayName = 'Navbar'
