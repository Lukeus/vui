# WARP Configuration - Vue UI Component Library

This file provides Warp AI-specific context and workflows for the Vue UI Component Library project.

## Project Overview

A production-ready Vue 3 component library with TypeScript and Tailwind CSS 4, structured as a pnpm monorepo.

- **Framework:** Vue 3.5 with Composition API
- **Language:** TypeScript 5.8
- **Styling:** Tailwind CSS 4.1
- **Build:** Vite 7
- **Package Manager:** pnpm 10

## Quick Commands

### Development

```bash
# Start demo app
pnpm dev

# Start Storybook
pnpm storybook

# Run all checks before commit
pnpm lint && pnpm format:check && pnpm typecheck
```

### Building

```bash
# Build all packages
pnpm build

# Build specific package
pnpm --filter @vue-ui/ui build
pnpm --filter demo build
```

### Code Quality

```bash
# Lint all packages
pnpm lint

# Format all code
pnpm format

# Check formatting without changes
pnpm format:check

# Type check all packages
pnpm typecheck
```

### Testing

```bash
# Run tests in UI package
cd packages/ui
pnpm test

# Run tests in watch mode
pnpm test -- --watch

# Run tests with coverage
pnpm test -- --coverage
```

## Architecture

### Package Structure

```
vue-ui/
├── packages/
│   ├── ui/           # Vue components (39+ components)
│   ├── theme/        # Tailwind CSS 4 theme with @theme directive
│   └── icons/        # Heroicons wrapper
├── apps/
│   ├── demo/         # Demo application
│   └── storybook/    # Component documentation
└── react-example/    # Reference implementation
```

### Key Patterns

**Component Structure:**

```vue
<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '../utils/classes'

interface MyComponentProps {
  variant?: 'default' | 'outline'
  disabled?: boolean
}

const props = withDefaults(defineProps<MyComponentProps>(), {
  variant: 'default',
  disabled: false,
})

const classes = computed(() =>
  cn('base-classes', props.variant === 'outline' && 'outline-classes', props.disabled && 'disabled-classes')
)
</script>

<template>
  <div :class="classes">
    <slot />
  </div>
</template>
```

**When to use @headlessui/vue:**

- ✅ Complex interactions: Dialog, Dropdown, Tabs, Combobox
- ✅ When you need: focus management, keyboard navigation, ARIA
- ❌ Simple components: Button, Input, Badge, Link

## Development Workflows

### Adding a New Component

1. **Create component file:**

   ```bash
   # Create in packages/ui/src/components/
   touch packages/ui/src/components/MyComponent.vue
   ```

2. **Follow the pattern:**
   - Use `<script setup lang="ts">`
   - Define TypeScript interface for props
   - Use `cn()` utility for classes
   - Support dark mode with `dark:` variants
   - Add v-model support if needed

3. **Export from index:**

   ```typescript
   // packages/ui/src/index.ts
   export { default as MyComponent } from './components/MyComponent.vue'
   ```

4. **Add to demo app:**

   ```bash
   # Edit apps/demo/src/App.vue
   # Add usage example
   ```

5. **Verify:**
   ```bash
   pnpm typecheck
   pnpm lint
   pnpm dev  # Test in browser
   ```

### Creating Tests

1. **Create test file:**

   ```bash
   touch packages/ui/src/components/__tests__/MyComponent.test.ts
   ```

2. **Test structure:**

   ```typescript
   import { describe, it, expect } from 'vitest'
   import { mount } from '@vue/test-utils'
   import MyComponent from '../MyComponent.vue'

   describe('MyComponent.vue', () => {
     it('renders properly', () => {
       const wrapper = mount(MyComponent, {
         props: { variant: 'outline' },
       })
       expect(wrapper.text()).toContain('expected content')
     })
   })
   ```

3. **Run tests:**
   ```bash
   cd packages/ui
   pnpm test
   ```

### Debugging

**TypeScript Issues:**

```bash
# Check specific package
cd packages/ui
pnpm typecheck

# Rebuild if types are stale
pnpm build
```

**Style Issues:**

```bash
# Check if Tailwind classes are being purged
# Look at apps/demo/src/main.ts - ensure theme CSS is imported
# Verify tailwind.config.ts content paths include component files
```

**Component Not Rendering:**

```bash
# 1. Check export in packages/ui/src/index.ts
# 2. Verify import in demo app
# 3. Check browser console for errors
# 4. Verify component is registered properly
```

## Recent Changes

### MultiColumnLayout Restructure (November 2025)

The `MultiColumnLayout` component was restructured from fixed positioning to flexbox layout:

**Before:**
- Header and footer positioned with padding for sidebars
- Sidebars used `fixed` positioning with `top-0`, `bottom-0`, etc.

**After:**
- Flexbox column layout with full-width header and footer
- Sidebars as flex children in horizontal container
- Better matches VS Code's layout behavior

