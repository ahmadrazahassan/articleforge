# Modern Font System - SF Pro, Montserrat, Nunito Sans, Outfit

## Overview

The website now uses a modern, professional font system with four carefully selected typefaces optimized for different use cases:

- **SF Pro** - System font (Apple ecosystem)
- **Montserrat** - Bold headings and display text
- **Nunito Sans** - Body text and readable content
- **Outfit** - UI elements and modern accents

## Font Usage Guide

### 1. Montserrat (Bold, Strong)
**Use for:** Headings, titles, display text, emphasis
**Weights:** 300, 400, 500, 600, 700, 800, 900
**Best for:** H1-H6 tags, page titles, section headers

```html
<h1 class="font-heading">Main Heading</h1>
<h2 class="font-display">Section Title</h2>
```

### 2. Nunito Sans (Readable, Friendly)
**Use for:** Body text, paragraphs, descriptions, content
**Weights:** 300, 400, 500, 600, 700, 800, 900
**Best for:** p, span, li, td, th tags, article content

```html
<p class="font-body">This is body text content...</p>
```

### 3. Outfit (Modern, Clean)
**Use for:** UI elements, buttons, labels, forms
**Weights:** 300, 400, 500, 600, 700, 800, 900
**Best for:** button, input, select, label, UI components

```html
<button class="font-ui">Click Me</button>
<label class="font-ui">Form Label</label>
```

### 4. SF Pro (System Font)
**Use for:** Fallback, system integration
**Best for:** System-level text, optimal performance

## Font Stack Hierarchy

```
Display/Headings:
Outfit → Montserrat → SF Pro Display → System UI

Body Text:
Nunito Sans → SF Pro Text → System UI

UI Elements:
Outfit → SF Pro Display → System UI

Monospace:
Outfit → SF Mono → Monaco → System Monospace
```

## Tailwind Font Classes

### Font Family Classes
```css
font-sans      /* Default: SF Pro, Montserrat, Nunito Sans, Outfit */
font-display   /* Outfit, Montserrat */
font-heading   /* Montserrat */
font-body      /* Nunito Sans */
font-ui        /* Outfit */
font-mono      /* Outfit, Monospace */
```

### Font Weight Classes
```css
font-light     /* 300 */
font-regular   /* 400 */
font-medium    /* 500 */
font-semibold  /* 600 */
font-bold      /* 700 */
font-black     /* 900 */
```

### Text Size Classes
```css
text-xs        /* 0.75rem */
text-sm        /* 0.875rem */
text-base      /* 1rem */
text-lg        /* 1.125rem */
text-xl        /* 1.25rem */
text-2xl       /* 1.5rem */
text-3xl       /* 1.875rem */
text-4xl       /* 2.25rem */
text-5xl       /* 3rem */
```

### Letter Spacing Classes
```css
tracking-tight    /* -0.02em */
tracking-normal   /* 0 */
tracking-wide     /* 0.025em */
tracking-wider    /* 0.05em */
tracking-widest   /* 0.1em */
```

### Line Height Classes
```css
leading-tight     /* 1.25 */
leading-snug      /* 1.375 */
leading-normal    /* 1.5 */
leading-relaxed   /* 1.625 */
leading-loose     /* 2 */
```

## Component Font Usage

### Headings
```html
<!-- H1: Montserrat 900, -0.03em tracking -->
<h1 class="font-black text-5xl tracking-tight">Main Title</h1>

<!-- H2: Montserrat 800, -0.02em tracking -->
<h2 class="font-bold text-4xl tracking-tight">Section</h2>

<!-- H3: Montserrat 700 -->
<h3 class="font-bold text-3xl">Subsection</h3>
```

### Body Text
```html
<!-- Paragraph: Nunito Sans 400 -->
<p class="font-body text-base leading-relaxed">
  Content goes here...
</p>

<!-- Small text: Nunito Sans 400 -->
<span class="font-body text-sm">Small content</span>
```

### UI Elements
```html
<!-- Button: Outfit 600 -->
<button class="font-ui font-semibold text-base">
  Click Me
</button>

<!-- Label: Outfit 600, uppercase -->
<label class="font-ui font-semibold text-xs uppercase tracking-wider">
  Form Label
</label>

<!-- Input: Outfit 500 -->
<input class="font-ui font-medium" type="text" />
```

## Performance Optimization

### Font Loading Strategy
1. **System fonts first** (SF Pro) - Instant rendering
2. **Google Fonts** - Cached after first load
3. **Fallback chain** - Ensures readability

### Font Weights Used
- **300** - Light (minimal use)
- **400** - Regular (body text)
- **500** - Medium (UI elements)
- **600** - Semibold (emphasis)
- **700** - Bold (headings)
- **800** - Extra Bold (strong headings)
- **900** - Black (display text)

## Best Practices

### Do's ✅
- Use Montserrat for all headings
- Use Nunito Sans for body content
- Use Outfit for buttons and forms
- Maintain consistent font weights
- Use letter-spacing for headings
- Use line-height for readability

### Don'ts ❌
- Don't mix fonts randomly
- Don't use too many font weights
- Don't use light fonts for body text
- Don't forget letter-spacing on headings
- Don't use display fonts for body text

## Font Combinations

### Professional
```
Heading: Montserrat 700
Body: Nunito Sans 400
UI: Outfit 600
```

### Modern
```
Heading: Outfit 700
Body: Nunito Sans 400
UI: Outfit 500
```

### Bold
```
Heading: Montserrat 900
Body: Nunito Sans 400
UI: Outfit 600
```

## Responsive Font Sizes

```css
/* Mobile */
h1 { font-size: 1.875rem; }
h2 { font-size: 1.5rem; }
p { font-size: 1rem; }

/* Tablet */
@media (min-width: 768px) {
  h1 { font-size: 2.5rem; }
  h2 { font-size: 2rem; }
}

/* Desktop */
@media (min-width: 1024px) {
  h1 { font-size: 3.5rem; }
  h2 { font-size: 2.5rem; }
}
```

## Accessibility

### Font Size Minimums
- Body text: 16px minimum
- Small text: 14px minimum
- Labels: 12px minimum

### Contrast Ratios
- Headings: 7:1 (AAA)
- Body text: 4.5:1 (AA)
- UI elements: 4.5:1 (AA)

### Line Height
- Body text: 1.5-1.625
- Headings: 1.1-1.3
- Lists: 1.6-1.8

## Migration Guide

### Old Font System
```css
font-family: 'Space Grotesk', system-ui, sans-serif;
```

### New Font System
```css
font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 
             'Montserrat', 'Nunito Sans', 'Outfit', system-ui, sans-serif;
```

## Testing Checklist

- [ ] Headings use Montserrat
- [ ] Body text uses Nunito Sans
- [ ] UI elements use Outfit
- [ ] Font weights are consistent
- [ ] Letter-spacing is applied to headings
- [ ] Line-height is appropriate
- [ ] Responsive sizes work correctly
- [ ] Accessibility standards met
- [ ] Performance is optimized
- [ ] All browsers render correctly

---

**Version**: 2.0.0
**Last Updated**: 2025
**Status**: Production Ready
