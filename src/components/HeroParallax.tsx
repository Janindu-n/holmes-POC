'use client';

import React, { useEffect, useRef } from 'react';

interface HeroParallaxProps {
  children: React.ReactNode;
}

/**
 * HeroParallax optimizes high-frequency scroll updates by:
 * 1. Bypassing React state reconciliation for 60fps animations.
 * 2. Using requestAnimationFrame for smooth updates.
 * 3. Using passive event listeners for better scroll performance.
 * 4. Using will-change to promote the element to its own compositor layer.
 */
export default function HeroParallax({ children }: HeroParallaxProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rafId = useRef<number | null>(null);
  const ticking = useRef(false);

  useEffect(() => {
    const updateStyles = () => {
      if (containerRef.current) {
        const scrollY = window.scrollY;
        // Parallax logic: fade out and slide up as user scrolls
        const opacity = Math.max(1 - scrollY / 400, 0);
        const translateY = scrollY / 3;

        containerRef.current.style.opacity = opacity.toString();
        containerRef.current.style.transform = `translateY(${translateY}px)`;
      }
      ticking.current = false;
    };

    const handleScroll = () => {
      if (!ticking.current) {
        rafId.current = window.requestAnimationFrame(updateStyles);
        ticking.current = true;
      }
    };

    // Use passive listener for better scroll performance
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Sync initial state with scroll position
    updateStyles();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId.current) {
        window.cancelAnimationFrame(rafId.current);
      }
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
