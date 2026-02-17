'use client';

import React, { useEffect, useRef } from 'react';

/**
 * HeroParallax component isolates high-frequency scroll updates to a leaf component.
 * It uses requestAnimationFrame and direct DOM manipulation via refs to avoid
 * React re-renders of the entire page or component subtree on every scroll event.
 *
 * Optimization Details:
 * 1. Throttling: Uses requestAnimationFrame and a 'ticking' flag to ensure
 *    updates only happen once per repaint cycle.
 * 2. Passive Listener: Uses { passive: true } for the scroll event to improve
 *    scrolling performance by telling the browser it won't call preventDefault().
 * 3. Rendering: Bypasses React's state/re-render cycle for high-frequency updates,
 *    directly updating DOM properties.
 * 4. Hardware Acceleration: Uses 'will-change' to hint the browser to promote
 *    the element to its own compositor layer.
 */
export default function HeroParallax({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rafId = useRef<number | null>(null);
  const ticking = useRef(false);

  useEffect(() => {
    const updateParallax = () => {
      if (containerRef.current) {
        const scrollY = window.scrollY;
        // Parallax calculations matching the original design
        const opacity = Math.max(1 - scrollY / 400, 0);
        const translateY = scrollY / 3;

        containerRef.current.style.opacity = opacity.toString();
        containerRef.current.style.transform = `translateY(${translateY}px)`;
      }
      ticking.current = false;
    };

    const handleScroll = () => {
      if (!ticking.current) {
        rafId.current = window.requestAnimationFrame(updateParallax);
        ticking.current = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Initial sync
    updateParallax();

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
      className="flex flex-col gap-6 text-left max-w-2xl will-change-[opacity,transform]"
    >
      {children}
    </div>
  );
}
