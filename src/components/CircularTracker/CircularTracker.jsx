import { motion, AnimatePresence } from 'framer-motion';
import { useScrollTracker } from '../../hooks/useScrollTracker';
import { useSectionTracker } from '../../hooks/useIntersectionObserver';
import styles from './CircularTracker.module.css';

/**
 * Circular Section Tracker Component
 * - Appears only while scrolling
 * - Rotates clockwise proportional to scroll velocity
 * - Shows current section name with counter-rotation for readability
 * - Fades out after ~800ms of no scroll
 */

const sectionNames = [
  'About Me',
  'Skills',
  'Projects',
  'Experience',
  'Education',
  'Certificates',
  'Contact'
];

const sectionIds = [
  'about',
  'skills',
  'projects',
  'experience',
  'education',
  'certificates',
  'contact'
];

const CircularTracker = () => {
  const { velocity, isScrolling, position } = useScrollTracker();
  const { activeSection, sectionProgress } = useSectionTracker(sectionIds);

  // Calculate rotation based on scroll position
  // Full page scroll = multiple rotations for smooth effect
  const rotation = (position / 10) % 360;

  return (
    <AnimatePresence>
      {isScrolling && (
        <motion.div
          className={styles.trackerContainer}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          {/* Outer rotating ring */}
          <motion.div
            className={styles.outerRing}
            animate={{ rotate: rotation }}
            transition={{ type: 'spring', stiffness: 100, damping: 30 }}
          >
            {/* Section indicators on the ring */}
            {sectionNames.map((_, index) => (
              <div
                key={index}
                className={`${styles.sectionDot} ${index === activeSection ? styles.activeDot : ''}`}
                style={{
                  transform: `rotate(${(index * 360) / sectionNames.length}deg) translateY(-50px)`
                }}
              />
            ))}
          </motion.div>

          {/* Inner static ring with glow */}
          <div className={styles.innerRing}>
            {/* Progress arc */}
            <svg className={styles.progressSvg} viewBox="0 0 100 100">
              <circle
                className={styles.progressBg}
                cx="50"
                cy="50"
                r="42"
                fill="none"
                strokeWidth="3"
              />
              <motion.circle
                className={styles.progressArc}
                cx="50"
                cy="50"
                r="42"
                fill="none"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 42}`}
                initial={{ strokeDashoffset: 2 * Math.PI * 42 }}
                animate={{ 
                  strokeDashoffset: 2 * Math.PI * 42 * (1 - sectionProgress / 100) 
                }}
                transition={{ duration: 0.3 }}
              />
            </svg>
          </div>

          {/* Center content with counter-rotation to keep text upright */}
          <motion.div
            className={styles.centerContent}
            animate={{ rotate: -rotation }}
            transition={{ type: 'spring', stiffness: 100, damping: 30 }}
          >
            <span className={styles.sectionNumber}>
              0{activeSection + 1}
            </span>
            <span className={styles.sectionName}>
              {sectionNames[activeSection]}
            </span>
          </motion.div>

          {/* Velocity indicator */}
          <motion.div
            className={styles.velocityGlow}
            animate={{
              boxShadow: `0 0 ${Math.abs(velocity) * 50 + 10}px var(--accent-primary)`,
              opacity: 0.3 + Math.abs(velocity) * 0.5
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CircularTracker;

