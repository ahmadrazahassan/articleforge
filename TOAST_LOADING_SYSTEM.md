# Toast & Loading System Documentation

## Overview

Professional toast notification and loading progress system with no gradients, clean design, and proper user feedback.

## Components

### 1. Toast Notifications

#### Features
- Success, Error, Warning, Info types
- Auto-dismiss with configurable duration
- Manual close button
- Slide-in animation
- Stacked notifications
- No gradients - solid colors

#### Usage

```typescript
import { useToast } from '../components/ToastContainer';

const MyComponent = () => {
  const toast = useToast();

  // Success notification
  toast.showSuccess('Article generated', 'Your article is ready');

  // Error notification
  toast.showError('Generation failed', 'Please try again');

  // Warning notification
  toast.showWarning('Partial success', '5 of 10 articles generated');

  // Info notification
  toast.showInfo('Starting generation', 'Please wait...');
};
```

#### Toast Types

| Type | Color | Duration | Usage |
|------|-------|----------|-------|
| Success | Green (#a8e765) | 5s | Successful operations |
| Error | Red | 7s | Failed operations |
| Warning | Yellow | 6s | Partial success |
| Info | Blue (#4892db) | 5s | Information |

### 2. Loading Progress

#### Features
- Full-screen overlay
- Progress bar with percentage
- Current/Total counter
- Indeterminate mode
- Animated loader
- No gradients

#### Usage

```typescript
import LoadingProgress from '../components/LoadingProgress';

// With progress
<LoadingProgress 
  message="Generating articles..."
  progress={5}
  total={10}
/>

// Without progress (indeterminate)
<LoadingProgress 
  message="Generating article..."
/>
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| message | string | 'Generating article...' | Loading message |
| progress | number | undefined | Current progress |
| total | number | undefined | Total items |
| showPercentage | boolean | true | Show percentage |

## Implementation

### Setup

1. **Wrap App with ToastProvider**

```typescript
// src/App.tsx
import { ToastProvider } from './components/ToastContainer';

function App() {
  return (
    <ToastProvider>
      <Router />
    </ToastProvider>
  );
}
```

2. **Use Toast Hook**

```typescript
// In any component
import { useToast } from '../components/ToastContainer';

const MyComponent = () => {
  const toast = useToast();
  
  const handleAction = async () => {
    toast.showInfo('Starting...');
    
    try {
      await doSomething();
      toast.showSuccess('Complete!');
    } catch (error) {
      toast.showError('Failed', error.message);
    }
  };
};
```

3. **Add Loading State**

```typescript
const [isLoading, setIsLoading] = useState(false);
const [progress, setProgress] = useState({ current: 0, total: 0 });

// In render
{isLoading && (
  <LoadingProgress 
    message="Processing..."
    progress={progress.current}
    total={progress.total}
  />
)}
```

## Examples

### Single Article Generation

```typescript
const handleGenerate = async (formData) => {
  setIsLoading(true);
  toast.showInfo('Starting article generation');

  try {
    const article = await generateArticle(formData);
    toast.showSuccess('Article generated', article.title);
  } catch (error) {
    toast.showError('Generation failed', error.message);
  } finally {
    setIsLoading(false);
  }
};
```

### Bulk Generation with Progress

```typescript
const handleBulkGenerate = async (items) => {
  setIsLoading(true);
  setBulkProgress({ current: 0, total: items.length });
  toast.showInfo('Starting bulk generation', `${items.length} articles`);

  try {
    const { results, errors } = await generateBulkArticles(
      items,
      (current, total) => {
        setBulkProgress({ current, total });
      }
    );

    if (errors.length === 0) {
      toast.showSuccess('Complete', `Generated ${results.length} articles`);
    } else {
      toast.showWarning('Partial success', `${results.length} succeeded, ${errors.length} failed`);
    }
  } catch (error) {
    toast.showError('Bulk generation failed', error.message);
  } finally {
    setIsLoading(false);
    setBulkProgress(null);
  }
};
```

### Export Success

```typescript
const handleExport = async () => {
  toast.showInfo('Exporting articles...');
  
  try {
    await exportArticles();
    toast.showSuccess('Export complete', 'Files downloaded');
  } catch (error) {
    toast.showError('Export failed', error.message);
  }
};
```

## Styling

### Toast Colors

```css
/* Success */
bg-secondary text-darkgreen border-success

/* Error */
bg-red-100 text-red-900 border-red-600

/* Warning */
bg-yellow-100 text-yellow-900 border-yellow-600

/* Info */
bg-accent text-white border-accent
```

### Loading Progress

```css
/* Overlay */
bg-darkgreen/20 backdrop-blur-sm

/* Container */
bg-background border-4 border-darkgreen

/* Progress Bar */
bg-primary (filled)
bg-cream border-2 border-darkgreen (track)
```

## Animations

### Toast Slide In

```css
@keyframes slide-in {
  0% {
    transform: translateX(100%);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
}
```

### Progress Bar

```css
@keyframes progress {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(400%);
  }
}
```

## Best Practices

### Toast Messages

✅ **Do:**
- Keep messages concise
- Use descriptions for details
- Show success for completed actions
- Show errors with helpful messages
- Use warnings for partial success

❌ **Don't:**
- Use emojis or sparkles
- Make messages too long
- Show too many toasts at once
- Use gradients
- Forget to handle errors

### Loading States

✅ **Do:**
- Show progress when available
- Use descriptive messages
- Update progress in real-time
- Disable interactions during loading
- Show completion feedback

❌ **Don't:**
- Block UI unnecessarily
- Show loading without feedback
- Use gradients
- Forget to hide loading state
- Use emojis or sparkles

## Accessibility

### Toast
- Auto-dismiss after duration
- Manual close button
- Keyboard accessible
- Screen reader friendly
- High contrast colors

### Loading
- Clear loading message
- Progress indication
- Backdrop prevents interaction
- Keyboard trap during loading
- Screen reader announcements

## Testing

### Toast Tests
```typescript
// Show toast
toast.showSuccess('Test message');

// Verify toast appears
expect(screen.getByText('Test message')).toBeInTheDocument();

// Verify auto-dismiss
await waitFor(() => {
  expect(screen.queryByText('Test message')).not.toBeInTheDocument();
}, { timeout: 6000 });
```

### Loading Tests
```typescript
// Show loading
setIsLoading(true);

// Verify loading appears
expect(screen.getByText('Generating article...')).toBeInTheDocument();

// Hide loading
setIsLoading(false);

// Verify loading disappears
expect(screen.queryByText('Generating article...')).not.toBeInTheDocument();
```

## Troubleshooting

### Toast not showing
- Verify ToastProvider wraps app
- Check useToast hook is called
- Verify toast methods are called correctly

### Loading not showing
- Check isLoading state
- Verify LoadingProgress component is rendered
- Check conditional rendering logic

### Progress not updating
- Verify progress state updates
- Check callback function
- Verify props are passed correctly

---

**Version**: 1.0.0
**Last Updated**: 2025
**Status**: Production Ready
**Design**: Clean, no gradients, professional
