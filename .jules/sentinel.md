## 2025-05-14 - Registration Hardening
**Vulnerability:** Role injection, information leakage via error messages, and weak client-side validation.
**Learning:** Query parameters used for state (like roles) must be whitelisted to prevent unauthorized privilege escalation during registration. Firebase services can be null if environment variables are missing; components must handle these null states to fail securely.
**Prevention:** Always validate external inputs (URL params, form data) against strict whitelists and use generic error messages for authentication-related failures.
