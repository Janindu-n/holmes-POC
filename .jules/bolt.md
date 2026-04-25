## 2025-05-14 - Optimized scroll performance on Home page
**Learning:** Using React state for scroll-linked animations causes full component re-renders on every scroll event, which is expensive for performance. Direct DOM manipulation using `useRef` and `requestAnimationFrame` is a much more efficient alternative.
**Action:** When implementing parallax or scroll-linked effects, avoid React state. Use a `useRef` to target the element and update its styles directly in a `requestAnimationFrame` loop within a `useEffect` hook.
