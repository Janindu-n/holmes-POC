## 2025-05-22 - Landing Page Parallax Optimization
**Learning:** High-frequency scroll events updating React state in a large landing page component causes massive re-render overhead. Converting the page to a Server Component and isolating the high-frequency logic into a leaf Client Component using `requestAnimationFrame` and direct DOM manipulation significantly improves performance.
**Action:** Always isolate scroll-based animations into dedicated leaf components and use direct DOM manipulation (via `useRef`) to bypass React's reconciliation for high-frequency updates.
