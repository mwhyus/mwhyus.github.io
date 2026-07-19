import React from 'react'
import { motion } from 'framer-motion'
import { SectionTitle } from '../../atoms/SectionTitle'
import { Button } from '../../atoms/Button'
import { useCountUp } from '../../hooks/useCountUp'
import { entranceTransition, fadeInUp, slideInLeft, slideInRight } from '../../hooks/motionVariants'
import styles from './About.module.scss'

interface StatConfig {
  end:    number
  suffix: string
  label:  string
}

const STATS: StatConfig[] = [
  { end: 5,  suffix: '+', label: 'Years Learning Tech' },
  { end: 3,  suffix: '+', label: 'Years in Leadership' },
  { end: 10, suffix: '+', label: 'Team Projects' },
]

const StatItem: React.FC<StatConfig & { index: number }> = React.memo(
  ({ end, suffix, label, index }) => {
    const { count, ref } = useCountUp({ end, suffix, duration: 1600 })

    return (
      <motion.div
        className={styles.statItem}
        variants={fadeInUp}
        custom={index}
      >
        <span
          ref={ref as React.RefObject<HTMLSpanElement | null>}
          className={styles.statValue}
        >
          {count}
        </span>
        <span className={styles.statLabel}>{label}</span>
      </motion.div>
    )
  }
)
StatItem.displayName = 'StatItem'

export const About: React.FC = React.memo(() => {
  return (
    <section id="about" className={styles.section} aria-label="About me section">
      <div className={styles.container}>
        <SectionTitle>About Me</SectionTitle>

        <div className={styles.grid}>
          {}
          <motion.div
            className={styles.textBlock}
            variants={slideInLeft}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
          >
            <h3 className={styles.tagline}>
              I'm Wahyu — a{' '}
              <span className={styles.accent}>developer</span>{' '}
              who sees challenges as opportunities to grow.
            </h3>

            <p className={styles.bio}>
              Passionate in business, technology, and experienced leadership in the largest
              youth-run organization. I have been shaping myself through the ups and downs
              of my journey, and I enjoy cross-cultural learning and collaboration.
            </p>
            <p className={styles.bio}>
              Actively learning IT since July 2020 through Agile Development and React Native
              Bootcamps. Despite coming from a cross-disciplinary background, I am eagerly
              improving my knowledge and skills in the tech field every day.
            </p>
            <p className={styles.bio}>
              From 2016 to 2019, I actively developed my soft skills through an international
              organization, progressing from Team Member to Executive Board, managing local
              projects with international clients and national-level events.
            </p>

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

          {}
          <motion.div
            className={styles.statsBlock}
            variants={slideInRight}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
          >
            <div className={styles.statsCard}>
              {}
              <div className={styles.statsGlow} aria-hidden="true" />

              <motion.div
                className={styles.statsGrid}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-80px' }}
                transition={{ ...entranceTransition, staggerChildren: 0.1 }}
              >
                {STATS.map((stat, i) => (
                  <StatItem key={stat.label} {...stat} index={i} />
                ))}
              </motion.div>

              {}
              <div className={styles.timeline}>
                {[
                  { year: '2016', label: 'Joined international youth org' },
                  { year: '2020', label: 'Started IT journey (Agile & RN)' },
                  { year: '2024', label: 'Building premium digital products' },
                ].map((item, i) => (
                  <motion.div
                    key={item.year}
                    className={styles.timelineItem}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ ...entranceTransition, delay: i * 0.12 }}
                  >
                    <span className={styles.timelineYear}>{item.year}</span>
                    <span className={styles.timelineSep} aria-hidden="true" />
                    <span className={styles.timelineLabel}>{item.label}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
})
About.displayName = 'About'
