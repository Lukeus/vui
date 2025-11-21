# Accessibility

## Overview

This component library is built with accessibility as a core requirement, targeting WCAG 2.1 Level AA compliance. Every component is designed to be usable by everyone, regardless of ability.

## Accessibility Features

### Semantic HTML

All components use proper semantic HTML elements:

```vue
<!-- Button uses native <button> element -->
<Button>Click me</Button>
<!-- renders as <button> -->

<!-- Table uses native table elements -->
<Table :columns="columns" :data="data" />
<!-- renders with <table>, <thead>, <tbody>, <th>, <td> -->

<!-- Navbar uses <nav> element -->
<Navbar>...</Navbar>
<!-- renders as <nav role="navigation"> -->
```

### ARIA Attributes

Components include appropriate ARIA attributes:

- **Badge**: `role="status"` and `aria-live="polite"` for dynamic content
- **Alert**: `role="alert"` for important messages
- **Table**: `role="table"` with optional caption for context
- **Button**: `aria-busy="true"` when loading
- **CommandPalette**: Complete ARIA dialog and combobox implementation

### Keyboard Navigation

All interactive components support keyboard navigation:

| Component      | Keyboard Support                                |
| -------------- | ----------------------------------------------- |
| Button         | `Enter` / `Space` to activate                   |
| CommandPalette | `↑` / `↓` navigate, `Enter` select, `Esc` close |
| Table          | Tab through interactive cells                   |
| Alert          | `Esc` to dismiss (when dismissible)             |
| Tooltip        | Shows on focus, hides on blur                   |

### Focus Management

Visual focus indicators and focus trap utilities:

```typescript
// Focus trap utility
import { trapFocus } from '@vue-ui/ui/utils'

const dialogRef = ref<HTMLElement>()

onMounted(() => {
  if (dialogRef.value) {
    const cleanup = trapFocus(dialogRef.value)
    onUnmounted(cleanup)
  }
})
```

Focus utilities available:

- `trapFocus(element)`: Trap focus within an element
- `getFocusableElements(element)`: Get all focusable children
- `focusFirst(element)`: Focus first focusable element
- `focusLast(element)`: Focus last focusable element

### Screen Reader Support

All components provide screen reader context:

```vue
<!-- Descriptive button text -->
<Button>
  <TrashIcon /> Delete Account
</Button>

<!-- Or use aria-label for icon-only buttons -->
<Button aria-label="Delete account">
  <TrashIcon />
</Button>

<!-- Hidden text for context -->
<Badge variant="success">
  Active
  <span class="sr-only">User status</span>
</Badge>
```

The `.sr-only` class hides content visually but keeps it accessible to screen readers:

```css
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
```

### Color Contrast

All color combinations meet WCAG AA standards:

- Text on surfaces: Minimum 4.5:1 contrast ratio
- Large text: Minimum 3:1 contrast ratio
- UI components: Minimum 3:1 contrast ratio
- Focus indicators: High contrast borders

Semantic color tokens ensure proper contrast:

```css
/* Light mode - high contrast */
--color-text-primary: zinc-900;
--color-surface-base: white;

/* Dark mode - high contrast */
--color-text-primary: zinc-50;
--color-surface-base: zinc-900;
```

### Motion Preferences

All animations respect `prefers-reduced-motion`:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

Users who prefer reduced motion will see instant state changes instead of animations.

## Component-Specific Guidelines

### Buttons

✅ **Do:**

- Use descriptive text that explains the action
- Add `aria-label` for icon-only buttons
- Use `loading` prop to show loading state
- Use semantic variants (danger for destructive actions)

❌ **Don't:**

- Use vague text like "Click here"
- Rely on color alone to convey meaning
- Disable buttons without explanation

```vue
<!-- Good -->
<Button variant="danger" aria-label="Delete account" :loading="deleting">
  <TrashIcon /> Delete Account
</Button>

<!-- Avoid -->
<Button disabled>Submit</Button>
<!-- No context why disabled -->
```

### Forms

✅ **Do:**

- Provide visible labels for all inputs
- Show clear error messages
- Use proper input types
- Mark required fields

❌ **Don't:**

