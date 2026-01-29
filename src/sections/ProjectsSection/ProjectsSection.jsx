import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import styles from './ProjectsSection.module.css';

const projects = [
  {
    id: 1,
    method: 'POST',
    endpoint: '/projects/ai-arena',
    name: 'AI Arena',
    description:
      'A prompt-based AI comparison platform that allows users to compare responses from multiple AI models side by side, with persistent storage of prompts and outputs.',
    status: 200,
    tech: [
      'React',
      'JavaScript',
      'Tailwind CSS',
      'Express',
      'Prisma',
      'Supabase',
      'PostgreSQL'
    ],
    response: {
      success: true,
      data: {
        models: 5,
        prompts_saved: true,
        parameters: "cost and time"
      }
    },
    links: {
      github: '',
      demo: 'https://ai-arena-beta.vercel.app/'
    }
  },
  {
    id: 2,
    method: 'GET',
    endpoint: '/projects/burnout-detection',
    name: 'Burnout Detection System',
    description:
      'A multi-model system which detects if the user is burntout or normal.',
    status: 102,
    tech: ['Python', 'ViT', 'OpenCV', 'Streamlit', 'Pandas', 'NumPy'],
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
    id: 3,
    method: 'POST',
    endpoint: '/projects/youtube-scraper',
    name: 'YouTube Scraper & Contact Extractor',
    description:
      'YouTube scraping pipeline with transcript-based relevance filtering and metadata extraction for AI-tool related videos.',
    status: 200,
    tech: [
      'Python',
      'YouTube Data API v3',
      'Pandas',
      'Selenium',
      'BeautifulSoup4',
      'RapidFuzz'
    ],
    response: {
      success: true,
      data: {
        accuracy: '98.5%',
        ai_tools: 7,
        total_records: '1500+'
      }
    },
    links: {
      github: 'https://github.com/Samarsingh05/Youtube-Scraper',
      demo: ''
    }
  },
  {
    id: 4,
    method: 'GET',
    endpoint: '/projects/doc-image',
    name: 'Google Doc Image Saver',
    description:
      'A Chrome extension that allows downloading images from Google Docs, which are otherwise restricted.',
    status: 200,
    tech: ['HTML', 'CSS', 'JavaScript'],
    response: {
      success: true,
      data: {
        result_time_seconds: '5',
        downloading_types: 'individual or zip'
      }
    },
    links: {
      github: 'https://github.com/Samarsingh05/doc-image-saver',
      demo: ''
    }
  },
  {
    id: 5,
    method: 'PUT',
    endpoint: '/projects/pdf-cleaner',
    name: 'PDF White Pages Cleaner',
    description:
      'A web application that removes blank pages from PDF files efficiently.',
    status: 200,
    tech: [
      'Python',
      'Flask',
      'PyMuPDF',
      'NumPy',
      'HTML',
      'CSS',
      'JavaScript',
      'Gunicorn',
      'Render'
    ],
    response: {
      success: true,
      data: {
        current_users: 10,
        latency: '< 50ms'
      }
    },
    links: {
      github: 'https://github.com/Samarsingh05/Pdf-Cleaner',
      demo: 'https://pdf-cleaner-xy52.onrender.com/'
    }
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
    visible: {
      opacity: 1,
      transition: { duration: 0.8, staggerChildren: 0.15 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
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
                  onClick={() =>
                    setExpandedProject(
                      expandedProject === project.id ? null : project.id
                    )
                  }
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
                      animate={{
                        rotate: expandedProject === project.id ? 180 : 0
                      }}
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
                          {project.tech.map((tech) => (
                            <span key={tech} className={styles.techBadge}>
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className={styles.responseTabs}>
                        <button
                          className={
                            activeTab === 'response'
                              ? styles.activeTab
                              : ''
                          }
                          onClick={() => setActiveTab('response')}
                        >
                          Response
                        </button>
                        <button
                          className={
                            activeTab === 'headers'
                              ? styles.activeTab
                              : ''
                          }
                          onClick={() => setActiveTab('headers')}
                        >
                          Headers
                        </button>
                      </div>

                      <div className={styles.responseBody}>
                        <div className={styles.responseHeader}>
                          <span
                            className={styles.statusBadge}
                            data-status={project.status}
                          >
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
