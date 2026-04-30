## 2025-05-15 - Decoupling High-Frequency Events from React Render Cycle
**Learning:** Using React state for high-frequency events like `scroll` causes the entire component tree to re-render on every event, which is extremely inefficient for simple visual effects like parallax.
**Action:** Use `useRef` and direct DOM manipulation combined with `requestAnimationFrame` and a `ticking` flag to handle high-frequency style updates without triggering React's reconciliation process.
