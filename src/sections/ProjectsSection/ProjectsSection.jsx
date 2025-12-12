import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import styles from './ProjectsSection.module.css';

const projects = [
  {
    id: 1,
    method: 'GET',
    endpoint: '/projects/Burnout-Detection (Currently working on this)',
    name: 'Burnout Detection System',
    description: 'A multi-model system which detects if the user is burntout or normal.',
    status: 102,
    tech: ['Python', 'ViT', 'OpenCV', 'Streamlit', 'Pandas', 'Numpy'],
    response: {
      success: true,
      data: {
        accuracy: '92%',
        dataset_used: 'SEWA'
      }
    },
    links: { github: '', demo: '' }
  },
  {
    id: 2,
    method: 'POST',
    endpoint: '/projects/youtube-scrapper',
    name: 'YouTube Scraper & Contact Extractor',
    description: 'YouTube scraping pipeline with transcript-based relevance filtering and metadata extraction specifically for videos made on use of AI tools like loom , lovable etc.',
    status: 200,
    tech: ['Python', 'YouTube Data API v3,', 'Pandas', 'Selenium', 'BeautifulSoup4', 'RapidFuzz'],
    response: {
      success: true,
      data: {
        accuracy: '98.5%',
        ai_tools: 7,
        total_records: '1500+'
      }
    },
    links: { github: 'https://github.com/Samarsingh05/Youtube-Scraper', demo: '' }
  },
  {
    id: 3,
    method: 'GET',
    endpoint: '/projects/doc-image',
    name: 'Google Doc Image Saver',
    description: 'This google chrome extension lets you download any image on google doc , which it does allow normally.',
    status: 200,
    tech: ['HTML', 'CSS', 'JS'],
    response: {
      success: true,
      data: {
        result_time_seconds: '5',
        downloading_types: 'individual or zip file'
      }
    },
    links: { github: 'https://github.com/Samarsingh05/doc-image-saver', demo: '' }
  },
  {
    id: 4,
    method: 'PUT',
    endpoint: '/projects/pdf-cleaner',
    name: 'Pdf White Pages Cleaner',
    description: 'A web app which removes blank PDF pages',
    status: 200,
    tech: ['Python', 'Flask', 'PyMuPDF', 'NumPy', 'HTML/CSS/JS,', 'Gunicorn', 'Render'],
    response: {
      success: true,
      data: {
        current_users: 10,
        latency: '< 50ms',
      }
    },
    links: { github: 'https://github.com/Samarsingh05/Pdf-Cleaner', demo: 'https://pdf-cleaner-xy52.onrender.com/' }
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

  const handleGlowMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 16;
    e.currentTarget.style.setProperty('--gx', `${x}px`);
    e.currentTarget.style.setProperty('--gy', `${y}px`);
  };

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
          <motion.h2
            variants={cardVariants}
            className="glow-title"
            onMouseMove={handleGlowMove}
            onMouseLeave={(e) => {
              e.currentTarget.style.setProperty('--gx', '0px');
              e.currentTarget.style.setProperty('--gy', '0px');
            }}
          >
            Projects 
          </motion.h2>
          <motion.p variants={cardVariants}>
            Explore my projects
          </motion.p>
        </div>

        <motion.div className={styles.apiContainer} variants={cardVariants}>
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

          <div className={styles.baseUrl}>
            <span className={styles.label}>Base URL:</span>
            <code>https://samar.dev/api/v1</code>
          </div>

          <div className={styles.endpointsList}>
            {projects.map((project) => (
              <motion.div
                key={project.id}
                className={styles.endpointCard}
                variants={cardVariants}
                layout
              >
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

                      <div className={styles.actionButtons}>
                        {project.links.github && (
                          <motion.a 
                            href={project.links.github}
                            className={styles.githubBtn}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <svg viewBox="0 0 24 24" fill="currentColor">
                              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12"/>
                            </svg>
                            View Source
                          </motion.a>
                        )}

                        {project.links.demo && (
                          <motion.a 
                            href={project.links.demo}
                            className={styles.demoBtn}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            🚀 Live Demo
                          </motion.a>
                        )}
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
