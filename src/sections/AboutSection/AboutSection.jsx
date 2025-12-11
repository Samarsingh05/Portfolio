import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import styles from './AboutSection.module.css';

/**
 * About Me Section - Terminal + Photo Split Layout
 * Left: Terminal window with typing effect
 * Right: Portrait photo in minimal frame
 * Exit Animation: Rotates clockwise while drifting upward
 */

const terminalLines = [
  { type: 'prompt', text: '~ $ whoami' },
  { type: 'response', text: 'Arjun Sharma' },
  { type: 'prompt', text: '~ $ cat about.txt' },
  { type: 'response', text: 'Full Stack Developer & ML Enthusiast' },
  { type: 'response', text: 'Based in Bangalore, India 🇮🇳' },
  { type: 'prompt', text: '~ $ cat skills.json | jq ".primary"' },
  { type: 'response', text: '["React", "Python", "Node.js", "TensorFlow"]' },
  { type: 'prompt', text: '~ $ echo $PASSION' },
  { type: 'response', text: 'Building products that make a difference' },
  { type: 'prompt', text: '~ $ _' }
];

const AboutSection = () => {
  const { ref, isInView } = useIntersectionObserver({ threshold: 0.3 });
  const [visibleLines, setVisibleLines] = useState([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const typingSpeed = 40;
  const lineDelay = 300;

  // Reset animation when section comes into view
  useEffect(() => {
    if (isInView) {
      setVisibleLines([]);
      setCurrentLineIndex(0);
      setCurrentCharIndex(0);
      setIsTyping(true);
    }
  }, [isInView]);

  // Typing effect
  useEffect(() => {
    if (!isTyping || currentLineIndex >= terminalLines.length) {
      setIsTyping(false);
      return;
    }

    const currentLine = terminalLines[currentLineIndex];
    
    if (currentCharIndex < currentLine.text.length) {
      const timeout = setTimeout(() => {
        setCurrentCharIndex(prev => prev + 1);
      }, currentLine.type === 'prompt' ? typingSpeed : typingSpeed / 2);
      return () => clearTimeout(timeout);
    } else {
      // Line complete, add to visible and move to next
      setVisibleLines(prev => [...prev, currentLine]);
      const timeout = setTimeout(() => {
        setCurrentLineIndex(prev => prev + 1);
        setCurrentCharIndex(0);
      }, lineDelay);
      return () => clearTimeout(timeout);
    }
  }, [isTyping, currentLineIndex, currentCharIndex]);

  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.8, ease: 'easeOut' }
    },
    exit: { 
      opacity: 0,
      rotate: 5,
      y: -100,
      transition: { duration: 0.6, ease: 'easeIn' }
    }
  };

  const terminalVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.6, delay: 0.2 }
    }
  };

  const photoVariants = {
    hidden: { opacity: 0, x: 50, scale: 0.9 },
    visible: { 
      opacity: 1, 
      x: 0, 
      scale: 1,
      transition: { duration: 0.6, delay: 0.4 }
    }
  };

  return (
    <motion.section
      ref={ref}
      id="about"
      className={`section ${styles.aboutSection}`}
      variants={sectionVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      <div className={styles.container}>
        {/* Terminal Window */}
        <motion.div
          className={styles.terminalContainer}
          variants={terminalVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <div className={styles.terminalHeader}>
            <div className={styles.terminalButtons}>
              <span className={styles.btnClose}></span>
              <span className={styles.btnMinimize}></span>
              <span className={styles.btnMaximize}></span>
            </div>
            <span className={styles.terminalTitle}>terminal — bash</span>
          </div>
          <div className={styles.terminalBody}>
            {/* Completed lines */}
            {visibleLines.map((line, index) => (
              <div key={index} className={styles.terminalLine}>
                {line.type === 'prompt' ? (
                  <span className={styles.prompt}>{line.text}</span>
                ) : (
                  <span className={styles.response}>{line.text}</span>
                )}
              </div>
            ))}
            {/* Currently typing line */}
            {currentLineIndex < terminalLines.length && (
              <div className={styles.terminalLine}>
                {terminalLines[currentLineIndex].type === 'prompt' ? (
                  <span className={styles.prompt}>
                    {terminalLines[currentLineIndex].text.substring(0, currentCharIndex)}
                    <span className={styles.cursor}>▊</span>
                  </span>
                ) : (
                  <span className={styles.response}>
                    {terminalLines[currentLineIndex].text.substring(0, currentCharIndex)}
                    <span className={styles.cursor}>▊</span>
                  </span>
                )}
              </div>
            )}
          </div>
        </motion.div>

        {/* Photo Frame */}
        <motion.div
          className={styles.photoContainer}
          variants={photoVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <div className={styles.photoFrame}>
            <div className={styles.photoGlow}></div>
            <div className={styles.photoInner}>
              <div className={styles.photoPlaceholder}>
                <span className={styles.initials}>AS</span>
              </div>
            </div>
            <div className={styles.frameDecor}>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
          <motion.div 
            className={styles.statusBadge}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className={styles.statusDot}></span>
            Available for work
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        className={styles.scrollIndicator}
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <span>Scroll to explore</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </motion.div>
    </motion.section>
  );
};

export default AboutSection;
