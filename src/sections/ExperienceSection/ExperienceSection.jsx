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
    hash: 'e14f23a',
    date: 'Jun 2024',
    message: 'Joined TechCorp as ML Engineer Intern',
    branch: 'feature/ml-pipeline',
    author: 'arjun.sharma',
    company: 'TechCorp',
    role: 'ML Engineer Intern',
    duration: 'Jun 2024 - Present',
    diff: {
      added: [
        'Built automated ML pipeline reducing training time by 40%',
        'Implemented real-time anomaly detection system',
        'Collaborated with 5+ cross-functional teams'
      ],
      tech: ['Python', 'TensorFlow', 'AWS SageMaker', 'Docker']
    }
  },
  {
    hash: 'b72d11c',
    date: 'Jan 2024',
    message: 'Joined DataVerse as Data Science Intern',
    branch: 'feature/data-analysis',
    author: 'arjun.sharma',
    company: 'DataVerse',
    role: 'Data Science Intern',
    duration: 'Jan 2024 - May 2024',
    diff: {
      added: [
        'Developed predictive models with 92% accuracy',
        'Created automated reporting dashboards',
        'Processed 1M+ data points daily'
      ],
      tech: ['Python', 'Pandas', 'Scikit-learn', 'Tableau']
    }
  },
  {
    hash: 'a93c42f',
    date: 'Jul 2023',
    message: 'Joined StartupX as Full Stack Developer Intern',
    branch: 'feature/web-platform',
    author: 'arjun.sharma',
    company: 'StartupX',
    role: 'Full Stack Developer Intern',
    duration: 'Jul 2023 - Dec 2023',
    diff: {
      added: [
        'Built customer portal from scratch (React + Node)',
        'Improved page load time by 60%',
        'Implemented CI/CD pipeline'
      ],
      tech: ['React', 'Node.js', 'PostgreSQL', 'AWS']
    }
  },
  {
    hash: 'f8d91ee',
    date: 'Mar 2023',
    message: 'Started open source contributions',
    branch: 'contrib/opensource',
    author: 'arjun.sharma',
    company: 'Open Source',
    role: 'Contributor',
    duration: 'Mar 2023 - Present',
    diff: {
      added: [
        'Contributed to TensorFlow.js documentation',
        'Fixed 10+ bugs in popular React libraries',
        'Maintained personal npm packages (500+ weekly downloads)'
      ],
      tech: ['TypeScript', 'React', 'Node.js', 'Git']
    }
  }
];

const ExperienceSection = () => {
  const { ref, isInView } = useIntersectionObserver({ threshold: 0.2 });
  const [hoveredCommit, setHoveredCommit] = useState(null);
  const [selectedCommit, setSelectedCommit] = useState(null);

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
          <motion.span className={styles.functionName} variants={commitVariants}>
            Intern_Logs()
          </motion.span>
          <motion.h2 variants={commitVariants}>Git History</motion.h2>
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
                        className={styles.diffCard}
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
