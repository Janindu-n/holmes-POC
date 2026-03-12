## 2025-03-12 - [Scroll Parallax & Lazy Loading]
**Learning:** React state for high-frequency events (scroll) triggers expensive re-renders. Bypassing React via `useRef` and `requestAnimationFrame` achieves 60fps. Transitioning `backgroundImage` to `<img>` tags allows for native `loading="lazy"`.
**Action:** Use `requestAnimationFrame` for scroll-linked UI updates and prefer semantic `<img>` tags for better lazy-loading control.
