## 2025-05-14 - [RSC Data Leakage on Protected Routes]
**Vulnerability:** Protected routes using client-side authentication guards (e.g., in `useEffect`) can still leak sensitive data through the initial React Server Component (RSC) payload or SSR HTML if the component contains static mock data or server-rendered content.
**Learning:** Even if a user is redirected on the client, the initial HTTP response may contain the data. We must ensure the component renders a secure fallback (like a loading state) during both SSR and the initial client render until authentication is confirmed.
**Prevention:** Always use a 'loading' state initialized to true and return a secure fallback early in the component. Verify that sensitive strings are not present in the raw `curl` output of the protected URL.
