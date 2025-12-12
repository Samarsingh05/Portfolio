import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import styles from './CertificatesSection.module.css';

/**
 * Proof_Of_Work() Section - File Explorer UI
 * Left: Folder tree (Google, Coursera, AWS...)
 * Right: Certificate preview grid
 * Click opens certificate modal (View Certificate opens in new tab)
 */

const certificateData = {
  google: {
    name: 'Kaggle',
    icon: '🔵',
    certificates: [
      {
        id: 1,
        name: 'Introduction to Python',
        date: 'June 2024',
        credential: 'GCP-12345',
        url: 'https://drive.google.com/file/d/1Mf510pug_mCCNQrqNgQjay4yGlbF3pSf/view?usp=sharing'
      }
    ]
  },
  coursera: {
    name: 'Hackerrank',
    icon: '🟦',
    certificates: [
      {
        id: 2,
        name: 'SQL Intermediate',
        date: 'Nov 2024',
        credential: '31768BE50AE8',
        url: 'https://drive.google.com/file/d/1SRc34pYxXY0Mdf8o4YUY9Vb1sOoFqBCa/view?usp=sharing'
      },
      {
        id: 3,
        name: 'Java Basic',
        date: 'April 2024',
        credential: 'A26C8CA61051',
        url: 'https://drive.google.com/file/d/1ARRMf_fl-zYaBCbViP4qLnbMxYIHZFzQ/view?usp=sharing'
      }
    ]
  },
  aws: {
    name: '100xDevs',
    icon: '🟧',
    certificates: [
      {
        id: 4,
        name: '0-100 Full Stack Web Development',
        date: 'Jan 2025',
        credential: 'QGTL2393',
        url: 'https://drive.google.com/file/d/1Wu51Nm7F0hy7gBW0tPi87MMw-0LZo_Wf/view?usp=sharing'
      }
    ]
  }
};

const CertificatesSection = () => {
  const { ref, isInView } = useIntersectionObserver({ threshold: 0.2 });
  const [activeFolder, setActiveFolder] = useState('google');
  const [selectedCert, setSelectedCert] = useState(null);

  const handleGlowMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 16;
    e.currentTarget.style.setProperty('--gx', `${x}px`);
    e.currentTarget.style.setProperty('--gy', `${y}px`);
  };

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
          <motion.h2
            className="glow-title"
            onMouseMove={handleGlowMove}
            onMouseLeave={(e) => {
              e.currentTarget.style.setProperty('--gx', '0px');
              e.currentTarget.style.setProperty('--gy', '0px');
            }}
          >
            Certificates
          </motion.h2>
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
                      {/* View Certificate - opens in new tab */}
                      <motion.a
                        className={styles.verifyBtn}
                        href={selectedCert.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        View Certificate
                      </motion.a>
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
