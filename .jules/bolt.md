## 2025-05-14 - [Anti-Pattern] Scroll-linked re-renders in Home component
**Learning:** Using `useState` to track window scroll position for parallax effects causes the entire component tree to re-render on every scroll event (up to 60-120fps). In a complex landing page, this leads to significant main-thread blocking and frame drops.
**Action:** Isolate scroll animations by using `useRef` for target elements and performing direct DOM manipulation inside a `requestAnimationFrame` loop. Always use `{ passive: true }` for scroll listeners and add `will-change` hints for promoted layers.
