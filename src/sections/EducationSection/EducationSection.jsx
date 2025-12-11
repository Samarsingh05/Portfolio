import { useState } from 'react';
import { motion } from 'framer-motion';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import styles from './EducationSection.module.css';

/**
 * Degree_Ledger() Section - Timeline UI
 * Education displayed as horizontal/vertical timeline with nodes
 * Hover reveals tooltip with details
 */

const education = [
  {
    id: 1,
    year: '2018',
    title: 'Class 10th',
    institution: 'St. Xavier\'s High School',
    grade: '94.6%',
    description: 'CBSE Board - Science stream with distinction in Mathematics',
    icon: '🏫',
    achievements: ['School topper in Mathematics', 'Science Olympiad Gold']
  },
  {
    id: 2,
    year: '2020',
    title: 'Class 12th',
    institution: 'Delhi Public School',
    grade: '95.2%',
    description: 'CBSE Board - PCM with Computer Science',
    icon: '📚',
    achievements: ['JEE Main 98.5 percentile', 'KVPY Scholar']
  },
  {
    id: 3,
    year: '2021',
    title: 'B.Tech Year 1',
    institution: 'IIT Delhi',
    grade: '9.1 CGPA',
    description: 'Computer Science & Engineering - Foundation year',
    icon: '🎓',
    achievements: ['Dean\'s List', 'Hackathon Winner']
  },
  {
    id: 4,
    year: '2022',
    title: 'B.Tech Year 2',
    institution: 'IIT Delhi',
    grade: '9.3 CGPA',
    description: 'Core CS courses - Data Structures, Algorithms, OS',
    icon: '💻',
    achievements: ['Research Assistant', 'Open Source Contributor']
  },
  {
    id: 5,
    year: '2023',
    title: 'B.Tech Year 3',
    institution: 'IIT Delhi',
    grade: '9.4 CGPA',
    description: 'Specialization in Machine Learning & AI',
    icon: '🤖',
    achievements: ['Published ML Paper', 'Teaching Assistant']
  },
  {
    id: 6,
    year: '2024',
    title: 'B.Tech Year 4',
    institution: 'IIT Delhi',
    grade: 'Ongoing',
    description: 'Final year project & industry internships',
    icon: '🚀',
    achievements: ['Industry Placement', 'Project Lead']
  }
];

const EducationSection = () => {
  const { ref, isInView } = useIntersectionObserver({ threshold: 0.2 });
  const [hoveredNode, setHoveredNode] = useState(null);

  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8, staggerChildren: 0.1 } }
  };

  const nodeVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <motion.section
      ref={ref}
      id="education"
      className={`section ${styles.educationSection}`}
      variants={sectionVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <motion.span className={styles.functionName} variants={nodeVariants}>
            Degree_Ledger()
          </motion.span>
          <motion.h2 variants={nodeVariants}>Academic Journey</motion.h2>
          <motion.p variants={nodeVariants}>
            From classroom to codebase
          </motion.p>
        </div>

        {/* Timeline */}
        <motion.div className={styles.timeline} variants={nodeVariants}>
          {/* Timeline line */}
          <div className={styles.timelineLine}></div>

          {/* Timeline nodes */}
          <div className={styles.timelineNodes}>
            {education.map((edu, index) => (
              <motion.div
                key={edu.id}
                className={styles.timelineNode}
                variants={nodeVariants}
                onMouseEnter={() => setHoveredNode(edu.id)}
                onMouseLeave={() => setHoveredNode(null)}
              >
                {/* Year label */}
                <motion.div 
                  className={styles.yearLabel}
                  animate={{ 
                    color: hoveredNode === edu.id ? 'var(--accent-primary)' : 'var(--text-secondary)'
                  }}
                >
                  {edu.year}
                </motion.div>

                {/* Node */}
                <motion.div 
                  className={styles.node}
                  animate={{ 
                    scale: hoveredNode === edu.id ? 1.2 : 1,
                    backgroundColor: hoveredNode === edu.id ? 'var(--accent-primary)' : 'var(--card-bg)',
                    borderColor: hoveredNode === edu.id ? 'var(--accent-primary)' : 'var(--border-color)'
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <span className={styles.nodeIcon}>{edu.icon}</span>
                </motion.div>

                {/* Title */}
                <motion.div 
                  className={styles.nodeTitle}
                  animate={{ 
                    color: hoveredNode === edu.id ? 'var(--accent-primary)' : 'var(--text-primary)'
                  }}
                >
                  {edu.title}
                </motion.div>

                {/* Tooltip */}
                <motion.div
                  className={styles.tooltip}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ 
                    opacity: hoveredNode === edu.id ? 1 : 0,
                    y: hoveredNode === edu.id ? 0 : 10,
                    pointerEvents: hoveredNode === edu.id ? 'auto' : 'none'
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <div className={styles.tooltipHeader}>
                    <span className={styles.tooltipTitle}>{edu.title}</span>
                    <span className={styles.tooltipGrade}>{edu.grade}</span>
                  </div>
                  <div className={styles.tooltipInstitution}>
                    {edu.institution}
                  </div>
                  <p className={styles.tooltipDesc}>{edu.description}</p>
                  <div className={styles.tooltipAchievements}>
                    {edu.achievements.map((achievement, i) => (
                      <span key={i} className={styles.achievementTag}>
                        ✓ {achievement}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div className={styles.statsGrid} variants={nodeVariants}>
          <div className={styles.statCard}>
            <span className={styles.statValue}>9.4</span>
            <span className={styles.statLabel}>Current CGPA</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statValue}>5+</span>
            <span className={styles.statLabel}>Research Papers</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statValue}>3x</span>
            <span className={styles.statLabel}>Dean's List</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statValue}>10+</span>
            <span className={styles.statLabel}>Certifications</span>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default EducationSection;
