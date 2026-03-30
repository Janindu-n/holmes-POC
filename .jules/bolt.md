## 2025-03-30 - Optimized Scroll Parallax Performance
**Learning:** Using React state (useState) to drive high-frequency animations like scroll parallax causes the entire component to re-render on every scroll event (~60fps), which is a significant performance bottleneck.
**Action:** Use useRef and direct DOM manipulation within a requestAnimationFrame loop with a 'ticking' flag to update styles. This bypasses the React render cycle, reducing re-renders to 0 during scroll. Always add 'will-change' to animated elements to promote them to their own GPU layer.
