import React from 'react'
import { motion } from 'framer-motion'
import { RiExternalLinkLine, RiComputerLine, RiSmartphoneLine, RiBarChart2Line } from 'react-icons/ri'
import { SectionTitle } from '../../atoms/SectionTitle'
import { useGlassTilt } from '../../hooks/useGlassTilt'
import { entranceTransition, fadeInUp } from '../../hooks/motionVariants'
import styles from './Experiences.module.scss'

interface ExperienceItem {
  icon:        React.ReactNode
  title:       string
  description: string
  link:        string
  tags:        string[]
  period:      string
}

const EXPERIENCES: ExperienceItem[] = [
  {
    icon:        <RiComputerLine />,
    title:       'Web Development',
    description: 'Building web applications using HTML, CSS, JavaScript, and React framework. Focused on clean architecture and premium UI.',
    link:        'https://drive.google.com/drive/folders/1eon5gSELTBj3yrmSbL7aYn3bHlD_8iOm?usp=sharing',
    tags:        ['React', 'HTML/CSS', 'JavaScript'],
    period:      '2021 – Present',
  },
  {
    icon:        <RiSmartphoneLine />,
    title:       'Mobile Development',
    description: 'Experience building cross-platform mobile applications using React Native. From concept to production-ready apps.',
    link:        'https://drive.google.com/drive/folders/1BBJDTmQ8wjjCQD8Gmdxjfdiury-Qlxvj?usp=sharing',
    tags:        ['React Native', 'Mobile', 'Cross-Platform'],
    period:      '2022 – Present',
  },
  {
    icon:        <RiBarChart2Line />,
    title:       'Project Management',
    description: 'Led international youth organization projects, managing cross-cultural teams from Team Member to Executive Board level.',
    link:        'https://drive.google.com/drive/folders/1VFHGBzI83wlfsw3t_Jykmzic8z426QlS?usp=sharing',
    tags:        ['Agile', 'Leadership', 'Strategy'],
    period:      '2016 – 2019',
  },
]

const ExperienceCard: React.FC<{
  item:  ExperienceItem
  index: number
  side:  'left' | 'right'
}> = React.memo(({ item, index, side }) => {
  const { rotateX, rotateY, glowX, glowY, handleMouseMove, handleMouseLeave, cardRef } =
    useGlassTilt<HTMLAnchorElement>()

  return (
    <motion.div
      className={`${styles.cardWrapper} ${styles[side]}`}
      variants={fadeInUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
      transition={{ ...entranceTransition, delay: index * 0.12 }}
    >
      {}
      <div className={styles.dot} aria-hidden="true">
        <div className={styles.dotInner} />
      </div>

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
        {}
        <motion.div
          className={styles.glow}
          style={{ '--glow-x': glowX, '--glow-y': glowY } as React.CSSProperties}
          aria-hidden="true"
        />

        <div className={styles.cardInner} style={{ transform: 'translateZ(16px)' }}>
          <div className={styles.cardHeader}>
            <div className={styles.iconWrapper}>{item.icon}</div>
            <span className={styles.period}>{item.period}</span>
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

        <div className={styles.timeline}>
          {}
          <motion.div
            className={styles.connectorLine}
            aria-hidden="true"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ ...entranceTransition, duration: 1.2 }}
            style={{ transformOrigin: 'top center' }}
          />

          {EXPERIENCES.map((item, i) => (
            <ExperienceCard
              key={item.title}
              item={item}
              index={i}
              side={i % 2 === 0 ? 'left' : 'right'}
            />
          ))}
        </div>
      </div>
    </section>
  )
})
Experiences.displayName = 'Experiences'
