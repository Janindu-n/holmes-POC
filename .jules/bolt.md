## 2026-02-17 - [Optimized Landing Page Parallax]
**Learning:** High-frequency scroll events in a top-level component cause full-page re-renders in React, leading to main-thread blocking and visual jitter. Isolation into leaf components and direct DOM manipulation via RAF is essential for 60fps performance.
**Action:** Always isolate scroll-dependent logic into dedicated leaf Client Components and use requestAnimationFrame with direct DOM updates to bypass React's virtual DOM reconciliation for high-frequency updates.
