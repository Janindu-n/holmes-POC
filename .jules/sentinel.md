## 2025-05-14 - Missing Authentication Guard on Dashboard
**Vulnerability:** The dashboard page (`/dashboard`) was accessible to unauthenticated users, leaking mock job data and system status.
**Learning:** Client-side routes in Next.js require explicit authentication checks (e.g., using `onAuthStateChanged`) to prevent unauthorized access, even if data is currently mocked.
**Prevention:** Implement a reusable Auth Guard component or use Next.js Middleware to enforce authentication across all protected routes. Always use a loading state to prevent UI flashes of protected content.
