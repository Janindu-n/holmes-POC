## 2025-05-14 - Optimized Scroll Parallax
**Learning:** Using React state (useState) for high-frequency scroll events (e.g., parallax effects) causes the entire component to re-render on every scroll pixel, which is a major performance bottleneck. Direct DOM manipulation via useRef and requestAnimationFrame (with a ticking flag) is significantly more efficient as it bypasses the React render cycle entirely.
**Action:** Always prefer direct DOM updates for high-frequency UI changes like scroll animations. Ensure CSS transitions are removed from animated elements to avoid jank.
