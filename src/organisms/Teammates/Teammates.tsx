// ============================================================
// Teammates.tsx — Organism: Previous Teammates carousel
// ============================================================
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri'
import { SectionTitle } from '../../atoms/SectionTitle'
import styles from './Teammates.module.scss'

interface Teammate {
  name: string
  role: string
  description: string
  photo: string
  photoMobile?: string
  project: string
  objectPosition?: string
}

const TEAMMATES: Teammate[] = [
  {
    name: 'Rangga Dewa',
    role: 'Product Owner',
    description: 'Rangga handled the product vision of SayurHub, shaping ideas into a real product the team built together.',
    photo: '/pic/PO/PO.jpg',
    project: 'SayurHub',
    objectPosition: 'center 40%',
  },
  {
    name: 'Arman Zulfikri',
    role: 'Scrum Master & BE Developer',
    description: 'Arman bridged communication between the development team and the Product Owner while leading backend development.',
    photo: '/pic/BE/BE.jpg',
    project: 'SayurHub',
    objectPosition: 'center 40%',
  },
  {
    name: 'Julia Fransiska',
    role: 'Backend Developer',
    description: 'Julia was responsible for the database architecture of SayurHub — both web and mobile applications.',
    photo: '/pic/BE/BE2.jpg',
    project: 'SayurHub',
    objectPosition: 'center 55%',
  },
  {
    name: 'Waindini Nur Fitri',
    role: 'Backend Developer',
    description: 'Dini handled the database layer of SayurHub, ensuring reliable data flow across all platforms.',
    photo: '/pic/BE/BE3.JPG',
    project: 'SayurHub',
    objectPosition: '100% 80%',
  },
  {
    name: 'Azani Ramadhan',
    role: 'Frontend Developer',
    description: 'Azani built the React web application and collaborated closely with the backend team for smooth integration.',
    photo: '/pic/FE/FE1.jpg',
    project: 'SayurHub',
    objectPosition: 'center 90%',
  },
  {
    name: 'Ryan A Rizaldi',
    role: 'Frontend Developer',
    description: 'Ryan crafted key UI components for the SayurHub web app using React.',
    photo: '/pic/FE/FE2.jpg',
    project: 'SayurHub',
    objectPosition: 'center 30%',
  },
  {
    name: 'Fandy Lin',
    role: 'React Native Developer',
    description: 'Fandy built the mobile application using React Native, integrating with the backend seamlessly.',
    photo: '/pic/RN/RN1.jpg',
    project: 'SayurHub',
    objectPosition: 'center 30%',
  },
]

const TeammateCard: React.FC<{ tm: Teammate; isMobile?: boolean }> = React.memo(({ tm, isMobile }) => {
  const cardClassName = isMobile ? `${styles.card} ${styles.mobileCard}` : styles.card
  
  return (
    <motion.article
      className={cardClassName}
      whileHover={isMobile ? undefined : { scale: 1.02, y: -4 }}
    >
      <div className={styles.photoWrapper}>
        <picture>
          {tm.photoMobile && (
            <source media="(max-width: 768px)" srcSet={tm.photoMobile} />
          )}
          <img
            src={tm.photo}
            alt={`${tm.name} — ${tm.role}`}
            className={styles.photo}
            style={{ objectPosition: tm.objectPosition || 'center' }}
            onError={(e) => {
              const img = e.currentTarget
              img.style.display = 'none'
              img.parentElement!.classList.add(styles.photoFallback)
            }}
          />
        </picture>
      </div>
      <div className={styles.info}>
        <div className={styles.project}>{tm.project}</div>
        <h3 className={styles.name}>{tm.name}</h3>
        <div className={styles.role}>{tm.role}</div>
        <p className={styles.desc}>{tm.description}</p>
      </div>
    </motion.article>
  )
})

TeammateCard.displayName = 'TeammateCard'

const VISIBLE_COUNT = 3

export const Teammates: React.FC = React.memo(() => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState<1 | -1>(1)

  const canPrev = currentIndex > 0
  const canNext = currentIndex + VISIBLE_COUNT < TEAMMATES.length

  const prev = () => {
    if (!canPrev) return
    setDirection(-1)
    setCurrentIndex(i => Math.max(0, i - 1))
  }

  const next = () => {
    if (!canNext) return
    setDirection(1)
    setCurrentIndex(i => Math.min(TEAMMATES.length - VISIBLE_COUNT, i + 1))
  }

  const visible = TEAMMATES.slice(currentIndex, currentIndex + VISIBLE_COUNT)

  return (
    <section id="teammates" className={styles.section} aria-label="Previous teammates section">
      <div className={styles.container}>
        <SectionTitle subtitle="Brilliant people I've had the privilege of building with.">
          Previous Teammates
        </SectionTitle>

        {/* Desktop Layout: Button-based Carousel */}
        <div className={styles.desktopCarousel}>
          <div className={styles.carouselWrapper}>
            <button
              className={`${styles.arrow} ${!canPrev ? styles.disabled : ''}`}
              onClick={prev}
              aria-label="Previous teammate"
              disabled={!canPrev}
            >
              <RiArrowLeftSLine size={22} />
            </button>

            <div className={styles.track} aria-live="polite">
              <AnimatePresence mode="wait" initial={false} custom={direction}>
                <motion.div
                  key={currentIndex}
                  className={styles.slide}
                  custom={direction}
                  initial={{ opacity: 0, x: direction * 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -direction * 100 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                >
                  {visible.map((tm) => (
                    <TeammateCard key={tm.name} tm={tm} />
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

            <button
              className={`${styles.arrow} ${!canNext ? styles.disabled : ''}`}
              onClick={next}
              aria-label="Next teammate"
              disabled={!canNext}
            >
              <RiArrowRightSLine size={22} />
            </button>
          </div>

          <div className={styles.dots} role="tablist" aria-label="Carousel position">
            {Array.from({ length: TEAMMATES.length - VISIBLE_COUNT + 1 }).map((_, i) => (
              <button
                key={i}
                className={`${styles.dot} ${i === currentIndex ? styles.dotActive : ''}`}
                onClick={() => { setDirection(i > currentIndex ? 1 : -1); setCurrentIndex(i) }}
                role="tab"
                aria-selected={i === currentIndex}
                aria-label={`Go to position ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Mobile Layout: Native Horizontal Scroll List */}
        <div className={styles.mobileScrollList} aria-label="Mobile teammates list">
          {TEAMMATES.map((tm) => (
            <TeammateCard key={tm.name} tm={tm} isMobile />
          ))}
        </div>
      </div>
    </section>
  )
})

Teammates.displayName = 'Teammates'