- Use placeholder as label
- Show generic error messages
- Remove labels for visual simplicity

```vue
<!-- Good -->
<Input v-model="email" type="email" label="Email Address" :error="emailError" required aria-describedby="email-hint" />
<p id="email-hint" class="text-sm text-zinc-500">
  We'll never share your email
</p>

<!-- Avoid -->
<input v-model="email" placeholder="Email" />
<!-- Missing label -->
```

### Alerts

✅ **Do:**

- Use semantic variants (success, warning, danger, info)
- Provide clear, actionable titles
- Make dismissible alerts keyboard accessible
- Use `role="alert"` for important messages

```vue
<Alert variant="danger" title="Error" dismissible>
  Failed to save changes. Please try again.
</Alert>
```

### Tables

✅ **Do:**

- Provide a caption for context
- Use proper table structure
- Make sortable columns keyboard accessible
- Provide row/column headers

```vue
<Table :columns="columns" :data="users" caption="List of active users" />
```

### Overlays (Modals, Dialogs, Command Palette)

✅ **Do:**

- Trap focus within the overlay
- Close on `Esc` key
- Restore focus when closed
- Provide accessible close buttons
- Use ARIA dialog roles

The CommandPalette component handles all of this automatically:

```vue
<CommandPalette v-model:open="isOpen" :items="commands" />
```

### Tooltips

✅ **Do:**

- Keep content brief
- Show on hover and focus
- Use for supplementary information only
- Ensure content is also available elsewhere

❌ **Don't:**

- Put critical information only in tooltips
- Use for complex content
- Hide interactive elements in tooltips

```vue
<!-- Good - supplementary info -->
<Tooltip content="Shortcut: ⌘S">
  <Button>Save</Button>
</Tooltip>

<!-- Avoid - critical info hidden -->
<Tooltip content="Required field">
  <Input v-model="name" />
</Tooltip>
```

## Testing for Accessibility

### Manual Testing

1. **Keyboard Only**: Navigate your app using only the keyboard
   - Can you reach all interactive elements?
   - Are focus indicators visible?
   - Can you close modals with `Esc`?

2. **Screen Reader**: Test with a screen reader (NVDA, JAWS, VoiceOver)
   - Are all elements announced correctly?
   - Is there sufficient context?
   - Can you complete tasks?

3. **Color Contrast**: Use browser DevTools or online tools
   - Do all text colors meet contrast requirements?
   - Is information conveyed without color alone?

4. **Motion**: Enable reduced motion in OS settings
   - Do animations respect the preference?
   - Is content still usable?

5. **Zoom**: Test at 200% zoom level
   - Does content reflow properly?
   - Are all features still accessible?

### Automated Testing

Use tools to catch common issues:

```bash
# Install axe-core
pnpm add -D @axe-core/playwright

# Run accessibility tests
pnpm test:a11y
```

Example test:

```typescript
import { test, expect } from '@playwright/test'
import { injectAxe, checkA11y } from 'axe-playwright'

test('Button is accessible', async ({ page }) => {
  await page.goto('/button')
  await injectAxe(page)
  await checkA11y(page)
})
```

## Resources

### Guidelines

- [WCAG 2.1](https://www.w3.org/WAI/WCAG21/quickref/)
- [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [WebAIM](https://webaim.org/)

### Tools

- [axe DevTools](https://www.deque.com/axe/devtools/)
- [WAVE Browser Extension](https://wave.webaim.org/extension/)
- [Color Contrast Analyzer](https://www.tpgi.com/color-contrast-checker/)

### Screen Readers

- **Windows**: [NVDA](https://www.nvaccess.org/) (free)
- **macOS**: VoiceOver (built-in)
- **Linux**: [Orca](https://wiki.gnome.org/Projects/Orca) (free)

## Contributing

When contributing new components:

1. Follow semantic HTML practices
2. Add appropriate ARIA attributes
3. Implement keyboard navigation
4. Test with screen readers
5. Verify color contrast
6. Support reduced motion
7. Document accessibility features
8. Add automated tests

## Questions?

If you discover accessibility issues or have questions:

- Open an issue on GitHub
- Tag with `accessibility` label
- Provide detailed reproduction steps
- Include assistive technology details
