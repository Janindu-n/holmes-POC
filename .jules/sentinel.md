## 2025-05-14 - Unauthorized Access to Dashboard
**Vulnerability:** The `/dashboard` route was accessible to any user without authentication, exposing mock sensitive data and system status.
**Learning:** Client-side routes in Next.js using `use client` do not automatically inherit authentication protection unless explicitly guarded by a middleware or a client-side auth check.
**Prevention:** Implement a high-order component or a base layout guard that wraps sensitive routes to ensure authentication is verified before rendering content.
