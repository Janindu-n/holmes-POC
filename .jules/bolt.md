## 2026-02-07 - Isolate scroll-based state to prevent cascading re-renders
**Learning:** Large landing pages implemented as a single 'use client' component with scroll listeners cause the entire page to re-render on every scroll event. This leads to high CPU usage and potential scroll jitter as the entire DOM tree is reconciled.
**Action:** Move high-frequency interactive logic into dedicated leaf Client Components while keeping the main page as a Server Component. Use passive listeners and requestAnimationFrame to match the browser's refresh rate.
