## 2026-05-11 - [Optimize Hero Section Scroll Performance]
**Learning:** State-driven scroll tracking in React causes the entire component tree to re-render on every scroll event (up to 60+ times per second). For simple visual adjustments like opacity or transform, direct DOM manipulation via `requestAnimationFrame` is significantly more efficient.
**Action:** Use `useRef` to target elements and update their styles directly within a `requestAnimationFrame` callback triggered by a passive scroll listener.
