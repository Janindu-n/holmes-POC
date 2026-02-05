'use client';

import React, { useState, useEffect } from 'react';

interface HeroParallaxProps {
  children: React.ReactNode;
}

/**
 * HeroParallax component isolates the high-frequency scroll state updates
 * to prevent unnecessary re-renders of the entire landing page.
 * Uses a passive scroll listener for better scrolling performance.
 */
export default function HeroParallax({ children }: HeroParallaxProps) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    // Performance optimization: Using { passive: true } for scroll event listener
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate parallax values
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
