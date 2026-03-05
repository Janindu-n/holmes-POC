'use client';

import React, { useEffect, useRef } from 'react';

interface HeroParallaxProps {
  children: React.ReactNode;
}

/**
 * HeroParallax component handles scroll-linked animations for the hero section.
 * By using direct DOM manipulation and requestAnimationFrame, we avoid
 * triggering React re-renders on every scroll event (60fps).
 *
 * @performance
 * - Bypasses React state reconciliation for scroll updates.
 * - Uses passive scroll listeners to avoid blocking the main thread.
 * - Employs will-change to promote the element to its own compositor layer.
 */
export default function HeroParallax({ children }: HeroParallaxProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateParallax = () => {
      const scrollY = window.scrollY;
      const opacity = Math.max(1 - scrollY / 400, 0);
      const translateY = scrollY / 3;

      container.style.opacity = opacity.toString();
      container.style.transform = `translateY(${translateY}px)`;

      rafId.current = null;
    };

    const onScroll = () => {
      if (rafId.current === null) {
        rafId.current = requestAnimationFrame(updateParallax);
      }
    };

    // Initial sync
    updateParallax();

    window.addEventListener('scroll', onScroll, { passive: true });

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
      className="will-change-[transform,opacity]"
    >
      {children}
    </div>
  );
}
