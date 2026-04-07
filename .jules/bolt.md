## 2025-05-15 - Optimizing Scroll-Linked Parallax in React
**Learning:** Updating React state on every scroll event (e.g., `window.scrollY`) triggers high-frequency re-renders (e.g., ~96 renders per 500px scroll) that can cause visible jank and high CPU usage.
**Action:** Isolate high-frequency animations from the React render cycle by using `useRef` for direct DOM manipulation within a `requestAnimationFrame` loop. Ensure to use `{ passive: true }` on the scroll listener, a 'ticking' flag to throttle rAF calls, and `will-change` CSS properties for GPU acceleration.
