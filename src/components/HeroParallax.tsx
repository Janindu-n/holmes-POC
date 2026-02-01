'use client';

import React, { useState, useEffect, ReactNode } from 'react';

interface HeroParallaxProps {
  children: ReactNode;
}

/**
 * HeroParallax component isolates the high-frequency scroll state updates
 * to a small leaf component. This prevents the entire landing page from
 * re-rendering on every scroll event.
 */
export default function HeroParallax({ children }: HeroParallaxProps) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    // Check if window is defined (for SSR safety, though 'use client' handles most cases)
    if (typeof window === 'undefined') return;

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    // Use passive scroll listener to improve browser scrolling responsiveness
    // and reduce main thread blocking.
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Initial call to set scroll position if page is already scrolled
    handleScroll();

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
