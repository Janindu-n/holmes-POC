## 2025-05-15 - [Client-side Authentication Guard]
**Vulnerability:** The `/dashboard` route was accessible to unauthenticated users and displayed mock job data before client-side redirection.
**Learning:** In the absence of a global `middleware.ts`, sensitive client-side routes must be protected using a combination of a loading state and an authentication listener (`onAuthStateChanged`) to prevent unauthorized content exposure during hydration.
**Prevention:** Use a dedicated authentication guard or a higher-order component (HOC) for protected routes, and ensure the initial `loading` state is true to prevent rendering of sensitive data before the authentication status is confirmed.
