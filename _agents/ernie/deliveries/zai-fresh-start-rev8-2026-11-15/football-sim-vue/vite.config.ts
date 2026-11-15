import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vueDevTools from 'vite-plugin-vue-devtools'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  base: './',   // relative asset paths so the built dist boots offline over file:// (the Owner's offline requirement)
  devtools: {
    apply: 'serve',
  },
  plugins: [
    vueDevTools(),
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
