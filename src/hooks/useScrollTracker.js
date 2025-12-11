import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * Custom hook to track scroll position and velocity
 * Used for the circular section tracker rotation
 */
export const useScrollTracker = () => {
  const [scrollData, setScrollData] = useState({
    position: 0,
    velocity: 0,
    direction: 'down',
    isScrolling: false
  });
  
  const lastScrollY = useRef(0);
  const lastTime = useRef(Date.now());
  const scrollTimeout = useRef(null);
  const velocityHistory = useRef([]);

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    const currentTime = Date.now();
    const timeDelta = currentTime - lastTime.current;
    
    // Calculate velocity (pixels per millisecond)
    const rawVelocity = (currentScrollY - lastScrollY.current) / Math.max(timeDelta, 1);
    
    // Smooth velocity using moving average
    velocityHistory.current.push(rawVelocity);
    if (velocityHistory.current.length > 5) {
      velocityHistory.current.shift();
    }
    const smoothVelocity = velocityHistory.current.reduce((a, b) => a + b, 0) / velocityHistory.current.length;
    
    const direction = currentScrollY > lastScrollY.current ? 'down' : 'up';
    
    setScrollData({
      position: currentScrollY,
      velocity: smoothVelocity,
      direction,
      isScrolling: true
    });
    
    lastScrollY.current = currentScrollY;
    lastTime.current = currentTime;
    
    // Clear existing timeout and set new one for scroll end detection
    if (scrollTimeout.current) {
      clearTimeout(scrollTimeout.current);
    }
    
    scrollTimeout.current = setTimeout(() => {
      setScrollData(prev => ({ ...prev, isScrolling: false, velocity: 0 }));
      velocityHistory.current = [];
    }, 800);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, [handleScroll]);

  return scrollData;
};
