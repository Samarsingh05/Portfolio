import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import styles from './ProjectsSection.module.css';

/**
 * Project_Dabba() Section - API Documentation UI
 * Projects displayed as API endpoints in a Postman-like interface
 * Each project expands to show request/response preview
 */

const projects = [
  {
    id: 1,
    method: 'GET',
    endpoint: '/projects/plant-disease-detector',
    name: 'Plant Disease Detector',
    description: 'ML-powered app that identifies plant diseases from leaf images with 94% accuracy',
    status: 200,
    tech: ['Python', 'TensorFlow', 'OpenCV', 'Flask'],
    response: {
      success: true,
      data: {
        accuracy: '94.2%',
        diseases_detected: 38,
        users: '2.5k+',
        github_stars: 180
      }
    },
    links: { github: '#', demo: '#' }
  },
  {
    id: 2,
    method: 'POST',
    endpoint: '/projects/smart-attendance',
    name: 'Smart Attendance System',
    description: 'Face recognition-based attendance with real-time notifications',
    status: 201,
    tech: ['Python', 'OpenCV', 'dlib', 'React', 'Node.js'],
    response: {
      success: true,
      data: {
        recognition_speed: '< 1s',
        accuracy: '98.5%',
        active_institutions: 5,
        daily_records: '500+'
      }
    },
    links: { github: '#', demo: '#' }
  },
  {
    id: 3,
    method: 'GET',
    endpoint: '/projects/portfolio-v2',
    name: 'Portfolio Website v2',
    description: 'This website! Built with React, Framer Motion, and lots of CSS magic',
    status: 200,
    tech: ['React', 'Framer Motion', 'CSS Modules', 'Vite'],
    response: {
      success: true,
      data: {
        sections: 7,
        animations: '50+',
        lighthouse_score: 98,
        load_time: '1.2s'
      }
    },
    links: { github: '#', demo: '#' }
  },
  {
    id: 4,
    method: 'PUT',
    endpoint: '/projects/code-collab',
    name: 'Real-time Code Collaboration',
    description: 'Google Docs for code - real-time collaborative coding with syntax highlighting',
    status: 200,
    tech: ['React', 'Node.js', 'Socket.io', 'Monaco Editor'],
    response: {
      success: true,
      data: {
        concurrent_users: 10,
        languages_supported: 20,
        latency: '< 50ms',
        sessions_hosted: '1k+'
      }
    },
    links: { github: '#', demo: '#' }
  }
];

const methodColors = {
  GET: '#61affe',
  POST: '#49cc90',
  PUT: '#fca130',
  DELETE: '#f93e3e'
};

const ProjectsSection = () => {
  const { ref, isInView } = useIntersectionObserver({ threshold: 0.2 });
  const [expandedProject, setExpandedProject] = useState(null);
  const [activeTab, setActiveTab] = useState('response');

  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8, staggerChildren: 0.15 } }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <motion.section
      ref={ref}
      id="projects"
      className={`section ${styles.projectsSection}`}
      variants={sectionVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <motion.span className={styles.functionName} variants={cardVariants}>
            Project_Dabba()
          </motion.span>
          <motion.h2 variants={cardVariants}>API Documentation</motion.h2>
          <motion.p variants={cardVariants}>
            Explore my projects through API endpoints
          </motion.p>
        </div>

        <motion.div className={styles.apiContainer} variants={cardVariants}>
          {/* API Header */}
          <div className={styles.apiHeader}>
            <div className={styles.apiTitle}>
              <span className={styles.apiLogo}>📦</span>
              <span>Projects API</span>
            </div>
            <div className={styles.apiTabs}>
              <span className={styles.activeApiTab}>Endpoints</span>
              <span>Models</span>
              <span>Auth</span>
            </div>
          </div>

          {/* Base URL */}
          <div className={styles.baseUrl}>
            <span className={styles.label}>Base URL:</span>
            <code>https://arjun.dev/api/v1</code>
          </div>

          {/* Endpoints List */}
          <div className={styles.endpointsList}>
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                className={styles.endpointCard}
                variants={cardVariants}
                layout
              >
                {/* Endpoint Header */}
                <div 
                  className={styles.endpointHeader}
                  onClick={() => setExpandedProject(expandedProject === project.id ? null : project.id)}
                >
                  <div className={styles.endpointInfo}>
                    <span 
                      className={styles.method}
                      style={{ background: methodColors[project.method] }}
                    >
                      {project.method}
                    </span>
                    <code className={styles.endpoint}>{project.endpoint}</code>
                  </div>
                  <div className={styles.endpointMeta}>
                    <span className={styles.projectName}>{project.name}</span>
                    <motion.span 
                      className={styles.expandIcon}
                      animate={{ rotate: expandedProject === project.id ? 180 : 0 }}
                    >
                      ▼
                    </motion.span>
                  </div>
                </div>

                {/* Expanded Content */}
                <AnimatePresence>
                  {expandedProject === project.id && (
                    <motion.div
                      className={styles.endpointBody}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className={styles.description}>
                        <p>{project.description}</p>
                        <div className={styles.techStack}>
                          {project.tech.map(tech => (
                            <span key={tech} className={styles.techBadge}>{tech}</span>
                          ))}
                        </div>
                      </div>

                      {/* Response Preview Tabs */}
                      <div className={styles.responseTabs}>
                        <button 
                          className={activeTab === 'response' ? styles.activeTab : ''}
                          onClick={() => setActiveTab('response')}
                        >
                          Response
                        </button>
                        <button 
                          className={activeTab === 'headers' ? styles.activeTab : ''}
                          onClick={() => setActiveTab('headers')}
                        >
                          Headers
                        </button>
                      </div>

                      {/* Response Body */}
                      <div className={styles.responseBody}>
                        <div className={styles.responseHeader}>
                          <span className={styles.statusBadge} data-status={project.status}>
                            {project.status} OK
                          </span>
                          <span className={styles.responseTime}>142ms</span>
                        </div>
                        <pre className={styles.jsonResponse}>
                          <code>
                            {JSON.stringify(project.response, null, 2)}
                          </code>
                        </pre>
                      </div>

                      {/* Action Buttons */}
                      <div className={styles.actionButtons}>
                        <motion.a 
                          href={project.links.github}
                          className={styles.githubBtn}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12"/>
                          </svg>
                          View Source
                        </motion.a>
                        <motion.a 
                          href={project.links.demo}
                          className={styles.demoBtn}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          🚀 Live Demo
                        </motion.a>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default ProjectsSection;
