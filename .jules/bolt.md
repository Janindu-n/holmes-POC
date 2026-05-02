## 2026-05-22 - Optimizing Scroll-Linked Animations in React
**Learning:** Using React state (useState) for scroll-linked animations triggers component re-renders on every scroll event, which is extremely expensive for large components like a Landing Page.
**Action:** Use `useRef` to access DOM elements directly and update styles within a `requestAnimationFrame` callback. This bypasses the React render cycle during scroll, maintaining 60fps and reducing CPU usage. Added `will-change: transform, opacity` to trigger GPU acceleration for these properties.
