import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSectionTracker } from '../../hooks/useIntersectionObserver';
import { useTheme } from '../../context/ThemeContext';
import styles from './BackgroundTransition.module.css';

const sectionIds = ['about', 'skills', 'projects', 'experience', 'education', 'certificates', 'contact'];

/**
 * Background Transition Component
 * Handles smooth crossfade between section backgrounds
 * Each section has unique gradient + texture for light and dark modes
 */
const BackgroundTransition = () => {
  const { activeSection } = useSectionTracker(sectionIds);
  const { isDark } = useTheme();

  // Background configurations for each section
  const backgrounds = [
    // About Me - Navy streaks
    {
      dark: 'linear-gradient(135deg, #0a0a1a 0%, #1a1a3a 50%, #0d0d2d 100%)',
      light: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 50%, #f1f3f5 100%)',
      pattern: 'streaks'
    },
    // Skills - Indigo rectangles
    {
      dark: 'linear-gradient(145deg, #1a103a 0%, #2d1b69 50%, #1a1a4a 100%)',
      light: 'linear-gradient(145deg, #f5f3ff 0%, #ede9fe 50%, #f3f0ff 100%)',
      pattern: 'rectangles'
    },
    // Projects - Orange glow
    {
      dark: 'linear-gradient(160deg, #1a1510 0%, #2d2015 50%, #1a1818 100%)',
      light: 'linear-gradient(160deg, #fffbeb 0%, #fef3c7 50%, #fff7ed 100%)',
      pattern: 'lines'
    },
    // Experience - Dotted graph
    {
      dark: 'linear-gradient(135deg, #0a1a1a 0%, #1a2a3a 50%, #0d1d2d 100%)',
      light: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 50%, #ecfeff 100%)',
      pattern: 'dots'
    },
    // Education - Diagonal streaks
    {
      dark: 'linear-gradient(170deg, #1a1020 0%, #2a1a3a 50%, #1a1a2a 100%)',
      light: 'linear-gradient(170deg, #fdf4ff 0%, #fae8ff 50%, #f5f3ff 100%)',
      pattern: 'diagonal'
    },
    // Certificates - Icon pattern
    {
      dark: 'linear-gradient(135deg, #101820 0%, #1a2838 50%, #0d1825 100%)',
      light: 'linear-gradient(135deg, #f0fdfa 0%, #ccfbf1 50%, #d1fae5 100%)',
      pattern: 'icons'
    },
    // Contact - Radial pulse
    {
      dark: 'radial-gradient(circle at 50% 50%, #1a2a2a 0%, #0a1a1a 50%, #0d1515 100%)',
      light: 'radial-gradient(circle at 50% 50%, #f0fdfa 0%, #ccfbf1 50%, #e0f2f1 100%)',
      pattern: 'pulse'
    }
  ];

  return (
    <div className={styles.backgroundContainer}>
      <AnimatePresence mode="wait">
        {backgrounds.map((bg, index) => (
          index === activeSection && (
            <motion.div
              key={`bg-${index}`}
              className={`${styles.background} ${styles[bg.pattern]}`}
              style={{
                background: isDark ? bg.dark : bg.light
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0.3 }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
            />
          )
        ))}
      </AnimatePresence>
    </div>
  );
};

export default BackgroundTransition;
