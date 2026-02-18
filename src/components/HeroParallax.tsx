'use client';

import React, { useEffect, useRef } from 'react';

interface HeroParallaxProps {
  children: React.ReactNode;
}

/**
 * HeroParallax Component
 *
 * Performance Optimization (Bolt ⚡):
 * 1. Uses direct DOM manipulation via refs to update style, bypassing React's re-render cycle.
 * 2. Throttles scroll updates using requestAnimationFrame to ensure smooth 60fps+ performance.
 * 3. Uses a passive scroll listener to avoid blocking the main thread during scrolling.
 * 4. Applies 'will-change' to transform and opacity to promote the element to a compositor layer.
 */
export default function HeroParallax({ children }: HeroParallaxProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let ticking = false;

    const updateParallax = () => {
      const scrollY = window.scrollY;
      // Parallax calculations matching the original design
      const opacity = Math.max(1 - scrollY / 400, 0);
      const translateY = scrollY / 3;

      // Directly update DOM styles for maximum performance
      container.style.opacity = opacity.toString();
      container.style.transform = `translateY(${translateY}px)`;

      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
      }
    };

    // Initial positioning
    updateParallax();

    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex flex-col gap-6 text-left max-w-2xl will-change-[transform,opacity]"
    >
      {children}
    </div>
  );
}
