# Sentinel Security Journal

This journal tracks critical security learnings and vulnerability patterns discovered in the Holmes Homes codebase.

## Philosophy
- Security is everyone's responsibility
- Defense in depth - multiple layers of protection
- Fail securely - errors should not expose sensitive data
- Trust nothing, verify everything

## Journal Entries

## 2025-05-15 - [Auth Hardening: Role Injection and Error Masking]
**Vulnerability:** Arbitrary role assignment via `?role=` query parameter and disclosure of internal Firebase error details to the client.
**Learning:** Client-side registration logic that trusts URL parameters for sensitive fields like `role` can be easily bypassed. Additionally, passing raw `Error.message` from auth providers to the UI can leak information about account existence or system configuration.
**Prevention:** Always whitelist sensitive parameters from the URL and use generic error messages for authentication-related failures.
