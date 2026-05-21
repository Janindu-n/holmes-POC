## 2026-05-11 - Eliminate scroll-triggered re-renders on Home page
**Learning:** Using `useState` to track scroll position for parallax effects causes full component re-renders on every scroll event (up to 40+ times in a single scroll sequence). This is highly inefficient in complex React components.
**Action:** Use `useRef` and `requestAnimationFrame` for direct DOM manipulation of animation properties. This reduces scroll-triggered re-renders to zero while maintaining smooth visual effects. Also, use `will-change` to promote animated elements to GPU layers.
