## 2025-05-15 - [Scroll isolation for landing page]
**Learning:** In large Next.js pages (Server Components by default in App Router), adding a high-frequency scroll listener to the root component forces the entire page to be a Client Component and re-render on every scroll event. This causes significant main-thread work and degrades scroll performance.
**Action:** Isolate high-frequency state (scroll, mouse position, etc.) into small, dedicated leaf Client Components. Use the `{ passive: true }` option for scroll listeners to ensure they don't block the main thread's scrolling responsiveness.

## 2025-05-15 - [next/image regression on remote patterns]
**Learning:** Migrating to `next/image` for remote images (like Google User Content) requires precise `remotePatterns` configuration in `next.config.ts`. If the domain is missing or incorrectly specified, images will fail to render entirely.
**Action:** When optimizing images, always verify rendering with a screenshot tool (like Playwright) across different environments. If remote patterns are complex, stick to standard `img` tags until the configuration is fully verified to avoid UI regressions.
