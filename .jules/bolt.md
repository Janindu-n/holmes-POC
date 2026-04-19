## 2025-05-14 - Optimized Scroll Animations & Auth Renders

**Learning:** Using React state to track high-frequency events like `window.scrollY` for parallax or opacity effects triggers excessive re-renders (measured ~4-20 renders per 1000px scroll), which impacts main-thread responsiveness and battery life. Additionally, synchronous `setLoading(false)` calls within `useEffect` hooks during auth initialization cause redundant mount-phase re-renders.

**Action:**
1. Isolated scroll-linked UI updates from the React render cycle by using `useRef` to target elements and `requestAnimationFrame` (with a `ticking` flag) to apply styles directly to the DOM.
2. Eliminated cascading renders in authenticated routes by removing synchronous state updates in the `useEffect` body when the Firebase auth object is uninitialized, relying instead on the `onAuthStateChanged` callback.
