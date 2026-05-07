## 2025-05-07 - Scroll-linked re-renders in Home page
**Learning:** Using React `useState` to track `window.scrollY` for animations causes the entire component to re-render on every scroll event (dozens of times per second). This is highly inefficient for large components like the landing page.
**Action:** Use `useRef` to target elements and `requestAnimationFrame` within the scroll listener to update styles directly via the DOM API, bypassing the React render cycle.

## 2025-05-07 - Next.js 16 Sandbox Environment Issue
**Learning:** The local sandbox environment for Next.js 16 was missing internal modules (e.g., `../lib/constants`), causing `npm run dev` to fail.
**Action:** Temporarily installing `next@15.1.6` via `npm install --no-save` restored the `next` binary and allowed local verification to proceed.
