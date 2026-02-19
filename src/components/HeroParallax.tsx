'use client';

import React, { useEffect, useRef } from 'react';

/**
 * HeroParallax component that applies a parallax effect based on scroll position.
 * Uses direct DOM manipulation via requestAnimationFrame to bypass React re-renders
 * for high-frequency scroll updates, improving performance significantly.
 */
export default function HeroParallax({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const ticking = useRef(false);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const updateParallax = () => {
      if (!containerRef.current) return;
      const scrollY = window.scrollY;

      // Calculate values (matching original src/app/page.tsx logic)
      const opacity = Math.max(1 - scrollY / 400, 0);
      const translateY = scrollY / 3;

      // Direct DOM manipulation to avoid React re-renders
      containerRef.current.style.opacity = opacity.toString();
      containerRef.current.style.transform = `translateY(${translateY}px)`;

      ticking.current = false;
    };

    const onScroll = () => {
      if (!ticking.current) {
        rafId.current = requestAnimationFrame(updateParallax);
        ticking.current = true;
      }
    };

    // Use passive listener for better scroll performance
    window.addEventListener('scroll', onScroll, { passive: true });

    // Initial update to ensure correct state on load
    updateParallax();

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex flex-col gap-6 text-left max-w-2xl [will-change:transform,opacity]"
    >
      {children}
    </div>
  );
}
