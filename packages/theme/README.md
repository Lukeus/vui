# @vue-ui/theme

Enterprise-grade theme system for Vue UI component library using Tailwind CSS 4 with OKLCH colors and semantic tokens.

## Features

- **OKLCH Color System** - Modern color space with better perceptual uniformity and wider P3 gamut support
- **Semantic Tokens** - Business-meaningful color names (brand, success, danger, warning, info)
- **Dark Mode** - Automatic semantic token adaptation for dark themes
- **Comprehensive Palette** - 19 color families with 11 shades each (50-950)
- **Design Tokens** - Spacing, typography, shadows, borders, and animations
- **Enterprise Ready** - Consistent elevation, text hierarchy, and border systems

## Installation

```bash
pnpm add @vue-ui/theme
```

## Usage

Import the theme in your application entry point:

```typescript
import '@vue-ui/theme/theme.css'
```

The theme automatically provides:

- All Tailwind CSS 4 utilities with OKLCH colors
- Semantic token utilities (e.g., `bg-brand-500`, `text-success-700`)
- Design system tokens accessible via CSS variables

## Theme Architecture

### 1. Raw Color Palette (OKLCH)

19 color families with 11 shades (50-950):

- **Reds/Oranges**: red, orange, amber, yellow
- **Greens**: lime, green, emerald, teal
- **Blues**: cyan, sky, blue, indigo
- **Purples**: violet, purple, fuchsia, pink, rose
- **Neutrals**: gray, zinc, neutral, stone

Example OKLCH value:

```css
--color-blue-500: oklch(62.3% 0.214 259.815);
/* Lightness: 62.3%, Chroma: 0.214, Hue: 259.815deg */
```

### 2. Semantic Tokens (Enterprise Layer)

Semantic tokens map to raw colors but provide business meaning:

#### Brand Colors

Use for primary brand identity, CTAs, and key actions:

```css
--color-brand-500  /* Primary brand color (blue-500) */
--color-brand-600  /* Hover states */
--color-brand-700  /* Active states */
```

**Tailwind utilities**: `bg-brand-500`, `text-brand-600`, `border-brand-700`

#### State Colors

Use for feedback and status communication:

**Success** (green):

```css
--color-success-500  /* Success messages, confirmations */
--color-success-100  /* Success background */
```

**Warning** (amber):

```css
--color-warning-500  /* Warnings, cautions */
--color-warning-100  /* Warning background */
```

**Danger** (red):

```css
--color-danger-500   /* Errors, destructive actions */
--color-danger-100   /* Error background */
```

**Info** (sky):

```css
--color-info-500     /* Informational messages */
--color-info-100     /* Info background */
```

#### Surface Colors (Elevation System)

Use for consistent layering:

```css
--color-surface-base     /* Page background (white/zinc-950) */
--color-surface-raised   /* Card backgrounds (gray-50/zinc-900) */
--color-surface-overlay  /* Modal/dropdown backgrounds (white/zinc-800) */
```

**Example**:

```vue
<div class="bg-[var(--color-surface-base)]">
  <div class="bg-[var(--color-surface-raised)] shadow-raised">
    Card content
  </div>
</div>
```

#### Text Hierarchy

Use for consistent text contrast:

```css
--color-text-primary    /* Headings, primary content (zinc-950/white) */
--color-text-secondary  /* Body text, labels (zinc-600/zinc-400) */
--color-text-tertiary   /* Captions, metadata (zinc-500) */
--color-text-disabled   /* Disabled text (zinc-400/zinc-600) */
--color-text-inverse    /* Text on dark backgrounds (white/zinc-950) */
```

**Example**:

```vue
<h1 class="text-[var(--color-text-primary)]">Heading</h1>
<p class="text-[var(--color-text-secondary)]">Body text</p>
<span class="text-[var(--color-text-tertiary)]">Caption</span>
```

#### Border System

Use for consistent borders:

