## 2025-05-14 - Optimize landing page parallax and convert to server component
**Learning:** Decoupling high-frequency scroll events from the top-level component by isolating interactive state in a leaf Client Component (using `requestAnimationFrame` + `passive: true`) allows the parent to stay a Server Component. This reduces the client-side bundle and eliminates unnecessary full-page re-renders during scroll.
**Action:** When a page uses scroll listeners for visual effects, isolate those effects into a dedicated component to keep the page structure as a Server Component.
