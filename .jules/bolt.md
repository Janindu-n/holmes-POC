## 2026-05-01 - Optimize scroll-linked hero animation
**Learning:** Using `useState` to track `window.scrollY` for parallax effects causes a React re-render on every scroll event, which can significantly degrade performance during high-frequency user interactions.
**Action:** Use `useRef` to target elements and update their styles directly within a `requestAnimationFrame` callback to bypass the React render cycle for smooth animations.