**Key Files Modified:**
- `packages/ui/src/components/MultiColumnLayout.vue` - Layout restructure
- `apps/demo/src/App.vue` - Branding moved to header, footer styling updated
- `apps/demo/src/style.css` - Added Tailwind CSS 4 source rebasing
- `apps/demo/src/styles/vscode-theme.css` - Added light mode scrollbar styles

### Tailwind CSS 4 Monorepo Configuration

**Critical:** Tailwind CSS 4 uses automatic source detection. In monorepos, this needs manual configuration:

```css
/* apps/demo/src/style.css */
@import 'tailwindcss' source('../../..');
```

Without the `source()` function, Tailwind only scans from the CSS file's directory, missing components in `packages/ui/`. This causes positioning utilities (`left-0`, `right-0`, etc.) to not be generated.

**Migration Notes:**
- ✅ `tailwind.config.ts` `content` array is ignored in Tailwind CSS 4
- ✅ Use `source()` function in CSS imports instead
- ✅ Custom utilities in `@layer utilities` still work
- ✅ Theme tokens defined in `@theme` directive are available

## Common Issues & Solutions

### Issue: "Module not found" errors

**Solution:**

```bash
# Reinstall dependencies
pnpm install --force

# Clear cache
rm -rf node_modules
rm pnpm-lock.yaml
pnpm install
```

### Issue: Tailwind styles not applying

**Solution:**

```typescript
// Ensure theme CSS is imported in apps/demo/src/main.ts
import '@vue-ui/theme/theme.css'

// For Tailwind CSS 4, use source() in CSS imports instead of tailwind.config.ts
// apps/demo/src/style.css:
@import 'tailwindcss' source('../../..');

// This rebases Tailwind's source detection to the monorepo root,
// ensuring utilities are generated for all packages
```

### Issue: Dark mode not working

**Solution:**

```vue
<!-- Add dark class to root element -->
<div :class="darkMode ? 'dark' : ''">
  <!-- Your app content -->
</div>
```

## File Locations

### Configuration Files

- `pnpm-workspace.yaml` - Workspace configuration
- `tsconfig.json` - Root TypeScript config
- `packages/ui/vite.config.ts` - UI package build config
- `packages/ui/vitest.config.ts` - Test configuration
- `eslint.config.mjs` - Linting rules
- `prettier.config.mjs` - Code formatting

### Component Development

- `packages/ui/src/components/` - All Vue components
- `packages/ui/src/utils/` - Utility functions (cn, focus)
- `packages/ui/src/composables/` - Vue composables
- `packages/ui/src/schemas.ts` - Zod schemas for validation
- `packages/ui/src/index.ts` - Main export file

### Documentation

- `README.md` - Main project documentation
- `QUICKSTART.md` - Getting started guide
- `COMPONENT_STATUS.md` - Implementation progress
- `CODE_REVIEW.md` - Code review findings
- `packages/ui/README.md` - Component library docs
- `packages/ui/docs/` - Detailed guides

## Quality Checklist

Before committing:

- [ ] `pnpm lint` passes
- [ ] `pnpm format:check` passes
- [ ] `pnpm typecheck` passes
- [ ] Component works in light and dark mode
- [ ] Component is accessible (keyboard nav, ARIA)
- [ ] Component is responsive
- [ ] Tests added (if applicable)
- [ ] Exported from index.ts
- [ ] Demo app updated

## Resources

- **Tailwind UI:** https://tailwindcss.com/plus/ui-blocks/application-ui/
- **Heroicons:** https://heroicons.com/
- **Headless UI:** https://headlessui.com/
- **Vue 3 Docs:** https://vuejs.org/
- **Vite Docs:** https://vitejs.dev/

## Component Inventory

### ✅ Implemented (39 components)

**Base:** Button, Input, Badge, Link, Text

**Forms:** Checkbox, Radio, RadioGroup, Select, Textarea, Fieldset, Toggle, Combobox

**Typography:** Heading, Text

**Layout:** Card, Container, Divider, SidebarLayout, MultiColumnLayout

**Data Display:** Avatar, Table, Calendar

**Overlays:** Dialog, DialogTitle, Dropdown, DropdownButton, DropdownMenu, DropdownItem, CommandPalette, Tooltip

**Navigation:** Navbar, Sidebar, Breadcrumbs, Tabs, TabList, Tab, TabPanels, TabPanel, Pagination

**Feedback:** Alert, EmptyState, ProgressBar, Skeleton

## Notes

- Use zod for complex prop validation (user preference)
- Never deploy without confirmation (user rule)
- Always run lint/format after building (user rule)
- All code must be TypeScript (user preference)
- Quality over speed (user rule)
- Follow repository architecture strictly (user rule)

---

_This file should be kept in sync with .github/copilot-instructions.md for consistency_
