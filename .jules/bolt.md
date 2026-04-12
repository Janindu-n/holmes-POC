## 2026-04-12 - [Scroll Animation Optimization]
**Learning:** Combining CSS 'transition-all' with manual DOM updates via 'requestAnimationFrame' causes visual jitter (jank) as the browser tries to reconcile the two.
**Action:** Always remove CSS transition properties from elements being animated directly via JS/DOM to ensure smooth, frame-perfect updates.
