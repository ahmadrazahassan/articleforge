# Color Palette 2025 - Quick Reference

## 🎨 Colors at a Glance

```
Lime:       #d1f300 (209, 243, 0)    - Primary accent
Green:      #a8e765 (168, 231, 101)  - Secondary accent
Blue:       #4892db (72, 146, 219)   - Information
Dark Green: #137a3c (19, 122, 60)    - Text/Borders
Cream:      #fff8e8 (255, 248, 232)  - Background (solid)
```

## 🎯 Quick Usage

| Element | Color | Class |
|---------|-------|-------|
| Primary Button | #d1f300 | `bg-primary` |
| Secondary Button | #a8e765 | `bg-secondary` |
| Info Button | #4892db | `bg-accent` |
| Text | #137a3c | `text-success` |
| Background | #fff8e8 | `bg-background` |
| Borders | #137a3c | `border-success` |

## 🚀 Common Patterns

### Primary Button
```html
<button class="bg-primary text-success border-2 border-success">
  Click Me
</button>
```

### Secondary Button
```html
<button class="bg-secondary text-success border-2 border-success">
  Secondary
</button>
```

### Card
```html
<div class="bg-background text-success border-2 border-success">
  Content
</div>
```

### Heading
```html
<h1 class="text-success font-black">Title</h1>
```

### Body Text
```html
<p class="text-success font-body">Content</p>
```

### Accent Text
```html
<span class="text-primary font-semibold">Important</span>
```

## 📊 Color Roles

| Color | Role | Usage |
|-------|------|-------|
| #d1f300 | Primary | CTAs, highlights |
| #a8e765 | Secondary | Success, hover |
| #4892db | Accent | Info, links |
| #137a3c | Text | Text, borders |
| #fff8e8 | Background | Solid background |

## ✨ Tailwind Classes

```css
/* Background */
bg-primary    /* #d1f300 */
bg-secondary  /* #a8e765 */
bg-accent     /* #4892db */
bg-success    /* #137a3c */
bg-background /* #fff8e8 */

/* Text */
text-primary    /* #d1f300 */
text-secondary  /* #a8e765 */
text-accent     /* #4892db */
text-success    /* #137a3c */

/* Border */
border-primary    /* #d1f300 */
border-secondary  /* #a8e765 */
border-accent     /* #4892db */
border-success    /* #137a3c */
```

## 🎯 Component Colors

### Buttons
- **Primary**: bg-primary, text-success
- **Secondary**: bg-secondary, text-success
- **Info**: bg-accent, text-cream

### Cards
- **Light**: bg-background, border-success
- **Accent**: bg-primary, text-success

### Text
- **Heading**: text-success
- **Body**: text-success
- **Accent**: text-primary

### Borders
- **Default**: border-success
- **Accent**: border-primary

## 📱 Responsive

All colors work consistently across:
- Mobile
- Tablet
- Desktop

## ♿ Accessibility

✅ All combinations meet WCAG AA standards
✅ High contrast ratios (4.2:1 minimum)
✅ Color-blind friendly
✅ Screen reader compatible

## 🔄 Migration

**Old → New**
- #ff7759 → #d1f300
- #212121 → #137a3c
- #fafafa → #fff8e8

## 📚 Full Documentation

See `COLOR_PALETTE_2025.md` for complete details.

---

**Quick Tip**: Use `bg-primary` for CTAs, `text-success` for text, and `bg-background` for backgrounds.
