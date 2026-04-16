## 2026-04-16 - [Scroll-linked animations]
**Learning:** Using React state for scroll-linked animations (parallax) causes the entire component to re-render on every scroll event, leading to significant performance bottlenecks (~20 re-renders per 1000px scroll).
**Action:** Use `useRef` and direct DOM manipulation with `requestAnimationFrame` for high-frequency updates like scrolling or mouse movement to bypass React's render cycle and improve smoothness.
