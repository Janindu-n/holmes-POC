
## 2026-04-05 - Scroll Performance Optimization in Home Page
**Learning:** High-frequency scroll events coupled with React state updates cause excessive re-renders and potential frame drops on large landing pages.
**Action:** Use `useRef` for direct DOM manipulation within a `requestAnimationFrame` loop and a `ticking` flag to throttle updates. This ensures 60fps performance by bypassing the React reconciliation cycle for animations.

## 2026-04-05 - Authentication Guard Render Optimization
**Learning:** Initializing `loading` state to `true` in authentication guards results in an unnecessary extra render when the `auth` object is already available (e.g., during subsequent navigations or SSR/hydration).
**Action:** Initialize `loading` state using `useState(!!auth)`. This avoids a synchronous `setLoading(false)` in `useEffect`, reducing the number of initial renders and resolving ESLint cascading render warnings.
