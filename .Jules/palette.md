# Palette's Journal

## 2025-01-24 - [Dashboard Accessibility & Focus States]
**Learning:** Icon-only buttons with Material Symbols were missing both `aria-label` and `aria-hidden` attributes, making them inaccessible to screen readers. Additionally, focus indicators were missing across the dashboard, impacting keyboard navigation.
**Action:** Always implement `focus-visible` rings using the theme's primary color (`focus-visible:outline-primary`) and ensure icon-only buttons have descriptive `aria-label` attributes while hiding the decorative icon span with `aria-hidden="true"`.
