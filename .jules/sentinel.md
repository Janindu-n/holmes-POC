# Sentinel's Journal - Critical Security Learnings

## 2025-05-15 - Secure-Fail Authentication Guards in Next.js Client Components
**Vulnerability:** Sensitive routes (e.g., `/dashboard`) were accessible without authentication, failing "open" by default.
**Learning:** Initial attempts to implement guards used `useState(!!auth)`, which fails open if the `auth` service is null (e.g., missing env vars during build). Linting also caught synchronous `setState` in `useEffect` as a performance risk.
**Prevention:** Always default `authLoading` to `true`. In `useEffect`, explicitly handle the case where the `auth` service is null by redirecting to login immediately. This ensures the component never renders protected content unless a valid session is confirmed.
