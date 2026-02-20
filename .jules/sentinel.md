## 2025-05-15 - Dashboard Authentication Guard
**Vulnerability:** Protected dashboard content was visible to unauthenticated users, as the page lacked an authentication check.
**Learning:** Client-side routes in Next.js using Firebase must explicitly monitor authentication state using 'onAuthStateChanged' to prevent unauthorized access and data leakage.
**Prevention:** Always implement an authentication guard with a loading state on sensitive pages to ensure content is only rendered after the user session is verified.
