// ============================================================
// Contact.tsx — Organism: Minimalist contact with glowing socials
// DESIGN.md §D: Amber glow on hover, minimal social icons
// ============================================================
import React, { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { RiLinkedinBoxLine, RiGithubLine, RiGitlabLine, RiMailLine, RiCheckLine } from 'react-icons/ri'
import { SectionTitle } from '../../atoms/SectionTitle'
import styles from './Contact.module.scss'

interface SocialLink {
  icon: React.ReactNode
  label: string
  href: string
  username: string
}

const SOCIALS: SocialLink[] = [
  { icon: <RiLinkedinBoxLine />, label: 'LinkedIn',  href: 'https://www.linkedin.com/in/mwhyus/',  username: 'linkedin.com/in/mwhyus' },
  { icon: <RiGithubLine />,      label: 'GitHub',    href: 'https://github.com/mwhyus',             username: 'github.com/mwhyus'     },
  { icon: <RiGitlabLine />,      label: 'GitLab',    href: 'https://gitlab.com/mwhyus',             username: 'gitlab.com/mwhyus'     },
  { icon: <RiMailLine />,        label: 'Email',     href: 'mailto:wahyu@example.com',              username: 'Get in touch'          },
]

export const Contact: React.FC = React.memo(() => {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Placeholder — show success state
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
          <div className={styles.left}>
            <motion.p
              className={styles.intro}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              Hi! Feel free to reach out through any of my social channels. I'm always open to discussing new projects, opportunities, or just a chat.
            </motion.p>

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
                  transition={{ type: 'spring', stiffness: 300, damping: 20, delay: i * 0.08 }}
                  whileHover={{ x: 6 }}
                >
                  <span className={styles.socialIcon}>{social.icon}</span>
                  <div className={styles.socialText}>
                    <span className={styles.socialLabel}>{social.label}</span>
                    <span className={styles.socialUsername}>{social.username}</span>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Right — Contact form */}
          <motion.div
            className={styles.right}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.15 }}
          >
            <div className={styles.formCard}>
              <h3 className={styles.formTitle}>Send a Message</h3>
              <form className={styles.form} onSubmit={handleSubmit} noValidate>
                <div className={styles.row}>
                  <div className={styles.field}>
                    <label htmlFor="contact-name" className={styles.label}>Name</label>
                    <input id="contact-name" type="text" placeholder="Your name" className={styles.input} required />
                  </div>
                  <div className={styles.field}>
                    <label htmlFor="contact-email" className={styles.label}>Email</label>
                    <input id="contact-email" type="email" placeholder="your@email.com" className={styles.input} required />
                  </div>
                </div>
                <div className={styles.field}>
                  <label htmlFor="contact-subject" className={styles.label}>Subject</label>
                  <input id="contact-subject" type="text" placeholder="What's this about?" className={styles.input} required />
                </div>
                <div className={styles.field}>
                  <label htmlFor="contact-message" className={styles.label}>Message</label>
                  <textarea id="contact-message" rows={5} placeholder="Tell me about your project or idea..." className={styles.textarea} required />
                </div>
                <motion.button
                  type="submit"
                  className={`${styles.submitBtn} ${submitted ? styles.submitted : ''}`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  {submitted ? (
                    <><RiCheckLine /> Message Sent!</>
                  ) : (
                    'Send Message'
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
})

Contact.displayName = 'Contact'
