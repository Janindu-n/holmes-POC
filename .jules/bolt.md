## 2025-05-15 - Zero-Render Scroll Animations
**Learning:** Using React state (e.g., `scrollY`) to drive high-frequency visual effects like parallax triggers a full component re-render on every scroll event, which is extremely expensive in complex pages.
**Action:** Decouple non-reactive visual updates from the React render cycle by using `useRef` and direct DOM manipulation within a `requestAnimationFrame` loop. Always use `{ passive: true }` for scroll listeners to avoid main-thread blocking.

## 2025-05-15 - Resource Optimization for Hero Sections
**Learning:** CSS `background-image` properties are invisible to the browser's preload scanner, delaying image discovery.
**Action:** Prefer native `<img>` tags with `loading="lazy"` (for off-screen) or `decoding="async"` (for all) over CSS backgrounds to improve LCP and overall page responsiveness.
