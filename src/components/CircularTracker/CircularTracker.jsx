import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollTracker } from '../../hooks/useScrollTracker';
import { useSectionTracker } from '../../hooks/useIntersectionObserver';
import styles from './CircularTracker.module.css';

/**
 * Circular Section Tracker Component
 * Shows section function names arranged in a half-circle
 * Rotates clockwise as user scrolls between sections
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

  // Calculate rotation based on active section
  // Each section = 360/7 degrees rotation
  const rotationPerSection = 360 / sectionIds.length;
  const rotation = activeSection * rotationPerSection;

  return (
    <AnimatePresence>
      {isScrolling && (
        <motion.div
          className={styles.trackerContainer}
          initial={{ x: 150, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 150, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          {/* Rotating wheel with section names */}
          <motion.div 
            className={styles.wheel}
            animate={{ rotate: -rotation }}
            transition={{ type: 'spring', stiffness: 50, damping: 15 }}
          >
            {sectionNames.map((name, index) => {
              const angle = (index * 360) / sectionNames.length - 90;
              const isActive = index === activeSection;
              
              return (
                <motion.div
                  key={name}
                  className={`${styles.sectionLabel} ${isActive ? styles.activeLabel : ''}`}
                  style={{
                    transform: `rotate(${angle}deg) translateX(120px)`
                  }}
                >
                  <motion.span
                    className={styles.labelText}
                    style={{
                      transform: `rotate(${-angle + rotation}deg)`
                    }}
                    animate={{
                      scale: isActive ? 1.1 : 0.85,
                      opacity: isActive ? 1 : 0.4
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {name}
                  </motion.span>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Center indicator */}
          <div className={styles.centerDot}>
            <div className={styles.innerDot}></div>
          </div>

          {/* Active section pointer */}
          <div className={styles.pointer}></div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CircularTracker;
