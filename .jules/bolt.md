## 2025-05-15 - Landing Page Parallax and Image Optimization

**Learning:** Scroll-linked re-renders in React can be significantly reduced by moving animation logic from state to direct DOM manipulation using `useRef` and `requestAnimationFrame`. This allows the UI to update at the screen's refresh rate without triggering the full React render cycle. Native `<img>` tags provide better control over `fetchPriority` and `loading` attributes compared to CSS `backgroundImage`, which is critical for LCP optimization of above-the-fold assets.

**Action:** For performance-critical animations, bypass React state and use direct DOM manipulation with a "ticking" flag and `requestAnimationFrame`. Use native `<img>` tags for hero sections to optimize LCP using `fetchPriority="high"`.
