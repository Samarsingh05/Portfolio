import React, { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Custom hook for scroll-triggered animations using IntersectionObserver
 * Triggers entry/exit animations when sections enter or leave viewport
 */
export const useIntersectionObserver = (options = {}) => {
  const [isInView, setIsInView] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef(null);

  const defaultOptions = {
    threshold: 0.3,
    rootMargin: '0px',
    triggerOnce: false,
    ...options
  };

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const inView = entry.isIntersecting;
        setIsInView(inView);
        
        if (inView && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      {
        threshold: defaultOptions.threshold,
        rootMargin: defaultOptions.rootMargin
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [defaultOptions.threshold, defaultOptions.rootMargin, hasAnimated]);

  return { ref, isInView, hasAnimated };
};

/**
 * Hook to track which section is currently active
 */
export const useSectionTracker = (sectionIds) => {
  const [activeSection, setActiveSection] = useState(0);
  const [sectionProgress, setSectionProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      
      // Calculate overall progress
      setSectionProgress((window.scrollY / totalHeight) * 100);

      // Find active section
      sectionIds.forEach((id, index) => {
        const element = document.getElementById(id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(index);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionIds]);

  return { activeSection, sectionProgress };
};
