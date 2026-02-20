'use client';

import React, { useRef, useEffect } from 'react';

/**
 * HeroParallax component isolates high-frequency scroll-based updates
 * to a dedicated leaf component. It bypasses React's state reconciliation
 * by using requestAnimationFrame and direct DOM manipulation for maximum performance.
 * This allows the parent landing page to remain a Server Component.
 */
interface HeroParallaxProps {
  children: React.ReactNode;
}

export default function HeroParallax({ children }: HeroParallaxProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const ticking = useRef(false);
  const rafId = useRef<number | undefined>(undefined);

  useEffect(() => {
    const updateParallax = () => {
      if (!containerRef.current) return;

      const scrollY = window.scrollY;
      // Derived from the original landing page logic:
      // opacity = Math.max(1 - scrollY / 400, 0)
      // translateY = scrollY / 3
      const opacity = Math.max(1 - scrollY / 400, 0);
      const translateY = scrollY / 3;

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

    // Use passive listener to avoid blocking the main thread
    window.addEventListener('scroll', onScroll, { passive: true });

    // Initial sync
    updateParallax();

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafId.current !== undefined) {
        cancelAnimationFrame(rafId.current);
      }
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
