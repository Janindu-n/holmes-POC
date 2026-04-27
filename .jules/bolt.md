## 2026-04-27 - Scroll-linked re-render optimization
**Learning:** Using React state to track scroll position for animations causes excessive re-renders (one per scroll event), which can lead to jank.
**Action:** Use `useRef`, `requestAnimationFrame`, and direct DOM manipulation to bypass React's render cycle for performance-critical animations like parallax effects. Use `{ passive: true }` and `will-change` for extra smoothness.
