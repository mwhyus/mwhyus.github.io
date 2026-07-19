// ============================================================
// Navbar.tsx — Organism: Glassmorphic sticky navigation
// DESIGN.md §3: layoutId pill indicator, spring physics
// Updated: Pill sliding bg, blur intensity, staggered mobile links
// ============================================================
import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RiMenuLine, RiCloseLine } from 'react-icons/ri'
import { entranceTransition, interactionTransition } from '../../hooks/motionVariants'
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

  // Scroll detection for blur intensification
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Active section via IntersectionObserver
  useEffect(() => {
    const sections = NAV_LINKS.map(l => l.href.slice(1))
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { threshold: 0.4 }
    )
    sections.forEach(id => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  const handleNavClick = useCallback((href: string) => {
    setMobileOpen(false)
    setTimeout(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
    }, 150)
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

        {/* Desktop links — pill slides between items via layoutId */}
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
                  {/* Sliding pill background */}
                  {isActive && (
                    <motion.span
                      layoutId="navPill"
                      className={styles.navPill}
                      transition={interactionTransition}
                    />
                  )}
                  <span className={styles.linkLabel}>{label}</span>
                </a>
              </li>
            )
          })}
        </ul>

        {/* Mobile hamburger */}
        <button
          className={styles.hamburger}
          onClick={() => setMobileOpen(o => !o)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <RiCloseLine size={22} /> : <RiMenuLine size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
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
