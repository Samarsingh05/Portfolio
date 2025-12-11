import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import styles from './ContactSection.module.css';

/**
 * Ping_Bhai() Section - Gmail-style Email Composer UI
 * Left: Email composer form
 * Right: Phone number card
 * Radar pulse animation on typing
 */

const ContactSection = () => {
  const { ref, isInView } = useIntersectionObserver({ threshold: 0.2 });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isTyping, setIsTyping] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Trigger typing animation
    setIsTyping(true);
    if (typingTimeout) clearTimeout(typingTimeout);
    setTypingTimeout(setTimeout(() => setIsTyping(false), 1000));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8, staggerChildren: 0.15 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <motion.section
      ref={ref}
      id="contact"
      className={`section ${styles.contactSection}`}
      variants={sectionVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      {/* Radar pulse background effect */}
      <motion.div 
        className={styles.radarPulse}
        animate={{ 
          scale: isTyping ? [1, 1.5, 2] : 1,
          opacity: isTyping ? [0.3, 0.15, 0] : 0
        }}
        transition={{ duration: 1.5, repeat: isTyping ? Infinity : 0 }}
      />

      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <motion.span className={styles.functionName} variants={itemVariants}>
            Ping_Bhai()
          </motion.span>
          <motion.h2 variants={itemVariants}>Let's Connect</motion.h2>
          <motion.p variants={itemVariants}>
            Drop me a message – I'd love to hear from you!
          </motion.p>
        </div>

        <div className={styles.contactGrid}>
          {/* Email Composer */}
          <motion.div className={styles.emailComposer} variants={itemVariants}>
            <div className={styles.composerHeader}>
              <div className={styles.composerTitle}>
                <span className={styles.composeIcon}>✉️</span>
                <span>New Message</span>
              </div>
              <div className={styles.composerActions}>
                <span>—</span>
                <span>□</span>
                <span>✕</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className={styles.composerBody}>
              <div className={styles.formRow}>
                <label>To:</label>
                <input 
                  type="text" 
                  value="arjun.sharma@email.com" 
                  readOnly
                  className={styles.readOnly}
                />
              </div>
              <div className={styles.formRow}>
                <label>From:</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  required
                />
              </div>
              <div className={styles.formRow}>
                <label>Name:</label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  required
                />
              </div>
              <div className={styles.formRow}>
                <label>Subject:</label>
                <input 
                  type="text" 
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="What's this about?"
                  required
                />
              </div>
              <div className={styles.messageArea}>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message here..."
                  rows={8}
                  required
                />
              </div>
              <div className={styles.composerFooter}>
                <motion.button 
                  type="submit"
                  className={styles.sendBtn}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>Send</span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
                  </svg>
                </motion.button>
                <div className={styles.footerActions}>
                  <span title="Attach file">📎</span>
                  <span title="Insert link">🔗</span>
                  <span title="Insert emoji">😊</span>
                </div>
              </div>
            </form>
          </motion.div>

          {/* Contact Cards */}
          <motion.div className={styles.contactCards} variants={itemVariants}>
            {/* Phone Card */}
            <motion.div 
              className={styles.contactCard}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <div className={styles.cardIcon}>📱</div>
              <div className={styles.cardInfo}>
                <span className={styles.cardLabel}>Phone</span>
                <span className={styles.cardValue}>+91 98765 43210</span>
              </div>
              <motion.a 
                href="tel:+919876543210"
                className={styles.cardAction}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                📞
              </motion.a>
            </motion.div>

            {/* Email Card */}
            <motion.div 
              className={styles.contactCard}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <div className={styles.cardIcon}>📧</div>
              <div className={styles.cardInfo}>
                <span className={styles.cardLabel}>Email</span>
                <span className={styles.cardValue}>arjun.sharma@email.com</span>
              </div>
              <motion.a 
                href="mailto:arjun.sharma@email.com"
                className={styles.cardAction}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                ✉️
              </motion.a>
            </motion.div>

            {/* Location Card */}
            <motion.div 
              className={styles.contactCard}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <div className={styles.cardIcon}>📍</div>
              <div className={styles.cardInfo}>
                <span className={styles.cardLabel}>Location</span>
                <span className={styles.cardValue}>Bangalore, India</span>
              </div>
              <motion.a 
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.cardAction}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                🗺️
              </motion.a>
            </motion.div>

            {/* Social Links */}
            <div className={styles.socialLinks}>
              <span className={styles.socialLabel}>Find me on</span>
              <div className={styles.socialIcons}>
                {[
                  { icon: '💼', name: 'LinkedIn', url: '#' },
                  { icon: '🐙', name: 'GitHub', url: '#' },
                  { icon: '🐦', name: 'Twitter', url: '#' },
                  { icon: '📸', name: 'Instagram', url: '#' }
                ].map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    className={styles.socialIcon}
                    whileHover={{ scale: 1.2, y: -5 }}
                    whileTap={{ scale: 0.9 }}
                    title={social.name}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Availability Status */}
            <motion.div 
              className={styles.availabilityCard}
              animate={{ boxShadow: ['0 0 20px rgba(34, 197, 94, 0.3)', '0 0 40px rgba(34, 197, 94, 0.1)', '0 0 20px rgba(34, 197, 94, 0.3)'] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className={styles.availabilityDot}></div>
              <div className={styles.availabilityText}>
                <span className={styles.availabilityTitle}>Currently Available</span>
                <span className={styles.availabilityDesc}>
                  Open for freelance projects & full-time opportunities
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.footer className={styles.footer} variants={itemVariants}>
          <p>Designed & Built by <span>Arjun Sharma</span> © 2024</p>
          <p className={styles.footerNote}>Made with ☕ and lots of Framer Motion</p>
        </motion.footer>
      </div>
    </motion.section>
  );
};

export default ContactSection;
