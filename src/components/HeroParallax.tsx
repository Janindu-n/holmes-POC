'use client';

import React, { useState, useEffect } from 'react';

/**
 * HeroParallax component isolates high-frequency scroll state updates.
 * By moving scroll-based parallax logic into this leaf Client Component,
 * we prevent the entire landing page from re-rendering on every scroll tick.
 *
 * Performance Optimizations:
 * 1. requestAnimationFrame for throttling state updates to the browser's refresh rate.
 * 2. { passive: true } option on the scroll listener to improve scrolling responsiveness.
 * 3. Isolation of state to minimize the component tree being re-rendered.
 */
export default function HeroParallax({ children }: { children: React.ReactNode }) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    // Use passive listener for better scroll performance
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Initial sync - wrap in rAF to avoid cascading renders lint error
    window.requestAnimationFrame(() => {
      setScrollY(window.scrollY);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const opacity = Math.max(1 - scrollY / 400, 0);
  const translateY = scrollY / 3;

  return (
    <div
      className="flex flex-col gap-6 text-left max-w-2xl transition-all duration-75"
      style={{
        opacity: opacity,
        transform: `translateY(${translateY}px)`
      }}
    >
      {children}
    </div>
  );
}
