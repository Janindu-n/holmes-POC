'use client';

import React, { useEffect, useRef } from 'react';

interface HeroParallaxProps {
  children: React.ReactNode;
}

/**
 * HeroParallax component isolates high-frequency scroll updates.
 * It uses requestAnimationFrame and direct DOM manipulation to bypass React's render cycle,
 * ensuring 60fps performance while allowing the parent page to remain a Server Component.
 *
 * BOLT OPTIMIZATION:
 * - Reduces re-renders of the entire landing page from O(scroll) to 0.
 * - Uses passive scroll listener to avoid blocking the main thread.
 * - Uses will-change to create a dedicated compositor layer.
 */
export default function HeroParallax({ children }: HeroParallaxProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let rafId: number | null = null;
    let isUnmounted = false;

    const updateStyles = () => {
      // Don't proceed if component unmounted or ref is lost
      if (isUnmounted || !containerRef.current) return;

      const scrollY = window.scrollY;

      // BOLT OPTIMIZATION: Only calculate and apply styles if the element is in view (scrollY < 600)
      if (scrollY < 600) {
        const opacity = Math.max(1 - scrollY / 400, 0);
        const translateY = scrollY / 3;

        containerRef.current.style.opacity = opacity.toString();
        containerRef.current.style.transform = `translateY(${translateY}px)`;
      } else if (containerRef.current.style.opacity !== '0') {
        // Ensure final state is applied once when crossing the threshold
        containerRef.current.style.opacity = '0';
      }

      rafId = null;
    };

    const onScroll = () => {
      // Throttling with requestAnimationFrame
      if (rafId === null) {
        rafId = window.requestAnimationFrame(updateStyles);
      }
    };

    // Use passive: true to improve scroll performance by not blocking the browser's scroll thread
    window.addEventListener('scroll', onScroll, { passive: true });

    // Initial call to set correct state on mount
    updateStyles();

    return () => {
      isUnmounted = true;
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
      window.removeEventListener('scroll', onScroll);
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
