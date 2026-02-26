## 2025-05-22 - Missing Authentication Guard on Sensitive Client-Side Routes
**Vulnerability:** Sensitive pages like `/dashboard` were publicly accessible without any authentication check, exposing the UI and mock data to unauthenticated users.
**Learning:** In a client-side Next.js/Firebase application, developers might forget to implement `onAuthStateChanged` listeners on protected routes, assuming either Next.js or Firebase handles it automatically, which is not the case for purely client-side components without middleware.
**Prevention:** Implement a reusable higher-order component or a global auth provider that enforces authentication on protected routes. Always include an `authLoading` state to prevent UI flashes of protected content before the auth check completes.
