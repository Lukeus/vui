# Vue UI Component Library - Demo Application

VS Code-inspired demo application showcasing 42+ production-ready Vue 3 components with TypeScript and Tailwind CSS 4.

## Features

- **Full-width Layout**: Header and footer span edge-to-edge like VS Code
- **Multi-column Layout**: Icon sidebar, component browser, main content, and settings panel
- **Interactive Playgrounds**: Live component demos with controls and code preview
- **Dark Mode Support**: Toggle between light and dark themes
- **Responsive Design**: Optimized for all screen sizes
- **Custom Scrollbars**: Styled scrollbars for both light and dark modes

## Development

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview

# Run E2E tests
pnpm test:e2e
```

## Architecture

### Layout Components

The demo uses `MultiColumnLayout` from `@vue-ui/ui` with the following structure:

- **Navbar**: Full-width header with search, notifications, and user menu
- **Icon Sidebar**: Fixed-width vertical navigation (80px)
- **Component Browser**: Collapsible file tree for component navigation (384px)
- **Main Content**: Scrollable component showcases and playgrounds
- **Settings Panel**: Right-side panel for theme and layout controls (384px)
- **Status Bar**: Full-width footer with project information

### Tailwind CSS 4 Configuration

⚠️ **Important**: This project uses Tailwind CSS 4 with monorepo source detection.

In `src/style.css`, the Tailwind import is configured to scan the entire monorepo:

```css
@import 'tailwindcss' source('../../..');
```

This ensures Tailwind generates utilities for classes used in `packages/ui/` as well as `apps/demo/`.

### Styling

- **Theme**: Custom VS Code-inspired color scheme in `src/styles/vscode-theme.css`
- **Scrollbars**: Custom webkit scrollbar styles for light/dark modes
- **Typography**: System font stack with fallbacks

## Testing

Playwright E2E tests verify:

- Layout components render correctly
- Dark mode toggle works
- Sidebars can be shown/hidden
- Component playgrounds are interactive
- Footer displays status information

## Project Structure

```
app/demo/
├── src/
│   ├── components/        # Demo-specific components
│   │   ├── playgrounds/   # Interactive component demos
│   │   ├── CodeBlock.vue  # Syntax-highlighted code display
│   │   └── ...
│   ├── composables/       # Vue composables
│   ├── styles/            # VS Code theme and custom styles
│   ├── data/              # Component tree data
│   ├── utils/             # Utility functions
│   ├── App.vue            # Main application component
│   ├── main.ts            # Application entry point
│   └── style.css          # Global styles and Tailwind imports
├── e2e/                   # Playwright E2E tests
└── public/                # Static assets
```

## Learn More

- [Vue 3 Documentation](https://vuejs.org/)
- [Tailwind CSS 4 Documentation](https://tailwindcss.com/)
- [Vite Documentation](https://vitejs.dev/)
- [Component Library Package](../../packages/ui/README.md)
