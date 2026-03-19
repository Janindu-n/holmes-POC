## 2025-05-15 - [Authentication Guard]
**Vulnerability:** Missing client-side authentication guard on the `/dashboard` route allowed unauthenticated users to view the dashboard UI, even if data fetching would later fail.
**Learning:** Client-side routes in Next.js that depend on Firebase Auth should always implement an `onAuthStateChanged` listener with a loading state to prevent UI flashes and ensure a secure redirection.
**Prevention:** Use a standardized authentication wrapper or higher-order component for all protected routes to ensure consistent enforcement of authentication requirements.
