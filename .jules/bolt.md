## 2025-05-14 - Optimizing scroll-linked animations
**Learning:** High-frequency scroll events combined with React state (`useState`) cause excessive re-renders of the entire component tree, leading to main-thread jank. Direct DOM manipulation via `useRef` and `requestAnimationFrame` with a ticking flag is significantly more efficient for parallax effects.
**Action:** Use `useRef` and `requestAnimationFrame` for any scroll-linked visual updates, and ensure `transition` properties are removed from target elements to avoid frame-rate competition with the JS-driven animation.
