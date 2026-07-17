// ============================================================
// Experiences.tsx — Organism: Tech & Operation Experiences
// ============================================================
import React from 'react'
import { motion } from 'framer-motion'
import { RiExternalLinkLine, RiComputerLine, RiSmartphoneLine, RiBarChart2Line } from 'react-icons/ri'
import { SectionTitle } from '../../atoms/SectionTitle'
import { useGlassTilt } from '../../hooks/useGlassTilt'
import styles from './Experiences.module.scss'

interface ExperienceItem {
  icon: React.ReactNode
  title: string
  description: string
  link: string
  tags: string[]
}

const EXPERIENCES: ExperienceItem[] = [
  {
    icon: <RiComputerLine />,
    title: 'Web Development',
    description: 'Building web applications using HTML, CSS, JavaScript, and React framework. Focused on clean architecture and premium UI.',
    link: 'https://drive.google.com/drive/folders/1eon5gSELTBj3yrmSbL7aYn3bHlD_8iOm?usp=sharing',
    tags: ['React', 'HTML/CSS', 'JavaScript'],
  },
  {
    icon: <RiSmartphoneLine />,
    title: 'Mobile Development',
    description: 'Experience building cross-platform mobile applications using React Native. From concept to production-ready apps.',
    link: 'https://drive.google.com/drive/folders/1BBJDTmQ8wjjCQD8Gmdxjfdiury-Qlxvj?usp=sharing',
    tags: ['React Native', 'Mobile', 'Cross-Platform'],
  },
  {
    icon: <RiBarChart2Line />,
    title: 'Project Management',
    description: 'Led international youth organization projects, managing cross-cultural teams from Team Member to Executive Board level.',
    link: 'https://drive.google.com/drive/folders/1VFHGBzI83wlfsw3t_Jykmzic8z426QlS?usp=sharing',
    tags: ['Agile', 'Leadership', 'Strategy'],
  },
]

const ExperienceCard: React.FC<{ item: ExperienceItem; index: number }> = React.memo(({ item, index }) => {
  const { rotateX, rotateY, handleMouseMove, handleMouseLeave, cardRef } = useGlassTilt<HTMLAnchorElement>()

  return (
    <motion.div
      className={styles.cardWrapper}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ type: 'spring', stiffness: 300, damping: 20, delay: index * 0.1 }}
    >
      <motion.a
        ref={cardRef}
        className={styles.card}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        href={item.link}
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className={styles.cardInner} style={{ transform: 'translateZ(20px)' }}>
          <div className={styles.iconWrapper}>
            {item.icon}
          </div>
          <h3 className={styles.title}>{item.title}</h3>
          <p className={styles.description}>{item.description}</p>
          <div className={styles.tags}>
            {item.tags.map(tag => (
              <span key={tag} className={styles.tag}>{tag}</span>
            ))}
          </div>
          <span className={styles.link}>
            <RiExternalLinkLine />
            View Work
          </span>
        </div>
      </motion.a>
    </motion.div>
  )
})

ExperienceCard.displayName = 'ExperienceCard'

export const Experiences: React.FC = React.memo(() => {
  return (
    <section id="experiences" className={styles.section} aria-label="Experiences section">
      <div className={styles.container}>
        <SectionTitle subtitle="My journey across tech and operations.">
          Experiences
        </SectionTitle>
        <div className={styles.grid}>
          {EXPERIENCES.map((item, i) => (
            <ExperienceCard key={item.title} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
})

Experiences.displayName = 'Experiences'
