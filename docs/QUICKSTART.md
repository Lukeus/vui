# Quick Start Guide

## See It Working

```bash
# Install dependencies
pnpm install

# Run the demo app
pnpm dev
```

Open http://localhost:5173 - you should see the demo showcasing all components with:

- Button variants (20+ colors, outline, plain styles)
- Input fields with v-model binding
- Badge components in different colors
- Dark mode toggle
- Interactive examples

## Next Steps

### 1. Explore the Demo App

The demo app (`apps/demo/src/App.vue`) shows how to use each component.

### 2. Add a New Component

Example: Creating a Card component

```bash
# Create the component file
# packages/ui/src/components/Card.vue
```

```vue
<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '../utils/classes'

interface CardProps {
  padding?: 'sm' | 'md' | 'lg'
  class?: string
}

const props = withDefaults(defineProps<CardProps>(), {
  padding: 'md',
})

const classes = computed(() =>
  cn(
    'rounded-lg border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900',
    props.padding === 'sm' && 'p-4',
    props.padding === 'md' && 'p-6',
    props.padding === 'lg' && 'p-8',
    props.class
  )
)
</script>

<template>
  <div :class="classes">
    <slot />
  </div>
</template>
```

Export it in `packages/ui/src/index.ts`:

```typescript
export { default as Card } from './components/Card.vue'
```

Use it in your app:

```vue
<script setup>
import { Card, Text } from '@vue-ui/ui'
</script>

<template>
  <Card padding="lg">
    <Text>Card content goes here</Text>
  </Card>
</template>
```

### 3. Customize the Theme

Edit `packages/theme/src/theme.css` to customize colors, spacing, typography, etc.

The theme uses Tailwind CSS 4's @theme directive with CSS variables, making it easy to customize.

### 4. Reference the React Example

Look at `react-example/src/components/` to see how components are structured in the reference implementation. The Vue components follow the same patterns but use Vue's Composition API instead of React hooks.

## Key Files

- **packages/ui/src/components/** - Vue components
- **packages/theme/src/theme.css** - Theme configuration
- **apps/demo/src/App.vue** - Demo application
- **packages/ui/README.md** - Component development guide

## Development Tips

1. **Use TypeScript** - All components are fully typed
2. **Leverage @headlessui/vue** - For interactive components with accessibility
3. **Follow existing patterns** - Look at Button.vue as a reference
4. **Test in dark mode** - Use the toggle in the demo app
5. **Use the cn() utility** - For conditional class names

## Common Tasks

### Build all packages

```bash
pnpm build
```

### Run linting

```bash
pnpm lint
```

### Format code

```bash
pnpm format
```

### Type check

```bash
pnpm typecheck
```

## Questions?

- Check the main README.md for full documentation
- See packages/ui/README.md for component patterns
- Reference react-example/ for design guidance
- Review Tailwind UI for component ideas: https://tailwindcss.com/plus/ui-blocks/application-ui/
