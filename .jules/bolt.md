## 2025-05-22 - [Isolate scroll-based re-renders]
**Learning:** High-frequency events like 'scroll' that update state in a top-level component cause massive re-renders of the entire component tree. Isolating this logic into a leaf Client Component and converting the parent to a Server Component significantly improves performance and reduces the client-side JS bundle.
**Action:** Always check for 'onScroll' or 'scrollY' tracking in large components and move them to dedicated sub-components.

## 2025-05-22 - [Passive scroll listeners]
**Learning:** Using '{ passive: true }' for scroll event listeners is crucial for scroll smoothness as it allows the browser to perform scrolling without waiting for the JS execution.
**Action:** Always include '{ passive: true }' for scroll and wheel event listeners unless preventDefault() is explicitly needed.
