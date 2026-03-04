## 2025-05-14 - Optimizing high-frequency scroll parallax in Next.js
**Learning:** Moving scroll-based animation logic from React state to a leaf Client Component using useRef and requestAnimationFrame prevents parent re-renders and eliminates main-thread congestion. Converting the landing page to a Server Component further improves performance by reducing the client-side JavaScript bundle.
**Action:** Always prefer leaf Client Components with RAF for high-frequency events and keep page-level components as Server Components whenever possible.
