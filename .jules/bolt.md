## 2025-05-15 - Decoupled Scroll Parallax for 60fps

**Learning:** High-frequency scroll animations (parallax) driven by React `useState` cause excessive re-renders (40+ per scroll sequence), blocking the main thread and causing "jank." Decoupling these updates using `useRef`, a "ticking" flag, and `requestAnimationFrame` for direct DOM manipulation reduces re-renders to 0 while maintaining visual synchronization. Adding `will-change: transform, opacity` further optimizes performance by offloading these layers to the GPU.

**Action:** For any high-frequency event (scroll, mousemove, resize) that updates styles, bypass React state and use direct DOM manipulation inside a `requestAnimationFrame` loop. Always include an initial synchronization call on mount to ensure the UI matches the initial scroll position.
