'use client';

import React, { useEffect, useRef } from 'react';

interface HeroParallaxProps {
  children: React.ReactNode;
}

/**
 * HeroParallax component that applies a scroll-based parallax effect to its children.
 * Uses requestAnimationFrame and direct DOM manipulation for maximum performance,
 * bypassing React's state reconciliation for high-frequency updates.
 */
export default function HeroParallax({ children }: HeroParallaxProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const ticking = useRef(false);

  useEffect(() => {
    // Optimization: Use a local variable to track unmount state
    let isUnmounted = false;

    const updateParallax = () => {
      if (isUnmounted || !containerRef.current) return;

      const scrollY = window.scrollY;
      // Parallax calculations matching the original design
      const opacity = Math.max(1 - scrollY / 400, 0);
      const translateY = scrollY / 3;

      // Direct DOM manipulation for 60fps performance
      containerRef.current.style.opacity = opacity.toString();
      containerRef.current.style.transform = `translateY(${translateY}px)`;

      ticking.current = false;
    };

    const onScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(updateParallax);
        ticking.current = true;
      }
    };

    // Use passive listener for better scroll performance
    window.addEventListener('scroll', onScroll, { passive: true });

    // Initial set
    updateParallax();

    return () => {
      isUnmounted = true;
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="will-change-[transform,opacity]"
    >
      {children}
    </div>
  );
}
