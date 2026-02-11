## 2025-05-14 - Isolating high-frequency scroll state
**Learning:** Moving scroll-based parallax logic into a dedicated leaf Client Component prevents the entire page from re-rendering on every scroll tick. Throttling updates with `requestAnimationFrame` and using `{ passive: true }` for scroll listeners significantly improves responsiveness and reduces main thread blocking.
**Action:** Always isolate high-frequency event listeners (scroll, resize, mousemove) into the smallest possible component and use `requestAnimationFrame` for state updates.

## 2025-05-14 - Avoiding Cascading Renders Lint Error
**Learning:** Next.js/React 19 linting rules (specifically `react-hooks/set-state-in-effect`) flag synchronous `setState` calls inside `useEffect` because they cause immediate cascading re-renders.
**Action:** Wrap initial state synchronization with browser APIs (like `window.scrollY`) in `requestAnimationFrame` to avoid this error and improve performance.
