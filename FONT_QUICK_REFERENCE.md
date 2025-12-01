# Font System - Quick Reference

## 🎯 Font Usage at a Glance

| Element | Font | Weight | Size | Usage |
|---------|------|--------|------|-------|
| H1 | Montserrat | 900 | 3.5rem | Main titles |
| H2 | Montserrat | 800 | 2.5rem | Section headers |
| H3 | Montserrat | 700 | 1.875rem | Subsections |
| Body | Nunito Sans | 400 | 1rem | Paragraphs |
| Small | Nunito Sans | 400 | 0.875rem | Descriptions |
| Button | Outfit | 600 | 1rem | UI buttons |
| Label | Outfit | 600 | 0.875rem | Form labels |
| Code | Outfit | 500 | 0.875rem | Code blocks |

## 🚀 Quick Implementation

### Headings
```html
<h1 class="font-black text-5xl tracking-tight">Title</h1>
<h2 class="font-bold text-4xl tracking-tight">Section</h2>
<h3 class="font-bold text-3xl">Subsection</h3>
```

### Body Text
```html
<p class="font-body text-base leading-relaxed">Content...</p>
<span class="font-body text-sm">Small text</span>
```

### UI Elements
```html
<button class="font-ui font-semibold">Button</button>
<label class="font-ui font-semibold text-xs uppercase">Label</label>
```

## 📊 Font Stack Priority

```
1. SF Pro (System - Instant)
2. Montserrat (Google Fonts - Bold)
3. Nunito Sans (Google Fonts - Body)
4. Outfit (Google Fonts - UI)
5. System UI (Fallback)
```

## ✨ Font Characteristics

### Montserrat
- **Style**: Bold, Strong, Geometric
- **Best for**: Headings, Display
- **Personality**: Modern, Professional
- **Weights**: 300-900

### Nunito Sans
- **Style**: Friendly, Readable, Rounded
- **Best for**: Body, Content
- **Personality**: Approachable, Clear
- **Weights**: 300-900

### Outfit
- **Style**: Modern, Clean, Geometric
- **Best for**: UI, Buttons, Labels
- **Personality**: Contemporary, Minimal
- **Weights**: 300-900

### SF Pro
- **Style**: System, Optimized
- **Best for**: Fallback, Performance
- **Personality**: Native, Integrated
- **Weights**: 300-700

## 🎨 Common Combinations

### Professional
```
h1: Montserrat 700
p: Nunito Sans 400
button: Outfit 600
```

### Modern
```
h1: Outfit 700
p: Nunito Sans 400
button: Outfit 500
```

### Bold
```
h1: Montserrat 900
p: Nunito Sans 400
button: Outfit 600
```

## 📱 Responsive Sizes

```css
/* Mobile */
h1: 1.875rem
h2: 1.5rem
p: 1rem

/* Tablet (768px+) */
h1: 2.5rem
h2: 2rem
p: 1rem

/* Desktop (1024px+) */
h1: 3.5rem
h2: 2.5rem
p: 1rem
```

## 🔤 Font Weight Reference

| Class | Weight | Usage |
|-------|--------|-------|
| font-light | 300 | Minimal |
| font-regular | 400 | Body text |
| font-medium | 500 | UI elements |
| font-semibold | 600 | Emphasis |
| font-bold | 700 | Headings |
| font-black | 900 | Display |

## 📏 Letter Spacing

| Class | Value | Usage |
|-------|-------|-------|
| tracking-tight | -0.02em | Headings |
| tracking-normal | 0 | Body |
| tracking-wide | 0.025em | Labels |
| tracking-wider | 0.05em | Uppercase |
| tracking-widest | 0.1em | Emphasis |

## 📐 Line Height

| Class | Value | Usage |
|-------|-------|-------|
| leading-tight | 1.25 | Headings |
| leading-snug | 1.375 | Subheadings |
| leading-normal | 1.5 | Default |
| leading-relaxed | 1.625 | Body |
| leading-loose | 2 | Lists |

## ✅ Checklist

- [ ] All headings use Montserrat
- [ ] All body text uses Nunito Sans
- [ ] All UI elements use Outfit
- [ ] Font weights are consistent
- [ ] Letter-spacing applied to headings
- [ ] Line-height is appropriate
- [ ] Responsive sizes work
- [ ] Accessibility standards met

## 🔗 Resources

- `FONT_SYSTEM.md` - Complete font documentation
- `src/fonts.css` - Font utility classes
- `tailwind.config.js` - Tailwind font configuration
- `src/index.css` - Global font imports

---

**Quick Tip**: Use `font-display`, `font-heading`, `font-body`, and `font-ui` classes for consistent font usage across the website.
