import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import styles from './AboutSection.module.css';
import profilePic from '../../assets/profile.jpeg';
console.log('PROFILE PIC URL ->', profilePic);


/* ...terminalLines array unchanged... */
const terminalLines = [
  { type: 'prompt', text: '~ $ whoami' },
  { type: 'response', text: 'Samar Singh' },
  { type: 'prompt', text: '~ $ cat about.txt' },
  { type: 'response', text: 'Born in Lucknow and Based in Bangalore, India 🇮🇳' },
  { type: 'response', text: 'Full Stack Developer & ML Enthusiast' },
  { type: 'prompt', text: '~ $ echo $PASSION' },
  { type: 'response', text: 'Building products that are fun and can be actually used by people' },
  { type: 'prompt', text: '~ $ echo $GOAL' },
  { type: 'response', text: 'Getting a really cool internship where I get to learn many new things and get ₹₹₹' },
  { type: 'prompt', text: '~ $ _' }
];

const AboutSection = () => {
  const { ref, isInView } = useIntersectionObserver({ threshold: 0.3 });
  const [visibleLines, setVisibleLines] = useState([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const completedLinesRef = useRef(new Set());
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const typingSpeed = 90; // Slower typing
  const lineDelay = 600;

  useEffect(() => {
    if (isInView) {
      if (currentLineIndex === 0 && visibleLines.length === 0) {
        setVisibleLines([]);
        setCurrentLineIndex(0);
        setCurrentCharIndex(0);
        setIsTyping(true);
        completedLinesRef.current.clear();
      }
    } else {
      setVisibleLines([]);
      setCurrentLineIndex(0);
      setCurrentCharIndex(0);
      setIsTyping(false);
      completedLinesRef.current.clear();
    }
  }, [isInView]);

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
      const lineKey = `${currentLineIndex}-${currentLine.text}`;
      if (!completedLinesRef.current.has(lineKey)) {
        completedLinesRef.current.add(lineKey);
        setVisibleLines(prev => {
          if (prev[currentLineIndex] && prev[currentLineIndex].text === currentLine.text) {
            return prev;
          }
          const newLines = [...prev];
          newLines[currentLineIndex] = currentLine;
          return newLines;
        });
      }
      const timeout = setTimeout(() => {
        setCurrentLineIndex(prev => {
          if (prev + 1 >= terminalLines.length) {
            setIsTyping(false);
          }
          return prev + 1;
        });
        setCurrentCharIndex(0);
      }, lineDelay);
      return () => clearTimeout(timeout);
    }
  }, [isTyping, currentLineIndex, currentCharIndex]);

  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8, ease: 'easeOut' } },
    exit: { opacity: 0, rotate: 5, y: -100, transition: { duration: 0.6, ease: 'easeIn' } }
  };

  const terminalVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, delay: 0.2 } }
  };

  const photoVariants = {
    hidden: { opacity: 0, x: 50, scale: 0.9 },
    visible: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.6, delay: 0.4 } }
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
        <motion.div className={styles.terminalContainer} variants={terminalVariants} initial="hidden" animate={isInView ? 'visible' : 'hidden'}>
          <div className={styles.terminalHeader}>
            <div className={styles.terminalButtons}>
              <span className={styles.btnClose}></span>
              <span className={styles.btnMinimize}></span>
              <span className={styles.btnMaximize}></span>
            </div>
            <span className={styles.terminalTitle}>terminal — bash</span>
          </div>
          <div className={styles.terminalBody}>
            {visibleLines.map((line, index) => (
              <div key={`${index}-${line.text}`} className={styles.terminalLine}>
                {line.type === 'prompt' ? <span className={styles.prompt}>{line.text}</span> : <span className={styles.response}>{line.text}</span>}
              </div>
            ))}

            {currentLineIndex < terminalLines.length && currentCharIndex > 0 && currentCharIndex < terminalLines[currentLineIndex].text.length && (
              <div className={styles.terminalLine} key={`typing-${currentLineIndex}`}>
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
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const offsetX = e.clientX - rect.left;
            const offsetY = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateY = ((offsetX - centerX) / centerX) * 10;
            const rotateX = -((offsetY - centerY) / centerY) * 10;
            setTilt({ x: rotateY, y: rotateX });
          }}
          onMouseLeave={() => setTilt({ x: 0, y: 0 })}
        >
          <div className={styles.photoFrame}>
            <div className={styles.photoGlow}></div>
            <div className={styles.photoInner} style={{ transform: `rotateY(${tilt.x}deg) rotateX(${tilt.y}deg) translateZ(12px)` }}>
              <img
                src={profilePic}
                alt="Samar Singh"
                className={styles.photoImage}
                loading="lazy"
                decoding="async"
                onLoad={() => console.log('profile image loaded')}
              />
            </div>
            <div className={styles.frameDecor}>
              <span></span><span></span><span></span><span></span>
            </div>
          </div>

          <motion.div className={styles.statusBadge} animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }}>
            <span className={styles.statusDot}></span>
            Available for work
          </motion.div>
        </motion.div>
      </div>

      <motion.div className={styles.scrollIndicator} animate={{ y: [0, 10, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
        <span>Scroll to explore</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </motion.div>
    </motion.section>
  );
};

export default AboutSection;
