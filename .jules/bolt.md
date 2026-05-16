## 2026-05-16 - Throttled Scroll Animations with direct DOM manipulation
**Learning:** Using `useState` to track scroll position for parallax or fade effects causes the entire component to re-render on every scroll event, which is extremely expensive for complex pages.
**Action:** Use `useRef` for target elements and a `requestAnimationFrame` loop to update styles directly via the DOM API. This reduces scroll-triggered re-renders to zero.

## 2026-05-16 - Cascading Render Lint Errors
**Learning:** Initializing state (like `loading`) based on service availability inside `useEffect` can trigger 'cascading render' lint errors if the state update happens synchronously on mount.
**Action:** Initialize the state based on the immediate availability of the service singleton outside of the effect to avoid unnecessary re-renders and satisfy linting rules.