```css
--color-border-subtle   /* Light dividers (zinc-200/zinc-800) */
--color-border-default  /* Default borders (zinc-300/zinc-700) */
--color-border-strong   /* Emphasized borders (zinc-400/zinc-600) */
```

#### Semantic Shadows

Use for elevation consistency:

```css
--shadow-raised    /* Cards, raised elements (sm) */
--shadow-floating  /* Buttons, interactive elements (md) */
--shadow-overlay   /* Modals, dropdowns (xl) */
```

**Tailwind utilities**: `shadow-raised`, `shadow-floating`, `shadow-overlay`

### 3. Component Spacing Tokens

Consistent spacing for components:

```css
--space-component-padding-sm: 0.5rem; /* 8px */
--space-component-padding-md: 1rem; /* 16px */
--space-component-padding-lg: 1.5rem; /* 24px */
--space-component-gap-sm: 0.5rem;
--space-component-gap-md: 1rem;
--space-component-gap-lg: 1.5rem;
```

## Dark Mode

Dark mode automatically adjusts semantic tokens. Enable by adding `dark` class to root:

```vue
<html class="dark">
  <!-- Semantic tokens automatically adapt -->
</html>
```

**Dark mode changes**:

- `--color-surface-base`: white → zinc-950
- `--color-text-primary`: zinc-950 → white
- `--color-border-default`: zinc-300 → zinc-700

Raw color tokens remain unchanged - only semantic tokens adapt.

## Customization

### Option 1: Override Semantic Tokens (Recommended)

Override semantic tokens in your app's CSS to customize theme:

```css
@import '@vue-ui/theme/theme.css';

@theme {
  /* Customize brand colors to your brand */
  --color-brand-50: var(--color-indigo-50);
  --color-brand-100: var(--color-indigo-100);
  --color-brand-500: var(--color-indigo-500);
  --color-brand-600: var(--color-indigo-600);
  /* ... other shades */
}
```

### Option 2: Custom Color Palette

Add custom colors while keeping semantic tokens:

```css
@import '@vue-ui/theme/theme.css';

@theme {
  /* Add custom color */
  --color-custom-500: oklch(65% 0.25 350);

  /* Map to semantic token */
  --color-brand-500: var(--color-custom-500);
}
```

### Option 3: Full Theme Override

Create your own theme.css based on our structure:

```css
@theme {
  /* Define your color palette */
  --color-primary-500: oklch(60% 0.2 250);

  /* Map semantic tokens */
  --color-brand-500: var(--color-primary-500);
  --color-success-500: oklch(70% 0.19 150);
  /* ... */
}
```

## Best Practices

### 1. Prefer Semantic Tokens

❌ Don't use raw colors in components:

```vue
<button class="bg-blue-500">Click</button>
```

✅ Use semantic tokens:

```vue
<button class="bg-brand-500">Click</button>
```

### 2. Use Surface Tokens for Backgrounds

❌ Hardcoded backgrounds:

```vue
<div class="bg-white dark:bg-zinc-950"></div>
```

✅ Semantic surface:

```vue
<div class="bg-[var(--color-surface-base)]"></div>
```

### 3. Consistent Text Hierarchy

❌ Arbitrary text colors:

```vue
<p class="text-gray-700">Body</p>
```

✅ Semantic text:

```vue
<p class="text-[var(--color-text-secondary)]">Body</p>
```

## Accessibility

All color tokens meet WCAG 2.1 AA contrast requirements:

- **Normal text**: 4.5:1 minimum contrast ratio
- **Large text** (18pt+): 3:1 minimum contrast ratio

The OKLCH color space ensures perceptually uniform lightness, making it easier to maintain consistent contrast across hues.

## Browser Support

- **Modern browsers**: Full OKLCH support with P3 gamut
- **Fallback**: Automatic sRGB conversion for older browsers
- **Minimum**: Chrome 111+, Safari 16.4+, Firefox 113+

## Resources

- [OKLCH Color Picker](https://oklch.com/)
- [Tailwind CSS 4 Docs](https://tailwindcss.com/docs)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
