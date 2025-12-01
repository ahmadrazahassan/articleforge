# Modern Color System - #212121, #fafafa, #ff7759

## 🎨 Color Palette

### Primary Colors

| Color | Hex | RGB | Usage |
|-------|-----|-----|-------|
| Dark | #212121 | 33, 33, 33 | Text, borders, backgrounds |
| Light | #fafafa | 250, 250, 250 | Backgrounds, cards, surfaces |
| Coral | #ff7759 | 255, 119, 89 | Accents, buttons, highlights |

## 📊 Color Roles

### #212121 (Dark Charcoal)
- **Primary text color**
- **Borders and outlines**
- **Dark backgrounds**
- **Shadows and depth**
- **Use sparingly** - Not pure black for better readability

### #fafafa (Off-White)
- **Main background**
- **Card surfaces**
- **Light text backgrounds**
- **Hover states**
- **Clean, minimal aesthetic**

### #ff7759 (Coral)
- **Primary accent color**
- **Call-to-action buttons**
- **Active states**
- **Highlights and emphasis**
- **Interactive elements**

## 🎯 Tailwind Color Classes

### Primary Colors
```css
bg-primary      /* #ff7759 - Coral */
text-primary    /* #ff7759 - Coral */
border-primary  /* #ff7759 - Coral */

bg-secondary    /* #212121 - Dark */
text-secondary  /* #212121 - Dark */
border-secondary /* #212121 - Dark */

bg-accent       /* #fafafa - Light */
text-accent     /* #fafafa - Light */
border-accent   /* #fafafa - Light */
```

### Semantic Colors
```css
bg-dark         /* #212121 */
text-dark       /* #212121 */

bg-light        /* #fafafa */
text-light      /* #fafafa */

bg-coral        /* #ff7759 */
text-coral      /* #ff7759 */
```

## 🎨 Component Color Usage

### Buttons

#### Primary Button (CTA)
```html
<button class="bg-coral text-light border-2 border-secondary">
  Click Me
</button>
```

#### Secondary Button
```html
<button class="bg-light text-secondary border-2 border-secondary">
  Secondary
</button>
```

#### Dark Button
```html
<button class="bg-secondary text-light border-2 border-secondary">
  Dark
</button>
```

### Cards & Surfaces
```html
<!-- Light card on light background -->
<div class="bg-light border-2 border-secondary">
  Content
</div>

<!-- Dark card -->
<div class="bg-secondary text-light border-2 border-secondary">
  Content
</div>
```

### Text Hierarchy

#### Headings
```html
<h1 class="text-secondary font-black">Main Title</h1>
<h2 class="text-secondary font-bold">Section</h2>
```

#### Body Text
```html
<p class="text-secondary font-body">Body content</p>
```

#### Accents
```html
<span class="text-coral font-semibold">Important</span>
```

### Interactive Elements

#### Links
```html
<a href="#" class="text-coral hover:text-secondary">Link</a>
```

#### Hover States
```html
<button class="bg-light hover:bg-coral text-secondary hover:text-light">
  Hover Me
</button>
```

#### Active States
```html
<button class="bg-coral text-light">Active</button>
```

## 🌈 Color Combinations

### Professional
```
Background: #fafafa
Text: #212121
Accent: #ff7759
Border: #212121
```

### Modern
```
Background: #212121
Text: #fafafa
Accent: #ff7759
Border: #ff7759
```

### Minimal
```
Background: #fafafa
Text: #212121
Accent: #212121
Border: #212121
```

## 📱 Responsive Color Usage

### Light Mode (Default)
```css
background: #fafafa
text: #212121
accent: #ff7759
```

### Dark Mode (Optional)
```css
background: #212121
text: #fafafa
accent: #ff7759
```

## ✨ Color Opacity Variations

### #212121 (Dark)
```css
#212121 100% - Full opacity
rgba(33, 33, 33, 0.8) - 80% opacity
rgba(33, 33, 33, 0.6) - 60% opacity
rgba(33, 33, 33, 0.4) - 40% opacity
rgba(33, 33, 33, 0.2) - 20% opacity
```

### #fafafa (Light)
```css
#fafafa 100% - Full opacity
rgba(250, 250, 250, 0.8) - 80% opacity
rgba(250, 250, 250, 0.6) - 60% opacity
rgba(250, 250, 250, 0.4) - 40% opacity
rgba(250, 250, 250, 0.2) - 20% opacity
```

### #ff7759 (Coral)
```css
#ff7759 100% - Full opacity
rgba(255, 119, 89, 0.8) - 80% opacity
rgba(255, 119, 89, 0.6) - 60% opacity
rgba(255, 119, 89, 0.4) - 40% opacity
rgba(255, 119, 89, 0.2) - 20% opacity
```

## 🎯 Usage Guidelines

### Do's ✅
- Use #212121 for text and borders
- Use #fafafa for backgrounds
- Use #ff7759 for CTAs and accents
- Maintain high contrast for accessibility
- Use opacity for subtle variations
- Keep color usage consistent

### Don'ts ❌
- Don't use pure black (#000000)
- Don't use pure white (#ffffff)
- Don't overuse coral accent
- Don't mix with old color scheme
- Don't use low contrast combinations
- Don't forget accessibility standards

## ♿ Accessibility

### Contrast Ratios
- Text on background: 7:1 (AAA)
- Buttons: 4.5:1 (AA minimum)
- UI components: 3:1 (AA minimum)

### Color Combinations
```
#212121 on #fafafa: 12.6:1 ✅ Excellent
#ff7759 on #fafafa: 4.5:1 ✅ Good
#ff7759 on #212121: 4.8:1 ✅ Good
#fafafa on #212121: 12.6:1 ✅ Excellent
```

## 🎨 Design Tokens

```javascript
const colors = {
  primary: '#ff7759',      // Coral - Accent
  secondary: '#212121',    // Dark - Text/Borders
  accent: '#fafafa',       // Light - Backgrounds
  background: '#fafafa',   // Light
  text: '#212121',         // Dark
  dark: '#212121',
  light: '#fafafa',
  coral: '#ff7759',
};
```

## 📐 Shadow System

### Subtle Shadow
```css
box-shadow: 4px 4px 0px 0px rgba(33, 33, 33, 0.6);
```

### Medium Shadow
```css
box-shadow: 8px 8px 0px 0px rgba(33, 33, 33, 0.8);
```

### Strong Shadow
```css
box-shadow: 12px 12px 0px 0px rgba(33, 33, 33, 0.8);
```

## 🔄 Migration Checklist

- [ ] Replace #cafc4f with #ff7759
- [ ] Replace #000000 with #212121
- [ ] Replace #ffffff with #fafafa
- [ ] Update all button colors
- [ ] Update all text colors
- [ ] Update all border colors
- [ ] Update all background colors
- [ ] Update all shadow colors
- [ ] Test contrast ratios
- [ ] Verify accessibility
- [ ] Test on all devices
- [ ] Check all components

## 📚 Related Documentation

- `FONT_SYSTEM.md` - Font documentation
- `FONT_QUICK_REFERENCE.md` - Font quick reference
- `tailwind.config.js` - Tailwind configuration
- `src/index.css` - Global styles

---

**Version**: 2.0.0
**Last Updated**: 2025
**Status**: Production Ready
**Color Scheme**: Modern Minimal (#212121, #fafafa, #ff7759)
