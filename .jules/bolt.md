## 2025-03-02 - Landing Page Performance Anti-pattern
**Learning:** The landing page was a single large Client Component (26KB) that re-rendered entirely on every scroll event due to global scroll state. This is a significant bottleneck for LCP and runtime performance.
**Action:** Convert the page to a Server Component and isolate high-frequency interactions (like parallax) into dedicated, lightweight leaf Client Components using `requestAnimationFrame` and `useRef` to bypass React's reconciliation cycle.
