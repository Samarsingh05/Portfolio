import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import styles from './SkillsSection.module.css';

/**
 * Skills_Unlocked() Section - VS Code Editor UI
 * Left: Folder tree navigation
 * Right: Syntax-highlighted skill object with tabs
 */

const skillCategories = [
  {
    name: 'frontend',
    icon: '📁',
    file: 'frontend.tsx',
    skills: [
      { name: 'React', color: '#61dafb' },
      { name: 'TypeScript', color: '#3178c6' },
      { name: 'Next.js', color: '#ffffff' },
      { name: 'Tailwind CSS', color: '#38bdf8' },
      { name: 'Framer Motion', color: '#ff0080' }
    ]
  },
  {
    name: 'backend',
    icon: '📁',
    file: 'backend.py',
    skills: [
      { name: 'Python', color: '#3776ab' },
      { name: 'Node.js', color: '#68a063' },
      { name: 'FastAPI', color: '#009688' },
      { name: 'PostgreSQL', color: '#336791' },
      { name: 'MongoDB', color: '#47a248' }
    ]
  },
  {
    name: 'ml_ai',
    icon: '📁',
    file: 'ml_models.py',
    skills: [
      { name: 'TensorFlow', color: '#ff6f00' },
      { name: 'PyTorch', color: '#ee4c2c' },
      { name: 'Scikit-learn', color: '#f7931e' },
      { name: 'OpenCV', color: '#5c3ee8' },
      { name: 'Pandas', color: '#150458' }
    ]
  },
  {
    name: 'devops',
    icon: '📁',
    file: 'infra.yaml',
    skills: [
      { name: 'Docker', color: '#2496ed' },
      { name: 'AWS', color: '#ff9900' },
      { name: 'Git', color: '#f05032' },
      { name: 'CI/CD', color: '#40be46' },
      { name: 'Linux', color: '#fcc624' }
    ]
  }
];

const SkillsSection = () => {
  const { ref, isInView } = useIntersectionObserver({ threshold: 0.3 });
  const [activeCategory, setActiveCategory] = useState(0);
  const [expandedFolders, setExpandedFolders] = useState(['frontend', 'backend', 'ml_ai', 'devops']);

  const toggleFolder = (name) => {
    setExpandedFolders(prev => 
      prev.includes(name) ? prev.filter(f => f !== name) : [...prev, name]
    );
  };

  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.8, staggerChildren: 0.1 }
    }
  };

  const editorVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <motion.section
      ref={ref}
      id="skills"
      className={`section ${styles.skillsSection}`}
      variants={sectionVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      <div className={styles.sectionHeader}>
        <motion.span className={styles.functionName} variants={editorVariants}>
          Skills_Unlocked()
        </motion.span>
        <motion.h2 variants={editorVariants}>Technical Arsenal</motion.h2>
      </div>

      <motion.div className={styles.editorContainer} variants={editorVariants}>
        {/* VS Code Title Bar */}
        <div className={styles.editorTitleBar}>
          <div className={styles.windowControls}>
            <span className={styles.btnClose}></span>
            <span className={styles.btnMinimize}></span>
            <span className={styles.btnMaximize}></span>
          </div>
          <span className={styles.editorTitle}>skills.workspace — Visual Studio Code</span>
          <div className={styles.windowActions}>
            <span>⚙️</span>
          </div>
        </div>

        <div className={styles.editorBody}>
          {/* Sidebar - File Explorer */}
          <div className={styles.sidebar}>
            <div className={styles.sidebarHeader}>
              <span>EXPLORER</span>
            </div>
            <div className={styles.fileTree}>
              <div className={styles.projectRoot}>
                <span className={styles.folderIcon}>📂</span>
                <span>my-skills</span>
              </div>
              {skillCategories.map((category, index) => (
                <div key={category.name} className={styles.folderGroup}>
                  <div 
                    className={styles.folder}
                    onClick={() => toggleFolder(category.name)}
                  >
                    <span className={styles.chevron}>
                      {expandedFolders.includes(category.name) ? '▼' : '▶'}
                    </span>
                    <span className={styles.folderIcon}>
                      {expandedFolders.includes(category.name) ? '📂' : '📁'}
                    </span>
                    <span>{category.name}</span>
                  </div>
                  {expandedFolders.includes(category.name) && (
                    <motion.div 
                      className={styles.files}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div 
                        className={`${styles.file} ${activeCategory === index ? styles.activeFile : ''}`}
                        onClick={() => setActiveCategory(index)}
                      >
                        <span className={styles.fileIcon}>📄</span>
                        <span>{category.file}</span>
                      </div>
                    </motion.div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Main Editor Area */}
          <div className={styles.mainEditor}>
            {/* Tabs */}
            <div className={styles.editorTabs}>
              {skillCategories.map((category, index) => (
                <div 
                  key={category.name}
                  className={`${styles.tab} ${activeCategory === index ? styles.activeTab : ''}`}
                  onClick={() => setActiveCategory(index)}
                >
                  <span className={styles.tabIcon}>📄</span>
                  <span>{category.file}</span>
                  <span className={styles.tabClose}>×</span>
                </div>
              ))}
            </div>

            {/* Code Area */}
            <div className={styles.codeArea}>
              <div className={styles.lineNumbers}>
                {[...Array(15)].map((_, i) => (
                  <span key={i}>{i + 1}</span>
                ))}
              </div>
              <AnimatePresence mode="wait">
                <motion.div 
                  key={activeCategory}
                  className={styles.codeContent}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <pre>
                    <code>
                      <span className={styles.keyword}>const</span>{' '}
                      <span className={styles.variable}>{skillCategories[activeCategory].name}</span>{' '}
                      <span className={styles.operator}>=</span> {'{'}
                      {'\n'}
                      {'  '}<span className={styles.property}>category</span>:{' '}
                      <span className={styles.string}>"{skillCategories[activeCategory].name}"</span>,
                      {'\n'}
                      {'  '}<span className={styles.property}>skills</span>: [{'\n'}
                      {skillCategories[activeCategory].skills.map((skill, i) => (
                        <motion.span 
                          key={skill.name}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                        >
                          {'    '}<span className={styles.string}>"{skill.name}"</span>
                          {i < skillCategories[activeCategory].skills.length - 1 ? ',' : ''}{'\n'}
                        </motion.span>
                      ))}
                      {'  '}]{'\n'}
                      {'}'};
                    </code>
                  </pre>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Status Bar */}
        <div className={styles.statusBar}>
          <div className={styles.statusLeft}>
            <span>🔀 main</span>
            <span>⟳ synced</span>
          </div>
          <div className={styles.statusRight}>
            <span>UTF-8</span>
            <span>TypeScript React</span>
            <span>Ln 1, Col 1</span>
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default SkillsSection;
