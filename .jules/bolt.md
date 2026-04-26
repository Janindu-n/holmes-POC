## 2025-05-15 - Scroll-Linked Animation Optimization
**Learning:** High-frequency state updates (e.g., `window.scrollY`) in React components trigger excessive re-renders (20+ per scroll sequence), causing performance degradation and potential frame drops.
**Action:** Use `useRef` and direct DOM manipulation within a `requestAnimationFrame` loop to implement smooth scroll-linked animations. This bypasses the React render cycle and ensures 60fps performance without unnecessary reconciliation. Remember to remove CSS transitions from the target element to avoid frame-rate competition.
