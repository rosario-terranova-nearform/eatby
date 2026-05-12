---
name: Minimalist Utility Inventory
colors:
  surface: '#f4fbf4'
  surface-dim: '#d4dcd5'
  surface-bright: '#f4fbf4'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eef6ee'
  surface-container: '#e8f0e9'
  surface-container-high: '#e3eae3'
  surface-container-highest: '#dde4dd'
  on-surface: '#161d19'
  on-surface-variant: '#3c4a42'
  inverse-surface: '#2b322d'
  inverse-on-surface: '#ebf3eb'
  outline: '#6c7a71'
  outline-variant: '#bbcabf'
  surface-tint: '#006c49'
  primary: '#006c49'
  on-primary: '#ffffff'
  primary-container: '#10b981'
  on-primary-container: '#00422b'
  inverse-primary: '#4edea3'
  secondary: '#b61722'
  on-secondary: '#ffffff'
  secondary-container: '#da3437'
  on-secondary-container: '#fffbff'
  tertiary: '#855300'
  on-tertiary: '#ffffff'
  tertiary-container: '#e29100'
  on-tertiary-container: '#523200'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#6ffbbe'
  primary-fixed-dim: '#4edea3'
  on-primary-fixed: '#002113'
  on-primary-fixed-variant: '#005236'
  secondary-fixed: '#ffdad7'
  secondary-fixed-dim: '#ffb3ad'
  on-secondary-fixed: '#410004'
  on-secondary-fixed-variant: '#930013'
  tertiary-fixed: '#ffddb8'
  tertiary-fixed-dim: '#ffb95f'
  on-tertiary-fixed: '#2a1700'
  on-tertiary-fixed-variant: '#653e00'
  background: '#f4fbf4'
  on-background: '#161d19'
  surface-variant: '#dde4dd'
typography:
  display:
    fontFamily: Hanken Grotesk
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Hanken Grotesk
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  headline-md:
    fontFamily: Hanken Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-caps:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.05em
  headline-lg-mobile:
    fontFamily: Hanken Grotesk
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 4px
  xs: 8px
  sm: 16px
  md: 24px
  lg: 32px
  xl: 48px
  container-margin: 20px
  gutter: 16px
---

## Brand & Style

The design system is built on the principle of **Minimalist Utility**. It prioritizes information density and clarity to manage food waste without inducing anxiety. The brand personality is professional and systematic—acting as a reliable tool rather than a social experience. 

The emotional response should be one of "controlled urgency." By utilizing high-contrast elements and a stark, clean aesthetic, the UI directs the user's attention to what matters most (expiring items) while maintaining a calm, organized environment through generous whitespace and a disciplined neutral foundation.

## Colors

The palette is functional and semantic. 
- **Primary (Fresh Green):** Represents longevity, safety, and items with ample shelf life. Used for positive actions and "safe" status indicators.
- **Secondary (Warning Red):** Reserved strictly for immediate expiry (0-24 hours). Its high-contrast application ensures it is the first thing a user sees.
- **Tertiary (Warning Orange):** Used for "caution" states (items expiring within 48-72 hours).
- **Backgrounds:** A range of cool greys and pure whites are used to create a "laboratory-clean" environment, ensuring that the semantic colors pop with maximum efficiency.

## Typography

The design system utilizes **Hanken Grotesk** for its clean, contemporary feel and exceptional legibility at various weights. To lean into the "utility" aspect, **JetBrains Mono** is used for labels, timestamps, and quantities, providing a technical, precise contrast to the humanist headlines.

- Use **Bold** weights for expiry dates to ensure they are legible at a glance.
- Use **Monospace** for all numerical data and countdown timers to prevent layout shifting during updates.
- All body text should maintain a high contrast ratio against the neutral backgrounds (minimum 7:1).

## Layout & Spacing

This design system employs a **Fluid Grid** with strict 4px increments. 
- **Mobile:** 4-column grid with 20px side margins and 16px gutters.
- **Desktop:** 12-column centered grid with a max-width of 1200px.

The spacing rhythm is "tight but breathable." Information density is high, but elements are separated by clear structural dividers or significant shifts in background tone rather than just empty space. Use "MD" spacing for grouping related items and "LG" spacing to separate distinct sections (e.g., Fridge vs. Pantry).

## Elevation & Depth

To maintain the "Minimalist Utility" aesthetic, this design system avoids soft ambient shadows. Instead, it uses **Tonal Layers** and **Bold Outlines**.

- **Level 0 (Background):** The base neutral grey (#F9FAFB).
- **Level 1 (Cards/Blocks):** Pure white surfaces with a 1px solid border (#E5E7EB).
- **Level 2 (Modals/Popovers):** Pure white with a 2px solid black or dark grey border to create a "cut-out" effect.
- **Active States:** No shadow; instead, use a 2px inset border or a shift in the background fill color.
- **Urgent Items:** High-contrast color blocks (Secondary Red) that sit "flat" on the surface but dominate the visual field through saturation.

## Shapes

The shape language is **Soft (0.25rem)**. This slight rounding takes the edge off the "Brutalist" tendencies of the high-contrast design, making the app feel professional and modern rather than harsh.

- **Primary Buttons:** 0.25rem (Soft) corner radius.
- **Inventory Cards:** 0.5rem (Rounded-LG) to create a subtle distinction from smaller utility buttons.
- **Input Fields:** 0.25rem (Soft).
- **Icons:** Use thick, 2px stroke-weight icons with squared ends to match the typographic precision.

## Components

### Event Blocks (Inventory Items)
Inventory items are rendered as high-contrast blocks. The left edge features a 4px "Status Bar" in Fresh Green, Warning Orange, or Warning Red. Title and quantity are primary, while the "Days Remaining" is placed in a high-contrast pill on the right.

### Prominent FAB (Floating Action Button)
The FAB is the primary entry point for adding items. It is a large, circular component (56px) using the Primary Fresh Green with a bold white "+" icon. It does not use a shadow but a thick 2px dark green border for depth.

### Calendar Toggles
View toggles (List vs. Calendar) use a segmented control style with a "pressed-in" look for the active state. Use JetBrains Mono for the labels in these toggles to emphasize the functional nature of the view.

### Input Fields
Minimalist line-based inputs or fully boxed fields with 1px light grey borders. On focus, the border thickens to 2px in Primary Green.

### Chips/Tags
Used for food categories (e.g., "Dairy", "Produce"). These should be low-contrast (light grey background with dark grey text) so they do not compete with the color-coded urgency of the expiry dates.