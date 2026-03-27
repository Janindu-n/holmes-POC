
## 2026-03-27 - Optimize parallax scroll performance in landing page
**Learning:** Using React state to track scroll position for parallax effects causes high-frequency re-renders (one per scroll event), which degrades performance. By moving the animation logic to a `requestAnimationFrame` loop and updating the DOM directly via `useRef`, re-renders are eliminated during scrolling.
**Action:** Use `useRef` and `requestAnimationFrame` for high-frequency scroll-linked animations instead of React state. Remove `transition-all` and add `will-change` to elements being animated by JavaScript to avoid interpolation delays.
