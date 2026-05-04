## 2026-05-04 - Scroll-Linked Parallax Optimization
**Learning:** React state-driven scroll animations trigger a full component re-render on every scroll event (every ~16ms), which is expensive for complex pages like the Home page.
**Action:** Use `useRef` and direct DOM manipulation with `requestAnimationFrame` within a scroll listener to bypass React's render cycle for performance-critical animations.
