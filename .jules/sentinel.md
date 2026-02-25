## 2025-05-14 - Missing Authentication Guard on Dashboard
**Vulnerability:** The dashboard route (/dashboard) was accessible to unauthenticated users, potentially exposing sensitive mock job data and UI components.
**Learning:** Client-side routes in this Next.js application were not protected by default. Relying on client-side state without an explicit authentication guard allows unauthorized access to page shells and sensitive client-side data.
**Prevention:** Always implement an authentication guard using 'onAuthStateChanged' and an 'authLoading' state to protect sensitive pages. For more robust protection, consider using Next.js Middleware to handle redirects server-side before the page is rendered.
