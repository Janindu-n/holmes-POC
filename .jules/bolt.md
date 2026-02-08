# Bolt's Performance Journal

## 2026-02-08 - Isolate high-frequency scroll state in Landing Page
**Learning:** Moving scroll-based state from a top-level page component to a leaf client component allows the page to remain a Server Component. This significantly reduces the JavaScript bundle size for the initial load and prevents unnecessary re-renders of the entire page tree on every scroll event. Additionally, throttling `requestAnimationFrame` using a `ticking` flag prevents redundant frame requests when multiple scroll events occur between repaints.
**Action:** Always identify if high-frequency state (scroll, resize, mouse move) can be isolated into dedicated leaf components to keep the parent tree as static or server-side as possible.
