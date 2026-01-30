## 2025-05-14 - [Dynamic Import for Heavy UI Components]
**Learning:** Third-party libraries like `@mux/mux-player-react` can significantly increase the initial bundle size (>500KB). Using `next/dynamic` with `ssr: false` and a loading placeholder reduces the initial payload and improves TTI without sacrificing user experience.
**Action:** Always check for large external UI components and consider dynamic imports for non-critical paths or client-only components.
