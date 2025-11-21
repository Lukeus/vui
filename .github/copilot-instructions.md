# GitHub Copilot Instructions for Vue UI Component Library

## Project Overview

This is a Vue 3 component library built with TypeScript and Tailwind CSS 4, structured as a pnpm monorepo.

## Architecture

- **packages/ui** - Vue components using Composition API with `<script setup>`
- **packages/theme** - Tailwind CSS 4 theme with @theme directive
- **packages/icons** - Heroicons wrapper (@heroicons/vue/20/solid)
- **apps/demo** - Vite-powered demo application
- **react-example** - Reference implementation (Next.js + React)

## Code Style and Patterns

### Vue Components

1. **Always use Composition API with `<script setup lang="ts">`**
2. **Use defineProps with TypeScript interfaces**

   ```typescript
   interface ComponentProps {
     variant?: 'primary' | 'secondary'
     disabled?: boolean
   }
   const props = withDefaults(defineProps<ComponentProps>(), {
     variant: 'primary',
     disabled: false,
   })
   ```

3. **Use computed for dynamic classes with cn() utility**

   ```typescript
   import { cn } from '../utils/classes'
   const classes = computed(() => cn('base-classes', props.variant === 'primary' && 'primary-classes'))
   ```

4. **Support dark mode with `dark:` variants**

   ```vue
   <div class="bg-white text-zinc-950 dark:bg-zinc-900 dark:text-white"></div>
   ```

5. **Use v-model for form components**
   ```typescript
   const emit = defineEmits<{
     'update:modelValue': [value: string]
   }>()
   ```

### Styling

1. **Use Tailwind CSS utility classes** - No custom CSS
2. **Use theme() function** for referencing design tokens
3. **Follow existing color patterns** - 18 color families with variants
4. **Responsive design** - Use `sm:`, `md:`, `lg:` breakpoints

### TypeScript

1. **Always type props, emits, and refs**
2. **Use interface for prop definitions**
3. **Export types when needed**
4. **No `any` types unless absolutely necessary**

### Component Structure

```vue
<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '../utils/classes'

// 1. Define props interface
interface MyComponentProps {
  variant?: 'default' | 'outline'
  disabled?: boolean
}

// 2. Define props with defaults
const props = withDefaults(defineProps<MyComponentProps>(), {
  variant: 'default',
  disabled: false,
})

// 3. Define emits if needed
const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

// 4. Computed classes
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

## Rules

1. **Use @headlessui/vue for interactive components** - For complex interactions like dialogs, dropdowns, tabs, and comboboxes, use HeadlessUI primitives to ensure accessibility (focus management, keyboard navigation, ARIA attributes). Wrap them with your own styled components. Use native HTML for simple components like buttons, inputs, badges.
2. **Always export new components** from `packages/ui/src/index.ts`
3. **Follow accessibility best practices** - Use semantic HTML, ARIA when needed, and leverage @headlessui/vue for complex interactive patterns
4. **Use zod for validation** when runtime validation is needed
5. **Reference react-example** for design patterns and component structure
6. **Keep components simple** - Prefer composition over configuration
7. **Dark mode support is required** for all components
8. **Use pnpm** for dependency management
9. **Follow existing naming conventions**
   - Components: PascalCase (Button.vue)
   - Props: camelCase (buttonSize)
   - CSS classes: kebab-case via Tailwind

## Common Tasks

### Adding a New Component

1. Create `packages/ui/src/components/ComponentName.vue`
2. Follow the structure pattern above
3. Export from `packages/ui/src/index.ts`
4. Add example to `apps/demo/src/App.vue`
5. Test in light and dark mode

### Referencing React Example

The react-example shows the target design. Convert patterns:

- `forwardRef` → No equivalent needed in Vue
- `React.ComponentProps` → `defineProps` interface
- `className` prop → `class` prop
- State hooks → `ref()` or `computed()`
- Conditional `&&` → Template `v-if` or computed classes

### Testing

1. Run `pnpm typecheck` before committing
2. Test in demo app with dark mode toggle
3. Verify responsive behavior
4. Check accessibility (keyboard navigation, ARIA)

## Colors Available

- Red, Orange, Amber, Yellow, Lime
- Green, Emerald, Teal, Cyan, Sky
- Blue, Indigo, Violet, Purple, Fuchsia
- Pink, Rose, Zinc (neutral)

Each with shades: 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950

## Imports

```typescript
// UI Components
import { Button, Input, Badge, Link, Text } from '@vue-ui/ui'

// Theme
import '@vue-ui/theme/theme.css'

// Icons (20px solid)
import { CheckIcon, XMarkIcon } from '@vue-ui/icons'

// Utils
import { cn } from '@vue-ui/ui'
```

## Quality Standards

1. **Type Safety** - Full TypeScript coverage
2. **Accessibility** - WCAG 2.1 Level AA
3. **Performance** - Minimal re-renders, lazy loading
4. **Consistency** - Follow existing patterns
5. **Documentation** - JSDoc for complex logic
6. **Testing** - Manual testing in demo app required

## Resources

- Main README.md - Project documentation
- QUICKSTART.md - Getting started guide
- packages/ui/README.md - Component development
- Tailwind UI - https://tailwindcss.com/plus/ui-blocks/application-ui/
- Heroicons - https://heroicons.com/
