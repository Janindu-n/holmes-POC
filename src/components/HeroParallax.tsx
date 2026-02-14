'use client';

import React, { useState, useEffect, useRef } from 'react';

interface HeroParallaxProps {
  children: React.ReactNode;
}

/**
 * HeroParallax component isolates high-frequency scroll updates to a leaf component.
 * This prevents the entire landing page from re-rendering on every scroll.
 * Uses requestAnimationFrame and passive event listeners for optimal performance.
 */
export default function HeroParallax({ children }: HeroParallaxProps) {
  const [scrollY, setScrollY] = useState(0);
  const ticking = useRef(false);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        rafId.current = window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    // Optimization: passive: true improves scroll performance by telling the browser
    // that this listener won't call preventDefault().
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Optimization: wrap in requestAnimationFrame to avoid cascading renders lint error
    // and ensure synchronization with the browser's paint cycle.
    rafId.current = window.requestAnimationFrame(() => {
      setScrollY(window.scrollY);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId.current !== null) {
        window.cancelAnimationFrame(rafId.current);
      }
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
