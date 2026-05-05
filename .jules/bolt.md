## 2026-05-05 - Optimize scroll-linked animations in Home page
**Learning:** Updating React state on every scroll event causes a full component re-render, which is expensive for high-frequency events. Using `useRef` and `requestAnimationFrame` to manipulate the DOM directly avoids the React render cycle entirely.
**Action:** Use direct DOM manipulation with `useRef`, `requestAnimationFrame`, and a `ticking` flag for performance-critical scroll effects. Always call the update function once on mount to sync initial styles.
