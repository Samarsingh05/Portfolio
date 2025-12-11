import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollTracker } from '../../hooks/useScrollTracker';
import { useSectionTracker } from '../../hooks/useIntersectionObserver';
import styles from './CircularTracker.module.css';

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

  const rotation = (position / 5) % 360;

  return (
    <AnimatePresence>
      {isScrolling && (
        <motion.div
          className={styles.trackerContainer}
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 100, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          {/* Rotating outer decoration */}
          <motion.div 
            className={styles.outerRing}
            animate={{ rotate: rotation }}
            transition={{ type: 'tween', ease: 'linear', duration: 0 }}
          />

          {/* Half circle with centered section name */}
          <div className={styles.halfCircle}>
            <AnimatePresence mode="wait">
              <motion.span
                key={activeSection}
                className={styles.sectionName}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
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
