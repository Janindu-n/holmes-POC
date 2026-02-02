'use client';

import React, { useState, useEffect } from 'react';

/**
 * HeroParallax Component
 *
 * Performance Optimization:
 * 1. Isolates scroll-based re-renders to this specific component, preventing the entire landing page from re-rendering.
 * 2. Uses { passive: true } for the scroll event listener to improve scrolling responsiveness.
 * 3. Reduces main thread blocking by only updating a small part of the DOM tree.
 */
export default function HeroParallax({ children }: { children: React.ReactNode }) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    // Using passive: true to improve scroll performance
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Parallax calculations
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
