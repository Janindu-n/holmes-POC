## 2025-05-14 - Authentication Guard for Protected Routes
**Vulnerability:** Missing authentication checks on sensitive routes allowed unauthorized access to protected dashboard content.
**Learning:** In a client-side Next.js application using Firebase, pages marked with 'use client' require explicit authentication guards using 'onAuthStateChanged' to prevent unauthorized rendering. Using an 'authLoading' state is essential to prevent UI flashes of protected content before the auth state is determined.
**Prevention:** Always implement an authentication guard in the 'useEffect' hook of protected client components. Handle the case where the Firebase 'auth' object might be null (e.g., during build or missing config) by redirecting immediately.
