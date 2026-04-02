## 2025-05-14 - Registration Role Escalation and Information Leakage
**Vulnerability:** Registration page accepted arbitrary `role` values via query parameters and leaked raw Firebase error messages to the UI.
**Learning:** Client-side routing parameters were trusted without validation before being persisted to Firestore, and default error handling in React state directly rendered the `err.message` from third-party SDKs.
**Prevention:** Implement explicit whitelists for sensitive metadata like user roles. Always decouple internal error state from user-facing messages by using generic error strings and developer-only logging.
