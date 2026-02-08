'use client';

import React, { useState, useEffect } from 'react';

/**
 * HeroParallax Component
 *
 * Bolt Optimization:
 * 1. Isolates high-frequency scroll state updates to this leaf component,
 *    preventing re-renders of the entire landing page.
 * 2. Uses a passive scroll listener to improve browser scrolling responsiveness.
 * 3. Uses requestAnimationFrame to synchronize state updates with the browser's
 *    repaint cycle, avoiding layout thrashing and cascading renders.
 */
export default function HeroParallax({ children }: { children: React.ReactNode }) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let ticking = false;

    // Synchronization function
    const syncScroll = () => {
      setScrollY(window.scrollY);
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(syncScroll);
        ticking = true;
      }
    };

    // Initial synchronization
    handleScroll();

    // Passive: true ensures the browser doesn't wait for the listener to finish before scrolling
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const opacity = Math.max(1 - scrollY / 400, 0);
  const translateY = scrollY / 3;

  return (
    <div
      className="flex flex-col gap-6 text-left max-w-2xl transition-all duration-75"
      style={{
        opacity: opacity,
        transform: `translateY(${translateY}px)`
      }}
    >
      {children}
    </div>
  );
}
