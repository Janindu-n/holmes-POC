'use client';

import React, { useState, useEffect, useRef } from 'react';

interface HeroParallaxProps {
  children: React.ReactNode;
}

/**
 * HeroParallax component isolates scroll-based parallax logic to prevent
 * top-level re-renders of the entire page. It uses requestAnimationFrame
 * and passive event listeners for optimal performance.
 */
export default function HeroParallax({ children }: HeroParallaxProps) {
  const [scrollY, setScrollY] = useState(0);
  const ticking = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    // Use passive listener for better scroll performance
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Initial sync
    handleScroll();

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
