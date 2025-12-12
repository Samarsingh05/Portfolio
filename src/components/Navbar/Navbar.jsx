import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Navbar.module.css';

const sections = [
  { id: 'about', name: 'About_Me()', title: 'About Me' },
  { id: 'skills', name: 'Skills_Unlocked()', title: 'Skills' },
  { id: 'projects', name: 'Projects_Products()', title: 'Projects' },
  { id: 'experience', name: 'Intern_Logs()', title: 'Experience' },
  { id: 'education', name: 'Padhai_Likhaai()', title: 'Education' },
  { id: 'certificates', name: 'Certificates()', title: 'Certificates' },
  { id: 'contact', name: 'Ping_Me()', title: 'Contact' }
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Backdrop overlay when menu is open */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={styles.backdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      <div className={styles.navbarContainer}>
        <motion.button
          className={styles.navbarToggle}
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className={styles.hamburgerIcon}>
            <motion.span
              className={styles.hamburgerLine}
              animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              className={styles.hamburgerLine}
              animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className={styles.hamburgerLine}
              animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </motion.button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              className={styles.navbarMenu}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
            {sections.map((section) => (
              <motion.button
                key={section.id}
                className={styles.navbarItem}
                onClick={() => scrollToSection(section.id)}
                whileHover={{ x: 5, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className={styles.navbarFunction}>{section.name}</span>
                <span className={styles.navbarTitle}>{section.title}</span>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
    </>
  );
};

export default Navbar;
