// ============================================================
// About.tsx — Organism: Minimalist About Me section
// ============================================================
import React from 'react'
import { motion } from 'framer-motion'
import { SectionTitle } from '../../atoms/SectionTitle'
import { Button } from '../../atoms/Button'
import styles from './About.module.scss'

const STATS = [
  { value: '5+', label: 'Years Learning Tech' },
  { value: '3+', label: 'Years in Leadership' },
  { value: '10+', label: 'Team Projects' },
]

export const About: React.FC = React.memo(() => {
  return (
    <section id="about" className={styles.section} aria-label="About me section">
      <div className={styles.container}>
        <SectionTitle>About Me</SectionTitle>
        
        <div className={styles.content}>
          <motion.div
            className={styles.textWrapper}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          >
            <h3 className={styles.tagline}>
              I'm Wahyu — a <span className={styles.accent}>developer</span> who sees challenges as opportunities to grow.
            </h3>
            <p className={styles.bio}>
              Passionate in business, technology, and experienced leadership in the largest youth-run organization. I have been shaping myself through the ups and downs of my journey, and I enjoy cross-cultural learning and collaboration.
            </p>
            <p className={styles.bio}>
              Actively learning IT since July 2020 through Agile Development and React Native Bootcamps. Despite coming from a cross-disciplinary background, I am eagerly improving my knowledge and skills in the tech field every day.
            </p>
            <p className={styles.bio}>
              From 2016 to 2019, I actively developed my soft skills through an international organization, progressing from Team Member to Executive Board, managing local projects with international clients and national-level events.
            </p>

            {/* Stats incorporated into text flow for a minimalist look */}
            <div className={styles.stats}>
              {STATS.map((stat) => (
                <div key={stat.label} className={styles.statItem}>
                  <span className={styles.statValue}>{stat.value}</span>
                  <span className={styles.statLabel}>{stat.label}</span>
                </div>
              ))}
            </div>

            <div className={styles.cta}>
              <Button
                variant="gold"
                href="https://drive.google.com/file/d/1xMdmp0Mf6x8CGvicPmroK7oR9jnUfbPU/view?usp=sharing"
                target="_blank"
              >
                Download CV
              </Button>
              <Button variant="outline" href="#contact">
                Contact Me
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
})

About.displayName = 'About'
