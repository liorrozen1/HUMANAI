# Font System Documentation

## Font Families

### 1. **Boska** (Display Font)
- **Usage**: Headings, titles, display text
- **Weights**: 200-900 (variable font + fallbacks)
- **Style**: Elegant serif, perfect for headings
- **CSS Class**: `.text-display`

### 2. **Zodiak** (Body Font)
- **Usage**: Body text, UI elements, readable content
- **Weights**: 100-900 (variable font + fallbacks)
- **Style**: Clean sans-serif, excellent readability
- **CSS Class**: `.text-body`

### 3. **Boxing** (Accent Font)
- **Usage**: Brand name, accent text, decorative elements
- **Weights**: 400 (regular only)
- **Style**: Bold, impactful, attention-grabbing
- **CSS Class**: `.text-accent`

## Usage Examples

```css
/* Display text (headings) */
h1, h2, h3 {
  font-family: var(--font-family-display); /* Boska */
}

/* Body text */
p, .text {
  font-family: var(--font-family-body); /* Zodiak */
}

/* Accent text */
.brand-name {
  font-family: var(--font-family-accent); /* Boxing */
}
```

## Typography Classes

- `.text-display` - Boska font for headings
- `.text-body` - Zodiak font for body text
- `.text-accent` - Boxing font for accent text

## Font Loading

All fonts are loaded with `font-display: swap` for optimal performance and user experience. Variable fonts are used when supported, with fallbacks for older browsers.

## Responsive Typography

Font sizes use `clamp()` functions for fluid scaling across devices:
- **Hero**: 2.5rem - 4rem
- **Section**: 1.75rem - 2.5rem
- **Subheading**: 1.25rem - 1.75rem
- **Body**: 1rem - 1.125rem
