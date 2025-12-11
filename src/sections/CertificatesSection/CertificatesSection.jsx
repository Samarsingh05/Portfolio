import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import styles from './CertificatesSection.module.css';

/**
 * Proof_Of_Work() Section - File Explorer UI
 * Left: Folder tree (Google, Coursera, AWS...)
 * Right: Certificate preview grid
 * Click opens certificate modal
 */

const certificateData = {
  google: {
    name: 'Google',
    icon: '🔵',
    certificates: [
      { id: 1, name: 'Google Cloud Professional', date: 'Mar 2024', credential: 'GCP-12345' },
      { id: 2, name: 'TensorFlow Developer', date: 'Jan 2024', credential: 'TF-67890' },
      { id: 3, name: 'Data Analytics Professional', date: 'Nov 2023', credential: 'GA-11111' }
    ]
  },
  coursera: {
    name: 'Coursera',
    icon: '🟦',
    certificates: [
      { id: 4, name: 'Deep Learning Specialization', date: 'Oct 2023', credential: 'DL-22222' },
      { id: 5, name: 'Machine Learning by Stanford', date: 'Aug 2023', credential: 'ML-33333' },
      { id: 6, name: 'Full Stack Web Development', date: 'Jun 2023', credential: 'FS-44444' }
    ]
  },
  aws: {
    name: 'AWS',
    icon: '🟧',
    certificates: [
      { id: 7, name: 'AWS Solutions Architect', date: 'Feb 2024', credential: 'AWS-55555' },
      { id: 8, name: 'AWS Developer Associate', date: 'Dec 2023', credential: 'AWS-66666' }
    ]
  },
  meta: {
    name: 'Meta',
    icon: '🔷',
    certificates: [
      { id: 9, name: 'React Advanced Concepts', date: 'Apr 2024', credential: 'META-77777' },
      { id: 10, name: 'Front-End Developer', date: 'Feb 2024', credential: 'META-88888' }
    ]
  }
};

const CertificatesSection = () => {
  const { ref, isInView } = useIntersectionObserver({ threshold: 0.2 });
  const [activeFolder, setActiveFolder] = useState('google');
  const [selectedCert, setSelectedCert] = useState(null);

  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8 } }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } }
  };

  return (
    <motion.section
      ref={ref}
      id="certificates"
      className={`section ${styles.certificatesSection}`}
      variants={sectionVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <motion.span className={styles.functionName}>
            Proof_Of_Work()
          </motion.span>
          <motion.h2>Certificates</motion.h2>
          <motion.p>Verified achievements & credentials</motion.p>
        </div>

        <div className={styles.explorerContainer}>
          {/* Sidebar - Folder Tree */}
          <div className={styles.sidebar}>
            <div className={styles.sidebarHeader}>
              <span className={styles.sidebarTitle}>📁 Certificates</span>
            </div>
            <div className={styles.folderTree}>
              {Object.entries(certificateData).map(([key, data]) => (
                <motion.div
                  key={key}
                  className={`${styles.folder} ${activeFolder === key ? styles.activeFolder : ''}`}
                  onClick={() => setActiveFolder(key)}
                  whileHover={{ x: 5 }}
                >
                  <span className={styles.folderIcon}>{data.icon}</span>
                  <span className={styles.folderName}>{data.name}</span>
                  <span className={styles.folderCount}>{data.certificates.length}</span>
                </motion.div>
              ))}
            </div>
            <div className={styles.sidebarFooter}>
              <span className={styles.totalCount}>
                📜 Total: {Object.values(certificateData).reduce((acc, d) => acc + d.certificates.length, 0)} certificates
              </span>
            </div>
          </div>

          {/* Main Content - Certificate Grid */}
          <div className={styles.mainContent}>
            <div className={styles.contentHeader}>
              <span className={styles.breadcrumb}>
                Certificates / {certificateData[activeFolder].name}
              </span>
              <div className={styles.viewToggle}>
                <span className={styles.activeView}>▦</span>
                <span>≡</span>
              </div>
            </div>

            <div className={styles.certificateGrid}>
              <AnimatePresence mode="wait">
                {certificateData[activeFolder].certificates.map((cert, index) => (
                  <motion.div
                    key={cert.id}
                    className={styles.certificateCard}
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    transition={{ delay: index * 0.1 }}
                    onClick={() => setSelectedCert(cert)}
                    whileHover={{ scale: 1.02, y: -5 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className={styles.cardPreview}>
                      <div className={styles.certIcon}>📜</div>
                      <div className={styles.certBadge}>
                        {certificateData[activeFolder].icon}
                      </div>
                    </div>
                    <div className={styles.cardInfo}>
                      <h3 className={styles.certName}>{cert.name}</h3>
                      <p className={styles.certDate}>{cert.date}</p>
                      <span className={styles.certCredential}>
                        ID: {cert.credential}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Certificate Modal */}
        <AnimatePresence>
          {selectedCert && (
            <motion.div
              className={styles.modalOverlay}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCert(null)}
            >
              <motion.div
                className={styles.modal}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button 
                  className={styles.modalClose}
                  onClick={() => setSelectedCert(null)}
                >
                  ✕
                </button>
                <div className={styles.modalContent}>
                  <div className={styles.modalPreview}>
                    <div className={styles.largeCertIcon}>📜</div>
                    <div className={styles.certWatermark}>
                      {certificateData[activeFolder].name}
                    </div>
                  </div>
                  <div className={styles.modalInfo}>
                    <span className={styles.modalBadge}>
                      {certificateData[activeFolder].icon} {certificateData[activeFolder].name}
                    </span>
                    <h2 className={styles.modalTitle}>{selectedCert.name}</h2>
                    <p className={styles.modalMeta}>
                      <span>📅 Issued: {selectedCert.date}</span>
                      <span>🔐 Credential ID: {selectedCert.credential}</span>
                    </p>
                    <div className={styles.modalActions}>
                      <motion.button 
                        className={styles.verifyBtn}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Verify Certificate
                      </motion.button>
                      <motion.button 
                        className={styles.downloadBtn}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Download PDF
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  );
};

export default CertificatesSection;
