import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import styles from './ExperienceSection.module.css';

/**
 * Intern_Logs() Section - GitHub Commit History UI
 * Work experience displayed as Git commits with diff cards on hover
 */

const experiences = [
  {
    hash: 'f8d91ee',
    date: 'May 2025',
    message: 'Joined Vmerg Media Pvt. Ltd. as Full Stack Developer Intern',
    branch: 'feature/web-platform',
    author: 'samar.singh',
    company: 'Vmerg Media Pvt. Ltd.',
    role: 'Full Stack Developer Intern',
    duration: 'May 2025 - July 2025',
    diff: {
      added: [
        'Delivered two production-ready modules for a live commercial web application',
        'Built and documented scalable, reusable UI components, reducing duplicate code by 25%'
      ],
      tech: ['TypeScript', 'React', 'Node.js', 'Git']
    }
  },
  {
    hash: 'a93c42f',
    date: 'June 2024',
    message: 'Joined Tru Value Overseas Pvt. Ltd. as Web Developer Intern',
    branch: 'feature/web-platform',
    author: 'samar.singh',
    company: 'Tru Value Overseas Pvt. Ltd.',
    role: 'Web Developer Intern',
    duration: 'June 2024 - July 2024',
    diff: {
      added: [
        'Revamped the B2B export portal with responsive layouts',
        'Cut page load times by ~30%'
      ],
      tech: ['React', 'Node.js', 'Rest API']
    }
  }
];

const ExperienceSection = () => {
  const { ref, isInView } = useIntersectionObserver({ threshold: 0.2 });
  const [hoveredCommit, setHoveredCommit] = useState(null);
  const [selectedCommit, setSelectedCommit] = useState(null);

  const handleGlowMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 16;
    e.currentTarget.style.setProperty('--gx', `${x}px`);
    e.currentTarget.style.setProperty('--gy', `${y}px`);
  };

  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8, staggerChildren: 0.2 } }
  };

  const commitVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
  };

  return (
    <motion.section
      ref={ref}
      id="experience"
      className={`section ${styles.experienceSection}`}
      variants={sectionVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <motion.h2
            variants={commitVariants}
            className="glow-title"
            onMouseMove={handleGlowMove}
            onMouseLeave={(e) => {
              e.currentTarget.style.setProperty('--gx', '0px');
              e.currentTarget.style.setProperty('--gy', '0px');
            }}
          >
            Internships
          </motion.h2>
          <motion.p variants={commitVariants}>
            My professional journey in commits
          </motion.p>
        </div>

        <div className={styles.gitContainer}>
          {/* Branch name */}
          <motion.div className={styles.branchInfo} variants={commitVariants}>
            <span className={styles.branchIcon}>🔀</span>
            <span>On branch <code>career/main</code></span>
          </motion.div>

          {/* Commit log */}
          <div className={styles.commitLog}>
            {/* Git graph line */}
            <div className={styles.gitGraph}>
              <div className={styles.graphLine}></div>
            </div>

            {/* Commits */}
            <div className={styles.commits}>
              {experiences.map((exp, index) => (
                <motion.div
                  key={exp.hash}
                  className={styles.commitRow}
                  variants={commitVariants}
                  onMouseEnter={() => setHoveredCommit(exp.hash)}
                  onMouseLeave={() => setHoveredCommit(null)}
                  onClick={() => setSelectedCommit(selectedCommit === exp.hash ? null : exp.hash)}
                >
                  {/* Graph node */}
                  <div className={styles.graphNode}>
                    <motion.div 
                      className={styles.node}
                      animate={{ 
                        scale: hoveredCommit === exp.hash ? 1.3 : 1,
                        backgroundColor: hoveredCommit === exp.hash ? 'var(--accent-primary)' : 'var(--text-secondary)'
                      }}
                    />
                  </div>

                  {/* Commit info */}
                  <div className={styles.commitInfo}>
                    <div className={styles.commitHeader}>
                      <code className={styles.hash}>{exp.hash}</code>
                      <span className={styles.date}>{exp.date}</span>
                    </div>
                    <div className={styles.commitMessage}>
                      <span className={styles.message}>{exp.message}</span>
                      <span className={styles.branch}>({exp.branch})</span>
                    </div>
                    <div className={styles.commitMeta}>
                      <span className={styles.author}>👤 {exp.author}</span>
                    </div>
                  </div>

                  {/* Diff card */}
                  <AnimatePresence>
                    {(hoveredCommit === exp.hash || selectedCommit === exp.hash) && (
                      <motion.div
                        className={`${styles.diffCard} ${index === experiences.length - 1 ? styles.diffCardLast : ''} ${index === 0 ? styles.diffCardFirst : ''}`}
                        initial={{ opacity: 0, x: 20, scale: 0.95 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: 20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className={styles.diffHeader}>
                          <span className={styles.diffTitle}>{exp.company}</span>
                          <span className={styles.diffRole}>{exp.role}</span>
                          <span className={styles.diffDuration}>{exp.duration}</span>
                        </div>
                        <div className={styles.diffBody}>
                          {exp.diff.added.map((line, i) => (
                            <div key={i} className={styles.diffLine}>
                              <span className={styles.diffAdd}>+</span>
                              <span>{line}</span>
                            </div>
                          ))}
                        </div>
                        <div className={styles.diffTech}>
                          {exp.diff.tech.map(tech => (
                            <span key={tech} className={styles.techTag}>{tech}</span>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Git status */}
          <motion.div className={styles.gitStatus} variants={commitVariants}>
            <code>$ git log --oneline --graph</code>
            <span className={styles.statusText}>
              Showing {experiences.length} commits • Hover or click to see diff
            </span>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default ExperienceSection;
