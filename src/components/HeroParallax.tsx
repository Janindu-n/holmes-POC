'use client';

import React, { useEffect, useRef } from 'react';

interface HeroParallaxProps {
  children: React.ReactNode;
}

/**
 * ⚡ Bolt Optimization: HeroParallax
 *
 * This component provides a smooth 60fps parallax effect for the hero section.
 * By using useRef and requestAnimationFrame, we bypass React's state reconciliation
 * for high-frequency scroll events, significantly reducing main-thread work.
 *
 * Performance gains:
 * - 0 React re-renders during scroll.
 * - Reduced CPU usage.
 * - Jitter-free movement by syncing with the browser's refresh rate.
 */
export default function HeroParallax({ children }: HeroParallaxProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const ticking = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Signal to the browser that these properties will change frequently for compositor optimization
    container.style.willChange = 'transform, opacity';

    const updateParallax = () => {
      const scrollY = window.scrollY;
      const opacity = Math.max(1 - scrollY / 400, 0);
      const translateY = scrollY / 3;

      container.style.opacity = opacity.toString();
      container.style.transform = `translateY(${translateY}px)`;

      ticking.current = false;
    };

    const onScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(updateParallax);
        ticking.current = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    // Initial call to sync state immediately on mount
    updateParallax();

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <div ref={containerRef} className="flex flex-col gap-6 text-left max-w-2xl">
      {children}
    </div>
  );
}
