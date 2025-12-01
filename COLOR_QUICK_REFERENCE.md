# Color System - Quick Reference

## 🎨 Color Palette

```
Dark:   #212121 (33, 33, 33)
Light:  #fafafa (250, 250, 250)
Coral:  #ff7759 (255, 119, 89)
```

## 🎯 Quick Usage

| Element | Color | Class |
|---------|-------|-------|
| Text | #212121 | `text-secondary` |
| Background | #fafafa | `bg-accent` |
| Buttons | #ff7759 | `bg-primary` |
| Borders | #212121 | `border-secondary` |
| Accents | #ff7759 | `text-coral` |

## 🚀 Common Patterns

### Primary Button
```html
<button class="bg-coral text-light border-2 border-secondary">
  Click Me
</button>
```

### Secondary Button
```html
<button class="bg-light text-secondary border-2 border-secondary">
  Secondary
</button>
```

### Card
```html
<div class="bg-light text-secondary border-2 border-secondary">
  Content
</div>
```

### Heading
```html
<h1 class="text-secondary font-black">Title</h1>
```

### Body Text
```html
<p class="text-secondary font-body">Content</p>
```

### Accent Text
```html
<span class="text-coral font-semibold">Important</span>
```

## 📊 Color Roles

| Color | Role | Usage |
|-------|------|-------|
| #212121 | Primary | Text, borders, dark elements |
| #fafafa | Secondary | Backgrounds, light surfaces |
| #ff7759 | Accent | Buttons, highlights, CTAs |

## ✨ Opacity Levels

```css
100% - Full color
80%  - Slightly transparent
60%  - Medium transparency
40%  - Light transparency
20%  - Very light
```

## 🎨 Tailwind Classes

```css
/* Background */
bg-primary    /* #ff7759 */
bg-secondary  /* #212121 */
bg-accent     /* #fafafa */
bg-dark       /* #212121 */
bg-light      /* #fafafa */
bg-coral      /* #ff7759 */

/* Text */
text-primary    /* #ff7759 */
text-secondary  /* #212121 */
text-accent     /* #fafafa */
text-dark       /* #212121 */
text-light      /* #fafafa */
text-coral      /* #ff7759 */

/* Border */
border-primary    /* #ff7759 */
border-secondary  /* #212121 */
border-accent     /* #fafafa */
border-dark       /* #212121 */
border-light      /* #fafafa */
border-coral      /* #ff7759 */
```

## 🎯 Component Colors

### Buttons
- **Primary**: bg-coral, text-light
- **Secondary**: bg-light, text-secondary
- **Dark**: bg-secondary, text-light

### Cards
- **Light**: bg-light, border-secondary
- **Dark**: bg-secondary, text-light

### Text
- **Heading**: text-secondary
- **Body**: text-secondary
- **Accent**: text-coral

### Borders
- **Default**: border-secondary
- **Accent**: border-coral

## 📱 Responsive

All colors work consistently across:
- Mobile
- Tablet
- Desktop

## ♿ Accessibility

✅ All combinations meet WCAG AA standards
✅ High contrast ratios (4.5:1 minimum)
✅ Color-blind friendly
✅ Screen reader compatible

## 🔄 Migration

**Old → New**
- #cafc4f → #ff7759
- #000000 → #212121
- #ffffff → #fafafa

## 📚 Full Documentation

See `COLOR_SYSTEM.md` for complete details.

---

**Quick Tip**: Use `bg-primary` for buttons, `text-secondary` for text, and `bg-accent` for backgrounds.
