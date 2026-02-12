'use client';

import React, { useState, useEffect } from 'react';

interface HeroParallaxProps {
  children: React.ReactNode;
}

/**
 * HeroParallax component isolates the high-frequency scroll listener
 * to prevent unnecessary re-renders of the entire page.
 */
export default function HeroParallax({ children }: HeroParallaxProps) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    // Initial sync - using requestAnimationFrame to avoid cascading renders
    window.requestAnimationFrame(() => {
      setScrollY(window.scrollY);
    });

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    // Use passive listener for better scroll performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
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
