## 2025-05-22 - High-frequency scroll parallax isolation
**Learning:** In Next.js, using React state for high-frequency events (like scroll parallax) on a top-level page component causes the entire page tree to re-render ~60 times per second, which is inefficient and prevents static generation.
**Action:** Isolate scroll-driven logic into a leaf Client Component using `useRef` and `requestAnimationFrame` for direct DOM manipulation. This keeps the parent page as a Server Component (statically generated) and avoids React's reconciliation overhead for animations.
