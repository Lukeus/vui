import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      tailwindcss: fileURLToPath(new URL('../../node_modules/tailwindcss/index.css', import.meta.url)),
    },
  },
})
