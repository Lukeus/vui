# Getting Started

## Installation

Install the component library and theme:

```bash
pnpm add @vue-ui/ui @vue-ui/theme
```

## Setup

### 1. Import Theme

Import the theme CSS in your main entry file:

```typescript
// main.ts
import '@vue-ui/theme/dist/theme.css'
import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')
```

### 2. Import Components

You can import components individually:

```vue
<script setup lang="ts">
import { Button, Card, Alert } from '@vue-ui/ui'
</script>

<template>
  <Card variant="elevated">
    <h2>Welcome</h2>
    <p>Get started with the component library</p>
    <Alert variant="success" title="Success" dismissible> You're all set up! </Alert>
    <Button variant="primary">Get Started</Button>
  </Card>
</template>
```

### 3. TypeScript Support

The library includes full TypeScript definitions. No additional setup needed:

```typescript
import type { ButtonProps, CardVariant } from '@vue-ui/ui'

const buttonProps: ButtonProps = {
  variant: 'primary',
  size: 'md',
  loading: false,
}

const cardVariant: CardVariant = 'elevated'
```

## Configuration

### Tailwind CSS

If you're using Tailwind CSS in your project, extend the theme to use the same design tokens:

```javascript
// tailwind.config.js
import { theme } from '@vue-ui/theme'

export default {
  content: ['./src/**/*.{vue,js,ts,jsx,tsx}', './node_modules/@vue-ui/ui/dist/**/*.js'],
  theme: {
    extend: theme,
  },
}
```

### Dark Mode

Dark mode is automatically supported via CSS variables. Toggle dark mode by adding the `dark` class to your root element:

```vue
<script setup lang="ts">
import { ref } from 'vue'

const isDark = ref(false)
</script>

<template>
  <div :class="{ dark: isDark }">
    <Button @click="isDark = !isDark"> Toggle Dark Mode </Button>
    <Card>Content automatically adapts to dark mode</Card>
  </div>
</template>
```

## Basic Usage

### Buttons

```vue
<script setup lang="ts">
import { Button } from '@vue-ui/ui'
</script>

<template>
  <div class="space-x-2">
    <Button variant="primary">Primary</Button>
    <Button variant="secondary">Secondary</Button>
    <Button variant="outline">Outline</Button>
    <Button variant="ghost">Ghost</Button>
    <Button variant="danger" size="sm">Delete</Button>
    <Button loading>Loading...</Button>
  </div>
</template>
```

### Cards

```vue
<script setup lang="ts">
import { Card } from '@vue-ui/ui'
</script>

<template>
  <div class="grid grid-cols-3 gap-4">
    <Card variant="outlined">
      <h3>Outlined Card</h3>
      <p>Subtle border, flat background</p>
    </Card>

    <Card variant="elevated">
      <h3>Elevated Card</h3>
      <p>Subtle shadow for depth</p>
    </Card>

    <Card variant="filled" interactive>
      <h3>Interactive Card</h3>
      <p>Hover for effect</p>
    </Card>
  </div>
</template>
```

### Alerts

```vue
<script setup lang="ts">
import { Alert } from '@vue-ui/ui'
import { ref } from 'vue'

const showAlert = ref(true)
</script>

<template>
  <div class="space-y-4">
    <Alert variant="info" title="Information"> This is an informational message. </Alert>

    <Alert variant="success" title="Success"> Your changes have been saved. </Alert>

    <Alert v-if="showAlert" variant="warning" title="Warning" dismissible @dismiss="showAlert = false">
      Please review your settings.
    </Alert>

    <Alert variant="danger" title="Error" size="sm"> Something went wrong. </Alert>
  </div>
</template>
```

### Forms

```vue
<script setup lang="ts">
import { Input, Button } from '@vue-ui/ui'
import { ref } from 'vue'

const email = ref('')
const password = ref('')

function handleSubmit() {
  console.log({ email: email.value, password: password.value })
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="space-y-4">
    <Input v-model="email" type="email" label="Email" placeholder="you@example.com" required />

    <Input v-model="password" type="password" label="Password" required />

    <Button type="submit" variant="primary"> Sign In </Button>
  </form>
</template>
```

### Overlays

```vue
<script setup lang="ts">
import { CommandPalette, Tooltip, Button } from '@vue-ui/ui'
import { ref } from 'vue'

const isOpen = ref(false)

const commands = [
  { id: '1', label: 'New File', shortcut: '⌘N' },
  { id: '2', label: 'Open File', shortcut: '⌘O' },
  { id: '3', label: 'Save', shortcut: '⌘S' },
]
</script>

<template>
  <div>
    <Button @click="isOpen = true"> Open Command Palette </Button>

    <CommandPalette v-model:open="isOpen" :items="commands" @select="console.log" />

    <Tooltip content="Save your work" placement="top">
      <Button>💾</Button>
    </Tooltip>
  </div>
</template>
```

### Loading States

```vue
<script setup lang="ts">
import { Skeleton } from '@vue-ui/ui'
</script>

<template>
  <div class="space-y-4">
    <Skeleton variant="text" :lines="3" />

    <div class="flex items-center gap-4">
      <Skeleton variant="avatar" />
      <div class="flex-1">
        <Skeleton variant="text" :lines="2" />
      </div>
    </div>

    <Skeleton variant="card" />
  </div>
</template>
```

## Next Steps

- Explore the [Component Guidelines](./component-guidelines.md) for detailed API documentation
- Review [Accessibility](./accessibility.md) best practices
- Check out the [Design Principles](./design-principles.md) behind the library
- View interactive examples in [Storybook](https://storybook.example.com)

## Support

For issues, questions, or contributions:

- GitHub Issues: [Report a bug](https://github.com/your-org/vue-ui/issues)
- Documentation: [Full docs](https://docs.example.com)
- Discord: [Join the community](https://discord.gg/example)
