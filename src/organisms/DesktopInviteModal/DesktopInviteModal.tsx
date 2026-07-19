import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { entranceTransition, interactionTransition } from '../../hooks/motionVariants'
import styles from './DesktopInviteModal.module.scss'

interface DesktopInviteModalProps {
  isMobile: boolean
}

export const DesktopInviteModal: React.FC<DesktopInviteModalProps> = ({ isMobile }) => {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <AnimatePresence>
      {(isMobile && isOpen) && (
        <motion.div
          className={styles.overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
        >
          <motion.div
            className={styles.modal}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={entranceTransition}
            onClick={(e) => e.stopPropagation()}
          >
            <h3>Experience the Immersive</h3>
            <p>This portfolio is designed for an immersive desktop experience. For the best performance and visual quality, please open this link on a desktop device.</p>
            <motion.button
              className={styles.dismissButton}
              onClick={() => setIsOpen(false)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={interactionTransition}
            >
              Dismiss
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
