## 2025-02-12 - Scroll-linked animations re-render bottleneck
**Learning:** Tracking `scrollY` in React state for animations causes the entire component (and its children) to re-render on every scroll event, which is extremely inefficient for high-frequency events.
**Action:** Use `useRef` to target elements and update their styles directly via `requestAnimationFrame` inside a scroll listener to completely bypass the React render cycle.
