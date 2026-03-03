## 2025-05-14 - [High-Frequency Scroll Optimization]
**Learning:** High-frequency scroll-linked animations in React can cause significant performance overhead due to state-driven reconciliation. Moving this logic to a leaf Client Component that uses 'useRef' and 'requestAnimationFrame' for direct DOM manipulation eliminates React's diffing cycle for every scroll event.
**Action:** For parallax or scroll-linked effects, always use leaf Client Components with direct DOM updates to keep the parent pages as Server Components and ensure 60fps smoothness.

## 2025-05-14 - [Animation Conflict Prevention]
**Learning:** Using 'transition-all' on elements that receive high-frequency style updates via JavaScript (like scroll-based parallax) creates visual 'jank' as the CSS transition competes with the JS updates.
**Action:** Remove 'transition-all' from animated elements and use 'will-change: transform, opacity' to signal browser compositor optimization.
