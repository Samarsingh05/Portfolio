import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollTracker } from '../../hooks/useScrollTracker';
import { useSectionTracker } from '../../hooks/useIntersectionObserver';
import styles from './CircularTracker.module.css';

/**
 * Circular Section Tracker Component
 * Centered horizontally, shows only the active section name inside
 * Rotates clockwise when scrolling between sections
 */

const sectionIds = [
  'about',
  'skills',
  'projects',
  'experience',
  'education',
  'certificates',
  'contact'
];

const sectionNames = [
  'About_Me()',
  'Skills_Unlocked()',
  'Project_Dabba()',
  'Intern_Logs()',
  'Degree_Ledger()',
  'Proof_Of_Work()',
  'Ping_Bhai()'
];

const CircularTracker = () => {
  const { isScrolling, position } = useScrollTracker();
  const { activeSection } = useSectionTracker(sectionIds);

  // Calculate rotation based on scroll position for smooth rotation effect
  const rotation = (position / 5) % 360;

  return (
    <AnimatePresence>
      {isScrolling && (
        <motion.div
          className={styles.trackerContainer}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          {/* Rotating outer ring */}
          <motion.div 
            className={styles.outerRing}
            animate={{ rotate: rotation }}
            transition={{ type: 'tween', ease: 'linear', duration: 0 }}
          >
            {/* Decorative segments */}
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className={styles.segment}
                style={{ transform: `rotate(${i * 30}deg)` }}
              />
            ))}
          </motion.div>

          {/* Inner circle with section name */}
          <div className={styles.innerCircle}>
            <AnimatePresence mode="wait">
              <motion.span
                key={activeSection}
                className={styles.sectionName}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {sectionNames[activeSection]}
              </motion.span>
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CircularTracker;
