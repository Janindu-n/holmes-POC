## 2025-03-19 - Parallax Scroll Optimization
**Learning:** Using `useState` to track `window.scrollY` for parallax effects causes the entire component to re-render on every scroll event (often 60+ times per second), which is highly inefficient.
**Action:** Use `useRef` to target the animated elements and update their styles directly via DOM manipulation inside a `requestAnimationFrame` loop to bypass React's reconciliation cycle.
