## 2026-04-03 - Parallax Scroll Optimization in Landing Page
**Learning:** The landing page (`src/app/page.tsx`) previously used React state (`useState`) to track scroll position for parallax effects, causing 20-40 re-renders per scroll sequence and visible layout thrashing due to `transition-all`.
**Action:** Use `useRef` for direct DOM manipulation and `requestAnimationFrame` with a ticking flag to decouple high-frequency animations from the React render cycle. Always call the update function once on mount to synchronize state after refreshes.
