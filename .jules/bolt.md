## 2026-04-29 - Scroll performance optimization on Home page
**Learning:** Using `useState` to track `window.scrollY` in a top-level component causes the entire component tree to re-render on every scroll event, leading to significant performance degradation (10+ re-renders per small scroll).
**Action:** Use `useRef` for elements that need scroll-linked animations and update their styles directly in a `requestAnimationFrame` callback. Always use `{ passive: true }` for scroll listeners and `will-change` on animated elements to leverage GPU acceleration.
