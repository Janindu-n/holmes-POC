## 2025-05-14 - Optimizing Scroll-Linked Animations

**Learning:** Component state updates linked directly to scroll events cause massive re-renders (one per scroll event), leading to performance degradation and jank in parallax effects.

**Action:** Use `useRef` to target elements and update their styles directly within a `requestAnimationFrame` callback. This bypasses the React render cycle for high-frequency updates and ensures updates are synchronized with the browser's refresh rate. Additionally, use `{ passive: true }` for scroll listeners to improve scroll performance.
