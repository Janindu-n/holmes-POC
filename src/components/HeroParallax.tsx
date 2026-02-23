'use client';

import React, { useEffect, useRef } from 'react';

interface HeroParallaxProps {
  children: React.ReactNode;
}

/**
 * HeroParallax component isolates high-frequency scroll updates to a leaf component.
 * It uses requestAnimationFrame and direct DOM manipulation to bypass React's
 * reconciliation loop, ensuring smooth 60fps performance.
 */
export default function HeroParallax({ children }: HeroParallaxProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const ticking = useRef(false);

  useEffect(() => {
    // Initial sync
    const syncParallax = () => {
      if (containerRef.current) {
        const scrollY = window.scrollY;
        const opacity = Math.max(1 - scrollY / 400, 0);
        const translateY = scrollY / 3;

        containerRef.current.style.opacity = opacity.toString();
        containerRef.current.style.transform = `translateY(${translateY}px)`;
      }
    };

    syncParallax();

    const updateParallax = () => {
      syncParallax();
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
