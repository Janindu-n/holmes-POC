## 2026-05-11 - [Scroll Animation Optimization]
**Learning:** Using React state to drive scroll-linked animations (e.g., parallax, opacity) causes the entire component tree to reconcile on every scroll tick, which is expensive for large components. Direct DOM manipulation via `useRef` bypasses the React render cycle entirely.
**Action:** Use a throttled `requestAnimationFrame` inside a scroll listener to update styles directly via `ref.current.style` for high-frequency visual updates. Ensure the animation frame is only scheduled when necessary to avoid idle CPU overhead.
