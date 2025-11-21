# Vue UI Component Library

A reusable Vue 3 component library design system built with Tailwind CSS 4.

## Structure

This is a monorepo managed with pnpm workspaces:

- **packages/ui** - Core UI component library (Button, Input, Badge, Link, Text)
- **packages/theme** - Theme configuration with Tailwind CSS 4 @theme directive
- **packages/icons** - Icon components wrapper (@heroicons/vue)
- **apps/demo** - Interactive demo application
- **react-example** - Reference implementation (Next.js + React)

## Prerequisites

- Node.js >= 18.0.0
- pnpm >= 9.0.0

## Getting Started

### Install dependencies

```bash
pnpm install
```

### Run the demo application

```bash
pnpm dev
```

Open http://localhost:5173 to see the demo with all components.

### Build packages

```bash
pnpm build
```

## Available Components

### Base Components (Implemented)

- **Button** - Buttons with 20+ color variants, outline, and plain styles
- **Input** - Text inputs with v-model support, validation, and accessibility
- **Badge** - Status indicators with color variants and dark mode
- **Link** - Accessible link component with focus states
- **Text** - Typography component for consistent text styling

### To Be Implemented

Follow the patterns in the existing components to add:

- Form components (Checkbox, Radio, Select, Textarea, Combobox, Toggle, Fieldset)
- Navigation (Navbar, Sidebar, Tabs, Breadcrumbs, Pagination)
- Overlays (Dialog, Dropdown, Drawer, Notifications)
- Data Display (Avatar, Table, DescriptionList, Stats, Calendar)
- Layouts (Card, Container, Divider, SidebarLayout, StackedLayout)
- Feedback (Alert, EmptyState, ProgressBar)

See the [Tailwind UI Application UI](https://tailwindcss.com/plus/ui-blocks/application-ui/) reference for component designs.

## Usage Example

```vue
<script setup>
import { Button, Input, Badge, Text } from '@vue-ui/ui'
import '@vue-ui/theme/theme.css'
import { ref } from 'vue'

const name = ref('')
</script>

<template>
  <div>
    <Text>Enter your name:</Text>
    <Input v-model="name" placeholder="Your name" />
    <Button color="indigo" @click="greet">Greet</Button>
    <Badge v-if="name" color="blue">{{ name }}</Badge>
  </div>
</template>
```

## Development

### Lint all packages

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

## Project Features

- ✅ **Monorepo with pnpm workspaces** - Efficient dependency management
- ✅ **Tailwind CSS 4** - Latest version with @theme directive for design tokens
- ✅ **TypeScript** - Full type safety across all packages
- ✅ **Vue 3 Composition API** - Modern Vue patterns with `<script setup>`
- ✅ **Headless UI** - Accessible, unstyled component primitives
- ✅ **Dark Mode** - Full dark mode support with class-based strategy
- ✅ **Icon Library** - 200+ icons from Heroicons
- ✅ **ESLint + Prettier** - Code quality and formatting
- ✅ **Vite** - Fast development and build tool

## Technology Stack

- **Framework**: Vue 3.5 with Composition API
- **Language**: TypeScript 5.8
- **Styling**: Tailwind CSS 4.1
- **Headless Components**: @headlessui/vue 1.7
- **Icons**: @heroicons/vue 2.2
- **Build Tool**: Vite 7
- **Package Manager**: pnpm 10
- **Utilities**: clsx, zod

## Adding New Components

1. Create a new `.vue` file in `packages/ui/src/components/`
2. Follow the existing component patterns (see Button.vue as reference)
3. Export from `packages/ui/src/index.ts`
4. Add to the demo app in `apps/demo/src/App.vue`
5. Document usage in package README

See `packages/ui/README.md` for detailed component development guide.

## Architecture

The project follows a clean monorepo architecture:

```
vue-ui/
├── packages/
│   ├── ui/           # Vue components
│   ├── theme/        # Tailwind theme tokens
│   └── icons/        # Icon exports
├── apps/
│   └── demo/         # Demo application
└── react-example/    # Reference implementation
```

Each package is independently versioned and can be published to npm.

## License

MIT
