import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import ThemeToggle from './components/ThemeToggle/ThemeToggle';
import CircularTracker from './components/CircularTracker/CircularTracker';
import BackgroundTransition from './components/BackgroundTransition/BackgroundTransition';
import AboutSection from './sections/AboutSection/AboutSection';
import SkillsSection from './sections/SkillsSection/SkillsSection';
import ProjectsSection from './sections/ProjectsSection/ProjectsSection';
import ExperienceSection from './sections/ExperienceSection/ExperienceSection';
import EducationSection from './sections/EducationSection/EducationSection';
import CertificatesSection from './sections/CertificatesSection/CertificatesSection';
import ContactSection from './sections/ContactSection/ContactSection';
import './index.css';

/**
 * Main App Component
 * Renders all portfolio sections with animated backgrounds,
 * theme toggle, and circular section tracker
 */
const App = () => {
  return (
    <ThemeProvider>
      {/* Animated background that transitions between sections */}
      <BackgroundTransition />
      
      {/* Theme toggle button (light/dark mode) */}
      <ThemeToggle />
      
      {/* Circular section tracker - appears on scroll */}
      <CircularTracker />
      
      {/* Main content sections */}
      <main>
        {/* Section 1: About Me - Terminal + Photo Split */}
        <AboutSection />
        
        {/* Section 2: Skills - VS Code Editor UI */}
        <SkillsSection />
        
        {/* Section 3: Projects - API Documentation UI */}
        <ProjectsSection />
        
        {/* Section 4: Experience - GitHub Commits UI */}
        <ExperienceSection />
        
        {/* Section 5: Education - Timeline UI */}
        <EducationSection />
        
        {/* Section 6: Certificates - File Explorer UI */}
        <CertificatesSection />
        
        {/* Section 7: Contact - Email Composer UI */}
        <ContactSection />
      </main>
    </ThemeProvider>
  );
};

export default App;
