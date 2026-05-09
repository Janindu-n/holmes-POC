## 2025-02-12 - Scroll-linked Animation Optimization
**Learning:** Using `useState` to track scroll position for driving hero animations caused the entire `Home` component to re-render 20+ times per scroll action, blocking the main thread and wasting CPU cycles.
**Action:** Use `useRef` combined with `requestAnimationFrame` to perform direct DOM style updates within a scroll listener. This reduces scroll-triggered re-renders to zero while maintaining smooth 60fps animations.
