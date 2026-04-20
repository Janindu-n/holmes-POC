## 2026-04-20 - User Enumeration and Role Injection
**Vulnerability:** The application was leaking detailed Firebase authentication errors to the UI and allowing arbitrary user roles to be set via registration URL parameters.
**Learning:** Defaulting to raw error messages from authentication providers can lead to user enumeration vulnerabilities. Relying on client-side URL parameters for critical user data (like roles) without server-side or whitelist validation leads to privilege escalation risks.
**Prevention:** Always catch and map authentication errors to generic messages unless specifically handled. Implement whitelists for all user-provided input that affects authorization states.
