## 2025-05-11 - Optimized Scroll Animations
**Learning:** High-frequency scroll events using React `useState` trigger excessive re-renders (40+ per scroll action). Using `useRef` with `requestAnimationFrame` and direct DOM manipulation reduces re-renders to near zero while maintaining visual parity.
**Action:** Always prefer `useRef` and `requestAnimationFrame` for scroll-linked animations or high-frequency event handlers in React components.
