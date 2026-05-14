## 2026-05-11 - Eliminate scroll-triggered re-renders
**Learning:** Using React state to track scroll position for animations causes the entire component to re-render on every scroll event, which is extremely inefficient for high-frequency updates.
**Action:** Use `useRef` to target the animated element and `requestAnimationFrame` to directly manipulate DOM styles. This bypasses React's reconciliation and reduces scroll-triggered re-renders to zero. Remove any CSS `transition` properties on the target element to avoid conflicts with manual style updates.
