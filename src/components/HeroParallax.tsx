'use client';

import React, { useEffect, useRef } from 'react';

interface HeroParallaxProps {
  children: React.ReactNode;
}

/**
 * HeroParallax component isolates the high-frequency scroll parallax effect.
 * By using useRef and direct DOM manipulation with requestAnimationFrame,
 * we avoid re-rendering the entire landing page on every scroll event.
 */
export default function HeroParallax({ children }: HeroParallaxProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const ticking = useRef(false);

  useEffect(() => {
    const updateParallax = () => {
      if (!containerRef.current) return;

      const scrollY = window.scrollY;
      // Calculate opacity and translateY based on scroll position
      // Matching original logic: const opacity = Math.max(1 - scrollY / 400, 0);
      // const translateY = scrollY / 3;
      const opacity = Math.max(1 - scrollY / 400, 0);
      const translateY = scrollY / 3;

      containerRef.current.style.opacity = opacity.toString();
      containerRef.current.style.transform = `translateY(${translateY}px)`;
    };

    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          updateParallax();
          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    // Use passive scroll listener for better scroll performance
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Initial call to set correct initial state
    updateParallax();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex flex-col gap-6 text-left max-w-2xl"
      style={{ willChange: 'transform, opacity' }}
    >
      {children}
    </div>
  );
}
