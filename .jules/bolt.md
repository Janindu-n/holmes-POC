## 2025-03-10 - Optimizing High-Frequency UI Updates

**Learning:** Moving scroll-based animations from React state (`useState`) to direct DOM manipulation via `useRef` and `requestAnimationFrame` significantly improves performance by bypassing the React render cycle, ensuring 60fps animations without expensive re-renders.

**Action:** Use `useRef` and `requestAnimationFrame` for any high-frequency style updates (scroll, mouse move, etc.). Always add `will-change` to optimized elements and remove conflicting CSS `transition` properties to prevent rendering jank.
