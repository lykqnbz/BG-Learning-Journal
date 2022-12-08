import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      'postcss': path.resolve(__dirname, 'node_modules/postcss'),
      'vue': path.resolve(__dirname, 'node_modules/vue'),
    }
  }
})
