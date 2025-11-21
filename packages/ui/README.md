# @vue-ui/ui

Core UI component library built with Vue 3, TypeScript, and Tailwind CSS 4.

## Installation

```bash
pnpm add @vue-ui/ui @vue-ui/theme
```

## Usage

Import the theme CSS in your main entry point:

```typescript
import '@vue-ui/theme/theme.css'
```

Then use components in your Vue application:

```vue
<script setup>
import { Button, Input, Badge } from '@vue-ui/ui'
import { ref } from 'vue'

const name = ref('')
</script>

<template>
  <div>
    <Input v-model="name" placeholder="Enter your name" />
    <Button color="indigo">Submit</Button>
    <Badge color="blue">{{ name }}</Badge>
  </div>
</template>
```

## Available Components

### Base Components

- **Button** - Buttons with multiple color variants, outline, and plain styles
- **Input** - Text inputs with support for various types (text, email, date, etc.)
- **Badge** - Small status indicators with color variants
- **Link** - Accessible link component
- **Text** - Typography component for body text

## Component Patterns

All components follow these patterns:

1. **TypeScript First** - Fully typed props and emits
2. **Composition API** - Built with `<script setup>` syntax
3. **Headless UI** - Leverages @headlessui/vue for accessibility
4. **Theme-able** - Uses Tailwind CSS 4 theme system
5. **Dark Mode** - Full dark mode support via `dark:` variants

## Adding New Components

To add new components to the library:

1. Create a new `.vue` file in `src/components/`
2. Follow the existing patterns (TypeScript, Composition API)
3. Use the `cn()` utility for class name merging
4. Leverage @headlessui/vue for interactive components
5. Export from `src/index.ts`

Example component structure:

```vue
<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '../utils/classes'

interface MyComponentProps {
  variant?: 'primary' | 'secondary'
  disabled?: boolean
}

const props = withDefaults(defineProps<MyComponentProps>(), {
  variant: 'primary',
  disabled: false,
})

const classes = computed(() =>
  cn(
    'base-classes',
    props.variant === 'primary' && 'primary-classes',
    props.variant === 'secondary' && 'secondary-classes',
    props.disabled && 'disabled-classes'
  )
)
</script>

<template>
  <div :class="classes">
    <slot />
  </div>
</template>
```

## Development

```bash
# Type check
pnpm typecheck

# Lint
pnpm lint

# Build
pnpm build
```

## Resources

- [Tailwind UI Application UI](https://tailwindcss.com/plus/ui-blocks/application-ui/) - Component reference
- [Headless UI Vue](https://headlessui.com/) - Accessible component primitives
- [Heroicons](https://heroicons.com/) - Icons
