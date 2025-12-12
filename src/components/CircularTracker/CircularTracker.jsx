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
  'Projects_Products()',
  'Intern_Logs()',
  'Padhai_Likhai()',
  'Certificates()',
  'Ping_Me()'
];

const CircularTracker = () => {
  const { isScrolling, direction, position } = useScrollTracker();
  const { activeSection } = useSectionTracker(sectionIds);

  const rotation = (position / 5) % 360;

  // Animation variants for clockwise rotation
  const textVariants = {
    initial: (dir) => ({
      opacity: 0,
      rotate: dir === 'down' ? -90 : 90,
      y: dir === 'down' ? 30 : -30
    }),
    animate: {
      opacity: 1,
      rotate: 0,
      y: 0
    },
    exit: (dir) => ({
      opacity: 0,
      rotate: dir === 'down' ? 90 : -90,
      y: dir === 'down' ? -30 : 30
    })
  };

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
            <AnimatePresence mode="wait" custom={direction}>
              <motion.span
                key={activeSection}
                className={styles.sectionName}
                custom={direction}
                variants={textVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.3, ease: 'easeInOut' }}
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
