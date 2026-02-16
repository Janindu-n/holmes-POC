## 2026-02-16 - Scroll Parallax Performance Optimization
**Learning:** High-frequency scroll events in React should be isolated into leaf Client Components using `requestAnimationFrame` and direct DOM manipulation via `useRef` to bypass React's reconciliation. This also enables the parent page to be a Server Component, reducing client-side JS.
**Action:** When implementing scroll-based animations, extract them to dedicated components and use `requestAnimationFrame` + `passive: true` listeners.

## 2026-02-16 - CSS Transition Optimization
**Learning:** Using `transition-all` can trigger unnecessary layout recalculations. Specific property transitions like `transition-[filter,opacity]` are more efficient.
**Action:** Replace `transition-all` with specific properties in performance-sensitive areas.
