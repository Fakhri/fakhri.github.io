# The Design System: Editorial Authority & Human Warmth

This design system is a bespoke framework crafted for a Product and Platform Leader. It moves beyond the clinical, "SaaS-standard" aesthetic to create a digital experience that feels like a premium editorial publication. It balances technical rigor with a welcoming, tactile warmth.

## 1. Overview & Creative North Star: "The Human Architect"

The Creative North Star for this system is **"The Human Architect."** 

Standard portfolios often feel like rigid, technical manuals. This system breaks that mold by treating the digital canvas as a physical space. We utilize **Organic Brutalism**—combining high-contrast, bold typography with soft, warm surfaces. 

### Breaking the Template:
*   **Intentional Asymmetry:** Avoid perfectly centered grids. Offset large display text against smaller, detailed captions to create a sense of movement and narrative flow.
*   **Overlapping Elements:** Use absolute positioning to allow imagery (like the signature caricature) or key metrics to bleed over container boundaries, suggesting depth and a non-linear career path.
*   **Breathing Room:** White space is not "empty"; it is a luxury material. Use generous margins to signal confidence and clarity of thought.

---

## 2. Colors: The Warmth of Professionalism

The palette rejects the "Stark White & Corporate Blue" cliché. We use a base of warm neutrals (`surface`) to reduce eye strain and build empathy, punctuated by a deep, authoritative blue (`primary`) to establish trust.

### The "No-Line" Rule
**Explicit Instruction:** Do not use 1px solid borders for sectioning. 
Structure must be defined through color-blocking. Use `surface-container-low` for large content blocks and `surface-container-high` for callouts. A transition from `#faf9f5` (base) to `#efeeea` (container) provides all the visual separation required without the "boxiness" of traditional lines.

### Surface Hierarchy & Nesting
Treat the UI as layered sheets of fine paper:
*   **Base Layer:** `surface` (#faf9f5) – The foundation of the portfolio.
*   **Section Layer:** `surface-container-low` (#f4f4f0) – Used for background shifts between case studies.
*   **Object Layer:** `surface-container-lowest` (#ffffff) – Used for cards or high-priority content to make them "pop" against the warmer background.

### The "Glass & Gradient" Rule
To add soul to the technical authority:
*   **Glassmorphism:** Navigation bars and floating action buttons should use `surface` at 70% opacity with a `24px` backdrop-blur.
*   **Signature Textures:** For Hero CTAs, use a subtle linear gradient from `primary` (#2b4bb9) to `primary-container` (#4865d3) at a 135-degree angle. This adds a "lifted" professional polish that flat color lacks.

---

## 3. Typography: Editorial Sophistication

We pair **Manrope** (Display/Headlines) with **Inter** (Body/Labels) to bridge the gap between architectural structure and modern legibility.

*   **Display-LG (Manrope, 3.5rem):** Reserved for the "Hero Statement." Use a tight letter-spacing (-0.02em) to create a bold, "ink-on-paper" impact.
*   **Headline-MD (Manrope, 1.75rem):** Used for Case Study titles. It conveys the authority of a Product Leader.
*   **Body-LG (Inter, 1rem):** The workhorse. Set with a generous line-height (1.6) to ensure long-form technical strategy remains approachable.
*   **Title-SM (Inter, 1rem, Bold):** For sub-headers within technical documentation.

---

## 4. Elevation & Depth: Tonal Layering

Traditional drop shadows are too "digital." We achieve depth through atmospheric light and tonal shifts.

*   **The Layering Principle:** Place a `surface-container-lowest` card on a `surface-container-low` background. The subtle shift from off-white to pure white creates a natural, soft lift.
*   **Ambient Shadows:** For floating elements (e.g., a "Contact Me" card), use: `box-shadow: 0 20px 40px rgba(43, 75, 185, 0.06);`. This uses the `primary` color as a tint, mimicking how light reflects off professional surfaces.
*   **The "Ghost Border":** If a border is required for accessibility, use `outline-variant` (#c3c6d7) at **15% opacity**. It should be felt, not seen.
*   **Backdrop Blur:** Apply to all overlapping containers to ensure that as the user scrolls, the content underneath is hinted at, reinforcing the concept of "Platform Depth."

---

## 5. Components

### Buttons (The "Precision Tools")
*   **Primary:** Solid `primary` background, `on-primary` text. `0.5rem` (md) radius. No shadow on rest; subtle `primary-container` lift on hover.
*   **Secondary:** Ghost-style. No background. `primary` text with a 15% opacity `outline-variant` border. On hover, transition to `surface-container-high`.

### Cards & Case Studies
*   **Constraint:** Forbid divider lines. 
*   **Style:** Use `48px` of vertical white space to separate content sections. Case study cards should use `surface-container-lowest` with a very soft `8px` corner radius (`md`) to maintain a professional, slightly sharp edge.

### Chips (Skill/Platform Tags)
*   **Style:** Use `surface-container-high` background with `on-surface-variant` text. High roundedness (`full`). This makes technical skills feel like "pills" or physical objects.

### Signature Component: The "Perspective Timeline"
A vertical experience line that doesn't use a solid line. Instead, use a series of `surface-tint` dots connected by a subtle gradient of `surface-container-highest` to `surface`.

---

## 6. Do’s and Don’ts

### Do:
*   **Do** use asymmetrical layouts where text blocks are left-aligned but imagery is right-floated with a slight overlap.
*   **Do** use `primary` sparingly. It is a "surgical" accent for CTAs and key insights, not a background color.
*   **Do** ensure all typography has a minimum contrast ratio of 4.5:1 against the warm `surface` tones.

### Don't:
*   **Don't** use pure black (#000000) for body text. Use `on-surface` (#1b1c1a) to maintain the "warm" aesthetic.
*   **Don't** use standard 1px borders or heavy shadows. They break the editorial feel.
*   **Don't** use generic icons. Opt for thin-stroke, custom SVG icons that match the `outline` token weight.