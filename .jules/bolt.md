## 2025-05-14 - Landing Page Optimization

**Learning:** Large landing pages with scroll-based parallax effects should be Server Components, with the interactive logic isolated in small Client Component wrappers. This prevents unnecessary re-renders of the entire page content and improves Time to Interactive (TTI).

**Action:** Use leaf Client Components for high-frequency interactive logic (scroll, mouse move) and wrap them around static content to leverage React Server Components.
