# CtaSection Component

A full-width final CTA section with a dark rounded card, text on the left, and a dotted world map with floating flag pins on the right.

## Files Created

1. **components/CtaSection.tsx** - Main component
2. **public/cta/world-dots.svg** - Dotted world map background
3. **public/cta/flags/*.svg** - Flag SVGs for 9 countries (us, br, gb, fr, de, lt, in, my, id)
4. **components/CtaSection.example.tsx** - Usage examples

## Features

- **Responsive Layout**: Stacks vertically on mobile, two-column on desktop (lg breakpoint)
- **DM Sans Font**: Loaded via next/font/google (weights 400, 500, 700)
- **Fade-in Animation**: Intersection Observer triggers slide-up animation on scroll
- **Floating Flag Pins**: Staggered floating animation with 3D tilt effect
- **Gradient Mask**: Map fades toward the left for smooth transition
- **Accessible**: Proper heading hierarchy, alt text, focus-visible rings
- **Customizable**: All text, button, and flag settings are props with sensible defaults

## Props

```typescript
type CtaSectionProps = {
  label?: string;              // "Built for your business:"
  pillFlag?: string;           // "in" (flag code)
  pillCountry?: string;        // "India"
  pillText?: string;           // "Clients served worldwide"
  heading?: string;            // "Your idea. Our solution."
  description?: string;        // Full description text
  buttonText?: string;         // "Start your project"
  buttonHref?: string;         // "/contact"
  showMap?: boolean;           // true
};
```

## Flag Pin Positions

Flag positions are stored in an array for easy editing:

```typescript
const flagPins: FlagPin[] = [
  { code: "us", name: "USA", top: 28, left: 18, delay: 0 },
  { code: "br", name: "Brazil", top: 62, left: 25, delay: 0.5 },
  { code: "gb", name: "UK", top: 22, left: 46, delay: 1 },
  { code: "fr", name: "France", top: 32, left: 48, delay: 1.5 },
  { code: "de", name: "Germany", top: 26, left: 52, delay: 2 },
  { code: "lt", name: "Lithuania", top: 24, left: 56, delay: 2.5 },
  { code: "in", name: "India", top: 48, left: 68, delay: 3 },
  { code: "my", name: "Malaysia", top: 54, left: 76, delay: 3.5 },
  { code: "id", name: "Indonesia", top: 64, left: 78, delay: 4 },
];
```

- `top` and `left` are percentages of the map area
- `delay` is in seconds for staggered animation

## Tailwind Config

No changes required to tailwind.config.ts. The component uses:
- Standard Tailwind utilities
- Custom inline styles for animations and gradients
- Existing font family configuration from your project

## Usage

```tsx
import CtaSection from "@/components/CtaSection";

// With defaults
<CtaSection />

// Customized
<CtaSection
  label="Ready to start?"
  pillFlag="us"
  pillCountry="USA"
  heading="Let's build something great"
  buttonText="Get in touch"
  buttonHref="/contact"
/>
```

## Assets Required

Ensure these files exist in your public directory:
- `/public/cta/world-dots.svg`
- `/public/cta/flags/{code}.svg` for each flag code used

## Browser Support

- Modern browsers with CSS Grid and Flexbox support
- Intersection Observer API (polyfill if needed for older browsers)
- CSS animations and transforms
