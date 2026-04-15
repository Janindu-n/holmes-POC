## 2025-05-15 - [Home Page Scroll Re-renders]
**Learning:** The landing page used React state (`useState`) to track scroll position for parallax effects, causing the entire `Home` component to re-render ~20 times per 1000px of scrolling. This increases CPU usage and can lead to jank on low-end devices.
**Action:** Use `useRef` and direct DOM manipulation with `requestAnimationFrame` for scroll-linked animations to bypass the React render cycle and maintain 60fps performance.
