## 2025-05-15 - [Registration Role Hardening & Dashboard Auth Guard]
**Vulnerability:** Privilege escalation via URL parameter manipulation and unauthorized access to dashboard UI.
**Learning:** Client-side role assignment from query parameters without server-side or client-side validation allows users to claim unauthorized permissions (e.g., 'admin'). Additionally, sensitive pages lacked authentication checks, relying on hidden links rather than access control.
**Prevention:** Always validate input parameters against a strict whitelist. Implement authentication guards at the page level (e.g., using 'onAuthStateChanged') to ensure users are redirected to login if they lack a valid session.
