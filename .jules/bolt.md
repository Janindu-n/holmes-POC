## 2025-05-14 - Landing Page Scroll Optimization
**Learning:** High-frequency scroll animations driven by React state (e.g., parallax effects) cause constant re-renders (2-4 per 100px scroll), which can lead to UI jank and high CPU usage. Moving this logic to direct DOM manipulation within a `requestAnimationFrame` loop reduces re-renders to 0 during scroll.
**Action:** Use `useRef` to target elements and update their styles directly in a throttled scroll listener. Always call the update function once on mount to synchronize with the current scroll position.
