## 2026-02-05 - Isolate High-Frequency State in Next.js Server Components
**Learning:** In Next.js App Router, keeping high-frequency state updates (like scroll-based parallax) in the root page component forced the entire page (500+ lines) to re-render on every scroll tick. This also required the whole page to be a Client Component, increasing the JS bundle size.
**Action:** Always isolate high-frequency state logic into dedicated leaf Client Components. This allows the parent page to remain a Server Component and limits re-renders to the smallest possible subtree.

## 2026-02-05 - Passive Scroll Listeners
**Learning:** Standard scroll listeners can block the main thread, leading to "janky" scrolling.
**Action:** Always use `{ passive: true }` for scroll event listeners when the listener doesn't call `preventDefault()`.
