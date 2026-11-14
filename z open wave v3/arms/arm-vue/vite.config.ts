import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import { resolve } from 'node:path'

// BENCH-2: multi-page build — the bench board (index.html) + the library-test board (library.html)
export default defineConfig({
  plugins: [vue()],
  build: { rollupOptions: { input: { main: resolve(__dirname, 'index.html'), library: resolve(__dirname, 'library.html') } } },
})
