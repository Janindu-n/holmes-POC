## 2025-05-15 - Authorization Hardening and Auth Guards

**Vulnerability:**
1. The Dashboard was accessible to unauthenticated users because it lacked a client-side authentication check.
2. The registration flow allowed for arbitrary 'role' assignment via URL parameter tampering (?role=admin), which could lead to privilege escalation if sensitive roles are ever used.

**Learning:**
In a Next.js client-side application using Firebase, routes are not protected by default. Relying solely on Firestore rules (if any) or assuming users will follow the intended UI flow is insufficient. Always implement a robust client-side guard with `onAuthStateChanged` and a proper `authLoading` state to prevent UI flashes and data leakage.

**Prevention:**
- Always validate external inputs (like searchParams) used for critical user data (like roles) against an allow-list.
- Implement a global or per-page authentication guard for all protected routes.
- Ensure the auth guard is defensive against uninitialized Firebase instances (e.g., when API keys are missing).
