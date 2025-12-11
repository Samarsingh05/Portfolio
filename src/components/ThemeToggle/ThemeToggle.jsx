import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import styles from './ThemeToggle.module.css';

/**
 * Theme Toggle Switch Component
 * Clean toggle switch for light/dark mode
 */
const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className={styles.toggleContainer}>
      <span className={`${styles.label} ${!isDark ? styles.activeLabel : ''}`}>☀️</span>
      <button
        className={styles.toggleSwitch}
        onClick={toggleTheme}
        aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        <motion.div
          className={styles.toggleKnob}
          animate={{ x: isDark ? 24 : 0 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        />
      </button>
      <span className={`${styles.label} ${isDark ? styles.activeLabel : ''}`}>🌙</span>
    </div>
  );
};

export default ThemeToggle;
