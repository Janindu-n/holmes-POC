## 2026-04-24 - Scroll Animation Performance vs CSS Transitions
**Learning:** High-frequency style updates via JavaScript (e.g., parallax on scroll) can stutter if the target element also has a CSS transition property (like Tailwind's `transition-all`). The browser's transition engine competes with the JS updates.
**Action:** Always remove CSS transitions from elements being animated directly via DOM manipulation or requestAnimationFrame.
