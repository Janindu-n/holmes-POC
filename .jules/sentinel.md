## 2025-05-10 - Authentication Guard Implementation for Protected Routes
**Vulnerability:** The /dashboard route was accessible to unauthenticated users, exposing mock job data and UI elements.
**Learning:** In client-side rendered pages using Firebase Auth, failing to implement an explicit authentication check allows unauthorized access to components during the window between initial mount and the first auth state resolution.
**Prevention:** Always implement a fail-closed client-side authentication guard with a loading state that redirects unauthenticated users before rendering any sensitive content.
