## 2026-05-11 - Scroll-triggered re-renders in Home Page
**Learning:** Using `useState` to track `window.scrollY` for animations causes the entire component to re-render on every scroll event (up to 60-120 times per second), which is extremely inefficient and can lead to jank.
**Action:** Use `useRef` to store the animation state and `requestAnimationFrame` to perform direct DOM manipulation. This bypasses the React render cycle for high-frequency updates and ensures smooth performance.
