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
    institution: 'Sri Venkateshwara International School, New Delhi',
    grade: '90.5%',
    description: 'CBSE Board',
    icon: '🏫',
    achievements: ['Basketball, Theatre']
  },
  {
    id: 2,
    year: '2020',
    title: 'Class 12th',
    institution: 'Montfort Inter College, Lucknow',
    grade: '90.2%',
    description: 'CBSE Board - PCM with Computer Science',
    icon: '📚',
    achievements: ['Basketball, Coding']
  },
  {
    id: 3,
    year: '2022',
    title: 'B.Tech Year 1',
    institution: 'PES University',
    description: 'Computer Science & Engineering (AI-ML)',
    icon: '🎓',
    achievements: ['Learned Basic Python and started with "Kal Se Pakka Padhunga"']
  },
  {
    id: 4,
    year: '2023',
    title: 'B.Tech Year 2',
    institution: 'PES University',
    description: 'Core CS courses - Data Structures, Algorithms, OS',
    icon: '💻',
    achievements: ['Started going to hackathons but still consistent with "Kal Se Pakka Padhunga"']
  },
  {
  id: 5,
  year: '2024',
  title: 'B.Tech Year 3',
  institution: 'PES University',
  description: 'Specialization in Machine Learning & AI',
  icon: '🤖',
  achievements: [
    'Won 2nd Prize in a Hackathon Codecrypt 2025 and 5th place in AI Coding Contest',
    'Also upgraded to "Ab To Padh Hi Leta Hoon"'
  ]
},

  {
    id: 6,
    year: '2025',
    title: 'B.Tech Year 4',
    institution: 'PES University',
    grade: 'Ongoing',
    description: 'Final year project & industry internships',
    icon: '🚀',
    achievements: ['Applied to countless number of companies, faced hundreds of rejections, and thought "Yaar Padhna Tha Kya Pichle Teen Saal"']
  }
];

const EducationSection = () => {
  const { ref, isInView } = useIntersectionObserver({ threshold: 0.2 });
  const [hoveredNode, setHoveredNode] = useState(null);

  const handleGlowMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 16;
    e.currentTarget.style.setProperty('--gx', `${x}px`);
    e.currentTarget.style.setProperty('--gy', `${y}px`);
  };

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
          <motion.h2
            variants={nodeVariants}
            className="glow-title"
            onMouseMove={handleGlowMove}
            onMouseLeave={(e) => {
              e.currentTarget.style.setProperty('--gx', '0px');
              e.currentTarget.style.setProperty('--gy', '0px');
            }}
          >
            Academic Journey
          </motion.h2>
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
      </div>
    </motion.section>
  );
};

export default EducationSection;
