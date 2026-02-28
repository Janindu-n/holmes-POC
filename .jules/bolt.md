## 2025-05-15 - [High-Frequency Animation Isolation]
**Learning:** For scroll-based parallax effects, using React state (`useState`) triggers full component re-renders on every scroll tick. This is particularly expensive for large pages like the landing page.
**Action:** Isolate high-frequency animations into leaf Client Components and use `requestAnimationFrame` with direct DOM manipulation to bypass React's reconciliation loop. This allows the parent page to remain a Server Component, improving both initial load and runtime performance.
