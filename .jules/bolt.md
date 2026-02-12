## 2026-02-12 - Isolate High-Frequency Event Listeners
**Learning:** Attaching high-frequency event listeners (like scroll or mousemove) to a top-level layout or a large page component triggers full-page re-renders in Next.js/React, which can severely degrade performance and interaction smoothness.
**Action:** Isolate these listeners and their associated state into the smallest possible leaf "Client Component" boundary. This ensures that only the specific interactive element re-renders, while the rest of the page remains static (or as a Server Component).
