## 2025-02-25 - Isolating High-Frequency Scroll Updates
**Learning:** Storing scroll position in a top-level component's state causes the entire page to re-render on every scroll event, which is a major performance bottleneck. Isolating this logic into a leaf Client Component and using direct DOM manipulation with `requestAnimationFrame` bypasses React's reconciliation, ensuring 60fps performance.
**Action:** Always move high-frequency interactive logic (scroll, mouse move) into dedicated components. Use `useRef`, `requestAnimationFrame`, and `passive: true` listeners. Ensure the main page remains a Server Component for better initial load and smaller hydration bundles.

## 2025-02-25 - Safety in requestAnimationFrame
**Learning:** High-frequency updates via `requestAnimationFrame` should always be paired with a way to cancel the frame on unmount and a safety check (like an `isUnmounted` flag) to prevent state updates or DOM access on unmounted components, which could lead to memory leaks or errors.
**Action:** Store the RAF ID and use `cancelAnimationFrame` in the cleanup function. Use an `isUnmounted` flag inside the callback for extra safety.
