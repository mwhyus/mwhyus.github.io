// ============================================================
// Contact.tsx — Organism: Premium Contact Section
// DESIGN.md §3: spring physics, entrance stagger, reduced motion
// Updated: Magnetic submit button, floating labels, focus glow
// ============================================================
import React, { useState, useCallback, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { RiLinkedinBoxLine, RiGithubLine, RiGitlabLine, RiMailLine, RiCheckLine, RiSendPlaneLine } from 'react-icons/ri'
import { SectionTitle } from '../../atoms/SectionTitle'
import { entranceTransition, interactionTransition, slideInLeft, slideInRight } from '../../hooks/motionVariants'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import styles from './Contact.module.scss'

interface SocialLink {
  icon:     React.ReactNode
  label:    string
  href:     string
  username: string
}

const SOCIALS: SocialLink[] = [
  { icon: <RiLinkedinBoxLine />, label: 'LinkedIn', href: 'https://www.linkedin.com/in/mwhyus/',  username: 'linkedin.com/in/mwhyus' },
  { icon: <RiGithubLine />,      label: 'GitHub',   href: 'https://github.com/mwhyus',             username: 'github.com/mwhyus'     },
  { icon: <RiGitlabLine />,      label: 'GitLab',   href: 'https://gitlab.com/mwhyus',             username: 'gitlab.com/mwhyus'     },
  { icon: <RiMailLine />,        label: 'Email',    href: 'mailto:wahyu@example.com',              username: 'Get in touch'          },
]

// ─── Magnetic Button ──────────────────────────────────────────
const MagneticButton: React.FC<{
  submitted: boolean
  className: string
}> = ({ submitted, className }) => {
  const shouldReduce = useReducedMotion()
  const btnRef       = useRef<HTMLButtonElement>(null)
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const x    = useSpring(rawX, interactionTransition)
  const y    = useSpring(rawY, interactionTransition)

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    if (shouldReduce || !btnRef.current) return
    const rect = btnRef.current.getBoundingClientRect()
    const cx   = rect.left + rect.width / 2
    const cy   = rect.top  + rect.height / 2
    rawX.set((e.clientX - cx) * 0.3)
    rawY.set((e.clientY - cy) * 0.3)
  }, [rawX, rawY, shouldReduce])

  const handleMouseLeave = useCallback(() => {
    rawX.set(0)
    rawY.set(0)
  }, [rawX, rawY])

  return (
    <motion.button
      ref={btnRef}
      type="submit"
      className={`${className} ${submitted ? styles.submitted : ''}`}
      style={shouldReduce ? {} : { x, y }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileTap={{ scale: 0.96 }}
      transition={interactionTransition}
    >
      {submitted ? (
        <><RiCheckLine /> Message Sent!</>
      ) : (
        <><RiSendPlaneLine /> Send Message</>
      )}
    </motion.button>
  )
}
MagneticButton.displayName = 'MagneticButton'

// ─── Floating Label Field ─────────────────────────────────────
const FloatField: React.FC<{
  id:          string
  label:       string
  type?:       string
  rows?:       number
  required?:   boolean
}> = ({ id, label, type = 'text', rows, required }) => {
  const [filled, setFilled] = useState(false)
  const isTextarea = !!rows

  return (
    <div className={`${styles.floatField} ${filled ? styles.filled : ''}`}>
      {isTextarea ? (
        <textarea
          id={id}
          rows={rows}
          required={required}
          className={styles.floatInput}
          onChange={e => setFilled(e.target.value.length > 0)}
          placeholder=" "
          aria-label={label}
        />
      ) : (
        <input
          id={id}
          type={type}
          required={required}
          className={styles.floatInput}
          onChange={e => setFilled(e.target.value.length > 0)}
          placeholder=" "
          aria-label={label}
        />
      )}
      <label htmlFor={id} className={styles.floatLabel}>{label}</label>
    </div>
  )
}
FloatField.displayName = 'FloatField'

// ─── Main Component ───────────────────────────────────────────
export const Contact: React.FC = React.memo(() => {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 4000)
  }, [])

  return (
    <section id="contact" className={styles.section} aria-label="Contact section">
      <div className={styles.container}>
        <SectionTitle subtitle="Let's connect and build something great together.">
          Contact Me
        </SectionTitle>

        <div className={styles.grid}>
          {/* Left — Socials */}
          <motion.div
            className={styles.left}
            variants={slideInLeft}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
          >
            <p className={styles.intro}>
              Hi! Feel free to reach out through any of my social channels.
              I'm always open to discussing new projects, opportunities, or just a chat.
            </p>

            <div className={styles.socials}>
              {SOCIALS.map((social, i) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  aria-label={social.label}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ ...entranceTransition, delay: i * 0.1 }}
                  whileHover={{ x: 8 }}
                >
                  <span className={styles.socialIcon}>{social.icon}</span>
                  <div className={styles.socialText}>
                    <span className={styles.socialLabel}>{social.label}</span>
                    <span className={styles.socialUsername}>{social.username}</span>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Right — Form with floating labels */}
          <motion.div
            className={styles.right}
            variants={slideInRight}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
          >
            <div className={styles.formCard}>
              <h3 className={styles.formTitle}>Send a Message</h3>
              <form className={styles.form} onSubmit={handleSubmit} noValidate>
                <div className={styles.row}>
                  <FloatField id="contact-name"  label="Your Name"   required />
                  <FloatField id="contact-email" label="Your Email"  type="email" required />
                </div>
                <FloatField id="contact-subject" label="Subject"     required />
                <FloatField id="contact-message" label="Message"     rows={5}  required />

                <MagneticButton submitted={submitted} className={styles.submitBtn} />
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
})
Contact.displayName = 'Contact'
