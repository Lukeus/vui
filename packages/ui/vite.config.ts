import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'VueUI',
      fileName: (format) => `vue-ui.${format}.js`,
    },
    rollupOptions: {
      external: ['vue', '@headlessui/vue', '@heroicons/vue'],
      output: {
        globals: {
          vue: 'Vue',
          '@headlessui/vue': 'HeadlessUI',
        },
      },
    },
  },
})
