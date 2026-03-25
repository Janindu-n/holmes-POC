## 2025-03-25 - Hardened Registration and Route Protection
**Vulnerability:** Registration allowed any role via query parameter (privilege escalation), and the dashboard was accessible without authentication. Raw Firebase errors were also exposed.
**Learning:** Client-side routing alone is insufficient for security; explicit role whitelisting and reusable Auth Guards are essential in Next.js/Firebase apps to prevent unauthorized access and info leakage.
**Prevention:** Always implement a whitelist for user roles during registration and wrap sensitive pages with an authentication guard component. Use generic error messages in client-side 'catch' blocks.
