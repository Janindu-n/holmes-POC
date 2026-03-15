## 2025-05-15 - [HIGH] Missing Authentication Guard on Dashboard
**Vulnerability:** The `/dashboard` route was accessible to unauthenticated users, exposing sensitive job data and streaming capabilities.
**Learning:** Client-side routes in Next.js require explicit authentication checks (e.g., using Firebase `onAuthStateChanged`) to prevent unauthorized access to protected views. Relying on "client-only" components does not automatically secure the route.
**Prevention:** Implement a standard authentication guard pattern with a loading state (`authLoading`) and redirect to login for all protected routes. Ensure "defense in depth" by handling cases where the authentication service might be unavailable.
