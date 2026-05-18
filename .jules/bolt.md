## 2026-05-18 - [Optimized scroll performance in Home page]
**Learning:** High-frequency scroll events in React can trigger excessive re-renders if style changes are driven by state. Direct DOM manipulation within a `requestAnimationFrame` loop is significantly more efficient for scroll-linked animations.
**Action:** Use `useRef` and `requestAnimationFrame` for any scroll-linked style changes (opacity, transform, etc.) to eliminate unnecessary re-renders. Always include `{ passive: true }` in the scroll event listener and remember to clean up the animation frame on unmount.
