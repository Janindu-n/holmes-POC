## 2026-03-14 - [Privilege Escalation via URL Parameters]
**Vulnerability:** User roles were assigned directly from the 'role' query parameter in the registration URL without validation, allowing anyone to register with any role (e.g., 'admin').
**Learning:** Client-side routing and state initialization from URL parameters must be treated as untrusted input. Whitelisting is essential when these parameters drive sensitive logic like role assignment.
**Prevention:** Always validate URL parameters against a set of allowed values before using them to set sensitive state or persist data to the database.

## 2026-03-14 - [Information Leakage in Error Logs]
**Vulnerability:** Raw error objects containing potentially sensitive implementation details (Firebase error structures, stack traces) were being logged to the browser console.
**Learning:** 'console.error(err)' in client-side code can expose internal system architecture to users.
**Prevention:** Use generic error messages for client-side logging and handle detailed error reporting through secure, server-side monitoring tools.
