'use client';

import React, { useState, useEffect } from 'react';

interface HeroParallaxProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * HeroParallax component isolates the scroll-based parallax logic.
 *
 * By passing static content as children, we keep the children as
 * Server Components while only this wrapper re-renders on scroll.
 */
export default function HeroParallax({ children, className }: HeroParallaxProps) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const opacity = Math.max(1 - scrollY / 400, 0);
  const translateY = scrollY / 3;

  return (
    <div
      className={className}
      style={{
        opacity,
        transform: `translateY(${translateY}px)`
      }}
    >
      {children}
    </div>
  );
}
