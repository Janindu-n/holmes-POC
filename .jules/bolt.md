## 2025-05-14 - Decoupling Scroll Animations from React Render Cycle
**Learning:** High-frequency events like 'scroll' that update React state (e.g., scrollY) cause the entire component to re-render 60 times per second, which is extremely inefficient for complex pages.
**Action:** Use 'useRef' to store scroll values and update DOM elements directly within a 'requestAnimationFrame' loop. Standardize 'will-change' utility classes (e.g., 'will-change-transform') instead of arbitrary Tailwind syntax to ensure consistent optimization.

## 2025-05-14 - LCP Image Optimization with fetchPriority
**Learning:** CSS 'backgroundImage' on 'div' elements doesn't support native lazy-loading or fetch priority, which hurts LCP scores and bandwidth.
**Action:** Convert Hero and above-the-fold background images to '<img>' tags with 'fetchPriority="high"', 'loading="eager"', and 'decoding="async"'. Use 'loading="lazy"' for below-the-fold assets.
