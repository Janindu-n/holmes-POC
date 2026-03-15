## 2026-03-15 - CSS Transition Conflict with JS Animation
**Learning:** Elements with `transition-all` or specific transitions on properties like `transform` and `opacity` will conflict with high-frequency JavaScript updates (e.g., parallax via `requestAnimationFrame`). This causes the browser to interpolate between the JS-set value and the previous state, leading to a "floaty" or laggy visual effect and unnecessary CPU overhead.
**Action:** Always remove CSS transition classes from elements whose styles are being updated directly via DOM manipulation in a high-frequency loop.
