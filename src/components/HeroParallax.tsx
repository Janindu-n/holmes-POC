'use client';

import React, { useState, useEffect, useRef } from 'react';

interface HeroParallaxProps {
  children: React.ReactNode;
}

/**
 * HeroParallax Component
 *
 * PERFORMANCE OPTIMIZATION (Bolt ⚡):
 * 1. Isolates scroll-based re-renders: Only this component and its children
 *    re-render on scroll, preventing the entire landing page from re-rendering.
 * 2. Passive listener: Uses { passive: true } to avoid blocking the main thread
 *    during scrolling.
 * 3. requestAnimationFrame: Debounces state updates to match the browser's
 *    refresh rate (usually 60fps), preventing unnecessary intermediate renders.
 */
export default function HeroParallax({ children }: HeroParallaxProps) {
  const [scrollY, setScrollY] = useState(0);
  const ticking = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    // Passive listener improves scrolling performance by letting the browser
    // know we won't call preventDefault()
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Initial sync - using requestAnimationFrame to avoid synchronous setState in effect
    window.requestAnimationFrame(() => {
      setScrollY(window.scrollY);
    });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const opacity = Math.max(1 - scrollY / 400, 0);
  const translateY = scrollY / 3;

  return (
    <div
      className="flex flex-col gap-6 text-left max-w-2xl"
      style={{
        opacity: opacity,
        transform: `translateY(${translateY}px)`
      }}
    >
      {children}
    </div>
  );
}
