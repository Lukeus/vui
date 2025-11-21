import type { StorybookConfig } from '@storybook/vue3-vite'
import tailwindcss from '@tailwindcss/postcss'
import vue from '@vitejs/plugin-vue'
import postcssImport from 'postcss-import'

const config: StorybookConfig = {
  stories: ['../src/stories/**/*.mdx', '../src/stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@chromatic-com/storybook',
    '@storybook/addon-docs',
    '@storybook/addon-onboarding',
    '@storybook/addon-a11y',
    '@storybook/addon-vitest',
    '@storybook/addon-themes',
  ],
  framework: {
    name: '@storybook/vue3-vite',
    options: {},
  },
  async viteFinal(config) {
    config.plugins = config.plugins || []
    config.plugins.push(vue())

    // Configure PostCSS for Tailwind
    config.css = config.css || {}
    config.css.postcss = {
      plugins: [postcssImport(), tailwindcss()],
    }

    // Add alias for tailwindcss to fix import resolution
    config.resolve = config.resolve || {}
    config.resolve.alias = {
      ...config.resolve.alias,
    }

    return config
  },
}
export default config
