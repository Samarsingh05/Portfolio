import { motion, AnimatePresence } from 'framer-motion';
import { useScrollTracker } from '../../hooks/useScrollTracker';
import { useSectionTracker } from '../../hooks/useIntersectionObserver';
import styles from './CircularTracker.module.css';

/**
 * Circular Section Tracker Component
 * Half-circle design on right edge showing current section number
 * With diagonal line divisions
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

const CircularTracker = () => {
  const { isScrolling } = useScrollTracker();
  const { activeSection } = useSectionTracker(sectionIds);

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
          {/* Half circle with section number */}
          <div className={styles.halfCircle}>
            {/* Diagonal lines */}
            <div className={styles.diagonalLines}>
              <span className={styles.line1}></span>
              <span className={styles.line2}></span>
            </div>
            
            {/* Section number */}
            <div className={styles.sectionNumber}>
              {activeSection + 1}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CircularTracker;
